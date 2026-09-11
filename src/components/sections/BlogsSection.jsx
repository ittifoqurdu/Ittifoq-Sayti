import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { CalendarDays, ArrowUpRight, Sparkles, Newspaper, BookOpen } from 'lucide-react'
import { newsEvents } from '../../data/siteData'
import { fadeUp, staggerContainer, fadeUpChild } from '../../lib/animations'
import NewsDetailModal from '../ui/NewsDetailModal'

const MotionSection = motion.section
const MotionDiv = motion.div

function BlogsSection() {
  const [selectedNews, setSelectedNews] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <MotionSection
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="mx-auto flex w-full max-w-[1320px] flex-col justify-center px-4 py-20 md:px-7 lg:py-28"
      id="news"
    >
      <MotionDiv variants={fadeUp} className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
          <Newspaper size={14} />
          Yangiliklar & Tadbirlar
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-zinc-100">
          Universitet <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400">Yoshlar Hayoti</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
          Xakatonlar, intellektual turnirlar, festivallar va talabalarning respublika miqyosidagi g‘alabalari.
        </p>
      </MotionDiv>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {newsEvents.map((item) => (
          <MotionDiv
            key={item.id}
            variants={fadeUpChild}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/90 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-2xl sm:p-8 dark:border-zinc-800/80 dark:bg-zinc-900/40"
          >
            <div>
              {/* Header row */}
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  <Sparkles size={12} />
                  {item.badge}
                </span>

                <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                  <CalendarDays size={13} className="text-zinc-400 dark:text-zinc-500" />
                  {item.date}
                </span>
              </div>

              {/* Title & category */}
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                {item.category}
              </p>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-zinc-900 group-hover:text-emerald-700 transition-colors sm:text-2xl dark:text-zinc-100 dark:group-hover:text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.summary}
              </p>
            </div>

            {/* Bottom link */}
            <div className="mt-6 border-t border-zinc-200/80 pt-4 flex items-center justify-between dark:border-zinc-800/80">
              <span className="text-xs text-zinc-500">UrDU Yoshlar Matbuot Xizmati</span>
              <Link
                to={`/yangiliklar/${item.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                Batafsil o‘qish
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </MotionDiv>
        ))}
      </div>

      <NewsDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newsItem={selectedNews}
      />
    </MotionSection>
  )
}

export default BlogsSection
