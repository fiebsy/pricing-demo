'use client'

import { createContext, useContext, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import type { NavConfig, NavSection, NavItem } from './nav-config'
import { getCurrentNavState, type CurrentNavState } from './nav-config'

interface NavigationContextValue {
  /** Current navigation state derived from pathname */
  navState: CurrentNavState
  /** Full nav config from layout */
  config: NavConfig
}

const NavigationContext = createContext<NavigationContextValue | null>(null)

interface NavigationProviderProps {
  children: React.ReactNode
  config: NavConfig
}

export function NavigationProvider({ children, config }: NavigationProviderProps) {
  const pathname = usePathname()

  const value = useMemo((): NavigationContextValue => {
    const navState = getCurrentNavState(pathname)
    return {
      navState,
      config,
    }
  }, [pathname, config])

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation(): NavigationContextValue {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider')
  }
  return context
}

// Convenience hooks
export function useCurrentSection(): NavSection | null {
  const { navState } = useNavigation()
  return navState.section
}

export function useCurrentItem(): NavItem | null {
  const { navState } = useNavigation()
  return navState.item
}

export function useHasTabs(): boolean {
  const { navState } = useNavigation()
  return navState.hasTabs
}

export function useNavConfig(): NavConfig {
  const { config } = useNavigation()
  return config
}
