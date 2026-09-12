import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Sparkles, Compass } from 'lucide-react'
import DirectionsSection from '../sections/DirectionsSection'
import BehindCurtains from '../sections/BehindCurtains'
import FooterSection from '../sections/FooterSection'

export default function KlublarPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <div className="min-h-screen pt-20 sm:pt-24 bg-[#F5F0E8] dark:bg-[#07090d] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-zinc-200/80 bg-white/60 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/40 relative z-20">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-4 py-3.5 sm:px-7">
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 min-w-0">
            <Link
              to="/"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium shrink-0"
            >
              <ArrowLeft size={14} />
              Bosh sahifa
            </Link>
            <span className="shrink-0 text-zinc-400">/</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 truncate">Klublar va To‘garaklar</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
              <Sparkles size={12} />
              Talabalar Markazi
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="py-4">
        <DirectionsSection />
        <BehindCurtains />
      </div>

      {/* Footer */}
      <FooterSection showContactForm={false} />
    </div>
  )
}
