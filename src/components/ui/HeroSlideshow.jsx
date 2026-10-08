import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import { useNews, defaultSlidesList } from '../../context/NewsContext'

const DELAY_MS = 5600

const REAL_EVENT_SLIDES = [
  { id: 'real-1', image: '/slide/photo_2026-08-19_17-46-57.jpg', title: 'UrDU yoshlar forumi va tantanali taqdirlash' },
  { id: 'real-2', image: '/slide/photo_2026-08-19_17-46-56.jpg', title: 'Tashakkurnoma va nufuzli mukofotlar topshirilishi' },
  { id: 'real-3', image: '/slide/photo_2026-09-03_14-24-19.jpg', title: 'Yoshlar harakati va yangi tashabbuslar anjumani' },
  { id: 'real-4', image: '/slide/photo_2026-09-13_00-08-45.jpg', title: 'Yillik hisobot va istiqbolli rejalar taqdimoti' },
  { id: 'real-5', image: '/slide/photo_2026-09-03_14-24-20.jpg', title: 'Yetakchilar ochiq muloqoti va davra suhbati' },
  { id: 'real-6', image: '/slide/photo_2026-08-19_17-45-29.jpg', title: 'Yetakchilar kengashining navbatdagi majlisi' },
  { id: 'real-7', image: '/slide/photo_2026-08-19_17-46-23.jpg', title: 'Iqtidorli talabalar loyihalari va tashabbuslari' },
  { id: 'real-8', image: '/slide/photo_2026-09-03_14-24-20-2.jpg', title: 'UrDU talaba-yoshlar assambleyasi' },
  { id: 'real-9', image: '/slide/photo_2026-09-03_14-24-20-3.jpg', title: 'Tashabbuskor qizlar va yoshlar yetakchilari faoliyati' },
]

export default function HeroSlideshow() {
  const navigate = useNavigate()
  const { slidesList } = useNews()
  // Faqat real hayot fotosuratlari (banner va logolar filtrlanadi)
  const items = [
    ...REAL_EVENT_SLIDES,
    ...(slidesList || defaultSlidesList).filter(
      (s) =>
        s &&
        s.image &&
        !s.image.includes('/slide/1.jpg') &&
        !s.image.includes('/slide/2.jpg') &&
        !s.image.includes('/slide/3.jpg') &&
        !s.image.includes('/slide/4.jpg') &&
        !s.image.toLowerCase().includes('logo') &&
        !s.image.toLowerCase().includes('banner')
    ),
  ]
  const count = items.length

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Indeks chegaradan chiqib ketmasligi uchun
  useEffect(() => {
    if (currentIndex >= count) {
      setCurrentIndex(0)
    }
  }, [count, currentIndex])

  // Avtomatik uzluksiz oqim (sichqoncha rasm ustida bo'lsa to'xtab turadi)
  useEffect(() => {
    if (count <= 1 || isHovered) return undefined
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % count)
    }, DELAY_MS)
    return () => clearInterval(timer)
  }, [count, isHovered])

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % count)
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + count) % count)

  const handleContainerClick = () => {
    navigate('/ittifoq-hayoti')
  }

  return (
    <div
      onClick={handleContainerClick}
      title="UrDU Yoshlar ittifoqi fotolavhalarini ko‘rish"
      className="group relative w-full aspect-[16/10] overflow-hidden rounded-2xl md:rounded-3xl border border-zinc-200/80 bg-zinc-950 shadow-2xl shadow-emerald-950/15 select-none cursor-pointer dark:border-white/10 dark:shadow-black/60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slaydlar maydoni */}
      <div className="absolute inset-0 overflow-hidden">
        {items.map((item, idx) => {
          const isActive = idx === currentIndex
          return (
            <div
              key={item.id || idx}
              className={`absolute inset-0 overflow-hidden transition-all duration-[1100ms] ease-in-out ${
                isActive
                  ? 'opacity-100 z-10 visible'
                  : 'opacity-0 z-0 invisible pointer-events-none'
              }`}
            >
              <img
                src={item.image}
                alt={item.title || `UrDU Tadbirlari ${idx + 1}`}
                className={`h-full w-full object-cover object-center transition-transform duration-[7500ms] linear ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = '/slide/photo_2026-08-19_17-46-57.jpg'
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Hover paytida burchakdagi nozik belgi */}
      <div className="absolute top-3.5 right-3.5 z-20 pointer-events-none flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-[11px] font-semibold text-white/95 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/15 shadow-lg">
        <span>Ittifoq hayoti</span>
        <ArrowUpRight size={13} className="text-emerald-400" />
      </div>

      {/* Navigatsiya strelkalari (sichqoncha rasm ustiga borganda silliq paydo bo'ladi) */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
            aria-label="Oldingi rasm"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-zinc-900 shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white active:scale-95 cursor-pointer dark:bg-black/75 dark:text-white dark:hover:bg-black"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            aria-label="Keyingi rasm"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-zinc-900 shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white active:scale-95 cursor-pointer dark:bg-black/75 dark:text-white dark:hover:bg-black"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </>
      )}

      {/* Pastki markazdagi ko'rsatkich nuqtalar (Dots) */}
      {count > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {items.map((_, dotIdx) => {
            const isActive = dotIdx === currentIndex
            return (
              <button
                key={dotIdx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(dotIdx)
                }}
                aria-label={`Rasm ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-350 cursor-pointer ${
                  isActive
                    ? 'w-7 bg-white shadow-md shadow-black/50'
                    : 'w-2 bg-white/55 hover:bg-white/80'
                }`}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
