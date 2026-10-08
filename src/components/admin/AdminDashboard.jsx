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
  RefreshCw,
  LogOut,
  Sparkles,
  Newspaper,
  Calendar,
  Image as ImageIcon,
  KeyRound,
  Sun,
  Moon,
  Home,
  CheckCircle2,
  Table,
  Compass,
  Film,
  Layers,
  Camera,
} from 'lucide-react'
import { useNews } from '../../context/NewsContext'
import { useTheme } from '../../context/ThemeContext'
import NewsEditorModal from './NewsEditorModal'
import ClubEditorModal from './ClubEditorModal'
import SlideEditorModal from './SlideEditorModal'
import PhotoEditorModal from './PhotoEditorModal'
import { GOOGLE_SPREADSHEET_URL } from '../../lib/googleSheetsClient'

export default function AdminDashboard() {
  const { isDark, toggleTheme } = useTheme()
  const {
    // News
    newsList,
    addNews,
    updateNews,
    deleteNews,
    resetToDefaults,
    exportJson,

    // Clubs
    clubsList,
    addClub,
    updateClub,
    deleteClub,
    resetClubs,

    // Slideshow
    slidesList,
    addSlide,
    updateSlide,
    deleteSlide,
    resetSlides,

    // Gallery (Fotolavhalar)
    galleryList,
    addGalleryPhoto,
    deleteGalleryPhoto,
    resetGallery,

    // Auth & Sync
    isSyncing,
    syncFromSheet,
    adminLogout,
    changeAdminPassword,
  } = useNews()

  // Active Tab: 'news' | 'clubs' | 'slideshow' | 'gallery'
  const [activeTab, setActiveTab] = useState('news')

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('Barchasi')

  // Modals state
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false)
  const [editingNews, setEditingNews] = useState(null)

  const [isClubModalOpen, setIsClubModalOpen] = useState(false)
  const [editingClub, setEditingClub] = useState(null)

  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false)
  const [editingSlide, setEditingSlide] = useState(null)

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)
  const [editingPhoto, setEditingPhoto] = useState(null)

  // Password modal
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  // Toast notification
  const [toast, setToast] = useState('')
  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  // 1. FILTERED NEWS
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

  const newsCategories = useMemo(() => {
    const set = new Set(newsList.map((n) => n.category))
    return ['Barchasi', ...Array.from(set)]
  }, [newsList])

  // 2. FILTERED CLUBS
  const filteredClubs = useMemo(() => {
    return clubsList.filter((club) => {
      const q = searchQuery.toLowerCase().trim()
      if (!q) return true
      return (
        club.title.toLowerCase().includes(q) ||
        (club.subtitle && club.subtitle.toLowerCase().includes(q)) ||
        (club.description && club.description.toLowerCase().includes(q))
      )
    })
  }, [clubsList, searchQuery])

  // 3. FILTERED SLIDES
  const filteredSlides = useMemo(() => {
    return slidesList.filter((slide) => {
      const q = searchQuery.toLowerCase().trim()
      if (!q) return true
      return (
        slide.title.toLowerCase().includes(q) ||
        (slide.tag && slide.tag.toLowerCase().includes(q))
      )
    })
  }, [slidesList, searchQuery])

  // 4. FILTERED PHOTOS (Fotolavhalar)
  const filteredPhotos = useMemo(() => {
    return galleryList.filter((photo) => {
      const q = searchQuery.toLowerCase().trim()
      if (!q) return true
      return (
        (photo.title && photo.title.toLowerCase().includes(q)) ||
        (photo.category && photo.category.toLowerCase().includes(q)) ||
        (photo.date && photo.date.toLowerCase().includes(q)) ||
        (photo.id && photo.id.toLowerCase().includes(q))
      )
    })
  }, [galleryList, searchQuery])

  // NEWS HANDLERS
  const handleSaveNews = async (payload) => {
    try {
      if (editingNews) {
        await updateNews(editingNews.id, payload)
        showToast('Eʼlon yangilandi!')
      } else {
        await addNews(payload)
        showToast('Yangi eʼlon muvaffaqiyatli saqlandi!')
      }
      setIsNewsModalOpen(false)
      setEditingNews(null)
    } catch (err) {
      console.error('Save news error:', err)
      showToast('Eʼlonni saqlashda xatolik yuz berdi!', 'error')
    }
  }

  const handleDeleteNews = async (id, title) => {
    if (window.confirm(`Rostdan ham "${title}" eʼlonini o‘chirmoqchimisiz?`)) {
      await deleteNews(id)
      showToast('Eʼlon o‘chirildi!')
    }
  }

  // CLUBS HANDLERS
  const handleSaveClub = async (payload) => {
    try {
      if (editingClub) {
        await updateClub(editingClub.id, payload)
        showToast('To‘garak muvaffaqiyatli yangilandi!')
      } else {
        await addClub(payload)
        showToast('Yangi to‘garak muvaffaqiyatli saqlandi!')
      }
      setIsClubModalOpen(false)
      setEditingClub(null)
    } catch (err) {
      console.error('Save club error:', err)
      showToast('Xatolik: ' + (err.message || 'Saqlab bo‘lmadi'))
      throw err
    }
  }

  const handleDeleteClub = async (id, title) => {
    if (window.confirm(`Rostdan ham "${title}" to‘garagini o‘chirmoqchimisiz?`)) {
      await deleteClub(id)
      showToast('To‘garak o‘chirildi!')
    }
  }


  // SLIDE HANDLERS
  const handleSaveSlide = async (payload) => {
    if (editingSlide) {
      await updateSlide(editingSlide.id, payload)
      showToast('Slayd yangilandi!')
    } else {
      await addSlide(payload)
      showToast('Yangi slayd bosh sahifaga qo‘shildi!')
    }
  }

  const handleDeleteSlide = async (id, title) => {
    if (window.confirm(`Rostdan ham "${title}" slaydini o‘chirmoqchimisiz?`)) {
      await deleteSlide(id)
      showToast('Slayd o‘chirildi!')
    }
  }

  // GALLERY HANDLERS (Fotolavhalar)
  const handleSavePhoto = async (payload) => {
    try {
      await addGalleryPhoto(payload)
      showToast('Yangi fotolavha muvaffaqiyatli saqlandi!')
      setIsPhotoModalOpen(false)
      setEditingPhoto(null)
    } catch (err) {
      console.error('Save photo error:', err)
      showToast('Fotolavhani saqlashda xatolik yuz berdi!')
    }
  }

  const handleDeletePhoto = async (id, title) => {
    if (window.confirm(`Rostdan ham ushbu fotolavhani o‘chirmoqchimisiz?`)) {
      await deleteGalleryPhoto(id)
      showToast('Fotolavha o‘chirildi!')
    }
  }


  // Password submit
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
      <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/85 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/85">
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
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={GOOGLE_SPREADSHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-500 hover:text-zinc-950 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300 dark:hover:bg-emerald-500 dark:hover:text-zinc-950 transition cursor-pointer shrink-0"
              title="Google Sheets jadvalini ochish"
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
              className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300/80 bg-zinc-100/90 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 cursor-pointer"
            >
              {isDark ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-emerald-600" />}
            </button>

            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300/80 bg-zinc-100/90 text-zinc-700 hover:text-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 cursor-pointer"
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

        {/* 3 Main Management Tabs */}
        <div className="border-t border-zinc-200/60 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30">
          <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-4 sm:px-7 py-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => {
                setActiveTab('news')
                setSearchQuery('')
              }}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'news'
                  ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                  : 'bg-white/80 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200/80 dark:border-zinc-800'
              }`}
            >
              <Newspaper size={14} />
              <span>1. Yangilik va eʼlonlar ({newsList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('clubs')
                setSearchQuery('')
              }}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'clubs'
                  ? 'bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/20'
                  : 'bg-white/80 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200/80 dark:border-zinc-800'
              }`}
            >
              <Compass size={14} />
              <span>2. Klub va to‘garaklar ({clubsList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('slideshow')
                setSearchQuery('')
              }}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'slideshow'
                  ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                  : 'bg-white/80 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200/80 dark:border-zinc-800'
              }`}
            >
              <Film size={14} />
              <span>3. Bosh Sahifa Slide Show ({slidesList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('gallery')
                setSearchQuery('')
              }}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'gallery'
                  ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                  : 'bg-white/80 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200/80 dark:border-zinc-800'
              }`}
            >
              <Camera size={14} />
              <span>4. Fotolavhalar ({galleryList.length})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-7">
        {/* =========================================================================
            TAB 1: YANGILIK VA E'LONLAR
           ========================================================================= */}
        {activeTab === 'news' && (
          <div>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Jami Maqola & Eʼlonlar</p>
                <p className="mt-2 text-3xl font-black text-emerald-600 dark:text-emerald-400">{newsList.length}</p>
                <p className="mt-1 text-[11px] text-zinc-400">Portalda faol ko‘rinayotgan materiallar</p>
              </div>

              <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Rasmli Eʼlonlar</p>
                <p className="mt-2 text-3xl font-black text-blue-600 dark:text-blue-400">
                  {newsList.filter((n) => n.image).length}
                </p>
                <p className="mt-1 text-[11px] text-zinc-400">Rasmli materiallar soni</p>
              </div>

              <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Kategoriyalar</p>
                <p className="mt-2 text-3xl font-black text-purple-600 dark:text-purple-400">
                  {newsCategories.length - 1}
                </p>
                <p className="mt-1 text-[11px] text-zinc-400">IT, Zakovat, Tanlovlar, Grantlar</p>
              </div>

              <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Zaxira & Qayta Tiklash</p>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">JSON eksport qilish</p>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={async () => {
                      await navigator.clipboard.writeText(exportJson())
                      showToast('JSON nusxalandi!')
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 text-xs font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition cursor-pointer"
                  >
                    <Copy size={13} />
                    Nusxalash
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Yangiliklarni boshlang‘ich holatga qaytarmoqchimisiz?')) {
                        resetToDefaults()
                        showToast('Dastlabki holatga qaytarildi!')
                      }
                    }}
                    className="inline-flex items-center justify-center rounded-xl bg-zinc-100 hover:bg-rose-50 px-3 py-1.5 text-xs font-bold text-zinc-600 hover:text-rose-600 dark:bg-zinc-800 dark:text-zinc-300 transition cursor-pointer"
                    title="Boshlang‘ich holatga qaytarish"
                  >
                    <RefreshCw size={13} />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-1 flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[240px] max-w-md">
                  <Search size={15} className="absolute left-3.5 top-3 text-zinc-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Eʼlon sarlavhasi bo‘yicha qidiruv..."
                    className="w-full rounded-2xl border border-zinc-200 bg-white pl-9 pr-4 py-2.5 text-xs text-zinc-900 outline-none transition focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-zinc-800 outline-none focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                >
                  {newsCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingNews(null)
                  setIsNewsModalOpen(true)
                }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-emerald-400 shadow-md transition active:scale-98 cursor-pointer shrink-0"
              >
                <Plus size={16} />
                Yangi Eʼlon Qo‘shish
              </button>
            </div>

            {/* News Grid */}
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredNews.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-white/95 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60"
                >
                  <div>
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
                      <div className="absolute left-3 top-3">
                        <span className="rounded-full bg-black/75 px-3 py-1 text-[10px] font-bold text-emerald-400 backdrop-blur-md shadow">
                          {item.badge}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[11px]">
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-zinc-400">
                        <Calendar size={12} />
                        {item.date}
                      </span>
                    </div>

                    <h3 className="mt-2 text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3">
                      {item.summary}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-2 border-t border-zinc-100 pt-3.5 dark:border-zinc-800/80">
                    <Link
                      to={`/yangiliklar/${item.id}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition"
                    >
                      <ExternalLink size={13} />
                      Ko‘rish
                    </Link>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingNews(item)
                          setIsNewsModalOpen(true)
                        }}
                        className="inline-flex items-center gap-1 rounded-xl bg-zinc-100 px-3 py-1.5 text-xs font-bold text-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-emerald-500 dark:hover:text-zinc-950 transition cursor-pointer"
                      >
                        <Edit2 size={12} />
                        Tahrirlash
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteNews(item.id, item.title)}
                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500 hover:bg-rose-500 hover:text-white dark:bg-zinc-800 dark:hover:bg-rose-600 transition cursor-pointer"
                        title="O‘chirish"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: KLUBLAR VA TO'GARAKLAR
           ========================================================================= */}
        {activeTab === 'clubs' && (
          <div>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Faol To‘garaklar</p>
                <p className="mt-2 text-3xl font-black text-cyan-600 dark:text-cyan-400">{clubsList.length}</p>
                <p className="mt-1 text-[11px] text-zinc-400">Universitet yoshlar markazi to‘garaklari</p>
              </div>

              <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Sahifadagi Joylashuv</p>
                <p className="mt-2 text-xl font-bold text-zinc-800 dark:text-zinc-200">/klublar</p>
                <p className="mt-1 text-[11px] text-zinc-400">Har bir kiritilgan to‘garak darhol saytda aks etadi</p>
              </div>

              <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Tiklash</p>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">Standart 6 ta yo‘nalishga qaytarish</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('To‘garaklarni boshlang‘ich 6 ta yo‘nalish holatiga qaytarmoqchimisiz?')) {
                      resetClubs()
                      showToast('To‘garaklar dastlabki holatga qaytarildi!')
                    }
                  }}
                  className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 text-xs font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 transition cursor-pointer"
                >
                  <RefreshCw size={13} />
                  Dastlabki holatga qaytarish
                </button>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search size={15} className="absolute left-3.5 top-3 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="To‘garak nomi yoki tavsifi bo‘yicha qidiruv..."
                  className="w-full rounded-2xl border border-zinc-200 bg-white pl-9 pr-4 py-2.5 text-xs text-zinc-900 outline-none transition focus:border-cyan-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingClub(null)
                  setIsClubModalOpen(true)
                }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-cyan-400 shadow-md transition active:scale-98 cursor-pointer shrink-0"
              >
                <Plus size={16} />
                Yangi To‘garak Qo‘shish
              </button>
            </div>

            {/* Clubs Grid */}
            {filteredClubs.length === 0 ? (
              <div className="mt-8 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30 p-12 text-center">
                <Compass size={36} className="mx-auto text-zinc-400 mb-3" />
                <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">Hozircha to‘garaklar qo‘shilmagan</h3>
                <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                  Barcha eski soxta to‘garaklar tozalandi. Yuqoridagi "Yangi To‘garak Qo‘shish" tugmasini bosib, o‘zingizning haqiqiy to‘garak va klublaringizni qo‘shishingiz mumkin.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredClubs.map((club) => (
                  <div
                    key={club.id}
                    className="flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-white/95 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60"
                  >
                  <div>
                    {/* Club Banner Thumbnail */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-950 mb-4 border border-zinc-200/70 dark:border-zinc-800">
                      {club.image ? (
                        <img
                          src={club.image}
                          alt={club.title}
                          className="h-full w-full object-cover object-center"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-zinc-400 flex-col gap-1">
                          <ImageIcon size={24} />
                          <span className="text-[10px] uppercase tracking-wider">Banner Rasm Yo‘q</span>
                        </div>
                      )}
                      <div className="absolute left-3 top-3 flex items-center gap-1.5 flex-wrap">
                        <span className="rounded-full bg-black/75 px-3 py-1 text-[10px] font-bold text-cyan-400 backdrop-blur-md shadow">
                          {club.category || 'To‘garak'}
                        </span>
                        <span className="rounded-full bg-emerald-500/90 text-zinc-950 px-2.5 py-1 text-[10px] font-black backdrop-blur-md shadow">
                          {club.price || '100% Bepul'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className="h-3 w-3 rounded-full shrink-0"
                        style={{ backgroundColor: club.color || '#38bdf8' }}
                      />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                        {club.category || 'To‘garak'}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                      {club.title}
                    </h3>
                    {club.subtitle && (
                      <p className="mt-1 text-xs font-medium text-cyan-600 dark:text-cyan-400">
                        {club.subtitle}
                      </p>
                    )}
                    <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3">
                      {club.description}
                    </p>

                    {/* Highlights */}
                    {Array.isArray(club.highlights) && club.highlights.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {club.highlights.map((h, idx) => (
                          <span
                            key={idx}
                            className="rounded-full border border-zinc-200/80 bg-zinc-50 px-2.5 py-0.5 text-[10px] font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-2 border-t border-zinc-100 pt-3.5 dark:border-zinc-800/80">
                    <Link
                      to="/klublar"
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-cyan-600 dark:text-zinc-400 dark:hover:text-cyan-400 transition"
                    >
                      <ExternalLink size={13} />
                      Saytda ko‘rish
                    </Link>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingClub(club)
                          setIsClubModalOpen(true)
                        }}
                        className="inline-flex items-center gap-1 rounded-xl bg-zinc-100 px-3 py-1.5 text-xs font-bold text-zinc-800 hover:bg-cyan-500 hover:text-zinc-950 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-cyan-500 dark:hover:text-zinc-950 transition cursor-pointer"
                      >
                        <Edit2 size={12} />
                        Tahrirlash
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteClub(club.id, club.title)}
                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500 hover:bg-rose-500 hover:text-white dark:bg-zinc-800 dark:hover:bg-rose-600 transition cursor-pointer"
                        title="O‘chirish"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 3: BOSH SAHIFA SLIDE SHOW
           ========================================================================= */}
        {activeTab === 'slideshow' && (
          <div>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Jami Slaydlar</p>
                <p className="mt-2 text-3xl font-black text-purple-600 dark:text-purple-400">{slidesList.length}</p>
                <p className="mt-1 text-[11px] text-zinc-400">Bosh sahifadagi 3-soniyalik vertikal rolik slaydlari</p>
              </div>

              <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Tezlik & Harakat</p>
                <p className="mt-2 text-xl font-bold text-zinc-800 dark:text-zinc-200">Har 3 sekundda</p>
                <p className="mt-1 text-[11px] text-zinc-400">Uzluksiz yuqoridan pastga silliq oqadi</p>
              </div>

              <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Tiklash</p>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">Standart slaydlarni qayta yuklash</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Bosh sahifa slaydlarini dastlabki holatiga qaytarmoqchimisiz?')) {
                      resetSlides()
                      showToast('Slaydlar dastlabki holatga qaytarildi!')
                    }
                  }}
                  className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 text-xs font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 transition cursor-pointer"
                >
                  <RefreshCw size={13} />
                  Dastlabki holatga qaytarish
                </button>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search size={15} className="absolute left-3.5 top-3 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Slayd sarlavhasi yoki tagi bo‘yicha qidiruv..."
                  className="w-full rounded-2xl border border-zinc-200 bg-white pl-9 pr-4 py-2.5 text-xs text-zinc-900 outline-none transition focus:border-purple-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingSlide(null)
                  setIsSlideModalOpen(true)
                }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-purple-500 shadow-md transition active:scale-98 cursor-pointer shrink-0"
              >
                <Plus size={16} />
                Yangi Slayd Qo‘shish
              </button>
            </div>

            {/* Slides Grid */}
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredSlides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className="flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-white/95 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60"
                >
                  <div>
                    {/* Slide Preview */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-950 mb-3 border border-zinc-200/70 dark:border-zinc-800">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-full w-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="rounded-full bg-black/70 border border-emerald-400/40 px-3 py-0.5 text-[11px] font-bold text-emerald-300 backdrop-blur-md">
                          {slide.tag || 'Yutuq'}
                        </span>
                      </div>
                      <div className="absolute bottom-3 inset-x-3 text-white">
                        <h4 className="text-base font-black leading-snug drop-shadow-md line-clamp-2">
                          {slide.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span className="font-mono">Slayd #{idx + 1}</span>
                      <span className="text-[11px] text-zinc-400 truncate max-w-[200px]">
                        {slide.image.substring(0, 35)}...
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800/80">
                    <Link
                      to="/"
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-400 transition"
                    >
                      <ExternalLink size={13} />
                      Bosh sahifada ko‘rish
                    </Link>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSlide(slide)
                          setIsSlideModalOpen(true)
                        }}
                        className="inline-flex items-center gap-1 rounded-xl bg-zinc-100 px-3 py-1.5 text-xs font-bold text-zinc-800 hover:bg-purple-600 hover:text-white dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-purple-600 dark:hover:text-white transition cursor-pointer"
                      >
                        <Edit2 size={12} />
                        Tahrirlash
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSlide(slide.id, slide.title)}
                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500 hover:bg-rose-500 hover:text-white dark:bg-zinc-800 dark:hover:bg-rose-600 transition cursor-pointer"
                        title="O‘chirish"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: FOTOLAVHALAR (Ittifoq hayoti & Galereya)
           ========================================================================= */}
        {activeTab === 'gallery' && (
          <div>
            {/* Top Toolbar */}
            <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-zinc-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
                    Ittifoq Hayoti Fotolavhalari
                  </h2>
                  <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                    {filteredPhotos.length} ta surat
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  Ushbu fotosuratlar saytdagi "/ittifoq-hayoti" galereya sahifasida jonli ko‘rsatiladi va Google Sheets bazasida saqlanadi.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Barcha o'chirilgan fotolavhalarni boshlang'ich holatga qaytarmoqchimisiz?")) {
                      resetGallery()
                      showToast("Fotolavhalar boshlang'ich holatga qaytarildi!")
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-2xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 transition cursor-pointer"
                  title="Boshlang'ich holatga qaytarish"
                >
                  <RefreshCw size={13} />
                  <span>Qayta tiklash</span>
                </button>

                <Link
                  to="/ittifoq-hayoti"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs font-bold text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 transition cursor-pointer"
                >
                  <ExternalLink size={13} />
                  <span>Galereyani ochish</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setEditingPhoto(null)
                    setIsPhotoModalOpen(true)
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 px-4 py-2 text-xs font-extrabold text-zinc-950 shadow-md shadow-amber-500/20 hover:bg-amber-400 transition cursor-pointer"
                >
                  <Plus size={16} />
                  <span>Yangi fotolavha qo‘shish</span>
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="mb-6 max-w-md">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Fotolavhalar bo‘yicha qidiruv (sarlavha, kategoriya, sana)..."
                  className="w-full rounded-2xl border border-zinc-200 bg-white/80 pl-10 pr-4 py-2.5 text-xs text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-100"
                />
              </div>
            </div>

            {/* Photos Grid */}
            {filteredPhotos.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 p-12 text-center bg-white/40 dark:bg-zinc-900/40">
                <Camera size={36} className="mx-auto text-zinc-400 mb-3" />
                <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Fotolavhalar topilmadi</h3>
                <p className="text-xs text-zinc-500 mt-1">Qidiruv so‘zini o‘zgartiring yoki yangi rasm qo‘shing.</p>
                <button
                  type="button"
                  onClick={() => {
                    setEditingPhoto(null)
                    setIsPhotoModalOpen(true)
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-amber-500 px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-amber-400 transition cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Rasm qo‘shish</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                {filteredPhotos.map((photo, idx) => (
                  <div
                    key={photo.id || `photo-${idx}`}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/95 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/80"
                  >
                    <div>
                      {/* Photo Thumbnail */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800">
                        <img
                          src={photo.image}
                          alt={photo.title || 'UrDU Fotolavha'}
                          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = '/img/logo-oq1.png'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                        {photo.category && (
                          <div className="absolute top-2 left-2">
                            <span className="rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[9px] font-bold text-white border border-white/10">
                              {photo.category}
                            </span>
                          </div>
                        )}

                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => handleDeletePhoto(photo.id, photo.title)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition cursor-pointer shadow-md"
                            title="O‘chirish"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                        <div className="absolute bottom-2 left-2 right-2 text-white">
                          <span className="text-[10px] text-white/80 font-mono">
                            #{filteredPhotos.length - idx}
                          </span>
                        </div>
                      </div>

                      {/* Photo Meta */}
                      <div className="p-3">
                        <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug">
                          {photo.title || 'UrDU Yoshlar Ittifoqi'}
                        </h4>
                        <div className="mt-1 flex items-center justify-between text-[10px] text-zinc-400">
                          <span>{photo.date || '2026-10-08'}</span>
                          <span className="truncate max-w-[80px]" title={photo.id}>
                            {photo.id}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="px-3 pb-3 pt-1 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/60 text-[11px]">
                      <button
                        type="button"
                        onClick={() => {
                          const url = photo.image.startsWith('http') ? photo.image : window.location.origin + photo.image
                          navigator.clipboard.writeText(url)
                          showToast('Havola nusxalandi!')
                        }}
                        className="text-zinc-500 hover:text-amber-600 dark:text-zinc-400 dark:hover:text-amber-400 flex items-center gap-1 font-semibold transition cursor-pointer"
                        title="Rasm URL nusxalash"
                      >
                        <Copy size={11} />
                        <span>Havola</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeletePhoto(photo.id, photo.title)}
                        className="text-rose-500 hover:text-rose-600 flex items-center gap-1 font-bold transition cursor-pointer"
                        title="O‘chirish"
                      >
                        <Trash2 size={11} />
                        <span>O‘chirish</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* 1. News Editor Modal */}
      <NewsEditorModal
        isOpen={isNewsModalOpen}
        onClose={() => setIsNewsModalOpen(false)}
        onSave={handleSaveNews}
        editItem={editingNews}
      />

      {/* 2. Club Editor Modal */}
      <ClubEditorModal
        isOpen={isClubModalOpen}
        onClose={() => setIsClubModalOpen(false)}
        onSave={handleSaveClub}
        editItem={editingClub}
      />

      {/* 3. Slide Editor Modal */}
      <SlideEditorModal
        isOpen={isSlideModalOpen}
        onClose={() => setIsSlideModalOpen(false)}
        onSave={handleSaveSlide}
        editItem={editingSlide}
      />

      {/* 4. Photo Editor Modal */}
      <PhotoEditorModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onSave={handleSavePhoto}
        editItem={editingPhoto}
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
                    className="flex-1 rounded-xl bg-emerald-500 py-2 text-xs font-bold text-zinc-950 hover:bg-emerald-400 shadow-sm cursor-pointer"
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
