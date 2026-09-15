import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  X,
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
  UserCheck
} from 'lucide-react'
import studentStats from '../../data/studentStats.json'

export default function StudentStatsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('umumiy')
  const [facultySearch, setFacultySearch] = useState('')

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const total = studentStats.totalStudents
  const girlsPercent = ((studentStats.girls / total) * 100).toFixed(1)
  const boysPercent = ((studentStats.boys / total) * 100).toFixed(1)
  const under30Percent = ((studentStats.under30 / total) * 100).toFixed(1)

  const facultyEntries = Object.entries(studentStats.faculties || {})
    .filter(([name]) => name.toLowerCase().includes(facultySearch.toLowerCase()))
    .sort((a, b) => b[1] - a[1])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-5 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-zinc-800/90 dark:bg-zinc-950/95"
          >
            {/* Header */}
            <div className="relative border-b border-zinc-200/80 px-6 py-5 dark:border-zinc-800/80">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <PieChart size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl">
                        Talabalar Kontingenti Statistikasi
                      </h3>
                      <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 size={12} /> Rasmiy ma'lumot
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                      <FileSpreadsheet size={13} className="text-emerald-500" />
                      UrDU talabalar kontingenti bazasi ({studentStats.updatedAt})
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-zinc-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="mt-5 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'umumiy', label: 'Umumiy tahlil' },
                  { id: 'fakultet', label: 'Fakultetlar kesimida' },
                  { id: 'talim', label: 'Ta\'lim shakllari & Kurslar' },
                  { id: 'hudud', label: 'Hududlar & Turar joy' },
                  { id: 'iqtidorli', label: 'Iqtidorli & Sertifikatlar' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                      activeTab === tab.id
                        ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 space-y-6">
              {activeTab === 'umumiy' && (
                <>
                  {/* Big Summary Cards */}
                  <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
                    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Jami talabalar</span>
                        <Users size={16} className="text-emerald-500" />
                      </div>
                      <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                        {studentStats.totalStudents.toLocaleString()}
                      </p>
                      <span className="mt-1 block text-[11px] text-zinc-500">100% kontingent</span>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl border border-pink-500/30 bg-pink-500/5 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-pink-600 dark:text-pink-400">Qizlar soni</span>
                        <span className="text-xs font-bold text-pink-500">{girlsPercent}%</span>
                      </div>
                      <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                        {studentStats.girls.toLocaleString()}
                      </p>
                      <span className="mt-1 block text-[11px] text-zinc-500">Talaba xotin-qizlar</span>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-blue-500/5 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">O'g'il bolalar</span>
                        <span className="text-xs font-bold text-blue-500">{boysPercent}%</span>
                      </div>
                      <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                        {studentStats.boys.toLocaleString()}
                      </p>
                      <span className="mt-1 block text-[11px] text-zinc-500">Talaba yigitlar</span>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">30 yoshgacha</span>
                        <span className="text-xs font-bold text-amber-500">{under30Percent}%</span>
                      </div>
                      <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                        {studentStats.under30.toLocaleString()}
                      </p>
                      <span className="mt-1 block text-[11px] text-zinc-500">Yoshlar qatlami</span>
                    </div>
                  </div>

                  {/* Gender and Age Visual Bar */}
                  <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900/60 p-5 space-y-4">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                      <TrendingUp size={16} className="text-emerald-500" />
                      Jinsiy va yosh bo'yicha mutanosiblik
                    </h4>

                    <div>
                      <div className="flex justify-between text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                        <span className="text-pink-600 dark:text-pink-400 font-semibold">Qizlar: {studentStats.girls.toLocaleString()} ({girlsPercent}%)</span>
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">O'g'il bolalar: {studentStats.boys.toLocaleString()} ({boysPercent}%)</span>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800 flex">
                        <div style={{ width: `${girlsPercent}%` }} className="bg-gradient-to-r from-pink-500 to-rose-400 h-full" />
                        <div style={{ width: `${boysPercent}%` }} className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">30 yoshgacha bo'lganlar: {studentStats.under30.toLocaleString()} ({under30Percent}%)</span>
                        <span className="text-zinc-500 font-semibold">30 yoshdan kattalar: {studentStats.over30.toLocaleString()} ({(100 - under30Percent).toFixed(1)}%)</span>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800 flex">
                        <div style={{ width: `${under30Percent}%` }} className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full" />
                        <div style={{ width: `${(100 - under30Percent).toFixed(1)}%` }} className="bg-zinc-400 dark:bg-zinc-600 h-full" />
                      </div>
                    </div>
                  </div>

                  {/* Degree & Education Key Points */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900/60 p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-1.5">
                        <GraduationCap size={15} className="text-emerald-500" />
                        Ta'lim bosqichi
                      </h4>
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between rounded-xl bg-zinc-50 dark:bg-zinc-800/50 p-3">
                          <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Bakalavriat</span>
                          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                            {studentStats.degrees.Bakalavr?.toLocaleString()} nafar
                          </span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl bg-zinc-50 dark:bg-zinc-800/50 p-3">
                          <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Magistratura</span>
                          <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                            {studentStats.degrees.Magistratura?.toLocaleString()} nafar
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900/60 p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-1.5">
                        <BookOpen size={15} className="text-emerald-500" />
                        Ta'lim shakli bo'yicha
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 p-2.5">
                          <p className="text-xs text-zinc-500">Kunduzgi</p>
                          <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                            {studentStats.educationForms.Kunduzgi?.toLocaleString()}
                          </p>
                        </div>
                        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 p-2.5">
                          <p className="text-xs text-zinc-500">Sirtqi</p>
                          <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                            {studentStats.educationForms.Sirtqi?.toLocaleString()}
                          </p>
                        </div>
                        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 p-2.5">
                          <p className="text-xs text-zinc-500">Masofaviy</p>
                          <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                            {studentStats.educationForms.Masofaviy?.toLocaleString()}
                          </p>
                        </div>
                        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 p-2.5">
                          <p className="text-xs text-zinc-500">Kechki</p>
                          <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                            {studentStats.educationForms.Kechki?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'fakultet' && (
                <div className="space-y-4">
                  {/* Search bar */}
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                    <input
                      type="text"
                      value={facultySearch}
                      onChange={(e) => setFacultySearch(e.target.value)}
                      placeholder="Fakultet nomi bo'yicha qidirish..."
                      className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-xs text-zinc-900 outline-none focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {facultyEntries.map(([name, count]) => {
                      const percent = ((count / total) * 100).toFixed(1)
                      return (
                        <div
                          key={name}
                          className="rounded-xl border border-zinc-200/70 bg-white p-3.5 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/70"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-snug">
                              {name}
                            </span>
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                              {count.toLocaleString()}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                              <div style={{ width: `${Math.min(100, percent * 3.5)}%` }} className="h-full bg-emerald-500 rounded-full" />
                            </div>
                            <span className="text-[10px] text-zinc-400">{percent}%</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'talim' && (
                <div className="space-y-6">
                  {/* Ta'lim shakllari */}
                  <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                      <BookOpen size={16} className="text-emerald-500" />
                      Ta'lim Shakllari Taqsimoti
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(studentStats.educationForms || {}).map(([form, count]) => {
                        const pct = ((count / total) * 100).toFixed(1)
                        return (
                          <div key={form}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="font-medium text-zinc-700 dark:text-zinc-300">{form} ta'lim</span>
                              <span className="font-bold text-zinc-900 dark:text-zinc-100">{count.toLocaleString()} nafar ({pct}%)</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                              <div style={{ width: `${pct}%` }} className="h-full bg-emerald-500 rounded-full" />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Kurslar kesimida */}
                  <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                      <GraduationCap size={16} className="text-emerald-500" />
                      Kurslar Kesimida Talabalar
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {Object.entries(studentStats.courses || {}).map(([course, count]) => (
                        <div key={course} className="rounded-xl border border-zinc-200/80 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/40 p-3 text-center">
                          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{course}</p>
                          <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-zinc-100">{count.toLocaleString()}</p>
                          <p className="text-[10px] text-zinc-400 mt-0.5">{((count / total) * 100).toFixed(1)}%</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'hudud' && (
                <div className="space-y-6">
                  {/* Turar joy */}
                  <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                      <Home size={16} className="text-emerald-500" />
                      Turar Joy Turi Bo'yicha Taqsimot
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {Object.entries(studentStats.residenceTypes || {}).map(([type, count]) => (
                        <div key={type} className="rounded-xl border border-zinc-200/80 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/40 p-3.5">
                          <p className="text-xs font-medium text-zinc-500">{type}</p>
                          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-1">{count.toLocaleString()} nafar</p>
                          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">{((count / total) * 100).toFixed(1)}%</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hududlar */}
                  <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                      <MapPin size={16} className="text-emerald-500" />
                      Hududlar (Viloyatlar) Kesimida
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {Object.entries(studentStats.regions || {})
                        .sort((a, b) => b[1] - a[1])
                        .map(([region, count]) => (
                          <div key={region} className="flex items-center justify-between rounded-xl bg-zinc-50 dark:bg-zinc-800/40 px-3.5 py-2">
                            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{region}</span>
                            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{count.toLocaleString()} nafar</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'iqtidorli' && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-dashed border-emerald-500/40 bg-emerald-500/5 p-6 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-3">
                      <Award size={28} />
                    </div>
                    <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      Iqtidorli Talabalar va Sertifikat Egalari Bazasi
                    </h4>
                    <p className="mt-1.5 max-w-md mx-auto text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      Xalqaro til sertifikatlari (IELTS, CEFR, TOEFL), fan olimpiadalari g'oliblari, Davlat stipendiatlari hamda startap g'oliblari to'g'risidagi ma'lumotlar yaqin orada tizimga to'liq integratsiya qilinadi.
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                      <Sparkles size={14} /> Keyingi bosqichda kiritiladi
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="rounded-xl border border-zinc-200/80 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900/60 opacity-80">
                      <p className="text-xs text-zinc-400">Xalqaro til sertifikatlari</p>
                      <p className="text-xl font-extrabold text-zinc-700 dark:text-zinc-300 mt-1">Tez kunda</p>
                      <span className="text-[10px] text-zinc-400">IELTS, CEFR, JLPT, HSK</span>
                    </div>
                    <div className="rounded-xl border border-zinc-200/80 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900/60 opacity-80">
                      <p className="text-xs text-zinc-400">Nomdor stipendiatlar</p>
                      <p className="text-xl font-extrabold text-zinc-700 dark:text-zinc-300 mt-1">Tez kunda</p>
                      <span className="text-[10px] text-zinc-400">Navoiy, Beruniy, Prezident</span>
                    </div>
                    <div className="rounded-xl border border-zinc-200/80 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900/60 opacity-80">
                      <p className="text-xs text-zinc-400">Respublika va xalqaro tanlovlar</p>
                      <p className="text-xl font-extrabold text-zinc-700 dark:text-zinc-300 mt-1">Tez kunda</p>
                      <span className="text-[10px] text-zinc-400">Olimpiada va xakatonlar</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-zinc-200/80 bg-zinc-50/70 px-6 py-4 dark:border-zinc-800/80 dark:bg-zinc-900/50 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] text-zinc-500 flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-500" />
                Urganch Davlat Universiteti Yoshlar Ittifoqi boshlang'ich tashkiloti
              </span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-zinc-900 px-5 py-2 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
              >
                Yopish
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
