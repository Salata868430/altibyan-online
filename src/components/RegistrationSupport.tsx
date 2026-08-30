"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SHAM_CASH_ID = "6e68425871bf987ca49b05bc1d01255c";
const QR_PATH = "/images/shamcash-qr.jpeg";

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function RegistrationSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
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
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2600);
  }

  return (
    <section id="registration-support" className="section-pad relative overflow-hidden bg-[var(--surface-secondary)]/50" dir="rtl">
      {/* Background ambient lighting */}
      <div
        className="absolute left-1/4 bottom-0 -z-10 size-96 rounded-full bg-[var(--primary)]/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">التسجيل والمساهمة</span>
          <h2 className="section-title mt-3">بيانات التسجيل والدعم</h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-[var(--muted)] sm:text-lg">
            يمكن استخدام بيانات الدفع التالية سواء لتسديد رسوم التسجيل في الدورات أو للمساهمة في دعم مشروع التبيان وتعليم القرآن الكريم.
          </p>
        </div>

        {/* Master Payment Card */}
        <div className="payment-wrapper-card mt-14 grid overflow-hidden rounded-[2.5rem] lg:grid-cols-[0.88fr_1.12fr]">
          {/* QR Code Panel */}
          <div className="flex flex-col items-center justify-center border-b border-[var(--border)] bg-gradient-to-br from-[var(--surface)] to-[var(--surface-secondary)] p-8 sm:p-12 lg:border-b-0 lg:border-l">
            <button
              ref={qrButtonRef}
              type="button"
              onClick={() => setIsOpen(true)}
              className="group relative w-full max-w-[19rem] cursor-zoom-in overflow-hidden rounded-[2rem] border-2 border-[var(--border)] bg-[#040914] p-3 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--primary)] hover:shadow-2xl"
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
              <span className="absolute bottom-5 right-1/2 flex translate-x-1/2 items-center gap-1.5 rounded-full bg-black/80 px-4 py-2 text-xs font-bold text-white backdrop-blur-md">
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
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-xs font-extrabold text-[var(--foreground)] shadow-sm transition-all duration-200 hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              <DownloadIcon />
              <span>تحميل رمز QR للهاتف</span>
            </a>
          </div>

          {/* Beneficiary Details & Steps */}
          <div className="flex flex-col justify-between p-8 sm:p-12">
            <div>
              <span className="eyebrow">بيانات المستفيد المعتمدة</span>
              <h3 className="mt-2 text-2xl font-black text-[var(--card-title)] sm:text-3xl">
                خالد أحمد العبدالله
              </h3>

              {/* ShamCash ID Box */}
              <div className="shamcash-id-pill mt-6 rounded-2xl p-5">
                <div className="flex items-center justify-between text-xs font-bold text-[var(--primary)]">
                  <span>معرف الحساب (ShamCash ID)</span>
                  <span className="rounded bg-[var(--primary-soft)] px-2 py-0.5 text-[11px]">مباشر</span>
                </div>
                <code
                  dir="ltr"
                  className="mt-2 block select-all font-mono text-sm font-black tracking-wide text-[var(--foreground)] sm:text-base"
                >
                  {SHAM_CASH_ID}
                </code>
              </div>

              {/* Copy Button */}
              <button
                type="button"
                onClick={copyId}
                className="primary-button mt-4 flex w-full items-center justify-center gap-2.5 rounded-2xl py-3.5 text-xs font-extrabold sm:text-sm"
              >
                <CopyIcon />
                <span>نسخ معرف شام كاش</span>
              </button>
            </div>

            {/* Step-by-Step Payment Instructions */}
            <div className="mt-10 border-t border-[var(--border)] pt-8">
              <h4 className="text-sm font-extrabold text-[var(--card-title)] sm:text-base">
                طريقة إتمام عملية الدفع
              </h4>
              <ol className="mt-4 space-y-3.5 text-xs font-medium leading-relaxed text-[var(--card-text)] sm:text-sm">
                {[
                  "افتح تطبيق شام كاش وامسح رمز الـ QR الموضح بالأعلى.",
                  "أو انسخ معرف شام كاش أعلاه وأرسل المبلغ المحدد مباشرة.",
                  "بعد إتمام التحويل، يرجى إرسال إشعار الدفع عبر الواتساب لتأكيد التسجيل أو استلام التبرع.",
                ].map((step, idx) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-bold text-white">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Copy Toast Notification */}
      <div
        className={`fixed bottom-6 right-1/2 z-[10020] flex translate-x-1/2 items-center gap-2.5 rounded-2xl border border-sky-400/40 bg-[#051128] px-5 py-3 text-xs font-bold text-white shadow-2xl backdrop-blur-md transition-all duration-300 ${
          showToast ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        }`}
        role="status"
        aria-live="polite"
      >
        <CheckIcon />
        <span>تم نسخ معرف شام كاش بنجاح إلى الحافظة!</span>
      </div>

      {/* Fullscreen QR Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[10010] flex items-center justify-center bg-black/90 p-4 backdrop-blur-lg animate-fade-in"
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
            className="absolute top-5 left-5 flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/25"
            aria-label="إغلاق الصورة"
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
