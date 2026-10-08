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
  fetchGalleryFromSheet,
  addPhotoToSheet,
  deletePhotoFromSheet,
} from '../lib/googleSheetsClient'
import {
  broadcastClubToAllBotUsers,
  broadcastNewsToAllBotUsers,
} from '../lib/telegramNotifier'
import { defaultGalleryList } from '../data/defaultGalleryPhotos'

const NewsContext = createContext(null)

const STORAGE_KEY = 'urdu_news_events_v4'
const CLUBS_STORAGE_KEY = 'urdu_clubs_v8'
const DELETED_CLUBS_KEY = 'urdu_deleted_clubs_v3'
const SLIDES_STORAGE_KEY = 'urdu_slides_v5'
const GALLERY_STORAGE_KEY = 'urdu_gallery_v3'
const DELETED_GALLERY_KEY = 'urdu_deleted_gallery_v3'
const AUTH_KEY = 'urdu_admin_authenticated'
const PASSWORD_KEY = 'urdu_admin_password'
const DEFAULT_PASSWORD = 'admin2026'

// Avvalgi eski kesh xotirani tozalash (boshqa kompyuterlarda soxta ma'lumotlar chiqmasligi uchun)
try {
  ;[
    'urdu_news_events_v1',
    'urdu_news_events_v2',
    'urdu_news_events_v3',
    'urdu_clubs_v1',
    'urdu_clubs_v2',
    'urdu_clubs_v5',
    'urdu_clubs_v6',
    'urdu_clubs_v7',
    'urdu_slides_v3',
  ].forEach((k) => localStorage.removeItem(k))
} catch {}

const DUMMY_CLUB_IDS = new Set(['club-1', 'club-2'])
const DUMMY_TITLES = ['ilm-fan va innovatsiyalar', 'it & raqamli texnologiyalar', 'durdimatov']
const DUMMY_NEWS_IDS = new Set(['news-1', 'news-2', 'news-3', 'news-4', 'news-5'])
const DUMMY_NEWS_TITLES = [
  'zakovat intellektual olimpiadasi',
  'urdu hackathon',
  'talabalar bahori',
  'oltin qanot',
  'erasmus+',
]

function getDeletedClubIds() {
  try {
    const raw = localStorage.getItem(DELETED_CLUBS_KEY)
    if (raw) return new Set(JSON.parse(raw))
  } catch {}
  return new Set()
}

function saveDeletedClubId(id) {
  try {
    const set = getDeletedClubIds()
    set.add(id)
    localStorage.setItem(DELETED_CLUBS_KEY, JSON.stringify(Array.from(set)))
  } catch {}
}

function getDeletedGalleryIds() {
  try {
    const raw = localStorage.getItem(DELETED_GALLERY_KEY)
    if (raw) return new Set(JSON.parse(raw))
  } catch {}
  return new Set()
}

function saveDeletedGalleryId(id) {
  try {
    const set = getDeletedGalleryIds()
    set.add(id)
    localStorage.setItem(DELETED_GALLERY_KEY, JSON.stringify(Array.from(set)))
  } catch {}
}


// Boshlang‘ich klublar ro‘yxati (Google Sheets bilan to‘liq sinxron)
export const defaultClubsList = [
  {
    id: 'club-zakovat',
    title: 'Zakovat',
    subtitle: "Intellektual o‘yinlar va mantiqiy bellashuvlar",
    description: "“Zakovat” intellektual o‘yini, Breyn-ring, Erudit-kvartet va mantiqiy savol-javoblar bo‘yicha talabalar jamoasi.",
    category: 'Intellektual',
    price: '100% Bepul',
    priceSubtext: 'Barcha talabalar uchun',
    membershipBadge: 'Aʼzolik bepul',
    highlights: ['Universitet ligasi', 'Respublika bosqichi', 'Qimmatbaho sovrinlar'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
    color: '#3b82f6',
  },
  {
    id: 'club-munozara',
    title: 'Munozara',
    subtitle: 'Notiqlik va parlament debat formati',
    description: "Notiqlik sanʼati, erkin fikrlash, dalillar bilan bahslashish hamda Karl Popper va parlament debatlari.",
    category: 'Notiqlik',
    price: '100% Bepul',
    priceSubtext: 'Barcha talabalar uchun',
    membershipBadge: 'Aʼzolik bepul',
    highlights: ['Debat turnirlari', 'Notiqlik mahorati', 'Xalqaro sertifikatlar'],
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop&q=80',
    color: '#8b5cf6',
  },
  {
    id: 'club-sport',
    title: 'Sport (futbol, basketbol, voleybol, tennis, shaxmat)',
    subtitle: 'Futbol, basketbol, voleybol, tennis, shaxmat',
    description: "Talabalar o‘rtasida sog‘lom turmush tarzi: futbol, basketbol, voleybol, stol tennisi va shaxmat to‘garaklari.",
    category: 'Sport',
    price: '100% Bepul',
    priceSubtext: 'Barcha talabalar uchun',
    membershipBadge: 'Aʼzolik bepul',
    highlights: ['Futbol', 'Basketbol', 'Voleybol', 'Stol tennisi', 'Shaxmat'],
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80',
    color: '#10b981',
  },
  {
    id: 'club-qvz',
    title: 'QVZ (“Quvnoqlar va zukkolar”)',
    subtitle: '“Quvnoqlar va zukkolar” ligasi',
    description: "Talabalar teatri, hazil-mutoyiba, QVZ oliy ligasi bellashuvlari va sahna ko‘rinishlari.",
    category: 'Ijodiy',
    price: '100% Bepul',
    priceSubtext: 'Barcha talabalar uchun',
    membershipBadge: 'Aʼzolik bepul',
    highlights: ['Universitet chempionati', 'Respublika QVZ festivali', 'Sahna mahorati'],
    image: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=1200&auto=format&fit=crop&q=80',
    color: '#f59e0b',
  },
  {
    id: 'club-teatr',
    title: 'Teatr',
    subtitle: 'Talabalar teatr studiyasi',
    description: 'Aktyorlik mahorati, sahna madaniyati, milliy va jahon dramaturgiyasi spektakllari hamda ijodiy chiqishlar.',
    category: 'Madaniyat',
    price: '100% Bepul',
    priceSubtext: 'Barcha talabalar uchun',
    membershipBadge: 'Aʼzolik bepul',
    highlights: ['Talabalar teatr festivali', 'Sahna nutqi', 'Aktyorlik sirlari'],
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=1200&auto=format&fit=crop&q=80',
    color: '#ec4899',
  },
  {
    id: 'club-smm',
    title: 'SMM',
    subtitle: 'Media, kontent yaratish va ijtimoiy tarmoqlar',
    description: "Mobilografiya, videomontaj, target reklama, grafik dizayn va ijtimoiy tarmoqlarda sifatli media kontent tayyorlash to‘garagi.",
    category: 'Media',
    price: '100% Bepul',
    priceSubtext: 'Barcha talabalar uchun',
    membershipBadge: 'Aʼzolik bepul',
    highlights: ['Mobilografiya', 'Videomontaj', 'Grafik dizayn', 'Kopirayting'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&auto=format&fit=crop&q=80',
    color: '#06b6d4',
  },
]

// Real UrDU Yoshlar Ittifoqi slides from the slide folder
export const defaultSlidesList = [
  {
    id: 'slide-1',
    title: 'UrDU yoshlar forumi va taqdirlash marosimi',
    tag: 'Yuksak eʼtirof',
    image: '/slide/photo_2026-08-19_17-46-57.jpg',
  },
  {
    id: 'slide-2',
    title: 'Tashakkurnoma va nufuzli mukofotlar',
    tag: 'Taqdirlash',
    image: '/slide/photo_2026-08-19_17-46-56.jpg',
  },
  {
    id: 'slide-3',
    title: 'Prezident shiori ostidagi anjuman',
    tag: 'Yoshlar harakati',
    image: '/slide/photo_2026-09-03_14-24-19.jpg',
  },
  {
    id: 'slide-4',
    title: 'Yillik hisobot va yangi loyihalar',
    tag: 'Strategik taqdimot',
    image: '/slide/photo_2026-09-13_00-08-45.jpg',
  },
  {
    id: 'slide-5',
    title: 'Yetakchilar ochiq muloqoti',
    tag: 'Talabalar maydoni',
    image: '/slide/photo_2026-09-03_14-24-20.jpg',
  },
  {
    id: 'slide-6',
    title: 'Yetakchilar kengashi yig‘ilishi',
    tag: 'Kengash faoliyati',
    image: '/slide/photo_2026-08-19_17-45-29.jpg',
  },
  {
    id: 'slide-7',
    title: 'Iqtidorli talabalar tashabbuslari',
    tag: 'Iqtidor va intellekt',
    image: '/slide/photo_2026-08-19_17-46-23.jpg',
  },
  {
    id: 'slide-8',
    title: 'UrDU talabalar katta assambleyasi',
    tag: 'Umumiy majlis',
    image: '/slide/photo_2026-09-03_14-24-20-2.jpg',
  },
  {
    id: 'slide-9',
    title: 'Tashabbuskor qizlar va yoshlar yetakchilari',
    tag: 'Faol yoshlar',
    image: '/slide/photo_2026-09-03_14-24-20-3.jpg',
  },
]

function filterValidNews(list) {
  if (!Array.isArray(list)) return []
  return list.filter((item) => {
    if (!item || !item.id || !item.title) return false
    const idStr = String(item.id).trim()
    const titleLower = String(item.title).trim().toLowerCase()
    if (idStr.toLowerCase() === 'id' || titleLower === 'title') return false
    if (DUMMY_NEWS_IDS.has(idStr)) return false
    if (DUMMY_NEWS_TITLES && DUMMY_NEWS_TITLES.some((t) => titleLower.includes(t))) return false
    return true
  })
}

function filterValidClubs(list) {
  if (!Array.isArray(list)) return []
  const deletedIds = getDeletedClubIds()
  return list.filter((item) => {
    if (!item || !item.id || !item.title) return false
    const idStr = String(item.id).trim()
    const titleLower = String(item.title).trim().toLowerCase()
    if (idStr.toLowerCase() === 'id' || titleLower === 'title') return false
    if (DUMMY_CLUB_IDS.has(idStr)) return false
    if (DUMMY_TITLES.some((dt) => titleLower.includes(dt))) return false
    if (deletedIds.has(idStr)) return false
    return true
  })
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
      item.image &&
      !String(item.image).includes('/slide/1.jpg') &&
      !String(item.image).includes('/slide/2.jpg') &&
      !String(item.image).includes('/slide/3.jpg') &&
      !String(item.image).includes('/slide/4.jpg')
  )
}

function filterValidGallery(list) {
  if (!Array.isArray(list)) return []
  const deleted = getDeletedGalleryIds()
  return list.filter((item) => {
    if (!item || !item.id || !item.image) return false
    const idStr = String(item.id).trim()
    if (idStr.toLowerCase() === 'id') return false
    if (deleted.has(idStr)) return false
    const imgLower = String(item.image).toLowerCase()
    if (
      imgLower.includes('/slide/1.jpg') ||
      imgLower.includes('/slide/2.jpg') ||
      imgLower.includes('/slide/3.jpg') ||
      imgLower.includes('/slide/4.jpg') ||
      imgLower.includes('tg_photo_1.jpg') ||
      imgLower.includes('tg_photo_2.jpg') ||
      imgLower.includes('tg_photo_11.jpg') ||
      imgLower.includes('tg_photo_19.jpg') ||
      imgLower.includes('tg_photo_23.jpg') ||
      imgLower.includes('urdu_news_45.jpg') ||
      imgLower.includes('logo') ||
      imgLower.includes('banner')
    ) {
      return false
    }
    return true
  })
}

export function NewsProvider({ children }) {
  // 1. News state - Faqat Google Sheets ma'lumotlari
  const [newsList, setNewsList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        const valid = filterValidNews(parsed)
        if (valid.length > 0) return valid
      }
    } catch {
      // Fallback
    }
    return []
  })

  // 2. Clubs state - Faqat Google Sheets ma'lumotlari
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
    return []
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

  // 4. Fotolavhalar (Gallery) state
  const [galleryList, setGalleryList] = useState(() => {
    try {
      const saved = localStorage.getItem(GALLERY_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        const valid = filterValidGallery(parsed)
        if (valid.length > 0) return valid
      }
    } catch {}
    return filterValidGallery(defaultGalleryList)
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

  // Google Sheets bilan to'liq avtoritar sinxronizatsiya
  const syncFromSheet = useCallback(async () => {
    setIsSyncing(true)
    try {
      // 1. Yangiliklarni Google Sheetsdan olish
      const sheetNews = await fetchNewsFromSheet()
      if (sheetNews && Array.isArray(sheetNews)) {
        const validNews = filterValidNews(sheetNews)
        setNewsList(validNews)
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(validNews))
        } catch {}
      }

      // 2. Klublarni Google Sheetsdan olish
      const sheetClubs = await fetchClubsFromSheet()
      if (sheetClubs && Array.isArray(sheetClubs)) {
        const validClubs = filterValidClubs(sheetClubs)
        setClubsList(validClubs)
        try {
          localStorage.setItem(CLUBS_STORAGE_KEY, JSON.stringify(validClubs))
        } catch {}
      }

      // 3. Slideshowni Google Sheetsdan olish
      const sheetSlides = await fetchSlideshowFromSheet()
      if (sheetSlides && Array.isArray(sheetSlides) && sheetSlides.length > 0) {
        const validSlides = filterValidSlides(sheetSlides)
        if (validSlides.length > 0) {
          setSlidesList(validSlides)
          try {
            localStorage.setItem(SLIDES_STORAGE_KEY, JSON.stringify(validSlides))
          } catch {}
        }
      }

      // 4. Fotolavhalarni Google Sheetsdan olish
      try {
        const sheetGallery = await fetchGalleryFromSheet()
        if (sheetGallery && Array.isArray(sheetGallery) && sheetGallery.length > 0) {
          const validGallery = filterValidGallery(sheetGallery)
          if (validGallery.length > 0) {
            setGalleryList((prev) => {
              const existingIds = new Set(validGallery.map((g) => g.id))
              const existingImgs = new Set(validGallery.map((g) => g.image))
              const merged = [...validGallery]
              for (const p of prev) {
                if (!existingIds.has(p.id) && !existingImgs.has(p.image)) {
                  merged.push(p)
                }
              }
              const finalGallery = filterValidGallery(merged)
              try {
                localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(finalGallery))
              } catch {}
              return finalGallery
            })
          }
        }
      } catch (galleryErr) {
        console.warn('Gallery sync error:', galleryErr)
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

  useEffect(() => {
    try {
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(galleryList))
    } catch {
      // Storage error
    }
  }, [galleryList])

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

      setNewsList((prev) => {
        const next = [newItem, ...prev.filter((n) => n.id !== id)]
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch (err) {
          console.warn('LocalStorage save error:', err)
        }
        return next
      })

      try {
        await addNewsToSheet(newItem)
      } catch (err) {
        console.warn('Could not sync news to sheet:', err)
      }

      // Broadcast directly to all bot users in their private chat
      broadcastNewsToAllBotUsers(newItem).catch((err) =>
        console.warn('Telegram news broadcast error:', err)
      )

      return newItem
    },

    []
  )

  const updateNews = useCallback(
    async (id, updatedFields) => {
      let updatedItem = null
      setNewsList((prev) => {
        const next = prev.map((item) => {
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
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch (err) {
          console.warn('LocalStorage save error:', err)
        }
        return next
      })
      if (updatedItem) {
        try {
          await updateNewsInSheet(updatedItem)
        } catch (err) {
          console.warn('Could not update news in sheet:', err)
        }
      }
    },
    []
  )

  const deleteNews = useCallback(
    async (id) => {
      setNewsList((prev) => {
        const next = prev.filter((item) => item.id !== id)
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch (err) {
          console.warn('LocalStorage save error:', err)
        }
        return next
      })
      try {
        await deleteNewsFromSheet(id)
      } catch (err) {
        console.warn('Could not delete news from sheet:', err)
      }
    },
    []
  )

  const resetToDefaults = useCallback(() => {
    syncFromSheet()
  }, [syncFromSheet])

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
      const catLower = String(item.category || '').toLowerCase()
      const isTogarak =
        catLower.includes('to‘garak') ||
        catLower.includes('to\'garak') ||
        catLower.includes('togarak') ||
        catLower.includes('kurs')
      const prefix = isTogarak ? 'togarak' : 'club'
      const id = `${prefix}-${Date.now()}`
      const newClub = {
        id,
        title: item.title?.trim() || 'Yangi to‘garak',
        subtitle: item.subtitle?.trim() || '',
        description: item.description?.trim() || '',
        category: item.category?.trim() || 'To‘garak',
        price: item.price?.trim() || '100% Bepul',
        priceSubtext: item.priceSubtext?.trim() || 'Barcha talabalarga',
        membershipBadge: item.membershipBadge?.trim() || 'Aʼzolik Bepul',
        highlights: Array.isArray(item.highlights) ? item.highlights : [],
        image: item.image?.trim() || '',
        color: item.color || '#38bdf8',
        gradient: item.gradient || 'from-cyan-500/20 via-sky-500/10 to-transparent',
        createdAt: Date.now(),
      }

      setClubsList((prev) => {
        const next = [newClub, ...prev.filter((c) => c.id !== id)]
        try {
          localStorage.setItem(CLUBS_STORAGE_KEY, JSON.stringify(next))
        } catch (err) {
          console.warn('LocalStorage save error:', err)
        }
        return next
      })

      // Sync to Google Sheets tab "Klublar" in background
      try {
        await addClubToSheet(newClub)
      } catch (err) {
        console.warn('Could not sync club to Google Sheets:', err)
      }

      // Broadcast directly to all bot users in their private chat
      broadcastClubToAllBotUsers(newClub).catch((err) =>
        console.warn('Telegram club/course broadcast error:', err)
      )

      return newClub
    },

    []
  )

  const updateClub = useCallback(
    async (id, updatedFields) => {
      let updated = null
      setClubsList((prev) => {
        const next = prev.map((item) => {
          if (item.id === id) {
            updated = { ...item, ...updatedFields, updatedAt: Date.now() }
            return updated
          }
          return item
        })
        try {
          localStorage.setItem(CLUBS_STORAGE_KEY, JSON.stringify(next))
        } catch (err) {
          console.warn('LocalStorage save error:', err)
        }
        return next
      })
      if (updated) {
        try {
          await updateClubInSheet(updated)
        } catch (err) {
          console.warn('Could not update club in Google Sheets:', err)
        }
      }
    },
    []
  )

  const deleteClub = useCallback(
    async (id) => {
      saveDeletedClubId(id)
      setClubsList((prev) => {
        const next = prev.filter((item) => item.id !== id)
        try {
          localStorage.setItem(CLUBS_STORAGE_KEY, JSON.stringify(next))
        } catch (err) {
          console.warn('LocalStorage save error:', err)
        }
        return next
      })
      try {
        await deleteClubFromSheet(id)
      } catch (err) {
        console.warn('Could not delete club from Google Sheets:', err)
      }
    },
    []
  )

  const resetClubs = useCallback(() => {
    try {
      localStorage.removeItem(DELETED_CLUBS_KEY)
      localStorage.setItem(CLUBS_STORAGE_KEY, JSON.stringify([]))
    } catch {}
    setClubsList([])
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

      setSlidesList((prev) => {
        const next = [...prev.filter((s) => s.id !== id), newSlide]
        try {
          localStorage.setItem(SLIDES_STORAGE_KEY, JSON.stringify(next))
        } catch (err) {
          console.warn('LocalStorage save error:', err)
        }
        return next
      })

      try {
        await addSlideToSheet(newSlide)
      } catch (err) {
        console.warn('Could not sync slide to Google Sheets:', err)
      }
      return newSlide
    },
    []
  )

  const updateSlide = useCallback(
    async (id, updatedFields) => {
      let updated = null
      setSlidesList((prev) => {
        const next = prev.map((item) => {
          if (item.id === id) {
            updated = { ...item, ...updatedFields, updatedAt: Date.now() }
            return updated
          }
          return item
        })
        try {
          localStorage.setItem(SLIDES_STORAGE_KEY, JSON.stringify(next))
        } catch (err) {
          console.warn('LocalStorage save error:', err)
        }
        return next
      })
      if (updated) {
        try {
          await updateSlideInSheet(updated)
        } catch (err) {
          console.warn('Could not update slide in Google Sheets:', err)
        }
      }
    },
    []
  )

  const deleteSlide = useCallback(
    async (id) => {
      setSlidesList((prev) => {
        const next = prev.filter((item) => item.id !== id)
        try {
          localStorage.setItem(SLIDES_STORAGE_KEY, JSON.stringify(next))
        } catch (err) {
          console.warn('LocalStorage save error:', err)
        }
        return next
      })
      try {
        await deleteSlideFromSheet(id)
      } catch (err) {
        console.warn('Could not delete slide from Google Sheets:', err)
      }
    },
    []
  )

  const resetSlides = useCallback(() => {
    setSlidesList(defaultSlidesList)
    try {
      localStorage.setItem(SLIDES_STORAGE_KEY, JSON.stringify(defaultSlidesList))
    } catch {
      // ignore
    }
  }, [])

  // -------------------------------------------------------------------------
  // GALLERY ACTIONS (Fotolavhalar)
  // -------------------------------------------------------------------------
  const addGalleryPhoto = useCallback(
    async (item) => {
      const id = `foto-${Date.now()}`
      const newPhoto = {
        id,
        title: item.title?.trim() || 'UrDU Yoshlar Ittifoqi',
        image: item.image?.trim() || '',
        date: item.date?.trim() || new Date().toISOString().split('T')[0],
        category: item.category?.trim() || 'Talabalar hayoti',
        createdAt: Date.now(),
      }

      setGalleryList((prev) => {
        const next = [newPhoto, ...prev.filter((p) => p.id !== id)]
        try {
          localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(next))
        } catch (err) {
          console.warn('LocalStorage save error:', err)
        }
        return next
      })

      try {
        await addPhotoToSheet(newPhoto)
      } catch (err) {
        console.warn('Could not sync photo to Google Sheets:', err)
      }
      return newPhoto
    },
    []
  )

  const deleteGalleryPhoto = useCallback(
    async (id) => {
      saveDeletedGalleryId(id)
      setGalleryList((prev) => {
        const next = prev.filter((item) => item.id !== id)
        try {
          localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(next))
        } catch (err) {
          console.warn('LocalStorage save error:', err)
        }
        return next
      })
      try {
        await deletePhotoFromSheet(id)
      } catch (err) {
        console.warn('Could not delete photo from Google Sheets:', err)
      }
    },
    []
  )

  const resetGallery = useCallback(() => {
    try {
      localStorage.removeItem(DELETED_GALLERY_KEY)
      localStorage.removeItem(GALLERY_STORAGE_KEY)
    } catch {}
    setGalleryList(filterValidGallery(defaultGalleryList))
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

    // Gallery (Fotolavhalar)
    galleryList,
    addGalleryPhoto,
    deleteGalleryPhoto,
    resetGallery,

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
      newsList: [],
      clubsList: defaultClubsList,
      slidesList: defaultSlidesList,
      galleryList: defaultGalleryList,
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
      addGalleryPhoto: async () => {},
      deleteGalleryPhoto: async () => {},
      resetGallery: () => {},
    }
  }
  return context
}

export const useClubs = useNews
export const useSlideshow = useNews
export const useGallery = useNews
