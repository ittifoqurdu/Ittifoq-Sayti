/**
 * Client-side image compressor using HTML Canvas
 * Resizes large images to fit within max dimensions and compresses to lightweight JPEG
 * Prevents Google Sheets cell quota issues (50,000 char limit) and ensures sub-second sync
 */
export async function compressImage(file, maxWidth = 900, maxHeight = 700, quality = 0.72) {
  return new Promise((resolve, reject) => {
    if (!file || !(file instanceof Blob)) {
      return reject(new Error('Yaroqsiz rasm fayli'))
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        let { width, height } = img

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width)
          width = maxWidth
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height)
          height = maxHeight
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          return resolve(event.target?.result)
        }

        // Fill background white for transparent PNGs converted to JPEG
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, width, height)

        ctx.drawImage(img, 0, 0, width, height)
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality)
        resolve(compressedBase64)
      }
      img.onerror = (err) => reject(err)
      img.src = event.target?.result
    }
    reader.onerror = (err) => reject(err)
    reader.readAsDataURL(file)
  })
}
