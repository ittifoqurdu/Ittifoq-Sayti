import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Send } from 'lucide-react'
import { navItems, profile } from '../../data/siteData'
import NavPill from '../ui/NavPill'
import Magnetic from '../ui/Magnetic'

const MotionNav = motion.nav
const HOME_SECTION = 'hero'

function HeaderNav() {
  const [visibleSection, setVisibleSection] = useState(HOME_SECTION)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const hashId = location.hash.replace('#', '')
  const hasHashNavItem = navItems.some((item) => item.id === hashId)
  const activeSection = hasHashNavItem ? hashId : visibleSection

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (location.pathname !== '/') return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target?.id) {
          setVisibleSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-35% 0px -35% 0px',
        threshold: [0.1, 0.3, 0.6],
      },
    )

    navItems.forEach((item) => {
      const section = document.getElementById(item.id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [location.pathname])

  const scrollToSection = useCallback((id) => {
    const section = document.getElementById(id)
    if (!section) return

    const offset = window.innerWidth < 768 ? 84 : 100
    const top = section.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })

    setVisibleSection(id)
  }, [])

  const handleLogoClick = useCallback(() => {
    setMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      return
    }
    scrollToSection(HOME_SECTION)
  }, [location.pathname, navigate, scrollToSection])

  const handleNavClick = useCallback((id) => {
    setMenuOpen(false)
    if (location.pathname !== '/') {
      navigate(id === HOME_SECTION ? '/' : `/#${id}`)
      return
    }
    scrollToSection(id)
  }, [location.pathname, navigate, scrollToSection])

  return (
    <header
      className={`fixed inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'top-3' : 'top-5'}`}
    >
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between px-4 md:px-7">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={handleLogoClick}
          className="group inline-flex items-center gap-3 rounded-full border border-zinc-700/80 bg-zinc-950/90 px-4 py-2 text-sm font-bold text-zinc-100 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl transition hover:border-emerald-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <img
            src="/img/logo-oq.png"
            alt={profile.brand}
            className="h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="hidden tracking-tight font-semibold sm:inline text-zinc-200">
            {profile.brand}
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 rounded-full border border-zinc-700/80 bg-zinc-950/85 p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl md:flex">
          {navItems.map((item) => (
            <Magnetic key={item.id}>
              <NavPill
                active={activeSection === item.id}
                onClick={() => handleNavClick(item.id)}
                isCurrent={activeSection === item.id}
              >
                {item.label}
              </NavPill>
            </Magnetic>
          ))}
          <Magnetic>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-300 transition-all hover:border-emerald-500/60 hover:bg-emerald-500/25 hover:text-white"
            >
              <Send size={12} />
              Murojaat
            </button>
          </Magnetic>
        </nav>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-950/90 text-zinc-200 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl transition hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 md:hidden"
        >
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {menuOpen ? (
          <MotionNav
            key="mobile-nav"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mx-4 mt-3 rounded-3xl border border-zinc-700/80 bg-zinc-950/95 p-3.5 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <ul className="grid gap-1.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                      activeSection === item.id
                        ? 'bg-emerald-500 text-zinc-950 shadow-md'
                        : 'bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </MotionNav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default HeaderNav
