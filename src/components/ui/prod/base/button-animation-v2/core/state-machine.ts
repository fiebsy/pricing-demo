/**
 * ButtonAnimation V2 - State Machine
 *
 * Formal state definitions and transition logic for button animations.
 * Provides explicit states for better debugging and animation targeting.
 *
 * @module prod/base/button-animation-v2/core
 */

// ============================================================================
// STATE DEFINITIONS
// ============================================================================

/**
 * Explicit button states for clear animation targeting.
 * Each state represents a specific visual and behavioral configuration.
 */
export enum ButtonState {
  // Initial states
  COLLAPSED = 'collapsed',              // Root level items, not selected
  ROOT_ANCHOR = 'root-anchor',          // The "All" button at root level
  
  // Parent states (items with children)
  PARENT_EXPANDING = 'parent-expanding', // Parent transitioning to expanded
  PARENT_ACTIVE = 'parent-active',      // Parent with children visible
  PARENT_ANCHORING = 'parent-anchoring', // Parent transitioning to anchored
  PARENT_ANCHORED = 'parent-anchored',  // Parent pushed back (peek-behind)
  
  // Child states
  CHILD_ENTERING = 'child-entering',    // Child appearing into view
  CHILD_IDLE = 'child-idle',           // Child visible, not selected
  CHILD_ACTIVATING = 'child-activating', // Child transitioning to parent role
  CHILD_ACTIVE = 'child-active',       // Child selected (leaf node)
  CHILD_EXITING = 'child-exiting',     // Child animating out
  
  // Collapse states
  PARENT_UNANCHORING = 'parent-unanchoring', // Parent returning from anchored
  PARENT_COLLAPSING = 'parent-collapsing',   // Parent returning to collapsed
  COLLAPSED_IDLE = 'collapsed-idle',         // Back to initial state
}

// ============================================================================
// STATE METADATA
// ============================================================================

/**
 * Metadata for each button state.
 * Helps determine visual properties and allowed transitions.
 */
export interface StateMetadata {
  /** Whether the button is visible */
  visible: boolean
  /** Whether the button is interactive */
  interactive: boolean
  /** Whether the button is in an anchored position */
  anchored: boolean
  /** Whether this is a transitional state */
  transitional: boolean
  /** Z-index layer */
  zLayer: 'base' | 'anchored' | 'active' | 'transitioning'
  /** Allowed state transitions from this state */
  allowedTransitions: ButtonState[]
}

export const STATE_METADATA: Record<ButtonState, StateMetadata> = {
  [ButtonState.COLLAPSED]: {
    visible: true,
    interactive: true,
    anchored: false,
    transitional: false,
    zLayer: 'base',
    allowedTransitions: [
      ButtonState.PARENT_EXPANDING,
      ButtonState.CHILD_ACTIVE,
    ],
  },
  
  [ButtonState.ROOT_ANCHOR]: {
    visible: true,
    interactive: true,
    anchored: false,
    transitional: false,
    zLayer: 'base',
    allowedTransitions: [
      ButtonState.PARENT_ANCHORING,
      ButtonState.PARENT_EXPANDING,
    ],
  },
  
  [ButtonState.PARENT_EXPANDING]: {
    visible: true,
    interactive: false,
    anchored: false,
    transitional: true,
    zLayer: 'transitioning',
    allowedTransitions: [
      ButtonState.PARENT_ACTIVE,
    ],
  },
  
  [ButtonState.PARENT_ACTIVE]: {
    visible: true,
    interactive: true,
    anchored: false,
    transitional: false,
    zLayer: 'active',
    allowedTransitions: [
      ButtonState.PARENT_ANCHORING,
      ButtonState.PARENT_COLLAPSING,
    ],
  },
  
  [ButtonState.PARENT_ANCHORING]: {
    visible: true,
    interactive: false,
    anchored: false,
    transitional: true,
    zLayer: 'transitioning',
    allowedTransitions: [
      ButtonState.PARENT_ANCHORED,
    ],
  },
  
  [ButtonState.PARENT_ANCHORED]: {
    visible: true,
    interactive: false,
    anchored: true,
    transitional: false,
    zLayer: 'anchored',
    allowedTransitions: [
      ButtonState.PARENT_UNANCHORING,
    ],
  },
  
  [ButtonState.CHILD_ENTERING]: {
    visible: true,
    interactive: false,
    anchored: false,
    transitional: true,
    zLayer: 'transitioning',
    allowedTransitions: [
      ButtonState.CHILD_IDLE,
    ],
  },
  
  [ButtonState.CHILD_IDLE]: {
    visible: true,
    interactive: true,
    anchored: false,
    transitional: false,
    zLayer: 'active',
    allowedTransitions: [
      ButtonState.CHILD_ACTIVATING,
      ButtonState.CHILD_ACTIVE,
      ButtonState.CHILD_EXITING,
    ],
  },
  
  [ButtonState.CHILD_ACTIVATING]: {
    visible: true,
    interactive: false,
    anchored: false,
    transitional: true,
    zLayer: 'transitioning',
    allowedTransitions: [
      ButtonState.PARENT_ACTIVE,
      ButtonState.CHILD_ACTIVE,
    ],
  },
  
  [ButtonState.CHILD_ACTIVE]: {
    visible: true,
    interactive: true,
    anchored: false,
    transitional: false,
    zLayer: 'active',
    allowedTransitions: [
      ButtonState.CHILD_EXITING,
      ButtonState.PARENT_EXPANDING,
    ],
  },
  
  [ButtonState.CHILD_EXITING]: {
    visible: true,
    interactive: false,
    anchored: false,
    transitional: true,
    zLayer: 'transitioning',
    allowedTransitions: [
      ButtonState.COLLAPSED_IDLE,
    ],
  },
  
  [ButtonState.PARENT_UNANCHORING]: {
    visible: true,
    interactive: false,
    anchored: true,
    transitional: true,
    zLayer: 'transitioning',
    allowedTransitions: [
      ButtonState.PARENT_ACTIVE,
    ],
  },
  
  [ButtonState.PARENT_COLLAPSING]: {
    visible: true,
    interactive: false,
    anchored: false,
    transitional: true,
    zLayer: 'transitioning',
    allowedTransitions: [
      ButtonState.COLLAPSED,
      ButtonState.COLLAPSED_IDLE,
    ],
  },
  
  [ButtonState.COLLAPSED_IDLE]: {
    visible: false,
    interactive: false,
    anchored: false,
    transitional: false,
    zLayer: 'base',
    allowedTransitions: [
      ButtonState.COLLAPSED,
    ],
  },
}

// ============================================================================
// STATE TRANSITIONS
// ============================================================================

/**
 * Represents a state transition with timing and animation details.
 */
export interface StateTransition {
  from: ButtonState
  to: ButtonState
  duration: number // milliseconds
  easing: string
  description: string
}

/**
 * Predefined transitions with optimal timing for each state change.
 */
export const STATE_TRANSITIONS: StateTransition[] = [
  // Expansion transitions
  {
    from: ButtonState.COLLAPSED,
    to: ButtonState.PARENT_EXPANDING,
    duration: 200,
    easing: 'easeOut',
    description: 'Item begins expanding to show children',
  },
  {
    from: ButtonState.PARENT_EXPANDING,
    to: ButtonState.PARENT_ACTIVE,
    duration: 150,
    easing: 'easeOut',
    description: 'Item completes expansion',
  },
  
  // Anchoring transitions
  {
    from: ButtonState.PARENT_ACTIVE,
    to: ButtonState.PARENT_ANCHORING,
    duration: 250,
    easing: 'easeInOut',
    description: 'Parent begins moving to anchored position',
  },
  {
    from: ButtonState.PARENT_ANCHORING,
    to: ButtonState.PARENT_ANCHORED,
    duration: 150,
    easing: 'easeOut',
    description: 'Parent settles in anchored position',
  },
  
  // Child entry
  {
    from: ButtonState.CHILD_ENTERING,
    to: ButtonState.CHILD_IDLE,
    duration: 200,
    easing: 'easeOut',
    description: 'Child completes entry animation',
  },
  
  // Child to parent promotion (KEY TRANSITION)
  {
    from: ButtonState.CHILD_IDLE,
    to: ButtonState.CHILD_ACTIVATING,
    duration: 300,
    easing: 'easeInOut',
    description: 'Child begins promotion to parent role',
  },
  {
    from: ButtonState.CHILD_ACTIVATING,
    to: ButtonState.PARENT_ACTIVE,
    duration: 200,
    easing: 'easeOut',
    description: 'Child completes promotion to parent',
  },
  
  // Child exit
  {
    from: ButtonState.CHILD_IDLE,
    to: ButtonState.CHILD_EXITING,
    duration: 150,
    easing: 'easeIn',
    description: 'Child begins exit animation',
  },
  {
    from: ButtonState.CHILD_EXITING,
    to: ButtonState.COLLAPSED_IDLE,
    duration: 100,
    easing: 'easeOut',
    description: 'Child completes exit',
  },
  
  // Collapse transitions
  {
    from: ButtonState.PARENT_ANCHORED,
    to: ButtonState.PARENT_UNANCHORING,
    duration: 200,
    easing: 'easeInOut',
    description: 'Parent begins returning from anchored',
  },
  {
    from: ButtonState.PARENT_UNANCHORING,
    to: ButtonState.PARENT_ACTIVE,
    duration: 150,
    easing: 'easeOut',
    description: 'Parent returns to active',
  },
  {
    from: ButtonState.PARENT_ACTIVE,
    to: ButtonState.PARENT_COLLAPSING,
    duration: 200,
    easing: 'easeIn',
    description: 'Parent begins collapsing',
  },
  {
    from: ButtonState.PARENT_COLLAPSING,
    to: ButtonState.COLLAPSED,
    duration: 150,
    easing: 'easeOut',
    description: 'Parent returns to collapsed',
  },
]

// ============================================================================
// STATE DETERMINATION
// ============================================================================

/**
 * Context for determining button state.
 */
export interface StateContext {
  itemId: string
  level: number
  hasChildren: boolean
  activePath: string[]
  parentIsAnchored: boolean
  isRootAnchor: boolean
}

/**
 * Determines the current button state based on context.
 * This replaces the implicit state calculations scattered throughout components.
 */
export function determineButtonState(context: StateContext): ButtonState {
  const { itemId, level, hasChildren, activePath, parentIsAnchored, isRootAnchor } = context
  
  // Check if item is in active path
  const isInActivePath = activePath[level] === itemId
  const hasActiveChild = activePath.length > level + 1
  
  // Root anchor (All button) special case
  if (isRootAnchor) {
    if (level === 0 && activePath.length === 0) {
      return ButtonState.ROOT_ANCHOR
    }
    if (level === 0 && activePath.length > 0 && activePath[0] !== itemId) {
      return ButtonState.PARENT_ANCHORED
    }
  }
  
  // Parent with children
  if (hasChildren && isInActivePath) {
    if (hasActiveChild) {
      return ButtonState.PARENT_ANCHORED
    }
    return ButtonState.PARENT_ACTIVE
  }
  
  // Child states
  if (level > 0 && !isInActivePath) {
    return ButtonState.CHILD_IDLE
  }
  
  // Leaf node selected
  if (isInActivePath && !hasChildren) {
    return ButtonState.CHILD_ACTIVE
  }
  
  // Default collapsed state
  return ButtonState.COLLAPSED
}

// ============================================================================
// TRANSITION VALIDATION
// ============================================================================

/**
 * Validates if a state transition is allowed.
 */
export function isTransitionAllowed(from: ButtonState, to: ButtonState): boolean {
  const metadata = STATE_METADATA[from]
  return metadata.allowedTransitions.includes(to)
}

/**
 * Gets the transition configuration for a state change.
 */
export function getTransitionConfig(
  from: ButtonState,
  to: ButtonState
): StateTransition | undefined {
  return STATE_TRANSITIONS.find(t => t.from === from && t.to === to)
}

// ============================================================================
// STATE HELPERS
// ============================================================================

/**
 * Checks if a state is transitional (in-between state).
 */
export function isTransitionalState(state: ButtonState): boolean {
  return STATE_METADATA[state].transitional
}

/**
 * Gets the z-index value for a state's layer.
 */
export function getStateZIndex(state: ButtonState): number {
  const layer = STATE_METADATA[state].zLayer
  switch (layer) {
    case 'base': return 0
    case 'anchored': return 10
    case 'active': return 100
    case 'transitioning': return 50
    default: return 0
  }
}

/**
 * Gets the opacity value for a state.
 */
export function getStateOpacity(state: ButtonState, config?: { anchoredOpacity?: number }): number {
  const anchoredOpacity = config?.anchoredOpacity ?? 0.6
  
  switch (state) {
    case ButtonState.PARENT_ANCHORED:
    case ButtonState.PARENT_ANCHORING:
    case ButtonState.PARENT_UNANCHORING:
      return anchoredOpacity
    case ButtonState.CHILD_EXITING:
    case ButtonState.COLLAPSED_IDLE:
      return 0
    default:
      return 1
  }
}