import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  ArrowLeft,
  Users,
  GraduationCap,
  Sparkles,
  Award,
  Building2,
  Calendar,
  Home,
  MapPin,
  CheckCircle2,
  TrendingUp,
  FileSpreadsheet,
  Search,
  BookOpen,
  PieChart,
  UserCheck,
  Download,
  School,
  Clock,
  Briefcase,
  Layers
} from 'lucide-react'
import studentStats from '../../data/studentStats.json'
import FooterSection from '../sections/FooterSection'

export default function StatistikaPage() {
  const [facultySearch, setFacultySearch] = useState('')
  const [activeView, setActiveView] = useState('barchasi') // barchasi, fakultetlar, ta'lim, hudud

  const total = studentStats.totalStudents
  const girlsPercent = ((studentStats.girls / total) * 100).toFixed(1)
  const boysPercent = ((studentStats.boys / total) * 100).toFixed(1)
  const under30Percent = ((studentStats.under30 / total) * 100).toFixed(1)
  const over30Percent = ((studentStats.over30 / total) * 100).toFixed(1)

  const facultyEntries = Object.entries(studentStats.faculties || {})
    .filter(([name]) => name.toLowerCase().includes(facultySearch.toLowerCase()))
    .sort((a, b) => b[1] - a[1])

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation & Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-4 py-2 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-100 hover:text-emerald-600 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-emerald-400"
          >
            <ArrowLeft size={14} />
            <span>Bosh sahifaga qaytish</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span>Bosh sahifa</span>
            <span>/</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Talabalar statistikasi</span>
          </div>
        </div>

        {/* Page Hero Header */}
        <header className="glass-card relative overflow-hidden p-6 sm:p-10 mb-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-4">
                <PieChart size={14} />
                <span>Urganch Davlat Universiteti • Rasmiy Statistika</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
                Talabalar Kontingenti va <span className="text-emerald-600 dark:text-emerald-400">To'liq Statistikasi</span>
              </h1>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                Universitetimizda tahsil olayotgan barcha talaba-yoshlar kontingenti, jinsiy va yosh ko'rsatkichlari, ta'lim shakllari, fakultetlar hamda hududlar bo'yicha to'liq tahliliy ma'lumotlar bazasi.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                <FileSpreadsheet size={16} />
                {studentStats.updatedAt}
              </span>
              <span className="text-[11px] text-zinc-400">
                Jami: <strong className="text-zinc-700 dark:text-zinc-200">{studentStats.totalStudents.toLocaleString()}</strong> nafar talaba
              </span>
            </div>
          </div>
        </header>

        {/* 4 Main Core Metrics Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Total Students */}
          <div className="glass-card relative overflow-hidden p-6 border-l-4 border-l-emerald-500">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Jami talabalar soni
              </span>
              <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                <Users size={20} />
              </div>
            </div>
            <p className="mt-4 text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100">
              {studentStats.totalStudents.toLocaleString()}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500">
              <CheckCircle2 size={13} className="text-emerald-500" />
              <span>Universitet to'liq kontingenti</span>
            </div>
          </div>

          {/* Girls Count */}
          <div className="glass-card relative overflow-hidden p-6 border-l-4 border-l-pink-500">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                Talaba qizlar
              </span>
              <div className="rounded-xl bg-pink-500/10 p-2 text-pink-600 dark:text-pink-400 font-bold text-xs">
                {girlsPercent}%
              </div>
            </div>
            <p className="mt-4 text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100">
              {studentStats.girls.toLocaleString()}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500">
              <span>Xotin-qiz talabalar ulushi</span>
            </div>
          </div>

          {/* Boys Count */}
          <div className="glass-card relative overflow-hidden p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Talaba yigitlar
              </span>
              <div className="rounded-xl bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400 font-bold text-xs">
                {boysPercent}%
              </div>
            </div>
            <p className="mt-4 text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100">
              {studentStats.boys.toLocaleString()}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500">
              <span>O'g'il bola talabalar ulushi</span>
            </div>
          </div>

          {/* Under 30 Years */}
          <div className="glass-card relative overflow-hidden p-6 border-l-4 border-l-amber-500">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                30 yoshgacha bo'lganlar
              </span>
              <div className="rounded-xl bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
                {under30Percent}%
              </div>
            </div>
            <p className="mt-4 text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100">
              {studentStats.under30.toLocaleString()}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500">
              <span>Yoshlar qatlami: 17,410 nafar</span>
            </div>
          </div>
        </section>

        {/* Gender & Age Progress Visualization */}
        <section className="glass-card p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-emerald-500" size={20} />
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Jinsiy va Yosh Ko'rsatkichlari Mutanosibligi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gender bar */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs font-bold text-pink-600 dark:text-pink-400">
                  Qizlar: {studentStats.girls.toLocaleString()} nafar ({girlsPercent}%)
                </span>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  O'g'il bolalar: {studentStats.boys.toLocaleString()} nafar ({boysPercent}%)
                </span>
              </div>
              <div className="h-4 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800 flex shadow-inner">
                <div style={{ width: `${girlsPercent}%` }} className="bg-gradient-to-r from-pink-500 to-rose-400 h-full transition-all duration-1000" />
                <div style={{ width: `${boysPercent}%` }} className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full transition-all duration-1000" />
              </div>
              <p className="mt-2 text-[11px] text-zinc-500 leading-relaxed">
                UrDU talabalarining 57.3 foizini qizlar tashkil etadi, bu esa respublika bo'yicha yuqori ko'rsatkichlardan biridir.
              </p>
            </div>

            {/* Age bar */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  30 yoshgacha: {studentStats.under30.toLocaleString()} nafar ({under30Percent}%)
                </span>
                <span className="text-xs font-bold text-zinc-500">
                  30 yoshdan yuqori: {studentStats.over30.toLocaleString()} nafar ({over30Percent}%)
                </span>
              </div>
              <div className="h-4 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800 flex shadow-inner">
                <div style={{ width: `${under30Percent}%` }} className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-1000" />
                <div style={{ width: `${over30Percent}%` }} className="bg-zinc-400 dark:bg-zinc-600 h-full transition-all duration-1000" />
              </div>
              <p className="mt-2 text-[11px] text-zinc-500 leading-relaxed">
                Talabalarning 91.1 foizi 30 yoshgacha bo'lgan yoshlar toifasiga to'g'ri keladi.
              </p>
            </div>
          </div>
        </section>

        {/* Education Forms and Degrees Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Ta'lim Shakllari */}
          <div className="glass-card p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <BookOpen className="text-emerald-500" size={18} />
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Ta'lim Shakllari Taqsimoti
                </h2>
              </div>
              <span className="text-xs text-zinc-400">Barcha shakllar</span>
            </div>

            <div className="space-y-4">
              {Object.entries(studentStats.educationForms || {}).map(([form, count]) => {
                const pct = ((count / total) * 100).toFixed(1)
                return (
                  <div key={form} className="rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/40 p-3.5">
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm">
                        {form} ta'lim shakli
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {count.toLocaleString()} nafar ({pct}%)
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div style={{ width: `${pct}%` }} className="h-full bg-emerald-500 rounded-full" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Degrees & Levels */}
          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <GraduationCap className="text-emerald-500" size={18} />
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Ta'lim Bosqichlari
                </h2>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Bakalavriat</span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      {((studentStats.degrees.Bakalavr / total) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mt-2">
                    {studentStats.degrees.Bakalavr?.toLocaleString()} nafar
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-1">Barcha yo'nalishlar bo'yicha</p>
                </div>

                <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Magistratura</span>
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
                      {((studentStats.degrees.Magistratura / total) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mt-2">
                    {studentStats.degrees.Magistratura?.toLocaleString()} nafar
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-1">Ilmiy-pedagogik magistrantlar</p>
                </div>
              </div>
            </div>

            {/* Courses summary */}
            <div className="mt-5 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80">
              <span className="text-xs font-semibold text-zinc-500 block mb-2">Kurslar bo'yicha:</span>
              <div className="grid grid-cols-5 gap-1.5 text-center">
                {Object.entries(studentStats.courses || {}).map(([course, count]) => (
                  <div key={course} className="rounded-lg bg-zinc-100 dark:bg-zinc-800/60 py-1.5 px-1">
                    <span className="text-[10px] text-zinc-400 block">{course.split('-')[0]}-k</span>
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Faculties Section */}
        <section className="glass-card p-6 sm:p-8 mb-8" id="fakultetlar">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="text-emerald-500" size={20} />
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  Fakultetlar Kesimida Talabalar Kontingenti
                </h2>
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                Universitetning barcha fakultetlari bo'yicha talabalar soni va umumiy ulushi
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
              <input
                type="text"
                value={facultySearch}
                onChange={(e) => setFacultySearch(e.target.value)}
                placeholder="Fakultet qidirish..."
                className="w-full rounded-full border border-zinc-200 bg-white py-2 pl-10 pr-4 text-xs text-zinc-900 outline-none focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 transition-colors shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {facultyEntries.map(([name, count], index) => {
              const pct = ((count / total) * 100).toFixed(1)
              return (
                <div
                  key={name}
                  className="rounded-2xl border border-zinc-200/80 bg-white/70 p-4 shadow-sm transition hover:shadow-md dark:border-zinc-800/90 dark:bg-zinc-900/60"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                        {index + 1}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                        {name}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-4 flex items-baseline justify-between">
                    <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                      {count.toLocaleString()}
                    </span>
                    <span className="text-xs font-semibold text-zinc-500">
                      {pct}% ulush
                    </span>
                  </div>

                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <div style={{ width: `${Math.min(100, pct * 4)}%` }} className="h-full bg-emerald-500 rounded-full" />
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Accommodation and Regional Analytics */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Residence Types */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <Home className="text-emerald-500" size={18} />
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Talabalar Turar Joyi Taqsimoti
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(studentStats.residenceTypes || {}).map(([type, count]) => (
                <div key={type} className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/40 p-4">
                  <p className="text-xs text-zinc-500">{type}</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                    {count.toLocaleString()} nafar
                  </p>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {((count / total) * 100).toFixed(1)}% talaba
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Regional distribution */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="text-emerald-500" size={18} />
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Hududlar Kesimida (Viloyatlar)
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
              {Object.entries(studentStats.regions || {})
                .sort((a, b) => b[1] - a[1])
                .map(([region, count]) => (
                  <div key={region} className="flex items-center justify-between rounded-xl bg-zinc-50 dark:bg-zinc-900/50 px-3.5 py-2.5">
                    <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate mr-2">
                      {region}
                    </span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 shrink-0">
                      {count.toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Upcoming Section: Talented Students & Certificates */}
        <section className="glass-card relative overflow-hidden p-6 sm:p-8 border-dashed border-2 border-emerald-500/40 bg-emerald-500/5 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
                <Award size={32} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    Iqtidorli Talabalar va Sertifikat Egalari Bazasi
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                    <Sparkles size={11} /> Tez kunda
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                  Xalqaro til sertifikatlari (IELTS, CEFR, TOEFL, JLPT), fan olimpiadalari g'oliblari, Davlat va nomdor stipendiatlar, startap va grant sohiblari to'g'risidagi mukammal ma'lumotlar keyingi bosqichda kiritiladi.
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                Rejalashtirilgan yangilanish
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-zinc-200/80 bg-white/80 p-4 text-center dark:border-zinc-800 dark:bg-zinc-900/60">
              <p className="text-xs font-semibold text-zinc-500">Xalqaro til sertifikatlari</p>
              <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-1">IELTS / CEFR / TOEFL</p>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Tez kunda qo'shiladi</span>
            </div>
            <div className="rounded-xl border border-zinc-200/80 bg-white/80 p-4 text-center dark:border-zinc-800 dark:bg-zinc-900/60">
              <p className="text-xs font-semibold text-zinc-500">Nomdor stipendiyalar</p>
              <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-1">Prezident, Beruniy, Navoiy</p>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Tez kunda qo'shiladi</span>
            </div>
            <div className="rounded-xl border border-zinc-200/80 bg-white/80 p-4 text-center dark:border-zinc-800 dark:bg-zinc-900/60">
              <p className="text-xs font-semibold text-zinc-500">Respublika va xalqaro tanlovlar</p>
              <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-1">Xakatonlar & Olimpiadalar</p>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Tez kunda qo'shiladi</span>
            </div>
          </div>
        </section>
      </div>

      <FooterSection showContactForm={false} />
    </div>
  )
}
