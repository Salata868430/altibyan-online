import AdminShell from "@/components/admin/AdminShell";
import SubmitButton from "@/components/admin/SubmitButton";
import DeleteButton from "@/components/admin/DeleteButton";
import AssetUpload from "@/components/admin/AssetUpload";
import { deleteBook, saveBook } from "../actions";
import { requireAdmin } from "@/lib/auth";
import { fallback } from "@/lib/content";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

function BookForm({
  book,
}: {
  book?: {
    id: number;
    title: string;
    author: string;
    image_url: string | null;
    sort_order: number;
    is_visible: boolean;
  };
}) {
  return (
    <form action={saveBook} className="admin-card space-y-4">
      {book && <input type="hidden" name="id" value={book.id} />}
      <label className="admin-label">
        اسم المؤلف
        <input name="title" required defaultValue={book?.title} className="admin-input" />
      </label>
      <label className="admin-label">
        المؤلف
        <input
          name="author"
          required
          defaultValue={book?.author || "خالد العبداللّه"}
          className="admin-input"
        />
      </label>
      <label className="admin-label">
        رابط الصورة
        <input
          name="image_url"
          type="url"
          defaultValue={book?.image_url || ""}
          className="admin-input"
        />
      </label>
      <label className="admin-label">
        الترتيب
        <input
          name="sort_order"
          type="number"
          defaultValue={book?.sort_order || 0}
          className="admin-input"
        />
      </label>
      <label className="flex gap-2">
        <input name="is_visible" type="checkbox" defaultChecked={book?.is_visible ?? true} /> ظاهر
      </label>
      <div className="flex gap-3">
        <SubmitButton label={book ? "حفظ التعديل" : "إضافة المؤلف"} />
        <button type="reset" className="admin-secondary">
          إلغاء
        </button>
        {book && <DeleteButton action={deleteBook} />}
      </div>
    </form>
  );
}

export default async function BooksPage() {
  await requireAdmin();
  let books: {
    id: number;
    title: string;
    author: string;
    image_url: string | null;
    sort_order: number;
    is_visible: boolean;
  }[] = [];

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data } = await supabase.from("books").select("*").order("sort_order");
      if (data && data.length > 0) books = data;
    } catch {
      // fallback
    }
  }

  if (books.length === 0) {
    books = fallback.books.map((b, i) => ({
      id: i + 1,
      title: b.title,
      author: b.author,
      image_url: ("image_url" in b ? (b as { image_url?: string | null }).image_url : null) ?? null,
      sort_order: i,
      is_visible: true,
    }));
  }

  return (
    <AdminShell>
      <h1 className="text-3xl font-black">إدارة المؤلفات</h1>
      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <BookForm />
        {books.map((book) => (
          <BookForm key={book.id} book={book} />
        ))}
      </div>
      <div className="mt-8 max-w-xl">
        <AssetUpload />
      </div>
    </AdminShell>
  );
}
