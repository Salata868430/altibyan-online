import Link from "next/link";
import Image from "next/image";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = {
  title: "دخول الإدارة | التبيان",
};

export default function LoginPage() {
  return (
    <main className="admin-root grid min-h-screen place-items-center px-4 py-12">
      <section className="admin-card w-full max-w-md text-center sm:text-right">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-sm font-bold text-[var(--primary)] transition hover:underline">
            ← العودة إلى الموقع
          </Link>
          <span className="text-xs text-[var(--muted)]">منصة التبيان</span>
        </div>

        <div className="mt-8 flex flex-col items-center text-center">
          <Image
            src="/logo/logo-badge.png"
            alt="شعار التبيان"
            width={72}
            height={72}
            priority
            className="h-16 w-16 object-contain drop-shadow-md"
          />
          <h1 className="mt-4 text-2xl font-black sm:text-3xl">دخول الإدارة</h1>
          <p className="admin-muted mt-2 text-sm">
            أدخل البريد الإلكتروني وكلمة المرور للوصول إلى لوحة التحكم.
          </p>
        </div>

        <div className="mt-8 text-right">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
