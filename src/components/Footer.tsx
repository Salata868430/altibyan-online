import Image from "next/image";
import type { ContactContent, LinkItem, SettingsContent } from "@/lib/content";

export default function Footer({
  links,
  settings,
  contact,
}: {
  links: LinkItem[];
  settings: SettingsContent;
  contact: ContactContent;
}) {
  return (
    <footer className="relative bg-[#020816] text-white">
      {/* Decorative top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />

      <div className="container-page grid gap-12 py-16 md:grid-cols-3 lg:gap-16">
        {/* Brand Column */}
        <div className="text-right">
          <a href="#home" className="inline-flex items-center gap-2">
            <Image
              src={settings.logo_url || "/logo/logo-full.svg"}
              alt={settings.site_name}
              width={160}
              height={44}
              unoptimized={Boolean(settings.logo_url && settings.logo_url.startsWith("http"))}
              className="h-10 w-auto object-contain brightness-0 invert"
            />
          </a>
          <p className="mt-5 max-w-sm text-sm font-medium leading-relaxed text-slate-400">
            {settings.description}
          </p>
          <p className="mt-3 text-xs font-bold text-sky-400">
            {settings.tagline}
          </p>
        </div>

        {/* Quick Links Column */}
        <nav aria-label="روابط التذييل" className="text-right">
          <h3 className="text-sm font-extrabold text-white">روابط سريعة</h3>
          <ul className="mt-5 grid grid-cols-2 gap-3 text-xs font-semibold text-slate-300">
            {links.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <a className="transition-colors hover:text-sky-300" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Column */}
        <div className="text-right">
          <h3 className="text-sm font-extrabold text-white">التواصل المباشر</h3>
          <div className="mt-5 space-y-3 text-xs font-medium text-slate-300">
            <p className="text-slate-400">واتساب وهاتف الإشراف:</p>
            <a
              dir="ltr"
              className="inline-block font-mono text-sm font-bold text-white transition-colors hover:text-sky-300"
              href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
            >
              {contact.phone}
            </a>
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="block text-slate-400 hover:text-white"
              >
                {contact.email}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Copyright & Sub-footer */}
      <div className="border-t border-white/5 py-6">
        <div className="container-page flex flex-col items-center justify-between gap-4 text-xs font-medium text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {settings.site_name}. {settings.footer_text}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/admin/login"
              className="transition-colors hover:text-sky-300"
            >
              دخول الإدارة
            </a>
            <a
              href="#home"
              className="flex items-center gap-1 transition-colors hover:text-sky-300"
            >
              <span>العودة للأعلى</span>
              <span>↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
