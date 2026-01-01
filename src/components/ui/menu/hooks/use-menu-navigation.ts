/**
 * Base UI Menu - Menu Navigation Hook
 *
 * Manages the navigation state for nested menus with optimized animations.
 *
 * Features:
 * - Uses ResizeObserver for accurate, automatic measurements
 * - Uses CSS Grid-based height animation (GPU-accelerated)
 * - Simplified state management with single source of truth
 *
 * @module base-ui/menu/hooks/use-menu-navigation
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { MenuItem, HeightTransitionConfig } from '../types'
import { STATE_RESET_DELAY } from '../config'

interface UseMenuNavigationOptions {
  /** Menu items */
  items: MenuItem[]
  /** Whether the menu is open */
  isOpen: boolean
  /** Height transition configuration */
  heightTransition: HeightTransitionConfig
}

interface UseMenuNavigationReturn {
  // Navigation state
  menuStack: string[]
  displayMenuStack: string[]
  inSubmenu: boolean

  // Height state
  rootHeight: number
  submenuHeight: number
  activePanel: 'root' | 'submenu'
  isTransitioning: boolean

  // Refs for containers
  rootMenuRef: React.RefObject<HTMLDivElement | null>
  submenuRef: React.RefObject<HTMLDivElement | null>
  containerRef: React.RefObject<HTMLDivElement | null>

  // Navigation functions
  navigateToSubmenu: (menuId: string) => void
  navigateBack: (slideTransitionDuration?: number) => void

  // Menu item helpers
  getCurrentMenuItems: () => MenuItem[]
  getCurrentMenuTitle: () => string | null

  // CSS custom properties for animation
  cssVars: Record<string, string>
}

/**
 * Hook for managing nested menu navigation with optimized height transitions
 */
export function useMenuNavigation({
  items,
  isOpen,
  heightTransition,
}: UseMenuNavigationOptions): UseMenuNavigationReturn {
  // ============================================================================
  // State
  // ============================================================================

  const [menuStack, setMenuStack] = useState<string[]>([])
  const [displayMenuStack, setDisplayMenuStack] = useState<string[]>([])
  const [rootHeight, setRootHeight] = useState(0)
  const [submenuHeight, setSubmenuHeight] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [activePanel, setActivePanel] = useState<'root' | 'submenu'>('root')

  // ============================================================================
  // Refs
  // ============================================================================

  const containerRef = useRef<HTMLDivElement>(null)
  const rootMenuRef = useRef<HTMLDivElement>(null)
  const submenuRef = useRef<HTMLDivElement>(null)
  const wasOpenRef = useRef(false)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // ============================================================================
  // Menu Item Helpers
  // ============================================================================

  const getCurrentMenuItems = useCallback((): MenuItem[] => {
    let currentItems = items
    for (const menuId of displayMenuStack) {
      const menuItem = currentItems.find((item) => item.id === menuId)
      if (menuItem && menuItem.type === 'submenu' && 'items' in menuItem) {
        currentItems = menuItem.items
      }
    }
    return currentItems
  }, [items, displayMenuStack])

  const getCurrentMenuTitle = useCallback((): string | null => {
    // Use displayMenuStack so title stays stable during exit animation
    if (displayMenuStack.length === 0) return null

    let currentItems = items
    let menuTitle = ''

    for (const menuId of displayMenuStack) {
      const menuItem = currentItems.find((item) => item.id === menuId)
      if (menuItem && 'label' in menuItem) {
        menuTitle = menuItem.label
        if (menuItem.type === 'submenu' && 'items' in menuItem) {
          currentItems = menuItem.items
        }
      }
    }

    return menuTitle || null
  }, [items, displayMenuStack])

  // ============================================================================
  // ResizeObserver Setup
  // ============================================================================

  useLayoutEffect(() => {
    if (!isOpen) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const target = entry.target as HTMLElement
        const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height

        if (target === rootMenuRef.current) {
          setRootHeight(height)
        } else if (target === submenuRef.current) {
          setSubmenuHeight(height)
        }
      }
    })

    resizeObserverRef.current = observer

    if (rootMenuRef.current) {
      observer.observe(rootMenuRef.current)
    }
    if (submenuRef.current) {
      observer.observe(submenuRef.current)
    }

    return () => {
      observer.disconnect()
      resizeObserverRef.current = null
    }
  }, [isOpen])

  // Re-observe on content changes
  useLayoutEffect(() => {
    if (!isOpen || !resizeObserverRef.current) return

    if (submenuRef.current && displayMenuStack.length > 0) {
      resizeObserverRef.current.observe(submenuRef.current)
    }
  }, [isOpen, displayMenuStack, items])

  // ============================================================================
  // Display State Sync (only on menu open, not on menuStack changes)
  // ============================================================================

  useEffect(() => {
    // Only sync when menu first opens, not on every menuStack change
    // navigateToSubmenu and navigateBack handle displayMenuStack updates directly
    if (isOpen && menuStack.length === 0 && displayMenuStack.length === 0) {
      setActivePanel('root')
    }
  }, [isOpen, menuStack.length, displayMenuStack.length])

  useEffect(() => {
    if (!isOpen && wasOpenRef.current) {
      const resetTimeout = setTimeout(() => {
        setMenuStack([])
        setDisplayMenuStack([])
        setActivePanel('root')
        setIsTransitioning(false)
      }, STATE_RESET_DELAY)

      return () => clearTimeout(resetTimeout)
    }
    wasOpenRef.current = isOpen
  }, [isOpen])

  // ============================================================================
  // Transition Management
  // ============================================================================

  const startTransition = useCallback(() => {
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current)
    }

    setIsTransitioning(true)

    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false)
    }, heightTransition.duration + 50)
  }, [heightTransition.duration])

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }
    }
  }, [])

  // ============================================================================
  // Navigation Functions
  // ============================================================================

  const navigateToSubmenu = useCallback((menuId: string) => {
    const newStack = [...menuStack, menuId]
    startTransition()
    setMenuStack(newStack)
    setDisplayMenuStack(newStack)
    setActivePanel('submenu')
  }, [menuStack, startTransition])

  const navigateBack = useCallback((slideTransitionDuration = 300) => {
    const newStack = menuStack.slice(0, -1)
    startTransition()
    setMenuStack(newStack)
    setActivePanel(newStack.length > 0 ? 'submenu' : 'root')
    // Delay displayMenuStack update so submenu content stays stable during slide-out
    setTimeout(() => {
      setDisplayMenuStack(newStack)
    }, slideTransitionDuration)
  }, [menuStack, startTransition])

  // ============================================================================
  // CSS Custom Properties
  // ============================================================================

  const cssVars = {
    '--menu-root-height': `${rootHeight}px`,
    '--menu-submenu-height': `${submenuHeight}px`,
    '--menu-target-height': activePanel === 'root' ? `${rootHeight}px` : `${submenuHeight}px`,
    '--menu-transition-duration': `${heightTransition.duration}ms`,
    '--menu-transition-easing': heightTransition.easing,
  }

  // ============================================================================
  // Return
  // ============================================================================

  return {
    menuStack,
    displayMenuStack,
    inSubmenu: menuStack.length > 0, // Use menuStack for immediate slide trigger
    rootHeight,
    submenuHeight,
    activePanel,
    isTransitioning,
    rootMenuRef,
    submenuRef,
    containerRef,
    navigateToSubmenu,
    navigateBack,
    getCurrentMenuItems,
    getCurrentMenuTitle,
    cssVars,
  }
}
