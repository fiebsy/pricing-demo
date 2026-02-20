/**
 * Menu - Unified Hover Indicator
 *
 * A single spring-animated background that glides smoothly between menu items,
 * replacing per-item CSS hover effects when enabled.
 *
 * Behavior:
 * - First hover: Indicator instantly appears at that item (no animation from 0,0)
 * - Subsequent hovers: Indicator smoothly glides to the new item using spring physics
 * - Mouse leave: Indicator fades out with spring animation
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
  useRef,
  useEffect,
  type ReactNode,
} from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

import type { UnifiedHoverConfig, HoverImplementation } from './types'

// ============================================================================
// Types
// ============================================================================

interface HoveredItemRect {
  top: number
  left: number
  width: number
  height: number
}

export interface UnifiedHoverContextValue {
  enabled: boolean
  /** Current implementation type */
  implementation: HoverImplementation
  /** For spring: the currently hovered item ID */
  hoveredItemId: string | null
  /** For spring: the hovered item's bounding rect */
  hoveredItemRect: HoveredItemRect | null
  /** For spring: set hovered item with position */
  setHoveredItem: (id: string | null, rect: HoveredItemRect | null) => void
  /** For flip: just the hovered ID (no rect needed) */
  hoveredId: string | null
  /** For flip: set hovered ID */
  setHoveredId: (id: string | null) => void
  /** Unique layoutId prefix for flip mode */
  layoutIdPrefix: string
  config: UnifiedHoverConfig
  isActive: boolean
}

// Re-export config type for external consumers
export type { UnifiedHoverConfig }

// ============================================================================
// Default Config
// ============================================================================

export const DEFAULT_UNIFIED_HOVER_CONFIG: UnifiedHoverConfig = {
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
  /** Whether this panel is currently active/visible. Clears hover state when false. */
  isActive?: boolean
  /** Panel ID for identification (optional, used for debugging) */
  panelId?: string
}

/**
 * Provider that tracks which item is hovered and provides spring config.
 * Single indicator approach - always mounted, animates position and opacity.
 */
export function UnifiedHoverProvider({
  children,
  enabled,
  config,
  isActive = true,
  panelId = 'default',
}: UnifiedHoverProviderProps) {
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null)
  const [hoveredItemRect, setHoveredItemRect] = useState<HoveredItemRect | null>(null)

  const implementation = config.implementation ?? 'spring'

  // Clear hover state when panel becomes inactive
  useEffect(() => {
    if (!isActive) {
      setHoveredItemId(null)
      setHoveredItemRect(null)
    }
  }, [isActive])

  // For spring mode: set both ID and rect
  const setHoveredItem = useCallback(
    (id: string | null, rect: HoveredItemRect | null) => {
      setHoveredItemId(id)
      setHoveredItemRect(rect)
    },
    []
  )

  // For flip mode: just set ID
  const setHoveredId = useCallback((id: string | null) => {
    setHoveredItemId(id)
  }, [])

  const contextValue: UnifiedHoverContextValue = {
    enabled,
    implementation,
    hoveredItemId,
    hoveredItemRect,
    setHoveredItem,
    hoveredId: hoveredItemId,
    setHoveredId,
    layoutIdPrefix: `hover-${panelId}`,
    config,
    isActive,
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
 * For spring mode: Renders the unified hover indicator at container level.
 * For flip mode: No container indicator (per-item indicators used instead).
 */
export function UnifiedHoverContainer({
  children,
  className,
}: UnifiedHoverContainerProps) {
  const ctx = useUnifiedHover()
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseLeave = useCallback(() => {
    if (ctx?.enabled) {
      ctx.setHoveredItem(null, null)
    }
  }, [ctx])

  const isSpringMode = ctx?.implementation === 'spring'

  return (
    <div ref={containerRef} className={className} onMouseLeave={handleMouseLeave}>
      {/* Spring mode: single indicator at container level */}
      {isSpringMode && <UnifiedHoverIndicator containerRef={containerRef} />}
      {children}
    </div>
  )
}

// ============================================================================
// Indicator Component
// ============================================================================

interface UnifiedHoverIndicatorProps {
  containerRef: React.RefObject<HTMLDivElement | null>
}

/**
 * The hover indicator - a single element that animates between hovered items.
 * Uses spring physics for smooth position transitions and opacity fade on exit.
 */
export function UnifiedHoverIndicator({ containerRef }: UnifiedHoverIndicatorProps) {
  const ctx = useUnifiedHover()
  const shouldReduceMotion = useReducedMotion()
  const hasHadInitialHover = useRef(false)

  // Spring-animated position and size
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const width = useMotionValue(0)
  const height = useMotionValue(0)
  const opacity = useMotionValue(0)

  // Create springs with config from context
  const springConfig = ctx
    ? {
        stiffness: ctx.config.stiffness,
        damping: ctx.config.damping,
        mass: ctx.config.mass,
      }
    : { stiffness: 550, damping: 34, mass: 0.8 }

  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)
  const springWidth = useSpring(width, springConfig)
  const springHeight = useSpring(height, springConfig)
  const springOpacity = useSpring(opacity, { stiffness: 300, damping: 30 })

  // Update position when hovered item changes
  useEffect(() => {
    if (!ctx || !containerRef.current) return

    if (ctx.hoveredItemRect) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const containerStyles = getComputedStyle(containerRef.current)
      // Absolute positioning with left:0 is at the padding edge (after border)
      // getBoundingClientRect returns border-box, so we need to subtract border
      const borderLeft = parseFloat(containerStyles.borderLeftWidth) || 0
      const borderTop = parseFloat(containerStyles.borderTopWidth) || 0

      // Calculate position relative to container's padding edge
      const relativeTop = ctx.hoveredItemRect.top - containerRect.top - borderTop
      const relativeLeft = ctx.hoveredItemRect.left - containerRect.left - borderLeft

      // On first hover, jump to position instantly (no animation from 0,0)
      if (!hasHadInitialHover.current) {
        hasHadInitialHover.current = true
        // Jump the motion values directly to avoid animating from origin
        springX.jump(relativeLeft)
        springY.jump(relativeTop)
        springWidth.jump(ctx.hoveredItemRect.width)
        springHeight.jump(ctx.hoveredItemRect.height)
      } else {
        x.set(relativeLeft)
        y.set(relativeTop)
        width.set(ctx.hoveredItemRect.width)
        height.set(ctx.hoveredItemRect.height)
      }

      opacity.set(1)
    } else {
      // Mouse left the menu - fade out
      opacity.set(0)
    }
  }, [ctx, containerRef, x, y, width, height, opacity, springX, springY, springWidth, springHeight])

  // Reset initial hover flag when menu closes (context becomes null or disabled)
  useEffect(() => {
    if (!ctx?.enabled) {
      hasHadInitialHover.current = false
    }
  }, [ctx?.enabled])

  // Reset motion values instantly when panel becomes inactive
  // Uses jump() to bypass spring animation - prevents stale indicator during panel transitions
  useEffect(() => {
    if (!ctx?.isActive) {
      springX.jump(0)
      springY.jump(0)
      springWidth.jump(0)
      springHeight.jump(0)
      springOpacity.jump(0)
      hasHadInitialHover.current = false
    }
  }, [ctx?.isActive, springX, springY, springWidth, springHeight, springOpacity])

  // Don't render if not enabled or reduced motion is preferred
  if (!ctx?.enabled || shouldReduceMotion) {
    return null
  }

  return (
    <motion.div
      className="absolute pointer-events-none z-0"
      style={{
        top: 0,
        left: 0,
        x: springX,
        y: springY,
        width: springWidth,
        height: springHeight,
        opacity: springOpacity,
        backgroundColor: `var(--color-bg-${ctx.config.background})`,
        borderRadius: 'var(--menu-item-radius, 12px)',
      }}
    />
  )
}

// ============================================================================
// Flip Mode Indicator (per-item, uses layoutId)
// ============================================================================

/**
 * Per-item hover indicator for flip mode.
 * Uses layoutId for automatic FLIP position animation between items.
 * Render this inside each menu item when that item is hovered.
 */
export function FlipHoverIndicator() {
  const ctx = useUnifiedHover()
  const shouldReduceMotion = useReducedMotion()

  // Don't render if not in flip mode or reduced motion
  if (!ctx?.enabled || ctx.implementation !== 'flip' || shouldReduceMotion) {
    return null
  }

  return (
    <motion.div
      layoutId={ctx.layoutIdPrefix}
      className="absolute inset-0 pointer-events-none -z-10"
      style={{
        backgroundColor: `var(--color-bg-${ctx.config.background})`,
        borderRadius: 'var(--menu-item-radius, 12px)',
      }}
      transition={{
        type: 'spring',
        stiffness: ctx.config.stiffness,
        damping: ctx.config.damping,
        mass: ctx.config.mass,
      }}
    />
  )
}

// Alias for backward compatibility
export { FlipHoverIndicator as HoverIndicator }
