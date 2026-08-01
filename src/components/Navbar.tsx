"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { LinkItem, SettingsContent } from "@/lib/content";
import ThemeCustomizer from "./ThemeCustomizer";

type NavbarProps = {
  links: LinkItem[];
  settings: SettingsContent;
};

export default function Navbar({ links, settings }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const adminHref = isAdmin ? "/admin/dashboard" : "/admin/login";
  const adminLabel = isAdmin ? "لوحة الإدارة" : "دخول الإدارة";

  useEffect(() => {
    let active = true;
    fetch("/api/admin/status", { credentials: "same-origin" })
      .then((response) => response.ok ? response.json() : { isAdmin: false })
      .then((data: { isAdmin?: boolean }) => { if (active) setIsAdmin(data.isAdmin === true); })
      .catch(() => undefined);
    return () => { active = false; };
  }, []);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        mobileMenuOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      ref={navbarRef}
      className="site-navbar sticky top-0 z-[9999] border-b backdrop-blur-2xl"
    >
      <div className="container-page flex h-[4.75rem] items-center justify-between gap-3 sm:h-20">
        <a
          href="#home"
          className="flex shrink-0 items-center gap-3"
          aria-label={`${settings.site_name} - الرئيسية`}
        >
          <Image
            src={settings.logo_url || "/logo/logo-full.svg"}
            alt={settings.site_name}
            width={150}
            height={42}
            unoptimized={Boolean(
              settings.logo_url && settings.logo_url.startsWith("http"),
            )}
            className="h-10 w-auto max-w-[9rem] object-contain sm:h-[42px]"
          />
        </a>

        <nav aria-label="التنقل الرئيسي" className="hidden lg:block">
          <ul className="flex items-center gap-5 text-[13px] font-semibold xl:gap-7">
            {links.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <a
                  className="nav-link relative py-3 transition"
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mr-auto flex items-center gap-2 lg:mr-0">
          <ThemeCustomizer />

          <a
            href={adminHref}
            className="admin-navbar-link hidden items-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition lg:inline-flex"
          >
            <svg viewBox="0 0 24 24" className="pointer-events-none size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M7 10V8a5 5 0 0 1 10 0v2"/><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M12 14v2"/></svg>
            <span>{adminLabel}</span>
          </a>

          <a
            href={settings.whatsapp_url}
            target="_blank"
            rel="noreferrer"
            className="primary-button hidden rounded-xl px-5 py-3 text-sm font-bold shadow-lg transition hover:-translate-y-0.5 sm:inline-flex"
          >
            سجل الآن
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            className="relative z-[10001] flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border bg-[var(--surface)] text-[var(--foreground)] shadow-sm lg:hidden"
          >
            <span className="sr-only">
              {mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            </span>

            {mobileMenuOpen ? (
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="تنقل الهاتف"
          className="absolute inset-x-0 top-full z-[10000] border-t border-[var(--border)] bg-[var(--background)] px-4 pb-5 shadow-2xl lg:hidden"
        >
          <ul className="container-page space-y-1 py-3">
            {links.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface-secondary)]"
                >
                  {link.label}
                </a>
              </li>
            ))}

            <li>
              <a
                href={adminHref}
                onClick={() => setMobileMenuOpen(false)}
                className="admin-navbar-link mt-2 flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-bold"
              >
                <svg viewBox="0 0 24 24" className="pointer-events-none size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M7 10V8a5 5 0 0 1 10 0v2"/><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M12 14v2"/></svg>
                <span>{adminLabel}</span>
              </a>
            </li>

            <li className="sm:hidden">
              <a
                href={settings.whatsapp_url}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="primary-button mt-3 block rounded-xl px-4 py-3 text-center font-bold"
              >
                سجل الآن
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
