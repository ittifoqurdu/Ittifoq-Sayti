import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IMG_DIR = path.resolve(__dirname, '../public/img')

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    })
    return await res.text()
  } catch (err) {
    console.error('Error fetching page:', url, err.message)
    return ''
  }
}

async function run() {
  console.log('Fetching multiple pages from urdu.uz news list...')
  const pages = []
  for (let i = 1; i <= 8; i++) {
    pages.push(`https://urdu.uz/uz/news/list?page=${i}`)
  }

  const imageUrls = []

  for (const pageUrl of pages) {
    console.log('Fetching', pageUrl)
    const html = await fetchPage(pageUrl)

    const regex = /https:\/\/urdu\.uz\/user_files\/[^\s"'>]+?\.(jpg|jpeg|png|webp)/gi
    let match
    while ((match = regex.exec(html)) !== null) {
      let imgUrl = match[0].replace(/&amp;/g, '&')
      if (
        !imageUrls.includes(imgUrl) &&
        !imgUrl.includes('logo') &&
        !imgUrl.includes('gerb') &&
        !imgUrl.includes('icon')
      ) {
        imageUrls.push(imgUrl)
      }
    }
  }

  console.log(`Found total ${imageUrls.length} unique news images from urdu.uz`)

  if (!fs.existsSync(IMG_DIR)) {
    fs.mkdirSync(IMG_DIR, { recursive: true })
  }

  const downloadedList = []
  let count = 1

  // Target up to 50-60 photos
  const targetUrls = imageUrls.slice(0, 60)

  for (const imgUrl of targetUrls) {
    const filename = `urdu_news_${count}.jpg`
    const destPath = path.join(IMG_DIR, filename)

    // Agar allaqachon mavjud bo'lsa va hajmi > 1000 bayt bo'lsa, qayta yuklamaymiz (tezlik uchun)
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      downloadedList.push({
        id: `urdu-news-${count}`,
        image: `/img/${filename}`,
      })
      count++
      continue
    }

    try {
      console.log(`Downloading (${count}/${targetUrls.length}): ${imgUrl}`)
      const res = await fetch(imgUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          Referer: 'https://urdu.uz/',
        },
      })
      if (!res.ok) {
        console.warn(`Failed with status ${res.status}: ${imgUrl}`)
        continue
      }
      const arrayBuf = await res.arrayBuffer()
      fs.writeFileSync(destPath, Buffer.from(arrayBuf))
      console.log(`Saved ${filename} (${arrayBuf.byteLength} bytes)`)

      downloadedList.push({
        id: `urdu-news-${count}`,
        image: `/img/${filename}`,
      })
      count++
    } catch (err) {
      console.error(`Error downloading ${imgUrl}:`, err.message)
    }
  }

  const jsonPath = path.resolve(__dirname, '../src/data/urduNewsPhotos.json')
  fs.writeFileSync(jsonPath, JSON.stringify(downloadedList, null, 2))
  console.log(`Finished! Total saved photos: ${downloadedList.length}`)
}

run()
