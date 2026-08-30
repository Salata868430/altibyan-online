import AdminShell from "@/components/admin/AdminShell";
import SubmitButton from "@/components/admin/SubmitButton";
import AssetUpload from "@/components/admin/AssetUpload";
import { saveSection } from "../actions";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

const labels: Record<string,string> = { hero: "نصوص Hero والأزرار والإحصائيات", about: "معلومات الأستاذ وصورته", professional_course: "الدورة الاحترافية", features: "فوائد الدورة", testimonials: "قسم آراء الطلاب التجريبي", contact: "معلومات التواصل", navigation: "روابط Navbar وFooter" };
export default async function ContentPage({ searchParams }: { searchParams: Promise<Record<string,string|undefined>> }) {
  await requireAdmin(); const params = await searchParams; const supabase = await createClient();
  const { data } = await supabase.from("site_content").select("section,content,is_visible").in("section", Object.keys(labels)).order("section");
  const rows = data ?? [];
  return <AdminShell><h1 className="text-3xl font-black">إدارة المحتوى</h1><p className="admin-muted mt-2">حقول JSON نصية آمنة؛ لا يتم قبول HTML أو تنفيذه.</p>{params.success && <p className="admin-success mt-5">تم الحفظ بنجاح.</p>}{params.error && <p className="admin-error mt-5">تعذر الحفظ. تحقق من الحقول وصيغة JSON.</p>}<div className="mt-8 grid gap-6 xl:grid-cols-2">{rows.map((row) => <form key={row.section} action={saveSection.bind(null,row.section)} className="admin-card space-y-4"><div className="flex items-center justify-between"><h2 className="text-xl font-black">{labels[row.section]}</h2><label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_visible" defaultChecked={row.is_visible} /> إظهار القسم</label></div><textarea name="content" required rows={14} className="admin-input font-mono text-sm" defaultValue={JSON.stringify(row.content,null,2)} /><div className="flex gap-3"><SubmitButton /><button type="reset" className="admin-secondary">إلغاء</button></div></form>)}</div><div className="mt-8 max-w-xl"><AssetUpload /></div></AdminShell>;
}
