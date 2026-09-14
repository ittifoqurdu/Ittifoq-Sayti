import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { profile } from '../../data/siteData'
import { useTheme } from '../../context/ThemeContext'

const MotionNav = motion.nav

const navItems = [
  { label: 'Bosh sahifa', path: '/', id: 'hero' },
  { label: 'Tuzilma', path: '/tuzilma', id: 'team' },
  { label: 'To‘garaklar va klublar', path: '/klublar', id: 'directions' },
  { label: 'Yangiliklar va tanlovlar', path: '/yangiliklar', id: 'news' },
]

function HeaderNav() {
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getActiveId = useCallback(() => {
    const path = location.pathname
    if (path === '/tuzilma' || path === '/team') return 'team'
    if (path === '/klublar' || path === '/yonalishlar' || path.startsWith('/klublar/')) return 'directions'
    if (path.startsWith('/yangiliklar')) return 'news'
    if (path === '/boglanish') return 'contact'
    return 'hero'
  }, [location.pathname])

  const activeSection = getActiveId()

  const handleLogoClick = useCallback(() => {
    setMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname, navigate])

  const handleNavClick = useCallback(
    (item) => {
      setMenuOpen(false)
      const targetPath = item.path || (item.id === 'hero' ? '/' : `/${item.id}`)
      if (location.pathname === targetPath) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      navigate(targetPath)
    },
    [location.pathname, navigate]
  )

  const handleAloqaClick = useCallback(() => {
    setMenuOpen(false)
    if (location.pathname === '/boglanish') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    navigate('/boglanish')
  }, [location.pathname, navigate])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-200 bg-white/95 dark:bg-[#07090d]/95 backdrop-blur-md border-b border-zinc-200/90 dark:border-zinc-800/90 ${
        scrolled ? 'shadow-md py-2 sm:py-2.5' : 'shadow-xs py-2.5 sm:py-3.5'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <button
          type="button"
          onClick={handleLogoClick}
          className="group inline-flex items-center gap-2.5 sm:gap-3 text-left focus-visible:outline-none"
        >
          <img
            src={isDark ? '/img/logo-oq.png' : '/img/logo-oq1.png'}
            alt={profile.brand}
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100 uppercase leading-none">
              UrDU Yoshlar Ittifoqi
            </span>
            <span className="hidden sm:block text-[10px] text-zinc-500 dark:text-zinc-400 font-medium tracking-wide mt-0.5">
              Boshlang‘ich tashkiloti
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 xl:gap-3">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`relative px-3 py-1.5 xl:px-4 xl:py-2 text-xs xl:text-[13.5px] transition-colors focus-visible:outline-none ${
                  isActive
                    ? 'text-[#0d613d] dark:text-emerald-400 font-bold'
                    : 'text-zinc-700 hover:text-[#0d613d] dark:text-zinc-300 dark:hover:text-emerald-400 font-medium'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1.5 left-2 right-2 h-[2.5px] bg-[#0d613d] dark:bg-emerald-400 rounded-full" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Right Actions: Theme Switcher, Green Aloqa Button, Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Kunduzgi rejimga o'tish" : "Kechki rejimga o'tish"}
            title={isDark ? 'Kunduzgi rejim' : 'Kechki rejim'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200/90 bg-zinc-50 text-zinc-700 transition hover:border-emerald-500/50 hover:bg-white hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-emerald-300"
          >
            {isDark ? (
              <Sun size={16} className="text-amber-400" />
            ) : (
              <Moon size={16} className="text-emerald-700" />
            )}
          </button>

          {/* Green Aloqa Button (Right of Theme Switcher) */}
          <button
            type="button"
            onClick={handleAloqaClick}
            className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-xs xl:text-[13px] font-bold text-white shadow-sm transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              activeSection === 'contact'
                ? 'bg-[#09472c] shadow-md ring-2 ring-emerald-400/60'
                : 'bg-[#0d613d] hover:bg-[#09472c] hover:shadow-md'
            }`}
          >
            Aloqa
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            aria-label={menuOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200/90 bg-zinc-50 text-zinc-700 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-200 dark:hover:text-white md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <MotionNav
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden border-t border-zinc-200/90 bg-white/98 shadow-xl backdrop-blur-2xl dark:border-zinc-800/90 dark:bg-[#07090d]/98 md:hidden"
          >
            <div className="mx-auto max-w-[1360px] px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className={`flex w-full items-center rounded-xl px-4 py-3 text-left text-sm transition ${
                      isActive
                        ? 'text-[#0d613d] dark:text-emerald-400 font-bold border-l-4 border-[#0d613d] dark:border-emerald-400 pl-3 bg-zinc-50 dark:bg-zinc-900/40'
                        : 'text-zinc-700 hover:bg-zinc-100/70 dark:text-zinc-300 dark:hover:bg-zinc-800/60 font-medium'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                )
              })}

              <div className="pt-2 border-t border-zinc-200/80 dark:border-zinc-800/80">
                <button
                  type="button"
                  onClick={handleAloqaClick}
                  className={`flex w-full items-center justify-center rounded-xl py-3 text-sm font-bold text-white transition ${
                    activeSection === 'contact'
                      ? 'bg-[#09472c] ring-2 ring-emerald-400/60'
                      : 'bg-[#0d613d] hover:bg-[#09472c]'
                  }`}
                >
                  Aloqa
                </button>
              </div>
            </div>
          </MotionNav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default HeaderNav
