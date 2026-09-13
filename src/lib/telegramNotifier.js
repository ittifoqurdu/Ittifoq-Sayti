/**
 * Telegram Bot API Notifier
 * Directly delivers instant alerts to Telegram private chat (lichkaga) with exact photos and text
 */

export const BOT_TOKEN = '8763105008:AAH8qOyJrwNLRamWrgPVR5l0x1DIbvlToBg'
export const ADMIN_CHAT_ID = '6956456422'
export const WEBSITE_URL = 'https://ittifoq.ursu.uz'

/**
 * Convert base64 data URL to Blob for native Telegram multipart upload
 */
function dataURItoBlob(dataURI) {
  try {
    const byteString = atob(dataURI.split(',')[1])
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    return new Blob([ab], { type: mimeString })
  } catch (err) {
    console.warn('Base64 convert error:', err)
    return null
  }
}

/**
 * Send an HTML formatted message directly to Telegram private chat (lichkaga)
 * Supports uploaded base64 images, web URLs, and text
 */
export async function sendTelegramPrivateMessage(chatId, text, photoUrl = '') {
  if (!BOT_TOKEN || !chatId) return { success: false, error: 'No token or chatId' }

  // Telegram captions are limited to 1024 chars
  const safeCaption = text.length > 1020 ? text.substring(0, 1015) + '...' : text

  try {
    // 1. Uploaded Base64 Image
    if (photoUrl && photoUrl.startsWith('data:image')) {
      const blob = dataURItoBlob(photoUrl)
      if (blob) {
        const formData = new FormData()
        formData.append('chat_id', chatId)
        formData.append('photo', blob, 'club_photo.jpg')
        formData.append('caption', safeCaption)
        formData.append('parse_mode', 'HTML')

        const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()
        if (data.ok) return { success: true, data }
      }
    }

    // 2. Direct HTTP Image URL
    let resolvedPhoto = photoUrl
    if (resolvedPhoto && resolvedPhoto.startsWith('/')) {
      resolvedPhoto = `${WEBSITE_URL}${resolvedPhoto}`
    }

    if (resolvedPhoto && resolvedPhoto.startsWith('http')) {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          photo: resolvedPhoto,
          caption: safeCaption,
          parse_mode: 'HTML',
        }),
      })
      const data = await res.json()
      if (data.ok) return { success: true, data }
    }

    // 3. Text Only Fallback
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: false,
      }),
    })
    const data = await res.json()
    return { success: data.ok, data }
  } catch (err) {
    console.warn('Telegram private message send error:', err)
    return { success: false, error: err.message }
  }
}

/**
 * Send instant alert with exact image, subtitle and full description when a club is added
 */
export async function sendClubAlertToAdmin(club) {
  const highlightsText =
    Array.isArray(club.highlights) && club.highlights.length > 0
      ? `\n✨ <b>Yo‘nalishlar:</b> ${club.highlights.join(' • ')}`
      : ''

  const caption =
    `🎯 <b>YANGI TO‘GARAK / KLUB QO‘SHILDI!</b>\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `📌 <b>Nomi:</b> ${club.title || 'Nomsiz'}\n` +
    (club.subtitle ? `🔹 <i>${club.subtitle}</i>\n` : '') +
    `📂 <b>Kategoriya:</b> ${club.category || 'To‘garak'}\n` +
    (club.description ? `\n📝 <b>Tavsif:</b>\n${club.description}\n` : '') +
    highlightsText +
    `\n\n🌐 <a href="${WEBSITE_URL}/klublar">Saytda to‘garaklar sahifasini ko‘rish ↗️</a>`

  return sendTelegramPrivateMessage(ADMIN_CHAT_ID, caption, club.image)
}

/**
 * Send instant alert with exact image and text when an announcement/news is published
 */
export async function sendNewsAlertToAdmin(news) {
  const caption =
    `📢 <b>YANGI EʼLON / TANLOV SAYTDA EʼLON QILINDI!</b>\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `🏷️ <b>${news.badge || '📌 Muhim eʼlon'}</b>\n` +
    `📌 <b>${news.title || 'Nomsiz eʼlon'}</b>\n\n` +
    (news.summary ? `<i>${news.summary}</i>\n\n` : '') +
    (news.content ? `📝 <b>Batafsil:</b>\n${news.content.substring(0, 300)}...\n\n` : '') +
    (news.date ? `🗓️ <b>Sana:</b> ${news.date}\n` : '') +
    `📂 <b>Rukn:</b> ${news.category || 'Umumiy'}\n\n` +
    `🌐 <a href="${WEBSITE_URL}/yangiliklar">Saytda batafsil o‘qish ↗️</a>`

  return sendTelegramPrivateMessage(ADMIN_CHAT_ID, caption, news.image)
}
