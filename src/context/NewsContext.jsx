import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { newsEvents as defaultNewsEvents, directionsData } from '../data/siteData'
import {
  fetchNewsFromSheet,
  addNewsToSheet,
  updateNewsInSheet,
  deleteNewsFromSheet,
  fetchClubsFromSheet,
  addClubToSheet,
  updateClubInSheet,
  deleteClubFromSheet,
  fetchSlideshowFromSheet,
  addSlideToSheet,
  updateSlideInSheet,
  deleteSlideFromSheet,
} from '../lib/googleSheetsClient'

const NewsContext = createContext(null)

const STORAGE_KEY = 'urdu_news_events_v2'
const CLUBS_STORAGE_KEY = 'urdu_clubs_v2'
const SLIDES_STORAGE_KEY = 'urdu_slides_v2'
const AUTH_KEY = 'urdu_admin_authenticated'
const PASSWORD_KEY = 'urdu_admin_password'
const DEFAULT_PASSWORD = 'admin2026'

const CLUB_BANNER_IMAGES = {
  'science-education': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&auto=format&fit=crop&q=80',
  'it-innovation': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80',
  'debate-intellect': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
  'volunteering': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80',
  'culture-art': 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=1200&auto=format&fit=crop&q=80',
  'sports-health': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80',
}

// Default fallback clubs mapped from directionsData with banner images
export const defaultClubsList = directionsData.map((d) => ({
  id: d.id,
  title: d.title,
  subtitle: d.subtitle,
  description: d.description,
  category: 'Asosiy Yo‘nalish',
  highlights: d.highlights || [],
  image: CLUB_BANNER_IMAGES[d.id] || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
  color: d.color || '#38bdf8',
  gradient: d.gradient || 'from-cyan-500/20 via-sky-500/10 to-transparent',
}))

// Real UrDU Yoshlar Ittifoqi slides from the slide folder
export const defaultSlidesList = [
  {
    id: 'slide-1',
    title: 'UrDU Yoshlar Forumi & Taqdirlash',
    tag: 'Yuksak Eʼtirof',
    image: '/slide/photo_2026-08-19_17-46-57.jpg',
  },
  {
    id: 'slide-2',
    title: 'Tashakkurnoma & Nufuzli Mukofotlar',
    tag: 'Taqdirlash',
    image: '/slide/photo_2026-08-19_17-46-56.jpg',
  },
  {
    id: 'slide-3',
    title: 'Prezident Shiori Ostidagi Anjuman',
    tag: 'Yoshlar Harakati',
    image: '/slide/photo_2026-09-03_14-24-19.jpg',
  },
  {
    id: 'slide-4',
    title: 'Yillik Hisobot va Yangi Loyihalar',
    tag: 'Strategik Taqdimot',
    image: '/slide/photo_2026-09-13_00-08-45.jpg',
  },
  {
    id: 'slide-5',
    title: 'Yetakchilar Ochiq Muloqoti',
    tag: 'Talabalar Maydoni',
    image: '/slide/photo_2026-09-03_14-24-20.jpg',
  },
  {
    id: 'slide-6',
    title: 'Yetakchilar Kengashi Kengash Yig‘ilishi',
    tag: 'Kengash Faoliyati',
    image: '/slide/photo_2026-08-19_17-45-29.jpg',
  },
  {
    id: 'slide-7',
    title: 'Iqtidorli Talabalar Tashabbuslari',
    tag: 'Iqtidor & Intellekt',
    image: '/slide/photo_2026-08-19_17-46-23.jpg',
  },
  {
    id: 'slide-8',
    title: 'UrDU Talabalar Katta Assambleyasi',
    tag: 'Umumiy Majlis',
    image: '/slide/photo_2026-09-03_14-24-20-2.jpg',
  },
  {
    id: 'slide-9',
    title: 'Tashabbuskor Qizlar va Yetakchilar',
    tag: 'Faol Yoshlar',
    image: '/slide/photo_2026-09-03_14-24-20-3.jpg',
  },
]

function filterValidNews(list) {
  if (!Array.isArray(list)) return []
  return list.filter(
    (item) =>
      item &&
      item.id &&
      String(item.id).trim().toLowerCase() !== 'id' &&
      item.title &&
      String(item.title).trim().toLowerCase() !== 'title'
  )
}

function filterValidClubs(list) {
  if (!Array.isArray(list)) return []
  return list.filter(
    (item) =>
      item &&
      item.id &&
      String(item.id).trim().toLowerCase() !== 'id' &&
      item.title &&
      String(item.title).trim().toLowerCase() !== 'title'
  )
}

function filterValidSlides(list) {
  if (!Array.isArray(list)) return []
  return list.filter(
    (item) =>
      item &&
      item.id &&
      String(item.id).trim().toLowerCase() !== 'id' &&
      item.title &&
      String(item.title).trim().toLowerCase() !== 'title' &&
      item.image
  )
}

export function NewsProvider({ children }) {
  // 1. News state
  const [newsList, setNewsList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('urdu_news_events_v1')
      if (saved) {
        const parsed = JSON.parse(saved)
        const valid = filterValidNews(parsed)
        if (valid.length > 0) return valid
      }
    } catch {
      // Fallback
    }
    return defaultNewsEvents
  })

  // 2. Clubs state
  const [clubsList, setClubsList] = useState(() => {
    try {
      const saved = localStorage.getItem(CLUBS_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        const valid = filterValidClubs(parsed)
        if (valid.length > 0) return valid
      }
    } catch {
      // Fallback
    }
    return defaultClubsList
  })

  // 3. Slideshow state
  const [slidesList, setSlidesList] = useState(() => {
    try {
      const saved = localStorage.getItem(SLIDES_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        const valid = filterValidSlides(parsed)
        if (valid.length > 0) return valid
      }
    } catch {
      // Fallback
    }
    return defaultSlidesList
  })

  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSynced, setLastSynced] = useState(null)

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true'
    } catch {
      return false
    }
  })

  // Initial and on-demand background sync from Google Sheets
  const syncFromSheet = useCallback(async () => {
    setIsSyncing(true)
    try {
      // 1. Sync News
      const sheetNews = await fetchNewsFromSheet()
      const validNews = filterValidNews(sheetNews)
      if (validNews.length > 0) {
        setNewsList(validNews)
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(validNews))
        } catch {
          // ignore
        }
      }

      // 2. Sync Clubs
      const sheetClubs = await fetchClubsFromSheet()
      const validClubs = filterValidClubs(sheetClubs)
      if (validClubs.length > 0) {
        setClubsList(validClubs)
        try {
          localStorage.setItem(CLUBS_STORAGE_KEY, JSON.stringify(validClubs))
        } catch {
          // ignore
        }
      }

      // 3. Sync Slideshow
      const sheetSlides = await fetchSlideshowFromSheet()
      const validSlides = filterValidSlides(sheetSlides)
      if (validSlides.length > 0) {
        setSlidesList(validSlides)
        try {
          localStorage.setItem(SLIDES_STORAGE_KEY, JSON.stringify(validSlides))
        } catch {
          // ignore
        }
      }

      setLastSynced(new Date())
    } finally {
      setIsSyncing(false)
    }
  }, [])

  useEffect(() => {
    syncFromSheet()
  }, [syncFromSheet])

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newsList))
    } catch {
      // Storage error
    }
  }, [newsList])

  useEffect(() => {
    try {
      localStorage.setItem(CLUBS_STORAGE_KEY, JSON.stringify(clubsList))
    } catch {
      // Storage error
    }
  }, [clubsList])

  useEffect(() => {
    try {
      localStorage.setItem(SLIDES_STORAGE_KEY, JSON.stringify(slidesList))
    } catch {
      // Storage error
    }
  }, [slidesList])

  // Auth functions
  const adminLogin = useCallback((password) => {
    const currentPassword = localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD
    if (password === currentPassword) {
      sessionStorage.setItem(AUTH_KEY, 'true')
      setIsAuthenticated(true)
      return { success: true }
    }
    return { success: false, error: 'Kiritilgan parol noto‘g‘ri! Qaytadan urinib ko‘ring.' }
  }, [])

  const adminLogout = useCallback(() => {
    sessionStorage.removeItem(AUTH_KEY)
    setIsAuthenticated(false)
  }, [])

  const changeAdminPassword = useCallback((oldPassword, newPassword) => {
    const currentPassword = localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD
    if (oldPassword !== currentPassword) {
      return { success: false, error: 'Amaldagi parol noto‘g‘ri!' }
    }
    if (!newPassword || newPassword.trim().length < 5) {
      return { success: false, error: 'Yangi parol kamida 5 ta belgidan iborat bo‘lishi kerak!' }
    }
    localStorage.setItem(PASSWORD_KEY, newPassword.trim())
    return { success: true }
  }, [])

  // -------------------------------------------------------------------------
  // NEWS ACTIONS
  // -------------------------------------------------------------------------
  const addNews = useCallback(
    async (item) => {
      const id = `news-${Date.now()}`
      const today = new Date()
      const months = [
        'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
        'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
      ]
      const defaultDate = `${today.getDate()}-${months[today.getMonth()]}, ${today.getFullYear()}`

      const newItem = {
        id,
        title: item.title?.trim() || 'Yangi eʼlon',
        date: item.date?.trim() || defaultDate,
        category: item.category?.trim() || 'Eʼlon & Tanlov',
        badge: item.badge?.trim() || '📌 Muhim Eʼlon',
        readTime: item.readTime?.trim() || '3 daqiqa',
        summary: item.summary?.trim() || '',
        content: item.content?.trim() || '',
        highlights: Array.isArray(item.highlights) && item.highlights.length > 0 ? item.highlights : [],
        image: item.image?.trim() || '',
        actionUrl: item.actionUrl?.trim() || '',
        actionLabel: item.actionLabel?.trim() || 'Batafsil maʼlumot',
        createdAt: Date.now(),
      }

      setNewsList((prev) => [newItem, ...prev.filter((n) => n.id !== id)])
      await addNewsToSheet(newItem)

      setTimeout(() => {
        syncFromSheet()
      }, 1000)

      return newItem
    },
    [syncFromSheet]
  )

  const updateNews = useCallback(
    async (id, updatedFields) => {
      let updatedItem = null
      setNewsList((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            updatedItem = {
              ...item,
              ...updatedFields,
              updatedAt: Date.now(),
            }
            return updatedItem
          }
          return item
        })
      )
      if (updatedItem) {
        await updateNewsInSheet(updatedItem)
        setTimeout(() => {
          syncFromSheet()
        }, 1000)
      }
    },
    [syncFromSheet]
  )

  const deleteNews = useCallback(
    async (id) => {
      setNewsList((prev) => prev.filter((item) => item.id !== id))
      await deleteNewsFromSheet(id)
      setTimeout(() => {
        syncFromSheet()
      }, 1000)
    },
    [syncFromSheet]
  )

  const resetToDefaults = useCallback(() => {
    setNewsList(defaultNewsEvents)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultNewsEvents))
    } catch {
      // Storage error
    }
  }, [])

  const getNewsById = useCallback(
    (id) => {
      return newsList.find((item) => item.id === id) || null
    },
    [newsList]
  )

  const exportJson = useCallback(() => {
    return JSON.stringify(newsList, null, 2)
  }, [newsList])

  // -------------------------------------------------------------------------
  // CLUBS ACTIONS
  // -------------------------------------------------------------------------
  const addClub = useCallback(
    async (item) => {
      const id = `club-${Date.now()}`
      const newClub = {
        id,
        title: item.title?.trim() || 'Yangi to‘garak',
        subtitle: item.subtitle?.trim() || '',
        description: item.description?.trim() || '',
        category: item.category?.trim() || 'To‘garak',
        highlights: Array.isArray(item.highlights) ? item.highlights : [],
        image: item.image?.trim() || '',
        color: item.color || '#38bdf8',
        gradient: item.gradient || 'from-cyan-500/20 via-sky-500/10 to-transparent',
        createdAt: Date.now(),
      }

      setClubsList((prev) => [...prev.filter((c) => c.id !== id), newClub])
      await addClubToSheet(newClub)
      setTimeout(() => syncFromSheet(), 1000)
      return newClub
    },
    [syncFromSheet]
  )

  const updateClub = useCallback(
    async (id, updatedFields) => {
      let updated = null
      setClubsList((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            updated = { ...item, ...updatedFields, updatedAt: Date.now() }
            return updated
          }
          return item
        })
      )
      if (updated) {
        await updateClubInSheet(updated)
        setTimeout(() => syncFromSheet(), 1000)
      }
    },
    [syncFromSheet]
  )

  const deleteClub = useCallback(
    async (id) => {
      setClubsList((prev) => prev.filter((item) => item.id !== id))
      await deleteClubFromSheet(id)
      setTimeout(() => syncFromSheet(), 1000)
    },
    [syncFromSheet]
  )

  const resetClubs = useCallback(() => {
    setClubsList(defaultClubsList)
    try {
      localStorage.setItem(CLUBS_STORAGE_KEY, JSON.stringify(defaultClubsList))
    } catch {
      // ignore
    }
  }, [])

  // -------------------------------------------------------------------------
  // SLIDESHOW ACTIONS
  // -------------------------------------------------------------------------
  const addSlide = useCallback(
    async (item) => {
      const id = `slide-${Date.now()}`
      const newSlide = {
        id,
        title: item.title?.trim() || 'Yangi yutuq',
        tag: item.tag?.trim() || 'Yutuq',
        image: item.image?.trim() || '',
        createdAt: Date.now(),
      }

      setSlidesList((prev) => [...prev.filter((s) => s.id !== id), newSlide])
      await addSlideToSheet(newSlide)
      setTimeout(() => syncFromSheet(), 1000)
      return newSlide
    },
    [syncFromSheet]
  )

  const updateSlide = useCallback(
    async (id, updatedFields) => {
      let updated = null
      setSlidesList((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            updated = { ...item, ...updatedFields, updatedAt: Date.now() }
            return updated
          }
          return item
        })
      )
      if (updated) {
        await updateSlideInSheet(updated)
        setTimeout(() => syncFromSheet(), 1000)
      }
    },
    [syncFromSheet]
  )

  const deleteSlide = useCallback(
    async (id) => {
      setSlidesList((prev) => prev.filter((item) => item.id !== id))
      await deleteSlideFromSheet(id)
      setTimeout(() => syncFromSheet(), 1000)
    },
    [syncFromSheet]
  )

  const resetSlides = useCallback(() => {
    setSlidesList(defaultSlidesList)
    try {
      localStorage.setItem(SLIDES_STORAGE_KEY, JSON.stringify(defaultSlidesList))
    } catch {
      // ignore
    }
  }, [])

  const value = {
    // News
    newsList,
    addNews,
    updateNews,
    deleteNews,
    resetToDefaults,
    getNewsById,
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

    // Auth & Sync
    isSyncing,
    lastSynced,
    syncFromSheet,
    isAuthenticated,
    adminLogin,
    adminLogout,
    changeAdminPassword,
  }

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>
}

export function useNews() {
  const context = useContext(NewsContext)
  if (!context) {
    return {
      newsList: defaultNewsEvents,
      clubsList: defaultClubsList,
      slidesList: defaultSlidesList,
      isSyncing: false,
      lastSynced: null,
      syncFromSheet: async () => {},
      isAuthenticated: false,
      adminLogin: () => ({ success: false }),
      adminLogout: () => {},
      changeAdminPassword: () => ({ success: false }),
      addNews: async () => {},
      updateNews: async () => {},
      deleteNews: async () => {},
      resetToDefaults: () => {},
      getNewsById: () => null,
      exportJson: () => '[]',
      addClub: async () => {},
      updateClub: async () => {},
      deleteClub: async () => {},
      resetClubs: () => {},
      addSlide: async () => {},
      updateSlide: async () => {},
      deleteSlide: async () => {},
      resetSlides: () => {},
    }
  }
  return context
}

export const useClubs = useNews
export const useSlideshow = useNews
