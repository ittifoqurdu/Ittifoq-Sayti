import { useState, useMemo, useEffect } from 'react'
import {
  Users,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Building2,
  Award,
  GraduationCap,
  Home,
  Check
} from 'lucide-react'
import yoshlarDaftariStats from '../../data/yoshlarDaftariStats.json'

export default function YoshlarDaftariSection({ initialCategory = 'barchasi' }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory)
    }
  }, [initialCategory])

  const { categoriesTable, facultyCounts, courseCounts } = yoshlarDaftariStats

  // Filter categories table
  const filteredCategoriesTable = useMemo(() => {
    if (selectedCategory === 'barchasi') return categoriesTable || []
    return (categoriesTable || []).filter((c) => c.key === selectedCategory)
  }, [categoriesTable, selectedCategory])

  // Total count of students across all social categories
  const totalSocialCount = useMemo(() => {
    return (categoriesTable || []).reduce((acc, c) => acc + c.officialCount, 0)
  }, [categoriesTable])

  return (
    <section className="mt-12 space-y-8" id="yoshlar-daftari-statistika">
      {/* Section Header */}
      <div className="glass-card relative overflow-hidden p-6 sm:p-8 border-l-4 border-l-emerald-500">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
              <HeartHandshake size={14} />
              <span>Ijtimoiy himoya & Yoshlar reyestri</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
              «Yoshlar daftari» va <span className="text-emerald-600 dark:text-emerald-400">ijtimoiy toifalar statistikasi</span>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              Urganch davlat universitetida tahsil olayotgan talabalarning Yoshlar daftari, Chin yetim, Ijtimoiy reyestr, Ayollar daftari va boshqa toifalar bo‘yicha rasmiy statistik ko‘rsatkichlari hamda imtiyozlar qamrovi.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 shadow-sm">
              <ShieldCheck size={16} />
              Jami ijtimoiy qamrov: {totalSocialCount.toLocaleString()} nafar talaba
            </span>
            <span className="text-[11px] text-zinc-400">
              Universitet boshlang‘ich tashkiloti rasmiy maʼlumotlari
            </span>
          </div>
        </div>
      </div>

      {/* 4 Main Core Highlights matching user diagram */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Yoshlar daftari */}
        <div
          onClick={() => setSelectedCategory(selectedCategory === 'yoshlar_daftari' ? 'barchasi' : 'yoshlar_daftari')}
          className={`glass-card relative overflow-hidden p-6 border-l-4 border-l-emerald-500 transition cursor-pointer hover:shadow-lg ${
            selectedCategory === 'yoshlar_daftari' ? 'ring-2 ring-emerald-500 bg-emerald-500/5' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Yoshlar daftarida turadigan yoshlar
            </span>
            <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
              <Sparkles size={18} />
            </div>
          </div>
          <p className="mt-4 text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100">
            52 <span className="text-sm font-semibold text-zinc-500">nafar</span>
          </p>
          <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
            <span>Boshlang‘ich tashkilot hisoboti</span>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">100% qamrov</span>
          </div>
        </div>

        {/* Chin yetim */}
        <div
          onClick={() => setSelectedCategory(selectedCategory === 'chin_yetim' ? 'barchasi' : 'chin_yetim')}
          className={`glass-card relative overflow-hidden p-6 border-l-4 border-l-purple-500 transition cursor-pointer hover:shadow-lg ${
            selectedCategory === 'chin_yetim' ? 'ring-2 ring-purple-500 bg-purple-500/5' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Chin yetimligi bo‘lgan yoshlar
            </span>
            <div className="rounded-xl bg-purple-500/10 p-2 text-purple-600 dark:text-purple-400">
              <Award size={18} />
            </div>
          </div>
          <p className="mt-4 text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100">
            263 <span className="text-sm font-semibold text-zinc-500">nafar</span>
          </p>
          <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
            <span>Ota-ona qaramog‘idan mahrum</span>
            <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400">To‘liq davlat taʼminoti</span>
          </div>
        </div>

        {/* Ijtimoiy reyestr */}
        <div
          onClick={() => setSelectedCategory(selectedCategory === 'kam_taminlangan' ? 'barchasi' : 'kam_taminlangan')}
          className={`glass-card relative overflow-hidden p-6 border-l-4 border-l-amber-500 transition cursor-pointer hover:shadow-lg ${
            selectedCategory === 'kam_taminlangan' ? 'ring-2 ring-amber-500 bg-amber-500/5' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Ijtimoiy himoyaga muhtoj talabalar
            </span>
            <div className="rounded-xl bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
              <HeartHandshake size={18} />
            </div>
          </div>
          <p className="mt-4 text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100">
            289 <span className="text-sm font-semibold text-zinc-500">nafar</span>
          </p>
          <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
            <span>Yagona reyestr & Kam taʼminlangan</span>
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">TTJda 225 nafar</span>
          </div>
        </div>

        {/* Ayollar daftari */}
        <div
          onClick={() => setSelectedCategory(selectedCategory === 'ayollar_daftari' ? 'barchasi' : 'ayollar_daftari')}
          className={`glass-card relative overflow-hidden p-6 border-l-4 border-l-pink-500 transition cursor-pointer hover:shadow-lg ${
            selectedCategory === 'ayollar_daftari' ? 'ring-2 ring-pink-500 bg-pink-500/5' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
              Ayollar daftari
            </span>
            <div className="rounded-xl bg-pink-500/10 p-2 text-pink-600 dark:text-pink-400">
              <Users size={18} />
            </div>
          </div>
          <p className="mt-4 text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100">
            91 <span className="text-sm font-semibold text-zinc-500">nafar</span>
          </p>
          <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
            <span>Ayollar daftaridagi oilalar</span>
            <span className="text-[11px] font-bold text-pink-600 dark:text-pink-400">TTJda 74 nafar</span>
          </div>
        </div>
      </div>

      {/* Sub KPI cards: 4 additional official metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div
          onClick={() => setSelectedCategory(selectedCategory === 'nogiron' ? 'barchasi' : 'nogiron')}
          className={`rounded-2xl border border-zinc-200/80 bg-white/70 dark:border-zinc-800 dark:bg-zinc-900/60 p-4 transition cursor-pointer hover:border-emerald-500/50 ${
            selectedCategory === 'nogiron' ? 'ring-2 ring-emerald-500 bg-emerald-500/5' : ''
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
            Nogironligi bor talabalar
          </span>
          <p className="mt-1 text-2xl font-black text-zinc-900 dark:text-zinc-100">
            41 <span className="text-xs font-semibold text-zinc-500">nafar</span>
          </p>
          <p className="text-[11px] text-zinc-400 mt-1">TTJda 95 nafar talaba</p>
        </div>

        <div
          onClick={() => setSelectedCategory(selectedCategory === 'boquvchisini_yoqotgan' ? 'barchasi' : 'boquvchisini_yoqotgan')}
          className={`rounded-2xl border border-zinc-200/80 bg-white/70 dark:border-zinc-800 dark:bg-zinc-900/60 p-4 transition cursor-pointer hover:border-emerald-500/50 ${
            selectedCategory === 'boquvchisini_yoqotgan' ? 'ring-2 ring-emerald-500 bg-emerald-500/5' : ''
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
            Boquvchisini yo‘qotgan
          </span>
          <p className="mt-1 text-2xl font-black text-zinc-900 dark:text-zinc-100">
            49 <span className="text-xs font-semibold text-zinc-500">nafar</span>
          </p>
          <p className="text-[11px] text-zinc-400 mt-1">TTJda 28 nafar talaba</p>
        </div>

        <div
          onClick={() => setSelectedCategory(selectedCategory === 'mehribonlik' ? 'barchasi' : 'mehribonlik')}
          className={`rounded-2xl border border-zinc-200/80 bg-white/70 dark:border-zinc-800 dark:bg-zinc-900/60 p-4 transition cursor-pointer hover:border-emerald-500/50 ${
            selectedCategory === 'mehribonlik' ? 'ring-2 ring-emerald-500 bg-emerald-500/5' : ''
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
            Mehribonlik uyi
          </span>
          <p className="mt-1 text-2xl font-black text-zinc-900 dark:text-zinc-100">
            19 <span className="text-xs font-semibold text-zinc-500">nafar</span>
          </p>
          <p className="text-[11px] text-zinc-400 mt-1">Tarbiyalanuvchilar (TTJda 8)</p>
        </div>

        <div
          onClick={() => setSelectedCategory(selectedCategory === 'oilali' ? 'barchasi' : 'oilali')}
          className={`rounded-2xl border border-zinc-200/80 bg-white/70 dark:border-zinc-800 dark:bg-zinc-900/60 p-4 transition cursor-pointer hover:border-emerald-500/50 ${
            selectedCategory === 'oilali' ? 'ring-2 ring-emerald-500 bg-emerald-500/5' : ''
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
            Oilali talabalar
          </span>
          <p className="mt-1 text-2xl font-black text-zinc-900 dark:text-zinc-100">
            37 <span className="text-xs font-semibold text-zinc-500">nafar</span>
          </p>
          <p className="text-[11px] text-zinc-400 mt-1">Oila qurgan talabalar</p>
        </div>
      </div>

      {/* Statistical Numbers & Categories Breakdown Section */}
      <div className="space-y-6">
        {/* Category Filter Pills */}
        <div className="glass-card p-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-zinc-500 mr-2">Toifalar:</span>
          <button
            type="button"
            onClick={() => setSelectedCategory('barchasi')}
            className={`rounded-full px-3.5 py-1 text-xs font-medium transition ${
              selectedCategory === 'barchasi'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300'
            }`}
          >
            Barchasi ({categoriesTable ? categoriesTable.length : 9})
          </button>

          {(categoriesTable || []).map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`rounded-full px-3.5 py-1 text-xs font-medium transition ${
                selectedCategory === cat.key
                  ? 'bg-emerald-600 text-white font-bold shadow-sm'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              {cat.title}: <strong className="ml-1">{cat.officialCount}</strong>
            </button>
          ))}
        </div>

        {/* Statistical Numbers Table */}
        <div className="glass-card overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-500" />
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                Toifalar bo‘yicha talabalar soni va berilgan imtiyozlar
              </h3>
            </div>
            <span className="text-xs text-zinc-500">
              Jami ko‘rsatkich: <strong className="text-emerald-600 dark:text-emerald-400">{filteredCategoriesTable.length} ta toifa</strong>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-zinc-200 bg-zinc-50/80 font-bold uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400">
                <tr>
                  <th className="py-3.5 px-4 w-12 text-center">№</th>
                  <th className="py-3.5 px-4">Ijtimoiy Toifa / Daftar Nomi</th>
                  <th className="py-3.5 px-4 text-center">Talabalar Soni</th>
                  <th className="py-3.5 px-4 text-center">TTJdagi Talabalar</th>
                  <th className="py-3.5 px-4">Qamrov va Holati</th>
                  <th className="py-3.5 px-4">Berilgan Imtiyoz va Ijtimoiy Yordam</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                {filteredCategoriesTable.map((cat, index) => (
                  <tr
                    key={cat.key}
                    className="hover:bg-emerald-500/5 transition-colors"
                  >
                    <td className="py-3.5 px-4 text-center font-bold text-zinc-400">
                      {index + 1}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                        {cat.title}
                      </div>
                      <span className="text-[11px] text-zinc-500">
                        UrDU bo‘yicha to‘liq hisobga olingan
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center justify-center rounded-xl bg-emerald-500/10 px-3 py-1 text-sm font-extrabold text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                        {cat.officialCount.toLocaleString()} nafar
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-zinc-800 dark:text-zinc-200">
                      <span className="inline-flex items-center gap-1 text-xs">
                        <Home size={13} className="text-zinc-400" />
                        {cat.ttjCount} nafar
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                        {cat.badge}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-600 dark:text-zinc-400 max-w-xs leading-relaxed">
                      {cat.imtiyoz}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Faculty and Course Breakdown (Sonlar taqsimoti) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fakultetlar kesimida sonlar */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="text-emerald-500" size={18} />
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                Fakultetlar kesimida ijtimoiy toifadagi talabalar soni
              </h3>
            </div>
            <div className="space-y-3">
              {Object.entries(facultyCounts || {}).map(([faculty, count]) => {
                const pct = ((Number(count) / 336) * 100).toFixed(1)
                return (
                  <div key={faculty} className="rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/40 p-3">
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                        {faculty}
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {count} nafar ({pct}%)
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div style={{ width: `${pct}%` }} className="h-full bg-emerald-500 rounded-full" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Kurslar kesimida sonlar */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="text-emerald-500" size={18} />
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                Kurslar kesimida talabalar taqsimoti
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {Object.entries(courseCounts || {}).map(([course, count]) => (
                <div key={course} className="rounded-xl border border-zinc-200/80 bg-white/60 dark:border-zinc-800 dark:bg-zinc-900/50 p-3.5 text-center">
                  <p className="text-xs text-zinc-500">{course}</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                    {count} nafar
                  </p>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    {((Number(count) / 336) * 100).toFixed(1)}% ulush
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                Xatlov va o‘rganish natijasi:
              </span>
              Universitetda Yoshlar daftari va ijtimoiy toifadagi yoshlarning 100 foiziga moddiy yordam, yotoqxona hamda to‘lov-shartnoma imtiyozlari to‘liq ko‘rsatib kelinmoqda.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
