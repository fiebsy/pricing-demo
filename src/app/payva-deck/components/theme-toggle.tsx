'use client'

import Sun03Icon from '@hugeicons-pro/core-stroke-rounded/Sun03Icon'
import Moon02Icon from '@hugeicons-pro/core-stroke-rounded/Moon02Icon'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import { cn } from '@/lib/utils'
import { useDeckTheme } from './deck-theme-provider'

/**
 * Theme toggle button for switching between light/dark deck modes.
 * Matches the export button aesthetic.
 */
export function ThemeToggle() {
  const { deckTheme, toggleDeckTheme } = useDeckTheme()
  const isLight = deckTheme === 'light'

  return (
    <button
      onClick={toggleDeckTheme}
      className={cn(
        'print-hidden',
        'flex items-center justify-center',
        'w-10 h-10',
        'text-secondary hover:text-primary',
        'bg-secondary hover:bg-tertiary',
        'rounded-lg',
        'transition-colors duration-200',
        'motion-reduce:transition-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary'
      )}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <HugeIcon
        icon={isLight ? Moon02Icon : Sun03Icon}
        size={18}
      />
    </button>
  )
}
