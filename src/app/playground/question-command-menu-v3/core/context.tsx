/**
 * Question Command Menu V3 - Context Provider
 *
 * Provides config and helper methods to all child components.
 */

'use client'

import * as React from 'react'
import { createContext, useContext, useMemo, useCallback } from 'react'
import type {
  QuestionCommandMenuV3Config,
  ContentInstance,
  SlotPosition,
  ContentTypeId,
  TriggerPhase,
} from '../config/types'
import type { UnifiedSlotConfig } from '../config/slots'

// ============================================================================
// CONTEXT TYPE
// ============================================================================

export interface V3ContextValue {
  /** Full configuration */
  config: QuestionCommandMenuV3Config

  /** Get content instance for a slot position */
  getContentForSlot: (position: SlotPosition) => ContentInstance | undefined

  /** Get slot config for a position */
  getSlotConfig: (position: SlotPosition) => UnifiedSlotConfig

  /** Check if a slot has content assigned */
  hasContentForSlot: (position: SlotPosition) => boolean

  /** Get all content instances of a specific type */
  getContentByType: (type: ContentTypeId) => ContentInstance[]

  /** Filter state */
  filter: string
  setFilter: (value: string) => void

  /** Active tab state (for filters/tabs content) */
  activeTab: string
  setActiveTab: (value: string) => void

  /** Trigger phase state */
  triggerPhase: TriggerPhase
  setTriggerPhase: (phase: TriggerPhase) => void

  /** Saved question state */
  savedQuestion: string | null
  setSavedQuestion: (question: string | null) => void
}

// ============================================================================
// CONTEXT
// ============================================================================

const V3Context = createContext<V3ContextValue | null>(null)

// ============================================================================
// HOOK
// ============================================================================

export function useV3Context(): V3ContextValue {
  const context = useContext(V3Context)
  if (!context) {
    throw new Error('useV3Context must be used within QuestionCommandMenuV3Provider')
  }
  return context
}

// ============================================================================
// PROVIDER
// ============================================================================

interface ProviderProps {
  config: QuestionCommandMenuV3Config
  children: React.ReactNode
}

export function QuestionCommandMenuV3Provider({ config, children }: ProviderProps) {
  const [filter, setFilter] = React.useState('')
  const [activeTab, setActiveTab] = React.useState('')
  const [triggerPhase, setTriggerPhase] = React.useState<TriggerPhase>('add-idle')
  const [savedQuestion, setSavedQuestion] = React.useState<string | null>(null)

  // Get content for a specific slot
  const getContentForSlot = useCallback(
    (position: SlotPosition): ContentInstance | undefined => {
      return config.content.find((c) => c.slot === position)
    },
    [config.content]
  )

  // Get slot config
  const getSlotConfig = useCallback(
    (position: SlotPosition): UnifiedSlotConfig => {
      return config.slots[position]
    },
    [config.slots]
  )

  // Check if slot has content
  const hasContentForSlot = useCallback(
    (position: SlotPosition): boolean => {
      return config.content.some((c) => c.slot === position)
    },
    [config.content]
  )

  // Get content by type
  const getContentByType = useCallback(
    (type: ContentTypeId): ContentInstance[] => {
      return config.content.filter((c) => c.type === type)
    },
    [config.content]
  )

  const value = useMemo<V3ContextValue>(
    () => ({
      config,
      getContentForSlot,
      getSlotConfig,
      hasContentForSlot,
      getContentByType,
      filter,
      setFilter,
      activeTab,
      setActiveTab,
      triggerPhase,
      setTriggerPhase,
      savedQuestion,
      setSavedQuestion,
    }),
    [
      config,
      getContentForSlot,
      getSlotConfig,
      hasContentForSlot,
      getContentByType,
      filter,
      activeTab,
      triggerPhase,
      savedQuestion,
    ]
  )

  return <V3Context.Provider value={value}>{children}</V3Context.Provider>
}
