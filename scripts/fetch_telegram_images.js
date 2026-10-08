import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IMG_DIR = path.resolve(__dirname, '../public/img')

async function fetchHtml(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    })
    return await res.text()
  } catch (err) {
    console.error('Error fetching', url, err.message)
    return ''
  }
}

async function run() {
  console.log('Fetching multiple Telegram batches from @UrDU_YI ...')
  const allImageUrls = []

  let currentUrl = 'https://t.me/s/UrDU_YI'
  for (let page = 1; page <= 4; page++) {
    console.log(`Fetching batch ${page}: ${currentUrl}`)
    const html = await fetchHtml(currentUrl)

    const regex = /https:\/\/cdn\d*\.telesco\.pe\/file\/[^\s"')]+/gi
    let m
    while ((m = regex.exec(html)) !== null) {
      const url = m[0]
      if (
        (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png')) &&
        !allImageUrls.includes(url)
      ) {
        allImageUrls.push(url)
      }
    }

    // Find next page link (rel="prev" in Telegram web channels)
    const prevMatch = html.match(/href="\/s\/UrDU_YI\?before=(\d+)"/i)
    if (prevMatch && prevMatch[1]) {
      currentUrl = `https://t.me/s/UrDU_YI?before=${prevMatch[1]}`
    } else {
      break
    }
  }

  console.log(`Found total ${allImageUrls.length} photos from @UrDU_YI Telegram channel`)

  if (!fs.existsSync(IMG_DIR)) {
    fs.mkdirSync(IMG_DIR, { recursive: true })
  }

  const downloadedPhotos = []
  let count = 1
  const targetPhotos = allImageUrls.slice(0, 50)

  for (const imgUrl of targetPhotos) {
    const filename = `tg_photo_${count}.jpg`
    const destPath = path.join(IMG_DIR, filename)

    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      downloadedPhotos.push({
        id: `tg-${count}`,
        image: `/img/${filename}`,
      })
      count++
      continue
    }

    try {
      console.log(`Downloading (${count}/${targetPhotos.length}): ${filename}`)
      const imgRes = await fetch(imgUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          Referer: 'https://t.me/',
        },
      })

      if (!imgRes.ok) {
        console.warn(`Failed ${imgUrl}: ${imgRes.status}`)
        continue
      }

      const buf = Buffer.from(await imgRes.arrayBuffer())
      fs.writeFileSync(destPath, buf)
      console.log(`Saved ${filename} (${buf.byteLength} bytes)`)

      downloadedPhotos.push({
        id: `tg-${count}`,
        image: `/img/${filename}`,
      })
      count++
    } catch (err) {
      console.error(`Error downloading ${imgUrl}:`, err.message)
    }
  }

  const jsonPath = path.resolve(__dirname, '../src/data/telegramPhotos.json')
  fs.writeFileSync(jsonPath, JSON.stringify(downloadedPhotos, null, 2))
  console.log(`Finished! Successfully saved ${downloadedPhotos.length} Telegram photos to ${IMG_DIR}`)
}

run()
