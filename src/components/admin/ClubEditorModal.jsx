import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Sparkles, Plus, Trash2, Palette, Upload, Image as ImageIcon } from 'lucide-react'
import { compressImage } from '../../lib/imageCompressor'

const COLOR_OPTIONS = [
  { label: 'Moviy / Cyan', value: '#38bdf8', gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent' },
  { label: 'Zumrad / Yashil', value: '#34d399', gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent' },
  { label: 'Qahrabo / Sariq', value: '#fbbf24', gradient: 'from-amber-500/20 via-orange-500/10 to-transparent' },
  { label: 'Qizil / Pushti', value: '#f43f5e', gradient: 'from-rose-500/20 via-pink-500/10 to-transparent' },
  { label: 'Binafsha', value: '#c084fc', gradient: 'from-purple-500/20 via-violet-500/10 to-transparent' },
  { label: 'Indigo / Ko‘k', value: '#818cf8', gradient: 'from-indigo-500/20 via-sky-500/10 to-transparent' },
]

export default function ClubEditorModal({ isOpen, onClose, onSave, editItem }) {
  const fileInputRef = useRef(null)
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('To‘garak')
  const [color, setColor] = useState('#38bdf8')
  const [gradient, setGradient] = useState('from-blue-500/20 via-cyan-500/10 to-transparent')
  const [highlights, setHighlights] = useState(['', '', ''])
  const [image, setImage] = useState('')
  const [isCompressing, setIsCompressing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    setValidationError('')
    setIsSaving(false)
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

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

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsCompressing(true)
      setValidationError('')
      const compressed = await compressImage(file, 800, 500, 0.68)
      setImage(compressed)
    } catch {
      alert('Rasmni yuklashda xatolik yuz berdi. Iltimos, boshqa rasm tanlang.')
    } finally {
      setIsCompressing(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setValidationError('Iltimos, klub yoki to‘garak nomini kiriting!')
      return
    }

    try {
      setIsSaving(true)
      setValidationError('')
      await onSave({
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
    } catch (err) {
      setValidationError(err.message || 'Saqlashda xatolik yuz berdi')
    } finally {
      setIsSaving(false)
    }
  }

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
            <div className="flex items-center gap-2.5">
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
              className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden w-full relative">
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 w-full">
              <div className="max-w-4xl mx-auto space-y-6">
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

            {/* Banner Image & Computer Upload */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <ImageIcon size={14} className="text-cyan-500" />
                  Klub / To‘garak Banner Rasmi *
                </label>
                <span className="text-[10px] text-zinc-500 font-medium">16:9 nisbat tavsiya etiladi</span>
              </div>

              {/* Live Preview Box */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-950 shadow-inner group">
                {image ? (
                  <>
                    <img
                      src={image}
                      alt="Banner Preview"
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = ''
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                      <span className="text-[10px] font-bold text-cyan-400">{category}</span>
                      <p className="text-sm font-bold truncate">{title || 'To‘garak sarlavhasi'}</p>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center text-zinc-400">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-200/80 dark:bg-zinc-800 mb-2 text-zinc-500">
                      <ImageIcon size={24} />
                    </div>
                    <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      Hozircha banner rasm yuklanmagan
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      Quyidagi tugma orqali kompyuteringizdan rasm tanlang yoki havolasini kiriting.
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
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="/slide/...jpg yoki https://..."
                    className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
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

              {/* Quick banner preset chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
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
                    className="rounded-full border border-zinc-200/90 bg-zinc-100 px-2.5 py-0.5 text-[10px] font-medium text-zinc-600 transition-colors hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-cyan-500/50 dark:hover:bg-cyan-950/40 dark:hover:text-cyan-300 cursor-pointer"
                  >
                    + {preset.label}
                  </button>
                ))}
              </div>
            </div>

              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex-shrink-0 flex items-center justify-between gap-3 p-4 sm:px-6 border-t border-zinc-200/80 bg-white dark:bg-zinc-950 dark:border-zinc-800 z-20">
              {validationError ? (
                <p className="text-xs font-semibold text-rose-500">{validationError}</p>
              ) : (
                <span />
              )}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-2xl border border-zinc-300 px-5 py-2.5 text-xs font-bold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 transition cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={isCompressing || isSaving}
                  className="rounded-2xl bg-cyan-500 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-cyan-400 shadow-md transition cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? 'Saqlanmoqda...' : editItem ? 'O‘zgarishlarni Saqlash' : 'Klubni Saqlash'}
                </button>
              </div>
            </div>

          </form>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  )
}
