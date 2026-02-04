/**
 * StackingNav V2 - Type Definitions
 *
 * Consolidated types for the V2 implementation.
 * Uses centralized phase state machine instead of scattered hooks.
 *
 * @module features/stacking-nav-v2
 */

import type { NavigationPhase } from './state/navigation-phase'

// =============================================================================
// DATA TYPES
// =============================================================================

/**
 * Navigation item representing an option in the stack.
 * Supports recursive nesting for infinite depth.
 */
export interface StackItem {
  /** Unique identifier */
  id: string
  /** Display label */
  label: string
  /** Optional child items for nested navigation */
  children?: StackItem[]
}

/**
 * Active path through the navigation tree.
 * Array of item IDs from root to current selection.
 *
 * @example ['design', 'figma', 'components'] // 3 levels deep
 */
export type ActivePath = string[]

// =============================================================================
// CONFIGURATION
// =============================================================================

/** Easing function type */
export type EasingType =
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'circIn'
  | 'circOut'
  | 'circInOut'
  | 'backIn'
  | 'backOut'
  | 'backInOut'
  | 'anticipate'
  | 'expoIn'
  | 'expoOut'
  | 'expoInOut'

/** Animation type - spring physics or duration-based easing */
export type AnimationType = 'spring' | 'tween'

/**
 * Animation configuration for controlling timing and feel.
 */
export interface AnimationConfig {
  /** Animation type: spring (physics) or tween (duration + easing) */
  type: AnimationType

  // Spring settings (used when type = 'spring')
  /** Spring stiffness (higher = snappier) */
  stiffness: number
  /** Spring damping (higher = less bounce) */
  damping: number
  /** Spring mass (higher = slower, more inertia) */
  mass: number

  // Tween settings (used when type = 'tween')
  /** Duration in seconds for tween animations */
  duration: number
  /** Easing function for tween animations */
  ease: EasingType

  /** Duration for promotion animation in seconds */
  promotionDuration: number
  /** Scale factor during promotion (1 = no scale, 1.08 = 8% larger) */
  promotionScale: number
  /** Child entry stagger delay in seconds */
  stagger: number
  /** Child entry X offset in pixels (positive = from right, negative = from left) */
  entryOffsetX: number
  /** Child entry Y offset in pixels (positive = from bottom, negative = from top) */
  entryOffsetY: number
  /** Child entry delay in seconds */
  childEntryDelay: number
  /** Child entry scale (0.95 = start at 95% size) */
  entryScale: number
  /** Child entry opacity (0 = fade in from invisible, 1 = no fade) */
  entryOpacity: number
  /** When true, children start at parent's position and spread out (overrides entryOffsetX/Y) */
  entryFromParent: boolean
  /** When true, children appear instantly at final position (no slide animation, only fade) */
  entryInstant: boolean
  /** Exit scale (0.95 = shrink to 95% on exit) */
  exitScale: number
  /** Whether exit uses its own timing (true) or inherits main transition (false) */
  exitUseCustomTiming: boolean
  /** Exit duration in seconds (used when exitUseCustomTiming = true) */
  exitDuration: number
  /** Exit easing function (used when exitUseCustomTiming = true) */
  exitEase: EasingType
  /** Delay before exit starts in seconds (holds button visible before fade) */
  exitDelay: number
  /** Collapse layout transition duration in seconds */
  collapseLayoutDuration: number
  /** Skip animation for leaf nodes (items without children) - keeps them in place */
  skipLeafAnimation: boolean
  /** Delay before new child items become interactive in seconds (prevents accidental hover) */
  hoverDelay: number
  /** Time scale for slow-mo debugging (1 = normal, 0.1 = 10x slower) */
  timeScale: number
  /** When true, children wait for promotion animation to complete before entering */
  syncChildEntryToPromotion: boolean
  /** Additional delay (seconds) for children during promotion phase */
  promotionChildOffset: number

  // Demotion entry settings (siblings reappearing during collapse)
  /** Delay before demotion siblings start appearing in seconds */
  demotionEntryDelay: number
  /** Stagger between demotion sibling appearances in seconds */
  demotionStagger: number
  /** Starting opacity for demotion siblings (0 = fade in, 1 = no fade) */
  demotionEntryOpacity: number
  /** Starting scale for demotion siblings */
  demotionEntryScale: number
}

/**
 * Button visual variants.
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'reentry'
  | 'shine'
  | 'tab'
  | 'link-gray'
  | 'link-color'

/**
 * Button size options.
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Button roundness options.
 */
export type ButtonRoundness = 'default' | 'pill' | 'squircle'

/**
 * Style configuration for visual appearance.
 */
export interface StyleConfig {
  /** Peek offset for anchored items in pixels (negative = left) */
  peekOffset: number
  /** Opacity for anchored items (0-1) */
  anchoredOpacity: number
  /** Gap between items */
  gap: 'sm' | 'md' | 'lg'
  /** Button size */
  buttonSize: ButtonSize
  /** Button roundness */
  buttonRoundness: ButtonRoundness
  /** Button variant for expanded parent */
  expandedVariant: ButtonVariant
  /** Button variant for child items */
  childVariant: ButtonVariant
  /** Button variant for anchored items */
  anchoredVariant: ButtonVariant
  /** Button variant for selected leaf nodes (items without children) */
  selectedLeafVariant: ButtonVariant
  /** Button variant for items during reentry (siblings reappearing during collapse) */
  reentryVariant: ButtonVariant
  /** Button variant for the demoting parent (previously expanded, now returning to sibling) */
  demotingVariant: ButtonVariant

  // Level All Button Configuration
  /** Show "All" button in child levels (L1+) */
  showLevelAll: boolean
  /** Label for level-all buttons */
  levelAllLabel: string
  /** Button variant for level-all when active (no specific child selected) */
  levelAllActiveVariant: ButtonVariant
  /** Button variant for level-all when inactive (a child is selected) */
  levelAllInactiveVariant: ButtonVariant
}

// =============================================================================
// COMPONENT PROPS
// =============================================================================

/**
 * Main StackingNav component props.
 */
export interface StackingNavProps {
  /** Navigation items */
  items?: StackItem[]
  /** Animation configuration overrides */
  animationConfig?: Partial<AnimationConfig>
  /** Style configuration overrides */
  styleConfig?: Partial<StyleConfig>
  /** Show number indicators on items */
  showNumbers?: boolean
  /** Show debug overlay */
  showDebug?: boolean
  /** Show phase indicator for debugging */
  showPhaseIndicator?: boolean
  /** Additional CSS classes */
  className?: string
  /** Callback when state is reset */
  onReset?: () => void
  /** Callback when selection changes */
  onSelectionChange?: (path: ActivePath) => void
}

/**
 * Stack level props (internal).
 */
export interface StackLevelProps {
  /** Items at this level */
  items: StackItem[]
  /** Parent level indices for numbering */
  parentLevelIndices?: number[]
}

// =============================================================================
// CONTEXT TYPES
// =============================================================================

/**
 * Stack context value (shared state) - V2 with phase coordinator.
 */
export interface StackContextValue {
  /** Current active path */
  activePath: ActivePath
  /** Animation configuration */
  animationConfig: AnimationConfig
  /** Style configuration */
  styleConfig: StyleConfig
  /** Show numbers flag */
  showNumbers: boolean
  /** Show debug flag */
  showDebug: boolean
  /** Show phase indicator flag */
  showPhaseIndicator: boolean
  /** Reduced motion preference */
  shouldReduceMotion: boolean

  // Phase coordinator state (replaces multiple hooks)
  /** Current navigation phase */
  phase: NavigationPhase
  /** Timestamp when current phase started */
  phaseStartTime: number
  /** Whether any animation is in progress */
  isAnimating: boolean
  /** ID of item being promoted (null if not promoting) */
  promotingId: string | null
  /** ID of item being demoted (null if not collapsing) */
  demotingId: string | null
  /** Whether collapse is in progress */
  isCollapsing: boolean

  /**
   * Check if a specific item is the one being promoted.
   * Consolidates scattered `promotingId === item.id` checks.
   */
  isItemPromoting: (itemId: string) => boolean

  /**
   * Check if hover is suppressed at a given level.
   * Returns true during expanding phase at levels > 0.
   */
  isHoverSuppressed: (level: number) => boolean

  /** Select an item handler */
  selectItem: (level: number, id: string, hasChildren: boolean) => void
  /** Collapse to level handler */
  collapseToLevel: (level: number) => void
  /** Reset state handler */
  reset: () => void
}

/**
 * Level context value (level-specific state).
 */
export interface LevelContextValue {
  /** Current level (0 = root) */
  level: number
  /** Parent item ID */
  parentId: string | null
  /** Whether parent is anchored */
  isParentAnchored: boolean
  /** Total count of anchored items above this level */
  anchorCount: number
  /** Whether parent is in a promoting phase (children should sync to promotion) */
  isParentPromoting: boolean
  /** Parent's anchored offset (where parent ends up after anchoring) */
  parentAnchoredOffset: number
}

// =============================================================================
// ITEM STATE TYPES
// =============================================================================

/**
 * Animation mode — single enum replacing scattered V1 flags.
 */
export type AnimationMode =
  | 'skip' // Leaf skip or parent-of-leaf skip — instant, no movement
  | 'anchor' // Absolute-positioned peek-behind
  | 'promote' // Scale keyframes for child-becoming-parent
  | 'promote-entry' // Children entering during expansion (promotion or simple expand)
  | 'collapse-reentry' // Siblings re-appearing during collapse at any level
  | 'collapse-demote' // The previously-expanded parent returning to sibling status
  | 'default' // Already visible items, no entry animation needed

/**
 * Complete render state for a single item.
 * Computed once per item per render — all downstream code reads this.
 */
export interface ItemRenderState {
  isActive: boolean
  isAnchored: boolean
  isPromoting: boolean
  shouldHide: boolean
  animationMode: AnimationMode
  shouldUseAbsolute: boolean
  anchoredDepth: number
  targetOffset: number
  animationDelay: number
  zIndex: number
}

/**
 * Context passed to item state computation.
 */
export interface ItemStateContext {
  item: StackItem
  index: number
  level: number
  activePath: ActivePath
  animationConfig: AnimationConfig
  styleConfig: StyleConfig
  anchorCount: number
  promotingId: string | null
  /** ID of item being demoted during collapse */
  demotingId: string | null
  /** Whether collapse animation is in progress */
  isCollapsing: boolean
  /** Whether active item at this level is a leaf */
  activeItemIsLeaf: boolean
  /** Whether active child (one level deeper) is a leaf */
  activeChildIsLeaf: boolean
  /** Whether level-all is prepended (shifts indices) */
  showLevelAll: boolean
  /** Whether a promotion animation is in progress */
  isPromotingPhase: boolean
}

// =============================================================================
// PHASE TRANSITION HISTORY (for debug)
// =============================================================================

/**
 * Phase transition record for debug history.
 */
export interface PhaseTransitionRecord {
  from: NavigationPhase
  to: NavigationPhase
  timestamp: number
  duration: number
  trigger: string
}
