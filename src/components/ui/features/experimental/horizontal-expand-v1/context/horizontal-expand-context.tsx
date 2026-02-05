/**
 * Horizontal Expand V1 - Context Provider
 *
 * Manages state and configuration for the horizontal expand system.
 */

'use client'

import * as React from 'react'
import { createContext, useContext, useCallback, useMemo, useRef, useState } from 'react'
import type {
  HorizontalExpandContextValue,
  HorizontalExpandConfig,
  SlotDimensions,
  SlotPosition,
} from '../types'
import { DEFAULT_HORIZONTAL_EXPAND_CONFIG } from '../constants'

// ============================================================================
// CONTEXT
// ============================================================================

const HorizontalExpandContext = createContext<HorizontalExpandContextValue | null>(null)

export function useHorizontalExpand(): HorizontalExpandContextValue {
  const context = useContext(HorizontalExpandContext)
  if (!context) {
    throw new Error('useHorizontalExpand must be used within HorizontalExpandV1.Root')
  }
  return context
}

// ============================================================================
// PROVIDER
// ============================================================================

interface HorizontalExpandProviderProps {
  config: HorizontalExpandConfig
  expanded: boolean
  onExpandedChange?: (expanded: boolean) => void
  children: React.ReactNode
}

export function HorizontalExpandProvider({
  config,
  expanded: controlledExpanded,
  onExpandedChange,
  children,
}: HorizontalExpandProviderProps) {
  // Internal expanded state (for uncontrolled mode)
  const [internalExpanded, setInternalExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)

  // Determine if controlled or uncontrolled
  const isControlled = controlledExpanded !== undefined
  const expanded = isControlled ? controlledExpanded : internalExpanded

  const setExpanded = useCallback(
    (value: boolean) => {
      if (isControlled) {
        onExpandedChange?.(value)
      } else {
        setInternalExpanded(value)
      }
    },
    [isControlled, onExpandedChange]
  )

  // Slot dimensions state
  const [dimensions, setDimensions] = useState<SlotDimensions>({
    leftWidth: config.leftSlot.width ?? 0,
    triggerWidth: config.layout.triggerWidth,
    rightWidth: config.rightSlot.width ?? 0,
    height: config.layout.triggerHeight,
  })

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  // Dimension setter
  const setSlotWidth = useCallback((slot: SlotPosition, width: number) => {
    setDimensions((prev) => {
      const key = slot === 'left' ? 'leftWidth' : slot === 'right' ? 'rightWidth' : 'triggerWidth'
      if (prev[key] === width) return prev
      return { ...prev, [key]: width }
    })
  }, [])

  // Calculate total expanded width
  const totalExpandedWidth = useMemo(() => {
    const leftWidth = config.leftSlot.enabled ? dimensions.leftWidth : 0
    const rightWidth = config.rightSlot.enabled ? dimensions.rightWidth : 0
    const leftGap = config.leftSlot.enabled ? config.layout.leftGap : 0
    const rightGap = config.rightSlot.enabled ? config.layout.rightGap : 0
    return leftWidth + leftGap + dimensions.triggerWidth + rightGap + rightWidth
  }, [config, dimensions])

  // Animation timing calculations
  const timing = useMemo(() => {
    const baseDuration = expanded ? config.animation.duration : config.animation.collapseDuration

    return {
      duration: baseDuration,
      slotDuration: (slot: SlotPosition) => {
        const slotConfig =
          slot === 'left' ? config.leftSlot : slot === 'right' ? config.rightSlot : config.triggerSlot
        return baseDuration + (slotConfig.durationOffset ?? 0)
      },
      slotDelay: (slot: SlotPosition) => {
        const slotConfig =
          slot === 'left' ? config.leftSlot : slot === 'right' ? config.rightSlot : config.triggerSlot
        return config.animation.slotContainerDelay + (slotConfig.delayOffset ?? 0)
      },
    }
  }, [expanded, config])

  // Context value
  const contextValue = useMemo<HorizontalExpandContextValue>(
    () => ({
      expanded,
      setExpanded,
      hovered,
      setHovered,
      config,
      dimensions,
      refs: {
        container: containerRef,
        left: leftRef,
        trigger: triggerRef,
        right: rightRef,
      },
      setSlotWidth,
      totalExpandedWidth,
      timing,
    }),
    [expanded, setExpanded, hovered, config, dimensions, setSlotWidth, totalExpandedWidth, timing]
  )

  return (
    <HorizontalExpandContext.Provider value={contextValue}>
      {children}
    </HorizontalExpandContext.Provider>
  )
}
