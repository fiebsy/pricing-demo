'use client'

import * as React from 'react'
import { useTheme } from '../theme-provider'
import { HugeIcon } from '@/v2/components/ui/icon/huge-icons/huge-icons'
import { Moon02Icon, Sun03Icon } from '@hugeicons-pro/core-duotone-rounded'

/**
 * Theme toggle button
 * Demonstrates semantic tokens adapting to light/dark modes
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Only render after mounting to prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="fixed top-4 right-4 z-50 h-10 w-10" />
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-2 text-primary hover:text-brand-primary transition-colors"
      aria-label="Toggle theme"
    >
      <HugeIcon 
        icon={theme === 'light' ? Moon02Icon : Sun03Icon}
        size={24}
        strokeWidth={1.5}
      />
    </button>
  )
}

