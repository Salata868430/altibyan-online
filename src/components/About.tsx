import Image from "next/image";
import type { AboutContent } from "@/lib/content";

export default function About({ content }: { content: AboutContent }) {
  return (
    <section id="about" className="section-pad relative overflow-hidden bg-[var(--surface-secondary)]/50">
      {/* Subtle ambient light */}
      <div
        className="absolute right-0 top-1/3 -z-10 size-96 rounded-full bg-[var(--primary)]/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
        {/* Author Image Showcase */}
        <div className="relative mx-auto w-full max-w-md">
          {/* Layered decorative backdrop frame */}
          <div
            className="absolute -inset-4 -rotate-2 rounded-[2.5rem] bg-gradient-to-tr from-[var(--primary)]/20 to-[var(--gold)]/10"
            aria-hidden="true"
          />

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.25rem] border border-[var(--border)] bg-gradient-to-br from-[#071735] to-[#040e22] shadow-2xl">
            <Image
              src={content.image_url || "/images/professor.jpg"}
              alt={`الأستاذ ${content.name}`}
              fill
              sizes="(max-width: 1023px) min(100vw - 2rem, 28rem), 28rem"
              className="object-cover object-center transition-transform duration-500 hover:scale-105"
              unoptimized={Boolean(
                content.image_url && content.image_url.startsWith("http"),
              )}
            />
            {/* Soft inner shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040e22]/80 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-5 -left-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary)]">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--muted)]">المشرف والمحاضر</p>
                <p className="text-sm font-extrabold text-[var(--foreground)]">{content.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Author Bio Information */}
        <div className="text-right">
          <span className="eyebrow">عن الأستاذ</span>
          <h2 className="section-title mt-3">الأستاذ {content.name}</h2>
          
          <p className="mt-4 inline-block text-lg font-bold text-[var(--primary)]">
            {content.title}
          </p>

          <p className="mt-6 text-base font-medium leading-relaxed text-[var(--card-text)] sm:text-lg sm:leading-loose">
            {content.bio}
          </p>

          {/* Milestone highlight box */}
          <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary)] text-white shadow-md">
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[var(--card-title)]">
                  أثر تعليمي مستمر وموثق
                </h3>
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-[var(--muted)]">
                  {content.experience}
                </p>
              </div>
            </div>
          </div>

          {/* Feature Badges */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { title: "تأصيل علمي", desc: "قواعد لغوية وقرآنية محكمة" },
              { title: "خبرة تدريبية", desc: "آلاف الخريجين والمعلمين" },
              { title: "مناهج معتمدة", desc: "سلسلة كتب متكاملة" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[var(--border)]/70 bg-[var(--surface)] p-3 text-center"
              >
                <strong className="block text-xs font-extrabold text-[var(--foreground)] sm:text-sm">
                  {item.title}
                </strong>
                <span className="mt-0.5 block text-[11px] font-medium text-[var(--muted)]">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
