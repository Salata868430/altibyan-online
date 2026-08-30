import Image from "next/image";
import type { AboutContent } from "@/lib/content";

export default function About({ content }: { content: AboutContent }) {
  return (
    <section id="about" className="section-pad relative overflow-hidden bg-[var(--surface)]">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 right-0 -z-10 size-[32rem] rounded-full bg-[var(--primary)]/5 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Portrait Column */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* Geometric layered frame */}
            <div
              className="absolute -inset-4 -rotate-3 rounded-[3rem] bg-gradient-to-tr from-[var(--primary)]/20 via-sky-400/10 to-[var(--gold)]/20"
              aria-hidden="true"
            />

            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] border border-[var(--border)] bg-[#050e20] shadow-2xl">
              <Image
                src={content.image_url || "/images/professor.jpg"}
                alt={`الأستاذ ${content.name}`}
                fill
                sizes="(max-width: 1023px) min(100vw - 2rem, 30rem), 32rem"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
                unoptimized={Boolean(
                  content.image_url && content.image_url.startsWith("http"),
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020712]/90 via-transparent to-transparent pointer-events-none" />

              {/* Bottom badge inside portrait */}
              <div className="absolute bottom-6 inset-x-6 z-10 text-right">
                <span className="rounded-full bg-sky-500/20 border border-sky-400/30 px-3 py-1 text-xs font-bold text-sky-200 backdrop-blur-md">
                  المشرف العام والمحاضر
                </span>
                <p className="mt-2 text-xl font-black text-white">{content.name}</p>
                <p className="text-xs font-bold text-slate-300">{content.title}</p>
              </div>
            </div>
          </div>

          {/* Bio and Narrative Column */}
          <div className="text-right">
            <span className="eyebrow">عن الأستاذ والمشرف</span>
            <h2 className="section-title mt-3">الأستاذ {content.name}</h2>
            
            <p className="mt-4 inline-block text-lg font-black text-[var(--primary)]">
              {content.title}
            </p>

            <p className="mt-6 text-base font-medium leading-relaxed text-[var(--card-text)] sm:text-lg sm:leading-loose">
              {content.bio}
            </p>

            {/* Huge Impact Highlight Card */}
            <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface-secondary)] p-7 shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--dark-panel)] text-sky-300 shadow-md">
                  <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-black text-[var(--card-title)] sm:text-lg">
                    تأهيل علمي وعملي معتمد
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--muted)]">
                    {content.experience}
                  </p>
                </div>
              </div>
            </div>

            {/* 3 Pillars Grid */}
            <div className="mt-8 grid grid-cols-3 gap-3.5">
              {[
                { title: "إتقان القاعدة", desc: "تأسيس لغوي وقرآني محكم" },
                { title: "خبرة تراكمية", desc: "تخريج أكثر من 5300 معلّم" },
                { title: "مناهج متكاملة", desc: "سلسلة كتب علمية متخصصة" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center shadow-sm"
                >
                  <strong className="block text-xs font-black text-[var(--foreground)] sm:text-sm">
                    {item.title}
                  </strong>
                  <span className="mt-1 block text-[11px] font-bold text-[var(--muted)]">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
