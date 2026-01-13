'use client'

import * as React from 'react'

type Theme = 'light' | 'dark'

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

/**
 * Applies theme class to document with optimized DOM updates.
 * Uses View Transitions API when available for smooth switching.
 */
function applyThemeClass(newTheme: Theme) {
  const root = document.documentElement
  const isDark = newTheme === 'dark'

  // Skip if already in correct state
  const currentlyDark = root.classList.contains('dark-mode')
  if (isDark === currentlyDark) return

  // Use View Transitions API for smooth theme switching (Chrome 111+)
  // Falls back to instant switch on unsupported browsers
  const updateDOM = () => {
    if (isDark) {
      root.classList.add('dark-mode')
    } else {
      root.classList.remove('dark-mode')
    }
  }

  if (typeof document.startViewTransition === 'function') {
    // Disable transition animation for instant switch (no visual delay)
    document.startViewTransition(() => {
      updateDOM()
      return Promise.resolve()
    })
  } else {
    updateDOM()
  }
}

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
      applyThemeClass(savedTheme)
    } else {
      // Default to dark mode if no saved preference
      applyThemeClass('dark')
    }
  }, [])

  const handleSetTheme = React.useCallback((newTheme: Theme) => {
    if (!mounted) return
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyThemeClass(newTheme)
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

