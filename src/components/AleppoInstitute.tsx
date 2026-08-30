import Image from "next/image";
import InstituteGallery from "./InstituteGallery";

const stats = [
  {
    value: "+140",
    label: "طالبًا وطالبة",
    icon: "students",
    image: "/images/halab-students-active.jpeg",
    imageAlt: "طلاب معهد التبيان يرفعون كتبهم داخل الحلقة",
    imagePosition: "center 42%",
    numeric: true,
  },
  {
    value: "5",
    label: "مدير المعهد + 4 معلمين ومعلمات",
    icon: "team",
    image: "/images/teaching-team-illustration.png",
    imageAlt: "رسم رمزي لفريق تعليم القرآن الكريم",
    imagePosition: "center",
    numeric: true,
  },
  {
    value: "حلب",
    label: "سوريا",
    icon: "location",
    image: "/images/aleppo-citadel-modern.jpg",
    imageAlt: "قلعة حلب وقت الغروب",
    imagePosition: "center",
  },
  {
    value: "مجانًا",
    label: "الدراسة بالكامل لوجه الله",
    icon: "gift",
    image: "/images/free-education-illustration.png",
    imageAlt: "رسم رمزي لإتاحة تعليم القرآن مجانًا",
    imagePosition: "center",
  },
] as const;

function Icon({ name }: { name: string }) {
  if (name === "students") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19v-2.2A4.8 4.8 0 0 1 8.3 12h1.4a4.8 4.8 0 0 1 4.8 4.8V19M16 5.5a3 3 0 0 1 0 5.8M16.5 13a4.5 4.5 0 0 1 4 4.5V19" />
      </svg>
    );
  }
  if (name === "team") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="7" r="3" />
        <path d="M6 20v-2.5a6 6 0 0 1 12 0V20M4.5 9.5a2.5 2.5 0 0 0 0 5M19.5 9.5a2.5 2.5 0 0 1 0 5" />
      </svg>
    );
  }
  if (name === "location") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }
  if (name === "gift") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="8" width="18" height="13" rx="2" />
        <path d="M12 8v13M3 12h18M12 8H8.5a2.5 2.5 0 1 1 2-4c1.1 1.5 1.5 4 1.5 4Zm0 0h3.5a2.5 2.5 0 1 0-2-4c-1.1 1.5-1.5 4-1.5 4Z" />
      </svg>
    );
  }
  if (name === "video") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m10 9 5 3-5 3Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20.8 5.8a5.5 5.5 0 0 0-7.8 0L12 6.9l-1.1-1.1a5.5 5.5 0 0 0-7.7 7.8L12 22l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}

export default function AleppoInstitute({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <section id="aleppo-institute" className="section-pad relative overflow-hidden bg-[var(--surface)]" dir="rtl">
      {/* Background ambient lighting */}
      <div
        className="absolute right-0 top-1/4 -z-10 size-96 rounded-full bg-[var(--primary)]/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative">
        {/* Section Header */}
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="text-right">
            <span className="eyebrow">المشروع الميداني في حلب</span>
            <h2 className="section-title mt-3">معهد التبيان لتحفيظ القرآن الكريم</h2>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-secondary)]/70 p-6 text-base font-medium leading-relaxed text-[var(--card-text)] sm:p-8 sm:text-lg sm:leading-loose backdrop-blur-sm">
            <p>
              يُقيم مشروع التبيان معهدًا حضوريًا لتحفيظ القرآن الكريم في مدينة حلب، يشرف عليه الأستاذ خالد أحمد العبدالله بصفته مديرًا ومعلمًا، ويعاونه فريق تعليمي مكوَّن من معلمين ومعلمتين.
            </p>
            <p className="mt-3">
              ويضم المعهد حاليًا ما يقارب 140 طالبًا وطالبة، يتلقون تعليم القرآن الكريم وحفظه وتجويده في بيئة تربوية تهدف إلى خدمة كتاب الله وتنشئة جيل مرتبط بالقرآن.
            </p>
            <p className="mt-3 font-bold text-[var(--primary)]">
              وتُقدَّم الدراسة في المعهد مجانًا بالكامل، إيمانًا بأهمية نشر تعليم القرآن الكريم وإتاحته للجميع.
            </p>
          </div>
        </div>

        {/* 4 Stat Cards with live imagery */}
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="institute-stat-card group relative flex flex-col justify-end p-6 text-white"
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

              {/* Gradient Dark Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#020a1a]/95 via-[#04122d]/60 to-[#020a1a]/20 transition-opacity duration-300"
                aria-hidden="true"
              />

              {/* Top Corner Icon */}
              <div className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-xl border border-white/20 bg-black/40 text-white backdrop-blur-md">
                <div className="size-5">
                  <Icon name={stat.icon} />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 mt-auto text-right">
                <strong
                  className="block text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl text-white"
                  dir={"numeric" in stat ? "ltr" : undefined}
                >
                  {stat.value}
                </strong>
                <span className="mt-1 block text-xs font-bold text-slate-200 sm:text-sm">
                  {stat.label}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Photo Credit */}
        <p className="mt-3 text-left text-[11px] font-medium text-[var(--muted)]">
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
              <span className="eyebrow">من داخل المعهد</span>
              <h3 className="mt-2 text-2xl font-extrabold text-[var(--foreground)] sm:text-3xl">
                صور الحلقات والأنشطة
              </h3>
            </div>
            <p className="max-w-md text-xs font-medium leading-relaxed text-[var(--muted)]">
              توثيق مرئي لجانب من حلقات تحفيظ القرآن الكريم والأنشطة التعليمية للطلاب في حلب.
            </p>
          </div>
          <div className="mt-8">
            <InstituteGallery />
          </div>
        </div>

        {/* Short Videos Area */}
        <div className="mt-12 rounded-3xl border border-[var(--border)] bg-[var(--surface-secondary)]/60 p-7 sm:p-9">
          <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="text-right">
              <span className="eyebrow">مشاهد قصيرة</span>
              <h3 className="mt-2 text-xl font-extrabold text-[var(--foreground)] sm:text-2xl">
                مقاطع مرئية من الدورة
              </h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--muted)]">
                مساحة مخصصة لعرض مقاطع قصيرة توثّق إتقان التلاوة وأجواء الدروس في المعهد.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="flex min-h-[10.5rem] flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center shadow-sm"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-md">
                    <div className="size-5">
                      <Icon name="video" />
                    </div>
                  </span>
                  <small className="text-xs font-bold text-[var(--muted)]">
                    مكان مخصص لفيديو قصير {item}
                  </small>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Support & Contribution Appeal Card */}
        <article className="relative mt-16 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#061530] via-[#091f48] to-[#040f24] p-8 text-white shadow-2xl sm:p-12">
          {/* Geometric islamic watermark */}
          <div className="islamic-pattern absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl text-right">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-300">
                <div className="size-6">
                  <Icon name="heart" />
                </div>
              </span>
              <h3 className="mt-5 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
                ساهم في استمرار هذا الخير ونشر كتاب الله
              </h3>
              <p className="mt-4 text-base font-medium leading-relaxed text-slate-200 sm:text-lg sm:leading-loose">
                استمرار هذا المشروع بعد توفيق الله يعتمد على دعم أهل الخير، حيث تُقدَّم الدراسة مجانًا لجميع الطلاب، ونسعى إلى توفير احتياجات المعهد التعليمية والتشغيلية لضمان استمرار رسالته.
              </p>
              <p className="mt-3 text-sm font-medium text-sky-200">
                إذا رغبت في المساهمة في دعم المشروع، فيمكنك استخدام وسائل الدفع في قسم «التسجيل والدعم» أدناه أو التواصل المباشر مع الأستاذ خالد.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3.5 sm:flex-row lg:w-56 lg:flex-col">
              <a
                href="#registration-support"
                className="flex items-center justify-center rounded-2xl bg-sky-400 px-6 py-4 text-center text-sm font-extrabold text-[#05142e] shadow-lg transition-all duration-200 hover:bg-sky-300 hover:shadow-xl"
              >
                وسائل الدفع والمساهمة
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-center text-sm font-bold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20"
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
