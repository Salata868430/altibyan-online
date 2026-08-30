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
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">البرامج والمسارات التعليمية</span>
          <h2 className="section-title mt-3">سبعة مسارات تدريبية وتأسيسية</h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-[var(--muted)] sm:text-lg">
            برامج متخصصة ومتدرجة تغطي كافة الاحتياجات من التأسيس الأولي وحتى إتقان الختمة وتأهيل المدرّسين.
          </p>
        </div>

        {/* Courses Interactive Grid */}
        <ol className="mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-2">
          {courses.map((course, index) => (
            <li
              key={course.id ?? `${course.name}-${index}`}
              className={`group flex items-center justify-between gap-4 rounded-3xl border border-[var(--border)] bg-[var(--card-surface)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--primary)] hover:shadow-xl ${
                index === courses.length - 1 ? "md:col-span-2" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--dark-panel)] font-black text-sky-300 shadow-md">
                  {index + 1}
                </span>
                <div className="text-right">
                  <h3 className="text-base font-black text-[var(--card-title)] transition-colors group-hover:text-[var(--primary)] sm:text-lg">
                    {course.name}
                  </h3>
                  {course.description && (
                    <p className="mt-1 text-xs font-bold text-[var(--muted)]">
                      {course.description}
                    </p>
                  )}
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 rounded-xl bg-[var(--surface-secondary)] px-4 py-2 text-xs font-black text-[var(--primary)] transition-all duration-200 group-hover:bg-[var(--primary)] group-hover:text-white"
              >
                تسجيل ←
              </a>
            </li>
          ))}
        </ol>

        {/* Action button */}
        <div className="mt-14 text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary-luxury inline-flex items-center gap-3 rounded-2xl px-9 py-4.5 text-center text-sm font-black tracking-wide"
          >
            <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
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
