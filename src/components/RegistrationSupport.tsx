"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SHAM_CASH_ID = "6e68425871bf987ca49b05bc1d01255c";
const QR_PATH = "/images/shamcash-qr.jpeg";

function CopyIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>;
}

function DownloadIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 19h14"/></svg>;
}

function StepIcon({ index }: { index: number }) {
  const paths = [
    <><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z"/><path d="M15 14h2v2h-2zM19 14v3h-2M14 19h3M20 20h-2"/></>,
    <><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h6M7 14h3M17 12h.01"/></>,
    <><path d="M21 11.5a8.3 8.3 0 0 1-12.3 7.3L4 20l1.3-4.5A8.3 8.3 0 1 1 21 11.5Z"/><path d="m9 11 2 2 4-4"/></>,
  ];
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">{paths[index]}</svg>;
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
    <section id="registration-support" className="payment-section section-pad" dir="rtl">
      <div className="payment-glow" aria-hidden="true" />
      <div className="container-page relative">
        <div className="payment-heading mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">التسجيل والمساهمة</p>
          <h2 className="section-title mt-4">التسجيل والدعم</h2>
          <p className="mt-5 text-base leading-8 sm:text-lg">يمكن استخدام بيانات الدفع التالية سواء لتسديد رسوم التسجيل في الدورات أو للمساهمة في دعم مشروع التبيان وتعليم القرآن الكريم.</p>
        </div>

        <div className="payment-card mt-12 grid overflow-hidden rounded-[2rem] lg:grid-cols-[.9fr_1.1fr]">
          <div className="payment-qr-panel flex flex-col items-center justify-center p-6 sm:p-10">
            <button ref={qrButtonRef} type="button" onClick={() => setIsOpen(true)} className="payment-qr-button group" aria-label="فتح رمز شام كاش بحجم كامل">
              <Image src={QR_PATH} width={824} height={1080} alt="رمز QR للدفع عبر شام كاش باسم خالد أحمد العبدالله" className="h-auto w-full" sizes="(max-width: 1024px) 80vw, 360px" />
              <span className="payment-zoom-hint"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5M11 8v6M8 11h6"/></svg>اضغط للتكبير</span>
            </button>
            <a href={QR_PATH} download="altibyan-shamcash-qr.jpeg" className="payment-secondary-button mt-5"><DownloadIcon /><span>تحميل رمز QR</span></a>
          </div>

          <div className="payment-content p-6 sm:p-10 lg:p-12">
            <div className="payment-beneficiary">
              <p className="payment-label">بيانات المستفيد</p>
              <h3 className="mt-3 text-2xl font-black">خالد أحمد العبدالله</h3>
              <div className="payment-id-box mt-6">
                <span className="payment-label">ShamCash ID</span>
                <code dir="ltr">{SHAM_CASH_ID}</code>
              </div>
              <button type="button" onClick={copyId} className="payment-primary-button mt-4"><CopyIcon /><span>نسخ معرف شام كاش</span></button>
            </div>

            <div className="mt-9">
              <h3 className="text-xl font-black">طرق الدفع</h3>
              <ol className="payment-steps mt-5 space-y-4">
                {["امسح رمز QR باستخدام تطبيق شام كاش.", "أو انسخ معرف شام كاش وأرسل المبلغ مباشرة.", "بعد التحويل يرجى إرسال إشعار الدفع عبر وسائل التواصل الموجودة في الموقع لتأكيد التسجيل أو استلام التبرع."].map((step, index) => (
                  <li key={step}><span className="payment-step-icon"><StepIcon index={index} /></span><span><b>{index + 1}</b>{step}</span></li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className={`payment-toast ${showToast ? "is-visible" : ""}`} role="status" aria-live="polite"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>تم نسخ معرف شام كاش.</div>

      {isOpen && <div className="payment-modal" role="dialog" aria-modal="true" aria-label="رمز شام كاش بحجم كامل" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }}>
        <button ref={closeButtonRef} type="button" onClick={() => setIsOpen(false)} className="payment-modal-close" aria-label="إغلاق الصورة"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
        <Image src={QR_PATH} width={824} height={1080} alt="رمز QR للدفع عبر شام كاش" className="payment-modal-image" priority />
      </div>}
    </section>
  );
}
