import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Users, Sparkles, Home } from 'lucide-react'
import TeamSection from '../sections/TeamSection'
import FooterSection from '../sections/FooterSection'
import { profile } from '../../data/siteData'

export default function TuzilmaPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <div className="min-h-screen pt-14 sm:pt-16 bg-[#F5F0E8] dark:bg-[#07090d] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Main Content Area */}
      <TeamSection />

      {/* Footer */}
      <FooterSection showContactForm={false} />
    </div>
  )
}
