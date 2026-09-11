import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  ArrowLeft,
  ExternalLink,
  Globe2,
  MapPin,
  Search,
  Sparkles,
  CheckCircle2,
  Award,
  GraduationCap,
  BookOpen,
  Info,
  Calendar,
  Send,
  Building2,
} from 'lucide-react'
import { partnerUniversities, profile, socialLinks } from '../../data/siteData'
import FooterSection from '../sections/FooterSection'

export default function PartnershipsPage() {
  const [activeRegion, setActiveRegion] = useState('Barchasi')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const regions = ['Barchasi', 'Yevropa', 'Turkiya', 'Osiyo', 'MDH']

  const filteredUnis = partnerUniversities.filter((uni) => {
    const matchesRegion = activeRegion === 'Barchasi' || uni.region === activeRegion
    const matchesQuery =
      searchQuery.trim() === '' ||
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.originalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.facultyFocus.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesRegion && matchesQuery
  })

  return (
    <div className="min-h-screen bg-[#F5F0E8] dark:bg-[#07090d] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-zinc-200/80 bg-white/70 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/70 sticky top-0 z-40">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 py-3 sm:px-7">
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <Link
              to="/"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium"
            >
              <ArrowLeft size={14} />
              Bosh sahifa
            </Link>
            <span>/</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">Xalqaro Hamkorlik</span>
          </div>

          <Link
            to="/#stats"
            className="inline-flex items-center gap-1.5 rounded-full bg-zinc-200/80 px-3.5 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            <ArrowLeft size={13} />
            Ortga qaytish
          </Link>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-7 lg:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="pointer-events-none absolute -left-[15%] -top-[15%] h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[120px] dark:bg-emerald-500/15" />
        <div className="pointer-events-none absolute -right-[15%] top-[20%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px] dark:bg-cyan-500/15" />

        <div className="mx-auto max-w-[1320px] text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
            <Globe2 size={15} />
            UrDU Global Aloqalar Tizimi
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-zinc-100">
            Xorijiy Hamkor Universitetlar va{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400">
              Talabalar Grantlari
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
            Urganch davlat universiteti dunyoning 30 dan ortiq yetakchi oliygohlari bilan strategik hamkorlik aloqalarini yo‘lga qo‘ygan. Talabalarimiz Yevropa, Osiyo va MDH mamlakatlarida bepul o‘qish, xalqaro stajirovka va oylik 800€–1000€ miqdoridagi stipendiyalarga ega bo‘lishlari mumkin.
          </p>

          {/* Quick Stat Counter Cards */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 backdrop-blur-sm">
              <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">30+</p>
              <p className="mt-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Hamkor OTMlar</p>
            </div>
            <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 backdrop-blur-sm">
              <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">15+</p>
              <p className="mt-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Erasmus+ & DAAD Grantlari</p>
            </div>
            <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 backdrop-blur-sm">
              <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">850€</p>
              <p className="mt-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">O‘rtacha Oylik Stipendiya</p>
            </div>
            <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 backdrop-blur-sm">
              <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">12 ta</p>
              <p className="mt-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Hamkor Davlatlar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-[1320px] px-4 py-12 sm:px-7">
        {/* Search and Filters Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200/80 pb-6 dark:border-zinc-800">
          {/* Region Tabs */}
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setActiveRegion(region)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeRegion === region
                    ? 'bg-emerald-600 text-white shadow-md dark:bg-emerald-500 dark:text-zinc-950'
                    : 'bg-white/80 text-zinc-700 hover:bg-white dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Universitet, shahar yoki fan nomi..."
              className="w-full rounded-full border border-zinc-200 bg-white/90 py-2.5 pl-10 pr-4 text-xs text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-100 dark:placeholder-zinc-500 shadow-sm"
            />
          </div>
        </div>

        {/* University Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUnis.length > 0 ? (
            filteredUnis.map((uni) => (
              <div
                key={uni.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200/80 bg-white/95 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/60 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/70"
              >
                <div>
                  {/* Top: Flag + Country + Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl" role="img" aria-label={uni.country}>
                        {uni.flag}
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                          {uni.country}
                        </p>
                        <p className="flex items-center gap-1 text-[11px] text-zinc-500">
                          <MapPin size={11} className="text-emerald-500" />
                          {uni.city}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                      {uni.badge}
                    </span>
                  </div>

                  {/* Title & Original Name */}
                  <h3 className="mt-4 text-lg font-bold text-zinc-900 transition-colors group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                    {uni.name}
                  </h3>
                  <p className="text-xs italic text-zinc-400 dark:text-zinc-500">
                    {uni.originalName}
                  </p>

                  {/* Description */}
                  <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {uni.description}
                  </p>

                  {/* Programs Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {uni.programs.map((prog) => (
                      <span
                        key={prog}
                        className="rounded-lg bg-zinc-100 px-2.5 py-1 text-[10px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60"
                      >
                        {prog}
                      </span>
                    ))}
                  </div>

                  {/* Grant Benefits Box */}
                  <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-zinc-700 dark:bg-emerald-950/20 dark:text-zinc-300">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">Grant imtiyozi: </span>
                    {uni.grantDetails}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-[170px]">
                    Yo‘nalish: {uni.facultyFocus.split(',')[0]}
                  </span>
                  <a
                    href={uni.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                  >
                    Rasmiy sayt
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-zinc-500">
              Qidiruvingiz bo‘yicha universitet topilmadi.
            </div>
          )}
        </div>

        {/* How to Apply Section */}
        <section className="mt-16 rounded-3xl border border-zinc-200/80 bg-white/90 p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
              <Info size={13} />
              Qabul Tartibi
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-100">
              Xalqaro almashinuv dasturlarida qanday ishtirok etish mumkin?
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              UrDU talabalari xalqaro grantlarda qatnashishi uchun quyidagi 4 bosqichli saralashdan o‘tadilar:
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-zinc-200/80 bg-[#FAF6F0] p-5 dark:border-zinc-800 dark:bg-zinc-950/60">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-zinc-950 font-bold text-sm">
                01
              </div>
              <h3 className="mt-4 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Til Bilish Talabi
              </h3>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Ingliz tilidan kamida IELTS 6.0 yoki CEFR B2 daraja sertifikatiga ega bo‘lish.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 bg-[#FAF6F0] p-5 dark:border-zinc-800 dark:bg-zinc-950/60">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-zinc-950 font-bold text-sm">
                02
              </div>
              <h3 className="mt-4 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Akademik O‘zlashtirish
              </h3>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Oxirgi 2 semestr bo‘yicha GPA ko‘rsatkichi kamida 4.0 (yoki 80%+ aʼlo baholar) bo‘lishi lozim.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 bg-[#FAF6F0] p-5 dark:border-zinc-800 dark:bg-zinc-950/60">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-zinc-950 font-bold text-sm">
                03
              </div>
              <h3 className="mt-4 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Ijtimoiy Faollik
              </h3>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Yoshlar Ittifoqi tadbirlari, ilmiy to‘garaklar yoki volontyorlikdagi faollik tavsiyanomasi.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 bg-[#FAF6F0] p-5 dark:border-zinc-800 dark:bg-zinc-950/60">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-zinc-950 font-bold text-sm">
                04
              </div>
              <h3 className="mt-4 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Suhbat va Qabul
              </h3>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Xorijiy universitet vakillari bilan onlayn suhbatdan muvaffaqiyatli o‘tib, grant vaucherini olish.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200/80 pt-6 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
              <Building2 size={16} className="text-emerald-500 shrink-0" />
              <span>
                Qo‘shimcha savollar: <strong>UrDU Xalqaro Aloqalar Bo‘limi (Bosh bino, 214-xona)</strong>
              </span>
            </div>

            <a
              href={socialLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-xs font-bold text-zinc-950 transition hover:bg-emerald-400 shadow-md"
            >
              <Send size={14} />
              Telegram orqali murojaat
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <FooterSection />
    </div>
  )
}
