/**
 * StackingNav V2 - Phase Coordinator Hook
 *
 * Single hook that manages ALL timing for navigation animations.
 * Replaces V1's scattered hooks (useCollapse, usePromotion, useHoverSuppression).
 *
 * @module features/stacking-nav-v2/state
 */

'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { ActivePath, AnimationConfig, StackItem, PhaseTransitionRecord } from '../types'
import {
  NavigationPhase,
  createInitialPhaseState,
  calculatePhaseDuration,
  type PhaseState,
  type PhaseDurationConfig,
} from './navigation-phase'
import { logPhase } from '../utils/debug-log'

// =============================================================================
// TYPES
// =============================================================================

export interface PhaseCoordinatorConfig {
  /** Current active path */
  activePath: ActivePath
  /** Animation configuration */
  animationConfig: AnimationConfig
  /** Items at root level (for child count) */
  items: StackItem[]
  /** Debug mode enabled */
  showDebug: boolean
}

export interface PhaseCoordinatorReturn {
  /** Current navigation phase */
  phase: NavigationPhase
  /** Timestamp when current phase started */
  phaseStartTime: number
  /** Whether any animation is in progress */
  isAnimating: boolean
  /** Get progress through current phase (0-1) */
  getPhaseProgress: () => number

  // Derived states for rendering
  /** Whether collapse is in progress */
  isCollapsing: boolean
  /** ID of item being promoted */
  promotingId: string | null
  /** Check if hover is suppressed at a level */
  isHoverSuppressed: (level: number) => boolean

  // Debug
  /** Transition history for debug visualization */
  transitionHistory: PhaseTransitionRecord[]
}

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Find item by ID in nested structure.
 */
function findItemById(items: StackItem[], id: string): StackItem | undefined {
  for (const item of items) {
    if (item.id === id) return item
    if (item.children) {
      const found = findItemById(item.children, id)
      if (found) return found
    }
  }
  return undefined
}

/**
 * Get item at path level.
 */
function getItemAtLevel(
  items: StackItem[],
  activePath: ActivePath,
  level: number
): StackItem | undefined {
  if (level === 0) {
    return items.find((i) => i.id === activePath[0])
  }

  let current = items.find((i) => i.id === activePath[0])
  for (let i = 1; i <= level; i++) {
    if (!current?.children) return undefined
    current = current.children.find((c) => c.id === activePath[i])
  }
  return current
}

/**
 * Count children that will be shown at active level.
 */
function getActiveChildCount(items: StackItem[], activePath: ActivePath): number {
  if (activePath.length === 0) return 0

  const activeItem = getItemAtLevel(items, activePath, activePath.length - 1)
  return activeItem?.children?.length ?? 0
}

// =============================================================================
// HOOK IMPLEMENTATION
// =============================================================================

export function usePhaseCoordinator(config: PhaseCoordinatorConfig): PhaseCoordinatorReturn {
  const { activePath, animationConfig, items, showDebug } = config

  // State
  const [phaseState, setPhaseState] = useState<PhaseState>(createInitialPhaseState)
  const [transitionHistory, setTransitionHistory] = useState<PhaseTransitionRecord[]>([])

  // Refs for comparison without causing re-renders
  const previousPathRef = useRef<ActivePath>([])
  const previousPathLengthRef = useRef(0)
  const phaseTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hoverSuppressionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isHoverSuppressionActive, setIsHoverSuppressionActive] = useState(false)

  // Config for duration calculation
  const durationConfig: PhaseDurationConfig = {
    duration: animationConfig.duration,
    childEntryDelay: animationConfig.childEntryDelay,
    stagger: animationConfig.stagger,
    collapseLayoutDuration: animationConfig.collapseLayoutDuration,
    promotionDuration: animationConfig.promotionDuration,
    timeScale: animationConfig.timeScale,
  }

  /**
   * Transition to a new phase with proper timing.
   */
  const transitionTo = useCallback(
    (
      newPhase: NavigationPhase,
      options: {
        promotingId?: string | null
        promotingLevel?: number | null
        trigger?: string
        childCount?: number
      } = {}
    ) => {
      const now = typeof performance !== 'undefined' ? performance.now() : Date.now()
      const childCount = options.childCount ?? getActiveChildCount(items, activePath)
      const duration = calculatePhaseDuration(newPhase, durationConfig, childCount)

      // Clear existing timeout
      if (phaseTimeoutRef.current) {
        clearTimeout(phaseTimeoutRef.current)
        phaseTimeoutRef.current = null
      }

      setPhaseState((prev) => {
        // Record transition for debug
        if (prev.current !== newPhase) {
          const record: PhaseTransitionRecord = {
            from: prev.current,
            to: newPhase,
            timestamp: now,
            duration,
            trigger: options.trigger ?? 'unknown',
          }
          if (showDebug) {
            setTransitionHistory((h) => [...h.slice(-4), record]) // Keep last 5
          }
          // Log to debug log
          logPhase(newPhase, {
            from: prev.current,
            duration,
            trigger: options.trigger,
            promotingId: options.promotingId,
            childCount,
          })
        }

        return {
          current: newPhase,
          previous: prev.current,
          startTime: now,
          expectedDuration: duration,
          promotingId: options.promotingId ?? null,
          promotingLevel: options.promotingLevel ?? null,
        }
      })

      // Schedule next phase transition if needed
      if (duration > 0) {
        phaseTimeoutRef.current = setTimeout(() => {
          // Determine next phase based on current
          switch (newPhase) {
            case NavigationPhase.EXPANDING:
              transitionTo(NavigationPhase.EXPANDED, { trigger: 'expanding-complete' })
              break
            case NavigationPhase.COLLAPSING:
              transitionTo(NavigationPhase.IDLE, { trigger: 'collapse-complete' })
              break
            case NavigationPhase.PROMOTING:
              transitionTo(NavigationPhase.EXPANDED, { trigger: 'promotion-complete' })
              break
          }
        }, duration)
      }
    },
    [activePath, durationConfig, items, showDebug]
  )

  /**
   * Detect navigation changes and trigger appropriate phases.
   */
  useEffect(() => {
    const prevPath = previousPathRef.current
    const prevLength = previousPathLengthRef.current
    const currentLength = activePath.length

    // Skip initial mount
    if (prevPath.length === 0 && activePath.length === 0) {
      previousPathRef.current = [...activePath]
      previousPathLengthRef.current = currentLength
      return
    }

    // Detect change type
    const isCollapse = currentLength < prevLength
    const isExpand = currentLength > prevLength
    const isSameLevel = currentLength === prevLength && currentLength > 0

    if (isCollapse) {
      // Path shortened - collapsing
      transitionTo(NavigationPhase.COLLAPSING, {
        trigger: `collapse: ${prevLength} → ${currentLength}`,
      })
    } else if (isExpand) {
      // Path lengthened - check if promotion (child becoming parent)
      const newItemId = activePath[currentLength - 1]
      const newItem = findItemById(items, newItemId)
      const hasChildren = Boolean(newItem?.children?.length)
      const isPromotion = currentLength > 1 && hasChildren

      if (isPromotion) {
        // Child with children clicked - promoting
        console.log(`[PHASE] Starting PROMOTING phase`, {
          itemId: newItemId,
          level: currentLength - 1,
          childCount: newItem?.children?.length ?? 0,
          promotionDuration: animationConfig.promotionDuration,
          timeScale: animationConfig.timeScale,
          calculatedDuration: (animationConfig.promotionDuration * 1000) / animationConfig.timeScale,
        })
        transitionTo(NavigationPhase.PROMOTING, {
          promotingId: newItemId,
          promotingLevel: currentLength - 1,
          trigger: `promote: ${newItemId}`,
          childCount: newItem?.children?.length ?? 0,
        })
      } else {
        // Simple expansion
        transitionTo(NavigationPhase.EXPANDING, {
          trigger: `expand: L${currentLength - 1}`,
          childCount: newItem?.children?.length ?? 0,
        })
      }

      // Start hover suppression for new children (levels > 0)
      if (currentLength > 1) {
        setIsHoverSuppressionActive(true)
        if (hoverSuppressionTimeoutRef.current) {
          clearTimeout(hoverSuppressionTimeoutRef.current)
        }
        const suppressionDuration =
          (animationConfig.hoverDelay * 1000) / animationConfig.timeScale
        hoverSuppressionTimeoutRef.current = setTimeout(() => {
          setIsHoverSuppressionActive(false)
        }, suppressionDuration)
      }
    } else if (isSameLevel) {
      // Same level selection change
      const newItemId = activePath[currentLength - 1]
      const prevItemId = prevPath[currentLength - 1]

      if (newItemId !== prevItemId) {
        const newItem = findItemById(items, newItemId)
        const hasChildren = Boolean(newItem?.children?.length)

        if (hasChildren && currentLength > 1) {
          // Different item at same level with children - promotion
          transitionTo(NavigationPhase.PROMOTING, {
            promotingId: newItemId,
            promotingLevel: currentLength - 1,
            trigger: `same-level-promote: ${newItemId}`,
            childCount: newItem?.children?.length ?? 0,
          })
        } else if (hasChildren) {
          // Root level with children - expanding
          transitionTo(NavigationPhase.EXPANDING, {
            trigger: `same-level-expand: ${newItemId}`,
            childCount: newItem?.children?.length ?? 0,
          })
        }
      }
    }

    // Update refs
    previousPathRef.current = [...activePath]
    previousPathLengthRef.current = currentLength
  }, [activePath, animationConfig.hoverDelay, animationConfig.timeScale, items, transitionTo])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (phaseTimeoutRef.current) {
        clearTimeout(phaseTimeoutRef.current)
      }
      if (hoverSuppressionTimeoutRef.current) {
        clearTimeout(hoverSuppressionTimeoutRef.current)
      }
    }
  }, [])

  /**
   * Get progress through current phase (0-1).
   */
  const getPhaseProgress = useCallback((): number => {
    if (phaseState.expectedDuration === 0) return 1
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now()
    const elapsed = now - phaseState.startTime
    return Math.min(1, elapsed / phaseState.expectedDuration)
  }, [phaseState.startTime, phaseState.expectedDuration])

  /**
   * Check if hover is suppressed at a given level.
   */
  const isHoverSuppressed = useCallback(
    (level: number): boolean => {
      if (level === 0) return false
      if (animationConfig.hoverDelay <= 0) return false
      return isHoverSuppressionActive
    },
    [animationConfig.hoverDelay, isHoverSuppressionActive]
  )

  // Derived states
  const isCollapsing = phaseState.current === NavigationPhase.COLLAPSING
  const isAnimating =
    phaseState.current !== NavigationPhase.IDLE &&
    phaseState.current !== NavigationPhase.EXPANDED

  return {
    phase: phaseState.current,
    phaseStartTime: phaseState.startTime,
    isAnimating,
    getPhaseProgress,
    isCollapsing,
    promotingId: phaseState.promotingId,
    isHoverSuppressed,
    transitionHistory,
  }
}
