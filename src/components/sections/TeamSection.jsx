import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Mail,
  Phone,
  Send,
  Users,
  GraduationCap,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { teamMembers } from '../../data/siteData'
import { fadeUp, staggerContainer, fadeUpChild } from '../../lib/animations'

const MotionSection = motion.section
const MotionDiv = motion.div

export default function TeamSection() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'Barcha yetakchilar' },
    { id: 'leadership', label: 'Boshqaruv' },
    { id: 'coordinators', label: 'Yo‘nalish koordinatorlari' },
  ]

  const filteredMembers = activeCategory === 'all'
    ? teamMembers
    : activeCategory === 'leadership'
      ? teamMembers.filter((m) => m.id === 'leader' || m.id === 'coordinator')
      : teamMembers.filter((m) => m.id !== 'leader' && m.id !== 'coordinator')

  return (
    <MotionSection
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="relative isolate mx-auto w-full max-w-[1340px] px-4 py-20 md:px-7 lg:py-28"
      id="team"
    >
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute -left-24 top-1/3 -z-10 h-96 w-96 rounded-full bg-emerald-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-24 bottom-1/3 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />

      <MotionDiv variants={fadeUp} className="mb-12 text-center lg:mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
          <Users size={14} />
          Yetakchilar Kengashi
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl lg:text-5xl">
          UrDU Yoshlar Ittifoqi <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Jamoasi</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-zinc-400 sm:text-lg">
          Universitet talaba-yoshlarining tashabbuslarini qo‘llab-quvvatlovchi, fakultetlararo integratsiyani ta’minlovchi yetakchilar guruhi.
        </p>

        {/* Categories Tab */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </MotionDiv>

      {/* Grid with Large Photos & Full Contact Details */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <MotionDiv
            key={member.id}
            variants={fadeUpChild}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-800/90 bg-zinc-900/50 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10"
          >
            {/* Top Large Photo Section */}
            <div className="relative h-72 w-full overflow-hidden sm:h-80 bg-zinc-950">
              {member.avatar ? (
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-zinc-800 to-zinc-900 text-4xl font-bold text-emerald-400">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
              )}

              {/* Gradient overlay for readability */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

              {/* Badge on Photo */}
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-zinc-950/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-md shadow-md">
                  <Sparkles size={11} className="text-emerald-400" />
                  {member.badge}
                </span>
              </div>

              {/* Verified badge */}
              <div className="absolute right-4 bottom-4 flex items-center gap-1 rounded-full bg-emerald-500/90 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-950 shadow-md">
                <CheckCircle2 size={13} strokeWidth={2.5} />
                <span>Faol</span>
              </div>
            </div>

            {/* Member Details */}
            <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-zinc-100 group-hover:text-emerald-300 transition-colors">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {member.role}
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-zinc-400">
                  <GraduationCap size={14} className="text-emerald-400/80 shrink-0" />
                  <span>{member.faculty}</span>
                </p>

                <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                  {member.bio}
                </p>

                {/* Focus skills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {member.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-zinc-800 bg-zinc-950/70 px-2.5 py-1 text-[11px] font-medium text-zinc-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Bar: Email, TG, Phone */}
              <div className="mt-6 border-t border-zinc-800/80 pt-5 space-y-2.5">
                {/* Telegram */}
                {member.telegram ? (
                  <a
                    href={member.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-zinc-800/90 bg-zinc-950/60 px-3.5 py-2 text-xs text-zinc-300 transition hover:border-emerald-500/60 hover:bg-emerald-500/10 hover:text-emerald-300"
                  >
                    <span className="flex items-center gap-2">
                      <Send size={13} className="text-sky-400" />
                      <span className="font-semibold">Telegram:</span>
                    </span>
                    <span className="text-zinc-400 group-hover:text-zinc-200">
                      {member.telegramHandle || '@UrDU_Yoshlari_BT'}
                    </span>
                  </a>
                ) : null}

                {/* Email */}
                {member.email ? (
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center justify-between rounded-xl border border-zinc-800/90 bg-zinc-950/60 px-3.5 py-2 text-xs text-zinc-300 transition hover:border-emerald-500/60 hover:bg-emerald-500/10 hover:text-emerald-300"
                  >
                    <span className="flex items-center gap-2">
                      <Mail size={13} className="text-emerald-400" />
                      <span className="font-semibold">Email:</span>
                    </span>
                    <span className="text-zinc-400 truncate max-w-[180px]">
                      {member.email}
                    </span>
                  </a>
                ) : null}

                {/* Phone */}
                {member.phone ? (
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center justify-between rounded-xl border border-zinc-800/90 bg-zinc-950/60 px-3.5 py-2 text-xs text-zinc-300 transition hover:border-emerald-500/60 hover:bg-emerald-500/10 hover:text-emerald-300"
                  >
                    <span className="flex items-center gap-2">
                      <Phone size={13} className="text-amber-400" />
                      <span className="font-semibold">Telefon:</span>
                    </span>
                    <span className="text-zinc-400 font-mono">
                      {member.phoneLabel || member.phone}
                    </span>
                  </a>
                ) : null}
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>
    </MotionSection>
  )
}
