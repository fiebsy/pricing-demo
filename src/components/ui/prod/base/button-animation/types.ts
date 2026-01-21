/**
 * ButtonAnimation - Type Definitions
 *
 * Comprehensive types for the expandable navigation animation component.
 * Organized by category for maintainability and audit clarity.
 *
 * @module prod/base/button-animation
 */

import type { ReactNode } from 'react'
import type { ButtonVariant, ButtonSize, ButtonRoundness } from '@/components/ui/prod/base/button'

// Re-export button types for convenience
export type { ButtonVariant, ButtonSize, ButtonRoundness }

// ============================================================================
// ANIMATION PRIMITIVES
// ============================================================================

/**
 * Supported easing types for animations.
 * - spring: Physics-based, natural motion (recommended for most cases)
 * - easeOut: Deceleration curve for entries
 * - easeInOut: Smooth start and end
 * - linear: Constant velocity (rarely needed)
 */
export type EaseType = 'easeOut' | 'easeIn' | 'easeInOut' | 'linear' | 'spring'

/**
 * Direction from which children enter the viewport.
 * - down: From bottom (default, most natural for dropdowns)
 * - up: From top
 * - left/right: Horizontal entry
 * - none: Fade only, no positional animation
 */
export type EntryDirection = 'right' | 'left' | 'up' | 'down' | 'none'

/**
 * Order in which children animate during staggered entry.
 * - sequential: First to last (1→2→3)
 * - reverse: Last to first (3→2→1)
 * - center-out: Middle items first, edges last
 */
export type EntryOrder = 'sequential' | 'reverse' | 'center-out'

/**
 * Controls parent-child animation sequencing.
 * - sync: Parent and children animate together
 * - beforeChildren: Parent completes before children start
 * - afterChildren: Children complete before parent starts
 */
export type OrchestrationWhen = 'beforeChildren' | 'afterChildren' | 'sync'

/**
 * Direction for stagger delay application.
 * - forward: Standard order
 * - reverse: Inverted order
 */
export type StaggerDirection = 'forward' | 'reverse'

// ============================================================================
// NAVIGATION DATA
// ============================================================================

/**
 * Navigation item structure for the expandable menu.
 * Supports nested hierarchy with optional link destinations.
 */
export interface NavItem {
  /** Unique identifier for this item */
  id: string
  /** Display label */
  label: string
  /** Optional link destination (renders as anchor) */
  href?: string
  /** Nested child items (only one level deep supported) */
  children?: NavItem[]
}

// ============================================================================
// ANIMATION CONFIGURATION
// ============================================================================

/**
 * Parent button animation configuration.
 * Controls how parent chips animate during expand/collapse.
 */
export interface ParentAnimationConfig {
  /** Duration in seconds (used when ease is not 'spring') */
  duration: number
  /** Easing function or spring */
  ease: EaseType
  /** Spring stiffness (higher = snappier response) */
  stiffness: number
  /** Spring damping (higher = less oscillation) */
  damping: number
  /** Exit animation duration in seconds */
  exitDuration: number
  /** Parent-child animation sequencing */
  when: OrchestrationWhen
}

/**
 * Child button animation configuration.
 * Controls cascading entry animations for nested items.
 */
export interface ChildAnimationConfig {
  /** Delay before first child appears (delayChildren) in seconds */
  delay: number
  /** Delay between each child (staggerChildren) in seconds */
  stagger: number
  /** Animation duration in seconds */
  duration: number
  /** Easing function or spring */
  ease: EaseType
  /** Spring stiffness */
  stiffness: number
  /** Spring damping */
  damping: number
  /** Direction from which children enter */
  entryDirection: EntryDirection
  /** Distance children travel during entry (pixels) */
  entryDistance: number
  /** Order in which children appear */
  entryOrder: EntryOrder
  /** Direction of stagger delay */
  staggerDirection: StaggerDirection
  /** Exit animation duration in seconds */
  exitDuration: number
}

// ============================================================================
// STYLE CONFIGURATION
// ============================================================================

/**
 * Gap size presets for chip spacing.
 */
export type GapSize = 'sm' | 'md' | 'lg'

/**
 * Visual style configuration for button variants and layout.
 */
export interface StyleConfig {
  /** Variant for parent chips in collapsed state */
  parentVariant: ButtonVariant
  /** Variant for the expanded parent chip */
  parentExpandedVariant: ButtonVariant
  /** Variant for child chips (default state) */
  childVariant: ButtonVariant
  /** Variant for selected/active child */
  childSelectedVariant: ButtonVariant
  /** Variant for the "All" anchor button */
  allButtonVariant: ButtonVariant
  /** Negative offset (px) for "All" button peek effect */
  allButtonOffset: number
  /** Button size preset */
  size: ButtonSize
  /** Button roundness preset */
  roundness: ButtonRoundness
  /** Gap between chips */
  gap: GapSize
  /** Render chips as anchor elements */
  asLink: boolean
}

// ============================================================================
// COMPONENT STATE
// ============================================================================

/**
 * Animation phase state machine.
 * - idle: No parent expanded, showing all parent chips
 * - settling: Parent expanding, siblings exiting
 * - entering-children: Children cascading in
 */
export type AnimationPhase = 'idle' | 'settling' | 'entering-children'

// ============================================================================
// CONTEXT
// ============================================================================

/**
 * Context value provided to child components.
 */
export interface ButtonAnimationContextValue {
  /** Currently expanded parent ID (null if collapsed) */
  expandedId: string | null
  /** Currently selected child ID (null if none) */
  selectedChildId: string | null
  /** Current animation phase */
  phase: AnimationPhase
  /** Merged style configuration */
  styleConfig: StyleConfig
  /** Merged parent animation config */
  parentConfig: ParentAnimationConfig
  /** Merged child animation config */
  childConfig: ChildAnimationConfig
  /** Whether reduced motion is preferred */
  shouldReduceMotion: boolean
  /** Handler to select/expand a parent */
  onSelectParent: (id: string) => void
  /** Handler to collapse back to idle */
  onCollapse: () => void
  /** Handler to toggle child selection */
  onSelectChild: (id: string) => void
  /** Handler to reset all state */
  onReset: () => void
  /** Get parent index for numbering */
  getParentIndex: (id: string) => number
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

/**
 * Main ButtonAnimation component props.
 */
export interface ButtonAnimationProps {
  /** Navigation items to display */
  items?: NavItem[]
  /** Parent animation configuration overrides */
  parentConfig?: Partial<ParentAnimationConfig>
  /** Child animation configuration overrides */
  childConfig?: Partial<ChildAnimationConfig>
  /** Style configuration overrides */
  styleConfig?: Partial<StyleConfig>
  /** Show index numbers on chips (e.g., "1 Design", "1a Figma") */
  showNumbers?: boolean
  /** Show inline reset button when state is modified */
  showInlineReset?: boolean
  /** Callback when reset is triggered */
  onReset?: () => void
  /** Additional CSS classes */
  className?: string
}

/**
 * Chip subcomponent props.
 */
export interface ChipProps {
  /** Display label */
  label: string
  /** Button variant style */
  variant: ButtonVariant
  /** Button size */
  size: ButtonSize
  /** Button roundness */
  roundness: ButtonRoundness
  /** Optional number prefix (e.g., "1", "2a") */
  number?: string
  /** Render as anchor element */
  asLink?: boolean
  /** Link destination */
  href?: string
  /** Show remove (X) button */
  showRemove?: boolean
  /** Click handler for chip selection */
  onSelect: () => void
  /** Click handler for remove button */
  onRemove?: () => void
}

/**
 * Animated container wrapper props.
 */
export interface AnimatedContainerProps {
  /** Unique key for AnimatePresence */
  layoutId: string
  /** Container children */
  children: ReactNode
  /** Additional CSS classes */
  className?: string
  /** Initial animation state */
  initial?: Record<string, unknown> | false
  /** Animate to state */
  animate?: Record<string, unknown>
  /** Exit animation state */
  exit?: Record<string, unknown>
  /** Animation transition config */
  transition?: Record<string, unknown>
  /** Layout animation type */
  layout?: 'position' | boolean
}
