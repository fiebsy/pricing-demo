/**
 * StackingNav - Navigation Phase State Machine
 *
 * Central state machine for animation phases.
 * Single source of truth for animation timing.
 *
 * @module features/stacking-nav/state
 */

// =============================================================================
// NAVIGATION PHASES
// =============================================================================

/**
 * Navigation phase states.
 *
 * Valid Phase Transitions:
 *
 * ```
 * IDLE → EXPANDING (user clicks item with children at L0)
 * EXPANDING → EXPANDED (entry animations complete)
 * EXPANDING → COLLAPSING (user clicks back before expansion finishes)
 * EXPANDED → COLLAPSING (user navigates back)
 * EXPANDED → PROMOTING (user clicks child with children)
 * COLLAPSING → IDLE (collapse complete)
 * COLLAPSING → EXPANDING (user clicks new item before collapse finishes)
 * PROMOTING → EXPANDED (promotion animation complete)
 * ```
 *
 * State Diagram:
 * ```
 * IDLE → EXPANDING → EXPANDED → COLLAPSING → IDLE
 *            ↓           ↓           ↓
 *        COLLAPSING  PROMOTING   EXPANDING
 *                        ↓
 *                    EXPANDED
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
  /** ID of item being demoted during collapse (null if not collapsing) */
  demotingId: string | null
  /** Level at which demotion is occurring */
  demotingLevel: number | null
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
    demotingId: null,
    demotingLevel: null,
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

/** Extra time (seconds) for layout animations to settle after collapse */
const COLLAPSE_BUFFER_SECONDS = 0.1

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
  /** When true, children wait for promotion to complete before entering */
  syncChildEntryToPromotion: boolean
  /** Additional delay for children during promotion */
  promotionChildOffset: number
  /** Delay before demotion/reentry animations start in seconds */
  demotionEntryDelay: number
  /** Stagger between reentry items in seconds */
  demotionStagger: number
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
      // Phase completes when LAST child finishes animating:
      // - Last child (index N-1) starts at: childEntryDelay + (N-1) * stagger
      // - Last child finishes at: childEntryDelay + (N-1) * stagger + duration
      const lastChildIndex = Math.max(0, childCount - 1)
      const entryTime = config.childEntryDelay + lastChildIndex * config.stagger + config.duration
      return (entryTime * 1000) / scale
    }

    case NavigationPhase.COLLAPSING: {
      // Collapse phase completes when BOTH:
      // 1. Layout transition finishes (collapseLayoutDuration)
      // 2. Reentry animations finish (demotionEntryDelay + stagger + duration)
      const layoutTime = config.collapseLayoutDuration + COLLAPSE_BUFFER_SECONDS

      // Reentry timing: last sibling finishes at demotionEntryDelay + (N-1) * demotionStagger + duration
      const lastSiblingIndex = Math.max(0, childCount - 1)
      const reentryTime = config.demotionEntryDelay + lastSiblingIndex * config.demotionStagger + config.duration

      // Phase completes when whichever takes longer finishes
      const collapseTime = Math.max(layoutTime, reentryTime)
      return (collapseTime * 1000) / scale
    }

    case NavigationPhase.PROMOTING: {
      // PROMOTING runs two animations:
      // 1. Scale animation on the promoted item (promotionDuration)
      // 2. Children entering with stagger delays
      //
      // When syncChildEntryToPromotion is true, children wait for promotion
      // to complete, so total = promotionDuration + childEntryTime
      //
      // When false (default), they run concurrently, so total = max of both
      const promotionTime = config.promotionDuration
      const lastChildIndex = Math.max(0, childCount - 1)
      const childEntryTime = config.childEntryDelay + lastChildIndex * config.stagger + config.duration

      let totalTime: number
      if (config.syncChildEntryToPromotion) {
        // Sequential: promotion first, then children
        totalTime = promotionTime + config.promotionChildOffset + childEntryTime
      } else {
        // Concurrent: whichever takes longer
        totalTime = Math.max(promotionTime, childEntryTime)
      }
      return (totalTime * 1000) / scale
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
