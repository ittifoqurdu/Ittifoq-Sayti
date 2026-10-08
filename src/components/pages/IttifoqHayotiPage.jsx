import { useState, useEffect, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  ArrowLeft,
  Camera,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Check,
} from 'lucide-react'
import { useNews, defaultSlidesList } from '../../context/NewsContext'
import urduNewsPhotos from '../../data/urduNewsPhotos.json'
import FooterSection from '../sections/FooterSection'

// Real Yoshlar ittifoqi tadbirlari va slayd suratlari
const SLIDE_PHOTOS = [
  { id: 's-1', image: '/slide/photo_2026-08-19_17-46-57.jpg' },
  { id: 's-2', image: '/slide/photo_2026-08-19_17-46-56.jpg' },
  { id: 's-3', image: '/slide/photo_2026-09-03_14-24-19.jpg' },
  { id: 's-4', image: '/slide/photo_2026-09-13_00-08-45.jpg' },
  { id: 's-5', image: '/slide/photo_2026-09-03_14-24-20.jpg' },
  { id: 's-6', image: '/slide/photo_2026-08-19_17-45-29.jpg' },
  { id: 's-7', image: '/slide/photo_2026-08-19_17-46-23.jpg' },
  { id: 's-8', image: '/slide/photo_2026-09-03_14-24-20-2.jpg' },
  { id: 's-9', image: '/slide/photo_2026-09-03_14-24-20-3.jpg' },
  { id: 's-10', image: '/slide/1.jpg' },
  { id: 's-11', image: '/slide/2.jpg' },
  { id: 's-12', image: '/slide/3.jpg' },
  { id: 's-13', image: '/slide/4.jpg' },
]

export default function IttifoqHayotiPage() {
  const { slidesList } = useNews()
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [copiedLink, setCopiedLink] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  // Barcha ko'p sonli fotolavhalarni birlashtiramiz (urdu.uz dan 60 ta + 13 ta slayd)
  const allPhotos = useMemo(() => {
    const list = [...urduNewsPhotos, ...SLIDE_PHOTOS]
    const currentSlides = slidesList && slidesList.length > 0 ? slidesList : defaultSlidesList

    currentSlides.forEach((slide) => {
      if (!slide || !slide.image) return
      const alreadyExists = list.some((p) => p.image === slide.image)
      if (!alreadyExists) {
        list.push({
          id: slide.id || `custom-${Math.random().toString(36).slice(2, 7)}`,
          image: slide.image,
        })
      }
    })

    return list
  }, [slidesList])

  const openLightbox = (index) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const showNext = useCallback(() => {
    if (lightboxIndex === null || allPhotos.length === 0) return
    setLightboxIndex((prev) => (prev + 1) % allPhotos.length)
  }, [lightboxIndex, allPhotos.length])

  const showPrev = useCallback(() => {
    if (lightboxIndex === null || allPhotos.length === 0) return
    setLightboxIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length)
  }, [lightboxIndex, allPhotos.length])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') showNext()
      if (e.key === 'ArrowLeft') showPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, showNext, showPrev])

  const currentLightboxPhoto =
    lightboxIndex !== null ? allPhotos[lightboxIndex] : null

  const [downloading, setDownloading] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const handleShare = async (photo) => {
    const shareUrl = window.location.origin + photo.image
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl)
        setCopiedLink(true)
        setToastMessage('Rasm havolasi nusxalandi!')
        setTimeout(() => {
          setCopiedLink(false)
          setToastMessage('')
        }, 2500)
      }
    } catch {
      setToastMessage('Nusxalashda xatolik yuz berdi')
      setTimeout(() => setToastMessage(''), 2500)
    }
  }

  const handleDownload = async (photo) => {
    if (!photo || !photo.image || downloading) return
    setDownloading(true)
    try {
      const response = await fetch(photo.image)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      const filename = photo.image.split('/').pop() || 'urdu_fotolavha.jpg'
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
      setToastMessage('Rasm yuklab olindi!')
      setTimeout(() => setToastMessage(''), 2500)
    } catch {
      // Fallback: yangi oynada ochish
      window.open(photo.image, '_blank')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="min-h-screen pt-14 sm:pt-16 bg-[#F5F0E8] dark:bg-[#07090d] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Grand Hero Banner */}
      <section className="relative overflow-hidden border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="absolute inset-0 z-0">
          <img
            src="/img/urdu_news_1.jpg"
            alt="UrDU Fotolavhalar"
            className="h-full w-full object-cover object-center filter brightness-[0.35] contrast-[1.05] dark:brightness-[0.22] scale-105"
            loading="eager"
            onError={(e) => {
              e.currentTarget.src = '/slide/photo_2026-08-19_17-46-57.jpg'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-zinc-950/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/25 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 pt-8 sm:pt-12 pb-10 sm:px-7 sm:pb-12 lg:pt-12 lg:pb-14">
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur-md transition-all hover:border-emerald-400 hover:bg-black/60 hover:text-emerald-300"
            >
              <ArrowLeft size={14} />
              <span>Bosh sahifaga qaytish</span>
            </Link>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300 backdrop-blur-md shadow-lg">
              <Camera size={14} />
              Fotolavhalar
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.15]">
              UrDU va Yoshlar ittifoqi{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                fotolavhalari
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Faqat toza rasmlar galereyasi: Hech qanday sonlar, izohlar yoki yo'nalishlarsiz */}
      <section className="mx-auto w-full max-w-[1440px] px-3 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4">
          {allPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id || idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: Math.min(idx * 0.015, 0.35) }}
              onClick={() => openLightbox(idx)}
              className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl border border-zinc-200/80 bg-zinc-950 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/60 hover:shadow-xl dark:border-zinc-800/90 select-none"
            >
              <img
                src={photo.image}
                alt="UrDU fotolavhasi"
                className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/slide/photo_2026-08-19_17-46-57.jpg'
                }}
              />

              {/* Nozik hover qoraytirish */}
              <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fullscreen Lightbox Modal (Portal to body for z-index isolation) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {currentLightboxPhoto && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 select-none"
                onClick={closeLightbox}
              >
                <div
                  className="relative flex flex-col max-h-[94vh] max-w-6xl w-full items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Top Controls Bar */}
                  <div className="w-full flex items-center justify-between pb-3 text-white text-xs">
                    {/* Toast feedback */}
                    <div>
                      {toastMessage && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 text-zinc-950 font-bold px-3.5 py-1.5 shadow-xl backdrop-blur-md animate-fade-in text-xs border border-emerald-400">
                          <Check size={14} strokeWidth={2.5} />
                          {toastMessage}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2.5">
                      {/* Share / Copy link button */}
                      <button
                        type="button"
                        onClick={() => handleShare(currentLightboxPhoto)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/95 text-white border border-white/30 shadow-2xl backdrop-blur-md transition-all duration-200 hover:bg-zinc-800 hover:border-cyan-400 hover:text-cyan-400 active:scale-95 cursor-pointer"
                        title="Havolani nusxalash"
                      >
                        {copiedLink ? <Check size={18} className="text-emerald-400" /> : <ExternalLink size={18} />}
                      </button>

                      {/* Download button */}
                      <button
                        type="button"
                        onClick={() => handleDownload(currentLightboxPhoto)}
                        disabled={downloading}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/95 text-white border border-white/30 shadow-2xl backdrop-blur-md transition-all duration-200 hover:bg-zinc-800 hover:border-emerald-400 hover:text-emerald-400 active:scale-95 cursor-pointer"
                        title="Suratni yuklab olish"
                      >
                        <Download size={18} className={downloading ? 'animate-bounce text-emerald-400' : ''} />
                      </button>

                      {/* Close button */}
                      <button
                        type="button"
                        onClick={closeLightbox}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/95 text-white border border-white/30 shadow-2xl backdrop-blur-md transition-all duration-200 hover:bg-zinc-800 hover:border-rose-400 hover:text-rose-400 active:scale-95 cursor-pointer"
                        title="Yopish (Esc)"
                      >
                        <X size={20} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>

                  {/* Main Image View */}
                  <div className="relative flex items-center justify-center max-h-[80vh] w-full overflow-hidden rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl">
                    <img
                      src={currentLightboxPhoto.image}
                      alt="UrDU fotolavhasi"
                      className="max-h-[80vh] w-auto max-w-full object-contain"
                    />

                    {allPhotos.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={showPrev}
                          aria-label="Oldingi surat"
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900/90 text-white backdrop-blur-md transition-all duration-200 hover:bg-zinc-800 hover:border-emerald-400 hover:text-emerald-400 hover:scale-105 active:scale-95 cursor-pointer border border-white/25 shadow-2xl"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button
                          type="button"
                          onClick={showNext}
                          aria-label="Keyingi surat"
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900/90 text-white backdrop-blur-md transition-all duration-200 hover:bg-zinc-800 hover:border-emerald-400 hover:text-emerald-400 hover:scale-105 active:scale-95 cursor-pointer border border-white/25 shadow-2xl"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      <FooterSection showContactForm={false} />
    </div>
  )
}
