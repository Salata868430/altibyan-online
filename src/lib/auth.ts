import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken } from "./admin-auth";
import { isSupabaseConfigured } from "./supabase/config";
import { createClient } from "./supabase/server";

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

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data: { user }, error } = await supabase.auth.getUser();
      if (!error && user) {
        const { data: role } = await supabase.from("user_roles").select("role").eq("user_id", user.id).single();
        if (role?.role === "admin") return user;
      }
    } catch {
      // Supabase unavailable or network error
    }
  }

  return null;
}

export async function requireAdmin() {
  const user = await getAdmin();
  if (!user) redirect("/admin/login");
  return user;
}
