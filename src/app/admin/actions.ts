"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { requireAdmin } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export type ActionState = { error?: string; success?: string };
const text = (data: FormData, key: string) => String(data.get(key) ?? "").trim();
const developmentError = (stage: string, message: string, code?: string, cause?: string) => {
  if (process.env.NODE_ENV !== "production") {
    return `${stage}: ${message}${code ? ` (${code})` : ""}${cause ? ` — cause: ${cause}` : ""}`;
  }
  return stage === "Auth" ? "تعذر تسجيل الدخول. تحقق من البريد وكلمة المرور." : "تعذر التحقق من صلاحية الإدارة.";
};

export async function login(_: ActionState, formData: FormData): Promise<ActionState> {
  if (!isSupabaseConfigured()) return { error: "لم يتم ربط Supabase بعد. أضف متغيرات البيئة أولًا." };
  const email = text(formData, "email");
  const password = text(formData, "password");
  if (!email || !password) return { error: "أدخل البريد الإلكتروني وكلمة المرور." };
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    const cause = (error as typeof error & { cause?: { message?: string; code?: string } }).cause;
    return { error: developmentError("Auth", error.message, error.code, [cause?.message, cause?.code].filter(Boolean).join(" / ")) };
  }
  if (!data.user || !data.session) return { error: developmentError("Session", "نجح الطلب لكن Supabase لم يُرجع جلسة مستخدم.") };

  const cookieStore = await cookies();
  const sessionCookieWritten = cookieStore.getAll().some(({ name }) => name.startsWith("sb-") && name.includes("auth-token"));
  if (!sessionCookieWritten) return { error: developmentError("Cookies", "تم تسجيل الدخول لكن لم تُكتب session cookie.") };

  const { data: role, error: roleError } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id).maybeSingle();
  if (roleError) {
    await supabase.auth.signOut();
    return { error: developmentError("Role/RLS", roleError.message, roleError.code) };
  }
  if (role?.role !== "admin") {
    await supabase.auth.signOut();
    return { error: developmentError("Role", "نجح Auth، لكن لا يوجد صف admin مطابق لمعرّف هذا المستخدم في public.user_roles.") };
  }
  redirect("/admin/dashboard");
}

export async function logout() {
  if (isSupabaseConfigured()) { const supabase = await createClient(); await supabase.auth.signOut(); }
  redirect("/admin/login");
}

const allowedSections = new Set(["hero", "about", "professional_course", "contact", "navigation", "features", "testimonials", "settings"]);

export async function saveSection(section: string, formData: FormData) {
  await requireAdmin();
  if (!allowedSections.has(section)) throw new Error("Invalid section");
  const raw = text(formData, "content");
  if (!raw) redirect(`/admin/${section === "settings" ? "settings" : "content"}?error=required`);
  let content: unknown;
  try { content = JSON.parse(raw); } catch { redirect(`/admin/${section === "settings" ? "settings" : "content"}?error=json`); }
  const supabase = await createClient();
  const { error } = await supabase.from("site_content").upsert({ section, content, is_visible: formData.get("is_visible") === "on" });
  if (error) redirect(`/admin/${section === "settings" ? "settings" : "content"}?error=save`);
  revalidatePath("/");
  redirect(`/admin/${section === "settings" ? "settings" : "content"}?success=1`);
}

export async function saveBook(formData: FormData) {
  await requireAdmin();
  const title = text(formData, "title");
  if (!title) redirect("/admin/books?error=required");
  const id = text(formData, "id");
  const sortOrder = Number(text(formData, "sort_order") || 0);
  if (!Number.isFinite(sortOrder)) redirect("/admin/books?error=invalid");
  const payload = { title, author: text(formData, "author") || "خالد العبداللّه", image_url: text(formData, "image_url") || null, sort_order: sortOrder, is_visible: formData.get("is_visible") === "on" };
  const supabase = await createClient();
  const query = id ? supabase.from("books").update(payload).eq("id", Number(id)) : supabase.from("books").insert(payload);
  const { error } = await query;
  if (error) redirect("/admin/books?error=save");
  revalidatePath("/"); redirect("/admin/books?success=1");
}

export async function deleteBook(formData: FormData) {
  await requireAdmin();
  const id = Number(text(formData, "id"));
  if (!Number.isInteger(id)) throw new Error("Invalid book id");
  const supabase = await createClient();
  await supabase.from("books").delete().eq("id", id);
  revalidatePath("/"); redirect("/admin/books?success=1");
}

export async function saveCourse(formData: FormData) {
  await requireAdmin();
  const name = text(formData, "name");
  if (!name) redirect("/admin/courses?error=required");
  const id = text(formData, "id");
  const price = text(formData, "price"); const hours = text(formData, "hours");
  const parsedPrice = price ? Number(price) : null;
  const parsedHours = hours ? Number(hours) : null;
  const sortOrder = Number(text(formData, "sort_order") || 0);
  const status = text(formData, "status") || "available";
  if ((parsedPrice !== null && (!Number.isFinite(parsedPrice) || parsedPrice < 0)) || (parsedHours !== null && (!Number.isInteger(parsedHours) || parsedHours < 0)) || !Number.isFinite(sortOrder) || !["available", "coming_soon", "hidden"].includes(status)) redirect("/admin/courses?error=invalid");
  const payload = { name, description: text(formData, "description"), price: parsedPrice, hours: parsedHours, status, image_url: text(formData, "image_url") || null, sort_order: sortOrder };
  const supabase = await createClient();
  const query = id ? supabase.from("courses").update(payload).eq("id", Number(id)) : supabase.from("courses").insert(payload);
  const { error } = await query;
  if (error) redirect("/admin/courses?error=save");
  revalidatePath("/"); redirect("/admin/courses?success=1");
}

export async function deleteCourse(formData: FormData) {
  await requireAdmin();
  const id = Number(text(formData, "id"));
  if (!Number.isInteger(id)) throw new Error("Invalid course id");
  const supabase = await createClient();
  await supabase.from("courses").delete().eq("id", id);
  revalidatePath("/"); redirect("/admin/courses?success=1");
}

export async function uploadAsset(_: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "اختر صورة أولًا." };
  const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);
  if (!allowed.has(file.type)) return { error: "النوع غير مسموح. استخدم JPG أو PNG أو WebP." };
  if (file.size > 5 * 1024 * 1024) return { error: "حجم الصورة يجب ألا يتجاوز 5MB." };
  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
  const supabase = await createClient();
  const { error } = await supabase.storage.from("site-assets").upload(path, file, { contentType: file.type, upsert: false });
  if (error) return { error: "تعذر رفع الصورة." };
  const { data } = supabase.storage.from("site-assets").getPublicUrl(path);
  return { success: `تم الرفع بنجاح: ${data.publicUrl}` };
}

export async function deleteAsset(formData: FormData) {
  await requireAdmin();
  const path = text(formData, "path");
  if (!path || path.includes("..") || path.startsWith("/")) throw new Error("Invalid asset path");
  const supabase = await createClient();
  const { error } = await supabase.storage.from("site-assets").remove([path]);
  if (error) redirect("/admin/media?error=delete");
  revalidatePath("/admin/media");
  redirect("/admin/media?success=deleted");
}
