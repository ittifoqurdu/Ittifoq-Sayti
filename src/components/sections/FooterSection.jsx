import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, Instagram, Mail, Phone, Send, Sparkles, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react'
import { footerColumns, profile, socialLinks } from '../../data/siteData'
import { useTheme } from '../../context/ThemeContext'
import { staggerContainer, fadeUpChild } from '../../lib/animations'
import { sendMurojaatToSheet } from '../../lib/googleSheetsClient'

const MotionSection = motion.section
const MotionDiv = motion.div

const INITIAL_FORM = {
  name: '',
  faculty: '',
  phone: '',
  message: '',
}

function FooterSection({ showContactForm = true } = {}) {
  const { isDark } = useTheme()
  const [formValues, setFormValues] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [statusText, setStatusText] = useState('')
  const [statusTone, setStatusTone] = useState('neutral')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactEmail = useMemo(
    () => profile.email || 'ittifoqurdu@gmail.com',
    [],
  )

  const quickLinks = [
    { href: socialLinks.telegram, label: 'Telegram Kanal', icon: Send },
    { href: socialLinks.instagram, label: 'Instagram', icon: Instagram },
    { href: `https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}`, label: contactEmail, icon: Mail },
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

  function formatPhoneInput(value) {
    if (!value) return ''
    if (value.startsWith('@') || /^[a-zA-Z]/.test(value)) {
      return value
    }
    let digits = value.replace(/\D/g, '')
    if (digits.startsWith('998')) {
      digits = digits.slice(3)
    }
    digits = digits.slice(0, 9)

    if (digits.length === 0) return '+998 '
    let res = '+998'
    if (digits.length > 0) {
      res += ` (${digits.slice(0, 2)}`
    }
    if (digits.length >= 2) {
      res += `)`
    }
    if (digits.length > 2) {
      res += ` ${digits.slice(2, 5)}`
    }
    if (digits.length > 5) {
      res += `-${digits.slice(5, 7)}`
    }
    if (digits.length > 7) {
      res += `-${digits.slice(7, 9)}`
    }
    return res
  }

  const updateField = (field) => (event) => {
    let value = event.target.value
    if (field === 'phone') {
      value = formatPhoneInput(value)
    }
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

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    if (!validateForm()) {
      setStatusTone('error')
      setStatusText('Iltimos, barcha majburiy maydonlarni to‘ldiring!')
      return
    }

    setIsSubmitting(true)
    setStatusTone('neutral')
    setStatusText('Murojaatingiz yuborilmoqda...')

    const subject = `UrDU Yoshlar Ittifoqi Murojaati: ${formValues.name.trim()}`
    const body = [
      `F.I.SH: ${formValues.name.trim()}`,
      formValues.faculty.trim() ? `Fakultet: ${formValues.faculty.trim()}` : null,
      formValues.phone.trim() ? `Telefon/Aloqa: ${formValues.phone.trim()}` : null,
      '',
      'Murojaat matni:',
      formValues.message.trim(),
    ]
      .filter(Boolean)
      .join('\n')

    const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    // 1. Google Sheets jadvaliga saqlaymiz (va backend orqali ittifoqurdu@gmail.com ga boradi)
    await sendMurojaatToSheet({
      name: formValues.name,
      faculty: formValues.faculty,
      phone: formValues.phone,
      message: formValues.message,
    })

    // 2. Avvalgidek emailga ham yuborish (mobil qurilmada pochta ilovasi, kompyuterda Gmail/pochta)
    const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (isMobile) {
      window.location.href = mailtoUrl
    } else {
      const newWindow = window.open(gmailUrl, '_blank')
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        window.location.href = mailtoUrl
      }
    }

    setIsSubmitting(false)
    setStatusTone('success')
    setStatusText('✅ Murojaatingiz Google Sheetga saqlandi va Emailga ham yo‘naltirildi!')
    setFormValues(INITIAL_FORM)
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
      <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-800" />

      {/* Call to Action Banner */}
      {showContactForm ? (
        <MotionDiv variants={fadeUpChild} className="mt-20 flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold tracking-widest text-emerald-700 dark:text-emerald-300">
            <Sparkles size={14} className="text-emerald-600 dark:text-emerald-400" />
            YOSHLAR BOSH QABULI
          </div>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[1] tracking-tighter text-zinc-900 dark:text-zinc-100">
            Safimizga qo‘shiling yoki
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400">
              tashabbusingizni bildiring!
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
            Biz har bir talabaning foydali g‘oyasini qo‘llab-quvvatlaymiz. O‘z loyihangiz yoki taklifingizni qoldiring.
          </p>
          <a
            href={socialLinks.telegramBot || 'https://t.me/urdu_ittifoq_bot'}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 flex items-center gap-3 rounded-full bg-emerald-500 px-8 py-4 text-base font-bold text-zinc-950 transition-all hover:bg-emerald-400 hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]"
          >
            <Send size={18} />
            Telegram orqali murojaat
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
        </MotionDiv>
      ) : null}

      {/* Contact Form & University Info Card */}
      <MotionDiv variants={fadeUpChild} className={`${showContactForm ? 'mt-24' : 'mt-8'} rounded-3xl border border-zinc-200/80 bg-[#F8F3EB]/90 p-8 shadow-2xl backdrop-blur-md md:p-14 dark:border-zinc-800/80 dark:bg-zinc-900/30`}>
        {showContactForm ? (
        <div className="rounded-2xl border border-zinc-200/80 bg-[#EDE8DE]/80 p-6 md:p-8 dark:border-zinc-800/80 dark:bg-zinc-950/45">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Taklif va Murojaat</p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Bizga xabar yo‘llang</h3>
            </div>
            <span className="rounded-full border border-zinc-200 bg-white px-3.5 py-1 text-xs font-semibold text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-400">
              UrDU Yoshlar Kengashi
            </span>
          </div>

          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleFormSubmit}>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-700 dark:text-zinc-400" htmlFor="contact-name">
                Ism va Familiya *
              </label>
              <input
                id="contact-name"
                type="text"
                value={formValues.name}
                onChange={updateField('name')}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                placeholder="Ismingiz va familiyangiz"
                autoComplete="name"
              />
              {errors.name ? <p className="mt-1 text-xs text-amber-600 dark:text-amber-300">{errors.name}</p> : null}
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-700 dark:text-zinc-400" htmlFor="contact-faculty">
                Fakultet yoki Yo‘nalish
              </label>
              <input
                id="contact-faculty"
                type="text"
                value={formValues.faculty}
                onChange={updateField('faculty')}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                placeholder="Texnika va axborot texnologiyalari"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-700 dark:text-zinc-400" htmlFor="contact-phone">
                Telefon raqam yoki Telegram username
              </label>
              <input
                id="contact-phone"
                type="text"
                value={formValues.phone}
                onChange={updateField('phone')}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                placeholder="+998 90 123 45 67 yoki @username"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-700 dark:text-zinc-400" htmlFor="contact-message">
                Murojaat yoki Taklif mazmuni *
              </label>
              <textarea
                id="contact-message"
                value={formValues.message}
                onChange={updateField('message')}
                className="min-h-[130px] w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                placeholder="O‘z g‘oyangiz, startapingiz, to‘garak ochish yoki yordam so‘rash haqida yozing..."
              />
              {errors.message ? <p className="mt-1 text-xs text-amber-600 dark:text-amber-300">{errors.message}</p> : null}
            </div>

            <div className="md:col-span-2 flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] transition shadow-sm shrink-0 cursor-pointer ${
                  isSubmitting
                    ? 'bg-zinc-400 text-zinc-800 cursor-not-allowed'
                    : 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400'
                }`}
              >
                {isSubmitting ? 'Yuborilmoqda...' : 'Xabarni yuborish'}
                <ArrowRight size={14} />
              </button>
              <a
                href={socialLinks.telegramBot || 'https://t.me/urdu_ittifoq_bot'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 shadow-sm transition hover:bg-emerald-500 hover:text-zinc-950 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300 dark:hover:bg-emerald-500 dark:hover:text-zinc-950 shrink-0"
              >
                <Send size={13} />
                Telegram murojaat (@urdu_ittifoq_bot)
              </a>
              {statusText ? (
                <p className={`text-xs font-semibold ${statusTone === 'success' ? 'text-emerald-600 dark:text-emerald-300' : 'text-amber-600 dark:text-amber-300'}`}>
                  {statusText}
                </p>
              ) : null}
            </div>
          </form>
        </div>
        ) : null}

        {/* Footer Navigation & Columns */}
        <div className="mt-16 grid gap-10 md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="pr-6 xl:border-r xl:border-zinc-200/80 dark:xl:border-zinc-800/80">
            <div className="flex items-center gap-3">
              <img
                src={isDark ? '/img/logo-oq.png' : '/img/logo-oq1.png'}
                alt="UrDU Yoshlar Ittifoqi"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Urganch davlat universiteti Yoshlar ittifoqi boshlang‘ich tashkiloti — talaba-yoshlarning qonuniy huquq va manfaatlarini himoya qiluvchi, ularning intellektual, ma‘naviy va kasbiy yuksalishiga xizmat qiluvchi nufuzli tuzilma.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
              <MapPin size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{profile.address}</span>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">{column.title}</p>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-emerald-700 dark:hover:text-white flex items-center gap-1.5"
                    >
                      <ArrowRight size={12} className="text-zinc-400 dark:text-zinc-600" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom copyright */}
        <div className="mt-14 flex flex-col gap-4 border-t border-zinc-200/80 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800/80">
          <p>© 2026 {profile.university.toUpperCase()} YOSHLAR ITTIFOQI. BARCHA HUQUQLAR HIMOYALANGAN.</p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 font-semibold text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors"
              title="UrDU Yoshlar Ittifoqi Boshqaruv Tizimi"
            >
              <ShieldCheck size={14} className="text-emerald-500" />
              Admin Panel
            </Link>

            <div className="flex items-center gap-3">
              {quickLinks.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-colors hover:border-emerald-500/50 hover:text-emerald-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:text-emerald-300"
                    aria-label={item.label}
                  >
                    <Icon size={14} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </MotionDiv>
    </MotionSection>
  )
}

export default FooterSection
