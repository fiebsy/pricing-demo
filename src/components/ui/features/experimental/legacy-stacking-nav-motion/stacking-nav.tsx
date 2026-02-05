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
import { useCollapse } from './hooks/use-collapse'
import { configureDebug } from './utils/debug'
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

  // Configure centralized debug logger
  configureDebug({ enabled: showDebug })

  // Navigation state
  const [activePath, setActivePath] = useState<ActivePath>([])

  // Collapse detection via extracted hook
  const { getIsCollapsing } = useCollapse(activePath, animationConfig, showDebug)

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

  // Context value for sharing state
  const contextValue = useMemo(
    () => ({
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
