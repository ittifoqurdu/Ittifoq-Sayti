import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { newsEvents as defaultNewsEvents } from '../data/siteData'
import {
  fetchNewsFromSheet,
  addNewsToSheet,
  updateNewsInSheet,
  deleteNewsFromSheet,
} from '../lib/googleSheetsClient'

const NewsContext = createContext(null)

const STORAGE_KEY = 'urdu_news_events_v2'
const AUTH_KEY = 'urdu_admin_authenticated'
const PASSWORD_KEY = 'urdu_admin_password'
const DEFAULT_PASSWORD = 'admin2026'

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

export function NewsProvider({ children }) {
  const [newsList, setNewsList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('urdu_news_events_v1')
      if (saved) {
        const parsed = JSON.parse(saved)
        const valid = filterValidNews(parsed)
        if (valid.length > 0) {
          return valid
        }
      }
    } catch {
      // Fallback
    }
    return defaultNewsEvents
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

  // 1. Initial background sync from Google Sheets
  const syncFromSheet = useCallback(async () => {
    setIsSyncing(true)
    try {
      const sheetNews = await fetchNewsFromSheet()
      const valid = filterValidNews(sheetNews)
      if (valid.length > 0) {
        setNewsList(valid)
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(valid))
        } catch {
          // ignore
        }
        setLastSynced(new Date())
      }
    } finally {
      setIsSyncing(false)
    }
  }, [])

  useEffect(() => {
    syncFromSheet()
  }, [syncFromSheet])

  // Save to localStorage whenever newsList changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newsList))
    } catch {
      // Storage error
    }
  }, [newsList])

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
        badge: item.badge?.trim() || '🔴 Muhim Eʼlon',
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

  const value = {
    newsList,
    isSyncing,
    lastSynced,
    syncFromSheet,
    isAuthenticated,
    adminLogin,
    adminLogout,
    changeAdminPassword,
    addNews,
    updateNews,
    deleteNews,
    resetToDefaults,
    getNewsById,
    exportJson,
  }

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>
}

export function useNews() {
  const context = useContext(NewsContext)
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider')
  }
  return context
}
