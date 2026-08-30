import type { Book } from "@/lib/content";

export default function Publications({ books }: { books: Book[] }) {
  return (
    <section id="publications" className="section-pad relative overflow-hidden bg-[var(--surface-secondary)]/60">
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">المؤلفات والمناهج التعليمية</span>
          <h2 className="section-title mt-3">سلسلة كتب ومناهج التبيان</h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-[var(--muted)] sm:text-lg">
            أربعة مؤلفات معتمدة متخصصة في تأسيس القراءة وضبط لفظ القرآن الكريم وأحكام التجويد للطلاب والمعلمين.
          </p>
        </div>

        {/* 3D Book Showcase Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((book, index) => (
            <article
              key={book.id ?? book.title}
              className="book-3d-card group relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-[2.25rem] border border-[var(--border)] bg-[var(--card-surface)] p-8 shadow-md"
            >
              {/* Decorative Book Spine */}
              <div className="book-spine" aria-hidden="true" />

              {/* Bookmark Ribbon */}
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[var(--dark-panel)] text-sky-300 shadow-md">
                  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </span>
                <span className="rounded-full bg-[var(--surface-secondary)] px-3.5 py-1 text-xs font-black text-[var(--primary)] border border-[var(--border)]">
                  الكتاب {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Book Content */}
              <div className="my-6">
                <span className="text-[11px] font-bold text-[var(--primary)] uppercase tracking-wider">
                  منهاج تدريبي معتمد
                </span>
                <h3 className="mt-2.5 text-lg font-black leading-snug text-[var(--card-title)] transition-colors group-hover:text-[var(--primary)] sm:text-xl">
                  {book.title}
                </h3>
              </div>

              {/* Author & Verification Footer */}
              <div className="border-t border-[var(--border)] pt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[var(--muted)]">المؤلف:</span>
                  <span className="font-black text-[var(--foreground)]">{book.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
