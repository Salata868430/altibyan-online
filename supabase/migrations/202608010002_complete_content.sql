begin;

insert into public.site_content (section, content, is_visible) values
('features', '{"eyebrow":"ثمرة التعلّم","title":"فوائد الدورة","items":["إتقان المنهج","ضبط الأداء والنطق الصحيح","تعلم مخارج الحروف وصفاتها","معالجة الأخطاء","اكتساب مهارات التعليم","التدرج من أسماء الحروف إلى قراءة القرآن واللغة العربية بإتقان","التأهيل للإشراف والتدريب","شهادة معتمدة","نشر العلم النافع"]}', true),
('testimonials', '{"eyebrow":"آراء الطلاب","title":"انطباعات من رحلة التعلّم","disclaimer":"النصوص التالية أمثلة توضيحية مؤقتة لتصميم القسم، وليست شهادات حقيقية.","items":[{"name":"أحمد م.","track":"مسار القرآن الكريم","quote":"أصبح مسار التعلّم أوضح بالنسبة لي، وأكثر ما أعجبني هو التدرج والاهتمام بالتطبيق."},{"name":"سارة ع.","track":"مسار اللغة العربية","quote":"الشرح منظم ومريح، والتغذية الراجعة بعد كل درس تساعدني على معرفة ما ينبغي تطويره."},{"name":"يوسف ك.","track":"مسار التجويد","quote":"أسلوب عملي يشجع على الاستمرار، مع عناية واضحة بالتفاصيل دون تعقيد."}]}', true)
on conflict (section) do nothing;

update public.site_content set content = content || '{"title":"تواصل مباشرة عبر واتساب","description":"للاستفسار عن الدورة الاحترافية أو إحدى الدورات المتاحة، تواصل على الرقم التالي.","button":"تواصل عبر واتساب"}'::jsonb where section = 'contact';
update public.site_content set content = content || '{"tagline":"علمٌ يضيء الطريق","logo_url":"/logo/logo-full.svg","footer_text":"جميع الحقوق محفوظة.","sections":{"about":true,"publications":true,"professional_course":true,"features":true,"programs":true,"testimonials":true,"contact":true}}'::jsonb where section = 'settings';
update public.site_content set content = jsonb_set(content, '{footer}', content->'navbar', true) where section = 'navigation' and jsonb_array_length(coalesce(content->'footer','[]'::jsonb)) = 0;
update public.site_content set content = content || '{"book":"التبيان للتأسيس بإتقان في القراءة العربية ولفظ القرآن – المستوى الشامل","teaching":["محاضرات عبر Zoom","مدة المحاضرة ساعتان ونصف","إرسال الدروس مكتوبة في مجموعة واتساب خاصة","الإجابة عن الأسئلة","تحديد مواعيد مناسبة للمشاركين"],"skills":["التقاط الخطأ","تصويب الخطأ","تقليد الخطأ","امتلاك أسلوب تعليم متميز"]}'::jsonb where section = 'professional_course';

commit;
