/**
 * StackingNav - Configuration
 *
 * Default values and constants for the stacking navigation component.
 *
 * @module features/stacking-nav
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

  // Tween settings - duration-based easing
  duration: 0.225,
  ease: 'expoOut',

  // Promotion animation - disabled by default (scale = 1)
  promotionDuration: 0.1,
  promotionScale: 1,

  // Child animations - staggered entry with diagonal slide
  stagger: 0,
  entryOffsetX: 0,
  entryOffsetY: 0,
  childEntryDelay: 0.12,
  entryScale: 0.97,

  // Exit animation
  exitScale: 1,
  exitUseCustomTiming: true,
  exitDuration: 0.025,
  exitEase: 'expoOut',
  exitDelay: 0,
  collapseLayoutDuration: 0.225,

  // Leaf node behavior
  skipLeafAnimation: true,

  // Interaction
  hoverDelay: 0.2,

  // Debug
  timeScale: 1,
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
  expandedVariant: 'shine',
  childVariant: 'tertiary',
  anchoredVariant: 'secondary',
  selectedLeafVariant: 'tab',
  clipAnchored: true,
  clipOffset: 8,
  clipSide: 'left',
  clipDelay: 0,
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
  smooth: { stiffness: 500, damping: 30 },
  /** Snappy and responsive */
  snappy: { stiffness: 700, damping: 35 },
  /** Soft and gentle */
  soft: { stiffness: 300, damping: 25 },
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
