import Image from "next/image";
import InstituteGallery from "./InstituteGallery";

const stats = [
  { value: "140+", label: "طالبًا وطالبة", icon: "students", placeholder: true },
  { value: "5", label: "مدير المعهد + 4 معلمين ومعلمات", icon: "team", image: "/images/teaching-team-illustration.png", imageAlt: "رسم رمزي لفريق تعليم القرآن الكريم", imagePosition: "center" },
  { value: "حلب", label: "سوريا", icon: "location", image: "/images/aleppo-panorama.jpg", imageAlt: "مشهد بانورامي لمدينة حلب", imagePosition: "center" },
  { value: "مجانًا", label: "الدراسة بالكامل", icon: "gift", image: "/images/free-education-illustration.png", imageAlt: "رسم رمزي لإتاحة تعليم القرآن مجانًا", imagePosition: "center" },
] as const;

function Icon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    students: <><circle cx="9" cy="8" r="3"/><path d="M3.5 19v-2.2A4.8 4.8 0 0 1 8.3 12h1.4a4.8 4.8 0 0 1 4.8 4.8V19M16 5.5a3 3 0 0 1 0 5.8M16.5 13a4.5 4.5 0 0 1 4 4.5V19"/></>,
    team: <><circle cx="12" cy="7" r="3"/><path d="M6 20v-2.5a6 6 0 0 1 12 0V20M4.5 9.5a2.5 2.5 0 0 0 0 5M19.5 9.5a2.5 2.5 0 0 1 0 5"/></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    gift: <><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8H8.5a2.5 2.5 0 1 1 2-4c1.1 1.5 1.5 4 1.5 4Zm0 0h3.5a2.5 2.5 0 1 0-2-4c-1.1 1.5-1.5 4-1.5 4Z"/></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m4 17 5-5 4 4 2-2 5 4"/></>,
    video: <><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3Z"/></>,
    heart: <path d="M20.8 5.8a5.5 5.5 0 0 0-7.8 0L12 6.9l-1.1-1.1a5.5 5.5 0 0 0-7.7 7.8L12 22l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z"/>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">{paths[name]}</svg>;
}

export default function AleppoInstitute({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <section id="aleppo-institute" className="institute-section section-pad" dir="rtl">
      <div className="institute-pattern" aria-hidden="true" />
      <div className="container-page relative">
        <div className="max-w-4xl">
          <p className="eyebrow">الدورة الحالية في حلب</p>
          <h2 className="section-title mt-4">معهد التبيان لتحفيظ القرآن الكريم – حلب</h2>
          <div className="institute-intro mt-7 space-y-4 text-base leading-8 sm:text-lg sm:leading-9">
            <p>يُقيم مشروع التبيان معهدًا حضوريًا لتحفيظ القرآن الكريم في مدينة حلب، يشرف عليه الأستاذ خالد أحمد العبدالله بصفته مديرًا ومعلمًا، ويعاونه فريق تعليمي مكوَّن من معلمين ومعلمتين.</p>
            <p>ويضم المعهد حاليًا ما يقارب 140 طالبًا وطالبة، يتلقون تعليم القرآن الكريم وحفظه وتجويده في بيئة تربوية تهدف إلى خدمة كتاب الله وتنشئة جيل مرتبط بالقرآن الكريم.</p>
            <p>وتُقدَّم الدراسة في المعهد مجانًا بالكامل، إيمانًا بأهمية نشر تعليم القرآن الكريم وإتاحته لجميع الطلاب.</p>
          </div>
        </div>

        <div className="institute-stats mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {stats.map((stat, index) => <article key={stat.label} className={`institute-stat ${"image" in stat ? "institute-stat-image" : ""} ${"placeholder" in stat ? "institute-stat-placeholder" : ""}`} style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}>
            {"image" in stat && <Image src={stat.image} alt={stat.imageAlt} fill sizes="(max-width: 1024px) 50vw, 25vw" className="institute-stat-photo" style={{ objectPosition: stat.imagePosition }} />}
            <span className="institute-stat-overlay" aria-hidden="true" />
            <div className="institute-stat-content">
              <span className="institute-stat-icon"><Icon name={stat.icon} /></span>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          </article>)}
        </div>

        <div className="institute-media mt-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="eyebrow">من داخل المعهد</p><h3 className="mt-3 text-2xl font-black sm:text-3xl">صور من الدورة الحالية</h3></div>
            <p className="institute-muted max-w-md text-sm leading-7">هذا المعرض جاهز لإضافة صور الطلاب والأنشطة والحلقات التعليمية عند توفرها.</p>
          </div>
          <InstituteGallery />
        </div>

        <div className="institute-video-area mt-10 rounded-[1.75rem] p-6 sm:p-8">
          <div className="grid items-center gap-7 lg:grid-cols-[.75fr_1.25fr]">
            <div><p className="eyebrow">مشاهد قصيرة</p><h3 className="mt-3 text-2xl font-black">مقاطع فيديو من الدورة</h3><p className="institute-muted mt-4 leading-8">مساحة مخصصة لإضافة مقاطع قصيرة توثّق الدروس والأنشطة في المعهد.</p></div>
            <div className="grid gap-4 sm:grid-cols-2">{[1, 2].map((item) => <div key={item} className="institute-video-placeholder"><span><Icon name="video" /></span><small>مكان مخصص لفيديو قصير</small></div>)}</div>
          </div>
        </div>

        <article className="institute-support mt-16 overflow-hidden rounded-[2rem]">
          <div className="islamic-pattern absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
            <div className="max-w-3xl">
              <span className="institute-support-icon"><Icon name="heart" /></span>
              <h3 className="mt-5 text-3xl font-black sm:text-4xl">ساهم في استمرار هذا الخير</h3>
              <p className="mt-5 text-base leading-8 sm:text-lg">استمرار هذا المشروع بعد توفيق الله يعتمد على دعم أهل الخير، حيث تُقدَّم الدراسة مجانًا لجميع الطلاب، ونسعى إلى توفير احتياجات المعهد التعليمية والتشغيلية لضمان استمرار رسالته.</p>
              <p className="mt-4 leading-8">إذا رغبت في المساهمة في دعم المشروع، فيمكنك استخدام وسائل الدفع الموجودة في قسم «التسجيل والدعم»، أو التواصل مباشرة مع الأستاذ خالد أحمد العبدالله للاستفسار أو التنسيق بشأن الدعم أو التسجيل.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:w-56 lg:flex-col">
              <a href="#registration-support" className="institute-support-primary">وسائل الدفع</a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="institute-support-secondary">تواصل مع الأستاذ خالد</a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
