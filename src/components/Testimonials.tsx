import type { TestimonialContent } from "@/lib/content";

function StarRating() {
  return (
    <div className="flex items-center gap-1 text-amber-400">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} viewBox="0 0 24 24" className="size-4 fill-amber-400" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({
  content,
}: {
  content: TestimonialContent;
}) {
  return (
    <section id="testimonials" className="section-pad relative overflow-hidden bg-[var(--surface)]">
      <div className="container-page">
        {/* Header with Disclaimer */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="text-right">
            <span className="eyebrow">{content.eyebrow}</span>
            <h2 className="section-title mt-3">{content.title}</h2>
          </div>
          <p className="max-w-md text-xs font-bold leading-relaxed text-[var(--muted)]">
            {content.disclaimer}
          </p>
        </div>

        {/* Testimonials 3 Column Grid */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {content.items.map((item, index) => (
            <figure
              key={`${item.name}-${index}`}
              className="group flex flex-col justify-between rounded-[2.25rem] border border-[var(--border)] bg-[var(--card-surface)] p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[var(--primary)] hover:shadow-2xl"
            >
              <div>
                {/* Rating & Quote Header */}
                <div className="flex items-center justify-between">
                  <StarRating />
                  <span className="text-3xl text-sky-400 font-serif">“</span>
                </div>

                <blockquote className="mt-6 text-base font-medium leading-relaxed text-[var(--card-text)] sm:text-lg sm:leading-loose">
                  «{item.quote}»
                </blockquote>
              </div>

              {/* Author Footer */}
              <figcaption className="mt-8 flex items-center gap-4 border-t border-[var(--border)] pt-6">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[var(--dark-panel)] font-black text-sky-300 shadow-md">
                  {item.name.charAt(0)}
                </span>
                <div className="text-right">
                  <strong className="block text-sm font-black text-[var(--card-title)] sm:text-base">
                    {item.name}
                  </strong>
                  <small className="block text-xs font-bold text-[var(--primary)]">
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
