-- UrDU Yoshlar Ittifoqi Portal - Supabase Database Schema
-- Ushbu SQL kodni Supabase > SQL Editor bo'limiga qo'yib "RUN" tugmasini bosing.

-- 1. Yangiliklar va e'lonlar jadvali
create table if not exists public.news_events (
  id text primary key,
  title text not null,
  date text not null,
  category text not null,
  badge text not null,
  read_time text default '3 daqiqa',
  summary text default '',
  content text default '',
  highlights jsonb default '[]'::jsonb,
  image text default '',
  action_url text default '',
  action_label text default 'Batafsil maʼlumot',
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 2. Xavfsizlik (Row Level Security - RLS)
alter table public.news_events enable row level security;

-- O'qish (hammaga ruxsat - talabalar saytda ko'rishi uchun)
create policy "Public can view news"
  on public.news_events for select
  using (true);

-- Yozish (qo'shish)
create policy "Public can insert news"
  on public.news_events for insert
  with check (true);

-- Tahrirlash
create policy "Public can update news"
  on public.news_events for update
  using (true);

-- O'chirish
create policy "Public can delete news"
  on public.news_events for delete
  using (true);

-- 3. Boshlang'ich yangiliklarni yuklash (ixtiyoriy)
insert into public.news_events (id, title, date, category, badge, read_time, summary, content, highlights, image, action_url, action_label)
values 
(
  'news-1',
  'UrDU Bilimdonlari ''Zakovat'' Intellektual O‘yinida Viloyat Chempioni Bo‘ldi',
  '10-Sentabr, 2026',
  'Intellektual O‘yin',
  '🏆 G‘alaba',
  '3 daqiqa',
  'Universitetimizning saralangan bilimdonlar jamoasi viloyat bosqichida mutlaq peshqadamlikni qo‘lga kiritib, respublika finaliga yo‘llanma oldi.',
  'Urganch davlat universiteti talabalaridan tashkil topgan ''UrDU Intellekt'' jamoasi viloyat miqyosida o‘tkazilgan Zakovat turnirida 1-o‘rinni egalladi.',
  '["15 ta oliygoh jamoalari ishtirok etdi", "Universitetimiz jamoasi 36 savoldan 31 tasiga aniq javob berdi", "Respublika final bosqichi Toshkent shahrida bo‘lib o‘tadi"]'::jsonb,
  '',
  'https://t.me/urdu_ittifoq_bot',
  'Zakovat klubiga aʼzo bo‘lish'
),
(
  'news-2',
  'Yosh Dasturchilar Uchun ''UrDU Tech Hackathon 2026'' Start Olyapti',
  '12-Sentabr, 2026',
  'IT & Innovatsiya',
  '💻 Xakaton',
  '4 daqiqa',
  '3 kun davomida talaba-yoshlar sun''iy intellekt, ta''lim platformalari va yashil energetika yo‘nalishlarida o‘z dasturiy yechimlarini namoyish etadilar.',
  'Urganch davlat universiteti Yoshlar ittifoqi boshlang‘ich tashkiloti, IT-Park Xorazm filiali hamda Raqamli texnologiyalar vazirligi viloyat boshqarmasi hamkorligida talabalar o‘rtasida ''UrDU Tech Hackathon 2026'' dasturchilar tanlovi e''lon qilinadi.',
  '["Mukofot jamg‘armasi 50,000,000 so‘m", "G‘olib loyihalar Startap Inkubatsiya Markaziga qabul qilinadi", "3 ta yo‘nalish: AI & EdTech, Yashil energetika, FinTech"]'::jsonb,
  '',
  'https://t.me/urdu_ittifoq_bot',
  'Xakatonda qatnashish uchun ro‘yxatdan o‘tish'
)
on conflict (id) do nothing;
