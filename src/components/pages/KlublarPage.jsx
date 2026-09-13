import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Sparkles, Compass, Send, Users, Award, ShieldCheck } from 'lucide-react'
import DirectionsSection from '../sections/DirectionsSection'
import BehindCurtains from '../sections/BehindCurtains'
import FooterSection from '../sections/FooterSection'
import { socialLinks } from '../../data/siteData'

export default function KlublarPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <div className="min-h-screen pt-20 sm:pt-24 bg-[#F5F0E8] dark:bg-[#07090d] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-zinc-200/80 bg-white/60 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/40 relative z-20">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-4 py-3.5 sm:px-7">
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 min-w-0">
            <Link
              to="/"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium shrink-0"
            >
              <ArrowLeft size={14} />
              Bosh sahifa
            </Link>
            <span className="shrink-0 text-zinc-400">/</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 truncate">Klublar va To‘garaklar</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
              <Sparkles size={12} />
              Talabalar Markazi
            </span>
          </div>
        </div>
      </div>

      {/* Grand Hero Banner with Image */}
      <section className="relative overflow-hidden border-b border-zinc-200/80 dark:border-zinc-800/80">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=85"
            alt="UrDU Talabalar Klublari"
            className="h-full w-full object-cover object-center filter brightness-[0.45] contrast-[1.05] dark:brightness-[0.3]"
          />
          {/* Crisp, deep cinematic overlay without foggy washouts */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/70 to-zinc-950/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 mx-auto max-w-[1320px] px-4 py-20 sm:px-7 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300 backdrop-blur-md shadow-lg">
              <Compass size={14} />
              Faoliyatimiz & Talabalar Klublari
            </div>

            {/* Hero Heading */}
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15]">
              Talabalar Klublari va{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
                Ijodiy To‘garaklar
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-zinc-200 font-normal">
              Ilm-fan, zamonaviy IT-laboratoriya, notiqlik sanʼati, Zakovat intellektual janglari, sanʼat va volontyorlik harakati. Universitetimizning rasmiy klublari safida o‘z iqtidoringizni namoyon eting!
            </p>

            {/* KPI Metric Badges on Banner */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-white/15 bg-black/40 p-3.5 backdrop-blur-md text-center">
                <p className="text-2xl font-black text-emerald-400">6+</p>
                <p className="text-[11px] font-semibold text-zinc-300 mt-0.5">Asosiy Yo‘nalish</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-black/40 p-3.5 backdrop-blur-md text-center">
                <p className="text-2xl font-black text-teal-300">2,500+</p>
                <p className="text-[11px] font-semibold text-zinc-300 mt-0.5">Faol Talabalar</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-black/40 p-3.5 backdrop-blur-md text-center">
                <p className="text-2xl font-black text-amber-300">100%</p>
                <p className="text-[11px] font-semibold text-zinc-300 mt-0.5">Bepul Aʼzolik</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-black/40 p-3.5 backdrop-blur-md text-center">
                <p className="text-2xl font-black text-emerald-300">50+</p>
                <p className="text-[11px] font-semibold text-zinc-300 mt-0.5">Yillik Loyihalar</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#directions"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 shadow-xl shadow-emerald-500/25 transition-all hover:bg-emerald-400 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>To‘garaklar Ro‘yxati</span>
                <ArrowRight size={14} />
              </a>
              <a
                href={socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/30"
              >
                <Send size={14} className="text-emerald-400" />
                <span>Telegram orqali aʼzo bo‘lish</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div>
        <DirectionsSection />
        <BehindCurtains />
      </div>

      {/* Footer */}
      <FooterSection showContactForm={false} />
    </div>
  )
}
