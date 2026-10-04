import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken } from "./admin-auth";

export async function getAdmin() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("altibyan_admin_session")?.value;
    if (token) {
      const { email, valid } = verifyAdminToken(token);
      if (valid) {
        return { id: "master-admin", email, role: "admin" };
      }
    }
  } catch {
    // Cookie store read error
  }

  return null;
}

export async function requireAdmin() {
  const user = await getAdmin();
  if (!user) redirect("/admin/login");
  return user;
}
