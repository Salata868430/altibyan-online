import type { TestimonialContent } from "@/lib/content";

export default function Testimonials({
  content,
}: {
  content: TestimonialContent;
}) {
  return (
    <section id="testimonials" className="section-pad relative overflow-hidden bg-[var(--surface-secondary)]/50">
      <div className="container-page">
        {/* Header with Disclaimer */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="text-right">
            <span className="eyebrow">{content.eyebrow}</span>
            <h2 className="section-title mt-3">{content.title}</h2>
          </div>
          <p className="max-w-md text-xs font-medium leading-relaxed text-[var(--muted)]">
            {content.disclaimer}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {content.items.map((item, index) => (
            <figure
              key={`${item.name}-${index}`}
              className="card-hover-effect flex flex-col justify-between rounded-3xl border border-[var(--border)] bg-[var(--card-surface)] p-7 shadow-sm"
            >
              <div>
                {/* Quote Icon */}
                <div className="text-sky-400">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-8"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                <blockquote className="mt-5 text-base font-medium leading-relaxed text-[var(--card-text)] sm:text-lg sm:leading-loose">
                  «{item.quote}»
                </blockquote>
              </div>

              {/* Author info */}
              <figcaption className="mt-8 flex items-center gap-3.5 border-t border-[var(--border)]/70 pt-5">
                <span className="flex size-11 items-center justify-center rounded-full bg-[var(--dark-panel)] font-bold text-sky-300">
                  {item.name.charAt(0)}
                </span>
                <div>
                  <strong className="block text-sm font-extrabold text-[var(--card-title)]">
                    {item.name}
                  </strong>
                  <small className="block text-xs font-semibold text-[var(--muted)]">
                    {item.track}
                  </small>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
