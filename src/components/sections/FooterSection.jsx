import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Instagram, Mail, Phone, Send, Sparkles, MapPin, CheckCircle2 } from 'lucide-react'
import { footerColumns, profile, socialLinks } from '../../data/siteData'
import { staggerContainer, fadeUpChild } from '../../lib/animations'

const MotionSection = motion.section
const MotionDiv = motion.div

const INITIAL_FORM = {
  name: '',
  faculty: '',
  phone: '',
  message: '',
}

function FooterSection() {
  const [formValues, setFormValues] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [statusText, setStatusText] = useState('')
  const [statusTone, setStatusTone] = useState('neutral')

  const contactEmail = useMemo(
    () => (socialLinks.email || profile.emailHref || '').replace('mailto:', ''),
    [],
  )

  const quickLinks = [
    { href: socialLinks.telegram, label: 'Telegram Kanal', icon: Send },
    { href: socialLinks.instagram, label: 'Instagram', icon: Instagram },
    { href: socialLinks.email, label: contactEmail, icon: Mail },
    { href: socialLinks.phone, label: profile.phoneLabel, icon: Phone },
  ].filter((item) => item.href)

  const validateForm = () => {
    const nextErrors = {}
    const trimmedName = formValues.name.trim()
    const trimmedMessage = formValues.message.trim()

    if (trimmedName.length < 2) nextErrors.name = 'Ismingizni kiriting'
    if (trimmedMessage.length < 10) nextErrors.message = 'Xabar kamida 10 ta belgidan iborat bo‘lsin'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const updateField = (field) => (event) => {
    const value = event.target.value
    setFormValues((prev) => ({ ...prev, [field]: value }))
    setStatusText('')
    if (errors[field]) {
      setErrors((prev) => {
        const { [field]: omitted, ...rest } = prev
        void omitted
        return rest
      })
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (!validateForm()) {
      setStatusTone('error')
      setStatusText('Iltimos, barcha majburiy maydonlarni to‘ldiring!')
      return
    }

    const subject = `UrDU Yoshlar Ittifoqi Murojaati: ${formValues.name.trim()}`
    const body = [
      `F.I.SH: ${formValues.name.trim()}`,
      `Fakultet / Guruh: ${formValues.faculty.trim() || 'Ko‘rsatilmagan'}`,
      `Telefon: ${formValues.phone.trim() || 'Ko‘rsatilmagan'}`,
      '',
      'Murojaat / Taklif matni:',
      formValues.message.trim(),
    ].join('\n')

    const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoUrl
    setStatusTone('success')
    setStatusText('Murojaatingiz pochta ilovasida tayyorlandi!')
  }

  return (
    <MotionSection
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="mx-auto flex w-full max-w-[1520px] flex-col justify-center px-4 py-16 pb-10 md:px-8 lg:py-24"
      id="contact"
    >
      <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      {/* Call to Action Banner */}
      <MotionDiv variants={fadeUpChild} className="mt-20 flex flex-col items-center text-center">
        <div className="mb-6 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold tracking-widest text-emerald-300">
          <Sparkles size={14} className="text-emerald-400" />
          YOSHLAR BOSH QABULI
        </div>
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[1] tracking-tighter text-zinc-100">
          Safimizga qo‘shiling yoki
          <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            tashabbusingizni bildiring!
          </span>
        </h2>
        <p className="mt-4 max-w-xl text-base text-zinc-400 sm:text-lg">
          Biz har bir talabaning foydali g‘oyasini qo‘llab-quvvatlaymiz. O‘z loyihangiz yoki taklifingizni qoldiring.
        </p>
        <a
          href={socialLinks.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 flex items-center gap-3 rounded-full bg-emerald-500 px-8 py-4 text-base font-bold text-zinc-950 transition-all hover:bg-emerald-400 hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]"
        >
          <Send size={18} />
          Telegram orqali murojaat
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </a>
      </MotionDiv>

      {/* Contact Form & University Info Card */}
      <MotionDiv variants={fadeUpChild} className="mt-24 rounded-3xl border border-zinc-800/80 bg-zinc-900/30 p-8 shadow-2xl backdrop-blur-md md:p-14">
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/45 p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400">Taklif va Murojaat</p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-zinc-100">Bizga xabar yo‘llang</h3>
            </div>
            <span className="rounded-full border border-zinc-800 bg-zinc-900/90 px-3.5 py-1 text-xs font-semibold text-zinc-400">
              UrDU Yoshlar Kengashi
            </span>
          </div>

          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleFormSubmit}>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400" htmlFor="contact-name">
                Ism va Familiya *
              </label>
              <input
                id="contact-name"
                type="text"
                value={formValues.name}
                onChange={updateField('name')}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-emerald-500"
                placeholder="Ismingiz va familiyangiz"
                autoComplete="name"
              />
              {errors.name ? <p className="mt-1 text-xs text-amber-300">{errors.name}</p> : null}
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400" htmlFor="contact-faculty">
                Fakultet yoki Yo‘nalish
              </label>
              <input
                id="contact-faculty"
                type="text"
                value={formValues.faculty}
                onChange={updateField('faculty')}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-emerald-500"
                placeholder="Texnika va axborot texnologiyalari"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400" htmlFor="contact-phone">
                Telefon raqam yoki Telegram username
              </label>
              <input
                id="contact-phone"
                type="text"
                value={formValues.phone}
                onChange={updateField('phone')}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-emerald-500"
                placeholder="+998 90 123 45 67 yoki @username"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400" htmlFor="contact-message">
                Murojaat yoki Taklif mazmuni *
              </label>
              <textarea
                id="contact-message"
                value={formValues.message}
                onChange={updateField('message')}
                className="min-h-[130px] w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-emerald-500"
                placeholder="O‘z g‘oyangiz, startapingiz, to‘garak ochish yoki yordam so‘rash haqida yozing..."
              />
              {errors.message ? <p className="mt-1 text-xs text-amber-300">{errors.message}</p> : null}
            </div>

            <div className="md:col-span-2 flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-zinc-950 transition hover:bg-emerald-400"
              >
                Xabarni yuborish
                <ArrowRight size={14} />
              </button>
              <a
                href={socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-zinc-200 transition hover:border-emerald-500/60 hover:text-emerald-300"
              >
                <Send size={13} />
                Telegram kanal
              </a>
              {statusText ? (
                <p className={`text-xs font-semibold ${statusTone === 'success' ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {statusText}
                </p>
              ) : null}
            </div>
          </form>
        </div>

        {/* Footer Navigation & Columns */}
        <div className="mt-16 grid gap-10 md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="pr-6 xl:border-r xl:border-zinc-800/80">
            <div className="flex items-center gap-3">
              <img
                src="/img/logo-oq.png"
                alt="UrDU Yoshlar Ittifoqi"
                className="h-10 w-auto"
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Urganch davlat universiteti Yoshlar ittifoqi boshlang‘ich tashkiloti — talaba-yoshlarning qonuniy huquq va manfaatlarini himoya qiluvchi, ularning intellektual, ma‘naviy va kasbiy yuksalishiga xizmat qiluvchi nufuzli tuzilma.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-zinc-400">
              <MapPin size={15} className="text-emerald-400 shrink-0" />
              <span>{profile.address}</span>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-emerald-400">{column.title}</p>
              <ul className="space-y-3 text-sm text-zinc-400">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-white flex items-center gap-1.5"
                    >
                      <ArrowRight size={12} className="text-zinc-600" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom copyright */}
        <div className="mt-14 flex flex-col gap-4 border-t border-zinc-800/80 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {profile.university.toUpperCase()} YOSHLAR ITTIFOQI. BARCHA HUQUQLAR HIMOYALANGAN.</p>

          <div className="flex items-center gap-3">
            {quickLinks.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-400 transition-colors hover:border-emerald-500/50 hover:text-emerald-300"
                  aria-label={item.label}
                >
                  <Icon size={14} />
                </a>
              )
            })}
          </div>
        </div>
      </MotionDiv>
    </MotionSection>
  )
}

export default FooterSection
