import type { HeroContent } from "@/lib/content";

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-amber-400 text-amber-400" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#030712] pt-28 pb-20 text-white lg:pt-36 lg:pb-28"
    >
      {/* Background Animated Aurora Orbs */}
      <div
        className="absolute -top-40 right-1/4 -z-10 size-[42rem] rounded-full bg-gradient-to-br from-sky-500/20 via-cyan-400/10 to-transparent blur-[140px] animate-pulse-slow"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 -left-32 -z-10 size-[36rem] rounded-full bg-gradient-to-tr from-blue-700/20 via-indigo-500/10 to-transparent blur-[140px] animate-float-gentle"
        aria-hidden="true"
      />

      {/* Islamic geometric pattern with smooth fade mask */}
      <div
        className="islamic-pattern absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Main Hero Column */}
          <div className="flex flex-col items-start text-right">
            {/* Live Badge Capsule */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-2 text-xs font-bold text-sky-200 shadow-inner backdrop-blur-xl">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-sky-300" />
              </span>
              <span>{content.badge}</span>
            </div>

            {/* Grand Main Title */}
            <h1 className="mt-6 text-3xl font-black leading-[1.18] tracking-tight sm:text-5xl lg:text-[4rem]">
              <span className="block text-white">تعلّم القرآن واللغة العربية</span>
              <span className="mt-2 block bg-gradient-to-l from-sky-300 via-cyan-200 to-white bg-clip-text text-transparent">
                بأعلى درجات الثقة والإتقان
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-slate-300 sm:text-lg sm:leading-loose">
              {content.description}
            </p>

            {/* Trust Points */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300">
              <div className="flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <StarIcon key={s} />
                ))}
                <span className="mr-1.5 text-white">منهج معتمد وموثق</span>
              </div>
              <span className="text-slate-600">•</span>
              <span className="text-sky-300">إشراف مباشر من الأستاذ خالد</span>
              <span className="text-slate-600">•</span>
              <span>تطبيقات عملية ومباشرة</span>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary-luxury group flex items-center justify-center gap-3 rounded-2xl px-8 py-4.5 text-center text-sm font-black tracking-wide"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5 shrink-0 transition-transform duration-200 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
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
                className="btn-secondary-luxury flex items-center justify-center gap-2 rounded-2xl px-7 py-4.5 text-center text-sm font-extrabold"
              >
                <span>{content.secondary_button}</span>
              </a>
            </div>

            {/* Stats Row */}
            <div className="mt-12 grid w-full grid-cols-3 gap-3 sm:max-w-2xl sm:gap-4">
              {content.stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:bg-white/[0.08]"
                >
                  <dd className="text-xl font-black text-sky-300 sm:text-2xl lg:text-3xl" dir="ltr">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-[11px] font-bold text-slate-300 sm:text-xs">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Spotlight Card Column */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* Glowing Backdrop */}
            <div
              className="absolute -inset-3 rounded-[3rem] bg-gradient-to-b from-sky-500/25 via-blue-600/10 to-transparent blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            <article className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-gradient-to-b from-[#091734]/90 to-[#040c1d]/95 p-7 text-right shadow-2xl backdrop-blur-2xl sm:p-9">
              {/* Top Accent Ribbon */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400/20 to-blue-500/20 px-3.5 py-1 text-xs font-extrabold text-sky-300 border border-sky-400/30">
                  ★ الدورة الرئيسية الشاملة
                </span>
                <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-bold text-slate-300">
                  شهادة مصدقة
                </span>
              </div>

              {/* Title & Methodology */}
              <h2 className="mt-5 text-xl font-black leading-snug text-white sm:text-2xl">
                الدورة الاحترافية لتخريج معلّمي القراءة العربية وقراءة القرآن الكريم
              </h2>
              <p className="mt-2 text-xs font-bold text-sky-300 sm:text-sm">
                المعتمدة على القاعدة التبيانية
              </p>

              {/* Matrix of Features */}
              <div className="mt-6 space-y-2.5">
                {[
                  { text: "100 ساعة تدريبية مكثفة وشاملة", icon: "⏱" },
                  { text: "محاضرات تفاعلية مباشرة عبر Zoom", icon: "📹" },
                  { text: "متابعة وإشراف دقيق عبر WhatsApp", icon: "💬" },
                  { text: "3 امتحانات شفهية لضبط الإتقان والأداء", icon: "📜" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 text-xs font-bold text-slate-200 transition-colors hover:bg-white/[0.07]"
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <a
                href="#professional-course"
                className="mt-7 flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-center text-xs font-black text-[#030a18] shadow-lg transition-all duration-200 hover:bg-sky-50 hover:shadow-xl sm:text-sm"
              >
                <span>استكشف المنهاج والرسوم ونظام التسجيل</span>
                <span>←</span>
              </a>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
