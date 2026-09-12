import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import BehindCurtains from './components/sections/BehindCurtains'
import BlogsSection from './components/sections/BlogsSection'
import FooterSection from './components/sections/FooterSection'
import HeaderNav from './components/layout/HeaderNav'
import HeroSection from './components/sections/HeroSection'
import MarqueeRibbon from './components/sections/MarqueeRibbon'
import TeamSection from './components/sections/TeamSection'
import DirectionsSection from './components/sections/DirectionsSection'
import TopCardsSection from './components/sections/TopCardsSection'
import NoiseLayer from './components/ui/NoiseLayer'
import CustomCursor from './components/ui/CustomCursor'
import SmoothScroll from './components/ui/SmoothScroll'
import ScrollToTopButton from './components/ui/ScrollToTopButton'
import { profile } from './data/siteData'
import NotFoundPage from './components/pages/NotFoundPage'
import PartnershipsPage from './components/pages/PartnershipsPage'
import NewsDetailPage from './components/pages/NewsDetailPage'
import NewsListPage from './components/pages/NewsListPage'
import AdminPage from './components/pages/AdminPage'
import TuzilmaPage from './components/pages/TuzilmaPage'
import KlublarPage from './components/pages/KlublarPage'
import ContactPage from './components/pages/ContactPage'
import { NewsProvider } from './context/NewsContext'

const STATIC_SITE_URL = 'https://urdu.uz'
const DEFAULT_IMAGE_PATH = '/img/banner-ornament.png'

function getSiteOrigin() {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  return STATIC_SITE_URL
}

function buildSiteUrl(path = '/') {
  if (!path) return getSiteOrigin()
  if (path.startsWith('http://') || path.startsWith('https://')) return path

  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${getSiteOrigin()}${normalizedPath}`
}

const DEFAULT_SEO = {
  title: `${profile.name} | Rasmiy Portal | Urganch Davlat Universiteti`,
  description:
    'Urganch davlat universiteti Yoshlar ittifoqi boshlang‘ich tashkiloti va Yetakchilar Kengashi rasmiy portali. Talabalar tashabbuslari, ilm-fan, startaplar va tadbirlar.',
  image: buildSiteUrl(DEFAULT_IMAGE_PATH),
}

function upsertMeta(attribute, key, content) {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertCanonical(url) {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <TopCardsSection />
      <MarqueeRibbon />
      <BlogsSection />
      <FooterSection showContactForm={false} />
    </>
  )
}

function App() {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/') {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    if (!location.hash) return
    const targetId = location.hash.replace('#', '')

    const scrollToHashTarget = () => {
      const target = document.getElementById(targetId)
      if (!target) return
      const offset = window.innerWidth < 768 ? 84 : 100
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }

    const timer = window.setTimeout(scrollToHashTarget, 120)
    return () => window.clearTimeout(timer)
  }, [location.pathname, location.hash])

  useEffect(() => {
    const path = location.pathname
    const normalizedPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path
    const isHome = normalizedPath === '/'

    let seo = {
      title: DEFAULT_SEO.title,
      description: DEFAULT_SEO.description,
      image: DEFAULT_SEO.image,
      url: buildSiteUrl(normalizedPath),
    }

    if (normalizedPath === '/tuzilma' || normalizedPath === '/team') {
      seo = {
        ...seo,
        title: `Yoshlar Ittifoqi Tuzilmasi | ${profile.brand}`,
        description:
          'Urganch davlat universiteti Yoshlar ittifoqi boshlang‘ich tashkiloti yetakchilari, boshqaruv va fakultet koordinatorlari.',
      }
    } else if (normalizedPath === '/klublar' || normalizedPath === '/yonalishlar') {
      seo = {
        ...seo,
        title: `Klublar va To‘garaklar | ${profile.brand}`,
        description:
          'Urganch davlat universiteti talabalar klublari, to‘garaklar, iqtidorli yoshlar faoliyati va tashabbuslari.',
      }
    } else if (normalizedPath === '/boglanish') {
      seo = {
        ...seo,
        title: `Bog‘lanish va Murojaat | ${profile.brand}`,
        description:
          'Urganch davlat universiteti Yoshlar ittifoqiga murojaat, taklif yo‘llash hamda rasmiy aloqa maʼlumotlari.',
      }
    } else if (normalizedPath === '/hamkorlik') {
      seo = {
        ...seo,
        title: `Xalqaro Hamkorlik va Grantlar | ${profile.brand}`,
        description:
          'Urganch davlat universitetining xorijiy hamkor universitetlari, Erasmus+, DAAD va xalqaro talabalar almashinuvi dasturlari.',
      }
    } else if (normalizedPath === '/yangiliklar' || normalizedPath.startsWith('/yangiliklar/')) {
      seo = {
        ...seo,
        title: `Yangiliklar va Tanlovlar | ${profile.brand}`,
        description:
          'Urganch davlat universiteti Yoshlar ittifoqi eng so‘nggi yangiliklari, xakatonlar, tanlovlar va eʼlonlar.',
      }
    } else if (normalizedPath === '/admin') {
      seo = {
        ...seo,
        title: `Admin Boshqaruv Paneli | ${profile.brand}`,
        description: 'Urganch davlat universiteti Yoshlar ittifoqi admin boshqaruv tizimi.',
      }
    } else if (!isHome) {
      seo = {
        ...seo,
        title: `404 | Sahifa topilmadi | ${profile.brand}`,
        description: 'Siz qidirgan sahifa mavjud emas.',
      }
    }

    document.title = seo.title
    upsertMeta('name', 'description', seo.description)
    upsertMeta('name', 'robots', isHome ? 'index, follow, max-image-preview:large' : 'noindex, nofollow')
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', profile.brand)
    upsertMeta('property', 'og:title', seo.title)
    upsertMeta('property', 'og:description', seo.description)
    upsertMeta('property', 'og:url', seo.url)
    upsertMeta('property', 'og:image', seo.image)
    upsertMeta('property', 'og:locale', 'uz_UZ')
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', seo.title)
    upsertMeta('name', 'twitter:description', seo.description)
    upsertMeta('name', 'twitter:image', seo.image)
    upsertCanonical(seo.url)
  }, [location.pathname])

  return (
    <NewsProvider>
      <SmoothScroll>
        <CustomCursor>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-zinc-100 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-zinc-900"
          >
            Asosiy qismga o‘tish
          </a>
          <div className="relative isolate min-h-[100dvh] overflow-x-clip bg-[#07090d] dark:bg-[#07090d] text-zinc-900 dark:text-zinc-100" style={{ backgroundColor: 'var(--bg-base)' }}>
            <NoiseLayer />
            <div className="pointer-events-none fixed inset-0 -z-10 hidden dark:block">
              <div className="absolute -left-[10%] -top-[8%] h-[38%] w-[38%] rounded-full bg-emerald-500/10 blur-[130px]" />
              <div className="absolute right-[6%] top-[18%] h-[30%] w-[30%] rounded-full bg-cyan-400/10 blur-[120px]" />
              <div className="absolute -bottom-[14%] -right-[12%] h-[40%] w-[40%] rounded-full bg-emerald-400/10 blur-[140px]" />
            </div>
            <div className="pointer-events-none absolute inset-0 -z-10 soft-grid opacity-50 dark:opacity-50 opacity-20" />
            {!location.pathname.startsWith('/admin') && <HeaderNav />}

            <main className="relative z-10 pb-0 pt-0" id="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tuzilma" element={<TuzilmaPage />} />
                <Route path="/team" element={<TuzilmaPage />} />
                <Route path="/klublar" element={<KlublarPage />} />
                <Route path="/yonalishlar" element={<KlublarPage />} />
                <Route path="/boglanish" element={<ContactPage />} />
                <Route path="/hamkorlik" element={<PartnershipsPage />} />
                <Route path="/yangiliklar" element={<NewsListPage />} />
                <Route path="/yangiliklar/:id" element={<NewsDetailPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <ScrollToTopButton />
          </div>
        </CustomCursor>
      </SmoothScroll>
    </NewsProvider>
  )
}

export default App
