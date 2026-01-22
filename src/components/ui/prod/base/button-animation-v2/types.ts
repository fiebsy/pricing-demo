/**
 * ButtonAnimation V2 - Type Definitions
 *
 * Extended types supporting infinite nesting depth with scalable stacking.
 * Uses recursive data structures for arbitrary depth.
 *
 * @module prod/base/button-animation-v2
 */

import type { ReactNode } from 'react'
import type {
  ButtonVariant,
  ButtonSize,
  ButtonRoundness,
} from '@/components/ui/prod/base/button'

// Re-export button types
export type { ButtonVariant, ButtonSize, ButtonRoundness }

// ============================================================================
// ANIMATION PRIMITIVES
// ============================================================================

export type EaseType = 'easeOut' | 'easeIn' | 'easeInOut' | 'linear' | 'spring'
export type EntryDirection = 'right' | 'left' | 'up' | 'down' | 'none'
export type EntryOrder = 'sequential' | 'reverse' | 'center-out'
export type StaggerDirection = 'forward' | 'reverse'

// ============================================================================
// NAVIGATION DATA - RECURSIVE STRUCTURE
// ============================================================================

/**
 * Navigation item with recursive children support.
 * Allows infinite nesting depth.
 */
export interface StackItem {
  /** Unique identifier */
  id: string
  /** Display label */
  label: string
  /** Optional link destination */
  href?: string
  /** Nested children (recursive) */
  children?: StackItem[]
}

// ============================================================================
// ANIMATION CONFIGURATION
// ============================================================================

export interface AnimationConfig {
  /** Easing function for active button */
  ease: EaseType
  /** Duration for non-spring easing (seconds) */
  duration: number
  /** Spring stiffness for active/expanded button */
  stiffness: number
  /** Spring damping for active/expanded button */
  damping: number
  /** Easing function for child items */
  childEase: EaseType
  /** Duration for child non-spring easing (seconds) */
  childDuration: number
  /** Spring stiffness for child items */
  childStiffness: number
  /** Spring damping for child items */
  childDamping: number
  /** Exit animation duration (seconds) */
  exitDuration: number
  /** Base delay before children start entering (seconds) */
  childEntryDelay: number
  /** Stagger delay between siblings (seconds) */
  stagger: number
  /** Entry direction */
  entryDirection: EntryDirection
  /** Entry distance (pixels) */
  entryDistance: number
  /** Entry order */
  entryOrder: EntryOrder
  /** Stagger direction */
  staggerDirection: StaggerDirection
  /** Duration of terminal (active child) pulse animation (seconds) */
  terminalDuration: number
  /** Scale factor for terminal pulse (e.g., 1.04 = 4% larger) */
  terminalScale: number
}

// ============================================================================
// STYLE CONFIGURATION
// ============================================================================

export type GapSize = 'sm' | 'md' | 'lg'

/**
 * Controls which element receives the peek offset.
 *
 * - 'anchored': Incumbent/parent items shift by peekOffset (default, supports negative values)
 * - 'incoming': New/child items start offset and animate to 0 (supports positive values)
 */
export type OffsetTarget = 'anchored' | 'incoming'

export interface StyleConfig {
  /** Variant for collapsed items (initial state) */
  collapsedVariant: ButtonVariant
  /** Variant for expanded (active parent) items */
  expandedVariant: ButtonVariant
  /** Variant for anchored (background) items */
  anchoredVariant: ButtonVariant
  /** Variant for selected leaf items */
  selectedVariant: ButtonVariant
  /** Variant for child items (siblings of active) */
  childVariant: ButtonVariant
  /**
   * Peek offset in pixels.
   * - When offsetTarget='anchored': negative value shifts incumbent left
   * - When offsetTarget='incoming': positive value positions new items to the right
   */
  peekOffset: number
  /**
   * Which element receives the peekOffset.
   * - 'anchored': incumbent shifts (current behavior)
   * - 'incoming': new items start offset (incumbent stays put)
   */
  offsetTarget: OffsetTarget
  /** Opacity when anchored */
  anchoredOpacity: number
  /** Button size */
  size: ButtonSize
  /** Button roundness */
  roundness: ButtonRoundness
  /** Gap between items */
  gap: GapSize
  /** Gap between child items in pixels */
  childGap: number
  /** Render as links */
  asLink: boolean
}

// ============================================================================
// STATE
// ============================================================================

/**
 * Active path through the tree.
 * Each element is the ID of the selected item at that level.
 *
 * Example: ['design', 'figma', 'components']
 * - Level 0: "design" is expanded
 * - Level 1: "figma" is expanded
 * - Level 2: "components" is selected (leaf or expandable)
 */
export type ActivePath = string[]

/**
 * Animation phase for the stack.
 */
export type StackPhase = 'idle' | 'transitioning' | 'settled'

// ============================================================================
// CONTEXT
// ============================================================================

export interface StackContextValue {
  /** Current active path through the tree */
  activePath: ActivePath
  /** Current animation phase */
  phase: StackPhase
  /** Animation configuration */
  animationConfig: AnimationConfig
  /** Style configuration */
  styleConfig: StyleConfig
  /** Whether to show numbers */
  showNumbers: boolean
  /** Reduced motion preference */
  shouldReduceMotion: boolean
  /** Select an item at a given level */
  selectItem: (level: number, id: string, hasChildren: boolean) => void
  /** Collapse to a given level */
  collapseToLevel: (level: number) => void
  /** Reset to initial state */
  reset: () => void
}

export interface LevelContextValue {
  /** Current nesting level (0-based) */
  level: number
  /** ID of the parent item (null for root) */
  parentId: string | null
  /** Whether this level's parent is anchored */
  isParentAnchored: boolean
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface ButtonAnimationV2Props {
  /** Navigation items */
  items?: StackItem[]
  /** Animation configuration overrides */
  animationConfig?: Partial<AnimationConfig>
  /** Style configuration overrides */
  styleConfig?: Partial<StyleConfig>
  /** Show index numbers on items */
  showNumbers?: boolean
  /** Additional CSS classes */
  className?: string
  /** Callback on reset */
  onReset?: () => void
}

export interface StackLevelProps {
  /** Items at this level */
  items: StackItem[]
  /** Children (for composable API) */
  children?: ReactNode
}

export interface StackItemComponentProps {
  /** Item data */
  item: StackItem
  /** Index in sibling list */
  index: number
  /** Total siblings */
  totalSiblings: number
}
