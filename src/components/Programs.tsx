import type { Course } from "@/lib/content";

export default function Programs({
  courses,
  whatsappUrl,
}: {
  courses: Course[];
  whatsappUrl: string;
}) {
  return (
    <section id="programs" className="section-pad relative overflow-hidden bg-[var(--surface)]">
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">المسارات التعليمية المتاحة</span>
          <h2 className="section-title mt-3">سبعة مسارات تدريبية وتأسيسية</h2>
          <p className="mt-4 text-base font-medium text-[var(--muted)] sm:text-lg">
            برامج متخصصة تناسب مختلف المستويات من المبتدئين وحتى تأهيل المعلمين وإتقان التجويد.
          </p>
        </div>

        {/* Courses Grid */}
        <ol className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-2">
          {courses.map((course, index) => (
            <li
              key={course.id ?? `${course.name}-${index}`}
              className={`card-hover-effect flex items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card-surface)] p-5.5 shadow-sm ${
                index === courses.length - 1 ? "md:col-span-2" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--dark-panel)] text-sm font-black text-sky-300">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-[var(--card-title)]">
                    {course.name}
                  </h3>
                  {course.description && (
                    <p className="mt-1 text-xs font-medium text-[var(--muted)]">
                      {course.description}
                    </p>
                  )}
                </div>
              </div>

              <span className="shrink-0 text-xs font-bold text-[var(--primary)]">
                متاح للتسجيل ←
              </span>
            </li>
          ))}
        </ol>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="primary-button inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-center text-sm font-extrabold tracking-wide"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4.5 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M20 11.5a8.3 8.3 0 0 1-12.3 7.3L4 20l1.3-4.5A8.3 8.3 0 1 1 20 11.5Z" />
              <path d="M9 10c.5 2 2.5 3.5 4 4" />
            </svg>
            <span>استفسر عن الدورة والمسار المناسب لك عبر واتساب</span>
          </a>
        </div>
      </div>
    </section>
  );
}
