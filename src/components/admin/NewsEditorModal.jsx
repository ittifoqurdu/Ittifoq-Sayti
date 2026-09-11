import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  X,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Calendar,
  Clock,
  Plus,
  Trash2,
  Check,
  Link as LinkIcon,
  ExternalLink,
  Eye,
} from 'lucide-react'

const CATEGORIES = [
  'Eʼlon & Tanlov',
  'IT & Innovatsiya',
  'Intellektual O‘yin',
  'Madaniyat & Sanʼat',
  'Ijtimoiy Loyiha',
  'Xalqaro Grant',
  'Sport & Salomatlik',
]

const BADGES = [
  '🔴 Muhim Eʼlon',
  '🏆 G‘alaba',
  '💻 Xakaton',
  '🎭 Katta Festival',
  '🎓 Erasmus+ Grant',
  '📌 Yangi Eʼlon',
  '🚀 Startap',
  '⚡ Shoshilinch',
]

const SAMPLE_PRESET_IMAGES = [
  { label: 'Zakovat / Intellektual', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80' },
  { label: 'IT & Texnologiya', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Universitet & Talabalar', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Madaniyat & Sanʼat', url: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Xalqaro Grantlar', url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&auto=format&fit=crop&q=80' },
]

export default function NewsEditorModal({ isOpen, onClose, onSave, editItem = null }) {
  const fileInputRef = useRef(null)

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [badge, setBadge] = useState(BADGES[0])
  const [readTime, setReadTime] = useState('3 daqiqa')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [date, setDate] = useState('')
  const [actionUrl, setActionUrl] = useState('')
  const [actionLabel, setActionLabel] = useState('')
  const [highlights, setHighlights] = useState([''])
  const [error, setError] = useState('')

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title || '')
      setCategory(editItem.category || CATEGORIES[0])
      setBadge(editItem.badge || BADGES[0])
      setReadTime(editItem.readTime || '3 daqiqa')
      setSummary(editItem.summary || '')
      setContent(editItem.content || '')
      setImage(editItem.image || '')
      setDate(editItem.date || '')
      setActionUrl(editItem.actionUrl || '')
      setActionLabel(editItem.actionLabel || '')
      setHighlights(editItem.highlights?.length ? editItem.highlights : [''])
    } else {
      const today = new Date()
      const months = [
        'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
        'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
      ]
      setTitle('')
      setCategory(CATEGORIES[0])
      setBadge(BADGES[0])
      setReadTime('3 daqiqa')
      setSummary('')
      setContent('')
      setImage('')
      setDate(`${today.getDate()}-${months[today.getMonth()]}, ${today.getFullYear()}`)
      setActionUrl('https://t.me/urdu_ittifoq_bot')
      setActionLabel('Telegram botda qatnashish')
      setHighlights([''])
    }
    setError('')
  }, [editItem, isOpen])

  if (!isOpen) return null

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 4 * 1024 * 1024) {
      setError('Rasm hajmi juda katta (maksimal 4 MB). Iltimos, ixchamroq rasm tanlang.')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result)
        setError('')
      }
    }
    reader.readAsDataURL(file)
  }

  const handleAddHighlight = () => {
    setHighlights((prev) => [...prev, ''])
  }

  const handleUpdateHighlight = (index, value) => {
    setHighlights((prev) => {
      const copy = [...prev]
      copy[index] = value
      return copy
    })
  }

  const handleRemoveHighlight = (index) => {
    setHighlights((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) {
      setError('Iltimos, eʼlon sarlavhasini kiriting!')
      return
    }

    if (!summary.trim()) {
      setError('Iltimos, qisqa tavsifni kiriting!')
      return
    }

    const cleanHighlights = highlights.map((h) => h.trim()).filter(Boolean)

    const payload = {
      title: title.trim(),
      category: category.trim(),
      badge: badge.trim(),
      readTime: readTime.trim() || '3 daqiqa',
      summary: summary.trim(),
      content: content.trim() || summary.trim(),
      image: image.trim(),
      date: date.trim(),
      actionUrl: actionUrl.trim(),
      actionLabel: actionLabel.trim(),
      highlights: cleanHighlights,
    }

    onSave(payload)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-3 sm:p-5 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="relative my-6 w-full max-w-4xl overflow-hidden rounded-3xl border border-zinc-200/90 bg-[#F5F0E8] shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 max-h-[92vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-200/80 bg-white/70 px-6 py-4 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80 sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Sparkles size={18} />
            </span>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {editItem ? 'Eʼlonni Tahrirlash' : 'Yangi Eʼlon / Yangilik Qo‘shish'}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                16:9 yotiq rasm, sarlavha va batafsil maʼlumotlarni kiritish
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200/70 text-zinc-600 transition hover:bg-zinc-300 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body with Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1">
          {error && (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs font-semibold text-rose-600 dark:text-rose-400">
              {error}
            </div>
          )}

          {/* 1. 16:9 Landscape Cover Image Section */}
          <div className="rounded-3xl border border-zinc-200/90 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                <ImageIcon size={15} className="text-emerald-600 dark:text-emerald-400" />
                16:9 Yotiq Ekran O‘lchamidagi Rasm (Landscape Cover)
              </label>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                Standart: 16:9 nisbat
              </span>
            </div>

            {/* Live 16:9 Aspect Ratio Preview */}
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-100/90 dark:border-zinc-700 dark:bg-zinc-950/80 shadow-inner group">
              {image ? (
                <>
                  <img
                    src={image}
                    alt="16:9 Preview"
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-4 sm:p-6 text-white">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-bold text-zinc-950 shadow-md">
                        {badge}
                      </span>
                      <span className="text-xs bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-zinc-200">
                        16:9 Jonli Ko‘rinish
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                        {category}
                      </span>
                      <p className="mt-1 text-base sm:text-lg font-bold line-clamp-2 drop-shadow-md">
                        {title || 'Sarlavha shu yerda ko‘rinadi'}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-zinc-400">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-200/80 dark:bg-zinc-800 mb-3 text-zinc-500">
                    <ImageIcon size={28} />
                  </div>
                  <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                    Hozircha rasm tanlanmagan
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 max-w-sm">
                    Quyidagi tugma orqali kompyuterdan yuklang yoki internetdan rasm havolasini kiriting.
                  </p>
                </div>
              )}
            </div>

            {/* Image Input Controls */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3 items-center">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white transition-all shrink-0 cursor-pointer shadow-sm"
              >
                <Upload size={14} />
                Kompyuterdan Rasm Yuklash
              </button>

              <div className="relative w-full">
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Yoki to‘g‘ridan-to‘g‘ri rasm havolasini (URL) qo‘ying..."
                  className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>

              {image && (
                <button
                  type="button"
                  onClick={() => setImage('')}
                  title="Rasmni tozalash"
                  className="rounded-xl border border-zinc-300 p-2.5 text-zinc-500 hover:bg-rose-50 hover:text-rose-600 dark:border-zinc-700 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 transition"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            {/* Quick preset suggestions */}
            <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-200/70 dark:border-zinc-800">
              <span className="text-[11px] font-semibold text-zinc-500">Tayyor rasmlar:</span>
              {SAMPLE_PRESET_IMAGES.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setImage(preset.url)}
                  className="rounded-full border border-zinc-300/80 bg-zinc-100/90 px-3 py-1 text-[11px] font-medium text-zinc-700 hover:border-emerald-500 hover:bg-white hover:text-emerald-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Sarlavha & Kategoriya & Nishon */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                Eʼlon / Yangilik Sarlavhasi *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masalan: Yosh Dasturchilar Uchun 'UrDU Tech Hackathon 2026' Start Olyapti"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                Kategoriya
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs font-medium text-zinc-900 outline-none transition focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-100"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                Nishon (Badge)
              </label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs font-medium text-zinc-900 outline-none transition focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-100"
              >
                {BADGES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                Sana
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Masalan: 15-Sentabr, 2026"
                  className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 outline-none transition focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-100"
                />
                <Calendar size={14} className="absolute right-3 top-3 text-zinc-400" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                O‘qish vaqti
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="3 daqiqa"
                  className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 outline-none transition focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-100"
                />
                <Clock size={14} className="absolute right-3 top-3 text-zinc-400" />
              </div>
            </div>
          </div>

          {/* 3. Qisqa Tavsif (Summary) */}
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
              Qisqa Tavsif (Bosh sahifa va kartochkalar uchun) *
            </label>
            <textarea
              required
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Eʼlonning mohiyati haqida 1-2 jumlali qisqa va qiziqarli maʼlumot..."
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-xs leading-relaxed text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-100"
            />
          </div>

          {/* 4. Batafsil Matn (Full Content) */}
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
              Batafsil Maqola / Eʼlon Matni
            </label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Batafsil maʼlumotlar: tanlov shartlari, talablar, bosqichlar, qatnashish tartibi..."
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-xs leading-relaxed text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-100 font-mono"
            />
          </div>

          {/* 5. Asosiy Faktlar / Punktlar (Highlights) */}
          <div className="rounded-2xl border border-zinc-200/90 bg-white/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                Asosiy Maʼlumotlar / Punktlar (Highlights)
              </label>
              <button
                type="button"
                onClick={handleAddHighlight}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 cursor-pointer"
              >
                <Plus size={14} />
                Punkt qo‘shish
              </button>
            </div>

            <div className="space-y-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-500">•</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleUpdateHighlight(idx, e.target.value)}
                    placeholder="Masalan: Mukofot jamg‘armasi: 50,000,000 so‘m"
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-900 outline-none focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                  />
                  {highlights.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveHighlight(idx)}
                      className="text-zinc-400 hover:text-rose-500 transition p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 6. Ixtiyoriy Harakat Havolasi (Action URL) */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                Havola (Telegram bot yoki ro‘yxatdan o‘tish)
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={actionUrl}
                  onChange={(e) => setActionUrl(e.target.value)}
                  placeholder="https://t.me/urdu_ittifoq_bot"
                  className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 outline-none transition focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-100"
                />
                <LinkIcon size={14} className="absolute right-3 top-3 text-zinc-400" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                Tugma matni
              </label>
              <input
                type="text"
                value={actionLabel}
                onChange={(e) => setActionLabel(e.target.value)}
                placeholder="Telegram botda qatnashish"
                className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 outline-none transition focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-100"
              />
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="border-t border-zinc-200/80 pt-4 flex items-center justify-end gap-3 dark:border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-zinc-300 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-700 hover:bg-zinc-200 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 transition cursor-pointer"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-emerald-400 shadow-md transition cursor-pointer"
            >
              <Check size={15} />
              {editItem ? 'O‘zgarishlarni Saqlash' : 'Eʼlonni Chop Etish'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
