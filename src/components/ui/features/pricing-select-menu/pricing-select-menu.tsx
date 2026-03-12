/**
 * Pricing Select Menu - Root Component
 *
 * The main container that orchestrates the pricing select menu.
 * Provides context to all child components and manages:
 * - Expanded/collapsed state
 * - Dimension tracking
 * - Animation timing calculations
 */

'use client'

import * as React from 'react'
import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { PricingSelectMenuProvider } from './context'
import { DEFAULT_PRICING_SELECT_MENU_CONFIG, EASING_EXPO_OUT } from './constants'
import { deepMerge } from './utils'
import type {
  PricingSelectMenuRootProps,
  PricingSelectMenuConfig,
  PricingSelectMenuContextValue,
  SlotDimensions,
} from './types'

export const PricingSelectMenuRoot: React.FC<PricingSelectMenuRootProps> = ({
  config: userConfig,
  expanded: controlledExpanded,
  onExpandedChange,
  className,
  children,
}) => {
  // Merge user config with defaults
  const config = useMemo<PricingSelectMenuConfig>(
    () => deepMerge(DEFAULT_PRICING_SELECT_MENU_CONFIG, userConfig ?? {}),
    [userConfig]
  )

  // State
  const [internalExpanded, setInternalExpanded] = useState(false)
  const expanded = controlledExpanded ?? internalExpanded

  // Slot dimension state
  const bottomHeightMode = config.bottomSlot.heightMode ?? 'dynamic'
  const configBottomHeight = config.bottomSlot.enabled
    ? (bottomHeightMode === 'fixed'
        ? (config.bottomSlot.height ?? config.layout.maxBottomHeight)
        : config.layout.maxBottomHeight)
    : 0

  const [dimensions, setDimensions] = useState<SlotDimensions>({
    triggerHeight: config.layout.triggerHeight,
    bottomHeight: configBottomHeight,
    panelWidth: config.layout.panelWidth,
  })

  // Sync dimensions when config changes (e.g., variant switch without remount)
  useEffect(() => {
    setDimensions({
      triggerHeight: config.layout.triggerHeight,
      bottomHeight: configBottomHeight,
      panelWidth: config.layout.panelWidth,
    })
  }, [config.layout.triggerHeight, configBottomHeight, config.layout.panelWidth])

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)

  // Expanded state handler
  const setExpanded = useCallback(
    (newExpanded: boolean) => {
      setInternalExpanded(newExpanded)
      onExpandedChange?.(newExpanded)
    },
    [onExpandedChange]
  )

  // Slot height setter
  const setBottomHeight = useCallback((height: number) => {
    setDimensions((prev) => {
      if (prev.bottomHeight === height) return prev
      return { ...prev, bottomHeight: height }
    })
  }, [])

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

  // Calculate total expanded height
  const totalExpandedHeight = useMemo(() => {
    const { triggerHeight, bottomGap } = config.layout

    if (config.bottomSlot.enabled) {
      return triggerHeight + bottomGap + dimensions.bottomHeight
    }

    return triggerHeight
  }, [config, dimensions.bottomHeight])

  // Calculate timing functions
  const timing = useMemo(() => {
    const { animation } = config
    const baseDuration = expanded
      ? animation.duration
      : animation.collapseDuration

    return {
      duration: baseDuration,
      backdropDuration: baseDuration,
      slotDuration: () => baseDuration + animation.slotContainerDurationOffset,
      slotDelay: () => animation.slotContainerDelay,
    }
  }, [config, expanded])

  // Build context value
  const contextValue = useMemo<PricingSelectMenuContextValue>(
    () => ({
      expanded,
      setExpanded,
      config,
      dimensions,
      timing,
    }),
    [expanded, setExpanded, config, dimensions, timing]
  )

  // Expose setBottomHeight via a ref for the BottomSlot component
  React.useEffect(() => {
    // Store on containerRef for child access
    if (containerRef.current) {
      (containerRef.current as unknown as { setBottomHeight: typeof setBottomHeight }).setBottomHeight = setBottomHeight
    }
  }, [setBottomHeight])

  return (
    <PricingSelectMenuProvider value={contextValue}>
      <div
        ref={containerRef}
        className={cn('relative inline-block overflow-visible group/panel', className)}
        style={{
          width: config.layout.triggerWidth,
          height: config.layout.triggerHeight,
          zIndex: expanded ? 50 : 'auto',
        }}
      >
        {children}
      </div>
    </PricingSelectMenuProvider>
  )
}

PricingSelectMenuRoot.displayName = 'PricingSelectMenu.Root'
