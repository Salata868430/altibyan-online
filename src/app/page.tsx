import About from "@/components/About";
import AleppoInstitute from "@/components/AleppoInstitute";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Programs from "@/components/Programs";
import ProfessionalCourse from "@/components/ProfessionalCourse";
import Publications from "@/components/Publications";
import RegistrationSupport from "@/components/RegistrationSupport";
import Testimonials from "@/components/Testimonials";
import { getPublicContent } from "@/lib/content";

export default async function Home() {
  const content = await getPublicContent();

  return (
    <>
      <Navbar links={content.navigation.navbar} settings={content.settings} />
      <main>
        <Hero content={content.hero} whatsappUrl={content.settings.whatsapp_url} />
        {content.settings.sections.about !== false && <About content={content.about} />}
        {content.settings.sections.publications !== false && <Publications books={content.books} />}
        {content.settings.sections.professional_course !== false && (
          <ProfessionalCourse
            content={content.professional}
            whatsappUrl={content.settings.whatsapp_url}
          />
        )}
        {content.settings.sections.features !== false && <Features content={content.features} />}
        {content.settings.sections.programs !== false && (
          <Programs courses={content.courses} whatsappUrl={content.settings.whatsapp_url} />
        )}
        {content.settings.sections.testimonials !== false && (
          <Testimonials content={content.testimonials} />
        )}
        <AleppoInstitute whatsappUrl={content.settings.whatsapp_url} />
        <RegistrationSupport />
        {content.settings.sections.contact !== false && <Contact content={content.contact} />}
      </main>
      <Footer
        links={content.navigation.footer.length ? content.navigation.footer : content.navigation.navbar}
        settings={content.settings}
        contact={content.contact}
      />

      {/* Quick Floating WhatsApp Action Trigger */}
      <a
        href={content.settings.whatsapp_url}
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp-btn group"
        aria-label="تواصل فوري عبر واتساب"
      >
        <svg viewBox="0 0 24 24" className="size-5 shrink-0 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <path d="M20 11.5a8.3 8.3 0 0 1-12.3 7.3L4 20l1.3-4.5A8.3 8.3 0 1 1 20 11.5Z" />
          <path d="M9 10c.5 2 2.5 3.5 4 4" />
        </svg>
        <span className="hidden sm:inline">تواصل عبر واتساب</span>
      </a>
    </>
  );
}
