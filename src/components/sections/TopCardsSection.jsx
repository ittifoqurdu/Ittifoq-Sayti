import { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Calendar,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Globe2,
  GraduationCap,
  Instagram,
  Mail,
  MapPin,
  Newspaper,
  Phone,
  Send,
  Sparkles,
  Users,
} from 'lucide-react'
import { fadeUp } from '../../lib/animations'
import { profile, socialLinks, universityStats } from '../../data/siteData'
import { useNews } from '../../context/NewsContext'
import { formatNewsDate, getCategoryFallbackImage } from '../../lib/utils'
import { Globe } from '../ui/globe'
import InternationalPartnersModal from '../ui/InternationalPartnersModal'
import NewsDetailModal from '../ui/NewsDetailModal'

const MotionSection = motion.section
const EMAIL = profile.email

function TopCardsSection() {
  const { newsList } = useNews()
  const newsEvents = newsList && newsList.length > 0 ? newsList : []
  const [copyToast, setCopyToast] = useState('')
  const [now, setNow] = useState(() => new Date())
  const [isPartnersModalOpen, setIsPartnersModalOpen] = useState(false)
  const [selectedNewsItem, setSelectedNewsItem] = useState(null)
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false)
  const [activeNewsIndex, setActiveNewsIndex] = useState(0)
  const [isNewsPaused, setIsNewsPaused] = useState(false)
  const currentNews = newsEvents[activeNewsIndex] || newsEvents[0] || {}

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (isNewsPaused || isNewsModalOpen || newsEvents.length === 0) return undefined
    const timer = window.setInterval(() => {
      setActiveNewsIndex((prev) => (prev + 1) % (newsEvents.length || 1))
    }, 4500)
    return () => window.clearInterval(timer)
  }, [isNewsPaused, isNewsModalOpen, newsEvents.length])

  useEffect(() => {
    if (!copyToast) return undefined
    const toastTimer = window.setTimeout(() => setCopyToast(''), 2200)
    return () => window.clearTimeout(toastTimer)
  }, [copyToast])

  const copyEmail = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(EMAIL)
      }
      setCopyToast('Email nusxalandi!')
    } catch {
      setCopyToast('Nusxalashda xatolik yuz berdi')
    }
  }, [])

  return (
    <MotionSection
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="relative mx-auto flex w-full max-w-[1320px] flex-col justify-center px-4 py-16 md:px-7 lg:py-24"
      id="stats"
    >
      {/* 3-Column Top Grid */}
      <div className="grid gap-5 xl:grid-cols-[1fr_1.35fr_1fr]">
        {/* Card 1: UrDU Identity & Emblem */}
        <article className="glass-card flex flex-col items-center py-8 text-center">
          <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-2 border-emerald-500/40 bg-white dark:bg-zinc-950 p-2 shadow-md">
            <img
              src="/img/logo2.png"
              alt="Urganch Davlat Universiteti"
              className="h-full w-full object-contain filter drop-shadow"
              loading="eager"
            />
          </div>
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100">
            {profile.university}
          </h2>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 font-semibold">
            Tashkil topgan yili: {profile.foundedYear}
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-zinc-500">
            {profile.city.toUpperCase()}, O‘ZBEKISTON | {new Intl.DateTimeFormat('uz-UZ', { hour: '2-digit', minute: '2-digit', hour12: false }).format(now)}
          </p>

          <div className="mt-6 w-full border-t border-zinc-200/80 dark:border-zinc-800/80 pt-5">
            <div className="flex justify-center gap-4 text-zinc-500 dark:text-zinc-400">
              <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" aria-label="Telegram">
                <Send size={15} />
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" aria-label="Instagram">
                <Instagram size={15} />
              </a>
              <a href={socialLinks.email} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" aria-label="Email">
                <Mail size={15} />
              </a>
              <a href={socialLinks.phone} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" aria-label="Phone">
                <Phone size={15} />
              </a>
            </div>
            <p className="mt-4 text-[12px] font-semibold tracking-[0.14em] text-zinc-700 dark:text-zinc-300">
              {profile.address}
            </p>
          </div>
        </article>

        {/* Card 2: Strategic Pillars & Youth Mission */}
        <article className="glass-card relative overflow-hidden py-7">
          <div className="pointer-events-none absolute -left-1/2 -top-1/2 h-[200%] w-[200%] hidden dark:block bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.06)_0%,transparent_50%)]" />
          <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">
              <Sparkles size={11} />
              Yoshlar Harakati
            </span>
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">UrDU • 2026</p>
          </div>
          <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Iqtidor, Ilm va <span className="text-emerald-600 dark:text-emerald-400">Tashabbus</span>
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Universitetimiz talabalarining intellektual salohiyatini oshirish, ilm-fan olimpiadalari, respublika xakatonlari va ijtimoiy loyihalarda g‘oliblik sari yetaklaymiz.
          </p>

          {/* Mini Stats Bar */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {universityStats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-zinc-200/80 bg-white/80 dark:border-zinc-800/80 dark:bg-zinc-950/60 p-3 text-center shadow-sm">
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-300">{item.value}</p>
                <p className="mt-0.5 text-[10px] text-zinc-600 dark:text-zinc-400 leading-snug">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {['12 ta Fakultet', 'Zakovat Ligasi', 'Oltin Qanot', 'IT Inkubator', 'Talabalar Bahori'].map((tag) => (
              <span key={tag} className="rounded-full border border-zinc-200/80 bg-white/80 dark:border-zinc-800 dark:bg-zinc-900/80 px-3 py-1 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </article>

        {/* Card 3: Contact & Join Funnel */}
        <article className="glass-card relative flex flex-col py-7">
          <div className="mb-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold uppercase tracking-wider">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Doimiy Muloqot
            </span>
            <span className="text-xs text-zinc-500">Qabul 24/7</span>
          </div>

          <h3 className="text-xl font-bold leading-snug tracking-tight text-zinc-900 dark:text-zinc-100">
            Savol yoki taklifingiz
            <br />
            <span className="text-emerald-600 dark:text-emerald-400">bormi?</span>
          </h3>
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
            Biz har bir talabaning fikri va tashabbusiga ochiqmiz.
          </p>

          <div className="my-4 h-px bg-zinc-200/80 dark:bg-zinc-800" />

          <button
            type="button"
            onClick={copyEmail}
            className="cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 transition hover:text-emerald-600 dark:hover:text-emerald-300 break-all">{EMAIL}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">Emailni nusxalash</p>
          </button>

          <a
            href={socialLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 font-bold"
          >
            <Send size={13} />
            Telegramda yozish
          </a>
        </article>
      </div>

      {/* 2-Column Bottom Grid: Globe & UrDU Youth News Slider */}
      <div className="relative mt-8 grid gap-6 lg:grid-cols-2 items-stretch">
        {/* Globe Card: International Partnerships */}
        <article className="glass-card relative min-h-[420px] overflow-hidden flex flex-col justify-between p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-1/4 -top-1/4 h-[150%] w-[150%] hidden dark:block bg-[radial-gradient(circle_at_70%_30%,rgba(16,185,129,0.06)_0%,transparent_60%)]" />

          {/* Left Text Content */}
          <div className="relative z-20 max-w-[340px] sm:max-w-[380px]">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
              <Globe2 size={13} />
              Xalqaro Hamkorlik
            </div>

            <h3 className="mt-3 text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100">
              Dunyo universitetlari bilan yoshlar almashinuvi
            </h3>

            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              UrDU talabalari uchun Yevropa, Osiyo va dunyoning 30+ yetakchi universitetlarida taʼlim grantlari, Erasmus+ stipendiyalari va xalqaro amaliyotlar.
            </p>

            <Link
              to="/hamkorlik"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95"
            >
              Batafsil maʼlumot
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* 3D Globe: Anchored to bottom right so it NEVER touches or obscures the text */}
          <div className="pointer-events-auto absolute -right-16 -bottom-16 sm:-right-10 sm:-bottom-12 md:-right-6 md:-bottom-8 z-[5] w-[320px] sm:w-[380px] md:w-[400px] aspect-square flex items-center justify-center">
            <Globe className="w-full h-full opacity-90 hover:opacity-100 transition-opacity" />
          </div>

          {/* Soft gradient mask on the left for maximum text contrast */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-[10] w-3/4 bg-gradient-to-r from-[#F5F0E8] via-[#F5F0E8]/75 to-transparent dark:from-[#07090d] dark:via-[#07090d]/80 dark:to-transparent" />

          {/* Location badge */}
          <div className="relative z-20 mt-6 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <MapPin size={14} className="text-emerald-500 dark:text-emerald-400" />
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">Urganch, O‘zbekiston</span>
          </div>
        </article>

        {/* Right Card: Ittifoq Yangiliklari (Auto-slider) */}
        <article
          onMouseEnter={() => setIsNewsPaused(true)}
          onMouseLeave={() => setIsNewsPaused(false)}
          className="glass-card relative min-h-[420px] overflow-hidden flex flex-col justify-between p-6 sm:p-8"
        >
          {/* Background ornament */}
          <div className="absolute inset-0 -z-10">
            <img
              src="/img/banner-ornament.png"
              alt="UrDU Yoshlar Ittifoqi"
              className="h-full w-full object-cover object-center opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F5F0E8] via-[#F5F0E8]/85 to-transparent dark:from-[#07090d] dark:via-[#07090d]/80 dark:to-transparent" />
          </div>

          {/* Top Bar: Live indicator + Navigation arrows */}
          <div className="flex items-center justify-between gap-3 border-b border-zinc-200/80 pb-4 dark:border-zinc-800">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Ittifoq Yangiliklari
              </span>
              <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                {String(activeNewsIndex + 1).padStart(2, '0')} / {String(newsEvents.length).padStart(2, '0')}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveNewsIndex((prev) => (prev - 1 + newsEvents.length) % newsEvents.length)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200/80 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                aria-label="Oldingi yangilik"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => setActiveNewsIndex((prev) => (prev + 1) % newsEvents.length)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200/80 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                aria-label="Keyingi yangilik"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Current News Slide */}
          {newsEvents.length === 0 ? (
            <div className="my-auto py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-3">
                <Sparkles size={22} />
              </div>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Hozircha yangi eʼlonlar kiritilmagan</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xs mx-auto">
                Admin paneldan kiritilgan barcha yangilik va eʼlonlar bu yerda darhol aks etadi.
              </p>
            </div>
          ) : (
            <div className="my-auto py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentNews?.id || activeNewsIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.32, ease: 'easeOut' }}
                  className="flex flex-col sm:flex-row gap-5 items-stretch"
                >
                  {/* 1. Prominent News Image with Floating Tag/Badge */}
                  <Link
                    to={`/yangiliklar/${currentNews?.id || 'news-1'}`}
                    className="relative group w-full sm:w-44 md:w-52 h-44 sm:h-auto min-h-[165px] shrink-0 rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100 dark:bg-zinc-900 shadow-sm block"
                    aria-label={currentNews?.title || 'Yangilik rasmi'}
                  >
                  <img
                    src={currentNews?.image || getCategoryFallbackImage(currentNews?.category)}
                    alt={currentNews?.title || 'Yangilik'}
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = getCategoryFallbackImage(currentNews?.category)
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                  {/* Asosiy Tag Yozuvi (Floating Glass Badge on Image) */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/95 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                      <Sparkles size={11} className="text-emerald-200" />
                      {currentNews?.badge || 'Yangilik'}
                    </span>
                  </div>

                  {/* Reading Time Pill on bottom-right of image */}
                  {currentNews?.readTime && (
                    <div className="absolute bottom-2 right-2 z-10">
                      <span className="rounded-md bg-black/65 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium text-white/90">
                        {currentNews.readTime}
                      </span>
                    </div>
                  )}
                </Link>

                {/* 2. News Information & Details */}
                <div className="flex flex-1 flex-col justify-between min-w-0">
                  <div>
                    {/* Category and Date Row */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                        {currentNews?.category || 'UrDU Yoshlari'}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                        <CalendarDays size={12} className="text-emerald-500" />
                        {formatNewsDate(currentNews?.date)}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug">
                      <Link
                        to={`/yangiliklar/${currentNews?.id || 'news-1'}`}
                        className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        {currentNews?.title}
                      </Link>
                    </h3>

                    {/* Summary */}
                    <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                      {currentNews?.summary}
                    </p>
                  </div>

                  {/* Pagination Dots */}
                  <div className="mt-4 flex items-center gap-1.5">
                    {newsEvents.map((item, idx) => (
                      <button
                        key={item.id || idx}
                        type="button"
                        onClick={() => setActiveNewsIndex(idx)}
                        aria-label={`${idx + 1}-yangilik`}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          activeNewsIndex === idx
                            ? 'w-7 bg-emerald-500'
                            : 'w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          )}

          {/* Bottom Actions: Batafsil & Barcha yangiliklar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200/80 pt-4 dark:border-zinc-800">
            <Link
              to={`/yangiliklar/${currentNews?.id || 'news-1'}`}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95"
            >
              Batafsil o‘qish
              <ArrowUpRight size={14} />
            </Link>

            <Link
              to="/yangiliklar"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-600 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors"
            >
              Barcha yangiliklar
              <ArrowRight size={14} />
            </Link>
          </div>
        </article>
      </div>

      {/* Modals */}
      <InternationalPartnersModal
        isOpen={isPartnersModalOpen}
        onClose={() => setIsPartnersModalOpen(false)}
      />

      <NewsDetailModal
        isOpen={isNewsModalOpen}
        onClose={() => setIsNewsModalOpen(false)}
        newsItem={selectedNewsItem}
      />

      {copyToast ? <div className="toast">{copyToast}</div> : null}
    </MotionSection>
  )
}

export default TopCardsSection
