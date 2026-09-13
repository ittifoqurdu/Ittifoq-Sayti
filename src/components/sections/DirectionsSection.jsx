import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { CheckCircle2, Compass, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useNews, defaultClubsList } from '../../context/NewsContext'
import { socialLinks } from '../../data/siteData'
import { fadeUp, staggerContainer, fadeUpChild } from '../../lib/animations'

const MotionSection = motion.section
const MotionDiv = motion.div

export default function DirectionsSection() {
  const { clubsList } = useNews()
  const list = clubsList && clubsList.length > 0 ? clubsList : defaultClubsList

  return (
    <MotionSection
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      className="relative isolate mx-auto w-full max-w-[1320px] px-4 py-24 md:px-7 lg:py-32"
      id="directions"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-[140px]" />

      <MotionDiv variants={fadeUp} className="mb-14 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
          <Compass size={14} />
          Talabalar Maydoni
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-zinc-100">
          To‘garaklar va <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-400">Klublar</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 sm:text-lg dark:text-zinc-400 leading-relaxed">
          O‘z iqtidoringizni kashf eting, yangi do‘stlar orttiring va yuksak marralar sari dadil qadam tashlang! Universitetimiz to‘garak va klublari — sizning yetakchilik, ilm-fan va yorqin kelajak sari boshlang‘ich parvoz maydoningizdir.
        </p>
      </MotionDiv>

      {list.length === 0 ? (
        <div className="mx-auto max-w-lg text-center py-16 px-8 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30 backdrop-blur-md">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
            <Compass size={28} />
          </div>
          <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">
            Klublar va to‘garaklar tez orada eʼlon qilinadi
          </h3>
          <p className="mt-2.5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Hozirda rasmiy klublar va to‘garaklar dasturi yangilanmoqda. Tez orada barcha qabul yo‘nalishlari va bot orqali aʼzo bo‘lish ochiladi!
          </p>
          <div className="mt-6">
            <a
              href={socialLinks.telegram || 'https://t.me/UrDU_Yoshlari_BT'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition"
            >
              Kanalimizda kuzatib boring
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((dir) => {
            const Icon = dir.icon || Compass
            const highlights = Array.isArray(dir.highlights) ? dir.highlights : []
          return (
            <MotionDiv
              key={dir.id}
              variants={fadeUpChild}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/90 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-zinc-300 hover:shadow-2xl dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-700/80"
            >
              {/* Dynamic top gradient bar */}
              <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${dir.gradient || 'from-emerald-500/30 via-teal-500/20 to-transparent'} opacity-40 transition-opacity duration-300 group-hover:opacity-100 z-10`} />

              {/* Banner Image */}
              {(() => {
                const bannerImg = dir.image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80'
                return (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950">
                    <img
                      src={bannerImg}
                      alt={dir.title}
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                    {/* Floating category badge inside banner */}
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <span className="rounded-full bg-black/65 border border-white/20 px-3 py-1 text-[11px] font-bold text-white/90 backdrop-blur-md shadow-sm">
                        {dir.category || 'To‘garak'}
                      </span>
                    </div>

                    {/* Icon floating on bottom of banner */}
                    <div className="absolute -bottom-5 left-6 z-10">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200/80 bg-white shadow-lg backdrop-blur-md dark:border-zinc-700 dark:bg-zinc-900"
                        style={{ color: dir.color }}
                      >
                        <Icon size={24} />
                      </div>
                    </div>
                  </div>
                )
              })()}

              <div className={`p-6 sm:p-7 ${dir.image ? 'pt-8' : ''} flex-1 flex flex-col justify-between`}>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-zinc-900 group-hover:text-emerald-600 transition-colors dark:text-zinc-100 dark:group-hover:text-emerald-400">
                    {dir.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {dir.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3">
                    {dir.description}
                  </p>

                  {/* Highlights list */}
                  {highlights.length > 0 && (
                    <div className="mt-5 space-y-2 border-t border-zinc-200/80 pt-4 dark:border-zinc-800/60">
                      {highlights.slice(0, 3).map((h) => (
                        <div key={h} className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                          <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                      {highlights.length > 3 && (
                        <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                          +{highlights.length - 3} ta qo‘shimcha imkoniyat
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer with prominent, fully visible Batafsil o‘qish button */}
              <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-zinc-200/80 flex items-center justify-between gap-3 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-900/40">
                <Link
                  to={`/klublar/${dir.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-4 sm:px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Batafsil o‘qish</span>
                  <ArrowUpRight size={14} className="shrink-0" />
                </Link>

                <a
                  href={socialLinks.telegramBot || socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors"
                >
                  <span>Safga qo‘shilish</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </MotionDiv>
          )
        })}
      </div>
      )}
    </MotionSection>
  )
}

