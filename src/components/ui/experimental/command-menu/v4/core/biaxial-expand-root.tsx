/**
 * Biaxial Expand V4 - Root Component
 *
 * The main container that orchestrates the composable expand system.
 * Provides context to all child slot components and manages:
 * - Expanded/collapsed state
 * - Dimension tracking for all slots
 * - Animation timing calculations
 *
 * Uses the UNIFIED model from V3 where:
 * - Trigger and bottom content live in one clipped container
 * - Backdrop expands to cover both areas
 * - Clip-path animation reveals content smoothly
 */

'use client'

import * as React from 'react'
import {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react'
import { cn } from '@/lib/utils'
import { BiaxialExpandProvider } from './context'
import { DEFAULT_BIAXIAL_EXPAND_CONFIG } from './constants'
import { deepMerge } from './utils'
import type {
  BiaxialExpandRootProps,
  BiaxialExpandConfig,
  BiaxialExpandContextValue,
  SlotDimensions,
  SlotPosition,
} from './types'

export const BiaxialExpandRoot: React.FC<BiaxialExpandRootProps> = ({
  config: userConfig,
  expanded: controlledExpanded,
  onExpandedChange,
  className,
  children,
}) => {
  // Merge user config with defaults
  const config = useMemo<BiaxialExpandConfig>(
    () => deepMerge(DEFAULT_BIAXIAL_EXPAND_CONFIG, userConfig ?? {}),
    [userConfig]
  )

  // State
  const [internalExpanded, setInternalExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const expanded = controlledExpanded ?? internalExpanded

  // Slot dimension state - initialize with config values
  // topHeight: use maxTopHeight if set (for scrollable content), otherwise use fixed height
  const initialTopHeight = config.topSlot.enabled
    ? (config.layout.maxTopHeight ?? config.topSlot.height ?? 48)
    : 0

  const [dimensions, setDimensions] = useState<SlotDimensions>({
    topHeight: initialTopHeight,
    triggerHeight: config.layout.triggerHeight,
    bottomHeight: config.layout.maxBottomHeight,
    panelWidth: config.layout.panelWidth,
    triggerWidth: config.layout.triggerWidth,
  })

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Expanded state handler
  const setExpanded = useCallback(
    (newExpanded: boolean) => {
      setInternalExpanded(newExpanded)
      onExpandedChange?.(newExpanded)
    },
    [onExpandedChange]
  )

  // Slot height setter
  const setSlotHeight = useCallback(
    (slot: SlotPosition, height: number) => {
      setDimensions((prev) => {
        const key = `${slot}Height` as keyof SlotDimensions
        if (prev[key] === height) return prev
        return { ...prev, [key]: height }
      })
    },
    []
  )

  // Click outside handler
  useEffect(() => {
    if (!expanded) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setExpanded(false)
      }
    }

    // Delay to prevent immediate close on trigger click
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 10)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [expanded, setExpanded])

  // Calculate total expanded height (for backdrop)
  const totalExpandedHeight = useMemo(() => {
    const { triggerHeight, bottomGap } = config.layout
    return triggerHeight + bottomGap + dimensions.bottomHeight
  }, [config.layout, dimensions.bottomHeight])

  // Calculate timing functions
  const timing = useMemo(() => {
    const { animation } = config
    const baseDuration = expanded
      ? animation.duration
      : animation.collapseDuration

    return {
      duration: baseDuration,
      backdropDuration: baseDuration + animation.backdropDurationOffset,
      slotDuration: (slot: SlotPosition) => {
        const slotConfig = config[`${slot}Slot` as keyof BiaxialExpandConfig]
        const offset =
          slotConfig && typeof slotConfig === 'object' && 'durationOffset' in slotConfig
            ? (slotConfig.durationOffset as number) ?? 0
            : 0
        return baseDuration + offset
      },
      slotDelay: (slot: SlotPosition) => {
        const slotConfig = config[`${slot}Slot` as keyof BiaxialExpandConfig]
        const offset =
          slotConfig && typeof slotConfig === 'object' && 'delayOffset' in slotConfig
            ? (slotConfig.delayOffset as number) ?? 0
            : 0
        return animation.backdropDelay + offset
      },
    }
  }, [config, expanded])

  // Build context value (no clipPaths - components calculate their own)
  const contextValue = useMemo<BiaxialExpandContextValue>(
    () => ({
      expanded,
      setExpanded,
      hovered,
      setHovered,
      config,
      dimensions,
      refs: {
        container: containerRef,
        top: topRef,
        trigger: triggerRef,
        bottom: bottomRef,
      },
      setSlotHeight,
      totalExpandedHeight,
      timing,
    }),
    [
      expanded,
      setExpanded,
      hovered,
      config,
      dimensions,
      setSlotHeight,
      totalExpandedHeight,
      timing,
    ]
  )

  return (
    <BiaxialExpandProvider value={contextValue}>
      <div
        ref={containerRef}
        className={cn('relative inline-block overflow-visible', className)}
        style={{
          width: config.layout.triggerWidth,
          height: config.layout.triggerHeight,
          // Elevate z-index when expanded so this menu appears above siblings
          zIndex: expanded ? 50 : 'auto',
        }}
      >
        {children}
      </div>
    </BiaxialExpandProvider>
  )
}

BiaxialExpandRoot.displayName = 'BiaxialExpandV4.Root'
