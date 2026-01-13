'use client'

import * as React from 'react'

type Theme = 'light' | 'dark'

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>('dark')
  const [mounted, setMounted] = React.useState(false)

  // Only run on client side
  React.useEffect(() => {
    setMounted(true)
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-mode')
      }
    } else {
      // Default to dark mode if no saved preference
      document.documentElement.classList.add('dark-mode')
    }
  }, [])

  const handleSetTheme = React.useCallback((newTheme: Theme) => {
    if (!mounted) return
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }
  }, [mounted])

  const toggleTheme = React.useCallback(() => {
    handleSetTheme(theme === 'light' ? 'dark' : 'light')
  }, [theme, handleSetTheme])

  // Always provide context, even before mounting
  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

