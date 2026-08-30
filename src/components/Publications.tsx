import type { Book } from "@/lib/content";

export default function Publications({ books }: { books: Book[] }) {
  return (
    <section id="publications" className="section-pad relative overflow-hidden bg-[var(--surface)]">
      {/* Background ambient lighting */}
      <div
        className="absolute -left-20 top-1/2 -z-10 size-96 rounded-full bg-[var(--primary)]/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">مؤلفات الأستاذ</span>
          <h2 className="section-title mt-3">سلسلة مناهج التبيان</h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-[var(--muted)] sm:text-lg">
            أربعة مؤلفات منهجية متخصصة في تأسيس القراءة العربية وضبط لفظ القرآن الكريم وإتقان أحكام التجويد.
          </p>
        </div>

        {/* Books Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((book, index) => (
            <article
              key={book.id ?? book.title}
              className="card-hover-effect group relative flex min-h-[19rem] flex-col justify-between overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card-surface)] p-7 shadow-sm"
            >
              {/* Subtle top accent gradient */}
              <div
                className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[var(--primary)] via-sky-400 to-[var(--gold)] opacity-80"
                aria-hidden="true"
              />

              <div>
                {/* Header row with Book Icon & Number Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)] transition-transform duration-300 group-hover:scale-110">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      <line x1="12" y1="6" x2="16" y2="6" />
                      <line x1="12" y1="10" x2="16" y2="10" />
                    </svg>
                  </div>
                  <span className="rounded-full bg-[var(--surface-secondary)] px-3 py-1 text-xs font-black tracking-wider text-[var(--primary)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Book Title */}
                <h3 className="mt-7 text-lg font-extrabold leading-snug text-[var(--card-title)] transition-colors duration-200 group-hover:text-[var(--primary)]">
                  {book.title}
                </h3>
              </div>

              {/* Author & Footer info */}
              <div className="mt-8 border-t border-[var(--border)]/70 pt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--muted)]">تأليف</span>
                  <span className="font-bold text-[var(--foreground)]">{book.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
