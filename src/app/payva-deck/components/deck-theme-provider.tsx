'use client'

import * as React from 'react'
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { DECK_THEME_KEY } from '../data'

type DeckTheme = 'light' | 'dark'

interface DeckThemeContextType {
  deckTheme: DeckTheme
  setDeckTheme: (theme: DeckTheme) => void
  toggleDeckTheme: () => void
}

const DeckThemeContext = createContext<DeckThemeContextType | undefined>(undefined)

interface DeckThemeProviderProps {
  children: React.ReactNode
}

/**
 * Deck-specific theme provider that operates independently of the site-wide theme.
 * Defaults to light mode for optimal presentation viewing.
 * Manages the `dark-mode` class on <html> for this page only.
 */
export function DeckThemeProvider({ children }: DeckThemeProviderProps) {
  const [deckTheme, setDeckThemeState] = useState<DeckTheme>('light')
  const [isHydrated, setIsHydrated] = useState(false)
  const [siteThemeBackup, setSiteThemeBackup] = useState<string | null>(null)

  // On mount: save site theme, restore deck theme from localStorage
  useEffect(() => {
    // Backup current site theme state
    const currentSiteTheme = localStorage.getItem('theme')
    setSiteThemeBackup(currentSiteTheme)

    // Restore deck theme preference (default to 'light')
    const savedDeckTheme = localStorage.getItem(DECK_THEME_KEY) as DeckTheme | null
    const initialTheme = savedDeckTheme || 'light'
    setDeckThemeState(initialTheme)

    // Apply the deck theme to the document
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }

    setIsHydrated(true)

    // Cleanup: restore site theme on unmount
    return () => {
      // Restore the site theme when leaving the deck page
      const siteTheme = localStorage.getItem('theme')
      if (siteTheme === 'dark') {
        document.documentElement.classList.add('dark-mode')
      } else {
        document.documentElement.classList.remove('dark-mode')
      }
    }
  }, [])

  // Sync deck theme to DOM and localStorage
  useEffect(() => {
    if (!isHydrated) return

    localStorage.setItem(DECK_THEME_KEY, deckTheme)

    if (deckTheme === 'dark') {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }
  }, [deckTheme, isHydrated])

  const setDeckTheme = useCallback((theme: DeckTheme) => {
    setDeckThemeState(theme)
  }, [])

  const toggleDeckTheme = useCallback(() => {
    setDeckThemeState((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  const value: DeckThemeContextType = {
    deckTheme,
    setDeckTheme,
    toggleDeckTheme,
  }

  return (
    <DeckThemeContext.Provider value={value}>
      {children}
    </DeckThemeContext.Provider>
  )
}

/**
 * Hook to access deck theme context.
 * Must be used within a DeckThemeProvider.
 */
export function useDeckTheme(): DeckThemeContextType {
  const context = useContext(DeckThemeContext)
  if (context === undefined) {
    throw new Error('useDeckTheme must be used within a DeckThemeProvider')
  }
  return context
}
