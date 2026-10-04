import AdminShell from "@/components/admin/AdminShell";
import SubmitButton from "@/components/admin/SubmitButton";
import { saveSection } from "../actions";
import { requireAdmin } from "@/lib/auth";
import { fallback } from "@/lib/content";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  await requireAdmin();
  let content = fallback.settings;
  let isVisible = true;

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("site_content")
        .select("content,is_visible")
        .eq("section", "settings")
        .maybeSingle();
      if (data?.content) {
        content = { ...fallback.settings, ...(data.content as object) };
        if (typeof data.is_visible === "boolean") isVisible = data.is_visible;
      }
    } catch {
      // Supabase query error fallback
    }
  }

  return (
    <AdminShell>
      <h1 className="text-3xl font-black">الإعدادات العامة</h1>
      <form action={saveSection.bind(null, "settings")} className="admin-card mt-8 max-w-3xl space-y-4">
        <p className="admin-muted">
          اسم الموقع والوصف ورابط واتساب وإعدادات إظهار الأقسام بصيغة JSON آمنة.
        </p>
        <textarea
          name="content"
          required
          rows={16}
          className="admin-input font-mono"
          defaultValue={JSON.stringify(content, null, 2)}
        />
        <label className="flex items-center gap-2 text-sm font-bold">
          <input name="is_visible" type="checkbox" defaultChecked={isVisible} /> الإعدادات مفعلة
        </label>
        <div className="flex gap-3">
          <SubmitButton />
          <button type="reset" className="admin-secondary">
            إلغاء
          </button>
        </div>
      </form>
    </AdminShell>
  );
}
