import Image from "next/image";
import InstituteGallery from "./InstituteGallery";

const stats = [
  {
    value: "+140",
    label: "طالبًا وطالبة",
    image: "/images/halab-students-active.jpeg",
    imageAlt: "طلاب معهد التبيان يرفعون كتبهم داخل الحلقة",
    imagePosition: "center 42%",
    numeric: true,
  },
  {
    value: "5",
    label: "المدير + 4 معلمين ومعلمات",
    image: "/images/teaching-team-illustration.png",
    imageAlt: "رسم رمزي لفريق تعليم القرآن الكريم",
    imagePosition: "center",
    numeric: true,
  },
  {
    value: "حلب",
    label: "سوريا - التعليم الحضوري",
    image: "/images/aleppo-citadel-modern.jpg",
    imageAlt: "قلعة حلب وقت الغروب",
    imagePosition: "center",
  },
  {
    value: "مجانًا",
    label: "الدراسة بالكامل لوجه الله",
    image: "/images/free-education-illustration.png",
    imageAlt: "رسم رمزي لإتاحة تعليم القرآن مجانًا",
    imagePosition: "center",
  },
] as const;

export default function AleppoInstitute({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <section id="aleppo-institute" className="section-pad relative overflow-hidden bg-[var(--surface)]" dir="rtl">
      <div className="container-page relative">
        {/* Cinematic Header Block */}
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="text-right">
            <span className="eyebrow">المشروع الميداني في حلب</span>
            <h2 className="section-title mt-3">
              معهد التبيان لتحفيظ القرآن الكريم
            </h2>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs font-black text-emerald-600 dark:text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>مشروع قرآني مجاني بالكامل</span>
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-secondary)] p-7 text-base font-medium leading-relaxed text-[var(--card-text)] sm:p-9 sm:text-lg sm:leading-loose shadow-sm">
            <p>
              يُقيم مشروع التبيان معهدًا حضوريًا لتحفيظ القرآن الكريم في مدينة حلب، يشرف عليه الأستاذ خالد أحمد العبدالله بصفته مديرًا ومعلمًا، ويعاونه فريق تعليمي مكوَّن من معلمين ومعلمتين.
            </p>
            <p className="mt-3">
              ويضم المعهد حاليًا ما يقارب 140 طالبًا وطالبة، يتلقون تعليم القرآن الكريم وحفظه وتجويده في بيئة تربوية تهدف إلى خدمة كتاب الله وتنشئة جيل مرتبط بالقرآن.
            </p>
            <p className="mt-3 font-black text-[var(--primary)]">
              وتُقدَّم الدراسة في المعهد مجانًا بالكامل، إيمانًا بأهمية نشر تعليم القرآن الكريم وإتاحته لجميع الطلاب.
            </p>
          </div>
        </div>

        {/* 4 Interactive Visual Stat Cards */}
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="institute-stat-card group relative flex min-h-[17rem] flex-col justify-end overflow-hidden rounded-[2.25rem] border border-[var(--border)] p-6 text-white shadow-lg"
            >
              {/* Background Photo */}
              <Image
                src={stat.image}
                alt={stat.imageAlt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="stat-bg-image object-cover"
                style={{ objectPosition: stat.imagePosition }}
              />

              {/* Rich Multi-stop Dark Gradient */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#020712] via-[#040e24]/75 to-transparent transition-opacity duration-300"
                aria-hidden="true"
              />

              {/* Content */}
              <div className="relative z-10 text-right">
                <strong
                  className="block text-2xl font-black text-white sm:text-3xl lg:text-4xl"
                  dir={"numeric" in stat ? "ltr" : undefined}
                >
                  {stat.value}
                </strong>
                <span className="mt-1 block text-xs font-extrabold text-slate-200 sm:text-sm">
                  {stat.label}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Photo Credit */}
        <p className="mt-3 text-left text-[11px] font-bold text-[var(--muted)]">
          صورة قلعة حلب:{" "}
          <a
            href="https://commons.wikimedia.org/wiki/File:Aleppo_Castle.jpg"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-[var(--primary)]"
          >
            Abdallah waleed almnaquel / CC BY-SA 4.0
          </a>
        </p>

        {/* Gallery */}
        <div className="mt-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="text-right">
              <span className="eyebrow">التوثيق الميداني</span>
              <h3 className="mt-2 text-2xl font-black text-[var(--foreground)] sm:text-3xl">
                صور الحلقات والأنشطة القرآنية
              </h3>
            </div>
            <p className="max-w-md text-xs font-bold leading-relaxed text-[var(--muted)]">
              توثيق مرئي لجانب من حلقات تحفيظ القرآن الكريم والأنشطة التعليمية للطلاب في حلب.
            </p>
          </div>
          <div className="mt-8">
            <InstituteGallery />
          </div>
        </div>

        {/* Support Card */}
        <article className="relative mt-16 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#051126] via-[#081b3d] to-[#020814] p-8 text-white shadow-2xl sm:p-12">
          <div className="islamic-pattern absolute inset-0 opacity-25 pointer-events-none" aria-hidden="true" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl text-right">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-300 shadow-md">
                <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M20.8 5.8a5.5 5.5 0 0 0-7.8 0L12 6.9l-1.1-1.1a5.5 5.5 0 0 0-7.7 7.8L12 22l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z" />
                </svg>
              </span>

              <h3 className="mt-6 text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                ساهم في استمرار هذا الخير ونشر كتاب الله
              </h3>

              <p className="mt-4 text-base font-medium leading-relaxed text-slate-200 sm:text-lg sm:leading-loose">
                استمرار هذا المشروع بعد توفيق الله يعتمد على دعم أهل الخير، حيث تُقدَّم الدراسة مجانًا لجميع الطلاب، ونسعى إلى توفير احتياجات المعهد التعليمية والتشغيلية لضمان استمرار رسالته.
              </p>
              <p className="mt-3 text-sm font-bold text-sky-200">
                إذا رغبت في المساهمة في دعم المشروع، فيمكنك استخدام وسائل الدفع في قسم «التسجيل والدعم» أدناه أو التواصل المباشر مع الأستاذ خالد.
              </p>
            </div>

            {/* Support Actions */}
            <div className="flex flex-col gap-3.5 sm:flex-row lg:w-60 lg:flex-col">
              <a
                href="#registration-support"
                className="btn-primary-luxury flex items-center justify-center rounded-2xl py-4.5 text-center text-sm font-black"
              >
                وسائل الدفع والمساهمة
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary-luxury flex items-center justify-center rounded-2xl py-4.5 text-center text-sm font-bold"
              >
                تواصل مع الأستاذ خالد
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
