/**
 * StackingNav - Main Component
 *
 * A multi-level navigation component with smooth stacking animations.
 * Uses centralized phase state machine for timing coordination.
 *
 * Performance optimizations:
 * - Split contexts (Phase, Config, Navigation) to prevent unnecessary re-renders
 * - Memoized ItemRenderer and StackLevel components
 *
 * @module features/stacking-nav
 *
 * @example
 * ```tsx
 * import { StackingNav } from '@/components/ui/features/experimental/stacking-nav'
 *
 * const filterItems = [
 *   { id: 'all', label: 'All' },
 *   { id: 'active', label: 'Active', children: [
 *     { id: 'pending', label: 'Pending' },
 *     { id: 'processing', label: 'Processing' },
 *   ]},
 *   { id: 'completed', label: 'Completed' },
 * ]
 *
 * <StackingNav
 *   items={filterItems}
 *   onSelectionChange={(path) => console.log('Selection:', path)}
 * />
 * ```
 */

'use client'

import { useMemo, useState, useCallback, useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

import {
  PhaseContext,
  ConfigContext,
  NavigationContext,
  LevelContext,
} from './context'
import { StackLevel } from './components/stack-level'
import { PhaseIndicator } from './components/phase-indicator'
import { usePhaseCoordinator } from './state/use-phase-coordinator'
import { configureDebug } from './utils/debug'
import type { StackingNavProps, AnimationConfig, StyleConfig, ActivePath } from './types'
import {
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_STYLE_CONFIG,
  DEFAULT_STACK_ITEMS,
  GAP_CLASSES,
} from './config'

/**
 * StackingNav - Multi-level navigation with centralized phase state.
 *
 * Key features:
 * - Single phase coordinator for centralized timing management
 * - Better "All" button active state handling
 * - Phase indicator for debugging
 * - Split contexts for performance optimization
 */
export function StackingNav({
  items = DEFAULT_STACK_ITEMS,
  animationConfig: animationConfigProp,
  styleConfig: styleConfigProp,
  showNumbers = false,
  showDebug = false,
  showPhaseIndicator = false,
  className,
  onReset,
  onSelectionChange,
}: StackingNavProps) {
  // Merge configurations with defaults
  const animationConfig: AnimationConfig = useMemo(
    () => ({ ...DEFAULT_ANIMATION_CONFIG, ...animationConfigProp }),
    [animationConfigProp]
  )

  const styleConfig: StyleConfig = useMemo(
    () => ({ ...DEFAULT_STYLE_CONFIG, ...styleConfigProp }),
    [styleConfigProp]
  )

  // Accessibility - respect reduced motion preference
  const shouldReduceMotion = useReducedMotion() ?? false

  // Configure centralized debug logger
  configureDebug({ enabled: showDebug })

  // Navigation state
  const [activePath, setActivePath] = useState<ActivePath>([])

  // Phase coordinator - single hook managing all timing
  const {
    phase,
    phaseStartTime,
    isAnimating,
    isCollapsing,
    isCollapsingSynchronous,
    isExpandingSynchronous,
    demotingIdSynchronous,
    promotingId,
    demotingId,
    isItemPromoting,
    isHoverSuppressed,
    transitionHistory,
  } = usePhaseCoordinator({
    activePath,
    animationConfig,
    items,
    showLevelAll: styleConfig.showLevelAll,
    showDebug,
  })

  // Track if this is the initial mount to avoid calling onSelectionChange on mount
  const isInitialMount = useRef(true)

  // Notify parent of selection changes via useEffect (not during render)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    onSelectionChange?.(activePath)
  }, [activePath, onSelectionChange])

  // Select an item at a specific level
  const selectItem = useCallback(
    (level: number, id: string, hasChildren: boolean) => {
      setActivePath((prev) => {
        // If clicking the same item, collapse it
        if (prev[level] === id) {
          return prev.slice(0, level)
        }
        // Set new path
        return [...prev.slice(0, level), id]
      })
    },
    []
  )

  // Collapse navigation to a specific level
  const collapseToLevel = useCallback((level: number) => {
    setActivePath((prev) => {
      return level < 0 ? [] : prev.slice(0, level)
    })
  }, [])

  // Reset to initial state
  const reset = useCallback(() => {
    setActivePath([])
    onReset?.()
  }, [onReset])

  // --- Split Context Values ---

  // PhaseContext: Updates frequently during animations
  const phaseContextValue = useMemo(
    () => ({
      phase,
      phaseStartTime,
      isAnimating,
      isCollapsing,
      isCollapsingSynchronous,
      isExpandingSynchronous,
      demotingIdSynchronous,
      promotingId,
      demotingId,
      isItemPromoting,
      isHoverSuppressed,
    }),
    [
      phase,
      phaseStartTime,
      isAnimating,
      isCollapsing,
      isCollapsingSynchronous,
      isExpandingSynchronous,
      demotingIdSynchronous,
      promotingId,
      demotingId,
      isItemPromoting,
      isHoverSuppressed,
    ]
  )

  // ConfigContext: Stable, rarely changes
  const configContextValue = useMemo(
    () => ({
      animationConfig,
      styleConfig,
      showNumbers,
      showDebug,
      showPhaseIndicator,
      shouldReduceMotion,
    }),
    [
      animationConfig,
      styleConfig,
      showNumbers,
      showDebug,
      showPhaseIndicator,
      shouldReduceMotion,
    ]
  )

  // NavigationContext: Path and actions
  const navigationContextValue = useMemo(
    () => ({
      activePath,
      selectItem,
      collapseToLevel,
      reset,
    }),
    [activePath, selectItem, collapseToLevel, reset]
  )

  // LevelContext: Initial level (0)
  const initialLevelValue = useMemo(
    () => ({
      level: 0,
      parentId: null,
      isParentAnchored: false,
      anchorCount: 0,
      isParentPromoting: false,
      parentAnchoredOffset: 0,
    }),
    []
  )

  return (
    <ConfigContext.Provider value={configContextValue}>
      <NavigationContext.Provider value={navigationContextValue}>
        <PhaseContext.Provider value={phaseContextValue}>
          <LevelContext.Provider value={initialLevelValue}>
            <div
              className={cn(
                'relative flex flex-nowrap items-start justify-start overflow-visible',
                GAP_CLASSES[styleConfig.gap],
                className
              )}
              style={{
                minHeight: '100px', // Ensure container has height for absolute positioning
              }}
              role="navigation"
              aria-label="Stacking navigation"
            >
              <StackLevel items={items} />
            </div>

            {/* Phase Indicator (debug) */}
            {showPhaseIndicator && (
              <PhaseIndicator
                phase={phase}
                phaseStartTime={phaseStartTime}
                transitionHistory={transitionHistory}
                promotingId={promotingId}
                demotingId={demotingId}
              />
            )}
          </LevelContext.Provider>
        </PhaseContext.Provider>
      </NavigationContext.Provider>
    </ConfigContext.Provider>
  )
}
