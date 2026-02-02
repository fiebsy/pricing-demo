/**
 * StackingNav - Type Definitions
 *
 * A multi-level navigation component with smooth stacking animations.
 * Items "peek behind" as you navigate deeper, creating a breadcrumb-like trail.
 *
 * @module features/stacking-nav
 */

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
// ANIMATION STATES
// =============================================================================

/**
 * Animation states for clear visual targeting.
 * Each state represents a specific visual configuration.
 */
export enum AnimationState {
  /** Initial state - item at root level, not selected */
  IDLE = 'idle',
  /** Parent state - item with children expanded */
  PARENT = 'parent',
  /** Anchored state - parent pushed back in peek-behind pattern */
  ANCHORED = 'anchored',
  /** Child state - child item visible and interactive */
  CHILD = 'child',
  /** Promoting state - child transitioning to parent role */
  PROMOTING = 'promoting',
}

/**
 * Context for determining item state.
 */
export interface StateContext {
  /** Item ID */
  itemId: string
  /** Nesting level (0 = root) */
  level: number
  /** Whether item has children */
  hasChildren: boolean
  /** Current active path */
  activePath: ActivePath
  /** Whether parent is in anchored state */
  parentIsAnchored: boolean
  /** Whether this is the root anchor */
  isRootAnchor: boolean
  /** Whether this item was previously a child */
  wasChild?: boolean
}

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
  /** Collapse layout transition duration in seconds (currently hardcoded 0.1s) */
  collapseLayoutDuration: number
  /** Skip animation for leaf nodes (items without children) - keeps them in place */
  skipLeafAnimation: boolean
  /** Delay before new child items become interactive in seconds (prevents accidental hover) */
  hoverDelay: number
  /** Time scale for slow-mo debugging (1 = normal, 0.1 = 10x slower). Scales internal hardcoded durations. */
  timeScale: number
}

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
  /** Clip anchored items to only show the peek sliver (hides full pill outline) */
  clipAnchored: boolean
  /** Width in px of the visible clip area for anchored items (defaults to peekOffset) */
  clipOffset: number
  /** Which side of the anchored button remains visible after clipping */
  clipSide: 'left' | 'right' | 'center'
  /** Delay in seconds before clip starts on entry (lets position animation lead) */
  clipDelay: number
  
  // Level All Button Configuration
  /** Show "All" button in child levels (L1+) - defaults to false */
  showLevelAll: boolean
  /** Label for level-all buttons - defaults to "All" */
  levelAllLabel: string
  /** Button variant for level-all when active (no specific child selected) */
  levelAllActiveVariant: ButtonVariant
  /** Button variant for level-all when inactive (a child is selected) */
  levelAllInactiveVariant: ButtonVariant
}

/**
 * Button visual variants.
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
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

/**
 * Animated item props (internal).
 */
export interface AnimatedItemProps {
  /** Item data */
  item: StackItem
  /** Index in sibling list */
  index: number
  /** Level indices for numbering */
  levelIndices: number[]
  /** Current animation state */
  state: AnimationState
  /** Whether item is anchored */
  isAnchored: boolean
  /** Whether item is being promoted */
  isPromoting?: boolean
}

// =============================================================================
// CONTEXT TYPES
// =============================================================================

/**
 * Stack context value (shared state).
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
  /** Reduced motion preference */
  shouldReduceMotion: boolean
  /** Whether currently collapsing (snapshot at render time) */
  isCollapsing: boolean
  /** Get live collapse state (reads ref, not captured value) */
  getIsCollapsing: () => boolean
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
}
