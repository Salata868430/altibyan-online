"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { requireAdmin } from "@/lib/auth";
import { createAdminToken } from "@/lib/admin-auth";
import {
  saveSectionData,
  readLocalData,
  saveBooksData,
  saveCoursesData,
} from "@/lib/content-store";
import type { Book, Course } from "@/lib/content";

export type ActionState = { error?: string; success?: string };
const text = (data: FormData, key: string) => String(data.get(key) ?? "").trim();

export async function login(_: ActionState, formData: FormData): Promise<ActionState> {
  const rawEmail = text(formData, "email");
  const rawPassword = text(formData, "password");
  if (!rawEmail || !rawPassword) return { error: "أدخل البريد الإلكتروني وكلمة المرور." };

  const email = rawEmail.trim().toLowerCase();
  const password = rawPassword.trim();

  const masterEmail = (process.env.ADMIN_EMAIL || "admin@altibyan.online").trim().toLowerCase();
  const masterPassword = (process.env.ADMIN_PASSWORD || "AltibyanAdmin2026!#").trim();

  let shouldRedirect = false;

  // 1. Direct Master Admin Login
  if (
    (email === masterEmail || email === "admin" || email === "admin@altibyan.online") &&
    password === masterPassword
  ) {
    const token = createAdminToken(masterEmail);
    const cookieStore = await cookies();
    cookieStore.set("altibyan_admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 14, // 14 days
      path: "/",
    });
    shouldRedirect = true;
  }

  if (shouldRedirect) {
    redirect("/admin/dashboard");
  }

  return { error: "البريد الإلكتروني أو كلمة المرور غير صحيحة." };
}

export async function logout() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("altibyan_admin_session");
  } catch {
    // ignore
  }
  redirect("/admin/login");
}

const allowedSections = new Set([
  "hero",
  "about",
  "professional_course",
  "professional",
  "contact",
  "navigation",
  "features",
  "testimonials",
  "settings",
]);

export async function saveSection(section: string, formData: FormData) {
  await requireAdmin();
  if (!allowedSections.has(section)) throw new Error("Invalid section");
  const raw = text(formData, "content");
  if (!raw) redirect(`/admin/${section === "settings" ? "settings" : "content"}?error=required`);
  let content: unknown;
  try {
    content = JSON.parse(raw);
  } catch {
    redirect(`/admin/${section === "settings" ? "settings" : "content"}?error=json`);
  }

  await saveSectionData(section, content);
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

  const localData = readLocalData();
  const books: Book[] = [...localData.books];

  const bookItem: Book = {
    id: id ? Number(id) : Date.now(),
    title,
    author: text(formData, "author") || "خالد العبداللّه",
    image_url: text(formData, "image_url") || null,
    sort_order: sortOrder,
    is_visible: formData.get("is_visible") === "on",
  };

  if (id) {
    const idx = books.findIndex((b) => (b as { id?: number }).id === Number(id));
    if (idx >= 0) books[idx] = bookItem;
    else books.push(bookItem);
  } else {
    books.push(bookItem);
  }

  await saveBooksData(books);
  revalidatePath("/");
  redirect("/admin/books?success=1");
}

export async function deleteBook(formData: FormData) {
  await requireAdmin();
  const id = Number(text(formData, "id"));
  if (!Number.isInteger(id)) throw new Error("Invalid book id");

  const localData = readLocalData();
  const books = localData.books.filter((b) => (b as { id?: number }).id !== id);
  await saveBooksData(books);

  revalidatePath("/");
  redirect("/admin/books?success=1");
}

export async function saveCourse(formData: FormData) {
  await requireAdmin();
  const name = text(formData, "name");
  if (!name) redirect("/admin/courses?error=required");
  const id = text(formData, "id");
  const price = text(formData, "price");
  const hours = text(formData, "hours");
  const parsedPrice = price ? Number(price) : null;
  const parsedHours = hours ? Number(hours) : null;
  const sortOrder = Number(text(formData, "sort_order") || 0);
  const status = text(formData, "status") || "available";

  const localData = readLocalData();
  const courses: Course[] = [...localData.courses];

  const courseItem: Course = {
    id: id ? Number(id) : Date.now(),
    name,
    description: text(formData, "description"),
    price: parsedPrice,
    hours: parsedHours,
    status,
    image_url: text(formData, "image_url") || null,
    sort_order: sortOrder,
  };

  if (id) {
    const idx = courses.findIndex((c) => (c as { id?: number }).id === Number(id));
    if (idx >= 0) courses[idx] = courseItem;
    else courses.push(courseItem);
  } else {
    courses.push(courseItem);
  }

  await saveCoursesData(courses);
  revalidatePath("/");
  redirect("/admin/courses?success=1");
}

export async function deleteCourse(formData: FormData) {
  await requireAdmin();
  const id = Number(text(formData, "id"));
  if (!Number.isInteger(id)) throw new Error("Invalid course id");

  const localData = readLocalData();
  const courses = localData.courses.filter((c) => (c as { id?: number }).id !== id);
  await saveCoursesData(courses);

  revalidatePath("/");
  redirect("/admin/courses?success=1");
}

export async function uploadAsset(_: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "اختر صورة أولًا." };
  const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);
  if (!allowed.has(file.type)) return { error: "النوع غير مسموح. استخدم JPG أو PNG أو WebP." };
  if (file.size > 10 * 1024 * 1024) return { error: "حجم الصورة يجب ألا يتجاوز 10MB." };

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const bytes = await file.arrayBuffer();
  fs.writeFileSync(path.join(uploadDir, fileName), Buffer.from(bytes));

  return { success: `تم الرفع بنجاح: /uploads/${fileName}` };
}

export async function deleteAsset(formData: FormData) {
  await requireAdmin();
  const rawPath = text(formData, "path");
  if (!rawPath) throw new Error("Invalid path");
  const fullPath = path.join(process.cwd(), "public", rawPath.replace(/^\//, ""));
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
  revalidatePath("/admin/media");
  redirect("/admin/media?success=deleted");
}
