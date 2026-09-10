import { motion } from 'motion/react'
import { ArrowUpRight, GraduationCap, Instagram, Mail, Phone, Send, Sparkles, Trophy, Users } from 'lucide-react'
import { profile, socialLinks } from '../../data/siteData'
import { fadeUp, staggerContainer, fadeUpChild } from '../../lib/animations'

const MotionSection = motion.section
const MotionDiv = motion.div

const opportunityCards = [
  {
    eyebrow: 'Davlat Stipendiyalari',
    title: 'Iqtidorli talabalarni qo‘llab-quvvatlash',
    description:
      'Prezident, Beruniy, Navoiy va universitet rektori stipendiyalari sohiblarini tayyorlash hamda ilmiy maqolalar nashrini moliyalashtirish.',
    points: [
      'Stipendiatlar uchun maxsus mentorlik tizimi',
      'Xalqaro Scopus va OAK jurnallarida bepul nashr',
      'Respublika fan olimpiadalariga tayyorgarlik',
    ],
  },
  {
    eyebrow: 'Startap va IT-Lab',
    title: 'Yoshlar innovatsiyalari va startaplar',
    description:
      'Talabalarning dasturiy va texnik ishlanmalarini hayotga tatbiq etish uchun kovorking, texnik baza va boshlang‘ich moliyaviy grantlar.',
    points: [
      'G‘oyadan tayyor mahsulotgacha inkubatsiya',
      'Tajribali IT va biznes ekspertlar konsultatsiyasi',
      'Xalqaro va Respublika startap tanlovlarida ishtirok',
    ],
  },
  {
    eyebrow: 'Xalqaro Hamkorlik',
    title: 'Global talabalar forumi va almashinuv',
    description:
      'Yetakchi xorijiy oliygohlar yoshlar tashkilotlari bilan qo‘shma loyihalar, yozgi oromgohlar va xalqaro konferensiyalar.',
    points: [
      'Chet el universitetlari talabalar kengashlari bilan aloqa',
      'Yevropa va Osiyo yoshlar forumlariga delegatsiyalar',
      'Xorijiy tillarni chuqur o‘rganish va speaking klublar',
    ],
  },
]

const contactLinks = [
  { href: socialLinks.telegram, label: profile.telegramHandle, icon: Send },
  { href: socialLinks.instagram, label: profile.instagramHandle, icon: Instagram },
  { href: socialLinks.email, label: profile.email, icon: Mail },
  { href: socialLinks.phone, label: profile.phoneLabel, icon: Phone },
]

function BehindCurtains() {
  return (
    <MotionSection
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="mx-auto flex w-full max-w-[1320px] flex-col justify-center px-4 py-20 md:px-7 lg:py-28"
    >
      <MotionDiv variants={fadeUp} className="mb-14 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
          <Sparkles size={14} />
          Imkoniyatlar
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl lg:text-5xl">
          UrDU Talabalari Uchun{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Yaratilgan Imkoniyatlar
          </span>
        </h2>
      </MotionDiv>

      <div className="grid gap-6 xl:grid-cols-3">
        {opportunityCards.map((card) => (
          <MotionDiv
            key={card.title}
            variants={fadeUpChild}
            className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-8 shadow-xl backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/50 hover:bg-zinc-900/60 hover:shadow-2xl"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                <Sparkles size={12} className="text-emerald-400" />
                {card.eyebrow}
              </div>
              <h3 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-zinc-100 group-hover:text-emerald-300 transition-colors">
                {card.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                {card.description}
              </p>
            </div>

            <div className="mt-8 space-y-3 border-t border-zinc-800/60 pt-6">
              {card.points.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-2xl border border-zinc-800/70 bg-zinc-950/45 px-4 py-3 text-xs text-zinc-300">
                  <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </MotionDiv>
        ))}
      </div>

      <MotionDiv variants={fadeUpChild} className="mt-8 flex flex-col gap-4 rounded-3xl border border-zinc-800/80 bg-zinc-900/35 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400">Biz bilan bog‘laning</p>
          <p className="mt-1 text-sm leading-relaxed text-zinc-300">
            UrDU Yoshlar Ittifoqi barcha talabalarga ochiq — o‘z tashabbus va g‘oyangiz bilan safimizga qo‘shiling!
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-zinc-950 transition hover:bg-emerald-400"
          >
            Murojaat yo‘llash
            <ArrowUpRight size={14} />
          </a>
          {contactLinks.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-200 transition hover:border-emerald-500/50 hover:text-emerald-300"
              >
                <Icon size={14} />
                {item.label}
              </a>
            )
          })}
        </div>
      </MotionDiv>
    </MotionSection>
  )
}

export default BehindCurtains
