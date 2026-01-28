/**
 * ButtonAnimation V2 - Enhanced Main Component
 *
 * Enhanced version using the formal state machine and improved animation system.
 * Drop-in replacement for ButtonAnimationV2 with better state management.
 *
 * @module prod/base/button-animation-v2
 */

'use client'

import * as React from 'react'
import { useMemo, useEffect } from 'react'
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
import { EnhancedStackLevel } from './components/EnhancedStackLevel'
import { AnimationPhaseManager } from './core/animation-phases'

// ============================================================================
// ENHANCED MAIN COMPONENT
// ============================================================================

/**
 * Enhanced ButtonAnimation V2 with improved state management.
 * 
 * Improvements:
 * - Explicit state machine for predictable transitions
 * - Fixed child-to-parent promotion animations
 * - Better animation phase tracking
 * - Debug capabilities
 *
 * @example
 * ```tsx
 * // Basic usage - drop-in replacement
 * <EnhancedButtonAnimationV2 />
 *
 * // With custom configuration
 * <EnhancedButtonAnimationV2
 *   items={customItems}
 *   animationConfig={{ stiffness: 600, damping: 30 }}
 *   styleConfig={{ peekOffset: -12 }}
 *   showNumbers
 * />
 * ```
 */
export function EnhancedButtonAnimationV2({
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
  // PHASE MANAGER SETUP
  // ---------------------------------------------------------------------------
  
  useEffect(() => {
    const phaseManager = AnimationPhaseManager.getInstance()
    
    // Enable debug mode in development
    if (process.env.NODE_ENV === 'development') {
      phaseManager.setDebugMode(true)
    }
    
    // Reset on unmount
    return () => {
      phaseManager.reset()
    }
  }, [])
  
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
          data-enhanced="true"
        >
          <EnhancedStackLevel 
            items={items}
            parentId={null}
          />
        </div>
      </LevelContext.Provider>
    </StackContext.Provider>
  )
}