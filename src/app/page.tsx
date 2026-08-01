import About from "@/components/About";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Programs from "@/components/Programs";
import ProfessionalCourse from "@/components/ProfessionalCourse";
import Publications from "@/components/Publications";
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
        {content.settings.sections.professional_course !== false && <ProfessionalCourse content={content.professional} whatsappUrl={content.settings.whatsapp_url} />}
        {content.settings.sections.features !== false && <Features content={content.features} />}
        {content.settings.sections.programs !== false && <Programs courses={content.courses} whatsappUrl={content.settings.whatsapp_url} />}
        {content.settings.sections.testimonials !== false && <Testimonials content={content.testimonials} />}
        {content.settings.sections.contact !== false && <Contact content={content.contact} />}
      </main>
      <Footer links={content.navigation.footer.length ? content.navigation.footer : content.navigation.navbar} settings={content.settings} contact={content.contact} />
    </>
  );
}
