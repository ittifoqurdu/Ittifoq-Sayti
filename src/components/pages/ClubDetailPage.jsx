import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Send,
  Share2,
  Sparkles,
  CheckCircle2,
  Users,
  Award,
  Calendar,
  Layers,
  Check,
  Building2,
  Phone,
} from 'lucide-react'
import { useNews, defaultClubsList } from '../../context/NewsContext'
import { socialLinks, profile } from '../../data/siteData'
import FooterSection from '../sections/FooterSection'

export default function ClubDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { clubsList } = useNews()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [id])

  const allClubs = clubsList && clubsList.length > 0 ? clubsList : defaultClubsList

  // Find active club by id or slug
  const currentClub =
    allClubs.find((c) => String(c.id).toLowerCase() === String(id).toLowerCase()) ||
    allClubs.find((c) => String(c.title).toLowerCase().includes(String(id).toLowerCase())) ||
    allClubs[0] ||
    {}

  const otherClubs = allClubs.filter((c) => c.id !== currentClub.id).slice(0, 3)

  const IconComponent = currentClub.icon || Compass
  const highlights = Array.isArray(currentClub.highlights) ? currentClub.highlights : []
  const bannerImage =
    currentClub.image ||
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80'

  const handleShare = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Ignore
    }
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-28 bg-[#F5F0E8] dark:bg-[#07090d] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-zinc-200/80 bg-white/60 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/40 relative z-20">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-4 py-3.5 sm:px-7">
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 min-w-0">
            <Link
              to="/"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium shrink-0"
            >
              <ArrowLeft size={14} />
              Bosh sahifa
            </Link>
            <span className="shrink-0 text-zinc-400">/</span>
            <Link
              to="/klublar"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium shrink-0"
            >
              Klublar va to‘garaklar
            </Link>
            <span className="hidden sm:inline shrink-0 text-zinc-400">/</span>
            <span className="hidden sm:inline font-semibold text-zinc-800 dark:text-zinc-200 truncate">
              {currentClub.title}
            </span>
          </div>

          <Link
            to="/klublar"
            className="inline-flex items-center gap-1.5 rounded-full bg-zinc-200/80 px-3.5 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors shrink-0 shadow-sm"
          >
            <ArrowLeft size={13} />
            <span>Barcha to‘garaklar</span>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="mx-auto max-w-[1000px] px-4 py-10 sm:px-7 sm:py-14">
        <article className="space-y-10">
          {/* Header & Meta */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                  <Sparkles size={13} />
                  {currentClub.category || 'To‘garak & Tashabbus'}
                </span>
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  UrDU Yoshlar Ittifoqi BT
                </span>
              </div>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300/80 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-500" />
                    <span>Nusxa olindi!</span>
                  </>
                ) : (
                  <>
                    <Share2 size={13} />
                    <span>Ulashish</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-start gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-zinc-200/80 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
                style={{ color: currentClub.color || '#38bdf8' }}
              >
                <IconComponent size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl lg:text-5xl leading-[1.2]">
                  {currentClub.title}
                </h1>
                <p className="mt-2 text-base sm:text-lg font-semibold text-cyan-600 dark:text-cyan-400">
                  {currentClub.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Grand Banner Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xl">
            <img
              src={bannerImage}
              alt={currentClub.title}
              className="h-full w-full object-cover object-center"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white text-xs sm:text-sm">
              <span className="font-semibold drop-shadow-md">
                Urganch Davlat Universiteti Yoshlar Ittifoqi
              </span>
              <span className="rounded-full bg-black/60 px-3.5 py-1 font-mono text-xs backdrop-blur-md border border-white/20">
                Aʼzolik Bepul
              </span>
            </div>
          </div>

          {/* Key Parameters Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
            <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-4 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
              <Award size={22} className="mx-auto text-emerald-500" />
              <p className="mt-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">100% Bepul</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Barcha talabalarga</p>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-4 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
              <Users size={22} className="mx-auto text-cyan-500" />
              <p className="mt-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">1–4 Kurslar</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Bakalavr & Magistr</p>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-4 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
              <Calendar size={22} className="mx-auto text-amber-500" />
              <p className="mt-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">Haftalik Mashg‘ulot</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Darsdan bo‘sh vaqtda</p>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-4 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
              <Sparkles size={22} className="mx-auto text-purple-500" />
              <p className="mt-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">Sertifikat & Grant</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Faollar rag‘bati</p>
            </div>
          </div>

          {/* Description & Mission */}
          <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70 space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
              To‘garak Haqida Batafsil Maʼlumot
            </h2>
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
              {currentClub.description}
            </p>
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
              Mazkur to‘garak universitetimiz yoshlarining bo‘sh vaqtlarini mazmunli tashkil etish, ularning professional va ijodiy salohiyatlarini ro‘yobga chiqarish hamda respublika va xalqaro miqyosdagi tanlovlarda muvaffaqiyatli ishtirok etishlarini taʼminlash maqsadida faoliyat yuritadi.
            </p>
          </div>

          {/* Highlights Checklist */}
          {highlights.length > 0 && (
            <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
              <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 sm:text-2xl">
                <Layers size={22} />
                Asosiy Yo‘nalishlar va Imkoniyatlar
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                To‘garak aʼzolari quyidagi ustuvor yo‘nalishlar va amaliy loyihalarda ishtirok etish imkoniyatiga ega bo‘ladilar:
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-2xl border border-zinc-200/70 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-800/50"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{h}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        UrDU tajribali mutaxassislari va yetakchilari murabbiyligida
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How to Join Steps */}
          <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
              To‘garakka Qanday Aʼzo Bo‘lish Mumkin?
            </h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 text-zinc-950 font-black text-sm">
                  1
                </div>
                <h3 className="mt-3 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Telegram orqali murojaat
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Yoshlar Ittifoqi rasmiy botida aʼzolik so‘rovnomasini to‘ldiring va yo‘nalishingizni tanlang.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-zinc-950 font-black text-sm">
                  2
                </div>
                <h3 className="mt-3 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Tanishuv Yig‘ilishi
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Har haftalik ochiq yig‘ilishda qatnashib, to‘garak rahbari va aʼzolari bilan tanishing.
                </p>
              </div>

              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-white font-black text-sm">
                  3
                </div>
                <h3 className="mt-3 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Faol Ishtirok & Loyihalar
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  To‘garak mashg‘ulotlarida faol bo‘ling, musobaqa va loyihalarda o‘z iqtidoringizni namoyon eting.
                </p>
              </div>
            </div>
          </div>

          {/* Grand CTA Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 sm:p-10 text-white shadow-xl">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-1 rounded-full bg-black/30 border border-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles size={12} />
                Iqtidorli Yoshlar Safi
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight">
                Siz ham {currentClub.title} to‘garagiga qo‘shiling!
              </h2>
              <p className="mt-2 text-sm sm:text-base text-white/90 leading-relaxed">
                Universitetimizda o‘z salohiyatingizni yuzaga chiqarish, nufuzli stipendiyalar va xalqaro tanlovlarga tayyorlanish uchun ajoyib imkoniyat.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href={`https://t.me/urdu_ittifoq_bot?start=club_${currentClub.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 shadow-lg transition-all hover:bg-zinc-100 hover:scale-[1.02] active:scale-95"
                >
                  <Send size={14} className="text-emerald-600" />
                  <span>Bot orqali ro'yxatdan o'tish</span>
                </a>

                <a
                  href={socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-6 py-3 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-black/35"
                >
                  <Users size={14} />
                  <span>Telegram kanalga qo'shilish</span>
                </a>

                <Link
                  to="/klublar"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-6 py-3 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-black/35"
                >
                  <span>Barcha to'garaklar</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Explore Other Clubs */}
          {otherClubs.length > 0 && (
            <div className="pt-8 border-t border-zinc-200/80 dark:border-zinc-800">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Boshqa To‘garaklar va Klublar
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    O‘zingiz qiziqqan boshqa yo‘nalishlarni ham kashf eting
                  </p>
                </div>
                <Link
                  to="/klublar"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                >
                  <span>Barchasi</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {otherClubs.map((club) => {
                  const OtherIcon = club.icon || Compass
                  return (
                    <div
                      key={club.id}
                      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                        <img
                          src={club.image || bannerImage}
                          alt={club.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <span className="absolute bottom-2.5 left-3 text-[11px] font-bold text-white/90">
                          {club.category || 'To‘garak'}
                        </span>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-sm text-zinc-900 group-hover:text-cyan-600 transition-colors dark:text-zinc-100 line-clamp-1">
                            {club.title}
                          </h3>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1">
                            {club.subtitle || club.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-zinc-200/70 dark:border-zinc-800 flex items-center justify-between">
                          <Link
                            to={`/klublar/${club.id}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 transition-colors"
                          >
                            <span>Batafsil o‘qish</span>
                            <ArrowUpRight size={13} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </article>
      </main>

      <FooterSection showContactForm={false} />
    </div>
  )
}
