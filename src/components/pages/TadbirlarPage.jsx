import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  CalendarDays,
  Users,
  Award,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Trophy,
  Briefcase,
  Layers,
  Search,
  Printer,
  ArrowLeft,
  CheckCircle2,
  BarChart3,
  HeartHandshake,
  Flag,
  Share2,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react'
import tadbirlarStats from '../../data/tadbirlarStats.json'
import FooterSection from '../sections/FooterSection'

const iconMap = {
  Flag,
  ShieldCheck,
  BookOpen,
  Trophy,
  Briefcase,
  Sparkles,
}

const colorMap = {
  emerald: {
    bg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
    bar: 'bg-emerald-500',
    glow: 'from-emerald-500/15',
    pill: 'border-emerald-500/40 text-emerald-700 dark:text-emerald-400 bg-emerald-500/10',
  },
  blue: {
    bg: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
    bar: 'bg-blue-500',
    glow: 'from-blue-500/15',
    pill: 'border-blue-500/40 text-blue-700 dark:text-blue-400 bg-blue-500/10',
  },
  amber: {
    bg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
    bar: 'bg-amber-500',
    glow: 'from-amber-500/15',
    pill: 'border-amber-500/40 text-amber-700 dark:text-amber-400 bg-amber-500/10',
  },
  rose: {
    bg: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
    bar: 'bg-rose-500',
    glow: 'from-rose-500/15',
    pill: 'border-rose-500/40 text-rose-700 dark:text-rose-400 bg-rose-500/10',
  },
  purple: {
    bg: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20',
    bar: 'bg-purple-500',
    glow: 'from-purple-500/15',
    pill: 'border-purple-500/40 text-purple-700 dark:text-purple-400 bg-purple-500/10',
  },
  teal: {
    bg: 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20',
    bar: 'bg-teal-500',
    glow: 'from-teal-500/15',
    pill: 'border-teal-500/40 text-teal-700 dark:text-teal-400 bg-teal-500/10',
  },
}

export default function TadbirlarPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('barchasi') // barchasi, yonalishlar, loyihalar, besh-tashabbus, togaraklar
  const [copyToast, setCopyToast] = useState(false)

  const summary = tadbirlarStats.summary
  const mainDirections = tadbirlarStats.mainDirections
  const coordinatorProjects = tadbirlarStats.coordinatorProjects
  const fiveInitiatives = tadbirlarStats.fiveInitiatives
  const clubsAndSpecialUnits = tadbirlarStats.clubsAndSpecialUnits

  // Filtered main directions
  const filteredDirections = useMemo(() => {
    if (!searchQuery.trim()) return mainDirections
    const q = searchQuery.toLowerCase()
    return mainDirections.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
    )
  }, [searchQuery, mainDirections])

  // Filtered coordinator projects
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return coordinatorProjects
    const q = searchQuery.toLowerCase()
    return coordinatorProjects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.coordinator.toLowerCase().includes(q) ||
        p.highlight.toLowerCase().includes(q)
    )
  }, [searchQuery, coordinatorProjects])

  // Share link handler
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopyToast(true)
      setTimeout(() => setCopyToast(false), 2500)
    }
  }

  // Print handler
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation & Actions Top Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-4 py-2 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-100 hover:text-emerald-600 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-emerald-400"
          >
            <ArrowLeft size={14} />
            <span>Bosh sahifaga qaytish</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-zinc-700 shadow-sm hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:bg-zinc-800 transition"
              title="Havolani nusxalash"
            >
              <Share2 size={13} />
              <span>{copyToast ? 'Nusxalandi!' : 'Ulashish'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-zinc-700 shadow-sm hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:bg-zinc-800 transition"
              title="Chop etish yoki PDF sifatida saqlash"
            >
              <Printer size={13} />
              <span>Chop etish</span>
            </button>
          </div>
        </div>

        {/* Page Hero Header */}
        <header className="glass-card relative overflow-hidden p-6 sm:p-10 mb-8 border-l-4 border-l-blue-600 dark:border-l-blue-500">
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 mb-4">
                <CalendarDays size={14} />
                <span>Urganch davlat universiteti Yoshlar ittifoqi • Rasmiy faoliyat hisoboti</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
                O‘tkazilgan tadbirlar va <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">loyihalar statistikasi</span>
              </h1>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                Maʼnaviy-maʼrifiy yo‘nalishlar, intellektual musobaqalar, sport tadbirlari, 5 muhim tashabbus hamda to‘garaklar faoliyati bo‘yicha universitet miqyosida o‘tkazilgan barcha tadbirlarning to‘liq tahliliy hisoboti.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-bold text-blue-700 dark:text-blue-300 shadow-sm">
                <FileSpreadsheet size={16} />
                Hisobot davri: {tadbirlarStats.updatedAt}
              </span>
              <span className="text-[11px] text-zinc-400">
                Jami tadbirlar: <strong className="text-blue-600 dark:text-blue-400">{summary.totalEvents.toLocaleString()} ta</strong>
              </span>
            </div>
          </div>

          {/* 4 Primary Highlight Stat Cards */}
          <div className="relative z-10 mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/70 dark:bg-zinc-900/70 p-4 sm:p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Jami tadbirlar</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400">
                  <CalendarDays size={16} />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
                {summary.totalEvents.toLocaleString()} <span className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400">ta</span>
              </div>
              <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                Universitet va fakultet miqyosida
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/70 dark:bg-zinc-900/70 p-4 sm:p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Ishtirokchilar qamrovi</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <Users size={16} />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
                {summary.totalParticipants.toLocaleString()} <span className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">marta</span>
              </div>
              <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                Talaba-yoshlar ishtiroki umumiy soni
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/70 dark:bg-zinc-900/70 p-4 sm:p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Koordinatorlik loyihalari</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400">
                  <Award size={16} />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
                {summary.totalProjects.toLocaleString()} <span className="text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-400">ta</span>
              </div>
              <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                Yetakchilar tashabbusidagi loyihalar
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/70 dark:bg-zinc-900/70 p-4 sm:p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">To‘garak va klublar</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  <Sparkles size={16} />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
                {summary.totalClubs.toLocaleString()} <span className="text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-400">ta</span>
              </div>
              <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                49 ta fan, 27 ta sport, 59 ta ijodiy
              </p>
            </div>
          </div>
        </header>

        {/* Search & Navigation Tab Filter */}
        <div className="glass-card p-4 sm:p-5 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('barchasi')}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  activeTab === 'barchasi'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80 dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:bg-zinc-700'
                }`}
              >
                Barchasi ({summary.totalEvents.toLocaleString()})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('yonalishlar')}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  activeTab === 'yonalishlar'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80 dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:bg-zinc-700'
                }`}
              >
                Asosiy yo‘nalishlar (6 ta)
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('loyihalar')}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  activeTab === 'loyihalar'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80 dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:bg-zinc-700'
                }`}
              >
                Koordinatorlik loyihalari (207 ta)
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('besh-tashabbus')}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  activeTab === 'besh-tashabbus'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80 dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:bg-zinc-700'
                }`}
              >
                5 muhim tashabbus (16 492 talaba)
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('togaraklar')}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  activeTab === 'togaraklar'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80 dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:bg-zinc-700'
                }`}
              >
                To‘garaklar & Klublar (135 ta)
              </button>
            </div>

            {/* Quick Live Search Bar */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Yo‘nalish yoki loyihani qidirish..."
                className="w-full rounded-xl border border-zinc-200/80 bg-white/80 pl-9 pr-4 py-2 text-xs text-zinc-800 placeholder-zinc-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200"
              />
            </div>
          </div>
        </div>

        {/* SECTION 1: Asosiy yo‘nalishlar kesimi */}
        {(activeTab === 'barchasi' || activeTab === 'yonalishlar') && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">
                  Asosiy faoliyat yo‘nalishlari bo‘yicha o‘tkazilgan tadbirlar
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Urganch davlat universiteti Yoshlar ittifoqi tomonidan amalga oshirilgan 6 ta ustuvor yo‘nalish
                </p>
              </div>
              <span className="hidden sm:inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-700 dark:text-blue-300">
                6 ta asosiy yo‘nalish
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredDirections.map((dir) => {
                const colors = colorMap[dir.color] || colorMap.emerald
                const IconComponent = iconMap[dir.icon] || Sparkles
                const percent = ((dir.eventsCount / summary.totalEvents) * 100).toFixed(1)

                return (
                  <div
                    key={dir.key}
                    className="glass-card relative overflow-hidden p-5 sm:p-6 transition-all duration-300 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700 flex flex-col justify-between"
                  >
                    <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${colors.glow} to-transparent blur-2xl`} />

                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${colors.bg}`}>
                          <IconComponent size={20} />
                        </div>
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider border ${colors.pill}`}>
                          {percent}% ulush
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                        {dir.title}
                      </h3>

                      <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {dir.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-zinc-200/70 dark:border-zinc-800/70">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-zinc-500 dark:text-zinc-400">O‘tkazilgan tadbirlar soni:</span>
                        <strong className="text-sm font-black text-zinc-900 dark:text-zinc-100">
                          {dir.eventsCount.toLocaleString()} ta
                        </strong>
                      </div>

                      {/* Visual progress bar */}
                      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${colors.bar}`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 mt-2">
                        <span>Qamrab olingan talabalar:</span>
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                          ~{dir.participantsCount.toLocaleString()} nafar
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* SECTION 2: Koordinatorlar loyihalari */}
        {(activeTab === 'barchasi' || activeTab === 'loyihalar') && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">
                  Yetakchi va koordinatorlar tomonidan o‘tkazilgan loyihalar (207 ta)
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Har bir yo‘nalish koordinatori boshchiligida talabalar o‘rtasida amalga oshirilgan loyihalar soni
                </p>
              </div>
              <span className="hidden sm:inline-flex rounded-full bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-700 dark:text-purple-300">
                207 ta loyiha
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredProjects.map((proj, idx) => (
                <div
                  key={idx}
                  className="glass-card p-5 sm:p-6 transition hover:border-zinc-300 dark:hover:border-zinc-700 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-black">
                        #{idx + 1}
                      </span>
                      <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-[10px] font-bold text-zinc-600 dark:text-zinc-300">
                        {proj.coordinator}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {proj.title}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      {proj.highlight}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-zinc-200/70 dark:border-zinc-800/70 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-zinc-400 block">Amalga oshirilgan loyihalar:</span>
                      <strong className="text-lg font-black text-purple-600 dark:text-purple-400">
                        {proj.projectsCount} ta loyiha
                      </strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-zinc-400 block">Qamrov:</span>
                      <span className="text-xs font-bold text-zinc-700 dark:text-zinc-200">
                        ~{proj.participantsCount.toLocaleString()} nafar
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: 5 muhim tashabbus ijrosi */}
        {(activeTab === 'barchasi' || activeTab === 'besh-tashabbus') && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">
                  5 muhim tashabbus bo‘yicha talabalar qamrovi (16 492 nafar)
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Prezidentimiz tomonidan ilgari surilgan 5 muhim tashabbus doirasida qamrab olingan talabalar
                </p>
              </div>
              <span className="hidden sm:inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                16 492 nafar talaba
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
              {fiveInitiatives.map((item) => (
                <div
                  key={item.number}
                  className="glass-card p-4 sm:p-5 text-center flex flex-col justify-between transition hover:border-zinc-300 dark:hover:border-zinc-700"
                >
                  <div>
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-black text-sm mb-3">
                      {item.number}
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-200/70 dark:border-zinc-800/70">
                    <span className="text-[10px] text-zinc-400 block uppercase font-bold tracking-wider">Qamrov</span>
                    <strong className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                      {item.count.toLocaleString()} <span className="text-xs font-semibold">nafar</span>
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: To‘garaklar va klublar */}
        {(activeTab === 'barchasi' || activeTab === 'togaraklar') && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">
                  To‘garaklar, jamoat guruhlari va ixtisoslashgan klublar (135 ta)
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  49 ta fan to‘garagi, 27 ta sport seksiyasi, 59 ta ijodiy va jamoatchilik to‘garaklari
                </p>
              </div>
              <span className="hidden sm:inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-700 dark:text-amber-300">
                135 ta to‘garak
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {clubsAndSpecialUnits.map((club, idx) => (
                <div
                  key={idx}
                  className="glass-card p-4 sm:p-5 flex items-center justify-between gap-4 transition hover:border-zinc-300 dark:hover:border-zinc-700"
                >
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {club.name}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {club.details}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="inline-block rounded-xl bg-amber-500/15 px-3 py-1 text-xs font-black text-amber-700 dark:text-amber-300">
                      {club.members}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 5: Link to General Student Stats */}
        <div className="glass-card p-6 sm:p-8 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-transparent border-emerald-500/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-2">
              <Users size={14} />
              <span>Talabalar kontingenti</span>
            </div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
              Talabalar kontingenti va fakultetlar statistikasini ko‘rish
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1">
              Universitetdagi 29 970 nafar talaba bo‘yicha jins, taʼlim shakli, fakultetlar va «Yoshlar daftari» kesimidagi to‘liq tahlil.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/statistika"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#0d613d] hover:bg-[#09472c] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:scale-105"
            >
              <BarChart3 size={16} />
              <span>Talabalar statistikasiga o‘tish</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <FooterSection showContactForm={false} />
      </div>
    </div>
  )
}
