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
import LiveVisualEditor from "@/components/admin/LiveVisualEditor";
import { getLiveSiteContent } from "@/lib/content-store";

export default async function Home() {
  const content = await getLiveSiteContent();
  return (
    <>
      <LiveVisualEditor
        hero={content.hero}
        about={content.about}
        professional={content.professional}
        contact={content.contact}
        settings={content.settings}
        features={content.features}
        testimonials={content.testimonials}
        books={content.books}
        courses={content.courses}
      />
      <Navbar links={content.navigation.navbar} settings={content.settings} />
      <main>
        <Hero content={content.hero} whatsappUrl={content.settings.whatsapp_url} />
        {content.settings.sections.about !== false && <About content={content.about} />}
        {content.settings.sections.publications !== false && <Publications books={content.books} />}
        {content.settings.sections.professional_course !== false && (
          <ProfessionalCourse content={content.professional} whatsappUrl={content.settings.whatsapp_url} />
        )}
        {content.settings.sections.features !== false && <Features content={content.features} />}
        {content.settings.sections.programs !== false && (
          <Programs courses={content.courses} whatsappUrl={content.settings.whatsapp_url} />
        )}
        {content.settings.sections.testimonials !== false && <Testimonials content={content.testimonials} />}
        <AleppoInstitute whatsappUrl={content.settings.whatsapp_url} />
        <RegistrationSupport />
        {content.settings.sections.contact !== false && <Contact content={content.contact} />}
      </main>
      <Footer
        links={content.navigation.footer.length ? content.navigation.footer : content.navigation.navbar}
        settings={content.settings}
        contact={content.contact}
      />
    </>
  );
}
