/**
 * Biaxial Expand - Root Component
 *
 * The main container that orchestrates the composable expand system.
 * Provides context to all child slot components and manages:
 * - Expanded/collapsed state
 * - Dimension tracking for all slots
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
import { BiaxialExpandProvider } from './context'
import { DEFAULT_BIAXIAL_EXPAND_CONFIG, EASING_EXPO_OUT } from './constants'
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
  isLocked: controlledLocked,
  onLockedChange,
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

  // Slot dimension state - initialize with config values
  const initialTopHeight = config.topSlot.enabled
    ? (config.layout.maxTopHeight ?? config.topSlot.height ?? 48)
    : 0

  const initialLeftWidth = config.leftSlot.enabled
    ? (config.layout.maxLeftWidth ?? 200)
    : 0

  const initialRightWidth = config.rightSlot.enabled
    ? (config.layout.maxRightWidth ?? 200)
    : 0

  // Calculate initial bottom height respecting heightMode
  const bottomHeightMode = config.bottomSlot.heightMode ?? 'dynamic'
  const initialBottomHeight = config.bottomSlot.enabled
    ? (bottomHeightMode === 'fixed'
        ? (config.bottomSlot.height ?? config.layout.maxBottomHeight)
        : config.layout.maxBottomHeight)
    : 0

  // Calculate initial left/right heights if they drive panel height
  const initialLeftHeight = config.leftSlot.enabled && config.leftSlot.drivesPanelHeight
    ? (config.leftSlot.height ?? config.leftSlot.maxHeight ?? 200)
    : 0

  const initialRightHeight = config.rightSlot.enabled && config.rightSlot.drivesPanelHeight
    ? (config.rightSlot.height ?? config.rightSlot.maxHeight ?? 200)
    : 0

  const [dimensions, setDimensions] = useState<SlotDimensions>({
    topHeight: initialTopHeight,
    triggerHeight: config.layout.triggerHeight,
    bottomHeight: initialBottomHeight,
    panelWidth: config.layout.panelWidth,
    triggerWidth: config.layout.triggerWidth,
    leftWidth: initialLeftWidth,
    rightWidth: initialRightWidth,
    leftHeight: initialLeftHeight,
    rightHeight: initialRightHeight,
    leftAlignmentPadding: 0,
    rightAlignmentPadding: 0,
  })

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

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

  // Slot width setter (for horizontal slots)
  const setSlotWidth = useCallback(
    (slot: 'left' | 'right', width: number) => {
      setDimensions((prev) => {
        const key = `${slot}Width` as keyof SlotDimensions
        if (prev[key] === width) return prev
        return { ...prev, [key]: width }
      })
    },
    []
  )

  // Slot alignment padding setter (for horizontal slot vertical alignment)
  const setSlotAlignmentPadding = useCallback(
    (slot: 'left' | 'right', padding: number) => {
      setDimensions((prev) => {
        const key = `${slot}AlignmentPadding` as keyof SlotDimensions
        if (prev[key] === padding) return prev
        return { ...prev, [key]: padding }
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

  // Calculate total expanded height (for backdrop)
  // Uses Math.max to allow any slot with drivesPanelHeight to contribute
  const totalExpandedHeight = useMemo(() => {
    const { triggerHeight, bottomGap, topGap } = config.layout
    const contributions: number[] = [triggerHeight]

    // Bottom slot contribution (default driver)
    if (config.bottomSlot.enabled && config.bottomSlot.drivesPanelHeight !== false) {
      contributions.push(triggerHeight + bottomGap + dimensions.bottomHeight)
    }

    // Top slot contribution (when explicitly driving)
    if (config.topSlot.enabled && config.topSlot.drivesPanelHeight) {
      contributions.push(triggerHeight + (topGap ?? 0) + dimensions.topHeight)
    }

    // Left slot contribution (when explicitly driving)
    if (config.leftSlot.enabled && config.leftSlot.drivesPanelHeight) {
      contributions.push(dimensions.leftHeight)
    }

    // Right slot contribution (when explicitly driving)
    if (config.rightSlot.enabled && config.rightSlot.drivesPanelHeight) {
      contributions.push(dimensions.rightHeight)
    }

    return Math.max(...contributions)
  }, [config, dimensions])

  // Calculate total expanded width (for horizontal push mode)
  const totalExpandedWidth = useMemo(() => {
    const { leftGap = 0, rightGap = 0, panelWidth } = config.layout
    const leftSlotInset = config.leftSlot.inset ?? 4
    const rightSlotInset = config.rightSlot.inset ?? 4

    const leftContribution = config.leftSlot.enabled
      ? dimensions.leftWidth + leftSlotInset + leftGap
      : 0
    const rightContribution = config.rightSlot.enabled
      ? dimensions.rightWidth + rightSlotInset + rightGap
      : 0

    return leftContribution + panelWidth + rightContribution
  }, [config.layout, config.leftSlot, config.rightSlot, dimensions.leftWidth, dimensions.rightWidth])

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

  // Build context value
  const contextValue = useMemo<BiaxialExpandContextValue>(
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
        trigger: triggerRef,
        bottom: bottomRef,
        left: leftRef,
        right: rightRef,
      },
      setSlotHeight,
      setSlotWidth,
      setSlotAlignmentPadding,
      totalExpandedHeight,
      totalExpandedWidth,
      timing,
    }),
    [
      expanded,
      setExpanded,
      hovered,
      isLocked,
      config,
      dimensions,
      setSlotHeight,
      setSlotWidth,
      setSlotAlignmentPadding,
      totalExpandedHeight,
      totalExpandedWidth,
      timing,
    ]
  )

  // Get position mode and timing for push mode
  const positionMode = config.layout.positionMode ?? 'overlay'
  const isPushMode = positionMode === 'push'

  // Calculate container height for push mode
  const containerHeight = isPushMode && expanded
    ? totalExpandedHeight
    : config.layout.triggerHeight

  return (
    <BiaxialExpandProvider value={contextValue}>
      <div
        ref={containerRef}
        className={cn('relative inline-block overflow-visible', className)}
        style={{
          width: config.layout.triggerWidth,
          height: containerHeight,
          // Elevate z-index when expanded so this menu appears above siblings
          zIndex: expanded ? 50 : 'auto',
          // Animate height in push mode
          transition: isPushMode
            ? `height ${timing.duration}ms ${EASING_EXPO_OUT}`
            : undefined,
        }}
      >
        {children}
      </div>
    </BiaxialExpandProvider>
  )
}

BiaxialExpandRoot.displayName = 'BiaxialExpand.Root'
