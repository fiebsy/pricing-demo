/**
 * Menu - Unified Hover Indicator
 *
 * A single spring-animated background that follows the hovered menu item
 * using Motion's layoutId for automatic position animation.
 *
 * Behavior:
 * - Each item renders the indicator when hovered
 * - Motion animates between positions automatically via layoutId
 * - Mouse leave: Indicator disappears (no exit animation needed)
 * - Respects `prefers-reduced-motion`
 *
 * @module prod/base/menu/unified-hover
 */

'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import { motion, useReducedMotion } from 'motion/react'

import type { UnifiedHoverConfig, TransitionType, EaseType } from './types'

// ============================================================================
// Types
// ============================================================================

/**
 * Context value for the unified hover system.
 * Supports both spring and tween transition types.
 */
export interface UnifiedHoverContextValue {
  enabled: boolean
  hoveredId: string | null
  setHoveredId: (id: string | null) => void
  /** Current transition type */
  transitionType: TransitionType
  /** Spring physics config (used when transitionType === 'spring') */
  springConfig: { stiffness: number; damping: number; mass: number }
  /** Tween config (used when transitionType === 'tween') */
  tweenConfig: { duration: number; ease: EaseType }
  /** Unique layoutId prefix to prevent cross-panel animation */
  layoutIdPrefix: string
}

// Re-export config type for external consumers
export type { UnifiedHoverConfig }

// ============================================================================
// Default Config
// ============================================================================

export const DEFAULT_UNIFIED_HOVER_CONFIG: UnifiedHoverConfig = {
  enabled: false,
  transitionType: 'spring',
  // Spring
  stiffness: 550,
  damping: 34,
  mass: 0.8,
  // Tween
  duration: 0.2,
  ease: 'easeOut',
  // Style
  background: 'tertiary',
  borderRadius: 12,
}

// ============================================================================
// Context
// ============================================================================

const UnifiedHoverContext = createContext<UnifiedHoverContextValue | null>(null)

/**
 * Hook to access unified hover context.
 * Returns null if unified hover is not enabled or not in a provider.
 */
export function useUnifiedHover(): UnifiedHoverContextValue | null {
  return useContext(UnifiedHoverContext)
}

// ============================================================================
// Provider
// ============================================================================

interface UnifiedHoverProviderProps {
  children: ReactNode
  enabled: boolean
  config: UnifiedHoverConfig
  /** Unique ID to prevent layoutId collisions between panels */
  panelId?: string
}

/**
 * Provider that tracks which item is hovered and provides transition config.
 * Supports both spring physics and tween transitions.
 * Each panel should have its own provider with a unique panelId.
 */
export function UnifiedHoverProvider({
  children,
  enabled,
  config,
  panelId = 'default',
}: UnifiedHoverProviderProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const contextValue: UnifiedHoverContextValue = {
    enabled,
    hoveredId,
    setHoveredId,
    transitionType: config.transitionType ?? 'spring',
    springConfig: {
      stiffness: config.stiffness,
      damping: config.damping,
      mass: config.mass,
    },
    tweenConfig: {
      duration: config.duration ?? 0.2,
      ease: config.ease ?? 'easeOut',
    },
    layoutIdPrefix: `hover-${panelId}`,
  }

  return (
    <UnifiedHoverContext.Provider value={contextValue}>
      {children}
    </UnifiedHoverContext.Provider>
  )
}

// ============================================================================
// Container Component
// ============================================================================

interface UnifiedHoverContainerProps {
  children: ReactNode
  className?: string
}

/**
 * Container component that wraps menu items and handles mouse leave.
 * Clears hover state when mouse leaves the container.
 */
export function UnifiedHoverContainer({
  children,
  className,
}: UnifiedHoverContainerProps) {
  const ctx = useUnifiedHover()

  const handleMouseLeave = useCallback(() => {
    if (ctx?.enabled) {
      ctx.setHoveredId(null)
    }
  }, [ctx])

  return (
    <div className={className} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  )
}

// ============================================================================
// Indicator Component
// ============================================================================

/**
 * The hover indicator component - rendered inside each menu item.
 * Uses layoutId for automatic position animation between items.
 *
 * @example
 * ```tsx
 * // Inside menu-item.tsx
 * const isHovered = ctx?.hoveredId === item.id
 *
 * return (
 *   <div className="relative" onMouseEnter={() => ctx?.setHoveredId(item.id)}>
 *     {isHovered && <HoverIndicator />}
 *     {content}
 *   </div>
 * )
 * ```
 */
export function HoverIndicator() {
  const ctx = useUnifiedHover()
  const shouldReduceMotion = useReducedMotion()

  // Don't render if not enabled or reduced motion is preferred
  if (!ctx?.enabled || shouldReduceMotion) {
    return null
  }

  // Build transition based on type
  const transition =
    ctx.transitionType === 'spring'
      ? {
          type: 'spring' as const,
          stiffness: ctx.springConfig.stiffness,
          damping: ctx.springConfig.damping,
          mass: ctx.springConfig.mass,
        }
      : {
          type: 'tween' as const,
          duration: ctx.tweenConfig.duration,
          ease: ctx.tweenConfig.ease,
        }

  return (
    <motion.div
      layoutId={ctx.layoutIdPrefix}
      className="absolute inset-0 pointer-events-none -z-10 bg-tertiary"
      style={{
        borderRadius: 'var(--menu-item-radius, 12px)',
      }}
      transition={transition}
    />
  )
}
