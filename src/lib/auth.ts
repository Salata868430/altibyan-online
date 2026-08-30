import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "./supabase/config";
import { createClient } from "./supabase/server";

export async function getAdmin() {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  const { data: role } = await supabase.from("user_roles").select("role").eq("user_id", user.id).single();
  return role?.role === "admin" ? user : null;
}

export async function requireAdmin() {
  const user = await getAdmin();
  if (!user) redirect("/admin/login");
  return user;
}
