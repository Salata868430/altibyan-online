import Link from "next/link";
import { logout } from "@/app/admin/actions";

const links = [["لوحة التحكم", "/admin/dashboard"], ["المحتوى", "/admin/content"], ["الصور", "/admin/media"], ["الدورات", "/admin/courses"], ["المؤلفات", "/admin/books"], ["الإعدادات", "/admin/settings"]];
export default function AdminShell({ children }: { children: React.ReactNode }) {
  return <div className="admin-root min-h-screen"><header className="admin-header"><div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4"><Link href="/admin/dashboard" className="text-xl font-black">إدارة التبيان</Link><nav className="order-3 w-full overflow-x-auto md:order-none md:mr-6 md:w-auto" aria-label="تنقل لوحة الإدارة"><ul className="flex min-w-max gap-2">{links.map(([label, href]) => <li key={href}><Link className="admin-nav-link" href={href}>{label}</Link></li>)}</ul></nav><form action={logout} className="mr-auto"><button type="submit" className="admin-secondary">تسجيل الخروج</button></form></div></header><main className="mx-auto max-w-7xl px-4 py-10">{children}</main></div>;
}
