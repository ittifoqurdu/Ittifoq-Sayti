import { useState } from 'react'
import {
  Mail,
  Phone,
  Send,
  Users,
  GraduationCap,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Award,
  Layers,
} from 'lucide-react'
import {
  boshqaruvMembers,
  koordinatorMembers,
  yetakchiMembers,
} from '../../data/siteData'

function MemberCard({ member }) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/80 bg-[#F8F3EB]/90 shadow-lg dark:border-zinc-800/90 dark:bg-zinc-900/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10">
      {/* Top Large Photo Section */}
      <div className="relative h-72 w-full overflow-hidden sm:h-80 bg-[#EDE8DE] dark:bg-zinc-950">
        {member.avatar ? (
          <img
            src={member.avatar}
            alt={member.name}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-zinc-200 to-zinc-300 text-4xl font-bold text-emerald-600 dark:from-zinc-800 dark:to-zinc-900 dark:text-emerald-400">
            {member.name.split(' ').map((n) => n[0]).join('')}
          </div>
        )}

        {/* Gradient overlay for readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#F5F0E8]/95 via-[#F5F0E8]/20 to-transparent dark:from-zinc-950 dark:via-zinc-950/20" />

        {/* Badge on Photo */}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-[#F8F3EB]/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 backdrop-blur-md shadow-md dark:border-emerald-400/40 dark:bg-zinc-950/85 dark:text-emerald-300">
            <Sparkles size={11} className="text-emerald-600 dark:text-emerald-400" />
            {member.badge}
          </span>
        </div>

        {/* Verified active badge */}
        <div className="absolute right-4 bottom-4 flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-950 shadow-md">
          <CheckCircle2 size={13} strokeWidth={2.5} />
          <span>Faol</span>
        </div>
      </div>

      {/* Member Details */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-zinc-900 group-hover:text-emerald-600 transition-colors dark:text-zinc-100 dark:group-hover:text-emerald-300">
            {member.name}
          </h3>
          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            {member.role}
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            <GraduationCap size={14} className="text-emerald-500 dark:text-emerald-400/80 shrink-0" />
            <span>{member.faculty}</span>
          </p>

          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {member.bio}
          </p>

          {/* Focus skills */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {member.skills?.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-zinc-200/80 bg-zinc-50 px-2.5 py-1 text-[11px] font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-400"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Bar: Email, TG, Phone */}
        <div className="mt-6 border-t border-zinc-200/80 pt-5 space-y-2.5 dark:border-zinc-800/80">
          {/* Telegram */}
          {member.telegram ? (
            <a
              href={member.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-zinc-200/80 bg-zinc-50/80 px-3.5 py-2 text-xs text-zinc-700 transition hover:border-emerald-500/60 hover:bg-emerald-50 hover:text-emerald-700 dark:border-zinc-800/90 dark:bg-zinc-950/70 dark:text-zinc-300 dark:hover:border-emerald-500/60 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300"
            >
              <span className="flex items-center gap-2">
                <Send size={13} className="text-sky-500 dark:text-sky-400" />
                <span className="font-semibold">Telegram:</span>
              </span>
              <span className="text-zinc-500 group-hover:text-zinc-800 dark:text-zinc-400 dark:group-hover:text-zinc-200">
                {member.telegramHandle || '@UrDU_Yoshlari_BT'}
              </span>
            </a>
          ) : null}

          {/* Email */}
          {member.email ? (
            <a
              href={`mailto:${member.email}`}
              className="flex items-center justify-between rounded-xl border border-zinc-200/80 bg-zinc-50/80 px-3.5 py-2 text-xs text-zinc-700 transition hover:border-emerald-500/60 hover:bg-emerald-50 hover:text-emerald-700 dark:border-zinc-800/90 dark:bg-zinc-950/70 dark:text-zinc-300 dark:hover:border-emerald-500/60 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300"
            >
              <span className="flex items-center gap-2">
                <Mail size={13} className="text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold">Email:</span>
              </span>
              <span className="text-zinc-500 truncate max-w-[180px] dark:text-zinc-400">
                {member.email}
              </span>
            </a>
          ) : null}

          {/* Phone */}
          {member.phone ? (
            <a
              href={`tel:${member.phone}`}
              className="flex items-center justify-between rounded-xl border border-zinc-200/80 bg-zinc-50/80 px-3.5 py-2 text-xs text-zinc-700 transition hover:border-emerald-500/60 hover:bg-emerald-50 hover:text-emerald-700 dark:border-zinc-800/90 dark:bg-zinc-950/70 dark:text-zinc-300 dark:hover:border-emerald-500/60 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300"
            >
              <span className="flex items-center gap-2">
                <Phone size={13} className="text-amber-500 dark:text-amber-400" />
                <span className="font-semibold">Telefon:</span>
              </span>
              <span className="text-zinc-500 font-mono dark:text-zinc-400">
                {member.phoneLabel || member.phone}
              </span>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default function TeamSection() {
  const [activeTab, setActiveTab] = useState('all')

  const tabs = [
    { id: 'all', label: 'Barchasi', icon: Layers },
    { id: 'boshqaruv', label: 'Boshqaruv', icon: ShieldCheck },
    { id: 'kordinator', label: 'Koordinatorlar', icon: Users },
    { id: 'yetakchi', label: 'Yetakchilar', icon: Award },
  ]

  const showBoshqaruv = activeTab === 'all' || activeTab === 'boshqaruv'
  const showKoordinator = activeTab === 'all' || activeTab === 'kordinator'
  const showYetakchi = activeTab === 'all' || activeTab === 'yetakchi'

  return (
    <section
      className="relative isolate mx-auto w-full max-w-[1340px] px-4 py-20 md:px-7 lg:py-28"
      id="team"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-20 top-1/4 -z-10 h-96 w-96 rounded-full bg-transparent dark:bg-emerald-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-transparent dark:bg-cyan-500/10 blur-[130px]" />

      {/* Section Header */}
      <div className="mb-12 text-center lg:mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
          <Users size={14} />
          Yetakchilar Kengashi
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-zinc-100">
          UrDU Yoshlar Ittifoqi <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400">Tuzilmasi</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
          Universitetimiz talabalarining tashabbuslarini muvofiqlashtiruvchi Boshqaruv, Yo‘nalish Koordinatorlari va Faol Yetakchilar.
        </p>

        {/* Tabs switcher */}
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/25 scale-105'
                    : 'border border-zinc-200/90 bg-white/90 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/80 dark:hover:text-white shadow-sm'
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Distinct Group Sections */}
      <div className="space-y-16">
        {/* 1. BOSHQARUV KENGASHI */}
        {showBoshqaruv ? (
          <div>
            <div className="mb-6 flex items-center gap-3 border-b border-zinc-200/80 pb-4 dark:border-zinc-800/80">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-900 sm:text-2xl dark:text-zinc-100">
                  Boshqaruv Kengashi
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Boshlang‘ich tashkilot yetakchisi va boshqaruv mas’ullari
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
              {boshqaruvMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        ) : null}

        {/* 2. KOORDINATORLAR */}
        {showKoordinator ? (
          <div>
            <div className="mb-6 flex items-center gap-3 border-b border-zinc-200/80 pb-4 dark:border-zinc-800/80">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <Users size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-900 sm:text-2xl dark:text-zinc-100">
                  Koordinatorlar
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Soha va faoliyat yo‘nalishlari bo‘yicha mas’ul koordinatorlar
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {koordinatorMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        ) : null}

        {/* 3. YETAKCHILAR */}
        {showYetakchi ? (
          <div>
            <div className="mb-6 flex items-center gap-3 border-b border-zinc-200/80 pb-4 dark:border-zinc-800/80">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Award size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-900 sm:text-2xl dark:text-zinc-100">
                  Yetakchilar
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Klublar, intellektual to‘garaklar va yo‘nalish faol yetakchilari
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
              {yetakchiMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
