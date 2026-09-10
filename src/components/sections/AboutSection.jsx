import { motion } from 'motion/react'
import { ArrowUpRight, Award, BookOpen, Compass, GraduationCap, Instagram, Mail, Phone, Send, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { aboutText, profile, socialLinks } from '../../data/siteData'
import { fadeUp, staggerContainer, fadeUpChild } from '../../lib/animations'

const MotionSection = motion.section
const MotionDiv = motion.div

const contactLinks = [
  { href: socialLinks.telegram, label: 'Telegram', icon: Send },
  { href: socialLinks.instagram, label: 'Instagram', icon: Instagram },
  { href: socialLinks.email, label: 'Email', icon: Mail },
  { href: socialLinks.phone, label: 'Phone', icon: Phone },
].filter((item) => item.href)

function AboutSection() {
  return (
    <MotionSection
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      className="mx-auto flex w-full max-w-[1320px] flex-col items-center px-4 py-24 md:px-7 lg:py-32"
      id="about"
    >
      <MotionDiv variants={fadeUp} className="mb-10 w-full text-center lg:mb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
          <BookOpen size={14} />
          Tashkilot Haqida
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl lg:text-5xl">
          {aboutText.heading}{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            {aboutText.headingHighlight}
          </span>
        </h2>
      </MotionDiv>

      <div className="grid w-full gap-6 lg:grid-cols-12 lg:grid-rows-[minmax(420px,auto)_auto]">
        {/* Main Philosophy Card */}
        <MotionDiv
          variants={fadeUpChild}
          className="group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-8 shadow-2xl backdrop-blur-sm sm:p-12 lg:col-span-8 lg:row-span-2"
        >
          <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px] transition-all duration-700 group-hover:bg-emerald-500/20" />
          <div className="absolute -bottom-20 right-[-8%] h-52 w-52 rounded-full bg-cyan-500/10 blur-[100px]" />

          <div className="relative z-10">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              UrDU Yoshlar Yetakchilari
            </div>

            <div className="space-y-5 text-base leading-relaxed text-zinc-300 md:text-lg">
              {aboutText.paragraphs.map((p, i) => (
                <p key={i} className="max-w-[65ch]">
                  {p}
                </p>
              ))}
            </div>

            {/* Principles list */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {aboutText.principles.map((pr) => (
                <div key={pr.title} className="rounded-2xl border border-zinc-800/80 bg-zinc-950/40 p-4">
                  <p className="text-sm font-bold text-emerald-400">{pr.title}</p>
                  <p className="mt-1 text-xs text-zinc-400 leading-relaxed">{pr.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-zinc-800/80 pt-6">
            <div className="flex items-center gap-3 text-zinc-400">
              {contactLinks.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/60 transition-all hover:border-emerald-500/50 hover:text-emerald-300"
                    aria-label={item.label}
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>

            <a
              href="#contact"
              className="group/btn inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
            >
              Murojaat va Taklif
              <ArrowUpRight size={15} className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </a>
          </div>
        </MotionDiv>

        {/* University Organization Emblem Card */}
        <MotionDiv
          variants={fadeUpChild}
          className="group relative col-span-1 overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/40 lg:col-span-4 p-6 flex flex-col justify-between"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent z-10" />
          <div className="absolute -top-8 right-[-12%] h-40 w-40 rounded-full bg-emerald-500/15 blur-[90px]" />

          <div className="relative z-20 flex flex-col items-center text-center py-6">
            <div className="h-28 w-28 rounded-3xl border-2 border-emerald-500/30 bg-zinc-950 p-3 shadow-xl flex items-center justify-center">
              <img
                src="/img/logo-oq1.png"
                alt="UrDU Yoshlar Ittifoqi"
                className="h-full w-full object-contain filter drop-shadow"
              />
            </div>
            <h3 className="mt-5 text-xl font-bold text-zinc-100">
              Urganch Davlat Universiteti
            </h3>
            <p className="mt-1 text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              Yoshlar Ittifoqi Kengashi
            </p>
            <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
              1935-yildan buyon ilm-fan va ma&apos;rifat maskani. Bugun esa zamonaviy yoshlar yetakchilari birlashgan maskan.
            </p>
          </div>

          <div className="relative z-20 border-t border-zinc-800/80 pt-4 flex items-center justify-between text-xs text-zinc-400">
            <span>Hamid Olimjon 14</span>
            <span className="text-emerald-400 font-medium">Urganch</span>
          </div>
        </MotionDiv>

        {/* 3 Pillars Summary */}
        <MotionDiv
          variants={fadeUpChild}
          className="col-span-1 rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-6 shadow-xl backdrop-blur-sm lg:col-span-4"
        >
          <div className="grid grid-cols-3 gap-2 divide-x divide-zinc-800/60 text-center">
            <div className="flex flex-col items-center gap-1.5 px-1">
              <GraduationCap size={22} className="text-emerald-400" strokeWidth={1.8} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">30,000+</span>
              <span className="text-[9px] text-zinc-500">Talabalar</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 px-1">
              <Compass size={22} className="text-cyan-400" strokeWidth={1.8} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">12 ta</span>
              <span className="text-[9px] text-zinc-500">Fakultet</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 px-1">
              <Users size={22} className="text-amber-400" strokeWidth={1.8} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">100+</span>
              <span className="text-[9px] text-zinc-500">Yetakchi</span>
            </div>
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  )
}

export default AboutSection
