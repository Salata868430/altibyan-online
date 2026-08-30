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
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const adminHref = isAdmin ? "/admin/dashboard" : "/admin/login";
  const adminLabel = isAdmin ? "لوحة الإدارة" : "دخول الإدارة";

  useEffect(() => {
    let active = true;
    fetch("/api/admin/status", { credentials: "same-origin" })
      .then((response) => (response.ok ? response.json() : { isAdmin: false }))
      .then((data: { isAdmin?: boolean }) => {
        if (active) setIsAdmin(data.isAdmin === true);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
      className={`site-navbar sticky top-0 z-[9999] border-b transition-all duration-300 ${
        scrolled
          ? "border-[var(--border)]/80 py-2.5 shadow-lg backdrop-blur-2xl"
          : "border-transparent py-4 backdrop-blur-xl"
      }`}
    >
      <div className="container-page flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a
          href="#home"
          className="group flex shrink-0 items-center gap-3 transition-transform duration-200 hover:scale-[1.02]"
          aria-label={`${settings.site_name} - الرئيسية`}
        >
          <div className="relative flex items-center">
            <Image
              src={settings.logo_url || "/logo/logo-full.svg"}
              alt={settings.site_name}
              width={160}
              height={44}
              priority
              unoptimized={Boolean(
                settings.logo_url && settings.logo_url.startsWith("http"),
              )}
              className="h-10 w-auto max-w-[10rem] object-contain sm:h-11 drop-shadow-sm"
            />
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label="التنقل الرئيسي" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-[var(--border)]/70 bg-[var(--surface)]/70 px-4 py-1.5 shadow-sm backdrop-blur-md xl:gap-2">
            {links.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <a
                  className="nav-link relative block rounded-full px-3.5 py-1.5 text-[13.5px] font-semibold tracking-wide transition-colors"
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions (Theme, Admin, WhatsApp CTA, Mobile Toggle) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <ThemeCustomizer />

          <a
            href={adminHref}
            className="admin-navbar-link hidden items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all duration-200 lg:inline-flex"
            title={adminLabel}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-3.5 shrink-0 opacity-80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M7 10V8a5 5 0 0 1 10 0v2" />
              <rect x="5" y="10" width="14" height="10" rx="2" />
              <path d="M12 14v2" />
            </svg>
            <span>{adminLabel}</span>
          </a>

          <a
            href={settings.whatsapp_url}
            target="_blank"
            rel="noreferrer"
            className="primary-button hidden items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold tracking-wide sm:inline-flex"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M20 11.5a8.3 8.3 0 0 1-12.3 7.3L4 20l1.3-4.5A8.3 8.3 0 1 1 20 11.5Z" />
              <path d="M9 10c.5 2 2.5 3.5 4 4" />
            </svg>
            <span>سجّل الآن</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            className="relative z-[10001] flex size-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-sm transition-all hover:bg-[var(--surface-secondary)] lg:hidden"
          >
            <span className="sr-only">
              {mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            </span>
            {mobileMenuOpen ? (
              <svg
                viewBox="0 0 24 24"
                className="size-5.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="size-5.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="تنقل الهاتف"
          className="absolute inset-x-0 top-full z-[10000] border-b border-[var(--border)] bg-[var(--surface)]/95 px-5 pb-6 pt-3 shadow-2xl backdrop-blur-2xl lg:hidden animate-fade-in"
        >
          <ul className="container-page space-y-1.5 py-2">
            {links.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-[var(--foreground)] transition-colors hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]"
                >
                  <span>{link.label}</span>
                  <span className="text-xs opacity-50">←</span>
                </a>
              </li>
            ))}

            <li className="pt-2">
              <a
                href={adminHref}
                onClick={() => setMobileMenuOpen(false)}
                className="admin-navbar-link flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-xs font-bold"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M7 10V8a5 5 0 0 1 10 0v2" />
                  <rect x="5" y="10" width="14" height="10" rx="2" />
                  <path d="M12 14v2" />
                </svg>
                <span>{adminLabel}</span>
              </a>
            </li>

            <li className="pt-1 sm:hidden">
              <a
                href={settings.whatsapp_url}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="primary-button flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-center text-sm font-bold"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M20 11.5a8.3 8.3 0 0 1-12.3 7.3L4 20l1.3-4.5A8.3 8.3 0 1 1 20 11.5Z" />
                  <path d="M9 10c.5 2 2.5 3.5 4 4" />
                </svg>
                <span>سجل الآن عبر واتساب</span>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
