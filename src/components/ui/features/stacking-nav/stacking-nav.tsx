/**
 * StackingNav - Main Component
 *
 * A multi-level navigation component with smooth stacking animations.
 * Items "peek behind" as you navigate deeper, creating a breadcrumb-like trail.
 *
 * @module features/stacking-nav
 *
 * @example
 * ```tsx
 * import { StackingNav } from '@/components/ui/features/stacking-nav'
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

import { StackContext, LevelContext } from './context'
import { StackLevel } from './components/stack-level'
import type { StackingNavProps, AnimationConfig, StyleConfig, ActivePath } from './types'
import {
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_STYLE_CONFIG,
  DEFAULT_STACK_ITEMS,
  GAP_CLASSES,
} from './config'

/**
 * StackingNav - Multi-level navigation with stacking animations.
 * 
 * Key features:
 * - Smooth peek-behind animations as you drill deeper
 * - Fixed child-to-parent promotion animations at all levels
 * - Respects reduced motion preferences
 * - Keyboard accessible
 * 
 * Use cases:
 * - Filter lists with nested options
 * - Breadcrumb-style navigation
 * - Category drilling
 * - Tag hierarchies
 */
export function StackingNav({
  items = DEFAULT_STACK_ITEMS,
  animationConfig: animationConfigProp,
  styleConfig: styleConfigProp,
  showNumbers = false,
  showDebug = false,
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

  // Navigation state
  const [activePath, setActivePath] = useState<ActivePath>([])
  
  // Track collapse state globally so all levels can use fast exit
  // Use a ref for the flag to avoid render timing issues - exits check the ref directly
  const isCollapsingRef = useRef(false)
  const previousPathLengthRef = useRef(0)
  const previousPathKeyRef = useRef('')
  const collapseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Stable key for detecting ANY path change (content or length)
  const activePathKey = activePath.join('/')

  // Eagerly detect collapse DURING render so StackLevel children see it immediately.
  // useEffect runs after paint, which is too late — animations are already configured
  // during render. Setting the ref here ensures getIsCollapsing() returns true
  // on the first render after a collapse.
  const isCollapseRender = activePath.length < previousPathLengthRef.current
  const isNewPath = activePathKey !== previousPathKeyRef.current
  if (isCollapseRender) {
    isCollapsingRef.current = true
  } else if (isNewPath && isCollapsingRef.current) {
    // Any non-collapse path change (expansion or same-level switch) clears stale flag.
    // Without this, switching L0 items after a collapse would suppress stagger
    // because the flag lingers until the timeout fires.
    isCollapsingRef.current = false
  }

  // Effect handles debug logging, timeout reset, and ref updates.
  // Depends on activePathKey (not just length) so same-level switches also trigger it.
  useEffect(() => {
    const wasCollapse = activePath.length < previousPathLengthRef.current

    if (wasCollapse) {
      // Clear any existing timeout
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current)
      }

      isCollapsingRef.current = true

      if (showDebug && typeof window !== 'undefined') {
        console.group(`⏬ [COLLAPSE DETECTED] Global`)
        console.log('Timestamp:', performance.now().toFixed(2), 'ms')
        console.log('Path shortened:', previousPathLengthRef.current, '→', activePath.length)
        console.log('All levels will use FAST exit mode')
        console.groupEnd()
      }

      // Reset collapse flag after a longer delay to ensure all AnimatePresence exits complete
      // AnimatePresence may trigger exits across multiple React render cycles
      // Scale by timeScale so slow-mo keeps the flag active long enough
      const collapseResetDelay = 500 / animationConfig.timeScale
      collapseTimeoutRef.current = setTimeout(() => {
        isCollapsingRef.current = false
        if (showDebug && typeof window !== 'undefined') {
          console.log(`✅ [COLLAPSE TIMEOUT] @ ${performance.now().toFixed(2)}ms - flag reset`)
        }
      }, collapseResetDelay)
    } else {
      // Any non-collapse path change (expansion or same-level switch)
      // clears the collapse flag and cancels the timeout
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current)
      }
      isCollapsingRef.current = false

      if (showDebug && typeof window !== 'undefined') {
        const wasExpansion = activePath.length > previousPathLengthRef.current
        if (wasExpansion) {
          console.log(`🔼 [EXPANSION] Path grew, collapse flag cleared`)
        }
      }
    }

    previousPathLengthRef.current = activePath.length
    previousPathKeyRef.current = activePathKey
  }, [activePathKey, showDebug, animationConfig.timeScale])
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current)
      }
    }
  }, [])
  
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

  // Getter function to read current collapse state (reads ref, not captured value)
  const getIsCollapsing = useCallback(() => isCollapsingRef.current, [])
  
  // Context value for sharing state
  const contextValue = useMemo(
    () => ({
      activePath,
      animationConfig,
      styleConfig,
      showNumbers,
      showDebug,
      shouldReduceMotion,
      isCollapsing: getIsCollapsing(), // Current value for initial render
      getIsCollapsing, // Function to read live value
      selectItem,
      collapseToLevel,
      reset,
    }),
    [
      activePath,
      animationConfig,
      styleConfig,
      showNumbers,
      showDebug,
      shouldReduceMotion,
      getIsCollapsing,
      selectItem,
      collapseToLevel,
      reset,
    ]
  )

  return (
    <StackContext.Provider value={contextValue}>
      <LevelContext.Provider
        value={{
          level: 0,
          parentId: null,
          isParentAnchored: false,
          anchorCount: 0,
        }}
      >
        <div
          className={cn(
            'relative flex flex-wrap items-start justify-start',
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
      </LevelContext.Provider>
    </StackContext.Provider>
  )
}
