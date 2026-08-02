"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type GalleryImage = { src: string; alt: string; label: string };

// أضف صور الدورة التي يرفعها صاحب الموقع هنا فقط.
const courseImages: GalleryImage[] = [];
const placeholders = ["الحلقات القرآنية", "أنشطة الطلاب", "البيئة التعليمية"];

function ImageIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m4 17 5-5 4 4 2-2 5 4"/></svg>;
}

export default function InstituteGallery() {
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [selected]);

  return (
    <>
      <div className="institute-gallery mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courseImages.length > 0 ? courseImages.map((image, index) => (
          <button key={image.src} type="button" onClick={() => setSelected(image)} className={`institute-gallery-image ${index % 5 === 0 ? "is-featured" : ""} ${index % 5 === 3 ? "is-tall" : ""}`} aria-label={`فتح الصورة: ${image.label}`}>
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" />
            <span>{image.label}</span>
          </button>
        )) : placeholders.map((label, index) => (
          <div key={label} className={`institute-media-placeholder ${index === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
            <span><ImageIcon /></span><b>{label}</b><small>بانتظار صور الدورة المعتمدة</small>
          </div>
        ))}
      </div>

      {selected && <div className="institute-gallery-modal" role="dialog" aria-modal="true" aria-label={selected.label} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
        <button ref={closeRef} type="button" onClick={() => setSelected(null)} aria-label="إغلاق الصورة" className="institute-gallery-close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
        <figure><Image src={selected.src} alt={selected.alt} width={1600} height={1100} className="institute-gallery-modal-image" priority /><figcaption>{selected.label}</figcaption></figure>
      </div>}
    </>
  );
}
