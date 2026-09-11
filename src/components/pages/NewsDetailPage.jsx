import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  Send,
  Share2,
  Sparkles,
  CheckCircle2,
  Newspaper,
  Check,
} from 'lucide-react'
import { newsEvents, socialLinks } from '../../data/siteData'
import FooterSection from '../sections/FooterSection'

export default function NewsDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [id])

  const currentNews = newsEvents.find((item) => item.id === id) || newsEvents[0]
  const otherNews = newsEvents.filter((item) => item.id !== currentNews.id).slice(0, 3)

  const handleShare = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Ignore
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] dark:bg-[#07090d] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-zinc-200/80 bg-white/70 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/70 sticky top-0 z-40">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-4 py-3 sm:px-7">
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 truncate">
            <Link
              to="/"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium shrink-0"
            >
              <ArrowLeft size={14} />
              Bosh sahifa
            </Link>
            <span>/</span>
            <Link
              to="/yangiliklar"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium shrink-0"
            >
              Yangiliklar
            </Link>
            <span className="hidden sm:inline">/</span>
            <span className="hidden sm:inline font-semibold text-zinc-800 dark:text-zinc-200 truncate">
              {currentNews.title}
            </span>
          </div>

          <Link
            to="/yangiliklar"
            className="inline-flex items-center gap-1.5 rounded-full bg-zinc-200/80 px-3.5 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors shrink-0"
          >
            <ArrowLeft size={13} />
            Barcha yangiliklar
          </Link>
        </div>
      </div>

      {/* Article Container */}
      <main className="mx-auto max-w-[960px] px-4 py-12 sm:px-7 sm:py-16">
        <article>
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
              <Sparkles size={13} />
              {currentNews.badge}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              {currentNews.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
              <CalendarDays size={13} className="text-emerald-500" />
              {currentNews.date}
            </span>
            {currentNews.readTime && (
              <span className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
                <Clock size={13} className="text-cyan-500" />
                {currentNews.readTime}
              </span>
            )}
          </div>

          {/* Headline */}
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl dark:text-zinc-100 leading-tight">
            {currentNews.title}
          </h1>

          {/* Source Attribution */}
          <div className="mt-5 flex items-center justify-between border-b border-zinc-200/80 pb-6 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-zinc-950 font-bold">
                <Newspaper size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  UrDU Yoshlar Ittifoqi Matbuot Xizmati
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Rasmiy axborot portali • Urganch
                </p>
              </div>
            </div>

            {/* Share action */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-500" />
                    <span>Nusxalandi!</span>
                  </>
                ) : (
                  <>
                    <Share2 size={13} />
                    <span>Ulashish</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Lead Summary Callout */}
          <div className="mt-8 rounded-3xl border-l-4 border-emerald-500 bg-white/90 p-6 shadow-sm dark:bg-zinc-900/60 dark:border-emerald-400">
            <p className="text-base sm:text-lg font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">
              {currentNews.summary}
            </p>
          </div>

          {/* Body Content */}
          <div className="mt-8 space-y-5 text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            {currentNews.content ? (
              currentNews.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            ) : (
              <p>{currentNews.summary}</p>
            )}
          </div>

          {/* Key Highlights Card */}
          {currentNews.highlights && currentNews.highlights.length > 0 && (
            <div className="mt-10 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8 dark:bg-emerald-950/20">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                Asosiy Ko‘rsatkichlar va Faktlar:
              </h3>
              <ul className="mt-4 space-y-3">
                {currentNews.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-zinc-800 dark:text-zinc-200">
                    <CheckCircle2 size={18} className="mt-0.5 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Telegram Channel CTA */}
          <div className="mt-12 rounded-3xl border border-zinc-200/80 bg-white/90 p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/60 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Eng tezkor xabarlarni Telegram orqali kuzatib boring
              </h4>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Universitet yoshlar hayotining barcha fotolavalhalari va tanlov eʼlonlari rasmiy kanalda.
              </p>
            </div>

            <a
              href={socialLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 transition hover:bg-emerald-400 shadow-md shrink-0"
            >
              <Send size={15} />
              Telegram kanalga aʼzo bo‘lish
            </a>
          </div>
        </article>

        {/* Other Latest News Section */}
        <section className="mt-16 border-t border-zinc-200/80 pt-12 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Boshqa Yangiliklar
            </h2>
            <Link
              to="/yangiliklar"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Hammasini ko‘rish
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {otherNews.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm transition-all hover:border-emerald-500/50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/70"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-500">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {item.badge}
                    </span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="mt-2 text-sm font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                    {item.summary}
                  </p>
                </div>

                <Link
                  to={`/yangiliklar/${item.id}`}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  O‘qish
                  <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  )
}
