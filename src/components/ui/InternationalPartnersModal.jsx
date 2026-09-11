import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  X,
  Globe2,
  Search,
  ExternalLink,
  GraduationCap,
  Sparkles,
  MapPin,
  CheckCircle2,
  Award,
  BookOpen,
  Info,
} from 'lucide-react'
import { partnerUniversities } from '../../data/siteData'

export default function InternationalPartnersModal({ isOpen, onClose }) {
  const [activeRegion, setActiveRegion] = useState('Barchasi')
  const [searchQuery, setSearchQuery] = useState('')

  // Close on ESC
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

  const regions = ['Barchasi', 'Yevropa', 'Turkiya', 'Osiyo', 'MDH']

  const filteredUnis = partnerUniversities.filter((uni) => {
    const matchesRegion = activeRegion === 'Barchasi' || uni.region === activeRegion
    const matchesQuery =
      searchQuery.trim() === '' ||
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.originalName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesRegion && matchesQuery
  })

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-5 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-[#FAF6F0] shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
          >
            {/* Modal Header */}
            <div className="relative border-b border-zinc-200/80 bg-white/70 px-6 py-5 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/60 sm:px-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                    <Globe2 size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                        UrDU Xalqaro Hamkorlik
                      </span>
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
                        {partnerUniversities.length}+ Universitet
                      </span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
                      Xorijiy Hamkor Universitetlar va Grantlar
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full p-2 text-zinc-400 hover:bg-zinc-200/60 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors"
                  aria-label="Yopish"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search & Region Filter Bar */}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Search */}
                <div className="relative w-full sm:max-w-xs">
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Universitet yoki davlat nomi..."
                    className="w-full rounded-full border border-zinc-200 bg-white/90 py-2 pl-9 pr-4 text-xs text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-100 dark:placeholder-zinc-500"
                  />
                </div>

                {/* Region Tabs */}
                <div className="flex flex-wrap gap-1.5">
                  {regions.map((region) => (
                    <button
                      key={region}
                      type="button"
                      onClick={() => setActiveRegion(region)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                        activeRegion === region
                          ? 'bg-emerald-600 text-white shadow-sm dark:bg-emerald-500 dark:text-zinc-950'
                          : 'bg-zinc-200/70 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* Opportunities Banner */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 sm:p-5 dark:bg-emerald-950/20">
                <div className="flex items-start gap-3">
                  <Sparkles size={20} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                      Talabalar uchun nimalar mavjud?
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                      Har bir UrDU talabasi 2-kursdan boshlab Erasmus+, DAAD yoki Mevlana dasturlari orqali xorijda 1 semestr bepul o‘qish, oylik 800€–1000€ stipendiya olish hamda ikki tomonlama diplom (Double Degree) dasturlariga ariza topshirish huquqiga ega.
                    </p>
                  </div>
                </div>
              </div>

              {/* University Cards Grid */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {filteredUnis.length > 0 ? (
                  filteredUnis.map((uni) => (
                    <div
                      key={uni.id}
                      className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white/95 p-5 shadow-sm transition-all hover:border-emerald-500/50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/70"
                    >
                      <div>
                        {/* Top: Flag + Country + Badge */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl" role="img" aria-label={uni.country}>
                              {uni.flag}
                            </span>
                            <div>
                              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                                {uni.country}
                              </p>
                              <p className="flex items-center gap-1 text-[10px] text-zinc-500">
                                <MapPin size={10} />
                                {uni.city}
                              </p>
                            </div>
                          </div>

                          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
                            {uni.badge}
                          </span>
                        </div>

                        {/* Uni Name */}
                        <h3 className="mt-3 text-base font-bold text-zinc-900 transition-colors group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                          {uni.name}
                        </h3>
                        <p className="text-[11px] italic text-zinc-400 dark:text-zinc-500">
                          {uni.originalName}
                        </p>

                        {/* Description */}
                        <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                          {uni.description}
                        </p>

                        {/* Programs Tags */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {uni.programs.map((prog) => (
                            <span
                              key={prog}
                              className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                            >
                              {prog}
                            </span>
                          ))}
                        </div>

                        {/* Grant Details */}
                        <div className="mt-3 rounded-xl border border-zinc-100 bg-[#F7F2EA] p-2.5 text-[11px] text-zinc-700 dark:border-zinc-800/80 dark:bg-zinc-950/50 dark:text-zinc-300">
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">Grant imtiyozi: </span>
                          {uni.grantDetails}
                        </div>
                      </div>

                      {/* Bottom Link */}
                      <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
                        <span className="text-[10px] text-zinc-400">Fokus: {uni.facultyFocus.split(',')[0]}</span>
                        <a
                          href={uni.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                        >
                          Rasmiy sayt
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-zinc-500">
                    Qidiruvingiz bo‘yicha universitet topilmadi.
                  </div>
                )}
              </div>

              {/* Requirement Section */}
              <div className="rounded-2xl border border-zinc-200/80 bg-white/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                <h4 className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  <Info size={16} className="text-emerald-500" />
                  Almashinuv dasturlariga qabul talablari
                </h4>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3 text-xs text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span>IELTS 6.0+ yoki CEFR B2 daraja</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span>GPA ko‘rsatkichi 4.0 va undan yuqori</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span>Yoshlar Ittifoqi faoli tavsiyanomasi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-zinc-200/80 bg-white/70 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/60 sm:px-8">
              <span className="text-xs text-zinc-500">
                Batafsil maʼlumot uchun: UrDU Xalqaro aloqalar bo‘limi (Bosh bino, 214-xona)
              </span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-zinc-900 px-5 py-2 text-xs font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
              >
                Tushunarli
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
