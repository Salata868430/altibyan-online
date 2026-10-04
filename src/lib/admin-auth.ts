import crypto from "crypto";

export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@altibyan.online").trim().toLowerCase();
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "AltibyanAdmin2026!#";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "altibyan_master_admin_jwt_secret_key_2026_quran_app";

export function createAdminToken(email: string): string {
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 14; // 14 days
  const data = `${email}:${expiresAt}`;
  const signature = crypto.createHmac("sha256", ADMIN_SECRET).update(data).digest("hex");
  return `${Buffer.from(data).toString("base64url")}.${signature}`;
}

export function verifyAdminToken(token: string): { email: string; valid: boolean } {
  try {
    const [dataB64, signature] = token.split(".");
    if (!dataB64 || !signature) return { email: "", valid: false };
    const data = Buffer.from(dataB64, "base64url").toString("utf-8");
    const [email, expiresStr] = data.split(":");
    const expiresAt = Number(expiresStr);
    if (!email || !expiresAt || Date.now() > expiresAt) return { email: "", valid: false };
    const expectedSig = crypto.createHmac("sha256", ADMIN_SECRET).update(data).digest("hex");
    if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return { email, valid: true };
    }
    return { email: "", valid: false };
  } catch {
    return { email: "", valid: false };
  }
}
