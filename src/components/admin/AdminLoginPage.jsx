import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Lock, Eye, EyeOff, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react'
import { useNews } from '../../context/NewsContext'
import { profile } from '../../data/siteData'

export default function AdminLoginPage() {
  const { adminLogin } = useNews()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const res = adminLogin(password)
      if (!res.success) {
        setError(res.error || 'Parol xato!')
      }
      setLoading(false)
    }, 250)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#F5F0E8] dark:bg-[#07090d] text-zinc-900 dark:text-zinc-100 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md overflow-hidden rounded-3xl border border-zinc-300/80 bg-white/90 p-8 shadow-2xl backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/90"
      >
        {/* Back link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition"
          >
            <ArrowLeft size={14} />
            Bosh sahifaga qaytish
          </Link>
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            Maxfiy Bo‘lim
          </span>
        </div>

        {/* Brand & Title */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-sm">
            <ShieldCheck size={32} />
          </div>

          <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
            Admin Boshqaruv Paneli
          </h1>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            {profile.name} — Yangilik va eʼlonlarni boshqarish
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3 text-center text-xs font-semibold text-rose-600 dark:text-rose-400"
            >
              {error}
            </motion.div>
          )}

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Admin Paroli
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parolni kiriting..."
                className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 top-3.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-zinc-400">
              Standart boshlang‘ich parol: <code className="font-mono font-bold text-emerald-600 dark:text-emerald-400">admin2026</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-emerald-400 transition shadow-lg hover:shadow-emerald-500/25 active:scale-98 disabled:opacity-50 cursor-pointer"
          >
            <Lock size={15} />
            {loading ? 'Tekshirilmoqda...' : 'Tizimga Kirish'}
          </button>
        </form>

        <div className="mt-8 border-t border-zinc-200/80 pt-4 text-center dark:border-zinc-800">
          <p className="text-[11px] text-zinc-400">
            UrDU Yoshlar Ittifoqi Axborot Xizmati • 2026
          </p>
        </div>
      </motion.div>
    </div>
  )
}
