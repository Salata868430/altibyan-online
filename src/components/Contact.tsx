import type { ContactContent } from "@/lib/content";

export default function Contact({ content }: { content: ContactContent }) {
  const whatsapp = `https://wa.me/${content.whatsapp.replace(/\D/g, "")}`;

  return (
    <section id="contact" className="section-pad relative overflow-hidden bg-[var(--surface)]">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#061530] via-[#091f48] to-[#040f24] px-7 py-16 text-center text-white shadow-2xl sm:px-12 sm:py-20">
          {/* Islamic geometric pattern */}
          <div className="islamic-pattern absolute inset-0 opacity-25 pointer-events-none" aria-hidden="true" />

          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -z-0 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/20 blur-[100px] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-400/15 px-4 py-1.5 text-xs font-bold text-sky-300">
              <span className="size-2 rounded-full bg-sky-400 animate-pulse" />
              التسجيل والاستفسار المباشر
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              {content.title}
            </h2>

            <p className="mt-5 text-base font-medium leading-relaxed text-slate-200 sm:text-lg">
              {content.description}
            </p>

            {/* Main WhatsApp Button */}
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="primary-button group flex items-center gap-3 rounded-2xl px-8 py-4 text-center text-sm font-extrabold tracking-wide"
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
                <span>{content.button}</span>
                <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
              </a>
            </div>

            {/* Direct Phone & Email info */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-300 sm:text-sm">
              <span dir="ltr" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-mono">
                {content.phone}
              </span>
              {content.email && (
                <a
                  href={`mailto:${content.email}`}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10 hover:text-sky-200"
                >
                  {content.email}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
