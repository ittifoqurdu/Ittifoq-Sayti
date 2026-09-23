import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  X,
  Compass,
  CheckCircle2,
  Send,
  Sparkles,
  Users,
  Award,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react'
import { socialLinks, profile } from '../../data/siteData'

export default function ClubDetailModal({ isOpen, onClose, club }) {
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

  if (!club) return null

  const IconComponent = club.icon || Compass
  const highlights = Array.isArray(club.highlights) ? club.highlights : []
  const bannerImage =
    club.image ||
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80'

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
            className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
          />

          {/* Modal Dialog Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-zinc-200/90 bg-[#FAF6F0] shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
          >
            {/* Header */}
            <div className="relative border-b border-zinc-200/80 bg-white/80 px-6 py-4 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80 sm:px-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                    <Sparkles size={13} />
                    {club.category || 'To‘garak & Klub'}
                  </span>
                  <span className="hidden sm:inline-block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    UrDU Yoshlar Ittifoqi
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full p-2 text-zinc-400 hover:bg-zinc-200/70 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors"
                  aria-label="Yopish"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-3 flex items-start gap-3.5">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-zinc-200/80 bg-white shadow-md dark:border-zinc-700 dark:bg-zinc-900"
                  style={{ color: club.color || '#38bdf8' }}
                >
                  <IconComponent size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
                    {club.title}
                  </h2>
                  <p className="mt-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                    {club.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* Banner Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-md">
                <img
                  src={bannerImage}
                  alt={club.title}
                  className="h-full w-full object-cover object-center"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white/90 text-xs">
                  <span className="font-semibold drop-shadow-md">UrDU Iqtidorli Talabalar Maydoni</span>
                  <span className="rounded-full bg-black/60 px-3 py-1 font-mono text-[11px] backdrop-blur-md">
                    {club.membershipBadge || 'Faol To‘garak'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="rounded-2xl border-l-4 border-cyan-500 bg-white/80 p-4 shadow-sm dark:bg-zinc-900/60">
                <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                  To‘garak haqida maʼlumot:
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {club.description}
                </p>
              </div>

              {/* Highlights & Benefits */}
              {highlights.length > 0 && (
                <div className="rounded-2xl border border-zinc-200/80 bg-white/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <Layers size={14} />
                    Imkoniyatlar va Asosiy yo‘nalishlar:
                  </h4>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 rounded-xl bg-zinc-100/70 dark:bg-zinc-800/60 px-3 py-2 text-xs font-medium text-zinc-800 dark:text-zinc-200"
                      >
                        <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Details & Criteria Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-2xl border border-zinc-200/80 bg-white/60 p-3.5 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
                  <Award size={18} className="mx-auto text-emerald-500" />
                  <p className="mt-1 text-xs font-bold text-zinc-900 dark:text-zinc-100">{club.price || '100% Bepul'}</p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{club.priceSubtext || 'Aʼzolik to‘lovi yo‘q'}</p>
                </div>

                <div className="rounded-2xl border border-zinc-200/80 bg-white/60 p-3.5 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
                  <Users size={18} className="mx-auto text-cyan-500" />
                  <p className="mt-1 text-xs font-bold text-zinc-900 dark:text-zinc-100">Barcha kurslar</p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400">1–4 kurs talabalari</p>
                </div>

                <div className="rounded-2xl border border-zinc-200/80 bg-white/60 p-3.5 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
                  <Calendar size={18} className="mx-auto text-amber-500" />
                  <p className="mt-1 text-xs font-bold text-zinc-900 dark:text-zinc-100">Haftalik</p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Darsdan bo‘sh vaqtda</p>
                </div>

                <div className="rounded-2xl border border-zinc-200/80 bg-white/60 p-3.5 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
                  <Sparkles size={18} className="mx-auto text-purple-500" />
                  <p className="mt-1 text-xs font-bold text-zinc-900 dark:text-zinc-100">Sertifikat</p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Faollik rag‘bati</p>
                </div>
              </div>
            </div>

            {/* Modal Footer with Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200/80 bg-white/80 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/80 sm:px-8">
              <a
                href={socialLinks.telegramBot || socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all active:scale-95"
              >
                <Send size={13} />
                <span>Safga qo‘shilish (Telegram)</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
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
