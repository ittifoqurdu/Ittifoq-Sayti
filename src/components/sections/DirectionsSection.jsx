import { motion } from 'motion/react'
import { CheckCircle2, Compass, ArrowRight } from 'lucide-react'
import { directionsData } from '../../data/siteData'
import { fadeUp, staggerContainer, fadeUpChild } from '../../lib/animations'

const MotionSection = motion.section
const MotionDiv = motion.div

export default function DirectionsSection() {
  return (
    <MotionSection
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      className="relative isolate mx-auto w-full max-w-[1320px] px-4 py-24 md:px-7 lg:py-32"
      id="directions"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[140px]" />

      <MotionDiv variants={fadeUp} className="mb-14 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          <Compass size={14} />
          Faoliyatimiz & Klublar
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl lg:text-5xl">
          Yo‘nalishlar va <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Tashabbuslar</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400 sm:text-lg">
          Har bir talaba o‘zining iqtidori, kasbiy qiziqishi va yetakchilik salohiyatini kashf etishi uchun 6 ta asosiy yo‘nalish.
        </p>
      </MotionDiv>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {directionsData.map((dir) => {
          const Icon = dir.icon
          return (
            <MotionDiv
              key={dir.id}
              variants={fadeUpChild}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-zinc-700/80 hover:shadow-2xl sm:p-9"
            >
              {/* Dynamic top gradient bar */}
              <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${dir.gradient} opacity-40 transition-opacity duration-300 group-hover:opacity-100`} />

              <div>
                {/* Icon box */}
                <div className="mb-6 flex items-center justify-between">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 shadow-lg backdrop-blur-md"
                    style={{ backgroundColor: `${dir.color}15`, color: dir.color }}
                  >
                    <Icon size={28} />
                  </div>
                  <span className="rounded-full border border-zinc-800 bg-zinc-900/90 px-3 py-1 text-[11px] font-semibold text-zinc-400">
                    UrDU Kengashi
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-zinc-100 group-hover:text-white transition-colors">
                  {dir.title}
                </h3>
                <p className="mt-1 text-xs font-semibold text-cyan-400">
                  {dir.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {dir.description}
                </p>

                {/* Highlights list */}
                <div className="mt-6 space-y-2 border-t border-zinc-800/60 pt-4">
                  {dir.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-8 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 transition-colors group-hover:text-cyan-300"
                >
                  Safga qo‘shilish
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </MotionDiv>
          )
        })}
      </div>
    </MotionSection>
  )
}
