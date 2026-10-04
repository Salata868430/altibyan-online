import fs from "fs";
import path from "path";
import { fallback, type Book, type Course } from "./content";
import { isSupabaseConfigured } from "./supabase/config";
import { createClient } from "./supabase/server";

const DATA_FILE = path.join(process.cwd(), "src", "data", "site-content.json");

export type SiteData = typeof fallback & {
  books: Book[];
  courses: Course[];
};

export function readLocalData(): SiteData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(fileContent);
      return {
        ...fallback,
        ...parsed,
        settings: { ...fallback.settings, ...(parsed.settings || {}) },
      };
    }
  } catch (e) {
    console.error("Error reading site-content.json:", e);
  }
  return fallback as SiteData;
}

export function writeLocalData(data: SiteData): boolean {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (e) {
    console.error("Error writing site-content.json:", e);
    return false;
  }
}

export async function getLiveSiteContent(): Promise<SiteData> {
  const local = readLocalData();

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const [sectionsResult, booksResult, coursesResult] = await Promise.all([
        supabase.from("site_content").select("section,content,is_visible"),
        supabase.from("books").select("*").order("sort_order"),
        supabase.from("courses").select("*").neq("status", "hidden").order("sort_order"),
      ]);

      if (!sectionsResult.error && sectionsResult.data?.length) {
        const sections = Object.fromEntries(sectionsResult.data.map((r) => [r.section, r.content]));
        return {
          ...local,
          hero: (sections.hero as typeof local.hero) || local.hero,
          about: (sections.about as typeof local.about) || local.about,
          professional: (sections.professional_course as typeof local.professional) || local.professional,
          contact: (sections.contact as typeof local.contact) || local.contact,
          settings: (sections.settings as typeof local.settings) || local.settings,
          features: (sections.features as typeof local.features) || local.features,
          testimonials: (sections.testimonials as typeof local.testimonials) || local.testimonials,
          books: booksResult.data?.length ? (booksResult.data as Book[]) : local.books,
          courses: coursesResult.data?.length ? (coursesResult.data as Course[]) : local.courses,
        };
      }
    } catch {
      // Return local JSON data
    }
  }

  return local;
}

export async function saveSectionData(section: string, content: unknown): Promise<boolean> {
  const data = readLocalData();
  (data as Record<string, unknown>)[section] = content;
  writeLocalData(data);

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      await supabase.from("site_content").upsert({
        section: section === "professional" ? "professional_course" : section,
        content,
        is_visible: true,
      });
    } catch {
      // ignore
    }
  }

  return true;
}

export async function saveBooksData(books: Book[]): Promise<boolean> {
  const data = readLocalData();
  data.books = books;
  writeLocalData(data);
  return true;
}

export async function saveCoursesData(courses: Course[]): Promise<boolean> {
  const data = readLocalData();
  data.courses = courses;
  writeLocalData(data);
  return true;
}
