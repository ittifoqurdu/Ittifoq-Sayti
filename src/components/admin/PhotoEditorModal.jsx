import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Camera, Image as ImageIcon, Upload, Trash2, Calendar, Tag, Check } from 'lucide-react'
import { compressImage } from '../../lib/imageCompressor'

const SUGGESTED_CATEGORIES = [
  'Talabalar hayoti',
  'Universitet tadbirlari',
  'Forum & Konferensiya',
  'Sport musobaqalari',
  'Zakovat & Intellekt',
  'Madaniyat & Teatr',
  'Yetakchilar kengashi',
]

export default function PhotoEditorModal({ isOpen, onClose, onSave, editItem }) {
  const fileInputRef = useRef(null)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Talabalar hayoti')
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [image, setImage] = useState('')
  const [isCompressing, setIsCompressing] = useState(false)

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title || '')
      setCategory(editItem.category || 'Talabalar hayoti')
      setDate(editItem.date || new Date().toISOString().split('T')[0])
      setImage(editItem.image || '')
    } else {
      setTitle('')
      setCategory('Talabalar hayoti')
      setDate(new Date().toISOString().split('T')[0])
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
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsCompressing(true)
      const compressed = await compressImage(file, 1600, 1200, 0.8)
      setImage(compressed)
    } catch {
      alert('Rasmni yuklashda xatolik yuz berdi. Iltimos, boshqa rasm tanlang.')
    } finally {
      setIsCompressing(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!image.trim()) {
      alert('Iltimos, rasm kiriting yoki yuklang!')
      return
    }

    onSave({
      title: title.trim() || 'UrDU Yoshlar Ittifoqi',
      category: category.trim() || 'Talabalar hayoti',
      date: date.trim() || new Date().toISOString().split('T')[0],
      image: image.trim(),
    })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden my-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 bg-zinc-50/50 dark:bg-zinc-900/50">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  <Camera size={20} />
                </span>
                <div>
                  <h3 className="text-base font-black text-zinc-900 dark:text-zinc-100">
                    {editItem ? 'Fotolavhani Tahrirlash' : 'Yangi Fotolavha Qo‘shish'}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Ittifoq hayoti va galereya sahifasiga joylanadigan jonli fotosurat
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Photo Source: Upload or URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                  Fotosurat * (Fayl yuklash yoki URL)
                </label>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      required
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://... yoki /img/... yoki fayl tanlang"
                      className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                    />
                  </div>
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={isCompressing}
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 px-4 py-2.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 transition cursor-pointer"
                    >
                      <Upload size={14} />
                      <span>{isCompressing ? 'Siqilmoqda...' : 'Fayl tanlash'}</span>
                    </button>
                  </div>
                </div>

                {/* Image Preview Box */}
                {image && (
                  <div className="mt-3 relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 h-52 sm:h-64 flex items-center justify-center group">
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = '/img/logo-oq1.png'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setImage('')}
                      className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg hover:bg-rose-700 transition cursor-pointer opacity-90 hover:opacity-100"
                      title="Rasmni olib tashlash"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Title / Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                  Sarlavha / Izoh (ixtiyoriy)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Masalan: UrDU Yoshlar forumi va taqdirlash marosimi"
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>

              {/* Category & Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                    Bo‘lim / Kategoriya
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Masalan: Talabalar hayoti"
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                  />
                  {/* Category chips */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {SUGGESTED_CATEGORIES.slice(0, 4).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCategory(c)}
                        className={`rounded-lg px-2 py-0.5 text-[10px] font-semibold transition cursor-pointer ${
                          category === c
                            ? 'bg-amber-500 text-zinc-950'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                    Sana
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                  />
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 px-5 py-2.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={!image.trim()}
                  className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 px-6 py-2.5 text-xs font-extrabold text-zinc-950 shadow-md shadow-amber-500/20 hover:bg-amber-400 disabled:opacity-50 disabled:pointer-events-none transition cursor-pointer"
                >
                  <Check size={14} />
                  <span>{editItem ? 'O‘zgarishlarni Saqlash' : 'Fotolavhani Qo‘shish'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
