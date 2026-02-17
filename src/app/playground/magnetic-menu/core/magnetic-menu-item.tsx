/**
 * Magnetic Menu Item Component
 *
 * A menu item with magnetic pull effects that can apply to:
 * - Text only: Label/text moves toward cursor
 * - Background only: Hover background moves toward cursor
 * - Both: Both text and background move together
 *
 * Supports two hover indicator modes:
 * - Per-item: Each item has its own hover background (CSS transition)
 * - Unified: A single indicator smoothly animates between items (spring physics)
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/menu
 */

'use client'

import {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
  type ReactNode,
  type RefObject,
} from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import type {
  PullMode,
  PullDirection,
  PullAnimationConfig,
  HoverIndicatorMode,
  UnifiedHoverConfig,
  ShadowIntensity,
} from '../config/types'

// ============================================================================
// Unified Hover Indicator Context
// ============================================================================

interface HoveredItemRect {
  top: number
  left: number
  width: number
  height: number
}

interface UnifiedHoverContextValue {
  mode: HoverIndicatorMode
  hoveredItemId: string | null
  hoveredItemRect: HoveredItemRect | null
  setHoveredItem: (id: string | null, rect: HoveredItemRect | null) => void
  unifiedConfig: UnifiedHoverConfig
  hoverBackground: string
  hoverBackgroundOpacity: number
  borderRadius: number
}

const UnifiedHoverContext = createContext<UnifiedHoverContextValue | null>(null)

function useUnifiedHover() {
  return useContext(UnifiedHoverContext)
}

// ============================================================================
// Custom Magnetic Pull Hook (standalone, no Cursor dependency)
// ============================================================================

interface MagneticPullOptions {
  /** Pull strength multiplier (0-1) */
  strength?: number
  /** Which axis to allow pull on */
  direction?: PullDirection
  /** Clamp pull to stay within parent container */
  clampToParent?: boolean
  /** Padding from parent edge when clamping (px) */
  clampPadding?: number
  /** Spring animation settings */
  animation?: Partial<PullAnimationConfig>
}

/**
 * A standalone magnetic pull hook that tracks mouse position within an element
 * and returns spring-animated x/y offsets.
 *
 * Unlike useMagneticPull from motion-plus, this doesn't require the Cursor
 * component to be present - it uses direct mouse event listeners.
 */
function useStandaloneMagneticPull(
  ref: RefObject<HTMLElement | null>,
  options: MagneticPullOptions = {}
) {
  const {
    strength = 0.1,
    direction = 'both',
    clampToParent = false,
    clampPadding = 4,
    animation = {},
  } = options

  const {
    stiffness = 150,
    damping = 15,
    mass = 1,
    delay = 0,
  } = animation

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring-animated values for smooth movement
  const springConfig = { stiffness, damping, mass }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  useEffect(() => {
    const element = ref.current
    if (!element || strength === 0) return

    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const updatePosition = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate raw offset from center
      let offsetX = (e.clientX - centerX) * strength
      let offsetY = (e.clientY - centerY) * strength

      // Apply direction constraint
      if (direction === 'horizontal') {
        offsetY = 0
      } else if (direction === 'vertical') {
        offsetX = 0
      }

      // Clamp to parent container bounds
      if (clampToParent && element.parentElement) {
        const parentRect = element.parentElement.getBoundingClientRect()

        // Calculate max offset before element edge hits parent edge
        const maxOffsetLeft = rect.left - parentRect.left - clampPadding
        const maxOffsetRight = parentRect.right - rect.right - clampPadding
        const maxOffsetTop = rect.top - parentRect.top - clampPadding
        const maxOffsetBottom = parentRect.bottom - rect.bottom - clampPadding

        // Clamp offsets
        offsetX = Math.max(-maxOffsetLeft, Math.min(maxOffsetRight, offsetX))
        offsetY = Math.max(-maxOffsetTop, Math.min(maxOffsetBottom, offsetY))
      }

      x.set(offsetX)
      y.set(offsetY)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (delay > 0) {
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => updatePosition(e), delay)
      } else {
        updatePosition(e)
      }
    }

    const handleMouseLeave = () => {
      if (timeoutId) clearTimeout(timeoutId)
      x.set(0)
      y.set(0)
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref, strength, direction, clampToParent, clampPadding, delay, x, y])

  return { x: springX, y: springY }
}

// ============================================================================
// Unified Hover Indicator Component
// ============================================================================

interface UnifiedHoverIndicatorProps {
  containerRef: RefObject<HTMLDivElement | null>
}

function UnifiedHoverIndicator({ containerRef }: UnifiedHoverIndicatorProps) {
  const ctx = useUnifiedHover()
  const shouldReduceMotion = useReducedMotion()
  const hasHadInitialHover = useRef(false)
  const lastRect = useRef<HoveredItemRect | null>(null)

  // Spring-animated position and size
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const width = useMotionValue(0)
  const height = useMotionValue(0)
  const opacity = useMotionValue(0)

  // Create springs with config from context
  const springConfig = ctx
    ? {
        stiffness: ctx.unifiedConfig.stiffness,
        damping: ctx.unifiedConfig.damping,
        mass: ctx.unifiedConfig.mass,
      }
    : { stiffness: 400, damping: 30, mass: 1 }

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
      const borderLeft = parseFloat(containerStyles.borderLeftWidth)
      const borderTop = parseFloat(containerStyles.borderTopWidth)

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

      lastRect.current = ctx.hoveredItemRect
      opacity.set(ctx.hoverBackgroundOpacity)
    } else {
      opacity.set(0)
    }
  }, [ctx, containerRef, x, y, width, height, opacity, springX, springY, springWidth, springHeight])

  if (!ctx || ctx.mode !== 'unified' || shouldReduceMotion) {
    return null
  }

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: 0,
        left: 0,
        x: springX,
        y: springY,
        width: springWidth,
        height: springHeight,
        opacity: springOpacity,
        backgroundColor: `var(--color-bg-${ctx.hoverBackground})`,
        borderRadius: ctx.borderRadius,
      }}
    />
  )
}

// ============================================================================
// Types
// ============================================================================

export interface MagneticMenuItemProps {
  /** Unique identifier for this item */
  id: string
  /** Display label */
  label: string
  /** Optional icon */
  icon?: ReactNode
  /** Pull mode: none, text, background, or both */
  pullMode: PullMode
  /** Pull strength (0.005 - 0.3, i.e. 0.5% - 30%) */
  pullStrength: number
  /** Pull direction constraint */
  pullDirection?: PullDirection
  /** Clamp pull to stay within parent container */
  clampToParent?: boolean
  /** Animation spring settings */
  animation?: Partial<PullAnimationConfig>
  /** Hover background color class (e.g., 'quaternary') - used for per-item mode */
  hoverBackground: string
  /** Hover background opacity (0.5 - 1.0) - used for per-item mode */
  hoverBackgroundOpacity: number
  /** Border radius in pixels - used for per-item mode */
  borderRadius: number
  /** Click handler */
  onClick?: () => void
}

// ============================================================================
// Component
// ============================================================================

export function MagneticMenuItem({
  id,
  label,
  icon,
  pullMode,
  pullStrength,
  pullDirection = 'both',
  clampToParent = false,
  animation,
  hoverBackground,
  hoverBackgroundOpacity,
  borderRadius,
  onClick,
}: MagneticMenuItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const unifiedHover = useUnifiedHover()

  // Use standalone hook with options
  const pull = useStandaloneMagneticPull(ref, {
    strength: pullMode !== 'none' ? pullStrength : 0,
    direction: pullDirection,
    clampToParent,
    animation,
  })

  // Determine which elements get pull based on mode
  const bgPull = pullMode === 'background' || pullMode === 'both' ? pull : undefined
  const textPull = pullMode === 'text' || pullMode === 'both' ? pull : undefined

  // Check if unified mode is active
  const isUnifiedMode = unifiedHover?.mode === 'unified'

  // Handle mouse enter for unified hover
  // Note: We don't clear hover on leave - the container handles that
  // This allows smooth transitions between items even with gaps
  const handleMouseEnter = useCallback(() => {
    if (isUnifiedMode && ref.current && unifiedHover) {
      const rect = ref.current.getBoundingClientRect()
      unifiedHover.setHoveredItem(id, {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      })
    }
  }, [id, isUnifiedMode, unifiedHover])

  return (
    <motion.div
      ref={ref}
      className="group relative"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background layer - only render for per-item mode */}
      {!isUnifiedMode && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={bgPull}
        >
          <div
            className={`w-full h-full bg-${hoverBackground}
                       opacity-0 group-hover:opacity-[var(--hover-opacity)] transition-opacity duration-150`}
            style={{
              borderRadius,
              '--hover-opacity': hoverBackgroundOpacity,
            } as React.CSSProperties}
          />
        </motion.div>
      )}

      {/* Content layer - pulls independently when mode is 'text' */}
      <motion.div
        className="relative flex items-center gap-3 px-3 py-2.5"
        style={textPull}
      >
        {icon && (
          <span className="flex-shrink-0 text-secondary group-hover:text-primary transition-colors">
            {icon}
          </span>
        )}
        <span className="text-sm font-medium text-primary">
          {label}
        </span>
      </motion.div>
    </motion.div>
  )
}

// ============================================================================
// Menu Container
// ============================================================================

export interface MagneticMenuProps {
  children: ReactNode
  className?: string
  /** Hover indicator mode */
  hoverIndicatorMode?: HoverIndicatorMode
  /** Unified hover indicator config */
  unifiedHoverConfig?: UnifiedHoverConfig
  /** Hover background color (semantic token) */
  hoverBackground?: string
  /** Hover background opacity */
  hoverBackgroundOpacity?: number
  /** Border radius for hover indicator */
  borderRadius?: number
  /** Shadow intensity */
  shadowIntensity?: ShadowIntensity
}

const SHADOW_CLASSES: Record<ShadowIntensity, string> = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
}

export function MagneticMenu({
  children,
  className = '',
  hoverIndicatorMode = 'per-item',
  unifiedHoverConfig = { stiffness: 400, damping: 30, mass: 1 },
  hoverBackground = 'quaternary',
  hoverBackgroundOpacity = 1,
  borderRadius = 8,
  shadowIntensity = 'lg',
}: MagneticMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null)
  const [hoveredItemRect, setHoveredItemRect] = useState<HoveredItemRect | null>(null)

  const setHoveredItem = useCallback(
    (id: string | null, rect: HoveredItemRect | null) => {
      setHoveredItemId(id)
      setHoveredItemRect(rect)
    },
    []
  )

  const contextValue: UnifiedHoverContextValue = {
    mode: hoverIndicatorMode,
    hoveredItemId,
    hoveredItemRect,
    setHoveredItem,
    unifiedConfig: unifiedHoverConfig,
    hoverBackground,
    hoverBackgroundOpacity,
    borderRadius,
  }

  const shadowClass = SHADOW_CLASSES[shadowIntensity]

  return (
    <UnifiedHoverContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={`relative flex flex-col p-1.5 bg-secondary rounded-xl border border-primary ${shadowClass} ${className}`}
        style={{ minWidth: 220 }}
        onMouseLeave={() => setHoveredItem(null, null)}
      >
        {/* Unified hover indicator - rendered at container level */}
        <UnifiedHoverIndicator containerRef={containerRef} />
        {children}
      </div>
    </UnifiedHoverContext.Provider>
  )
}

// ============================================================================
// Menu Separator
// ============================================================================

export function MagneticMenuSeparator() {
  return <div className="my-1 h-px bg-tertiary mx-2 pointer-events-none" />
}
