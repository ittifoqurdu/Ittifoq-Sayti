import { createContext, useContext, useEffect, useState, useMemo } from 'react'

const ThemeContext = createContext({
  theme: 'dark',
  isDark: true,
  toggleTheme: () => {},
  setTheme: () => {},
})

const THEME_STORAGE_KEY = 'urdu_theme_mode'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY)
      if (stored === 'light') return 'light'
      return 'dark'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    const root = document.documentElement
    const themeMeta = document.querySelector('meta[name="theme-color"]')

    if (theme === 'light') {
      root.classList.remove('dark')
      root.classList.add('light')
      if (themeMeta) themeMeta.setAttribute('content', '#FAF8F5')
    } else {
      root.classList.remove('light')
      root.classList.add('dark')
      if (themeMeta) themeMeta.setAttribute('content', '#07090d')
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Ignore storage write errors in private mode
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      toggleTheme,
      setTheme,
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
