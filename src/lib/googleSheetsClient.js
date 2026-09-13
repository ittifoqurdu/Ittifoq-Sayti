import { formatNewsDate, getCategoryFallbackImage } from './utils'

// Google Sheets Apps Script & Visualization API Client
export const SPREADSHEET_ID = '1uZuaLsSpWfMrpoRf_IU0xp1fzdxMDfYqurhpDTkjcXk'

export const GOOGLE_SHEETS_API_URL =
  import.meta.env.VITE_GOOGLE_SHEETS_API_URL ||
  'https://script.google.com/macros/s/AKfycbwgo_M_x-LyeNzPVouJYvIKuFijSZ-Rmv_wesNCRwbIH8lf2mnI1rGf-3NBrMJpQyB1/exec'

export const GOOGLE_SPREADSHEET_URL =
  `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`

export const GVIZ_URL =
  `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=Yangiliklar&headers=1`

/**
 * Fetch all news from Google Sheet "Yangiliklar" tab
 * Priority 1: Google Sheets GViz API (Fastest, direct Google CDN cache, no Apps Script cold-start)
 * Priority 2: Google Apps Script Web App GET
 */
export async function fetchNewsFromSheet() {
  // 1. Direct GViz Endpoint
  try {
    const res = await fetch(`${GVIZ_URL}&_t=${Date.now()}`, {
      method: 'GET',
      headers: {
        Accept: 'text/plain,application/json',
      },
    })

    if (res.ok) {
      const text = await res.text()
      const match = text.match(/google\.visualization\.Query\.setResponse\((.*)\);/s)
      if (match && match[1]) {
        const parsed = JSON.parse(match[1])
        const rows = parsed?.table?.rows || []

        if (rows.length > 0) {
          const items = rows
            .map((row) => {
              const c = row.c || []
              const getVal = (i) =>
                i < c.length && c[i] && c[i].v !== null && c[i].v !== undefined ? c[i].v : ''
              const getFmt = (i) =>
                i < c.length && c[i] && c[i].f !== null && c[i].f !== undefined ? c[i].f : getVal(i)

              const id = String(getVal(0) || '').trim()
              if (!id || id.toLowerCase() === 'id') return null

              const title = String(getVal(1) || '').trim()
              if (!title || title.toLowerCase() === 'title') return null

              const rawDate = getFmt(2) || getVal(2) || ''
              const dateStr = formatNewsDate(rawDate)
              const category = String(getVal(3) || 'Eʼlon & Tanlov').trim()
              const image = String(getVal(8) || '').trim() || getCategoryFallbackImage(category)

              return {
                id,
                title,
                date: dateStr,
                category,
                badge: String(getVal(4) || '📌 Yangi Eʼlon').trim(),
                readTime: String(getVal(5) || '3 daqiqa').trim(),
                summary: String(getVal(6) || '').trim(),
                content: String(getVal(7) || '').trim(),
                highlights: [],
                image,
                actionUrl: String(getVal(9) || '').trim(),
                actionLabel: String(getVal(10) || 'Batafsil maʼlumot').trim(),
              }
            })
            .filter(Boolean)

          if (items.length > 0) {
            // Newest added items to the sheet are at the bottom, so reverse to show newest first!
            return items.reverse()
          }
        }
      }
    }
  } catch (gvizErr) {
    console.warn('Google Sheets GViz fetch failed, trying Apps Script fallback:', gvizErr)
  }

  // 2. Apps Script Fallback
  try {
    const res = await fetch(GOOGLE_SHEETS_API_URL, {
      method: 'GET',
    })
    if (!res.ok) throw new Error('Fetch failed')
    const data = await res.json()
    if (Array.isArray(data) && data.length > 0) {
      return data
        .filter(
          (item) =>
            item &&
            item.id &&
            String(item.id).toLowerCase() !== 'id' &&
            item.title &&
            String(item.title).toLowerCase() !== 'title'
        )
        .map((item) => ({
          ...item,
          date: formatNewsDate(item.date),
          image: item.image || getCategoryFallbackImage(item.category),
          highlights:
            typeof item.highlights === 'string' && item.highlights.startsWith('[')
              ? JSON.parse(item.highlights)
              : Array.isArray(item.highlights)
              ? item.highlights
              : [],
        }))
        .reverse()
    }
    return null
  } catch (err) {
    console.warn('Could not load news from Google Sheets, using cached/default news:', err)
    return null
  }
}

/**
 * Post student message to Google Sheet "Murojaatlar" tab
 */
export async function sendMurojaatToSheet({ name, faculty, phone, message }) {
  try {
    const payload = {
      type: 'murojaat',
      name: name?.trim() || '',
      faculty: faculty?.trim() || '',
      phone: phone?.trim() || '',
      message: message?.trim() || '',
    }

    await fetch(GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    })

    return { success: true }
  } catch (err) {
    console.error('Error sending message to Google Sheets:', err)
    return { success: false, error: err.message }
  }
}

/**
 * Add a new article to Google Sheet "Yangiliklar" tab
 */
export async function addNewsToSheet(item) {
  try {
    const payload = {
      type: 'yangilik_qoshish',
      id: item.id,
      title: item.title,
      date: item.date,
      category: item.category,
      badge: item.badge,
      readTime: item.readTime,
      summary: item.summary,
      content: item.content,
      image: item.image || '',
      actionUrl: item.actionUrl || '',
      actionLabel: item.actionLabel || '',
    }

    await fetch(GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    })

    return { success: true }
  } catch (err) {
    console.error('Error adding news to Google Sheets:', err)
    return { success: false, error: err.message }
  }
}

/**
 * Update an existing article in Google Sheet
 */
export async function updateNewsInSheet(item) {
  try {
    const payload = {
      type: 'yangilik_tahrirlash',
      id: item.id,
      title: item.title,
      date: item.date,
      category: item.category,
      badge: item.badge,
      readTime: item.readTime,
      summary: item.summary,
      content: item.content,
      image: item.image || '',
      actionUrl: item.actionUrl || '',
      actionLabel: item.actionLabel || '',
    }

    await fetch(GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    })

    return { success: true }
  } catch (err) {
    console.error('Error updating news in Google Sheets:', err)
    return { success: false, error: err.message }
  }
}

/**
 * Delete an article from Google Sheet
 */
export async function deleteNewsFromSheet(id) {
  try {
    await fetch(GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        type: 'yangilik_ochirish',
        id,
      }),
    })

    return { success: true }
  } catch (err) {
    console.error('Error deleting news from Google Sheets:', err)
    return { success: false, error: err.message }
  }
}

// ---------------------------------------------------------------------------
// KLUBLAR VA TO‘GARAKLAR (Clubs & Student Initiatives)
// ---------------------------------------------------------------------------

export const GVIZ_KLUBLAR_URL =
  `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=Klublar&headers=1`

export async function fetchClubsFromSheet() {
  try {
    const res = await fetch(`${GVIZ_KLUBLAR_URL}&_t=${Date.now()}`, {
      method: 'GET',
      headers: { Accept: 'text/plain,application/json' },
    })
    if (res.ok) {
      const text = await res.text()
      const match = text.match(/google\.visualization\.Query\.setResponse\((.*)\);/s)
      if (match && match[1]) {
        const parsed = JSON.parse(match[1])
        const rows = parsed?.table?.rows || []
        if (rows.length > 0) {
          const items = rows
            .map((row) => {
              const c = row.c || []
              const getVal = (i) =>
                i < c.length && c[i] && c[i].v !== null && c[i].v !== undefined ? c[i].v : ''
              const id = String(getVal(0) || '').trim()
              if (!id || id.toLowerCase() === 'id') return null
              const title = String(getVal(1) || '').trim()
              if (!title || title.toLowerCase() === 'title') return null

              const subtitle = String(getVal(2) || '').trim()
              const description = String(getVal(3) || '').trim()
              const category = String(getVal(4) || 'To‘garak').trim()
              const highlightsRaw = String(getVal(5) || '').trim()
              const highlights = highlightsRaw
                ? highlightsRaw.split(/[,;\n]+/).map((s) => s.trim()).filter(Boolean)
                : []
              const image = String(getVal(6) || '').trim()
              const color = String(getVal(7) || '#38bdf8').trim()

              return {
                id,
                title,
                subtitle,
                description,
                category,
                highlights,
                image,
                color,
              }
            })
            .filter(Boolean)

          if (items.length > 0) return items
        }
      }
    }
  } catch (err) {
    console.warn('Could not fetch clubs from Google Sheets:', err)
  }
  return null
}

export async function addClubToSheet(item) {
  try {
    await fetch(GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        type: 'klub_qoshish',
        action: 'add_course_or_club',
        id: item.id,
        title: item.title,
        name: item.title,
        subtitle: item.subtitle || '',
        description: item.description || '',
        tavsif: item.description || '',
        category: item.category || 'To‘garak',
        turi: item.category || 'To‘garak',
        highlights: Array.isArray(item.highlights) ? item.highlights.join(', ') : item.highlights || '',
        image: item.image || '',
        rasm: item.image || '',
        color: item.color || '#38bdf8',
        status: 'Faol',
      }),
    })
    return { success: true }
  } catch (err) {
    console.error('Error adding club to Google Sheets:', err)
    return { success: false, error: err.message }
  }
}


export async function updateClubInSheet(item) {
  try {
    await fetch(GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        type: 'klub_tahrirlash',
        id: item.id,
        title: item.title,
        subtitle: item.subtitle || '',
        description: item.description || '',
        category: item.category || 'To‘garak',
        highlights: Array.isArray(item.highlights) ? item.highlights.join(', ') : item.highlights || '',
        image: item.image || '',
        color: item.color || '#38bdf8',
      }),
    })
    return { success: true }
  } catch (err) {
    console.error('Error updating club in Google Sheets:', err)
    return { success: false, error: err.message }
  }
}

export async function deleteClubFromSheet(id) {
  try {
    await fetch(GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        type: 'klub_ochirish',
        id,
      }),
    })
    return { success: true }
  } catch (err) {
    console.error('Error deleting club from Google Sheets:', err)
    return { success: false, error: err.message }
  }
}

// ---------------------------------------------------------------------------
// BOSH SAHIFA SLIDE SHOW (Hero Slideshow)
// ---------------------------------------------------------------------------

export const GVIZ_SLIDESHOW_URL =
  `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=Slideshow&headers=1`

export async function fetchSlideshowFromSheet() {
  try {
    const res = await fetch(`${GVIZ_SLIDESHOW_URL}&_t=${Date.now()}`, {
      method: 'GET',
      headers: { Accept: 'text/plain,application/json' },
    })
    if (res.ok) {
      const text = await res.text()
      const match = text.match(/google\.visualization\.Query\.setResponse\((.*)\);/s)
      if (match && match[1]) {
        const parsed = JSON.parse(match[1])
        const rows = parsed?.table?.rows || []
        if (rows.length > 0) {
          const items = rows
            .map((row) => {
              const c = row.c || []
              const getVal = (i) =>
                i < c.length && c[i] && c[i].v !== null && c[i].v !== undefined ? c[i].v : ''
              const id = String(getVal(0) || '').trim()
              if (!id || id.toLowerCase() === 'id') return null
              const title = String(getVal(1) || '').trim()
              if (!title || title.toLowerCase() === 'title') return null

              const tag = String(getVal(2) || 'Yutuq').trim()
              const image = String(getVal(3) || '').trim()

              if (!image) return null

              return {
                id,
                title,
                tag,
                image,
              }
            })
            .filter(Boolean)

          if (items.length > 0) return items
        }
      }
    }
  } catch (err) {
    console.warn('Could not fetch slideshow from Google Sheets:', err)
  }
  return null
}

export async function addSlideToSheet(item) {
  try {
    await fetch(GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        type: 'slide_qoshish',
        id: item.id,
        title: item.title,
        tag: item.tag || 'Yutuq',
        image: item.image,
      }),
    })
    return { success: true }
  } catch (err) {
    console.error('Error adding slide to Google Sheets:', err)
    return { success: false, error: err.message }
  }
}

export async function updateSlideInSheet(item) {
  try {
    await fetch(GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        type: 'slide_tahrirlash',
        id: item.id,
        title: item.title,
        tag: item.tag || 'Yutuq',
        image: item.image,
      }),
    })
    return { success: true }
  } catch (err) {
    console.error('Error updating slide in Google Sheets:', err)
    return { success: false, error: err.message }
  }
}

export async function deleteSlideFromSheet(id) {
  try {
    await fetch(GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        type: 'slide_ochirish',
        id,
      }),
    })
    return { success: true }
  } catch (err) {
    console.error('Error deleting slide from Google Sheets:', err)
    return { success: false, error: err.message }
  }
}
