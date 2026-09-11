import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  X,
  CalendarDays,
  Clock,
  Sparkles,
  Share2,
  Send,
  CheckCircle2,
  Newspaper,
  ArrowRight,
} from 'lucide-react'
import { socialLinks } from '../../data/siteData'

export default function NewsDetailModal({ isOpen, onClose, newsItem }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!newsItem) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-5 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-[#FAF6F0] shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
          >
            {/* Modal Header */}
            <div className="relative border-b border-zinc-200/80 bg-white/70 px-6 py-5 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/60 sm:px-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                    <Sparkles size={12} />
                    {newsItem.badge}
                  </span>
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {newsItem.category}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full p-2 text-zinc-400 hover:bg-zinc-200/60 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors"
                  aria-label="Yopish"
                >
                  <X size={20} />
                </button>
              </div>

              <h2 className="mt-3 text-xl font-bold leading-snug tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
                {newsItem.title}
              </h2>

              <div className="mt-3 flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={13} className="text-emerald-500" />
                  {newsItem.date}
                </span>
                {newsItem.readTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-cyan-500" />
                    {newsItem.readTime}
                  </span>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-5">
              {/* Summary Lead */}
              <div className="rounded-2xl border-l-4 border-emerald-500 bg-white/80 p-4 shadow-sm dark:bg-zinc-900/60">
                <p className="text-sm font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">
                  {newsItem.summary}
                </p>
              </div>

              {/* Full Content */}
              <div className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 space-y-4">
                {newsItem.content ? (
                  newsItem.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))
                ) : (
                  <p>{newsItem.summary}</p>
                )}
              </div>

              {/* Key Highlights */}
              {newsItem.highlights && newsItem.highlights.length > 0 && (
                <div className="rounded-2xl border border-zinc-200/80 bg-white/60 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Asosiy maʼlumotlar:
                  </h4>
                  <ul className="mt-2 space-y-2">
                    {newsItem.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 size={14} className="mt-0.5 text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200/80 bg-white/70 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/60 sm:px-8">
              <a
                href={socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-zinc-950 transition hover:bg-emerald-400"
              >
                <Send size={13} />
                Telegram kanalda o‘qish
              </a>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-zinc-900 px-5 py-2 text-xs font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
              >
                Yopish
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
