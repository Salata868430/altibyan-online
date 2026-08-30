import type { ContactContent } from "@/lib/content";

export default function Contact({ content }: { content: ContactContent }) {
  const whatsapp = `https://wa.me/${content.whatsapp.replace(/\D/g, "")}`;

  return (
    <section id="contact" className="section-pad relative overflow-hidden bg-[var(--surface-secondary)]/60">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#040d1e] via-[#081a3e] to-[#020712] px-8 py-16 text-center text-white shadow-2xl sm:px-16 sm:py-24">
          {/* Islamic pattern background */}
          <div className="islamic-pattern absolute inset-0 opacity-25 pointer-events-none" aria-hidden="true" />
          
          {/* Glowing central light */}
          <div className="absolute top-1/2 left-1/2 -z-0 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/20 blur-[120px] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/15 px-4 py-1.5 text-xs font-bold text-sky-200 backdrop-blur-md">
              <span className="size-2 rounded-full bg-sky-400 animate-pulse" />
              تواصل واستفسار فوري
            </span>

            <h2 className="mt-6 text-3xl font-black leading-tight text-white sm:text-5xl lg:text-6xl text-balance">
              {content.title}
            </h2>

            <p className="mt-6 text-base font-medium leading-relaxed text-slate-300 sm:text-lg">
              {content.description}
            </p>

            {/* Direct WhatsApp Callout Button */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="btn-primary-luxury group flex items-center justify-center gap-3 rounded-2xl px-10 py-5 text-center text-sm font-black tracking-wide shadow-2xl"
              >
                <svg viewBox="0 0 24 24" className="size-5.5 shrink-0 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M20 11.5a8.3 8.3 0 0 1-12.3 7.3L4 20l1.3-4.5A8.3 8.3 0 1 1 20 11.5Z" />
                  <path d="M9 10c.5 2 2.5 3.5 4 4" />
                </svg>
                <span>{content.button}</span>
                <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
              </a>
            </div>

            {/* Direct Phone & Email */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-300 sm:text-sm">
              <span dir="ltr" className="rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 font-mono">
                {content.phone}
              </span>
              {content.email && (
                <a
                  href={`mailto:${content.email}`}
                  className="rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 transition-colors hover:bg-white/10 hover:text-sky-200"
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
