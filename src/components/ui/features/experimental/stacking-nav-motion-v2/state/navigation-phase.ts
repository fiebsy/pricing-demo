/**
 * StackingNav V2 - Navigation Phase State Machine
 *
 * Central state machine replacing V1's scattered timing hooks.
 * Single source of truth for animation phases.
 *
 * @module features/stacking-nav-v2/state
 */

// =============================================================================
// NAVIGATION PHASES
// =============================================================================

/**
 * Navigation phase states.
 *
 * ```
 * IDLE → EXPANDING → EXPANDED → COLLAPSING → IDLE
 *                       ↓
 *                   PROMOTING → EXPANDED
 * ```
 */
export enum NavigationPhase {
  /** No animation in progress, resting state */
  IDLE = 'idle',
  /** Children are appearing (staggered entry) */
  EXPANDING = 'expanding',
  /** Children visible, parent is anchored */
  EXPANDED = 'expanded',
  /** Children exiting (collapse animation) */
  COLLAPSING = 'collapsing',
  /** Child transitioning to parent role */
  PROMOTING = 'promoting',
}

// =============================================================================
// PHASE STATE
// =============================================================================

/**
 * Complete phase state including timing metadata.
 */
export interface PhaseState {
  /** Current navigation phase */
  current: NavigationPhase
  /** Previous phase for transition tracking */
  previous: NavigationPhase | null
  /** Timestamp when phase started (performance.now()) */
  startTime: number
  /** Expected duration of current phase in ms */
  expectedDuration: number
  /** ID of item being promoted (null if not promoting) */
  promotingId: string | null
  /** Level at which promoting is occurring */
  promotingLevel: number | null
}

/**
 * Create initial phase state.
 */
export function createInitialPhaseState(): PhaseState {
  return {
    current: NavigationPhase.IDLE,
    previous: null,
    startTime: typeof performance !== 'undefined' ? performance.now() : 0,
    expectedDuration: 0,
    promotingId: null,
    promotingLevel: null,
  }
}

// =============================================================================
// PHASE TRANSITIONS
// =============================================================================

/**
 * Valid phase transitions.
 * Each phase can only transition to specific other phases.
 */
export const VALID_TRANSITIONS: Record<NavigationPhase, NavigationPhase[]> = {
  [NavigationPhase.IDLE]: [NavigationPhase.EXPANDING],
  [NavigationPhase.EXPANDING]: [NavigationPhase.EXPANDED, NavigationPhase.COLLAPSING],
  [NavigationPhase.EXPANDED]: [NavigationPhase.COLLAPSING, NavigationPhase.PROMOTING],
  [NavigationPhase.COLLAPSING]: [NavigationPhase.IDLE, NavigationPhase.EXPANDING],
  [NavigationPhase.PROMOTING]: [NavigationPhase.EXPANDED],
}

/**
 * Check if a transition is valid.
 */
export function isValidTransition(from: NavigationPhase, to: NavigationPhase): boolean {
  return VALID_TRANSITIONS[from].includes(to)
}

// =============================================================================
// PHASE DURATION CALCULATION
// =============================================================================

/**
 * Animation config subset needed for duration calculation.
 */
export interface PhaseDurationConfig {
  /** Base tween duration in seconds */
  duration: number
  /** Delay before child entry in seconds */
  childEntryDelay: number
  /** Stagger between children in seconds */
  stagger: number
  /** Collapse layout transition in seconds */
  collapseLayoutDuration: number
  /** Promotion animation duration in seconds */
  promotionDuration: number
  /** Time scale for slow-mo (1 = normal, 0.1 = 10x slower) */
  timeScale: number
}

/**
 * Calculate phase duration based on phase type and child count.
 */
export function calculatePhaseDuration(
  phase: NavigationPhase,
  config: PhaseDurationConfig,
  childCount: number = 0
): number {
  const { timeScale } = config
  const scale = timeScale > 0 ? timeScale : 1

  switch (phase) {
    case NavigationPhase.EXPANDING: {
      // childEntryDelay + (childCount * stagger) + base duration
      const entryTime = config.childEntryDelay + childCount * config.stagger + config.duration
      return (entryTime * 1000) / scale
    }

    case NavigationPhase.COLLAPSING: {
      // Collapse layout duration + buffer for exit animations
      const collapseTime = config.collapseLayoutDuration + 0.1 // 100ms buffer
      return (collapseTime * 1000) / scale
    }

    case NavigationPhase.PROMOTING: {
      return (config.promotionDuration * 1000) / scale
    }

    case NavigationPhase.EXPANDED:
    case NavigationPhase.IDLE:
    default:
      return 0 // Resting states have no inherent duration
  }
}

// =============================================================================
// PHASE COLOR MAPPING (for debug visualization)
// =============================================================================

/**
 * Color mapping for phase indicator.
 */
export const PHASE_COLORS: Record<NavigationPhase, string> = {
  [NavigationPhase.IDLE]: '#6B7280', // gray-500
  [NavigationPhase.EXPANDING]: '#06B6D4', // cyan-500
  [NavigationPhase.EXPANDED]: '#22C55E', // green-500
  [NavigationPhase.COLLAPSING]: '#F97316', // orange-500
  [NavigationPhase.PROMOTING]: '#A855F7', // purple-500
}

/**
 * Label mapping for phase indicator.
 */
export const PHASE_LABELS: Record<NavigationPhase, string> = {
  [NavigationPhase.IDLE]: 'IDLE',
  [NavigationPhase.EXPANDING]: 'EXPANDING',
  [NavigationPhase.EXPANDED]: 'EXPANDED',
  [NavigationPhase.COLLAPSING]: 'COLLAPSING',
  [NavigationPhase.PROMOTING]: 'PROMOTING',
}
