/**
 * Client-side image compressor using HTML Canvas
 * Resizes large images to fit within max dimensions and compresses to lightweight JPEG
 * Prevents Google Sheets cell quota issues (50,000 char limit) and ensures sub-second sync
 */
export async function compressImage(file, maxWidth = 800, maxHeight = 500, quality = 0.68) {
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

        let curQuality = quality
        let compressedBase64 = canvas.toDataURL('image/jpeg', curQuality)

        // Ensure string length is under 42,000 characters to safely fit in Google Sheets cell (<50,000) & LocalStorage
        let attempts = 0
        while (compressedBase64.length > 42000 && attempts < 4) {
          attempts++
          curQuality = Math.max(0.35, curQuality - 0.15)
          // Also downscale canvas if still large
          const tempCanvas = document.createElement('canvas')
          const scale = 0.85
          tempCanvas.width = Math.round(canvas.width * scale)
          tempCanvas.height = Math.round(canvas.height * scale)
          const tempCtx = tempCanvas.getContext('2d')
          if (tempCtx) {
            tempCtx.fillStyle = '#FFFFFF'
            tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height)
            tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height)
            compressedBase64 = tempCanvas.toDataURL('image/jpeg', curQuality)
            canvas.width = tempCanvas.width
            canvas.height = tempCanvas.height
            const freshCtx = canvas.getContext('2d')
            freshCtx?.drawImage(tempCanvas, 0, 0)
          } else {
            compressedBase64 = canvas.toDataURL('image/jpeg', curQuality)
          }
        }

        resolve(compressedBase64)
      }
      img.onerror = (err) => reject(err)
      img.src = event.target?.result
    }
    reader.onerror = (err) => reject(err)
    reader.readAsDataURL(file)
  })
}

