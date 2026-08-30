import type { ProfessionalContent } from "@/lib/content";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 shrink-0 text-sky-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
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
  const stats = [
    { value: `${content.hours} ساعة`, label: "تدريب مكثف", icon: "⏱" },
    { value: `${content.fee} دولارًا`, label: "رسوم قبل البدء", icon: "💎" },
    { value: "Zoom", label: "محاضرات مباشرة", icon: "📹" },
    { value: "3", label: "امتحانات شفهية", icon: "📝" },
    { value: "موثقة", label: "شهادة مصدقة", icon: "📜" },
  ];

  return (
    <section
      id="professional-course"
      className="section-pad relative isolate overflow-hidden bg-[#051128] text-white"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute -top-32 right-10 -z-10 size-[32rem] rounded-full bg-sky-500/15 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 left-10 -z-10 size-[30rem] rounded-full bg-blue-600/15 blur-[120px]"
        aria-hidden="true"
      />

      {/* Islamic geometric pattern watermark */}
      <div
        className="islamic-pattern absolute inset-0 opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-page relative">
        {/* Header */}
        <div className="max-w-4xl text-right">
          <span className="eyebrow !text-sky-300">الدورة الرئيسية المعتمدة</span>
          <h2 className="mt-3 text-2xl font-extrabold leading-snug sm:text-4xl lg:text-5xl text-white">
            {content.name}
          </h2>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="pro-stat-tile flex flex-col items-center justify-center rounded-2xl p-4 text-center sm:p-5"
            >
              <span className="text-xl mb-1">{stat.icon}</span>
              <strong className="text-lg font-black text-sky-300 sm:text-2xl" dir="ltr">
                {stat.value}
              </strong>
              <span className="mt-1 text-xs font-semibold text-slate-300">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Textbook Highlight Banner */}
        <div className="mt-8 rounded-2xl border border-sky-400/30 bg-gradient-to-r from-sky-500/15 via-blue-600/15 to-transparent p-6 backdrop-blur-md">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-xs font-bold text-sky-300">الكتاب والمنهج المعتمد للدورة</span>
              <h3 className="mt-1 text-lg font-extrabold text-white sm:text-xl">
                {content.book}
              </h3>
            </div>
            <span className="self-start sm:self-auto rounded-full bg-sky-400/20 px-3.5 py-1 text-xs font-bold text-sky-200">
              المستوى الشامل
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Teaching System Card */}
          <article className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-md sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-sky-400/20 text-sky-300">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </span>
              <h3 className="text-xl font-extrabold text-white">نظام التدريس والمحاضرات</h3>
            </div>
            <ul className="mt-6 space-y-3.5">
              {content.teaching.map((item, idx) => (
                <li key={`${item}-${idx}`} className="flex items-start gap-3 text-sm font-medium leading-relaxed text-slate-200">
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* Exams and Certification Card */}
          <article className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-md sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-amber-400/20 text-amber-300">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              </span>
              <h3 className="text-xl font-extrabold text-white">الامتحانات والشهادة</h3>
            </div>
            <ul className="mt-6 space-y-3.5">
              {content.exams.map((item, idx) => (
                <li key={`${item}-${idx}`} className="flex items-start gap-3 text-sm font-medium leading-relaxed text-slate-200">
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* Benefits, Practical Skills & Requirements */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Course Features / Benefits */}
          <article className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-md sm:p-8">
            <h3 className="text-xl font-extrabold text-white">فوائد ومخرجات الدورة</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {content.features.map((item, idx) => (
                <div
                  key={`${item}-${idx}`}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 text-xs font-bold leading-relaxed text-slate-200"
                >
                  <CheckIcon />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>

          {/* Practical Skills & Admission Conditions */}
          <div className="space-y-6">
            {/* Practical Skills Card */}
            <article className="rounded-3xl border border-sky-400/30 bg-gradient-to-br from-sky-500/20 to-blue-600/10 p-7 backdrop-blur-md sm:p-8">
              <h3 className="text-xl font-extrabold text-white">المهارات العملية المستهدفة</h3>
              <ul className="mt-5 grid grid-cols-2 gap-3">
                {content.skills.map((skill, idx) => (
                  <li
                    key={`${skill}-${idx}`}
                    className="flex items-center gap-2 rounded-xl bg-sky-400/20 px-3 py-2.5 text-xs font-bold text-sky-100"
                  >
                    <span>★</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Admission Conditions */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-md sm:p-8">
              <h3 className="text-xl font-extrabold text-white">شروط الالتحاق</h3>
              <ul className="mt-4 space-y-2.5">
                {content.conditions.map((cond, idx) => (
                  <li key={`${cond}-${idx}`} className="flex items-start gap-2.5 text-xs font-medium text-slate-300">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-sky-400" />
                    <span>{cond}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>

        {/* WhatsApp Registration CTA Button */}
        <div className="mt-12 flex justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="primary-button group flex items-center gap-3 rounded-2xl px-9 py-4 text-center text-sm font-extrabold tracking-wide"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5 shrink-0 transition-transform duration-200 group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M20 11.5a8.3 8.3 0 0 1-12.3 7.3L4 20l1.3-4.5A8.3 8.3 0 1 1 20 11.5Z" />
              <path d="M9 10c.5 2 2.5 3.5 4 4" />
            </svg>
            <span>سجّل الآن في الدورة الاحترافية عبر واتساب</span>
            <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
          </a>
        </div>
      </div>
    </section>
  );
}
