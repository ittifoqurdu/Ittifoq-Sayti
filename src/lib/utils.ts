import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNewsDate(rawDate?: string | null): string {
  if (!rawDate) return ''
  const str = String(rawDate).trim()

  const months = [
    'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
    'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
  ]

  // If Google Visualization format: Date(2026,8,11)
  const gvizMatch = str.match(/Date\((\d+),\s*(\d+),\s*(\d+)/)
  if (gvizMatch) {
    const year = gvizMatch[1]
    const monthIdx = parseInt(gvizMatch[2], 10)
    const day = gvizMatch[3]
    const mName = months[monthIdx] || 'Sentabr'
    return `${day}-${mName}, ${year}`
  }

  // If already formatted like "10-Sentabr, 2026"
  if (/^\d{1,2}-[A-Za-zʻ’']+,?\s*\d{4}$/.test(str)) {
    return str
  }

  // If ISO string or YYYY-MM-DD
  const parsed = new Date(str)
  if (!isNaN(parsed.getTime())) {
    const day = parsed.getDate()
    const mName = months[parsed.getMonth()]
    const year = parsed.getFullYear()
    return `${day}-${mName}, ${year}`
  }

  return str
}

export function getCategoryFallbackImage(category?: string): string {
  const cat = (category || '').toLowerCase()
  if (cat.includes('intellektual') || cat.includes('zakovat')) {
    return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80'
  }
  if (cat.includes('it') || cat.includes('hackathon') || cat.includes('texnologiya') || cat.includes('startap')) {
    return 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80'
  }
  if (cat.includes('madaniyat') || cat.includes('sanʼat') || cat.includes('festival')) {
    return 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=1200&auto=format&fit=crop&q=80'
  }
  if (cat.includes('ijtimoiy') || cat.includes('volontyor') || cat.includes('yashil')) {
    return 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80'
  }
  if (cat.includes('xalqaro') || cat.includes('grant') || cat.includes('erasmus')) {
    return 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80'
  }
  return 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80'
}
