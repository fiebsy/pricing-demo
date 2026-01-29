/**
 * ButtonAnimation V3 - Main Component
 *
 * Clean, production-ready multi-level navigation with fixed animations.
 * Simplified to match V2 performance with promotion fix.
 *
 * @module prod/base/button-animation-v3
 */

'use client'

import { useMemo, useState, useCallback } from 'react'
import { useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

import { StackContext, LevelContext } from './context'
import { StackLevel } from './components/StackLevel'
import { DebugOverlay } from './components/DebugOverlay'
import { AnchorPositionDebugger } from './debug/AnchorPositionDebugger'
import type { ButtonAnimationV3Props, AnimationConfig, StyleConfig, ActivePath } from './types'
import {
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_STYLE_CONFIG,
  DEFAULT_STACK_ITEMS,
  GAP_CLASSES,
} from './config'

/**
 * ButtonAnimation V3 - Main Component
 * 
 * Key improvements:
 * - Fixed child-to-parent animation at all levels
 * - Simplified architecture for better performance
 * - Matches V2 visual behavior exactly
 * 
 * @example
 * ```tsx
 * <ButtonAnimationV3
 *   items={navigationItems}
 *   showNumbers
 * />
 * ```
 */
export function ButtonAnimationV3({
  items = DEFAULT_STACK_ITEMS,
  animationConfig: animationConfigProp,
  styleConfig: styleConfigProp,
  showNumbers = false,
  showDebug = false,
  className,
  onReset,
}: ButtonAnimationV3Props) {
  // Merge configurations
  const animationConfig: AnimationConfig = useMemo(
    () => ({ ...DEFAULT_ANIMATION_CONFIG, ...animationConfigProp }),
    [animationConfigProp]
  )

  const styleConfig: StyleConfig = useMemo(
    () => ({ ...DEFAULT_STYLE_CONFIG, ...styleConfigProp }),
    [styleConfigProp]
  )

  // Accessibility
  const shouldReduceMotion = useReducedMotion() ?? false

  // Simple state management (matching V2)
  const [activePath, setActivePath] = useState<ActivePath>([])

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

  const collapseToLevel = useCallback((level: number) => {
    setActivePath((prev) => {
      if (level < 0) return []
      return prev.slice(0, level)
    })
  }, [])

  const reset = useCallback(() => {
    setActivePath([])
    onReset?.()
  }, [onReset])

  // Context value
  const contextValue = useMemo(
    () => ({
      activePath,
      animationConfig,
      styleConfig,
      showNumbers,
      showDebug,
      shouldReduceMotion,
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
        >
          <StackLevel items={items} />
          
          {/* Debug Overlay - Simple state display */}
          {showDebug && (
            <DebugOverlay
              activePath={activePath}
              promotingItems={new Set()}
            />
          )}
        </div>
        
        {/* Advanced Position Debugger */}
        {showDebug && (
          <AnchorPositionDebugger
            enabled={showDebug}
            activePath={activePath}
            styleConfig={styleConfig}
          />
        )}
      </LevelContext.Provider>
    </StackContext.Provider>
  )
}