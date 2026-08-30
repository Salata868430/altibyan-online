import Image from "next/image";
import AdminShell from "@/components/admin/AdminShell";
import AssetUpload from "@/components/admin/AssetUpload";
import { deleteAsset } from "../actions";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function MediaPage({ searchParams }: { searchParams: Promise<Record<string,string|undefined>> }) {
  await requireAdmin(); const params = await searchParams; const supabase = await createClient();
  const { data: folders } = await supabase.storage.from("site-assets").list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });
  const files: { name: string; path: string; url: string }[] = [];
  for (const folder of folders ?? []) {
    if (folder.id) { const path = folder.name; files.push({ name: folder.name, path, url: supabase.storage.from("site-assets").getPublicUrl(path).data.publicUrl }); continue; }
    const { data } = await supabase.storage.from("site-assets").list(folder.name, { limit: 100, sortBy: { column: "created_at", order: "desc" } });
    for (const file of data ?? []) if (file.id) { const path = `${folder.name}/${file.name}`; files.push({ name: file.name, path, url: supabase.storage.from("site-assets").getPublicUrl(path).data.publicUrl }); }
  }
  return <AdminShell><div><h1 className="text-3xl font-black">إدارة الصور</h1><p className="admin-muted mt-2">رفع صورة الأستاذ أو الشعار أو صور الكتب والدورات، ثم نسخ رابطها إلى حقل الصورة المناسب.</p></div>{params.success && <p className="admin-success mt-5">تم حذف الصورة.</p>}{params.error && <p className="admin-error mt-5">تعذر تنفيذ العملية.</p>}<div className="mt-8 grid gap-8 xl:grid-cols-[24rem_1fr]"><AssetUpload/><section><h2 className="text-xl font-black">الملفات المرفوعة</h2>{files.length === 0 ? <p className="admin-muted mt-5">لا توجد صور مرفوعة بعد.</p> : <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{files.map(file => <article key={file.path} className="admin-card p-3"><div className="relative aspect-video overflow-hidden rounded-xl bg-[var(--surface-secondary)]"><Image src={file.url} alt={file.name} fill unoptimized className="object-contain" /></div><input readOnly value={file.url} aria-label={`رابط ${file.name}`} className="admin-input mt-3 text-xs"/><form action={deleteAsset} className="mt-3"><input type="hidden" name="path" value={file.path}/><button type="submit" className="admin-danger w-full">حذف الصورة</button></form></article>)}</div>}</section></div></AdminShell>;
}
