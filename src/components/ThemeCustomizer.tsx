"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type Mode = "light" | "dark";
type Accent = "blue" | "emerald" | "violet" | "amber" | "cyan";

const modes: { value: Mode; label: string; icon: string }[] = [
  { value: "light", label: "فاتح", icon: "☀" },
  { value: "dark", label: "داكن", icon: "☾" },
];
const accents: { value: Accent; label: string }[] = [
  { value: "blue", label: "الأزرق" },
  { value: "emerald", label: "الأخضر" },
  { value: "violet", label: "البنفسجي" },
  { value: "amber", label: "الذهبي" },
  { value: "cyan", label: "التركوازي" },
];

function currentMode(): Mode {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function currentAccent(): Accent {
  const value = document.documentElement.dataset.accent;
  return accents.some((item) => item.value === value) ? value as Accent : "blue";
}

function applySetting(name: "theme" | "accent", value: string) {
  document.documentElement.setAttribute(`data-${name}`, value);
  window.dispatchEvent(new Event("altibyan-theme-change"));
}

function subscribe(callback: () => void) {
  window.addEventListener("altibyan-theme-change", callback);
  return () => window.removeEventListener("altibyan-theme-change", callback);
}

export default function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  const mode = useSyncExternalStore(subscribe, currentMode, () => "light" as Mode);
  const accent = useSyncExternalStore(subscribe, currentAccent, () => "blue" as Accent);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); rootRef.current?.querySelector<HTMLButtonElement>("[data-theme-trigger]")?.focus(); }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => { document.removeEventListener("pointerdown", closeOutside); document.removeEventListener("keydown", closeEscape); };
  }, [open]);

  function chooseMode(value: Mode) {
    applySetting("theme", value);
    localStorage.setItem("altibyan-theme", value);
  }

  function chooseAccent(value: Accent) {
    applySetting("accent", value);
    localStorage.setItem("altibyan-accent", value);
  }

  return (
    <div ref={rootRef} className="theme-customizer relative">
      <button data-theme-trigger type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="dialog" aria-controls="theme-panel" aria-label="تخصيص مظهر الموقع" className="theme-icon-button">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18h1.5a2 2 0 0 0 0-4h-1a1.5 1.5 0 0 1 0-3H15a6 6 0 0 0 0-12h-3Z" /><circle cx="7.5" cy="10" r=".7" fill="currentColor"/><circle cx="10" cy="6.8" r=".7" fill="currentColor"/><circle cx="15" cy="7" r=".7" fill="currentColor"/></svg>
      </button>
      {open && (
        <div id="theme-panel" role="dialog" aria-label="خيارات تخصيص المظهر" className="theme-panel absolute left-0 top-[calc(100%+.75rem)] z-[70] w-[min(19rem,calc(100vw-1.25rem))] rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center justify-between"><strong className="text-sm">تخصيص المظهر</strong><button type="button" onClick={() => setOpen(false)} aria-label="إغلاق خيارات المظهر" className="theme-close">×</button></div>
          <fieldset className="mt-4"><legend className="theme-muted mb-2 text-xs font-bold">الإضاءة</legend><div className="grid grid-cols-2 gap-2">{modes.map(item => <button key={item.value} type="button" onClick={() => chooseMode(item.value)} aria-pressed={mode === item.value} className="theme-choice"><span aria-hidden="true">{item.icon}</span><span>{item.label}</span>{mode === item.value && <span className="mr-auto" aria-hidden="true">✓</span>}</button>)}</div></fieldset>
          <fieldset className="mt-5"><legend className="theme-muted mb-3 text-xs font-bold">لون الهوية</legend><div className="flex items-start justify-between gap-2">{accents.map(item => <button key={item.value} type="button" onClick={() => chooseAccent(item.value)} aria-label={item.label} aria-pressed={accent === item.value} className="group grid justify-items-center gap-1.5"><span data-accent-option={item.value} className="theme-swatch grid size-9 place-items-center rounded-full">{accent === item.value && <span className="swatch-check font-black drop-shadow" aria-hidden="true">✓</span>}</span><span className="theme-muted text-[10px]">{item.label.replace("ال", "")}</span></button>)}</div></fieldset>
        </div>
      )}
    </div>
  );
}
