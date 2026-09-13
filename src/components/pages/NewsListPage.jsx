import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  Search,
  Sparkles,
  Newspaper,
} from 'lucide-react'
import { useNews } from '../../context/NewsContext'
import { formatNewsDate } from '../../lib/utils'
import FooterSection from '../sections/FooterSection'

export default function NewsListPage() {
  const { newsList } = useNews()
  const [activeCategory, setActiveCategory] = useState('Barchasi')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const defaultCategories = ['Barchasi', 'Intellektual O‘yin', 'IT & Innovatsiya', 'Madaniyat & Sanʼat', 'Ijtimoiy Loyiha', 'Xalqaro Taʼlim']
  const extraCategories = (newsList || []).map((n) => n.category).filter(Boolean)
  const categories = Array.from(new Set([...defaultCategories, ...extraCategories]))

  const filteredNews = (newsList || []).filter((item) => {
    const matchesCategory = activeCategory === 'Barchasi' || item.category === activeCategory
    const matchesQuery =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesQuery
  })

  return (
    <div className="min-h-screen pt-24 sm:pt-28 bg-[#F5F0E8] dark:bg-[#07090d] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
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
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 truncate">Yangiliklar & Tadbirlar</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
              <Sparkles size={12} />
              Matbuot Xizmati
            </span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-7 lg:py-20 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="mx-auto max-w-[1320px] text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
            <Newspaper size={14} />
            UrDU Yoshlar Matbuot Xizmati
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-zinc-100">
            Universitet Yoshlar Hayoti{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400">
              Yangiliklari
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-300">
            Xakatonlar, intellektual turnirlar, festivallar, ilmiy yutuqlar va talabalarimizning respublika miqyosidagi g‘alabalari.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-[1320px] px-4 py-12 sm:px-7">
        {/* Search & Category Tabs */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200/80 pb-6 dark:border-zinc-800">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-emerald-600 text-white shadow-md dark:bg-emerald-500 dark:text-zinc-950'
                    : 'bg-white/80 text-zinc-700 hover:bg-white dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Yangilik qidirish..."
              className="w-full rounded-full border border-zinc-200 bg-white/90 py-2.5 pl-10 pr-4 text-xs text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-100 dark:placeholder-zinc-500 shadow-sm"
            />
          </div>
        </div>

        {/* News Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredNews.length > 0 ? (
            filteredNews.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/95 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-xl sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/60"
              >
                <div>
                  {/* 16:9 Landscape Cover Image if available */}
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

                  {/* Header metadata row if no image */}
                  {!item.image && (
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                        <Sparkles size={12} />
                        {item.badge}
                      </span>

                      <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                        <CalendarDays size={13} className="text-zinc-400 dark:text-zinc-500" />
                        {formatNewsDate(item.date)}
                      </span>
                    </div>
                  )}

                  {/* Category & Date Row when image exists */}
                  {item.image && (
                    <div className="flex items-center justify-between gap-2 text-xs text-zinc-500 mb-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1 text-zinc-400">
                        <CalendarDays size={12} />
                        {formatNewsDate(item.date)}
                      </span>
                    </div>
                  )}

                  {!item.image && (
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      {item.category}
                    </p>
                  )}

                  <h3 className="mt-2 text-xl font-bold tracking-tight text-zinc-900 group-hover:text-emerald-600 transition-colors sm:text-2xl dark:text-zinc-100 dark:group-hover:text-emerald-400">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-6 border-t border-zinc-200/80 pt-4 flex items-center justify-between dark:border-zinc-800">
                  <span className="text-xs text-zinc-500">UrDU Yoshlar Matbuot Xizmati</span>
                  <Link
                    to={`/yangiliklar/${item.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                  >
                    Batafsil o‘qish
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-zinc-500">
              Qidiruvingiz bo‘yicha yangilik topilmadi.
            </div>
          )}
        </div>
      </div>

      <FooterSection />
    </div>
  )
}
