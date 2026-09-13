import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'
import { useNews, defaultSlidesList } from '../../context/NewsContext'

const INTERVAL_MS = 3000 // Har 3 sekundda almashadi

export default function HeroSlideshow() {
  const { slidesList } = useNews()
  const items = slidesList && slidesList.length > 0 ? slidesList : defaultSlidesList
  const count = items.length

  const [currentIndex, setCurrentIndex] = useState(0)

  // Indeks chegaradan chiqib ketmasligi uchun
  useEffect(() => {
    if (currentIndex >= count) {
      setCurrentIndex(0)
    }
  }, [count, currentIndex])

  // Avtomatik uzluksiz oqim (3 sekund)
  useEffect(() => {
    if (count <= 1) return undefined
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % count)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [count])

  // Vertikal o'lchamlar va offsetlar (kartalar yuqoridan kelib pastga oqadi)
  const getCardStyle = (i) => {
    let offset = (currentIndex - i) % count
    if (offset > count / 2) offset -= count
    if (offset < -count / 2) offset += count

    // O'rtadagi asosiy katta karta
    if (offset === 0) {
      return {
        y: 0,
        scale: 1,
        opacity: 1,
        zIndex: 20,
        filter: 'blur(0px)',
        isCenter: true,
      }
    }
    // Yuqoridagi kelayotgan karta
    if (offset === -1) {
      return {
        y: -155,
        scale: 0.88,
        opacity: 0.42,
        zIndex: 10,
        filter: 'blur(0.5px)',
        isCenter: false,
      }
    }
    // Pastdagi ketayotgan karta
    if (offset === 1) {
      return {
        y: 155,
        scale: 0.88,
        opacity: 0.42,
        zIndex: 10,
        filter: 'blur(0.5px)',
        isCenter: false,
      }
    }
    // Yuqoridan kirishga tayyor turgan
    if (offset === -2) {
      return {
        y: -260,
        scale: 0.75,
        opacity: 0,
        zIndex: 0,
        filter: 'blur(2px)',
        isCenter: false,
      }
    }
    // Pastga chiqib ketgan
    return {
      y: 260,
      scale: 0.75,
      opacity: 0,
      zIndex: 0,
      filter: 'blur(2px)',
      isCenter: false,
    }
  }

  return (
    <div className="relative w-full max-w-[540px] xl:max-w-[580px] mx-auto select-none py-2">
      {/* Orqa fon yumshoq emerald nur */}
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-[320px] rounded-[2.5rem] bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-emerald-500/20 blur-3xl opacity-70 pointer-events-none" />

      {/* Vertikal Oqim Karuseli - Butunlay sinxron, hech qanday bug va miltillashsiz */}
      <div className="relative h-[440px] sm:h-[480px] lg:h-[490px] w-full flex items-center justify-center overflow-hidden">
        {items.map((item, i) => {
          const style = getCardStyle(i)

          return (
            <motion.div
              key={item.id}
              animate={{
                y: style.y,
                scale: style.scale,
                opacity: style.opacity,
                zIndex: style.zIndex,
                filter: style.filter,
              }}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1], // Butunlay silliq, tabiiy oqim
              }}
              className={`absolute w-full h-[290px] sm:h-[330px] lg:h-[345px] rounded-[2rem] sm:rounded-[2.25rem] overflow-hidden shadow-2xl ${
                style.isCenter
                  ? 'border-2 border-emerald-500/50 dark:border-emerald-400/40 ring-1 ring-emerald-500/20'
                  : 'border border-white/20 dark:border-white/10'
              }`}
            >
              {/* Rasm */}
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover object-center"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = '/slide/photo_2026-08-19_17-46-57.jpg'
                }}
              />

              {/* Gradient qatlamlar */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  style.isCenter
                    ? 'bg-gradient-to-t from-black/95 via-black/35 to-black/15'
                    : 'bg-black/60'
                }`}
              />

              {/* Tag (faqat o'rtadagi asosiy kartada tiniq ko'rinadi) */}
              <div
                className={`absolute top-4 left-4 sm:top-5 sm:left-5 z-10 transition-opacity duration-300 ${
                  style.isCenter ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-black/65 px-3.5 py-1 text-xs font-bold text-emerald-300 shadow-md backdrop-blur-md">
                  <Sparkles size={12} className="text-emerald-400" />
                  {item.tag}
                </span>
              </div>

              {/* Faqat qisqa Title (faqat o'rtadagi kartada) */}
              <div
                className={`absolute bottom-0 inset-x-0 p-5 sm:p-7 z-10 transition-opacity duration-300 ${
                  style.isCenter ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <h3 className="text-2xl sm:text-3xl lg:text-[30px] font-black tracking-tight text-white leading-snug drop-shadow-[0_4px_14px_rgba(0,0,0,0.9)]">
                  {item.title}
                </h3>
              </div>

              {/* 3 sekundlik nozik chiziq (faqat o'rtadagi kartada) */}
              {style.isCenter && (
                <div className="absolute bottom-0 inset-x-0 h-1 bg-white/15 z-20 overflow-hidden">
                  <motion.div
                    key={`progress-${item.id}`}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, ease: 'linear' }}
                    className="h-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]"
                  />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
