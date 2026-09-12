import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  LogOut,
  Sparkles,
  Newspaper,
  Calendar,
  Image as ImageIcon,
  KeyRound,
  Shield,
  Sun,
  Moon,
  Home,
  CheckCircle2,
  Table,
} from 'lucide-react'
import { useNews } from '../../context/NewsContext'
import { useTheme } from '../../context/ThemeContext'
import NewsEditorModal from './NewsEditorModal'
import { profile } from '../../data/siteData'
import { GOOGLE_SPREADSHEET_URL } from '../../lib/googleSheetsClient'

export default function AdminDashboard() {
  const { isDark, toggleTheme } = useTheme()
  const {
    newsList,
    isSyncing,
    syncFromSheet,
    adminLogout,
    addNews,
    updateNews,
    deleteNews,
    resetToDefaults,
    exportJson,
    changeAdminPassword,
  } = useNews()

  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('Barchasi')
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [toast, setToast] = useState('')
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const filteredNews = useMemo(() => {
    return newsList.filter((item) => {
      const matchesCat = filterCategory === 'Barchasi' || item.category === filterCategory
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCat && matchesSearch
    })
  }, [newsList, filterCategory, searchQuery])

  const categories = useMemo(() => {
    const set = new Set(newsList.map((n) => n.category))
    return ['Barchasi', ...Array.from(set)]
  }, [newsList])

  const handleOpenAddModal = () => {
    setEditingItem(null)
    setIsEditorOpen(true)
  }

  const handleOpenEditModal = (item) => {
    setEditingItem(item)
    setIsEditorOpen(true)
  }

  const handleSaveNews = async (payload) => {
    if (editingItem) {
      await updateNews(editingItem.id, payload)
      showToast('Eʼlon Google Sheets’da yangilandi!')
    } else {
      await addNews(payload)
      showToast('Yangi eʼlon Google Sheets’ga muvaffaqiyatli saqlandi!')
    }
  }

  const handleDeleteNews = async (id, title) => {
    if (window.confirm(`Rostdan ham "${title}" eʼlonini o‘chirmoqchimisiz?`)) {
      await deleteNews(id)
      showToast('Eʼlon Google Sheets’dan o‘chirildi!')
    }
  }

  const handleResetDefaults = () => {
    if (window.confirm('Barcha yangiliklarni dastlabki holatiga qaytarmoqchimisiz? Kiritilgan yangiliklar o‘chishi mumkin.')) {
      resetToDefaults()
      showToast('Boshlang‘ich holatga qaytarildi!')
    }
  }

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(exportJson())
      showToast('Barcha yangiliklar JSON kodi nusxalandi!')
    } catch {
      showToast('Nusxalashda xatolik yuz berdi')
    }
  }

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault()
    setPasswordError('')
    const res = changeAdminPassword(oldPassword, newPassword)
    if (res.success) {
      showToast('Admin paroli muvaffaqiyatli o‘zgartirildi!')
      setIsPasswordModalOpen(false)
      setOldPassword('')
      setNewPassword('')
    } else {
      setPasswordError(res.error || 'Xatolik yuz berdi')
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] dark:bg-[#07090d] text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-7">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src={isDark ? '/img/logo-oq.png' : '/img/logo-oq1.png'}
                alt="UrDU Yoshlar Ittifoqi"
                className="h-7 w-auto object-contain"
              />
              <span className="text-sm font-black tracking-tight text-zinc-900 dark:text-zinc-100 hidden sm:inline">
                Admin Panel
              </span>
            </Link>
            <span className="hidden md:inline text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
              Eʼlonlar & Yangiliklar Boshqaruvi
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={GOOGLE_SPREADSHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-500 hover:text-zinc-950 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300 dark:hover:bg-emerald-500 dark:hover:text-zinc-950 transition cursor-pointer shrink-0"
              title="Google Sheets jadvalini ochish (Murojaatlar va Yangiliklar)"
            >
              <Table size={13} />
              <span className="hidden md:inline">Google Sheets Baza</span>
              <ExternalLink size={11} />
            </a>

            <button
              type="button"
              onClick={syncFromSheet}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300/80 bg-zinc-100/90 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-white hover:text-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition cursor-pointer"
              title="Google Sheets bilan sinxronlash"
            >
              <RefreshCw size={13} className={isSyncing ? 'animate-spin text-emerald-500' : ''} />
              <span className="hidden lg:inline">{isSyncing ? 'Sinxronlanmoqda...' : 'Sinxronlash'}</span>
            </button>

            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300/80 bg-zinc-100/90 px-3.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-white hover:text-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition cursor-pointer shrink-0"
            >
              <Home size={14} />
              <span className="hidden sm:inline">Saytni ko‘rish</span>
            </Link>

            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300/80 bg-zinc-100/90 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
            >
              {isDark ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-emerald-600" />}
            </button>

            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300/80 bg-zinc-100/90 text-zinc-700 hover:text-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
              title="Parolni o‘zgartirish"
            >
              <KeyRound size={15} />
            </button>

            <button
              type="button"
              onClick={adminLogout}
              className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3.5 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-500/20 dark:text-rose-400 transition cursor-pointer shrink-0"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Chiqish</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-7">
        {/* KPI Counter Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Jami Maqola & Eʼlonlar</p>
            <p className="mt-2 text-3xl font-black text-emerald-600 dark:text-emerald-400">{newsList.length}</p>
            <p className="mt-1 text-[11px] text-zinc-400">Portalda faol ko‘rinayotgan materiallar</p>
          </div>

          <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">16:9 Rasmli Eʼlonlar</p>
            <p className="mt-2 text-3xl font-black text-blue-600 dark:text-blue-400">
              {newsList.filter((n) => n.image).length}
            </p>
            <p className="mt-1 text-[11px] text-zinc-400">Yotiq ekran o‘lchamidagi rasmlar bilan</p>
          </div>

          <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Kategoriyalar Soni</p>
            <p className="mt-2 text-3xl font-black text-purple-600 dark:text-purple-400">{categories.length - 1}</p>
            <p className="mt-1 text-[11px] text-zinc-400">IT, Zakovat, Tanlovlar, Grantlar</p>
          </div>

          <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Tezkor Amallar</p>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">Zaxiralash va eksport</p>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={handleCopyJson}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 text-xs font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition"
              >
                <Copy size={13} />
                JSON Nusxalash
              </button>
              <button
                type="button"
                onClick={handleResetDefaults}
                className="inline-flex items-center justify-center rounded-xl bg-zinc-100 hover:bg-rose-50 px-3 py-1.5 text-xs font-bold text-zinc-600 hover:text-rose-600 dark:bg-zinc-800 dark:text-zinc-300 transition"
                title="Boshlang‘ich holatga qaytarish"
              >
                <RefreshCw size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Action Bar (Search, Category, Add button) */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[240px] max-w-md">
              <Search size={15} className="absolute left-3.5 top-3 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Eʼlon sarlavhasi yoki tavsifi bo‘yicha qidiruv..."
                className="w-full rounded-2xl border border-zinc-200 bg-white pl-9 pr-4 py-2.5 text-xs text-zinc-900 outline-none transition focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-zinc-800 outline-none focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-emerald-400 shadow-md hover:shadow-emerald-500/25 transition active:scale-98 cursor-pointer shrink-0"
          >
            <Plus size={16} />
            Yangi Eʼlon / Yangilik Qo‘shish
          </button>
        </div>

        {/* News Cards Grid */}
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-white/95 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60"
            >
              <div>
                {/* 16:9 Thumbnail Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-950 mb-4 border border-zinc-200/70 dark:border-zinc-800">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-zinc-400 flex-col gap-1">
                      <ImageIcon size={24} />
                      <span className="text-[10px] uppercase tracking-wider">Standart Fon</span>
                    </div>
                  )}

                  {/* Badge */}
                  <div className="absolute left-3 top-3">
                    <span className="rounded-full bg-black/75 px-3 py-1 text-[10px] font-bold text-emerald-400 backdrop-blur-md shadow">
                      {item.badge}
                    </span>
                  </div>

                  <div className="absolute right-3 bottom-3">
                    <span className="rounded-full bg-black/70 px-2.5 py-0.5 text-[10px] font-medium text-zinc-300 backdrop-blur-md">
                      {item.readTime || '3 daqiqa'}
                    </span>
                  </div>
                </div>

                {/* Meta info */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[11px]">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-zinc-400">
                    <Calendar size={12} />
                    {item.date}
                  </span>
                </div>

                {/* Title & Summary */}
                <h3 className="mt-2 text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3">
                  {item.summary}
                </p>
              </div>

              {/* Action Buttons Row */}
              <div className="mt-5 flex items-center justify-between gap-2 border-t border-zinc-100 pt-3.5 dark:border-zinc-800/80">
                <Link
                  to={`/yangiliklar/${item.id}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition shrink-0"
                  title="Saytda ko‘rish"
                >
                  <ExternalLink size={13} />
                  <span>Ko‘rish</span>
                </Link>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(item)}
                    className="inline-flex items-center gap-1 rounded-xl bg-zinc-100 px-3 py-1.5 text-xs font-bold text-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-emerald-500 dark:hover:text-zinc-950 transition cursor-pointer shrink-0"
                  >
                    <Edit2 size={12} />
                    <span>Tahrirlash</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteNews(item.id, item.title)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500 hover:bg-rose-500 hover:text-white dark:bg-zinc-800 dark:hover:bg-rose-600 transition cursor-pointer shrink-0"
                    title="O‘chirish"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="mt-12 rounded-3xl border border-zinc-200 bg-white/70 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
            <Newspaper size={40} className="mx-auto text-zinc-400 mb-3" />
            <p className="text-base font-bold text-zinc-800 dark:text-zinc-200">
              Hech qanday eʼlon yoki yangilik topilmadi
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              Qidiruv so‘zini o‘zgartiring yoki yangi eʼlon qo‘shing.
            </p>
          </div>
        )}
      </main>

      {/* News Editor Modal */}
      <NewsEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveNews}
        editItem={editingItem}
      />

      {/* Password Change Modal */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-3xl border border-zinc-300 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
            >
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Admin Parolini O‘zgartirish
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                Tizim xavfsizligi uchun yangi parol o‘rnating.
              </p>

              <form onSubmit={handleChangePasswordSubmit} className="mt-4 space-y-3">
                {passwordError && (
                  <p className="text-xs font-semibold text-rose-500">{passwordError}</p>
                )}

                <div>
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Amaldagi parol</label>
                  <input
                    type="password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-xs outline-none focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Yangi parol</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-xs outline-none focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-900"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="flex-1 rounded-xl border border-zinc-300 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-emerald-500 py-2 text-xs font-bold text-zinc-950 hover:bg-emerald-400 shadow-sm"
                  >
                    Saqlash
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-zinc-900 px-5 py-3 text-xs font-bold text-white shadow-2xl dark:bg-zinc-100 dark:text-zinc-950 border border-emerald-500/40"
          >
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
