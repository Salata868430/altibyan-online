import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig, isSupabaseConfigured } from "@/lib/supabase/config";

export type LinkItem = { label: string; href: string };
export type HeroContent = { badge: string; title: string; accent?: string; description: string; primary_button: string; secondary_button: string; stats: { value: string; label: string }[] };
export type AboutContent = { name: string; title: string; bio: string; experience: string; image_url: string };
export type ProfessionalContent = { name: string; hours: number; fee: number; book: string; teaching: string[]; features: string[]; skills: string[]; conditions: string[]; exams: string[] };
export type ContactContent = { title: string; description: string; whatsapp: string; phone: string; email: string; button: string };
export type NavigationContent = { navbar: LinkItem[]; footer: LinkItem[] };
export type SettingsContent = { site_name: string; tagline: string; description: string; whatsapp_url: string; logo_url: string; footer_text: string; sections: Record<string, boolean> };
export type FeatureContent = { eyebrow: string; title: string; items: string[] };
export type TestimonialContent = { eyebrow: string; title: string; disclaimer: string; items: { name: string; track: string; quote: string }[] };
export type Book = { id?: number; title: string; author: string; image_url?: string | null };
export type Course = { id?: number; name: string; description?: string; price?: number | null; hours?: number | null; status?: string; image_url?: string | null };

const defaultLinks: LinkItem[] = [{ label: "الرئيسية", href: "#home" }, { label: "عن الأستاذ", href: "#about" }, { label: "المؤلفات", href: "#publications" }, { label: "الدورة الاحترافية", href: "#professional-course" }, { label: "الدورات", href: "#programs" }, { label: "تواصل معنا", href: "#contact" }];
export const fallback = {
  hero: { badge: "مناهج التبيان للقراءة العربية ولفظ القرآن", title: "تعلّم القرآن واللغة العربية بثقة وإتقان", description: "تأهيل احترافي لمعلّمي القراءة العربية وقراءة القرآن الكريم من خلال القاعدة التبيانية، بإشراف الأستاذ خالد العبداللّه.", primary_button: "تواصل عبر واتساب", secondary_button: "تفاصيل الدورة الاحترافية", stats: [{ value: "+5300", label: "معلّم ومعلّمة" }, { value: "100", label: "ساعة تدريبية" }, { value: "3", label: "امتحانات شفهية" }] } satisfies HeroContent,
  about: { name: "خالد العبداللّه", title: "محاضر الدورة ومؤلف مناهج التبيان", bio: "يقدّم الأستاذ خالد العبداللّه الدورة الاحترافية من خلال القاعدة التبيانية، وهو مؤلف سلسلة من المناهج المتخصصة في القراءة العربية ولفظ القرآن وتجويده.", experience: "أكثر من 5300 معلّم ومعلّمة تخرّجوا في الدورة الاحترافية لإعداد معلّمي القراءة العربية وقراءة القرآن الكريم.", image_url: "/images/professor.jpg" } satisfies AboutContent,
  professional: { name: "الدورة الاحترافية لتخريج معلّمي القراءة العربية وقراءة القرآن الكريم من خلال القاعدة التبيانية", hours: 100, fee: 150, book: "التبيان للتأسيس بإتقان في القراءة العربية ولفظ القرآن – المستوى الشامل", teaching: ["محاضرات عبر Zoom", "مدة المحاضرة ساعتان ونصف", "إرسال الدروس مكتوبة في مجموعة واتساب خاصة", "الإجابة عن الأسئلة", "تحديد مواعيد مناسبة للمشاركين"], features: ["إتقان المنهج", "ضبط الأداء والنطق الصحيح", "تعلم مخارج الحروف وصفاتها", "معالجة الأخطاء", "اكتساب مهارات التعليم", "التدرج من أسماء الحروف إلى قراءة القرآن واللغة العربية بإتقان", "التأهيل للإشراف والتدريب", "شهادة معتمدة", "نشر العلم النافع"], skills: ["التقاط الخطأ", "تصويب الخطأ", "تقليد الخطأ", "امتلاك أسلوب تعليم متميز"], conditions: ["اجتياز امتحان القبول", "الالتزام بالمواعيد", "لا يسمح بالغياب", "لا تسترد الرسوم عند الانسحاب", "تخصيص وقت كافٍ للمذاكرة"], exams: ["3 امتحانات شفهية", "90–100 ممتاز", "80–89 جيد جدًا", "70–79 جيد", "69 فأقل رسوب", "الشهادات مصدقة وموثقة"] } satisfies ProfessionalContent,
  contact: { title: "تواصل مباشرة عبر واتساب", description: "للاستفسار عن الدورة الاحترافية أو إحدى الدورات المتاحة، تواصل على الرقم التالي.", whatsapp: "963955971463", phone: "+963955971463", email: "", button: "تواصل عبر واتساب" } satisfies ContactContent,
  navigation: { navbar: defaultLinks, footer: defaultLinks } satisfies NavigationContent,
  settings: { site_name: "التبيان", tagline: "علمٌ يضيء الطريق", description: "مناهج ودورات في القراءة العربية ولفظ القرآن الكريم وتجويده.", whatsapp_url: "https://wa.me/963955971463", logo_url: "/logo/logo-full.svg", footer_text: "جميع الحقوق محفوظة.", sections: { about: true, publications: true, professional_course: true, features: true, programs: true, testimonials: true, contact: true } } as SettingsContent,
  features: { eyebrow: "ثمرة التعلّم", title: "فوائد الدورة", items: ["إتقان المنهج", "ضبط الأداء والنطق الصحيح", "تعلم مخارج الحروف وصفاتها", "معالجة الأخطاء", "اكتساب مهارات التعليم", "التدرج من أسماء الحروف إلى قراءة القرآن واللغة العربية بإتقان", "التأهيل للإشراف والتدريب", "شهادة معتمدة", "نشر العلم النافع"] } satisfies FeatureContent,
  testimonials: { eyebrow: "آراء الطلاب", title: "انطباعات من رحلة التعلّم", disclaimer: "النصوص التالية أمثلة توضيحية مؤقتة لتصميم القسم، وليست شهادات حقيقية.", items: [{name:"أحمد م.", track:"مسار القرآن الكريم", quote:"أصبح مسار التعلّم أوضح بالنسبة لي، وأكثر ما أعجبني هو التدرج والاهتمام بالتطبيق."},{name:"سارة ع.", track:"مسار اللغة العربية", quote:"الشرح منظم ومريح، والتغذية الراجعة بعد كل درس تساعدني على معرفة ما ينبغي تطويره."},{name:"يوسف ك.", track:"مسار التجويد", quote:"أسلوب عملي يشجع على الاستمرار، مع عناية واضحة بالتفاصيل دون تعقيد."}] } satisfies TestimonialContent,
  books: ["القاعدة التبيانية في القراءة العربية ولفظ القرآن", "كتاب التبيان للتأسيس بإتقان في القراءة العربية ولفظ القرآن", "كتاب ثمار التبيان في تجويد القرآن", "المنظومة التبيانية لطلاب العربية والحلقات القرآنية"].map(title => ({ title, author: "خالد العبداللّه" })) satisfies Book[],
  courses: ["إقراء كتاب التبيان", "إعداد مدرسي القراءة العربية ولفظ القرآن الكريم", "التجويد من كتاب ثمار التبيان", "ضبط وإتقان ختمة كاملة للقرآن", "محو الأمية للناطقين بالعربية", "دورة خاصة لغير الناطقين بالعربية", "شرح وحفظ المنظومة التبيانية"].map(name => ({ name })) satisfies Course[],
};

export async function getPublicContent() {
  if (!isSupabaseConfigured()) return fallback;
  try {
    const { url, key } = getSupabaseConfig();
    const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const [sectionsResult, booksResult, coursesResult] = await Promise.all([supabase.from("site_content").select("section,content,is_visible"), supabase.from("books").select("id,title,author,image_url").eq("is_visible", true).order("sort_order"), supabase.from("courses").select("id,name,description,price,hours,status,image_url").neq("status", "hidden").order("sort_order")]);
    if (sectionsResult.error || booksResult.error || coursesResult.error) return fallback;
    const sections = Object.fromEntries((sectionsResult.data ?? []).map(row => [row.section, row]));
    const section = <T,>(name: string, value: T): T => { const saved = sections[name]?.content; if (sections[name]?.is_visible === false || !saved) return value; return (typeof value === "object" && !Array.isArray(value) ? { ...value, ...saved } : saved) as T; };
    return { hero: section("hero", fallback.hero), about: section("about", fallback.about), professional: section("professional_course", fallback.professional), contact: section("contact", fallback.contact), navigation: section("navigation", fallback.navigation), settings: section("settings", fallback.settings), features: section("features", fallback.features), testimonials: section("testimonials", fallback.testimonials), books: booksResult.data?.length ? booksResult.data as Book[] : fallback.books, courses: coursesResult.data?.length ? coursesResult.data as Course[] : fallback.courses };
  } catch { return fallback; }
}
