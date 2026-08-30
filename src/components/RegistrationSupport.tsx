"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SHAM_CASH_ID = "6e68425871bf987ca49b05bc1d01255c";
const QR_PATH = "/images/shamcash-qr.jpeg";

export default function RegistrationSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const qrButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const qrButton = qrButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      qrButton?.focus();
    };
  }, [isOpen]);

  async function copyId() {
    try {
      await navigator.clipboard.writeText(SHAM_CASH_ID);
    } catch {
      const input = document.createElement("textarea");
      input.value = SHAM_CASH_ID;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 3000);
  }

  return (
    <section id="registration-support" className="section-pad relative overflow-hidden bg-[var(--surface-secondary)]/60" dir="rtl">
      <div className="container-page relative">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">التحويل والمساهمة المالية</span>
          <h2 className="section-title mt-3">بيانات التسجيل والدعم</h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-[var(--muted)] sm:text-lg">
            يمكن استخدام بيانات الدفع التالية سواء لتسديد رسوم التسجيل في الدورات أو للمساهمة في دعم مشروع التبيان وتعليم القرآن الكريم.
          </p>
        </div>

        {/* Master Fintech Payment Card */}
        <div className="mt-14 overflow-hidden rounded-[2.5rem] border border-[var(--border)] bg-[var(--surface)] shadow-2xl">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            {/* QR Scan Panel */}
            <div className="flex flex-col items-center justify-center border-b border-[var(--border)] bg-gradient-to-b from-[var(--surface-secondary)] to-[var(--surface)] p-8 sm:p-12 lg:border-b-0 lg:border-l">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-black text-emerald-600 dark:text-emerald-400">
                <span className="size-2 rounded-full bg-emerald-500" />
                حساب شام كاش رسمي ومباشر
              </span>

              <button
                ref={qrButtonRef}
                type="button"
                onClick={() => setIsOpen(true)}
                className="group relative w-full max-w-[19rem] cursor-zoom-in overflow-hidden rounded-[2rem] border-2 border-[var(--border)] bg-[#020712] p-3 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-[var(--primary)] hover:shadow-2xl"
                aria-label="فتح رمز شام كاش بحجم كامل"
              >
                <div className="overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={QR_PATH}
                    width={824}
                    height={1080}
                    alt="رمز QR للدفع عبر شام كاش باسم خالد أحمد العبدالله"
                    className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 80vw, 340px"
                  />
                </div>
                <span className="absolute bottom-5 right-1/2 flex translate-x-1/2 items-center gap-1.5 rounded-full bg-black/85 px-4 py-2 text-xs font-black text-white backdrop-blur-md">
                  <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m16 16 5 5M11 8v6M8 11h6" />
                  </svg>
                  اضغط للتكبير
                </span>
              </button>

              <a
                href={QR_PATH}
                download="altibyan-shamcash-qr.jpeg"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-xs font-black text-[var(--foreground)] shadow-sm transition-all duration-200 hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>تحميل رمز QR للهاتف</span>
              </a>
            </div>

            {/* Account Details & Action Hub */}
            <div className="flex flex-col justify-between p-8 sm:p-12">
              <div>
                <span className="eyebrow">بيانات المستفيد المعتمدة</span>
                <h3 className="mt-2 text-2xl font-black text-[var(--card-title)] sm:text-3xl">
                  خالد أحمد العبدالله
                </h3>

                {/* ShamCash ID Container */}
                <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] p-5.5 shadow-inner">
                  <div className="flex items-center justify-between text-xs font-black text-[var(--primary)]">
                    <span>ShamCash ID المعرف الرسمي</span>
                    <span className="rounded-md bg-[var(--primary-soft)] px-2 py-0.5 text-[11px]">مباشر</span>
                  </div>
                  <code
                    dir="ltr"
                    className="mt-2 block select-all font-mono text-sm font-black tracking-wider text-[var(--foreground)] sm:text-base"
                  >
                    {SHAM_CASH_ID}
                  </code>
                </div>

                {/* Copy Button */}
                <button
                  type="button"
                  onClick={copyId}
                  className={`mt-4 flex w-full items-center justify-center gap-2.5 rounded-2xl py-4 text-xs font-black transition-all duration-200 sm:text-sm ${
                    copied
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-[1.02]"
                      : "btn-primary-luxury"
                  }`}
                >
                  {copied ? (
                    <>
                      <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>تم نسخ المعرف بنجاح!</span>
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" className="size-4.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>نسخ معرف شام كاش بنقرة واحدة</span>
                    </>
                  )}
                </button>
              </div>

              {/* 3 Step Instruction Guide */}
              <div className="mt-10 border-t border-[var(--border)] pt-8">
                <h4 className="text-sm font-black text-[var(--card-title)] sm:text-base">
                  خطوات إتمام عملية التحويل
                </h4>
                <ol className="mt-4 space-y-3 text-xs font-medium leading-relaxed text-[var(--card-text)] sm:text-sm">
                  {[
                    "افتح تطبيق شام كاش على هاتفك وامسح رمز QR أعلاه.",
                    "أو انسخ المعرف وأرسل المبلغ المحدد للرسوم أو التبرع.",
                    "أرسل إشعار الدفع أو صورة الإيصال عبر الواتساب لتأكيد التسجيل فورًا.",
                  ].map((step, idx) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-black text-white">
                        {idx + 1}
                      </span>
                      <span className="pt-0.5 font-bold">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating QR Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[10010] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="رمز شام كاش بحجم كامل"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-6 left-6 flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/25"
            aria-label="إغلاق الصورة"
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <div className="relative max-h-[85vh] max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#061022] p-3 shadow-2xl">
            <Image
              src={QR_PATH}
              width={824}
              height={1080}
              alt="رمز QR للدفع عبر شام كاش"
              className="h-auto w-full object-contain rounded-2xl"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}
