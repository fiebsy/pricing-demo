/**
 * ButtonAnimation V2 - Enhanced Version
 *
 * Simplified enhanced version that fixes the child-to-parent animation issue.
 * Uses minimal changes to the original component.
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
import { EnhancedStackLevel } from './components/stack-level-enhanced'

// ============================================================================
// ENHANCED MAIN COMPONENT
// ============================================================================

/**
 * Enhanced ButtonAnimation V2 - Fixes child-to-parent animation.
 * 
 * Key improvement: Children at 2nd+ levels now animate correctly when becoming parents.
 */
export function ButtonAnimationV2Enhanced({
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
          <EnhancedStackLevel items={items} />
        </div>
      </LevelContext.Provider>
    </StackContext.Provider>
  )
}