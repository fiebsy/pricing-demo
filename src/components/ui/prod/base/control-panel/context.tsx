// =============================================================================
// Panel Context
// =============================================================================
// Shared state management for the control panel including:
// - Active tab state
// - Minimize/expand state
// =============================================================================

'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
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
}

export function PanelProvider({
  children,
  defaultActiveTab,
  defaultMinimized = false,
  minimized: controlledMinimized,
  onMinimizedChange,
}: PanelProviderProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab)
  const [uncontrolledMinimized, setUncontrolledMinimized] = useState(defaultMinimized)

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

  const value = useMemo<PanelContextValue>(
    () => ({
      activeTab,
      setActiveTab,
      isMinimized,
      setIsMinimized,
      toggleMinimized,
    }),
    [activeTab, isMinimized, setIsMinimized, toggleMinimized]
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
