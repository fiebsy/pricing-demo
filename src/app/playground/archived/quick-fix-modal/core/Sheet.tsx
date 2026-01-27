/**
 * Sheet - Individual sheet with depth transforms
 *
 * Renders a single sheet in the stack with visual depth effects.
 * Supports push/pop animations and stacked appearance.
 *
 * @module playground/quick-fix-modal/core
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { SheetDefinition, StackConfig, AnimationConfig, SheetContentProps } from '../config/types'
import { EASING_EXPO_OUT } from '../config/defaults'

export interface SheetProps {
  /** Sheet definition */
  sheet: SheetDefinition
  /** Position in stack (0 = current, 1 = previous, etc.) */
  position: number
  /** Whether this is the active (current) sheet */
  isActive: boolean
  /** Current animation direction */
  direction: 'push' | 'pop' | null
  /** Whether the stack is animating */
  isAnimating: boolean
  /** Stack configuration */
  stackConfig: StackConfig
  /** Animation configuration */
  animationConfig: AnimationConfig
  /** Props to pass to sheet content */
  contentProps: Omit<SheetContentProps, 'config'>
  /** Config for sheet content */
  config: SheetContentProps['config']
  /** Additional className */
  className?: string
}

/**
 * Calculate depth transform for stacked sheets.
 *
 * @param position - Position in stack (0 = current)
 * @param config - Stack configuration
 * @returns Transform CSS string
 */
function getDepthTransform(position: number, config: StackConfig): string {
  if (position === 0) {
    return 'scale(1) translateY(0px)'
  }

  // Each stacked sheet is scaled down and offset
  const scale = 1 - position * (1 - config.depthScale)
  const offset = position * config.depthOffset

  return `scale(${scale}) translateY(${offset}px)`
}

/**
 * Calculate push animation transform.
 */
function getPushEnterTransform(config: StackConfig): string {
  switch (config.pushDirection) {
    case 'up':
      return 'translateY(100%)'
    case 'down':
      return 'translateY(-100%)'
    case 'left':
      return 'translateX(100%)'
    case 'right':
      return 'translateX(-100%)'
    default:
      return 'translateY(100%)'
  }
}

/**
 * Calculate pop exit transform.
 */
function getPopExitTransform(config: StackConfig): string {
  switch (config.popDirection) {
    case 'up':
      return 'translateY(-100%)'
    case 'down':
      return 'translateY(100%)'
    case 'left':
      return 'translateX(-100%)'
    case 'right':
      return 'translateX(100%)'
    default:
      return 'translateY(100%)'
  }
}

/**
 * Sheet Component
 *
 * Renders a single sheet with depth transforms and push/pop animations.
 * Uses GPU-accelerated transforms for smooth performance.
 */
export function Sheet({
  sheet,
  position,
  isActive,
  direction,
  isAnimating,
  stackConfig,
  animationConfig,
  contentProps,
  config,
  className,
}: SheetProps) {
  // Don't render sheets beyond max visible
  if (position >= stackConfig.maxVisibleSheets) {
    return null
  }

  // Calculate transform based on animation state
  const getTransform = () => {
    // During push animation, new sheet enters
    if (isAnimating && direction === 'push' && isActive && position === 0) {
      // Start position for entering sheet
      return getPushEnterTransform(stackConfig)
    }

    // During pop animation, current sheet exits
    if (isAnimating && direction === 'pop' && position === -1) {
      return getPopExitTransform(stackConfig)
    }

    // Normal depth transform
    return getDepthTransform(position, stackConfig)
  }

  // Calculate opacity for depth effect
  const opacity = position === 0 ? 1 : stackConfig.depthOpacity

  // Calculate z-index (higher position = lower z-index)
  const zIndex = 10 - position

  // Animation duration based on direction
  const duration = direction === 'push' ? animationConfig.pushDuration : animationConfig.popDuration

  const SheetContent = sheet.component

  // Active sheet uses relative positioning to determine natural height
  // Stacked sheets use absolute positioning
  const positionClass = isActive
    ? 'relative w-full'
    : 'absolute inset-0'

  return (
    <div
      className={cn(
        positionClass,
        'transform-gpu',
        'motion-reduce:transition-none',
        // Solid background to cover previous sheets
        'bg-primary',
        className
      )}
      style={{
        transform: getTransform(),
        opacity,
        zIndex,
        transition: isAnimating
          ? `transform ${duration}ms ${animationConfig.easing}, opacity ${duration}ms ${animationConfig.easing}`
          : 'none',
        pointerEvents: isActive ? 'auto' : 'none',
      }}
      data-sheet-id={sheet.id}
      data-sheet-position={position}
      data-sheet-active={isActive}
    >
      <SheetContent
        {...contentProps}
        {...sheet.componentProps}
        config={config}
      />
    </div>
  )
}

// =============================================================================
// ANIMATED SHEET WRAPPER
// =============================================================================

export interface AnimatedSheetProps {
  /** Sheet definition */
  sheet: SheetDefinition
  /** Whether sheet is entering */
  isEntering: boolean
  /** Whether sheet is exiting */
  isExiting: boolean
  /** Stack configuration */
  stackConfig: StackConfig
  /** Animation configuration */
  animationConfig: AnimationConfig
  /** Callback when enter animation completes */
  onEnterComplete?: () => void
  /** Callback when exit animation completes */
  onExitComplete?: () => void
  /** Props to pass to sheet content */
  contentProps: Omit<SheetContentProps, 'config'>
  /** Config for sheet content */
  config: SheetContentProps['config']
  /** Children override (for wrapping content) */
  children?: React.ReactNode
  /** Additional className */
  className?: string
}

/**
 * AnimatedSheet - Sheet with explicit enter/exit states
 *
 * Use when you need more control over animation lifecycle.
 */
export function AnimatedSheet({
  sheet,
  isEntering,
  isExiting,
  stackConfig,
  animationConfig,
  onEnterComplete,
  onExitComplete,
  contentProps,
  config,
  children,
  className,
}: AnimatedSheetProps) {
  const [hasEntered, setHasEntered] = React.useState(!isEntering)

  // Handle animation completion
  React.useEffect(() => {
    if (isEntering) {
      // Trigger enter animation
      const timer = setTimeout(() => {
        setHasEntered(true)
        onEnterComplete?.()
      }, animationConfig.pushDuration)
      return () => clearTimeout(timer)
    }
  }, [isEntering, animationConfig.pushDuration, onEnterComplete])

  React.useEffect(() => {
    if (isExiting) {
      // Trigger exit animation
      const timer = setTimeout(() => {
        onExitComplete?.()
      }, animationConfig.popDuration)
      return () => clearTimeout(timer)
    }
  }, [isExiting, animationConfig.popDuration, onExitComplete])

  // Calculate transform
  const getTransform = () => {
    if (isEntering && !hasEntered) {
      return getPushEnterTransform(stackConfig)
    }
    if (isExiting) {
      return getPopExitTransform(stackConfig)
    }
    return 'scale(1) translateY(0px)'
  }

  const duration = isExiting ? animationConfig.popDuration : animationConfig.pushDuration
  const SheetContent = sheet.component

  return (
    <div
      className={cn(
        'absolute inset-0 transform-gpu',
        'motion-reduce:transition-none',
        className
      )}
      style={{
        transform: getTransform(),
        opacity: isExiting ? 0 : 1,
        transition: `transform ${duration}ms ${animationConfig.easing}, opacity ${duration}ms ${animationConfig.easing}`,
      }}
      data-sheet-id={sheet.id}
      data-entering={isEntering && !hasEntered}
      data-exiting={isExiting}
    >
      {children || (
        <SheetContent
          {...contentProps}
          {...sheet.componentProps}
          config={config}
        />
      )}
    </div>
  )
}
