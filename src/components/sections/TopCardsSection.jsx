import { useState, useCallback, useEffect } from 'react'
import { motion } from 'motion/react'
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Globe2,
  GraduationCap,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  Users,
} from 'lucide-react'
import { fadeUp } from '../../lib/animations'
import { profile, socialLinks, universityStats } from '../../data/siteData'
import { Globe } from '../ui/globe'

const MotionSection = motion.section
const EMAIL = profile.email

function TopCardsSection() {
  const [copyToast, setCopyToast] = useState('')
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60000)
    return () => window.clearInterval(timer)
  }, [])

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
          <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-2 border-emerald-500/40 bg-zinc-950 p-2 shadow-lg">
            <img
              src="/img/logo2.png"
              alt="Urganch Davlat Universiteti"
              className="h-full w-full object-contain filter drop-shadow"
              loading="eager"
            />
          </div>
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-zinc-100">
            {profile.university}
          </h2>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-emerald-400 font-semibold">
            Tashkil topgan yili: {profile.foundedYear}
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-zinc-500">
            {profile.city.toUpperCase()}, O‘ZBEKISTON | {new Intl.DateTimeFormat('uz-UZ', { hour: '2-digit', minute: '2-digit', hour12: false }).format(now)}
          </p>

          <div className="mt-6 w-full border-t border-zinc-800/80 pt-5">
            <div className="flex justify-center gap-4 text-zinc-400">
              <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label="Telegram">
                <Send size={15} />
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label="Instagram">
                <Instagram size={15} />
              </a>
              <a href={socialLinks.email} className="footer-icon" aria-label="Email">
                <Mail size={15} />
              </a>
              <a href={socialLinks.phone} className="footer-icon" aria-label="Phone">
                <Phone size={15} />
              </a>
            </div>
            <p className="mt-4 text-[12px] font-semibold tracking-[0.14em] text-zinc-300">
              {profile.address}
            </p>
          </div>
        </article>

        {/* Card 2: Strategic Pillars & Youth Mission */}
        <article className="glass-card relative overflow-hidden py-7">
          <div className="pointer-events-none absolute -left-1/2 -top-1/2 h-[200%] w-[200%] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.06)_0%,transparent_50%)]" />
          <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
              <Sparkles size={11} />
              Yoshlar Harakati
            </span>
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">UrDU • 2026</p>
          </div>
          <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-zinc-100 sm:text-3xl">
            Iqtidor, Ilm va <span className="text-emerald-400">Tashabbus</span>
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Universitetimiz talabalarining intellektual salohiyatini oshirish, ilm-fan olimpiadalari, respublika xakatonlari va ijtimoiy loyihalarda g‘oliblik sari yetaklaymiz.
          </p>

          {/* Mini Stats Bar */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {universityStats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-3 text-center">
                <p className="text-lg font-bold text-emerald-300">{item.value}</p>
                <p className="mt-0.5 text-[10px] text-zinc-400 leading-snug">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {['12 ta Fakultet', 'Zakovat Ligasi', 'Oltin Qanot', 'IT Inkubator', 'Talabalar Bahori'].map((tag) => (
              <span key={tag} className="rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-[11px] font-medium text-zinc-300">
                {tag}
              </span>
            ))}
          </div>
        </article>

        {/* Card 3: Contact & Join Funnel */}
        <article className="glass-card relative flex flex-col py-7">
          <div className="mb-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] text-emerald-300 font-semibold uppercase tracking-wider">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Doimiy Muloqot
            </span>
            <span className="text-xs text-zinc-500">Qabul 24/7</span>
          </div>

          <h3 className="text-xl font-bold leading-snug tracking-tight text-zinc-100">
            Savol yoki taklifingiz
            <br />
            <span className="text-emerald-400">bormi?</span>
          </h3>
          <p className="mt-2 text-xs text-zinc-400">
            Biz har bir talabaning fikri va tashabbusiga ochiqmiz.
          </p>

          <div className="my-4 h-px bg-zinc-800" />

          <button
            type="button"
            onClick={copyEmail}
            className="cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <p className="text-sm font-semibold text-zinc-200 transition hover:text-emerald-300 break-all">{EMAIL}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-zinc-500">Emailni nusxalash</p>
          </button>

          <a
            href={socialLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
          >
            <Send size={13} />
            Telegramda yozish
          </a>
        </article>
      </div>

      {/* 2-Column Bottom Grid: Globe & UrDU Panorama Banner */}
      <div className="relative mt-8 grid gap-6 lg:grid-cols-2">
        {/* Globe Card */}
        <article className="glass-card relative min-h-[360px] overflow-hidden">
          <div className="pointer-events-none absolute -right-1/4 -top-1/4 h-[150%] w-[150%] bg-[radial-gradient(circle_at_70%_30%,rgba(16,185,129,0.06)_0%,transparent_60%)]" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-semibold">Xalqaro Hamkorlik</p>
          <h3 className="mt-1.5 max-w-[320px] text-xl font-bold leading-snug text-zinc-100 sm:text-2xl">
            Dunyo universitetlari bilan yoshlar almashinuvi
          </h3>

          <div className="absolute inset-x-0 bottom-0 z-[1] flex justify-center">
            <Globe className="translate-y-[10%] opacity-100" />
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-t from-zinc-950/90 to-transparent" />
          <div className="absolute right-5 bottom-5 z-[4] flex items-center gap-2 text-[12px] text-zinc-400">
            <MapPin size={14} className="text-emerald-400" />
            <span className="font-semibold text-zinc-200">Urganch, O‘zbekiston</span>
          </div>
        </article>

        {/* UrDU Youth Union Banner Card */}
        <article className="glass-card relative min-h-[360px] overflow-hidden flex flex-col justify-between p-8">
          <div className="absolute inset-0 -z-10">
            <img
              src="/img/banner-ornament.png"
              alt="UrDU Yoshlar Ittifoqi Kengashi"
              className="h-full w-full object-cover object-center opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
          </div>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1 text-xs font-semibold text-zinc-300">
              <Users size={13} className="text-emerald-400" />
              Talabalar Kengashi
            </div>
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
              Har bir talabaga e&apos;tibor, har bir tashabbusga madad!
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Universitetda ta&apos;lim olayotgan yoshlarimiz uchun barcha sharoitlar yaratilgan: zamonaviy kutubxona, kovorking markazlari, sport maydonlari va startap laboratoriyalari.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="#team"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-950 transition hover:bg-white hover:shadow-lg"
            >
              Yetakchilar bilan tanishing
              <ArrowUpRight size={14} />
            </a>
            <a
              href="#directions"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-emerald-300 transition-colors"
            >
              Yo‘nalishlarni ko‘rish
            </a>
          </div>
        </article>
      </div>

      {copyToast ? <div className="toast">{copyToast}</div> : null}
    </MotionSection>
  )
}

export default TopCardsSection
