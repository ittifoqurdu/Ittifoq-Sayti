import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Sparkles, Image as ImageIcon, Upload, Trash2 } from 'lucide-react'
import { compressImage } from '../../lib/imageCompressor'

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
  const fileInputRef = useRef(null)
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('Yashil Makon')
  const [image, setImage] = useState('')
  const [isCompressing, setIsCompressing] = useState(false)

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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsCompressing(true)
      const compressed = await compressImage(file, 1200, 800, 0.75)
      setImage(compressed)
    } catch {
      alert('Rasmni yuklashda xatolik yuz berdi. Iltimos, boshqa rasm tanlang.')
    } finally {
      setIsCompressing(false)
    }
  }

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

  // Remove early return, AnimatePresence needs it
  // if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
      <div className="fixed inset-0 z-[100] bg-white dark:bg-zinc-950 flex flex-col overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="flex flex-col h-full w-full relative"
        >
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between border-b border-zinc-200/80 bg-white/85 px-6 py-4 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/85 z-20">
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
              className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden w-full relative">
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 w-full">
              <div className="max-w-3xl mx-auto space-y-5">
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

            {/* Image URL & Computer Upload */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <ImageIcon size={14} className="text-emerald-500" />
                  Slayd Rasmi *
                </label>
                <span className="text-[10px] text-zinc-500 font-medium">16:9 nisbat tavsiya etiladi</span>
              </div>

              {/* Live Image Preview */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-950 shadow-inner group">
                {image ? (
                  <>
                    <img
                      src={image}
                      alt="Preview"
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = ''
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                      <span className="text-[10px] font-bold text-emerald-400">{tag}</span>
                      <p className="text-sm font-bold truncate">{title || 'Sarlavha namoyishi'}</p>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center text-zinc-400">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-200/80 dark:bg-zinc-800 mb-2 text-zinc-500">
                      <ImageIcon size={24} />
                    </div>
                    <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      Hozircha slayd rasmi tanlanmagan
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      Quyidagi tugma orqali kompyuterdan rasm yuklang yoki havolasini kiriting.
                    </p>
                  </div>
                )}
              </div>

              {/* Upload controls */}
              <div className="flex flex-col sm:flex-row gap-2.5 items-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={isCompressing}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white transition-all shrink-0 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <Upload size={14} />
                  <span>{isCompressing ? 'Yuklanmoqda...' : 'Kompyuterdan Rasm Yuklash'}</span>
                </button>

                <div className="relative w-full">
                  <input
                    type="text"
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="/slide/...jpg yoki https://..."
                    className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                  />
                </div>

                {image && (
                  <button
                    type="button"
                    onClick={() => setImage('')}
                    title="Rasmni tozalash"
                    className="rounded-xl border border-zinc-300 p-2.5 text-zinc-500 hover:bg-rose-50 hover:text-rose-600 dark:border-zinc-700 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 transition cursor-pointer"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>

              {/* Quick Slide Image Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
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
                    className="rounded-full border border-zinc-200/90 bg-zinc-100 px-2.5 py-0.5 text-[10px] font-medium text-zinc-600 transition-colors hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-emerald-500/50 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300 cursor-pointer"
                  >
                    + {preset.label}
                  </button>
                ))}
              </div>
            </div>

              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex-shrink-0 flex items-center justify-end gap-3 p-4 sm:px-6 border-t border-zinc-200/80 bg-white dark:bg-zinc-950 dark:border-zinc-800 z-20">
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl border border-zinc-300 px-5 py-2.5 text-xs font-bold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 transition cursor-pointer"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                disabled={isCompressing}
                className="rounded-2xl bg-emerald-500 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-emerald-400 shadow-md transition cursor-pointer disabled:opacity-50"
              >
                {editItem ? 'O‘zgarishlarni Saqlash' : 'Slaydni Saqlash'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  )
}
