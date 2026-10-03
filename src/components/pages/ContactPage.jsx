import { useEffect } from 'react'
import FooterSection from '../sections/FooterSection'

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <div className="min-h-screen pt-14 sm:pt-16 bg-[#F5F0E8] dark:bg-[#07090d] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <h1 className="sr-only">Ursu Ittifoq — Urganch davlat universiteti Yoshlar ittifoqi bilan bog‘lanish va murojaat</h1>
      {/* Main Content Area - Full interactive contact section & form */}
      <FooterSection showContactForm={true} isStandalone={true} />
    </div>
  )
}
