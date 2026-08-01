import Image from "next/image";
import type { AboutContent } from "@/lib/content";

export default function About({ content }: { content: AboutContent }) {
  return (
    <section id="about" className="section-pad overflow-hidden bg-slate-50">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[.85fr_1.15fr]">
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 -rotate-3 rounded-[2rem] bg-sky-200/50" aria-hidden="true" />
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-sky-200/30 bg-gradient-to-br from-[#0b295a] to-[#071a3b] shadow-2xl">
            <Image
              src={content.image_url || "/images/professor.jpg"}
              alt="الأستاذ خالد العبداللّه"
              fill
              sizes="(max-width: 1023px) min(100vw - 2rem, 28rem), 28rem"
              className="object-cover object-center"
              unoptimized={content.image_url.startsWith("http")}
            />
          </div>
          <div className="absolute -bottom-5 -left-3 rounded-2xl bg-white p-4 shadow-xl"><p className="text-sm font-black text-[#071a3b]">{content.title}</p></div>
        </div>
        <div>
          <p className="eyebrow">عن الأستاذ</p>
          <h2 className="section-title mt-4">عن الأستاذ {content.name}</h2>
          <p className="mt-5 text-xl font-bold text-sky-700">{content.title}</p>
          <p className="mt-6 text-lg leading-9 text-slate-600">{content.bio}</p>
          <div className="mt-8 rounded-3xl border border-sky-200 bg-white p-6 shadow-sm"><p className="leading-8 text-slate-600">{content.experience}</p></div>
        </div>
      </div>
    </section>
  );
}
