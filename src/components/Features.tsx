import type { FeatureContent } from "@/lib/content";

export default function Features({ content }: { content: FeatureContent }) {
  return (
    <section id="features" className="section-pad relative overflow-hidden bg-[var(--surface-secondary)]/50">
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">{content.eyebrow}</span>
          <h2 className="section-title mt-3">{content.title}</h2>
          <p className="mt-4 text-base font-medium text-[var(--muted)] sm:text-lg">
            مخرجات تدريبية عملية تسهم في الارتقاء بمستوى القراءة والتعليم القرآني.
          </p>
        </div>

        {/* Features 3x3 Grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, index) => (
            <article
              key={`${item}-${index}`}
              className="card-hover-effect flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card-surface)] p-5 shadow-sm"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-sm font-extrabold text-[var(--primary)]">
                {index + 1}
              </span>
              <h3 className="text-sm font-extrabold leading-snug text-[var(--card-title)] sm:text-base">
                {item}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
