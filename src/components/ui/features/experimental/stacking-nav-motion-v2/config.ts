/**
 * StackingNav V2 - Configuration
 *
 * Default values and constants for the stacking navigation component.
 *
 * @module features/stacking-nav-v2
 */

import type { AnimationConfig, StyleConfig, StackItem, ButtonSize } from './types'

// =============================================================================
// DEFAULT CONFIGURATION
// =============================================================================

/**
 * Default animation configuration.
 * Tuned for smooth, responsive interactions.
 */
export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  // Animation type - tween by default for smoother feel
  type: 'tween',

  // Spring settings - used when type = 'spring'
  stiffness: 500,
  damping: 30,
  mass: 1,

  // Tween settings - duration-based easing
  duration: 0.3,
  ease: 'expoOut',

  // Promotion animation - disabled by default
  promotionDuration: 0.2,
  promotionScale: 1,

  // Child animations - instant appearance (no slide)
  stagger: 0,
  entryOffsetX: 6,
  entryOffsetY: 10,
  childEntryDelay: 0,
  entryScale: 0.95,
  entryOpacity: 0,
  entryFromParent: true,
  entryInstant: true,

  // Exit animation - instant
  exitScale: 1,
  exitUseCustomTiming: true,
  exitDuration: 0,
  exitEase: 'expoOut',
  exitDelay: 0,
  collapseLayoutDuration: 0.3,

  // Leaf node behavior
  skipLeafAnimation: true,

  // Interaction - no hover delay
  hoverDelay: 0,

  // Debug
  timeScale: 1,

  // Promotion sequencing
  syncChildEntryToPromotion: false,
  promotionChildOffset: 0,

  // Demotion entry settings (siblings reappearing during collapse)
  demotionEntryDelay: 0,
  demotionStagger: 0,
  demotionEntryOpacity: 0,
  demotionEntryScale: 1,
}

/**
 * Default style configuration.
 */
export const DEFAULT_STYLE_CONFIG: StyleConfig = {
  peekOffset: 8,
  anchoredOpacity: 1,
  gap: 'md',
  buttonSize: 'md',
  buttonRoundness: 'pill',
  expandedVariant: 'secondary',
  childVariant: 'tab',
  anchoredVariant: 'secondary',
  selectedLeafVariant: 'tab',
  reentryVariant: 'tab',
  demotingVariant: 'reentry',
  // Level All Button - enabled by default
  showLevelAll: true,
  levelAllLabel: 'All',
  levelAllActiveVariant: 'tab',
  levelAllInactiveVariant: 'tab',
}

/**
 * Default demo items for showcasing the component.
 */
export const DEFAULT_STACK_ITEMS: StackItem[] = [
  { id: 'all', label: 'All' },
  {
    id: 'design',
    label: 'Design',
    children: [
      { id: 'figma', label: 'Figma' },
      { id: 'sketch', label: 'Sketch' },
    ],
  },
  {
    id: 'develop',
    label: 'Develop',
    children: [
      { id: 'react', label: 'React' },
      { id: 'vue', label: 'Vue' },
    ],
  },
]

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Root anchor ID (typically an "All" or "Clear" button).
 */
export const ROOT_ANCHOR_ID = 'all'

/**
 * Prefix for level-all button IDs.
 * These are auto-generated "All" buttons at each child level.
 * Format: `__level_all_{level}` e.g., `__level_all_1` for L1
 */
export const LEVEL_ALL_PREFIX = '__level_all_'

/**
 * Check if an ID is a level-all button ID.
 */
export function isLevelAllId(id: string): boolean {
  return id.startsWith(LEVEL_ALL_PREFIX)
}

/**
 * Get the level from a level-all ID.
 */
export function getLevelFromLevelAllId(id: string): number | null {
  if (!isLevelAllId(id)) return null
  const level = parseInt(id.replace(LEVEL_ALL_PREFIX, ''), 10)
  return isNaN(level) ? null : level
}

/**
 * Create a level-all ID for a given level.
 */
export function createLevelAllId(level: number): string {
  return `${LEVEL_ALL_PREFIX}${level}`
}

/**
 * Z-index values for proper layering.
 */
export const Z_INDEX = {
  BASE: 1,
  ANCHORED_BASE: 10,
  ANCHORED_INCREMENT: 10,
  LEVEL_ALL_INACTIVE: 90,
  LEVEL_ALL_ACTIVE: 95, // Higher when active (V2 fix)
  ACTIVE: 100,
  PROMOTING: 150,
} as const

/**
 * Gap classes for Tailwind.
 */
export const GAP_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
}

/**
 * Height classes per button size for consistent sizing.
 */
export const HEIGHT_CLASSES: Record<ButtonSize, string> = {
  xs: 'h-7',
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-11',
  xl: 'h-12',
}

/**
 * Animation spring presets for different feels.
 */
export const SPRING_PRESETS = {
  /** Smooth and controlled - default */
  smooth: { stiffness: 500, damping: 30, mass: 1 },
  /** Snappy and responsive */
  snappy: { stiffness: 700, damping: 35, mass: 0.8 },
  /** Soft and gentle */
  soft: { stiffness: 300, damping: 25, mass: 1 },
  /** Subtle and refined - minimal bounce */
  subtle: { stiffness: 400, damping: 40, mass: 1.2 },
  /** Bouncy with playful overshoot */
  bouncy: { stiffness: 400, damping: 15, mass: 1 },
  /** Heavy and deliberate */
  heavy: { stiffness: 300, damping: 30, mass: 2 },
  /** Crisp - fast and subtle, balanced */
  crisp: { stiffness: 650, damping: 45, mass: 0.9 },
  /** Swift - very fast, minimal overshoot */
  swift: { stiffness: 700, damping: 50, mass: 0.8 },
  /** Precise - quick but very controlled */
  precise: { stiffness: 600, damping: 55, mass: 1 },
  /** Responsive - light and immediate */
  responsive: { stiffness: 750, damping: 40, mass: 0.7 },
  /** Lively - fast with subtle bounce */
  lively: { stiffness: 700, damping: 22, mass: 0.8 },
} as const

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Get z-index for an anchored item based on depth.
 * Deeper items have higher z-index to appear on top of the stack.
 */
export function getAnchoredZIndex(depth: number): number {
  return Z_INDEX.ANCHORED_BASE + depth * Z_INDEX.ANCHORED_INCREMENT
}

/**
 * Get number label for display (e.g., "1.A.2").
 */
export function getNumberLabel(indices: number[]): string {
  const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

  return indices
    .map((idx, level) => {
      if (level === 0) return idx.toString()
      if (level === 1) return LETTERS[idx] || idx.toString()
      return idx.toString()
    })
    .join('.')
}
