# إعداد Supabase لمنصة التبيان

## 1. متغيرات البيئة

انسخ `.env.example` إلى `.env.local` وأدخل قيم المشروع من **Project Settings → API**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

مفتاح `service_role` غير مطلوب ويجب ألّا يوضع في المشروع أو المتصفح.

## 2. قاعدة البيانات والتخزين

افتح **SQL Editor** في Supabase وشغّل محتوى:

`supabase/migrations/202608010001_initial_admin_cms.sql`

ينشئ الملف الجداول، وسياسات RLS، ودالة التحقق من دور الأدمن، وحاوية الصور، والبيانات الابتدائية الحالية.

## 3. إنشاء أول أدمن

1. عطّل التسجيل العام من **Authentication → Providers → Email** عبر إيقاف خيار السماح بإنشاء مستخدمين جدد.
2. أنشئ المستخدم يدويًا من **Authentication → Users → Add user** وحدد بريده وكلمة مرور قوية، وفعّل البريد إن طلبت اللوحة ذلك.
3. انسخ UUID للمستخدم.
4. شغّل في SQL Editor مع استبدال القيمة فقط:

```sql
insert into public.user_roles (user_id, role)
values ('USER_UUID_HERE', 'admin');
```

بعدها يمكن للمستخدم الدخول من `/admin/login`. لا توجد صفحة تسجيل عامة في الموقع.

## 4. ما يعمل قبل الربط وما لا يعمل

الموقع العام يظل يعمل بالمحتوى المحلي الاحتياطي إذا غابت متغيرات البيئة أو تعذر Supabase. تسجيل الدخول، الحفظ، CRUD ورفع الصور لن تعمل قبل إنشاء مشروع Supabase وتشغيل migration وإضافة أول دور admin.
