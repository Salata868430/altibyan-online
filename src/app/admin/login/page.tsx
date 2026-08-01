import Link from "next/link";
import LoginForm from "@/components/admin/LoginForm";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function LoginPage() {
  return <main className="admin-root grid min-h-screen place-items-center px-4 py-12"><section className="admin-card w-full max-w-md"><Link href="/" className="text-sm font-bold text-[var(--primary)]">← العودة إلى الموقع</Link><h1 className="mt-6 text-3xl font-black">دخول الإدارة</h1><p className="admin-muted mt-3 mb-8">هذه الصفحة مخصصة للمشرفين المعتمدين فقط.</p>{!isSupabaseConfigured() && <p className="admin-warning mb-5">لم يتم إعداد متغيرات Supabase بعد.</p>}<LoginForm /></section></main>;
}
