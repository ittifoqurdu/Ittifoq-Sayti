import { useState } from 'react'
import {
  CalendarDays,
  Users,
  Trophy,
  BookOpen,
  ShieldCheck,
  Flag,
  Briefcase,
  Sparkles,
  Award,
  Layers,
  GraduationCap,
  Flame,
  CheckCircle2,
  TrendingUp,
  Search
} from 'lucide-react'
import tadbirlarStats from '../../data/tadbirlarStats.json'

export default function TadbirlarStatsSection() {
  const [activeTab, setActiveTab] = useState('barchasi') // 'barchasi' | 'yonalishlar' | 'loyihalar' | 'tashabbuslar'
  const [searchQuery, setSearchQuery] = useState('')

  const { summary, mainDirections, coordinatorProjects, fiveInitiatives, clubsAndSpecialUnits } = tadbirlarStats

  const filteredDirections = mainDirections.filter((d) =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <section className="mt-12 mb-10 space-y-8" id="tadbirlar-statistika">
      {/* Section Hero Header */}
      <div className="glass-card relative overflow-hidden p-6 sm:p-8 border-l-4 border-l-blue-500">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 mb-3">
              <CalendarDays size={14} />
              <span>UrDU Yoshlar ittifoqi • Rasmiy faoliyat hisoboti</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
              O‘tkazilgan <span className="text-blue-600 dark:text-blue-400">tadbirlar va loyihalar</span> statistikasi
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              Universitetda talaba-yoshlarning bo‘sh vaqtini mazmunli tashkil etish, vatanparvarlik, kitobxonlik, sport musobaqalari, intellektual tanlovlar va 5 ta muhim tashabbus doirasida o‘tkazilgan barcha tadbirlar va ularning qamrovi soni.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-bold text-blue-700 dark:text-blue-300 shadow-sm">
              <CheckCircle2 size={16} />
              Jami tadbirlar: {summary.totalEvents.toLocaleString()} ta
            </span>
            <span className="text-[11px] text-zinc-400">
              Ishtirokchilar qamrovi: {summary.totalParticipants.toLocaleString()}+ nafar talaba
            </span>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-6 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Jami o‘tkazilgan tadbirlar
            </span>
            <div className="rounded-xl bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400">
              <CalendarDays size={18} />
            </div>
          </div>
          <p className="mt-4 text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100">
            {summary.totalEvents.toLocaleString()} <span className="text-sm font-semibold text-zinc-500">ta</span>
          </p>
          <p className="mt-2 text-xs text-zinc-500">Barcha yo‘nalishlar bo‘yicha</p>
        </div>

        <div className="glass-card p-6 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Talabalar ishtiroki qamrovi
            </span>
            <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
              <Users size={18} />
            </div>
          </div>
          <p className="mt-4 text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100">
            {summary.totalParticipants.toLocaleString()} <span className="text-sm font-semibold text-zinc-500">marta</span>
          </p>
          <p className="mt-2 text-xs text-zinc-500">Tadbirlardagi jami qatnashuvlar</p>
        </div>

        <div className="glass-card p-6 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Yetakchilik loyihalari
            </span>
            <div className="rounded-xl bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
              <Sparkles size={18} />
            </div>
          </div>
          <p className="mt-4 text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100">
            {summary.totalProjects} <span className="text-sm font-semibold text-zinc-500">ta</span>
          </p>
          <p className="mt-2 text-xs text-zinc-500">Boshlang‘ich tashkilot loyihalari</p>
        </div>

        <div className="glass-card p-6 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              To‘garaklar va klublar
            </span>
            <div className="rounded-xl bg-purple-500/10 p-2 text-purple-600 dark:text-purple-400">
              <Trophy size={18} />
            </div>
          </div>
          <p className="mt-4 text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100">
            {summary.totalClubs} <span className="text-sm font-semibold text-zinc-500">ta</span>
          </p>
          <p className="mt-2 text-xs text-zinc-500">49 fan, 27 sport, 59 ijodiy</p>
        </div>
      </div>

      {/* Main Events by Direction (Qaysi tadbir necha marta o'tkazildi) */}
      <div className="glass-card overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-zinc-200/80 dark:border-zinc-800/80 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-500" />
              Yo‘nalishlar bo‘yicha o‘tkazilgan tadbirlar soni va talabalar qamrovi
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              UrDU hisobotidagi asosiy tarbiyaviy, maʼnaviy va ijtimoiy yo‘nalishlar
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Yo‘nalishni qidirish..."
              className="rounded-xl border border-zinc-200/80 bg-white/80 py-1.5 pl-8 pr-3 text-xs text-zinc-900 outline-none focus:border-blue-500 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-100 transition shadow-sm w-48 sm:w-60"
            />
          </div>
        </div>

        {/* Table of Main Events */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-zinc-200 bg-zinc-50/80 font-bold uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400">
              <tr>
                <th className="py-3 px-4 w-12 text-center">№</th>
                <th className="py-3 px-4">Tadbir / Faoliyat Yo‘nalishi</th>
                <th className="py-3 px-4 text-center">O‘tkazilgan Tadbirlar Soni</th>
                <th className="py-3 px-4 text-center">Qamrab Olingan Talabalar</th>
                <th className="py-3 px-4">Tadbir Mazmuni va Vazifasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
              {filteredDirections.map((item, idx) => (
                <tr key={item.key} className="hover:bg-blue-500/5 transition-colors">
                  <td className="py-3.5 px-4 text-center font-bold text-zinc-400">
                    {idx + 1}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                      {item.title}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center justify-center rounded-xl bg-blue-500/10 px-3 py-1 text-sm font-extrabold text-blue-700 dark:text-blue-300 border border-blue-500/20">
                      {item.eventsCount.toLocaleString()} ta tadbir
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-zinc-800 dark:text-zinc-200">
                    <span className="inline-flex items-center gap-1 text-xs">
                      <Users size={13} className="text-zinc-400" />
                      {item.participantsCount.toLocaleString()} nafar
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md">
                    {item.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid: Koordinatorlar loyihalari & 5 Tashabbus qamrovi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Koordinatorlar bo'yicha loyihalar */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-blue-500" size={18} />
            <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
              Koordinatorlar kesimida o‘tkazilgan loyihalar ({summary.totalProjects} ta loyiha)
            </h3>
          </div>
          <div className="space-y-3">
            {coordinatorProjects.map((proj, i) => (
              <div
                key={i}
                className="rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/40 p-3.5 flex items-center justify-between gap-3"
              >
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm">
                    {proj.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{proj.coordinator}</p>
                  <span className="inline-block mt-1 text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                    {proj.highlight}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-flex rounded-xl bg-blue-500/10 px-3 py-1 text-xs font-black text-blue-700 dark:text-blue-300">
                    {proj.projectsCount} ta loyiha
                  </span>
                  <p className="text-[11px] text-zinc-500 mt-1">{proj.participantsCount.toLocaleString()} talaba</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Tashabbus bo'yicha talabalar qamrovi */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="text-amber-500" size={18} />
            <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
              5 ta muhim tashabbus bo‘yicha talaba-yoshlar qamrovi
            </h3>
          </div>
          <div className="space-y-3">
            {fiveInitiatives.map((init) => {
              const maxCount = 5267
              const pct = ((init.count / maxCount) * 100).toFixed(0)
              return (
                <div
                  key={init.number}
                  className="rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/40 p-3"
                >
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                      {init.title}
                    </span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      {init.count.toLocaleString()} nafar
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <div style={{ width: `${pct}%` }} className="h-full bg-amber-500 rounded-full" />
                  </div>
                  <p className="mt-1.5 text-[10px] text-zinc-500">{init.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Klublar, to‘garaklar va maxsus tuzilmalar faoliyati */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="text-purple-500" size={18} />
          <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
            UrDU Yoshlar ittifoqi qoshida faoliyat yurituvchi klub va jamoalar
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {clubsAndSpecialUnits.map((club, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-zinc-200/80 bg-white/70 dark:border-zinc-800 dark:bg-zinc-900/60 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {club.name}
                </h4>
                <span className="rounded-lg bg-purple-500/10 px-2 py-0.5 text-xs font-bold text-purple-700 dark:text-purple-300 shrink-0">
                  {club.members}
                </span>
              </div>
              <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                {club.details}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
