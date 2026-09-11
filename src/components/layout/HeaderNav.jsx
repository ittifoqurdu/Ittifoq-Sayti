import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Send, Sun, Moon } from 'lucide-react'
import { navItems, profile } from '../../data/siteData'
import { useTheme } from '../../context/ThemeContext'
import NavPill from '../ui/NavPill'
import Magnetic from '../ui/Magnetic'

const MotionNav = motion.nav
const HOME_SECTION = 'hero'

function HeaderNav() {
  const { isDark, toggleTheme } = useTheme()
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
          className="group inline-flex items-center gap-3 rounded-full border border-zinc-300/80 bg-white/90 px-4 py-2 text-sm font-bold text-zinc-900 shadow-[0_8px_30px_rgba(120,105,85,0.08)] backdrop-blur-xl transition hover:border-emerald-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-zinc-700/80 dark:bg-zinc-950/90 dark:text-zinc-100 dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
        >
          <img
            src={isDark ? '/img/logo-oq.png' : '/img/logo-oq1.png'}
            alt={profile.brand}
            className="h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="hidden tracking-tight font-semibold sm:inline text-zinc-800 dark:text-zinc-200">
            {profile.brand}
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 rounded-full border border-zinc-300/80 bg-white/90 p-1.5 shadow-[0_8px_30px_rgba(120,105,85,0.08)] backdrop-blur-xl md:flex dark:border-zinc-700/80 dark:bg-zinc-950/85 dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
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

          {/* Theme Toggle Button */}
          <Magnetic>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Kunduzgi rejimga o'tish (Qaymoq rang)" : "Kechki rejimga o'tish"}
              title={isDark ? "Kunduzgi rejim (Qaymoq rang)" : "Kechki rejim"}
              className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300/80 bg-zinc-100/90 text-zinc-700 transition-all duration-300 hover:scale-105 hover:border-emerald-500/50 hover:bg-white hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-zinc-700/80 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:border-emerald-500/60 dark:hover:bg-zinc-800 dark:hover:text-emerald-300"
            >
              {isDark ? (
                <Sun size={15} className="text-amber-400 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon size={15} className="text-emerald-700 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>
          </Magnetic>

          <Magnetic>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="ml-1.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 transition-all hover:border-emerald-500/60 hover:bg-emerald-500/25 hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-white"
            >
              <Send size={12} />
              Murojaat
            </button>
          </Magnetic>
        </nav>

        {/* Mobile Menu & Theme Triggers */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Kunduzgi rejimga o'tish (Qaymoq rang)" : "Kechki rejimga o'tish"}
            title={isDark ? "Kunduzgi rejim (Qaymoq rang)" : "Kechki rejim"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300/80 bg-white/90 text-zinc-700 shadow-[0_8px_30px_rgba(120,105,85,0.08)] backdrop-blur-xl transition hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-zinc-700/80 dark:bg-zinc-950/90 dark:text-zinc-200 dark:hover:text-zinc-100"
          >
            {isDark ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-emerald-700" />}
          </button>

          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300/80 bg-white/90 text-zinc-700 shadow-[0_8px_30px_rgba(120,105,85,0.08)] backdrop-blur-xl transition hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-zinc-700/80 dark:bg-zinc-950/90 dark:text-zinc-200 dark:hover:text-zinc-100"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
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
            className="mx-4 mt-3 rounded-3xl border border-zinc-300/80 bg-white/95 p-3.5 shadow-2xl backdrop-blur-2xl dark:border-zinc-700/80 dark:bg-zinc-950/95 md:hidden"
          >
            <ul className="grid gap-1.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                      activeSection === item.id
                        ? 'bg-emerald-500 text-zinc-950 shadow-md font-bold'
                        : 'bg-zinc-100/90 text-zinc-700 hover:bg-zinc-200/80 hover:text-zinc-950 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}

              {/* Theme Toggle Row in Mobile Menu */}
              <li className="mt-2 border-t border-zinc-200/80 pt-2 dark:border-zinc-800/80">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-100/90 px-4 py-3 text-sm font-semibold text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200"
                >
                  <span className="flex items-center gap-2">
                    {isDark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-emerald-600" />}
                    <span>Rejim: {isDark ? 'Kechki (Asosiy)' : 'Kunduzgi (Qaymoq rang)'}</span>
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">O‘zgartirish</span>
                </button>
              </li>
            </ul>
          </MotionNav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default HeaderNav

