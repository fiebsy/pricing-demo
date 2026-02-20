/**
 * Menu - Flip Hover Indicator
 *
 * A spring-animated background that follows the hovered menu item
 * using Motion's layoutId for automatic FLIP position animation.
 *
 * Behavior:
 * - Each item renders the indicator when hovered
 * - Motion animates between positions automatically via layoutId
 * - Mouse leave: Indicator disappears (no exit animation)
 * - Respects `prefers-reduced-motion`
 *
 * Note: For exit animation support, use unified-hover.tsx instead.
 *
 * @module prod/base/menu/flip-hover
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

import type { UnifiedHoverConfig } from './types'

// ============================================================================
// Types
// ============================================================================

/**
 * Context value for the flip hover system.
 */
export interface FlipHoverContextValue {
  enabled: boolean
  hoveredId: string | null
  setHoveredId: (id: string | null) => void
  springConfig: { stiffness: number; damping: number; mass: number }
  /** Unique layoutId prefix to prevent cross-panel animation */
  layoutIdPrefix: string
}

// Re-export config type for external consumers
export type { UnifiedHoverConfig as FlipHoverConfig }

// ============================================================================
// Default Config
// ============================================================================

export const DEFAULT_FLIP_HOVER_CONFIG: UnifiedHoverConfig = {
  enabled: false,
  stiffness: 550,
  damping: 34,
  mass: 0.8,
  background: 'tertiary',
  borderRadius: 12,
}

// ============================================================================
// Context
// ============================================================================

const FlipHoverContext = createContext<FlipHoverContextValue | null>(null)

/**
 * Hook to access flip hover context.
 * Returns null if flip hover is not enabled or not in a provider.
 */
export function useFlipHover(): FlipHoverContextValue | null {
  return useContext(FlipHoverContext)
}

// ============================================================================
// Provider
// ============================================================================

interface FlipHoverProviderProps {
  children: ReactNode
  enabled: boolean
  config: UnifiedHoverConfig
  /** Unique ID to prevent layoutId collisions between panels */
  panelId?: string
}

/**
 * Provider that tracks which item is hovered and provides spring config.
 * Each panel should have its own provider with a unique panelId.
 */
export function FlipHoverProvider({
  children,
  enabled,
  config,
  panelId = 'default',
}: FlipHoverProviderProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const contextValue: FlipHoverContextValue = {
    enabled,
    hoveredId,
    setHoveredId,
    springConfig: {
      stiffness: config.stiffness,
      damping: config.damping,
      mass: config.mass,
    },
    layoutIdPrefix: `flip-hover-${panelId}`,
  }

  return (
    <FlipHoverContext.Provider value={contextValue}>
      {children}
    </FlipHoverContext.Provider>
  )
}

// ============================================================================
// Container Component
// ============================================================================

interface FlipHoverContainerProps {
  children: ReactNode
  className?: string
}

/**
 * Container component that wraps menu items and handles mouse leave.
 * Clears hover state when mouse leaves the container.
 */
export function FlipHoverContainer({
  children,
  className,
}: FlipHoverContainerProps) {
  const ctx = useFlipHover()

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
 * Uses layoutId for automatic FLIP position animation between items.
 *
 * @example
 * ```tsx
 * // Inside menu-item.tsx
 * const isHovered = ctx?.hoveredId === item.id
 *
 * return (
 *   <div className="relative" onMouseEnter={() => ctx?.setHoveredId(item.id)}>
 *     {isHovered && <FlipHoverIndicator />}
 *     {content}
 *   </div>
 * )
 * ```
 */
export function FlipHoverIndicator() {
  const ctx = useFlipHover()
  const shouldReduceMotion = useReducedMotion()

  // Don't render if not enabled or reduced motion is preferred
  if (!ctx?.enabled || shouldReduceMotion) {
    return null
  }

  return (
    <motion.div
      layoutId={ctx.layoutIdPrefix}
      className="absolute inset-0 pointer-events-none -z-10 bg-tertiary"
      style={{
        borderRadius: 'var(--menu-item-radius, 12px)',
      }}
      transition={{
        type: 'spring',
        stiffness: ctx.springConfig.stiffness,
        damping: ctx.springConfig.damping,
        mass: ctx.springConfig.mass,
      }}
    />
  )
}
