import { writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { directionsData, newsEvents } from '../src/data/siteData.js'

const BASE_URL = 'https://ittifoq.ursu.uz'
const today = new Date().toISOString().split('T')[0]

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/tuzilma', priority: '0.9', changefreq: 'weekly' },
  { path: '/klublar', priority: '0.9', changefreq: 'weekly' },
  { path: '/yangiliklar', priority: '0.9', changefreq: 'daily' },
  { path: '/statistika', priority: '0.8', changefreq: 'weekly' },
  { path: '/hamkorlik', priority: '0.8', changefreq: 'weekly' },
  { path: '/boglanish', priority: '0.8', changefreq: 'monthly' },
]

const clubRoutes = (directionsData || []).map((club) => ({
  path: `/klublar/${club.id}`,
  priority: '0.7',
  changefreq: 'weekly',
}))

const newsRoutes = (newsEvents || [])
  .filter((n) => n && n.id && String(n.id).toLowerCase() !== 'id')
  .map((n) => ({
    path: `/yangiliklar/${n.id}`,
    priority: '0.7',
    changefreq: 'weekly',
  }))

const allRoutes = [...staticRoutes, ...clubRoutes, ...newsRoutes]

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (item) => `  <url>
    <loc>${BASE_URL}${item.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

const publicPath = resolve('public', 'sitemap.xml')
writeFileSync(publicPath, sitemapXml, 'utf-8')
console.log(`[SEO] sitemap.xml generated successfully at ${publicPath} (${allRoutes.length} URLs)`)

const distPath = resolve('dist', 'sitemap.xml')
if (existsSync(resolve('dist'))) {
  writeFileSync(distPath, sitemapXml, 'utf-8')
  console.log(`[SEO] sitemap.xml copied to ${distPath}`)
}
