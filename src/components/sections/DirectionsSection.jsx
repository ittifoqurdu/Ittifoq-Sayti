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
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent dark:bg-blue-500/10 blur-[140px]" />

      <MotionDiv variants={fadeUp} className="mb-14 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
          <Compass size={14} />
          Faoliyatimiz & Klublar
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-zinc-100">
          Yo‘nalishlar va <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-400">Tashabbuslar</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
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
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/90 p-8 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-zinc-300 hover:shadow-2xl sm:p-9 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-700/80"
            >
              {/* Dynamic top gradient bar */}
              <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${dir.gradient} opacity-40 transition-opacity duration-300 group-hover:opacity-100`} />

              <div>
                {/* Icon box */}
                <div className="mb-6 flex items-center justify-between">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-200/60 shadow-md backdrop-blur-md dark:border-white/10"
                    style={{ backgroundColor: `${dir.color}15`, color: dir.color }}
                  >
                    <Icon size={28} />
                  </div>
                  <span className="rounded-full border border-zinc-200 bg-zinc-100/90 px-3 py-1 text-[11px] font-semibold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-400">
                    UrDU Kengashi
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-zinc-900 group-hover:text-emerald-700 transition-colors dark:text-zinc-100 dark:group-hover:text-white">
                  {dir.title}
                </h3>
                <p className="mt-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                  {dir.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {dir.description}
                </p>

                {/* Highlights list */}
                <div className="mt-6 space-y-2 border-t border-zinc-200/80 pt-4 dark:border-zinc-800/60">
                  {dir.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-8 pt-4 border-t border-zinc-200/80 flex items-center justify-between dark:border-zinc-800/60">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 transition-colors group-hover:text-cyan-600 dark:text-zinc-400 dark:group-hover:text-cyan-300"
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
