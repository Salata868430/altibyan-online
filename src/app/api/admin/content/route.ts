import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdmin } from "@/lib/auth";
import {
  saveSectionData,
  saveBooksData,
  saveCoursesData,
  getLiveSiteContent,
} from "@/lib/content-store";

export async function GET() {
  const data = await getLiveSiteContent();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: "غير مصرح لك بإجراء التعديل." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, section, content, books, courses } = body;

    if (type === "section" && section && content) {
      await saveSectionData(section, content);
      revalidatePath("/");
      return NextResponse.json({ success: true, message: "تم حفظ التعديلات بنجاح." });
    }

    if (type === "books" && Array.isArray(books)) {
      await saveBooksData(books);
      revalidatePath("/");
      return NextResponse.json({ success: true, message: "تم تحديث المؤلفات بنجاح." });
    }

    if (type === "courses" && Array.isArray(courses)) {
      await saveCoursesData(courses);
      revalidatePath("/");
      return NextResponse.json({ success: true, message: "تم تحديث الدورات بنجاح." });
    }

    return NextResponse.json({ error: "طلب غير صالح." }, { status: 400 });
  } catch (e) {
    return NextResponse.json(
      { error: "حدث خطأ أثناء حفظ البيانات: " + (e instanceof Error ? e.message : String(e)) },
      { status: 500 }
    );
  }
}
