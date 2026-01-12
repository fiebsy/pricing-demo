/**
 * Panel Context
 *
 * Split context pattern for optimal performance:
 * - PanelStateContext: Frequently changing values (activeTab, isScrollingProgrammatically)
 * - PanelActionsContext: Stable functions and refs (never cause re-renders)
 *
 * Use usePanelState() when you need reactive state
 * Use usePanelActions() when you only need functions/refs
 * Use usePanelContext() for backwards compatibility (combines both)
 */

'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from 'react'
import type { PanelStateValue, PanelActionsValue, PanelContextValue } from '../types'

// -----------------------------------------------------------------------------
// Split Contexts
// -----------------------------------------------------------------------------

const PanelStateContext = createContext<PanelStateValue | null>(null)
const PanelActionsContext = createContext<PanelActionsValue | null>(null)

// Legacy combined context (for backwards compatibility)
const PanelContext = createContext<PanelContextValue | null>(null)

// -----------------------------------------------------------------------------
// Provider
// -----------------------------------------------------------------------------

interface PanelProviderProps {
  children: ReactNode
  defaultActiveTab: string
  defaultMinimized?: boolean
}

export const PanelProvider = ({
  children,
  defaultActiveTab,
  defaultMinimized = false,
}: PanelProviderProps) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab)
  const [isScrollingProgrammatically, setIsScrollingProgrammatically] = useState(false)
  const [isMinimized, setIsMinimized] = useState(defaultMinimized)

  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())

  // Stable function - never changes
  const registerSection = useCallback((id: string, element: HTMLElement | null) => {
    if (element) {
      sectionRefs.current.set(id, element)
    } else {
      sectionRefs.current.delete(id)
    }
  }, [])

  // Stable function - never changes
  const scrollToSection = useCallback((sectionId: string) => {
    const sectionEl = sectionRefs.current.get(sectionId)
    const container = containerRef.current

    if (!sectionEl || !container) return

    setActiveTab(sectionId)
    setIsScrollingProgrammatically(true)

    const scrollMargin = 128
    const elementTop = sectionEl.offsetTop
    const targetScroll = Math.max(0, elementTop - scrollMargin)

    const scrollDistance = Math.abs(container.scrollTop - targetScroll)
    const useSmooth = scrollDistance > 500

    container.scrollTo({
      top: targetScroll,
      behavior: useSmooth ? 'smooth' : 'auto',
    })

    const resetDelay = useSmooth ? 600 : 100
    setTimeout(() => {
      setIsScrollingProgrammatically(false)
    }, resetDelay)
  }, [])

  // Toggle minimize state
  const toggleMinimize = useCallback(() => {
    setIsMinimized((prev) => !prev)
  }, [])

  // Set minimize state directly
  const setMinimized = useCallback((value: boolean) => {
    setIsMinimized(value)
  }, [])

  // State value - changes when state changes
  const stateValue = useMemo<PanelStateValue>(
    () => ({
      activeTab,
      isScrollingProgrammatically,
      isMinimized,
    }),
    [activeTab, isScrollingProgrammatically, isMinimized]
  )

  // Actions value - stable reference, never changes
  const actionsValue = useMemo<PanelActionsValue>(
    () => ({
      setActiveTab,
      setIsScrollingProgrammatically,
      registerSection,
      scrollToSection,
      toggleMinimize,
      setMinimized,
      containerRef,
    }),
    [registerSection, scrollToSection, toggleMinimize, setMinimized]
  )

  // Combined value for backwards compatibility
  const combinedValue = useMemo<PanelContextValue>(
    () => ({
      ...stateValue,
      ...actionsValue,
    }),
    [stateValue, actionsValue]
  )

  return (
    <PanelActionsContext.Provider value={actionsValue}>
      <PanelStateContext.Provider value={stateValue}>
        <PanelContext.Provider value={combinedValue}>{children}</PanelContext.Provider>
      </PanelStateContext.Provider>
    </PanelActionsContext.Provider>
  )
}

// -----------------------------------------------------------------------------
// Hooks
// -----------------------------------------------------------------------------

/**
 * Get only the panel state (activeTab, isScrollingProgrammatically)
 * Use this when you need reactive state values
 */
export const usePanelState = (): PanelStateValue => {
  const context = useContext(PanelStateContext)
  if (!context) {
    throw new Error('usePanelState must be used within a PanelProvider')
  }
  return context
}

/**
 * Get only the panel actions (functions and refs)
 * Use this when you only need to call functions or access refs
 * Components using this won't re-render when state changes
 */
export const usePanelActions = (): PanelActionsValue => {
  const context = useContext(PanelActionsContext)
  if (!context) {
    throw new Error('usePanelActions must be used within a PanelProvider')
  }
  return context
}

/**
 * Get both state and actions (backwards compatible)
 * Prefer usePanelState() or usePanelActions() for better performance
 */
export const usePanelContext = (): PanelContextValue => {
  const context = useContext(PanelContext)
  if (!context) {
    throw new Error('usePanelContext must be used within a PanelProvider')
  }
  return context
}

export { PanelContext, PanelStateContext, PanelActionsContext }
