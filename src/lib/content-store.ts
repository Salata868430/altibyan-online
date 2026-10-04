import fs from "fs";
import path from "path";
import { fallback, type Book, type Course } from "./content";

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
  return readLocalData();
}

export async function saveSectionData(section: string, content: unknown): Promise<boolean> {
  const data = readLocalData();
  (data as Record<string, unknown>)[section] = content;
  return writeLocalData(data);
}

export async function saveBooksData(books: Book[]): Promise<boolean> {
  const data = readLocalData();
  data.books = books;
  return writeLocalData(data);
}

export async function saveCoursesData(courses: Course[]): Promise<boolean> {
  const data = readLocalData();
  data.courses = courses;
  return writeLocalData(data);
}
