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
import ClubDetailPage from './components/pages/ClubDetailPage'
import ContactPage from './components/pages/ContactPage'
import StatistikaPage from './components/pages/StatistikaPage'
import IttifoqHayotiPage from './components/pages/IttifoqHayotiPage'
import { NewsProvider } from './context/NewsContext'

const STATIC_SITE_URL = 'https://ittifoq.ursu.uz'
const DEFAULT_IMAGE_PATH = 'https://ittifoq.ursu.uz/img/banner-ornament.png'

function getSiteOrigin() {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  return STATIC_SITE_URL
}

function buildSiteUrl(path = '/') {
  if (!path) return STATIC_SITE_URL
  if (path.startsWith('http://') || path.startsWith('https://')) return path

  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${STATIC_SITE_URL}${normalizedPath}`
}

const DEFAULT_SEO = {
  title: 'Ursu Ittifoq | Urganch davlat universiteti Yoshlar ittifoqi',
  description:
    'Ursu Ittifoq — Urganch davlat universiteti Yoshlar ittifoqi rasmiy sayti. Tadbirlar, startaplar, talabalar tashabbuslari va yangiliklar.',
  image: DEFAULT_IMAGE_PATH,
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
    const isHome = normalizedPath === '' || normalizedPath === '/'
    let shouldIndex = true

    let seo = {
      title: DEFAULT_SEO.title,
      description: DEFAULT_SEO.description,
      image: DEFAULT_SEO.image,
      url: buildSiteUrl(normalizedPath === '' ? '/' : normalizedPath),
    }

    if (normalizedPath === '/tuzilma' || normalizedPath === '/team') {
      seo = {
        ...seo,
        title: 'Tuzilma va yetakchilar | Ursu Ittifoq',
        description:
          'Urganch davlat universiteti Yoshlar ittifoqi yetakchilar kengashi, boshqaruv tarkibi va fakultet koordinatorlari.',
      }
    } else if (
      normalizedPath === '/klublar' ||
      normalizedPath === '/yonalishlar'
    ) {
      seo = {
        ...seo,
        title: 'Klublar va to‘garaklar | Ursu Ittifoq',
        description:
          'Urganch davlat universiteti talabalar klublari, ilmiy to‘garaklar, intellektual jamoalar va yoshlar loyihalari.',
      }
    } else if (
      normalizedPath.startsWith('/klublar/') ||
      normalizedPath.startsWith('/yonalishlar/')
    ) {
      seo = {
        ...seo,
        title: 'Klub tafsilotlari | Ursu Ittifoq',
        description:
          'Urganch davlat universiteti Yoshlar ittifoqi yo‘nalishi va talabalar klubi faoliyati haqida batafsil maʼlumot.',
      }
    } else if (normalizedPath === '/boglanish') {
      seo = {
        ...seo,
        title: 'Bog‘lanish va murojaat | Ursu Ittifoq',
        description:
          'Urganch davlat universiteti Yoshlar ittifoqi rasmiy manzillari, aloqa telefonlari va onlayn murojaat yuborish.',
      }
    } else if (normalizedPath === '/hamkorlik') {
      seo = {
        ...seo,
        title: 'Xalqaro hamkorlik va grantlar | Ursu Ittifoq',
        description:
          'Urganch davlat universiteti talabalari uchun xalqaro grantlar, xorijiy almashinuv dasturlari va loyihalar.',
      }
    } else if (normalizedPath === '/yangiliklar') {
      seo = {
        ...seo,
        title: 'Yangiliklar va eʼlonlar | Ursu Ittifoq',
        description:
          'Urganch davlat universiteti Yoshlar ittifoqi so‘nggi yangiliklari, eʼlonlar, xakatonlar va yoshlar tadbirlari.',
      }
    } else if (normalizedPath.startsWith('/yangiliklar/')) {
      seo = {
        ...seo,
        title: 'Yangilik tafsilotlari | Ursu Ittifoq',
        description:
          'Urganch davlat universiteti Yoshlar ittifoqi yangiligi va talabalar tadbirlari haqida to‘liq maʼlumot.',
      }
    } else if (normalizedPath === '/statistika') {
      seo = {
        ...seo,
        title: 'Statistika va ko‘rsatkichlar | Ursu Ittifoq',
        description:
          'Urganch davlat universiteti talaba-yoshlar kontingenti, fakultetlar va jamoatchilik faolligi ko‘rsatkichlari.',
      }
    } else if (normalizedPath === '/ittifoq-hayoti' || normalizedPath === '/galereya') {
      seo = {
        ...seo,
        title: 'Ittifoq hayoti va fotolavhalar | Ursu Ittifoq',
        description:
          'Urganch davlat universiteti Yoshlar ittifoqi tadbirlari, forumlari va talabalar hayotidan barcha fotolavhalar to‘plami.',
      }
    } else if (normalizedPath === '/admin') {
      shouldIndex = false
      seo = {
        ...seo,
        title: 'Admin boshqaruv paneli | Ursu Ittifoq',
        description: 'Urganch davlat universiteti Yoshlar ittifoqi admin boshqaruv tizimi.',
      }
    } else if (!isHome) {
      shouldIndex = false
      seo = {
        ...seo,
        title: '404 — Sahifa topilmadi | Ursu Ittifoq',
        description: 'Siz qidirgan sahifa mavjud emas.',
      }
    }

    document.title = seo.title
    upsertMeta('name', 'description', seo.description)
    upsertMeta('name', 'robots', shouldIndex ? 'index, follow, max-image-preview:large' : 'noindex, nofollow')
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', 'Ursu Ittifoq')
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
              <Route path="/ittifoq-hayoti" element={<IttifoqHayotiPage />} />
              <Route path="/ittifoq hayoti" element={<IttifoqHayotiPage />} />
              <Route path="/ittifoq%20hayoti" element={<IttifoqHayotiPage />} />
              <Route path="/galereya" element={<IttifoqHayotiPage />} />
              <Route path="/statistika" element={<StatistikaPage />} />
              <Route path="/tuzilma" element={<TuzilmaPage />} />
              <Route path="/team" element={<TuzilmaPage />} />
              <Route path="/klublar" element={<KlublarPage />} />
              <Route path="/klublar/:id" element={<ClubDetailPage />} />
              <Route path="/yonalishlar" element={<KlublarPage />} />
              <Route path="/yonalishlar/:id" element={<ClubDetailPage />} />
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
      </SmoothScroll>
    </NewsProvider>
  )
}

export default App
