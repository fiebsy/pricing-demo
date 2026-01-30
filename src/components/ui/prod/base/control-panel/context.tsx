// =============================================================================
// Panel Context
// =============================================================================
// Shared state management for the control panel including:
// - Active tab state
// - Minimize/expand state
// - Navigation direction for slide animations
// =============================================================================

'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import type { PanelContextValue } from './types'

const PanelContext = createContext<PanelContextValue | null>(null)

interface PanelProviderProps {
  children: ReactNode
  defaultActiveTab: string
  defaultMinimized?: boolean
  minimized?: boolean
  onMinimizedChange?: (minimized: boolean) => void
  /** Ordered list of section IDs to determine navigation direction */
  sectionOrder?: string[]
}

export function PanelProvider({
  children,
  defaultActiveTab,
  defaultMinimized = false,
  minimized: controlledMinimized,
  onMinimizedChange,
  sectionOrder = [],
}: PanelProviderProps) {
  const [activeTab, setActiveTabState] = useState(defaultActiveTab)
  const [uncontrolledMinimized, setUncontrolledMinimized] = useState(defaultMinimized)
  
  // Track navigation direction: 1 = down (next section), -1 = up (previous section)
  const [direction, setDirection] = useState<1 | -1>(1)
  const previousTabRef = useRef(defaultActiveTab)

  // Support both controlled and uncontrolled minimize state
  const isMinimized = controlledMinimized ?? uncontrolledMinimized

  const setIsMinimized = useCallback(
    (value: boolean) => {
      if (onMinimizedChange) {
        onMinimizedChange(value)
      } else {
        setUncontrolledMinimized(value)
      }
    },
    [onMinimizedChange]
  )

  const toggleMinimized = useCallback(() => {
    setIsMinimized(!isMinimized)
  }, [isMinimized, setIsMinimized])

  // Enhanced setActiveTab that calculates direction
  const setActiveTab = useCallback(
    (newTab: string) => {
      const prevIndex = sectionOrder.indexOf(previousTabRef.current)
      const newIndex = sectionOrder.indexOf(newTab)
      
      // Determine direction: positive index change = down, negative = up
      if (prevIndex !== -1 && newIndex !== -1) {
        setDirection(newIndex > prevIndex ? 1 : -1)
      }
      
      previousTabRef.current = newTab
      setActiveTabState(newTab)
    },
    [sectionOrder]
  )

  const value = useMemo<PanelContextValue>(
    () => ({
      activeTab,
      setActiveTab,
      isMinimized,
      setIsMinimized,
      toggleMinimized,
      direction,
    }),
    [activeTab, setActiveTab, isMinimized, setIsMinimized, toggleMinimized, direction]
  )

  return <PanelContext.Provider value={value}>{children}</PanelContext.Provider>
}

export function usePanelContext() {
  const context = useContext(PanelContext)
  if (!context) {
    throw new Error('usePanelContext must be used within a PanelProvider')
  }
  return context
}

export { PanelContext }
