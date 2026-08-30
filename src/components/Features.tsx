import type { FeatureContent } from "@/lib/content";

export default function Features({ content }: { content: FeatureContent }) {
  return (
    <section id="features" className="section-pad relative overflow-hidden bg-[var(--surface-secondary)]/60">
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">{content.eyebrow}</span>
          <h2 className="section-title mt-3">{content.title}</h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-[var(--muted)] sm:text-lg">
            مخرجات تدريبية وتربوية عملية تنعكس مباشرة على مهارة المعلّم وإتقان الطالب.
          </p>
        </div>

        {/* 3x3 Grid */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, index) => (
            <article
              key={`${item}-${index}`}
              className="group flex items-center gap-4.5 rounded-3xl border border-[var(--border)] bg-[var(--card-surface)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--primary)] hover:shadow-xl"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-base font-black text-[var(--primary)] transition-transform duration-300 group-hover:scale-110">
                {index + 1}
              </span>
              <h3 className="text-sm font-black leading-snug text-[var(--card-title)] sm:text-base">
                {item}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
