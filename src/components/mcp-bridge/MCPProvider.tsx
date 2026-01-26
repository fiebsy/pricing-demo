'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { useComponentInspector, useMCPActions } from '@/hooks/mcp'
import type { MCPContextValue } from './types'

const MCPContext = createContext<MCPContextValue | null>(null)

export function useMCP() {
  const context = useContext(MCPContext)
  if (!context) {
    throw new Error('useMCP must be used within MCPProvider')
  }
  return context
}

interface MCPProviderProps {
  children: ReactNode
}

const isDev = process.env.NODE_ENV === 'development'

export function MCPProvider({ children }: MCPProviderProps) {
  const inspector = useComponentInspector()

  // Only poll for actions when inspector is active (and in development)
  useMCPActions({
    enabled: isDev && inspector.isActive,
    pollInterval: 1000,
  })

  const value: MCPContextValue = {
    isInspectorActive: inspector.isActive,
    toggleInspector: inspector.toggle,
    hoveredComponent: inspector.hoveredComponent,
    selectedComponent: inspector.selectedComponent,
    clearSelection: inspector.clearSelection,
    syncStatus: inspector.syncStatus,
  }

  return <MCPContext.Provider value={value}>{children}</MCPContext.Provider>
}
