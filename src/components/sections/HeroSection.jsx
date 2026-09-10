import { motion } from 'motion/react'
import { ArrowDown, Award, Compass, MapPin, Send, Sparkles, Users } from 'lucide-react'
import { profile, socialLinks } from '../../data/siteData'
import { fadeUp } from '../../lib/animations'

const MotionSection = motion.section

function HeroSection() {
  return (
    <MotionSection
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="relative isolate min-h-[95svh] w-full overflow-hidden"
      id="hero"
    >
      {/* Background Graphic & Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img/banner-ornament.png"
          alt="UrDU Yoshlar Ittifoqi Banner"
          className="h-full w-full object-cover object-center opacity-35 filter blur-[1px] scale-105"
          loading="eager"
          fetchPriority="high"
        />
        {/* Layered dark gradients for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090d]/95 via-[#07090d]/85 to-[#07090d]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(16,185,129,0.18),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(14,165,233,0.16),transparent_40%)]" />
        <div className="absolute inset-y-0 right-[15%] hidden w-px bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent lg:block" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[95svh] w-full max-w-[1320px] flex-col justify-between px-4 pb-8 pt-24 md:px-7 md:pb-12 lg:pt-32">
        <div className="max-w-[780px] pt-4 sm:pt-10 lg:pt-14">
          {/* Institution & Status Tag */}
          <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-emerald-500/30 bg-black/40 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-200 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.9)] animate-pulse" />
            <span>URGANCH DAVLAT UNIVERSITETI • 1935</span>
          </div>

          {/* Main Logo & Title */}
          <div className="mt-6 flex items-center gap-4">
            <img
              src="/img/logo-oq.png"
              alt="UrDU Yoshlar Ittifoqi"
              className="h-16 w-auto sm:h-20 drop-shadow-[0_10px_25px_rgba(16,185,129,0.25)]"
            />
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
            UrDU Yoshlar <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Ittifoqi</span>
          </h1>

          <p className="mt-3 text-lg font-medium text-emerald-300/90 sm:text-xl">
            {profile.title}
          </p>

          <p className="mt-5 max-w-[55ch] text-base leading-relaxed text-zinc-300 sm:text-lg">
            Yangi O‘zbekiston yoshlari — ilm-fan, tashabbus va intellekt birlashgan maskan. Universitetimizning 30,000 dan ortiq iqtidorli talabalarini qo‘llab-quvvatlovchi rasmiy jamoa.
          </p>

          {/* Quick Pillars */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              'Ilm-fan & Grantlar',
              'IT & Startaplar',
              'Zakovat & Munozara',
              'Oltin Qanot Volontyorlari',
              'Madaniyat & Sport',
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md"
              >
                <Sparkles size={11} className="text-emerald-400" />
                {item}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#team"
              className="group inline-flex items-center justify-center rounded-full bg-emerald-500 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 shadow-[0_14px_35px_rgba(16,185,129,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <Users size={15} className="mr-2" />
              Yetakchilar Kengashi
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-black/40 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-100 shadow-[0_12px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400/60 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            >
              Safimizga Qo‘shiling
              <Send size={13} className="ml-2" />
            </a>
          </div>
        </div>

        {/* Bottom Banner Stats / University Markers */}
        <div className="grid gap-4 border-t border-zinc-800/80 pt-6 text-xs uppercase tracking-[0.18em] text-zinc-400 sm:grid-cols-3 sm:gap-6">
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-zinc-200">Urganch Davlat Universiteti</p>
              <p className="mt-0.5 text-zinc-500 font-normal">Hamid Olimjon ko‘chasi, 14-uy</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Award size={18} className="text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-zinc-200">12 ta Fakultet Kengashi</p>
              <p className="mt-0.5 text-zinc-500 font-normal">30,000+ Talaba qamrovi</p>
            </div>
          </div>
          <div className="flex items-start gap-3 sm:justify-end">
            <Send size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div className="sm:text-right">
              <p className="font-bold text-zinc-200">Rasmiy Kanal</p>
              <p className="mt-0.5 text-zinc-500 font-normal">{profile.telegramHandle}</p>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  )
}

export default HeroSection
