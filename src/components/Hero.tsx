import type { HeroContent } from "@/lib/content";

export default function Hero({ content, whatsappUrl }: { content: HeroContent; whatsappUrl: string }) {
  const facts = content.stats.map(({ value, label }) => [value, label]);
  return (
    <section id="home" className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_75%_20%,#123c76_0%,#081d3f_37%,#041127_75%)] text-white">
      <div className="islamic-pattern absolute inset-0 opacity-55 [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" aria-hidden="true" />
      <div className="glow-drift absolute -right-40 top-0 size-[38rem] rounded-full bg-blue-500/20 blur-[100px]" aria-hidden="true" />
      <div className="glow-drift absolute -left-48 bottom-0 size-[32rem] rounded-full bg-cyan-300/15 blur-[110px] [animation-delay:-4s]" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-300/40 to-transparent" aria-hidden="true" />
      <div className="container-page relative grid min-h-[calc(100svh-4.75rem)] items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-20 lg:py-28">
        <div className="hero-copy">
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-white/5 px-4 py-2 text-sm font-bold text-sky-200 backdrop-blur"><span className="size-2 rounded-full bg-sky-300" /> {content.badge}</p>
          <h1 className="mt-7 max-w-3xl text-[2.6rem] font-black leading-[1.22] tracking-[-.045em] sm:text-6xl lg:text-[4.65rem]">{content.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-300">{content.description}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="rounded-2xl bg-sky-400 px-7 py-4 text-center font-extrabold text-[#071a3b] shadow-xl shadow-sky-500/20 transition hover:-translate-y-1 hover:bg-sky-300">{content.primary_button} <span aria-hidden="true">←</span></a>
            <a href="#professional-course" className="rounded-2xl border border-white/20 bg-white/5 px-7 py-4 text-center font-bold backdrop-blur transition hover:bg-white/10">{content.secondary_button}</a>
          </div>
          <dl className="mt-10 grid grid-cols-3 divide-x divide-x-reverse divide-white/10 border-t border-white/10 pt-7 text-center sm:max-w-xl sm:text-right">
            {facts.map(([number, label]) => <div key={label} className="px-2 sm:px-3"><dd className="text-xl font-black text-sky-300 sm:text-2xl">{number}</dd><dt className="mt-1 text-[11px] text-slate-400 sm:text-sm">{label}</dt></div>)}
          </dl>
        </div>
        <div className="hero-card relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-5 rotate-3 rounded-[2.2rem] border border-sky-300/20 bg-sky-400/10" aria-hidden="true" />
          <article className="hero-course-card relative overflow-hidden rounded-[2rem] border p-6 backdrop-blur-2xl sm:p-8">
            <p className="text-sm font-bold text-sky-200">الدورة الرئيسية</p>
            <h2 className="card-title mt-3 text-2xl font-black leading-10">الدورة الاحترافية لتخريج معلّمي القراءة العربية وقراءة القرآن الكريم</h2>
            <p className="card-detail mt-4 leading-7">من خلال القاعدة التبيانية</p>
            <div className="hero-divider my-7 h-px" />
            <ul className="card-text grid gap-3 text-sm sm:grid-cols-2"><li className="hero-detail-tile rounded-xl p-4">100 ساعة</li><li className="hero-detail-tile rounded-xl p-4">المحاضرات عبر Zoom</li><li className="hero-detail-tile rounded-xl p-4">متابعة عبر WhatsApp</li><li className="hero-detail-tile rounded-xl p-4">شهادة مصدقة وموثقة</li></ul>
            <a href="#professional-course" className="mt-7 block rounded-xl bg-white px-6 py-4 text-center font-black text-[#071a3b] transition hover:bg-sky-50">استعرض تفاصيل الدورة</a>
          </article>
        </div>
      </div>
    </section>
  );
}
