/**
 * ButtonAnimation V2 - Main Component
 *
 * Multi-level expandable navigation with scalable stacking.
 * Uses the peek-behind pattern for O(1) performance regardless of depth.
 *
 * Key improvements over V1:
 * - Supports infinite nesting depth
 * - Same performance characteristics at any depth
 * - Recursive data structure for flexibility
 *
 * @module prod/base/button-animation-v2
 */

'use client'

import * as React from 'react'
import { useMemo } from 'react'
import { useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

import type { ButtonAnimationV2Props, AnimationConfig, StyleConfig } from './types'
import {
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_STYLE_CONFIG,
  DEFAULT_STACK_ITEMS,
  GAP_CLASSES,
} from './config'
import { StackContext, LevelContext } from './context'
import { useStackState } from './hooks'
import { StackLevel } from './components'

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * ButtonAnimation V2 - Multi-level expandable navigation.
 *
 * Features:
 * - Infinite nesting depth with constant performance
 * - Peek-behind stacking pattern
 * - Staggered child entry animations
 * - Full reduced motion support
 *
 * @example
 * ```tsx
 * // Basic usage with default items
 * <ButtonAnimationV2 />
 *
 * // Custom items with deep nesting
 * <ButtonAnimationV2
 *   items={[
 *     { id: 'all', label: 'All' },
 *     {
 *       id: 'parent',
 *       label: 'Parent',
 *       children: [
 *         {
 *           id: 'child',
 *           label: 'Child',
 *           children: [
 *             { id: 'grandchild', label: 'Grandchild' },
 *           ],
 *         },
 *       ],
 *     },
 *   ]}
 * />
 *
 * // Custom animation config
 * <ButtonAnimationV2
 *   animationConfig={{ stiffness: 600, damping: 30 }}
 *   styleConfig={{ peekOffset: -12 }}
 *   showNumbers
 * />
 * ```
 */
export function ButtonAnimationV2({
  items = DEFAULT_STACK_ITEMS,
  animationConfig: animationConfigProp,
  styleConfig: styleConfigProp,
  showNumbers = false,
  className,
  onReset,
}: ButtonAnimationV2Props) {
  // ---------------------------------------------------------------------------
  // CONFIGURATION
  // ---------------------------------------------------------------------------

  const animationConfig: AnimationConfig = useMemo(
    () => ({ ...DEFAULT_ANIMATION_CONFIG, ...animationConfigProp }),
    [animationConfigProp]
  )

  const styleConfig: StyleConfig = useMemo(
    () => ({ ...DEFAULT_STYLE_CONFIG, ...styleConfigProp }),
    [styleConfigProp]
  )

  // ---------------------------------------------------------------------------
  // ACCESSIBILITY
  // ---------------------------------------------------------------------------

  const shouldReduceMotion = useReducedMotion() ?? false

  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------

  const {
    activePath,
    phase,
    selectItem,
    collapseToLevel,
    reset,
  } = useStackState({
    animationConfig,
    onReset,
  })

  // ---------------------------------------------------------------------------
  // CONTEXT VALUE
  // ---------------------------------------------------------------------------

  const contextValue = useMemo(
    () => ({
      activePath,
      phase,
      animationConfig,
      styleConfig,
      showNumbers,
      shouldReduceMotion,
      selectItem,
      collapseToLevel,
      reset,
    }),
    [
      activePath,
      phase,
      animationConfig,
      styleConfig,
      showNumbers,
      shouldReduceMotion,
      selectItem,
      collapseToLevel,
      reset,
    ]
  )

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <StackContext.Provider value={contextValue}>
      <LevelContext.Provider
        value={{
          level: 0,
          parentId: null,
          isParentAnchored: false,
        }}
      >
        <div
          className={cn(
            'relative flex flex-wrap items-start justify-start',
            GAP_CLASSES[styleConfig.gap],
            className
          )}
        >
          <StackLevel items={items} />
        </div>
      </LevelContext.Provider>
    </StackContext.Provider>
  )
}
