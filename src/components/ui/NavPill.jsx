function NavPill({ active = false, children, onClick, isCurrent = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={isCurrent ? 'page' : undefined}
      className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
        active
          ? 'border-emerald-500 bg-emerald-500 text-zinc-950 shadow-sm font-bold'
          : 'border-transparent text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60 dark:text-zinc-300 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/60'
      }`}
    >
      {children}
    </button>
  )
}

export default NavPill
