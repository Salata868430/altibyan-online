"use client";

import { useState, useEffect } from "react";
import type { HeroContent, AboutContent, ProfessionalContent, ContactContent, SettingsContent, Book, Course, FeatureContent, TestimonialContent } from "@/lib/content";

type LiveVisualEditorProps = {
  hero: HeroContent;
  about: AboutContent;
  professional: ProfessionalContent;
  contact: ContactContent;
  settings: SettingsContent;
  features: FeatureContent;
  testimonials: TestimonialContent;
  books: Book[];
  courses: Course[];
};

export default function LiveVisualEditor(props: LiveVisualEditorProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Section States
  const [hero, setHero] = useState<HeroContent>(props.hero);
  const [about, setAbout] = useState<AboutContent>(props.about);
  const [professional, setProfessional] = useState<ProfessionalContent>(props.professional);
  const [contact, setContact] = useState<ContactContent>(props.contact);
  const [settings, setSettings] = useState<SettingsContent>(props.settings);
  const [features, setFeatures] = useState<FeatureContent>(props.features);
  const [testimonials, setTestimonials] = useState<TestimonialContent>(props.testimonials);
  const [books, setBooks] = useState<Book[]>(props.books);
  const [courses, setCourses] = useState<Course[]>(props.courses);

  useEffect(() => {
    fetch("/api/admin/status", { credentials: "same-origin" })
      .then((res) => (res.ok ? res.json() : { isAdmin: false }))
      .then((data) => {
        if (data.isAdmin) setIsAdmin(true);
      })
      .catch(() => undefined);
  }, []);

  if (!isAdmin) return null;

  async function handleSaveSection(section: string, content: unknown) {
    setIsSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "section", section, content }),
      });
      const data = await res.json();
      if (res.ok) {
        setSaveSuccess("تم الحفظ بنجاح! تم تحديث الموقع مباشرة.");
        setTimeout(() => {
          setSaveSuccess(null);
          setActiveModal(null);
          window.location.reload();
        }, 1200);
      } else {
        setSaveError(data.error || "تعذر الحفظ.");
      }
    } catch (e) {
      setSaveError("حدث خطأ في الاتصال.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSaveBooks(updatedBooks: Book[]) {
    setIsSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "books", books: updatedBooks }),
      });
      if (res.ok) {
        setSaveSuccess("تم حفظ المؤلفات بنجاح!");
        setTimeout(() => {
          setSaveSuccess(null);
          setActiveModal(null);
          window.location.reload();
        }, 1200);
      } else {
        setSaveError("تعذر حفظ المؤلفات.");
      }
    } catch {
      setSaveError("حدث خطأ في الاتصال.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSaveCourses(updatedCourses: Course[]) {
    setIsSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "courses", courses: updatedCourses }),
      });
      if (res.ok) {
        setSaveSuccess("تم حفظ الدورات بنجاح!");
        setTimeout(() => {
          setSaveSuccess(null);
          setActiveModal(null);
          window.location.reload();
        }, 1200);
      } else {
        setSaveError("تعذر حفظ الدورات.");
      }
    } catch {
      setSaveError("حدث خطأ في الاتصال.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      {/* 1. Floating Top Admin Bar */}
      <div className="fixed top-0 inset-x-0 z-[99999] flex items-center justify-between gap-3 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 px-4 py-2.5 text-white shadow-2xl backdrop-blur-lg">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-black/20 text-base font-black">
            👑
          </span>
          <span className="text-sm font-black tracking-wide">
            وضع التحرير المباشر (Visual Live Editor)
          </span>
          <span className="hidden text-xs opacity-80 sm:inline">
            | انقر على أي قسم لتعديله فوراً
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveModal("menu")}
            className="flex items-center gap-1.5 rounded-lg bg-black/25 px-3 py-1.5 text-xs font-black transition hover:bg-black/40 cursor-pointer"
          >
            <span>قائمة الأقسام</span>
            <span>▼</span>
          </button>
          <a
            href="/admin/dashboard"
            className="rounded-lg bg-white/20 px-3 py-1.5 text-xs font-black transition hover:bg-white/30"
          >
            لوحة الإدارة
          </a>
          <form action="/admin/login" method="GET">
            <a
              href="/admin/dashboard"
              onClick={async (e) => {
                e.preventDefault();
                await fetch("/api/admin/status");
                window.location.href = "/admin/login";
              }}
              className="rounded-lg bg-red-600/80 px-2.5 py-1.5 text-xs font-black transition hover:bg-red-700"
            >
              خروج
            </a>
          </form>
        </div>
      </div>

      {/* 2. Quick Floating Section Edit Triggers on the Page */}
      <div className="fixed bottom-6 left-6 z-[99998] flex flex-col gap-2">
        <button
          onClick={() => setActiveModal("menu")}
          className="flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-black text-white shadow-2xl transition hover:scale-105 cursor-pointer border-2 border-white/20"
        >
          <span>✏️</span>
          <span>تعديل محتوى الصفحة</span>
        </button>
      </div>

      {/* 3. Section Selector Menu Modal */}
      {activeModal === "menu" && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-black text-[var(--foreground)]">
                اختر القسم المراد تعديله:
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className="size-8 rounded-lg bg-[var(--surface-secondary)] text-lg font-bold hover:opacity-80"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-2">
              {[
                { id: "hero", title: "العنوان الرئيسي والإحصائيات", icon: "✦" },
                { id: "about", title: "عن الأستاذ والصورة", icon: "👤" },
                { id: "professional", title: "الدورة الاحترافية", icon: "⭐" },
                { id: "books", title: "المؤلفات والكتب", icon: "📚" },
                { id: "courses", title: "الدورات المتاحة والأسعار", icon: "🎓" },
                { id: "features", title: "فوائد وثمار التعلّم", icon: "🌱" },
                { id: "testimonials", title: "آراء الطلاب", icon: "💬" },
                { id: "contact", title: "معلومات التواصل والواتساب", icon: "📞" },
                { id: "settings", title: "إعدادات واسم الموقع", icon: "⚙️" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveModal(item.id)}
                  className="flex items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] p-3 text-right text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--primary)] hover:bg-[var(--primary-soft)] cursor-pointer"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Hero Section Modal */}
      {activeModal === "hero" && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="my-8 w-full max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-black text-[var(--foreground)]">
                تعديل العنوان الرئيسي والإحصائيات (Hero)
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className="size-8 rounded-lg bg-[var(--surface-secondary)] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-4 text-right">
              <div>
                <label className="block text-xs font-bold text-[var(--muted)]">شارة الترويسة (Badge)</label>
                <input
                  type="text"
                  value={hero.badge}
                  onChange={(e) => setHero({ ...hero, badge: e.target.value })}
                  className="admin-input mt-1 w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--muted)]">العنوان الرئيسي</label>
                <input
                  type="text"
                  value={hero.title}
                  onChange={(e) => setHero({ ...hero, title: e.target.value })}
                  className="admin-input mt-1 w-full font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--muted)]">النص التوضيحي</label>
                <textarea
                  rows={3}
                  value={hero.description}
                  onChange={(e) => setHero({ ...hero, description: e.target.value })}
                  className="admin-input mt-1 w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[var(--muted)]">زر واتساب</label>
                  <input
                    type="text"
                    value={hero.primary_button}
                    onChange={(e) => setHero({ ...hero, primary_button: e.target.value })}
                    className="admin-input mt-1 w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--muted)]">زر الدورة</label>
                  <input
                    type="text"
                    value={hero.secondary_button}
                    onChange={(e) => setHero({ ...hero, secondary_button: e.target.value })}
                    className="admin-input mt-1 w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--muted)] mb-2">الإحصائيات والأرقام:</label>
                <div className="grid grid-cols-3 gap-2">
                  {hero.stats.map((stat, index) => (
                    <div key={index} className="rounded-xl border p-2.5 bg-[var(--surface-secondary)]">
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...hero.stats];
                          newStats[index].value = e.target.value;
                          setHero({ ...hero, stats: newStats });
                        }}
                        className="admin-input text-center font-bold text-lg"
                        placeholder="الرقم مثل: +5300"
                      />
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...hero.stats];
                          newStats[index].label = e.target.value;
                          setHero({ ...hero, stats: newStats });
                        }}
                        className="admin-input mt-1.5 text-center text-xs"
                        placeholder="الوصف"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {saveSuccess && <p className="text-sm font-bold text-emerald-500">{saveSuccess}</p>}
              {saveError && <p className="text-sm font-bold text-red-500">{saveError}</p>}

              <div className="flex gap-3 pt-4 border-t">
                <button
                  disabled={isSaving}
                  onClick={() => handleSaveSection("hero", hero)}
                  className="admin-primary flex-1 py-3 font-bold"
                >
                  {isSaving ? "جارٍ الحفظ..." : "حفظ التعديلات"}
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="admin-secondary px-6"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. About Section Modal */}
      {activeModal === "about" && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="my-8 w-full max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-black text-[var(--foreground)]">تعديل معلومات الأستاذ</h2>
              <button
                onClick={() => setActiveModal(null)}
                className="size-8 rounded-lg bg-[var(--surface-secondary)] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-4 text-right">
              <div>
                <label className="block text-xs font-bold text-[var(--muted)]">اسم الأستاذ</label>
                <input
                  type="text"
                  value={about.name}
                  onChange={(e) => setAbout({ ...about, name: e.target.value })}
                  className="admin-input mt-1 w-full font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--muted)]">الصفة / اللقب</label>
                <input
                  type="text"
                  value={about.title}
                  onChange={(e) => setAbout({ ...about, title: e.target.value })}
                  className="admin-input mt-1 w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--muted)]">النبذة التعريفية</label>
                <textarea
                  rows={4}
                  value={about.bio}
                  onChange={(e) => setAbout({ ...about, bio: e.target.value })}
                  className="admin-input mt-1 w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--muted)]">إحصائية الخبرة أو الإنجاز</label>
                <input
                  type="text"
                  value={about.experience}
                  onChange={(e) => setAbout({ ...about, experience: e.target.value })}
                  className="admin-input mt-1 w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--muted)]">رابط صورة الأستاذ</label>
                <input
                  type="text"
                  value={about.image_url}
                  onChange={(e) => setAbout({ ...about, image_url: e.target.value })}
                  className="admin-input mt-1 w-full font-mono text-xs"
                />
              </div>

              {saveSuccess && <p className="text-sm font-bold text-emerald-500">{saveSuccess}</p>}
              {saveError && <p className="text-sm font-bold text-red-500">{saveError}</p>}

              <div className="flex gap-3 pt-4 border-t">
                <button
                  disabled={isSaving}
                  onClick={() => handleSaveSection("about", about)}
                  className="admin-primary flex-1 py-3 font-bold"
                >
                  {isSaving ? "جارٍ الحفظ..." : "حفظ التعديلات"}
                </button>
                <button onClick={() => setActiveModal(null)} className="admin-secondary px-6">
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Books Section Modal */}
      {activeModal === "books" && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="my-8 w-full max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-black text-[var(--foreground)]">إدارة المؤلفات والكتب</h2>
              <button
                onClick={() => setActiveModal(null)}
                className="size-8 rounded-lg bg-[var(--surface-secondary)] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-4 text-right">
              {books.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2 rounded-xl border p-3 bg-[var(--surface-secondary)]">
                  <span className="font-bold text-sm text-[var(--primary)] w-6">{idx + 1}.</span>
                  <input
                    type="text"
                    value={b.title}
                    onChange={(e) => {
                      const newBooks = [...books];
                      newBooks[idx].title = e.target.value;
                      setBooks(newBooks);
                    }}
                    placeholder="عنوان الكتاب"
                    className="admin-input flex-1 font-bold"
                  />
                  <input
                    type="text"
                    value={b.author}
                    onChange={(e) => {
                      const newBooks = [...books];
                      newBooks[idx].author = e.target.value;
                      setBooks(newBooks);
                    }}
                    placeholder="المؤلف"
                    className="admin-input w-36 text-sm"
                  />
                  <button
                    onClick={() => setBooks(books.filter((_, i) => i !== idx))}
                    className="size-9 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 text-sm font-bold"
                  >
                    حذف
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setBooks([...books, { title: "كتاب جديد", author: "خالد العبداللّه", sort_order: books.length }])}
                className="w-full rounded-xl border-2 border-dashed py-3 text-sm font-bold text-[var(--primary)] hover:bg-[var(--primary-soft)]"
              >
                + إضافة كتاب جديد
              </button>

              {saveSuccess && <p className="text-sm font-bold text-emerald-500">{saveSuccess}</p>}
              {saveError && <p className="text-sm font-bold text-red-500">{saveError}</p>}

              <div className="flex gap-3 pt-4 border-t">
                <button
                  disabled={isSaving}
                  onClick={() => handleSaveBooks(books)}
                  className="admin-primary flex-1 py-3 font-bold"
                >
                  {isSaving ? "جارٍ الحفظ..." : "حفظ قائمة الكتب"}
                </button>
                <button onClick={() => setActiveModal(null)} className="admin-secondary px-6">
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Courses Section Modal */}
      {activeModal === "courses" && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="my-8 w-full max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-black text-[var(--foreground)]">إدارة الدورات المتاحة</h2>
              <button
                onClick={() => setActiveModal(null)}
                className="size-8 rounded-lg bg-[var(--surface-secondary)] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-4 text-right">
              {courses.map((c, idx) => (
                <div key={idx} className="rounded-xl border p-4 bg-[var(--surface-secondary)] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-[var(--primary)]">الدورة #{idx + 1}</span>
                    <button
                      onClick={() => setCourses(courses.filter((_, i) => i !== idx))}
                      className="text-xs text-red-500 font-bold hover:underline"
                    >
                      حذف هذه الدورة
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={c.name}
                      onChange={(e) => {
                        const next = [...courses];
                        next[idx].name = e.target.value;
                        setCourses(next);
                      }}
                      placeholder="اسم الدورة"
                      className="admin-input font-bold"
                    />
                    <select
                      value={c.status || "available"}
                      onChange={(e) => {
                        const next = [...courses];
                        next[idx].status = e.target.value;
                        setCourses(next);
                      }}
                      className="admin-input text-sm"
                    >
                      <option value="available">متاحة للتسجيل</option>
                      <option value="coming_soon">قريبًا</option>
                      <option value="hidden">مخفية</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    value={c.description || ""}
                    onChange={(e) => {
                      const next = [...courses];
                      next[idx].description = e.target.value;
                      setCourses(next);
                    }}
                    placeholder="وصف مختصر للدورة"
                    className="admin-input text-sm w-full"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={c.price ?? ""}
                      onChange={(e) => {
                        const next = [...courses];
                        next[idx].price = e.target.value ? Number(e.target.value) : null;
                        setCourses(next);
                      }}
                      placeholder="السعر (اختياري)"
                      className="admin-input text-sm"
                    />
                    <input
                      type="number"
                      value={c.hours ?? ""}
                      onChange={(e) => {
                        const next = [...courses];
                        next[idx].hours = e.target.value ? Number(e.target.value) : null;
                        setCourses(next);
                      }}
                      placeholder="عدد الساعات"
                      className="admin-input text-sm"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setCourses([...courses, { name: "دورة جديدة", description: "وصف الدورة", status: "available", price: null, hours: null, sort_order: courses.length }])}
                className="w-full rounded-xl border-2 border-dashed py-3 text-sm font-bold text-[var(--primary)] hover:bg-[var(--primary-soft)]"
              >
                + إضافة دورة جديدة
              </button>

              {saveSuccess && <p className="text-sm font-bold text-emerald-500">{saveSuccess}</p>}
              {saveError && <p className="text-sm font-bold text-red-500">{saveError}</p>}

              <div className="flex gap-3 pt-4 border-t">
                <button
                  disabled={isSaving}
                  onClick={() => handleSaveCourses(courses)}
                  className="admin-primary flex-1 py-3 font-bold"
                >
                  {isSaving ? "جارٍ الحفظ..." : "حفظ الدورات"}
                </button>
                <button onClick={() => setActiveModal(null)} className="admin-secondary px-6">
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. Contact Section Modal */}
      {activeModal === "contact" && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="my-8 w-full max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-black text-[var(--foreground)]">تعديل معلومات التواصل والواتساب</h2>
              <button
                onClick={() => setActiveModal(null)}
                className="size-8 rounded-lg bg-[var(--surface-secondary)] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-4 text-right">
              <div>
                <label className="block text-xs font-bold text-[var(--muted)]">رقم واتساب (مع رمز الدولة بدون +)</label>
                <input
                  type="text"
                  value={contact.whatsapp}
                  onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                  placeholder="963955971463"
                  className="admin-input mt-1 w-full font-mono text-base"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--muted)]">رقم الهاتف الظاهر للزوار</label>
                <input
                  type="text"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  placeholder="+963955971463"
                  className="admin-input mt-1 w-full font-mono text-base"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--muted)]">عنوان قسم التواصل</label>
                <input
                  type="text"
                  value={contact.title}
                  onChange={(e) => setContact({ ...contact, title: e.target.value })}
                  className="admin-input mt-1 w-full font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--muted)]">النص التوضيحي</label>
                <textarea
                  rows={3}
                  value={contact.description}
                  onChange={(e) => setContact({ ...contact, description: e.target.value })}
                  className="admin-input mt-1 w-full"
                />
              </div>

              {saveSuccess && <p className="text-sm font-bold text-emerald-500">{saveSuccess}</p>}
              {saveError && <p className="text-sm font-bold text-red-500">{saveError}</p>}

              <div className="flex gap-3 pt-4 border-t">
                <button
                  disabled={isSaving}
                  onClick={() => handleSaveSection("contact", contact)}
                  className="admin-primary flex-1 py-3 font-bold"
                >
                  {isSaving ? "جارٍ الحفظ..." : "حفظ معلومات التواصل"}
                </button>
                <button onClick={() => setActiveModal(null)} className="admin-secondary px-6">
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. Professional Course Modal */}
      {activeModal === "professional" && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="my-8 w-full max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-black text-[var(--foreground)]">تعديل تفاصيل الدورة الاحترافية</h2>
              <button
                onClick={() => setActiveModal(null)}
                className="size-8 rounded-lg bg-[var(--surface-secondary)] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-4 text-right">
              <div>
                <label className="block text-xs font-bold text-[var(--muted)]">اسم الدورة</label>
                <input
                  type="text"
                  value={professional.name}
                  onChange={(e) => setProfessional({ ...professional, name: e.target.value })}
                  className="admin-input mt-1 w-full font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[var(--muted)]">عدد الساعات</label>
                  <input
                    type="number"
                    value={professional.hours}
                    onChange={(e) => setProfessional({ ...professional, hours: Number(e.target.value) })}
                    className="admin-input mt-1 w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--muted)]">الرسوم ($)</label>
                  <input
                    type="number"
                    value={professional.fee}
                    onChange={(e) => setProfessional({ ...professional, fee: Number(e.target.value) })}
                    className="admin-input mt-1 w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--muted)]">الكتاب المعتمد</label>
                <input
                  type="text"
                  value={professional.book}
                  onChange={(e) => setProfessional({ ...professional, book: e.target.value })}
                  className="admin-input mt-1 w-full"
                />
              </div>

              {saveSuccess && <p className="text-sm font-bold text-emerald-500">{saveSuccess}</p>}
              {saveError && <p className="text-sm font-bold text-red-500">{saveError}</p>}

              <div className="flex gap-3 pt-4 border-t">
                <button
                  disabled={isSaving}
                  onClick={() => handleSaveSection("professional", professional)}
                  className="admin-primary flex-1 py-3 font-bold"
                >
                  {isSaving ? "جارٍ الحفظ..." : "حفظ الدورة الاحترافية"}
                </button>
                <button onClick={() => setActiveModal(null)} className="admin-secondary px-6">
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. General Settings Modal */}
      {activeModal === "settings" && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="my-8 w-full max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-black text-[var(--foreground)]">إعدادات الموقع العامة</h2>
              <button
                onClick={() => setActiveModal(null)}
                className="size-8 rounded-lg bg-[var(--surface-secondary)] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-4 text-right">
              <div>
                <label className="block text-xs font-bold text-[var(--muted)]">اسم الموقع</label>
                <input
                  type="text"
                  value={settings.site_name}
                  onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                  className="admin-input mt-1 w-full font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--muted)]">العبارة الوصفية (Tagline)</label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="admin-input mt-1 w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--muted)]">وصف الموقع العام</label>
                <textarea
                  rows={3}
                  value={settings.description}
                  onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                  className="admin-input mt-1 w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--muted)]">نص حقوق التذييل</label>
                <input
                  type="text"
                  value={settings.footer_text}
                  onChange={(e) => setSettings({ ...settings, footer_text: e.target.value })}
                  className="admin-input mt-1 w-full"
                />
              </div>

              {saveSuccess && <p className="text-sm font-bold text-emerald-500">{saveSuccess}</p>}
              {saveError && <p className="text-sm font-bold text-red-500">{saveError}</p>}

              <div className="flex gap-3 pt-4 border-t">
                <button
                  disabled={isSaving}
                  onClick={() => handleSaveSection("settings", settings)}
                  className="admin-primary flex-1 py-3 font-bold"
                >
                  {isSaving ? "جارٍ الحفظ..." : "حفظ الإعدادات"}
                </button>
                <button onClick={() => setActiveModal(null)} className="admin-secondary px-6">
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
