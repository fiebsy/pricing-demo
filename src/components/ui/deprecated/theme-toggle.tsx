'use client'

import * as React from 'react'
import { Switch } from 'react-aria-components'
import { useTheme } from '../../theme-provider'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import { Moon02Icon, Sun03Icon } from '@hugeicons-pro/core-duotone-rounded'

/**
 * Theme toggle switch
 * Uses react-aria-components Switch for accessibility and proper toggle behavior
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="fixed bottom-4 right-4 z-50 h-8 w-14" />
  }

  const isDark = theme === 'dark'

  return (
    <Switch
      isSelected={isDark}
      onChange={(selected) => setTheme(selected ? 'dark' : 'light')}
      className="group fixed bottom-4 right-4 z-50 flex h-8 w-14 cursor-pointer items-center rounded-full bg-tertiary p-1 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary selected:bg-quaternary"
      aria-label="Toggle dark mode"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary shadow-sm transition-transform duration-200 ease-out group-selected:translate-x-6">
        <HugeIcon
          icon={isDark ? Moon02Icon : Sun03Icon}
          size={14}
          strokeWidth={1.5}
          className="text-quaternary"
        />
      </span>
    </Switch>
  )
}
