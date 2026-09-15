import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowDown, Award, Compass, MapPin, Send, Sparkles, Users } from 'lucide-react'
import { profile, socialLinks } from '../../data/siteData'
import { useTheme } from '../../context/ThemeContext'
import { fadeUp } from '../../lib/animations'
import HeroSlideshow from '../ui/HeroSlideshow'

const MotionSection = motion.section

function HeroSection() {
  const { isDark } = useTheme()

  return (
    <MotionSection
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="relative isolate min-h-[95svh] w-full overflow-hidden transition-colors duration-300"
      id="hero"
    >
      {/* Background Graphic & Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img/banner-ornament.png"
          alt="UrDU Yoshlar Ittifoqi Banner"
          className="h-full w-full object-cover object-center opacity-25 dark:opacity-35 filter blur-[1px] scale-105"
          loading="eager"
          fetchPriority="high"
        />
        {/* Layered gradients for contrast - light cream vs deep dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F0E8]/92 via-[#F5F0E8]/85 to-[#F5F0E8] dark:from-[#07090d]/95 dark:via-[#07090d]/85 dark:to-[#07090d]" />
        <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_20%_25%,rgba(16,185,129,0.14),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(14,165,233,0.12),transparent_40%)]" />
        <div className="absolute inset-y-0 right-[15%] hidden w-px bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent lg:block" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[95svh] w-full max-w-[1400px] flex-col justify-between px-4 pb-8 pt-24 md:px-7 md:pb-12 lg:pt-28">
        <div className="grid items-center gap-8 pt-4 sm:pt-8 lg:grid-cols-12 lg:gap-8 lg:pt-4 xl:gap-12 my-auto">
          {/* Left Column: Information & Actions */}
          <div className="lg:col-span-6 xl:col-span-5">
            {/* Institution & Status Tag */}
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-emerald-500/30 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-800 shadow-sm backdrop-blur-xl dark:bg-black/40 dark:text-zinc-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_14px_rgba(16,185,129,0.9)] animate-pulse" />
              <span>URGANCH DAVLAT UNIVERSITETI • 1935</span>
            </div>

            {/* Main Logo & Title */}
            <div className="mt-6 flex items-center gap-4">
              <img
                src={isDark ? '/img/logo-oq.png' : '/img/logo-oq1.png'}
                alt="UrDU Yoshlar Ittifoqi"
                className="h-16 w-auto sm:h-20 drop-shadow-[0_10px_25px_rgba(16,185,129,0.2)]"
              />
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl leading-[1.08] dark:text-white">
              UrDU Yoshlar <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400">Ittifoqi</span>
            </h1>

            <p className="mt-3 text-lg font-medium text-emerald-700 sm:text-xl dark:text-emerald-300/90">
              {profile.title}
            </p>

            <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-300">
              Yangi O‘zbekiston yoshlari — ilm-fan, tashabbus va intellekt birlashgan maskan. Universitetimizning 20,000 ga yaqin iqtidorli talabalarini qo‘llab-quvvatlovchi rasmiy jamoa.
            </p>

            {/* Quick Pillars */}
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                'Ilm-fan & Grantlar',
                'IT & Startaplar',
                'Zakovat & Munozara',
                'Oltin Qanot Volontyorlari',
                'Madaniyat & Sport',
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-white/80 px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/60 dark:text-zinc-300"
                >
                  <Sparkles size={11} className="text-emerald-500 dark:text-emerald-400" />
                  {item}
                </span>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/tuzilma"
                className="group inline-flex items-center justify-center rounded-full bg-emerald-500 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 shadow-[0_14px_35px_rgba(16,185,129,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 font-bold"
              >
                <Users size={15} className="mr-2" />
                Yetakchilar Kengashi
              </Link>
              <Link
                to="/boglanish"
                className="inline-flex items-center justify-center rounded-full border border-zinc-300/80 bg-white/80 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-800 shadow-[0_8px_20px_rgba(120,105,85,0.06)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/60 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-white/15 dark:bg-black/40 dark:text-zinc-100 dark:shadow-[0_12px_30px_rgba(0,0,0,0.3)] dark:hover:border-emerald-400/60 dark:hover:text-emerald-300"
              >
                Safimizga Qo‘shiling
                <Send size={13} className="ml-2" />
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Slideshow (Enlarged & Prominent) */}
          <div className="lg:col-span-6 xl:col-span-7 w-full">
            <HeroSlideshow />
          </div>
        </div>

        {/* Bottom Banner Stats / University Markers */}
        <div className="grid gap-4 border-t border-zinc-300/80 pt-6 text-xs uppercase tracking-[0.18em] text-zinc-600 sm:grid-cols-3 sm:gap-6 dark:border-zinc-800/80 dark:text-zinc-400">
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-emerald-500 shrink-0 mt-0.5 dark:text-emerald-400" />
            <div>
              <p className="font-bold text-zinc-900 dark:text-zinc-200">Urganch Davlat Universiteti</p>
              <p className="mt-0.5 text-zinc-500 font-normal">Hamid Olimjon ko‘chasi, 14-uy</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Award size={18} className="text-cyan-600 shrink-0 mt-0.5 dark:text-cyan-400" />
            <div>
              <p className="font-bold text-zinc-900 dark:text-zinc-200">13 ta Fakultet Kengashi</p>
              <p className="mt-0.5 text-zinc-500 font-normal">20,000+ Talaba qamrovi</p>
            </div>
          </div>
          <div className="flex items-start gap-3 sm:justify-end">
            <Send size={18} className="text-amber-500 shrink-0 mt-0.5 dark:text-amber-400" />
            <div className="sm:text-right">
              <p className="font-bold text-zinc-900 dark:text-zinc-200">Rasmiy Kanal</p>
              <p className="mt-0.5 text-zinc-500 font-normal">{profile.telegramHandle}</p>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  )
}

export default HeroSection
