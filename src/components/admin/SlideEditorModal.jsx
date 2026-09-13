import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Sparkles, Image as ImageIcon } from 'lucide-react'

const SUGGESTED_TAGS = [
  'Yashil Makon',
  'Intellektual Yutuq',
  'IT & Dasturlash',
  'Madaniyat & Teatr',
  'Volontyorlik',
  'Global Taʼlim',
  'Talabalar Bahori',
  'Sport & Salomatlik',
]

export default function SlideEditorModal({ isOpen, onClose, onSave, editItem }) {
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('Yashil Makon')
  const [image, setImage] = useState('')

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title || '')
      setTag(editItem.tag || 'Yashil Makon')
      setImage(editItem.image || '')
    } else {
      setTitle('')
      setTag('Yashil Makon')
      setImage('')
    }
  }, [editItem, isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !image.trim()) return

    onSave({
      title: title.trim(),
      tag: tag.trim() || 'Yutuq',
      image: image.trim(),
    })
    onClose()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative my-8 w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 sm:p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <Sparkles size={18} />
              </span>
              <div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100">
                  {editItem ? 'Slaydni Tahrirlash' : 'Yangi Slayd Qo‘shish'}
                </h3>
                <p className="text-xs text-zinc-500">
                  Bosh sahifadagi vertikal rolikda ko‘rinadigan erishilgan yutuq / natija.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                Qisqa va Aniq Sarlavha *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masalan: 5,000+ Ko‘chat Ekish Aksiyasi"
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs text-zinc-900 outline-none focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            {/* Tag / Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                Tag / Soha Nomi
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Masalan: Yashil Makon yoki Intellektual Yutuq"
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs text-zinc-900 outline-none focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />

              {/* Quick Suggestions */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {SUGGESTED_TAGS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTag(t)}
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold transition cursor-pointer ${
                      tag === t
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-600 dark:text-emerald-300'
                        : 'border-zinc-200 bg-zinc-100 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Image URL */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Rasm URL yoki Fayl Havolasi *
                </label>
                <span className="text-[10px] text-zinc-500 font-medium">Masalan: /slide/photo_...jpg yoki https://</span>
              </div>
              <input
                type="text"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/slide/photo_...jpg yoki https://..."
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs text-zinc-900 outline-none focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />

              {/* Quick Slide Image Presets */}
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-semibold text-zinc-500">Slide papkasi rasmlari:</span>
                {[
                  { label: 'Forum & Taqdirlash', url: '/slide/photo_2026-08-19_17-46-57.jpg' },
                  { label: 'Tashakkurnoma', url: '/slide/photo_2026-08-19_17-46-56.jpg' },
                  { label: 'Yoshlar Anjumani', url: '/slide/photo_2026-09-03_14-24-19.jpg' },
                  { label: 'Loyihalar Taqdimoti', url: '/slide/photo_2026-09-13_00-08-45.jpg' },
                  { label: 'Yetakchilar Muloqoti', url: '/slide/photo_2026-09-03_14-24-20.jpg' },
                  { label: 'Kengash Majlisi', url: '/slide/photo_2026-08-19_17-45-29.jpg' },
                  { label: 'Katta Assambleya', url: '/slide/photo_2026-09-03_14-24-20-2.jpg' },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setImage(preset.url)}
                    className="rounded-full border border-zinc-200/90 bg-zinc-100 px-2.5 py-0.5 text-[10px] font-medium text-zinc-600 transition-colors hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-emerald-500/50 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
                  >
                    + {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Image Preview */}
            {image && (
              <div>
                <p className="text-[11px] font-bold text-zinc-500 mb-1">Rasm Preview:</p>
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950">
                  <img
                    src={image}
                    alt="Preview"
                    className="h-full w-full object-cover object-center"
                    onError={(e) => {
                      e.currentTarget.src = ''
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="text-[10px] font-bold text-emerald-400">{tag}</span>
                    <p className="text-sm font-bold truncate">{title || 'Sarlavha namoyishi'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl border border-zinc-300 px-5 py-2.5 text-xs font-bold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 transition cursor-pointer"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                className="rounded-2xl bg-emerald-500 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-emerald-400 shadow-md transition cursor-pointer"
              >
                {editItem ? 'O‘zgarishlarni Saqlash' : 'Slaydni Saqlash'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
