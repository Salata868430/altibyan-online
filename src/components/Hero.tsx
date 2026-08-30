import type { HeroContent } from "@/lib/content";

function StatIcon({ index }: { index: number }) {
  if (index === 0) {
    // Teachers / students icon
    return (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }
  if (index === 1) {
    // Hours icon
    return (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }
  // Exams / Certificate icon
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m9 15 2 2 4-4" />
    </svg>
  );
}

export default function Hero({
  content,
  whatsappUrl,
}: {
  content: HeroContent;
  whatsappUrl: string;
}) {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#030d1e] via-[#071938] to-[#041026] text-white"
    >
      {/* Ambient background glows */}
      <div
        className="absolute -top-40 right-1/4 -z-10 size-[36rem] rounded-full bg-sky-500/15 blur-[120px] animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-10 -z-10 size-[30rem] rounded-full bg-blue-600/15 blur-[130px] animate-float-soft"
        aria-hidden="true"
      />
      
      {/* Islamic geometric watermark */}
      <div
        className="islamic-pattern absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black_40%,transparent_95%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-page relative grid min-h-[calc(100svh-5rem)] items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.12fr_.88fr] lg:gap-14 lg:py-24">
        {/* Right side (Main Hero Copy) */}
        <div className="flex flex-col items-start text-right">
          {/* Badge */}
          <div className="hero-badge-pill inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs sm:text-sm font-bold tracking-wide backdrop-blur-md">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-sky-300" />
            </span>
            <span>{content.badge}</span>
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-3xl font-extrabold leading-[1.22] tracking-tight sm:text-5xl lg:text-[3.85rem] text-balance">
            {content.title}
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base font-normal leading-relaxed text-slate-200 sm:text-lg sm:leading-loose">
            {content.description}
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:items-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="primary-button group flex items-center justify-center gap-3 rounded-2xl px-7 py-4 text-center text-sm font-bold tracking-wide"
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
              <span>{content.primary_button}</span>
              <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
            </a>

            <a
              href="#professional-course"
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-center text-sm font-bold text-white shadow-sm backdrop-blur-md transition-all duration-200 hover:border-white/40 hover:bg-white/10 hover:text-sky-200"
            >
              <span>{content.secondary_button}</span>
            </a>
          </div>

          {/* Key Facts / Metrics */}
          <dl className="mt-12 grid w-full grid-cols-3 gap-2.5 sm:max-w-2xl sm:gap-4">
            {content.stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="hero-stat-card flex flex-col items-center justify-center rounded-2xl p-3.5 text-center sm:p-5"
              >
                <div className="mb-2 flex size-8 items-center justify-center rounded-xl bg-sky-500/15 text-sky-300">
                  <StatIcon index={idx} />
                </div>
                <dd className="text-xl font-extrabold text-white sm:text-2xl lg:text-3xl" dir="ltr">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-[11px] font-semibold text-slate-300 sm:text-xs">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Left side (Featured Course Spotlight Card) */}
        <div className="relative mx-auto w-full max-w-lg">
          {/* Subtle glowing halo behind card */}
          <div
            className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-sky-500/20 via-blue-600/10 to-transparent blur-xl"
            aria-hidden="true"
          />

          <article className="hero-featured-card relative overflow-hidden rounded-[2.25rem] p-7 text-right sm:p-9">
            {/* Header pill */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-400/15 px-3 py-1 text-xs font-bold text-sky-300">
                <span className="size-1.5 rounded-full bg-sky-400" />
                الدورة التدريبية الرئيسية
              </span>
              <span className="text-xs font-semibold text-slate-300">مباشر ومكثف</span>
            </div>

            {/* Course Title */}
            <h2 className="mt-5 text-xl font-extrabold leading-snug text-white sm:text-2xl">
              الدورة الاحترافية لتخريج معلّمي القراءة العربية وقراءة القرآن الكريم
            </h2>
            <p className="mt-2.5 text-sm font-medium text-sky-200/90">
              من خلال القاعدة التبيانية
            </p>

            {/* Key highlights grid */}
            <div className="mt-6 grid grid-cols-2 gap-2.5">
              {[
                { label: "100 ساعة تدريبية", icon: "⏱" },
                { label: "محاضرات عبر Zoom", icon: "📹" },
                { label: "متابعة WhatsApp خاصة", icon: "💬" },
                { label: "شهادة مصدقة وموثقة", icon: "📜" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-xs font-bold text-slate-200 backdrop-blur-sm"
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Bottom action button */}
            <a
              href="#professional-course"
              className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-center text-xs sm:text-sm font-extrabold text-[#05142e] shadow-md transition-all duration-200 hover:bg-sky-50 hover:shadow-lg"
            >
              <span>استعرض كامل تفاصيل ومنهج الدورة</span>
              <span>←</span>
            </a>
          </article>
        </div>
      </div>

      {/* Elegant bottom section divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
    </section>
  );
}
