import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

const cards = [["إدارة المحتوى", "تحرير نصوص الصفحة والأستاذ والدورة والتواصل", "/admin/content", "✦"], ["إدارة الصور", "رفع صورة الأستاذ والشعار وصور الكتب والدورات", "/admin/media", "▣"], ["إدارة الدورات", "إضافة الدورات وتعديلها وترتيبها", "/admin/courses", "◫"], ["إدارة المؤلفات", "إضافة المؤلفات وتعديل صورها وترتيبها", "/admin/books", "▤"], ["إعدادات الموقع", "اسم الموقع والروابط وظهور الأقسام", "/admin/settings", "⚙"]];
export default async function DashboardPage() {
  await requireAdmin(); const supabase = await createClient();
  const [books, courses, sections] = await Promise.all([supabase.from("books").select("id", { count: "exact", head: true }), supabase.from("courses").select("id", { count: "exact", head: true }), supabase.from("site_content").select("section", { count: "exact", head: true })]);
  const stats = [[books.count ?? 0, "مؤلفات"], [courses.count ?? 0, "دورات"], [sections.count ?? 0, "أقسام محتوى"]];
  return <AdminShell><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-black text-[var(--primary)]">نظرة عامة</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">لوحة تحكم التبيان</h1><p className="admin-muted mt-2">إدارة محتوى الموقع ووسائطه من مكان واحد.</p></div><Link href="/" target="_blank" className="admin-secondary">معاينة الموقع</Link></div><div className="mt-8 grid gap-4 sm:grid-cols-3">{stats.map(([value,label]) => <article key={label} className="admin-card"><strong className="text-3xl text-[var(--primary)]">{value}</strong><p className="admin-muted mt-2 text-sm">{label}</p></article>)}</div><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{cards.map(([title, description, href, icon]) => <Link key={href} href={href} className="admin-card group transition hover:-translate-y-1 hover:border-[var(--primary)]"><span className="grid size-11 place-items-center rounded-xl bg-[var(--primary-soft)] text-xl text-[var(--primary)]">{icon}</span><h2 className="mt-5 text-xl font-black">{title}</h2><p className="admin-muted mt-2 leading-7">{description}</p><span className="mt-5 inline-block text-sm font-black text-[var(--primary)]">فتح القسم ←</span></Link>)}</div></AdminShell>;
}
