/**
 * Universal Expand - Root Component
 *
 * The main container that orchestrates the 4-directional expand system.
 * Provides context to all child slot components and manages:
 * - Expanded/collapsed state
 * - Dimension tracking for all slots (height for vertical, width for horizontal)
 * - Animation timing calculations
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
import { UniversalExpandProvider } from './context'
import { DEFAULT_UNIVERSAL_EXPAND_CONFIG } from './constants'
import { deepMerge, calculateTotalDimensions } from './utils'
import type {
  UniversalExpandRootProps,
  UniversalExpandConfig,
  UniversalExpandContextValue,
  SlotDimensions,
  SlotPosition,
  ExtendedSlotPosition,
} from './types'

export const UniversalExpandRoot: React.FC<UniversalExpandRootProps> = ({
  config: userConfig,
  expanded: controlledExpanded,
  onExpandedChange,
  isLocked: controlledLocked,
  onLockedChange,
  className,
  children,
}) => {
  // Merge user config with defaults
  const config = useMemo<UniversalExpandConfig>(
    () => deepMerge(DEFAULT_UNIVERSAL_EXPAND_CONFIG, userConfig ?? {}),
    [userConfig]
  )

  // State
  const [internalExpanded, setInternalExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [internalLocked, setInternalLocked] = useState(false)
  const expanded = controlledExpanded ?? internalExpanded
  const isLocked = controlledLocked ?? internalLocked

  // Lock state handler (supports controlled mode)
  const setLocked = useCallback(
    (newLocked: boolean) => {
      setInternalLocked(newLocked)
      onLockedChange?.(newLocked)
    },
    [onLockedChange]
  )

  // Initialize slot dimensions from config
  const getInitialDimension = (slot: ExtendedSlotPosition): number => {
    const slotConfig = config.slots[slot]
    if (!slotConfig.enabled) return 0
    return slotConfig.maxDimension ?? slotConfig.fixedDimension ?? 48
  }

  const [dimensions, setDimensions] = useState<SlotDimensions>({
    topHeight: getInitialDimension('top'),
    bottomHeight: getInitialDimension('bottom'),
    leftWidth: getInitialDimension('left'),
    rightWidth: getInitialDimension('right'),
    triggerWidth: config.layout.triggerWidth,
    triggerHeight: config.layout.triggerHeight,
    panelWidth: config.layout.panelWidth,
    panelHeight: config.layout.triggerHeight + config.layout.gaps.bottom + getInitialDimension('bottom'),
  })

  // Refs for all slots
  const containerRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  // Expanded state handler
  const setExpanded = useCallback(
    (newExpanded: boolean) => {
      setInternalExpanded(newExpanded)
      onExpandedChange?.(newExpanded)
    },
    [onExpandedChange]
  )

  // Slot dimension setter - handles both height and width based on slot position
  const setSlotDimension = useCallback(
    (slot: ExtendedSlotPosition, dimension: number) => {
      setDimensions((prev) => {
        // Map slot position to the appropriate dimension key
        const keyMap: Record<ExtendedSlotPosition, keyof SlotDimensions> = {
          top: 'topHeight',
          bottom: 'bottomHeight',
          left: 'leftWidth',
          right: 'rightWidth',
        }
        const key = keyMap[slot]
        if (prev[key] === dimension) return prev
        return { ...prev, [key]: dimension }
      })
    },
    []
  )

  // Click outside handler - respects lock state
  useEffect(() => {
    if (!expanded) return

    const handleClickOutside = (e: MouseEvent) => {
      // Don't collapse when locked
      if (isLocked) return

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
  }, [expanded, setExpanded, isLocked])

  // Keyboard shortcut for lock toggle (Cmd+Shift+L)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault()
        setLocked(!isLocked)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isLocked, setLocked])

  // Calculate total expanded dimensions
  const { width: totalExpandedWidth, height: totalExpandedHeight } = useMemo(
    () => calculateTotalDimensions(dimensions, config.layout, config.slots),
    [dimensions, config.layout, config.slots]
  )

  // Calculate timing functions
  const timing = useMemo(() => {
    const { animation, slots } = config
    const baseDuration = expanded
      ? animation.duration
      : animation.collapseDuration

    return {
      duration: baseDuration,
      backdropDuration: baseDuration + animation.backdropDurationOffset,
      slotDuration: (slot: SlotPosition) => {
        if (slot === 'trigger') return baseDuration
        const slotConfig = slots[slot as ExtendedSlotPosition]
        const offset = slotConfig?.animation?.durationOffset ?? 0
        return baseDuration + offset
      },
      slotDelay: (slot: SlotPosition) => {
        if (slot === 'trigger') return animation.backdropDelay
        const slotConfig = slots[slot as ExtendedSlotPosition]
        const offset = slotConfig?.animation?.delayOffset ?? 0
        return animation.backdropDelay + offset
      },
    }
  }, [config, expanded])

  // Build context value
  const contextValue = useMemo<UniversalExpandContextValue>(
    () => ({
      expanded,
      setExpanded,
      hovered,
      setHovered,
      isLocked,
      setLocked,
      config,
      dimensions,
      refs: {
        container: containerRef,
        top: topRef,
        bottom: bottomRef,
        left: leftRef,
        right: rightRef,
        trigger: triggerRef,
      },
      setSlotDimension,
      totalExpandedWidth,
      totalExpandedHeight,
      timing,
    }),
    [
      expanded,
      setExpanded,
      hovered,
      isLocked,
      setLocked,
      config,
      dimensions,
      setSlotDimension,
      totalExpandedWidth,
      totalExpandedHeight,
      timing,
    ]
  )

  return (
    <UniversalExpandProvider value={contextValue}>
      <div
        ref={containerRef}
        className={cn('relative inline-block overflow-visible', className)}
        style={{
          width: config.layout.triggerWidth,
          height: config.layout.triggerHeight,
          // Elevate z-index when expanded so this component appears above siblings
          zIndex: expanded ? 50 : 'auto',
        }}
      >
        {children}
      </div>
    </UniversalExpandProvider>
  )
}

UniversalExpandRoot.displayName = 'UniversalExpand.Root'
