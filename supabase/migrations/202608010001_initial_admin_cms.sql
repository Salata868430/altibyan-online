begin;

create schema if not exists private;

create table if not exists public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_content (
  section text primary key,
  content jsonb not null default '{}'::jsonb,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.books (
  id bigint generated always as identity primary key,
  title text not null check (char_length(trim(title)) > 0),
  author text not null default 'خالد العبداللّه',
  image_url text,
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.courses (
  id bigint generated always as identity primary key,
  name text not null check (char_length(trim(name)) > 0),
  description text not null default '',
  price numeric(10,2) check (price is null or price >= 0),
  hours integer check (hours is null or hours >= 0),
  status text not null default 'available' check (status in ('available','coming_soon','hidden')),
  image_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = (select auth.uid()) and role = 'admin'
  );
$$;

revoke all on function private.is_admin() from public;
grant usage on schema private to authenticated;
grant execute on function private.is_admin() to authenticated;

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists user_roles_updated_at on public.user_roles;
create trigger user_roles_updated_at before update on public.user_roles for each row execute function public.set_updated_at();
drop trigger if exists site_content_updated_at on public.site_content;
create trigger site_content_updated_at before update on public.site_content for each row execute function public.set_updated_at();
drop trigger if exists books_updated_at on public.books;
create trigger books_updated_at before update on public.books for each row execute function public.set_updated_at();
drop trigger if exists courses_updated_at on public.courses;
create trigger courses_updated_at before update on public.courses for each row execute function public.set_updated_at();

alter table public.user_roles enable row level security;
alter table public.site_content enable row level security;
alter table public.books enable row level security;
alter table public.courses enable row level security;

create policy "users read own role" on public.user_roles for select to authenticated using ((select auth.uid()) = user_id);
create policy "public reads site content" on public.site_content for select to anon, authenticated using (true);
create policy "public reads visible books" on public.books for select to anon, authenticated using (is_visible);
create policy "admins read all books" on public.books for select to authenticated using ((select private.is_admin()));
create policy "public reads visible courses" on public.courses for select to anon, authenticated using (status <> 'hidden');
create policy "admins read all courses" on public.courses for select to authenticated using ((select private.is_admin()));

create policy "admins insert site content" on public.site_content for insert to authenticated with check ((select private.is_admin()));
create policy "admins update site content" on public.site_content for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "admins delete site content" on public.site_content for delete to authenticated using ((select private.is_admin()));
create policy "admins insert books" on public.books for insert to authenticated with check ((select private.is_admin()));
create policy "admins update books" on public.books for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "admins delete books" on public.books for delete to authenticated using ((select private.is_admin()));
create policy "admins insert courses" on public.courses for insert to authenticated with check ((select private.is_admin()));
create policy "admins update courses" on public.courses for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "admins delete courses" on public.courses for delete to authenticated using ((select private.is_admin()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-assets', 'site-assets', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "public reads site assets" on storage.objects for select to anon, authenticated using (bucket_id = 'site-assets');
create policy "admins upload site assets" on storage.objects for insert to authenticated with check (bucket_id = 'site-assets' and (select private.is_admin()));
create policy "admins update site assets" on storage.objects for update to authenticated using (bucket_id = 'site-assets' and (select private.is_admin())) with check (bucket_id = 'site-assets' and (select private.is_admin()));
create policy "admins delete site assets" on storage.objects for delete to authenticated using (bucket_id = 'site-assets' and (select private.is_admin()));

insert into public.site_content (section, content) values
('hero', '{"badge":"مناهج التبيان للقراءة العربية ولفظ القرآن","title":"تعلّم القرآن واللغة العربية بثقة وإتقان","description":"تأهيل احترافي لمعلّمي القراءة العربية وقراءة القرآن الكريم من خلال القاعدة التبيانية، بإشراف الأستاذ خالد العبداللّه.","primary_button":"تواصل عبر واتساب","secondary_button":"تفاصيل الدورة الاحترافية","stats":[{"value":"+5300","label":"معلّم ومعلّمة"},{"value":"100","label":"ساعة تدريبية"},{"value":"3","label":"امتحانات شفهية"}]}'),
('about', '{"name":"خالد العبداللّه","title":"محاضر الدورة ومؤلف مناهج التبيان","bio":"يقدّم الأستاذ خالد العبداللّه الدورة الاحترافية من خلال القاعدة التبيانية، وهو مؤلف سلسلة من المناهج المتخصصة في القراءة العربية ولفظ القرآن وتجويده.","experience":"أكثر من 5300 معلّم ومعلّمة تخرّجوا في الدورة الاحترافية لإعداد معلّمي القراءة العربية وقراءة القرآن الكريم.","image_url":"/images/professor.jpg"}'),
('professional_course', '{"name":"الدورة الاحترافية لتخريج معلّمي القراءة العربية وقراءة القرآن الكريم من خلال القاعدة التبيانية","hours":100,"fee":150,"features":["إتقان المنهج","ضبط الأداء والنطق الصحيح","تعلم مخارج الحروف وصفاتها","معالجة الأخطاء","اكتساب مهارات التعليم","التدرج من أسماء الحروف إلى قراءة القرآن واللغة العربية بإتقان","التأهيل للإشراف والتدريب","شهادة معتمدة","نشر العلم النافع"],"conditions":["اجتياز امتحان القبول","الالتزام بالمواعيد","لا يسمح بالغياب","لا تسترد الرسوم عند الانسحاب","تخصيص وقت كافٍ للمذاكرة"],"exams":["3 امتحانات شفهية","90–100 ممتاز","80–89 جيد جدًا","70–79 جيد","69 فأقل رسوب","الشهادات مصدقة وموثقة"]}'),
('contact', '{"whatsapp":"963955971463","phone":"+963955971463","email":""}'),
('navigation', '{"navbar":[{"label":"الرئيسية","href":"#home"},{"label":"عن الأستاذ","href":"#about"},{"label":"المؤلفات","href":"#publications"},{"label":"الدورة الاحترافية","href":"#professional-course"},{"label":"الدورات","href":"#programs"},{"label":"تواصل معنا","href":"#contact"}],"footer":[]}'),
('settings', '{"site_name":"التبيان","description":"منصة تعليمية متخصصة في تعليم القرآن الكريم والتجويد واللغة العربية والعلوم الشرعية.","whatsapp_url":"https://wa.me/963955971463"}')
on conflict (section) do nothing;

insert into public.books (title, sort_order) values
('القاعدة التبيانية في القراءة العربية ولفظ القرآن',1),
('كتاب التبيان للتأسيس بإتقان في القراءة العربية ولفظ القرآن',2),
('كتاب ثمار التبيان في تجويد القرآن',3),
('المنظومة التبيانية لطلاب العربية والحلقات القرآنية',4)
on conflict do nothing;

insert into public.courses (name, sort_order) values
('إقراء كتاب التبيان',1),
('إعداد مدرسي القراءة العربية ولفظ القرآن الكريم',2),
('التجويد من كتاب ثمار التبيان',3),
('ضبط وإتقان ختمة كاملة للقرآن',4),
('محو الأمية للناطقين بالعربية',5),
('دورة خاصة لغير الناطقين بالعربية',6),
('شرح وحفظ المنظومة التبيانية',7)
on conflict do nothing;

commit;
