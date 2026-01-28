/**
 * ButtonAnimation V3 - Type Definitions
 *
 * Clean, minimal type definitions for the V3 component.
 *
 * @module prod/base/button-animation-v3
 */

// =============================================================================
// DATA TYPES
// =============================================================================

/**
 * Stack item representing a navigation option.
 * Supports recursive nesting for infinite depth.
 */
export interface StackItem {
  /** Unique identifier */
  id: string
  /** Display label */
  label: string
  /** Optional child items */
  children?: StackItem[]
}

/**
 * Active path through the navigation tree.
 * Array of item IDs from root to current selection.
 */
export type ActivePath = string[]

// =============================================================================
// ANIMATION STATES
// =============================================================================

/**
 * Minimal set of animation states for clear targeting.
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
 * Context for determining button state.
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
  /** Whether this is the root anchor (All button) */
  isRootAnchor: boolean
  /** Whether this item was previously a child */
  wasChild?: boolean
}

// =============================================================================
// CONFIGURATION
// =============================================================================

/**
 * Animation configuration.
 */
export interface AnimationConfig {
  /** Spring stiffness */
  stiffness: number
  /** Spring damping */
  damping: number
  /** Duration for promotion animation (seconds) */
  promotionDuration: number
  /** Scale factor during promotion */
  promotionScale: number
  /** Child entry stagger delay (seconds) */
  stagger: number
  /** Child entry distance (pixels) */
  entryDistance: number
  /** Child entry delay (seconds) */
  childEntryDelay: number
  /** Exit animation duration (seconds) */
  exitDuration: number
}

/**
 * Style configuration.
 */
export interface StyleConfig {
  /** Peek offset for anchored items (negative = left) */
  peekOffset: number
  /** Opacity for anchored items */
  anchoredOpacity: number
  /** Gap between items */
  gap: 'sm' | 'md' | 'lg'
  /** Button variant for expanded parent */
  expandedVariant: ButtonVariant
  /** Button variant for child items */
  childVariant: ButtonVariant
  /** Button variant for anchored items */
  anchoredVariant: ButtonVariant
}

/**
 * Button visual variants.
 */
export type ButtonVariant = 
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'shine'
  | 'link-gray'
  | 'link-color'

// =============================================================================
// COMPONENT PROPS
// =============================================================================

/**
 * Main component props.
 */
export interface ButtonAnimationV3Props {
  /** Navigation items */
  items?: StackItem[]
  /** Animation configuration */
  animationConfig?: Partial<AnimationConfig>
  /** Style configuration */
  styleConfig?: Partial<StyleConfig>
  /** Show number indicators */
  showNumbers?: boolean
  /** Show debug overlay */
  showDebug?: boolean
  /** Additional CSS classes */
  className?: string
  /** Reset callback */
  onReset?: () => void
}

/**
 * Stack level props.
 */
export interface StackLevelProps {
  /** Items at this level */
  items: StackItem[]
  /** Parent level indices for numbering */
  parentLevelIndices?: number[]
}

/**
 * Animated item props.
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
 * Stack context value.
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
  /** Reduced motion flag */
  shouldReduceMotion: boolean
  /** Select an item */
  selectItem: (level: number, id: string, hasChildren: boolean) => void
  /** Collapse to level */
  collapseToLevel: (level: number) => void
  /** Reset state */
  reset: () => void
}

/**
 * Level context value.
 */
export interface LevelContextValue {
  /** Current level (0 = root) */
  level: number
  /** Parent item ID */
  parentId: string | null
  /** Whether parent is anchored */
  isParentAnchored: boolean
}