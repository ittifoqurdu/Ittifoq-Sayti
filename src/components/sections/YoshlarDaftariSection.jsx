import { useState, useMemo } from 'react'
import {
  HeartHandshake,
  ShieldCheck,
  TrendingUp,
  Home,
  Search
} from 'lucide-react'
import yoshlarDaftariStats from '../../data/yoshlarDaftariStats.json'

export default function YoshlarDaftariSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const { categoriesTable } = yoshlarDaftariStats

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categoriesTable || []
    const q = searchQuery.toLowerCase().trim()
    return (categoriesTable || []).filter((c) =>
      c.title.toLowerCase().includes(q) ||
      (c.imtiyoz && c.imtiyoz.toLowerCase().includes(q))
    )
  }, [categoriesTable, searchQuery])

  const totalSocialCount = useMemo(() => {
    return (categoriesTable || []).reduce((acc, c) => acc + c.officialCount, 0)
  }, [categoriesTable])

  return (
    <section className="mt-8 mb-8 space-y-6" id="yoshlar-daftari-statistika">
      {/* Table Container */}
      <div className="glass-card overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-200/80 dark:border-zinc-800/80 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
              <HeartHandshake size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                Ijtimoiy toifalar va daftarlar bo‘yicha rasmiy ko‘rsatkichlar
                <span className="hidden sm:inline-flex rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  {categoriesTable?.length || 9} ta toifa
                </span>
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Urganch davlat universiteti boshlang‘ich tashkiloti hisobidagi barcha toifalar kesimida talabalar soni
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Toifani qidirish..."
                className="rounded-xl border border-zinc-200/80 bg-white/80 py-1.5 pl-8 pr-3 text-xs text-zinc-900 outline-none focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-100 transition shadow-sm w-44 sm:w-56"
              />
            </div>
            <span className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 shrink-0">
              Jami: {totalSocialCount.toLocaleString()} nafar
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-zinc-200 bg-zinc-50/80 font-bold uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400">
              <tr>
                <th className="py-3 px-4 w-12 text-center">№</th>
                <th className="py-3 px-4">Ijtimoiy toifa / Daftar nomi</th>
                <th className="py-3 px-4 text-center">Talabalar soni</th>
                <th className="py-3 px-4 text-center">TTJdagi talabalar</th>
                <th className="py-3 px-4">Qamrov va holati</th>
                <th className="py-3 px-4">Ko‘rsatilgan imtiyoz va yordam</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
              {filteredCategories.map((cat, index) => (
                <tr
                  key={cat.key}
                  className="hover:bg-emerald-500/5 transition-colors"
                >
                  <td className="py-3.5 px-4 text-center font-bold text-zinc-400">
                    {index + 1}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                      {cat.title}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center justify-center rounded-xl bg-emerald-500/10 px-3 py-1 text-sm font-extrabold text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                      {cat.officialCount.toLocaleString()} nafar
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-zinc-800 dark:text-zinc-200">
                    <span className="inline-flex items-center gap-1 text-xs">
                      <Home size={13} className="text-zinc-400" />
                      {cat.ttjCount} nafar
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                      {cat.badge}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">
                    {cat.imtiyoz}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
