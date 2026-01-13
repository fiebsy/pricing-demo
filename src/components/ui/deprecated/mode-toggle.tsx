'use client'

import * as React from 'react'
import { Switch } from 'react-aria-components'

type ThemeMode = 'delphi' | 'website'

const DELPHI_CLASS = 'theme-delphi'

/**
 * Applies mode class to document - toggles the theme-delphi class
 */
function applyModeClass(mode: ThemeMode) {
  const root = document.documentElement
  if (mode === 'delphi') {
    root.classList.add(DELPHI_CLASS)
  } else {
    root.classList.remove(DELPHI_CLASS)
  }
}

/**
 * Mode toggle switch - switches between Delphi and Website themes
 * Uses react-aria-components Switch for accessibility
 */
export function ModeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const [mode, setMode] = React.useState<ThemeMode>('delphi')

  // Initialize on mount - check DOM state first, then localStorage
  React.useEffect(() => {
    setMounted(true)
    const root = document.documentElement
    const hasDelphiClass = root.classList.contains(DELPHI_CLASS)
    const savedMode = localStorage.getItem('themeMode') as ThemeMode | null

    // Use saved preference, or detect from current DOM state
    const initialMode = savedMode ?? (hasDelphiClass ? 'delphi' : 'website')
    setMode(initialMode)
    applyModeClass(initialMode)
  }, [])

  const handleModeChange = React.useCallback((newMode: ThemeMode) => {
    setMode(newMode)
    localStorage.setItem('themeMode', newMode)
    applyModeClass(newMode)
  }, [])

  if (!mounted) {
    return <div className="fixed bottom-4 left-4 z-50 h-8 w-14" />
  }

  const isDelphi = mode === 'delphi'

  return (
    <Switch
      isSelected={isDelphi}
      onChange={(selected) => handleModeChange(selected ? 'delphi' : 'website')}
      className="group fixed bottom-4 left-4 z-50 flex h-8 w-14 cursor-pointer items-center rounded-full bg-tertiary p-1 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary selected:bg-quaternary"
      aria-label="Toggle theme mode"
    >
      <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-primary shadow-sm transition-transform duration-200 ease-out group-selected:translate-x-6">
        <span className="text-[10px] font-semibold text-quaternary">D</span>
        {!isDelphi && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="h-[2px] w-4 rotate-[-45deg] rounded-full bg-quaternary" />
          </span>
        )}
      </span>
    </Switch>
  )
}

export type { ThemeMode }
