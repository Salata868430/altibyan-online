"use client";

import { useState } from "react";
import type { ProfessionalContent } from "@/lib/content";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4.5 shrink-0 text-sky-400" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function ProfessionalCourse({
  content,
  whatsappUrl,
}: {
  content: ProfessionalContent;
  whatsappUrl: string;
}) {
  const [activeTab, setActiveTab] = useState<"teaching" | "exams" | "skills" | "conditions" | "features">("teaching");

  const tabs = [
    { id: "teaching", label: "نظام التدريس والمحاضرات", icon: "📹" },
    { id: "exams", label: "الامتحانات وتوزيع الدرجات", icon: "📊" },
    { id: "skills", label: "المهارات العملية المستهدفة", icon: "🎯" },
    { id: "conditions", label: "شروط الالتحاق", icon: "📋" },
    { id: "features", label: "فوائد ومخرجات الدورة", icon: "✨" },
  ] as const;

  return (
    <section
      id="professional-course"
      className="section-pad relative isolate overflow-hidden bg-[#040b1a] text-white"
    >
      {/* Ambient background glows */}
      <div
        className="absolute top-1/4 right-0 -z-10 size-[36rem] rounded-full bg-sky-500/15 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-10 -z-10 size-[32rem] rounded-full bg-blue-600/15 blur-[140px]"
        aria-hidden="true"
      />

      <div className="islamic-pattern absolute inset-0 opacity-25 pointer-events-none" aria-hidden="true" />

      <div className="container-page relative">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center !text-sky-300">الدورة التدريبية الرئيسية</span>
          <h2 className="mt-4 text-2xl font-black leading-snug text-white sm:text-4xl lg:text-5xl text-balance">
            {content.name}
          </h2>
          <p className="mt-4 text-sm font-bold text-sky-200 sm:text-base">
            الكتاب المعتمد: {content.book}
          </p>
        </div>

        {/* 5 Key Metric Capsules */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {[
            { value: `${content.hours} ساعة`, label: "تدريب مكثف", icon: "⏱" },
            { value: `${content.fee} دولارًا`, label: "رسوم الدورة", icon: "💎" },
            { value: "Zoom", label: "محاضرات مباشرة", icon: "📹" },
            { value: "3", label: "امتحانات شفهية", icon: "📝" },
            { value: "موثقة", label: "شهادة معتمدة", icon: "📜" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-center backdrop-blur-md transition-all duration-200 hover:border-sky-400/40 hover:bg-white/[0.08]"
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <strong className="text-xl font-black text-sky-300 sm:text-2xl" dir="ltr">
                {item.value}
              </strong>
              <span className="mt-1 text-xs font-bold text-slate-300">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Masterclass Interactive Explorer */}
        <div className="mt-14 overflow-hidden rounded-[2.5rem] border border-white/15 bg-gradient-to-b from-[#081530]/90 to-[#040e22]/95 p-6 shadow-2xl backdrop-blur-2xl sm:p-10 lg:p-12">
          {/* Tab Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-white/10 pb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-black transition-all duration-200 sm:text-sm ${
                  activeTab === tab.id
                    ? "bg-sky-400 text-[#040b1a] shadow-lg shadow-sky-400/25 scale-105"
                    : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="mt-8">
            {activeTab === "teaching" && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
                {content.teaching.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <CheckIcon />
                    <span className="text-sm font-bold leading-relaxed text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "exams" && (
              <div className="space-y-4 animate-fade-in">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {content.exams.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <span className="flex size-9 items-center justify-center rounded-xl bg-amber-400/20 font-black text-amber-300">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-extrabold text-slate-100">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in">
                {content.skills.map((skill, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center rounded-2xl border border-sky-400/30 bg-gradient-to-b from-sky-500/15 to-transparent p-6 text-center">
                    <span className="text-2xl mb-2">★</span>
                    <strong className="text-base font-black text-white">{skill}</strong>
                    <span className="mt-1 text-xs text-sky-200">مهارة عملية تدريبية</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "conditions" && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
                {content.conditions.map((cond, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <span className="mt-1 size-2 shrink-0 rounded-full bg-sky-400" />
                    <span className="text-sm font-bold leading-relaxed text-slate-200">{cond}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "features" && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
                {content.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4.5">
                    <CheckIcon />
                    <span className="text-xs font-extrabold leading-relaxed text-slate-200 sm:text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary-luxury group flex items-center justify-center gap-3 rounded-2xl px-9 py-4 text-center text-sm font-black tracking-wide"
            >
              <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M20 11.5a8.3 8.3 0 0 1-12.3 7.3L4 20l1.3-4.5A8.3 8.3 0 1 1 20 11.5Z" />
                <path d="M9 10c.5 2 2.5 3.5 4 4" />
              </svg>
              <span>سجّل الآن في الدورة الاحترافية عبر واتساب</span>
              <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
