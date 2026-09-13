import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Sparkles, Plus, Trash2, Palette } from 'lucide-react'

const COLOR_OPTIONS = [
  { label: 'Moviy / Cyan', value: '#38bdf8', gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent' },
  { label: 'Zumrad / Yashil', value: '#34d399', gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent' },
  { label: 'Qahrabo / Sariq', value: '#fbbf24', gradient: 'from-amber-500/20 via-orange-500/10 to-transparent' },
  { label: 'Qizil / Pushti', value: '#f43f5e', gradient: 'from-rose-500/20 via-pink-500/10 to-transparent' },
  { label: 'Binafsha', value: '#c084fc', gradient: 'from-purple-500/20 via-violet-500/10 to-transparent' },
  { label: 'Indigo / Ko‘k', value: '#818cf8', gradient: 'from-indigo-500/20 via-sky-500/10 to-transparent' },
]

export default function ClubEditorModal({ isOpen, onClose, onSave, editItem }) {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('To‘garak')
  const [color, setColor] = useState('#38bdf8')
  const [gradient, setGradient] = useState('from-blue-500/20 via-cyan-500/10 to-transparent')
  const [highlights, setHighlights] = useState(['', '', ''])
  const [image, setImage] = useState('')

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title || '')
      setSubtitle(editItem.subtitle || '')
      setDescription(editItem.description || '')
      setCategory(editItem.category || 'To‘garak')
      setColor(editItem.color || '#38bdf8')
      setGradient(editItem.gradient || 'from-blue-500/20 via-cyan-500/10 to-transparent')
      setHighlights(
        Array.isArray(editItem.highlights) && editItem.highlights.length > 0
          ? editItem.highlights
          : ['', '', '']
      )
      setImage(editItem.image || '')
    } else {
      setTitle('')
      setSubtitle('')
      setDescription('')
      setCategory('To‘garak')
      setColor('#38bdf8')
      setGradient('from-blue-500/20 via-cyan-500/10 to-transparent')
      setHighlights(['', '', ''])
      setImage('')
    }
  }, [editItem, isOpen])

  if (!isOpen) return null

  const handleColorSelect = (opt) => {
    setColor(opt.value)
    setGradient(opt.gradient)
  }

  const handleHighlightChange = (idx, val) => {
    const updated = [...highlights]
    updated[idx] = val
    setHighlights(updated)
  }

  const handleAddHighlight = () => {
    if (highlights.length < 6) {
      setHighlights([...highlights, ''])
    }
  }

  const handleRemoveHighlight = (idx) => {
    setHighlights(highlights.filter((_, i) => i !== idx))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    onSave({
      title: title.trim(),
      subtitle: subtitle.trim(),
      description: description.trim(),
      category: category.trim(),
      color,
      gradient,
      highlights: highlights.map((h) => h.trim()).filter(Boolean),
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
          className="relative my-8 w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 sm:p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400">
                <Sparkles size={18} />
              </span>
              <div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100">
                  {editItem ? 'Klub / To‘garakni Tahrirlash' : 'Yangi Klub yoki To‘garak Qo‘shish'}
                </h3>
                <p className="text-xs text-zinc-500">
                  Klub maʼlumotlari portalning "Klublar va to‘garaklar" sahifasida ko‘rinadi.
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
                Klub / To‘garak Nomi *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masalan: 'IT & Sunʼiy Intellekt' yoki 'Yoshlar Notiqlik Klubi'"
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs text-zinc-900 outline-none focus:border-cyan-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            {/* Subtitle / Yo'nalish */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                Qisqa Quyi Sarlavha (Yo‘nalishi)
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Masalan: Dasturlash, robototexnika va xakatonlar"
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs text-zinc-900 outline-none focus:border-cyan-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                Batafsil Tavsif
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="To‘garakning talabalar uchun beradigan afzalliklari, mashg‘ulotlar va maqsadlari..."
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs text-zinc-900 outline-none focus:border-cyan-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            {/* Color Accent Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                <Palette size={13} className="inline mr-1" />
                Dizayn Rangi (Rang sxemasi)
              </label>
              <div className="flex flex-wrap gap-2">
                {COLOR_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleColorSelect(opt)}
                    className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                      color === opt.value
                        ? 'border-cyan-500 bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 ring-2 ring-cyan-500/30'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300'
                    }`}
                  >
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: opt.value }} />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Highlights (Yutuqlar / Mashg'ulot yo'nalishlari) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Asosiy Yutuq / Imkoniyatlar (Taglar)
                </label>
                {highlights.length < 6 && (
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                  >
                    <Plus size={12} /> Qo‘shish
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleHighlightChange(idx, e.target.value)}
                      placeholder={`Imkoniyat ${idx + 1}...`}
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-900 outline-none focus:border-cyan-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                    />
                    {highlights.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(idx)}
                        className="p-1 text-zinc-400 hover:text-rose-500"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Banner Image URL & Quick Presets */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Klub / To‘garak Banner Rasmi URL *
                </label>
                <span className="text-[10px] text-zinc-500 font-medium">16:9 nisbat tavsiya etiladi</span>
              </div>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/slide/photo_...jpg yoki https://..."
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs text-zinc-900 outline-none focus:border-cyan-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />

              {/* Quick banner preset chips */}
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-semibold text-zinc-500">Tayyor bannerlar:</span>
                {[
                  { label: 'Ilm-fan', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&auto=format&fit=crop&q=80' },
                  { label: 'IT & Kodlash', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80' },
                  { label: 'Zakovat', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80' },
                  { label: 'Volontyorlik', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80' },
                  { label: 'Madaniyat', url: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=1200&auto=format&fit=crop&q=80' },
                  { label: 'Sport', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80' },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setImage(preset.url)}
                    className="rounded-full border border-zinc-200/90 bg-zinc-100 px-2.5 py-0.5 text-[10px] font-medium text-zinc-600 transition-colors hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-cyan-500/50 dark:hover:bg-cyan-950/40 dark:hover:text-cyan-300"
                  >
                    + {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Banner Preview */}
            {image && (
              <div>
                <p className="text-[11px] font-bold text-zinc-500 mb-1">Banner Preview:</p>
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950">
                  <img
                    src={image}
                    alt="Banner Preview"
                    className="h-full w-full object-cover object-center"
                    onError={(e) => {
                      e.currentTarget.src = ''
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="text-[10px] font-bold text-cyan-400">{category}</span>
                    <p className="text-sm font-bold truncate">{title || 'To‘garak sarlavhasi'}</p>
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
                className="rounded-2xl bg-cyan-500 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-cyan-400 shadow-md transition cursor-pointer"
              >
                {editItem ? 'O‘zgarishlarni Saqlash' : 'Klubni Saqlash'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
