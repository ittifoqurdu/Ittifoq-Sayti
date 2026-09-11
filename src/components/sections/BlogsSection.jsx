import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { CalendarDays, ArrowUpRight, ArrowRight, Sparkles, Newspaper, ImageIcon } from 'lucide-react'
import { useNews } from '../../context/NewsContext'
import { fadeUp, staggerContainer, fadeUpChild } from '../../lib/animations'

const MotionSection = motion.section
const MotionDiv = motion.div

function BlogsSection() {
  const { newsList } = useNews()
  const displayNews = newsList.slice(0, 4)

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
          Yangiliklar & Eʼlonlar
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-zinc-100">
          Universitet <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400">Yoshlar Hayoti</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
          Xakatonlar, intellektual turnirlar, festivallar, eʼlonlar va talabalarimizning respublika miqyosidagi yutuqlari.
        </p>
      </MotionDiv>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {displayNews.map((item) => (
          <MotionDiv
            key={item.id}
            variants={fadeUpChild}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-2xl sm:p-7 dark:border-zinc-800/80 dark:bg-zinc-900/40"
          >
            <div>
              {/* 16:9 Landscape Cover Image if provided */}
              {item.image ? (
                <div className="relative mb-5 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/75 backdrop-blur-md px-3 py-1 text-xs font-bold text-emerald-400 shadow">
                      <Sparkles size={11} />
                      {item.badge}
                    </span>
                  </div>
                </div>
              ) : null}

              {/* Header row if no image */}
              {!item.image && (
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                    <Sparkles size={12} />
                    {item.badge}
                  </span>

                  <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                    <CalendarDays size={13} className="text-zinc-400 dark:text-zinc-500" />
                    {item.date}
                  </span>
                </div>
              )}

              {/* Category & Date Row */}
              {item.image && (
                <div className="flex items-center justify-between gap-2 text-xs text-zinc-500 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1 text-zinc-400">
                    <CalendarDays size={12} />
                    {item.date}
                  </span>
                </div>
              )}

              {!item.image && (
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  {item.category}
                </p>
              )}

              <h3 className="mt-1.5 text-xl font-bold tracking-tight text-zinc-900 group-hover:text-emerald-700 transition-colors sm:text-2xl dark:text-zinc-100 dark:group-hover:text-white line-clamp-2">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3">
                {item.summary}
              </p>
            </div>

            {/* Bottom link */}
            <div className="mt-6 border-t border-zinc-200/80 pt-4 flex items-center justify-between dark:border-zinc-800/80">
              <span className="text-xs text-zinc-500">UrDU Yoshlar Matbuot Xizmati</span>
              <Link
                to={`/yangiliklar/${item.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                Batafsil o‘qish
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </MotionDiv>
        ))}
      </div>

      {/* View all news CTA */}
      <div className="mt-12 text-center">
        <Link
          to="/yangiliklar"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-300/80 bg-white/90 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-800 shadow-md hover:border-emerald-500 hover:text-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 transition-all active:scale-95"
        >
          Barcha yangiliklar va eʼlonlarni ko‘rish
          <ArrowRight size={15} />
        </Link>
      </div>
    </MotionSection>
  )
}

export default BlogsSection

