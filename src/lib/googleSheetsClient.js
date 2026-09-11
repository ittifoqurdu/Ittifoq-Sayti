// Google Sheets Apps Script API Client
export const GOOGLE_SHEETS_API_URL =
  import.meta.env.VITE_GOOGLE_SHEETS_API_URL ||
  'https://script.google.com/macros/s/AKfycbwgo_M_x-LyeNzPVouJYvIKuFijSZ-Rmv_wesNCRwbIH8lf2mnI1rGf-3NBrMJpQyB1/exec'

export const GOOGLE_SPREADSHEET_URL =
  'https://docs.google.com/spreadsheets/d/1uZuaLsSpWfMrpoRf_IU0xp1fzdxMDfYqurhpDTkjcXk/edit'

/**
 * Fetch all news from Google Sheet "Yangiliklar" tab
 */
export async function fetchNewsFromSheet() {
  try {
    const res = await fetch(GOOGLE_SHEETS_API_URL, {
      method: 'GET',
    })
    if (!res.ok) throw new Error('Fetch failed')
    const data = await res.json()
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item) => ({
        ...item,
        highlights: typeof item.highlights === 'string' && item.highlights.startsWith('[')
          ? JSON.parse(item.highlights)
          : Array.isArray(item.highlights)
          ? item.highlights
          : [],
      }))
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
    return { success: false }
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
    return { success: false }
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
    return { success: false }
  }
}
