/**
 * ButtonAnimation V3 - Configuration
 *
 * Default values and constants for the V3 component.
 *
 * @module prod/base/button-animation-v3
 */

import type { AnimationConfig, StyleConfig, StackItem } from './types'

// =============================================================================
// DEFAULT CONFIGURATION
// =============================================================================

/**
 * Default animation configuration.
 */
export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  // Spring settings
  stiffness: 500,
  damping: 30,
  
  // Promotion animation
  promotionDuration: 0.4,
  promotionScale: 1.08,
  
  // Child animations
  stagger: 0.025,
  entryDistance: 12,
  childEntryDelay: 0.05,
  
  // Exit
  exitDuration: 0.15,
}

/**
 * Default style configuration.
 */
export const DEFAULT_STYLE_CONFIG: StyleConfig = {
  peekOffset: -8,
  anchoredOpacity: 0.6,
  gap: 'md',
  expandedVariant: 'shine',
  childVariant: 'tertiary',
  anchoredVariant: 'secondary',
}

/**
 * Default demo items.
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
 * Root anchor ID (the "All" button).
 */
export const ROOT_ANCHOR_ID = 'all'

/**
 * Z-index values for layering.
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
 * Animation spring presets.
 */
export const SPRING_PRESETS = {
  // Smooth and controlled
  smooth: { stiffness: 500, damping: 30 },
  // Snappy and responsive
  snappy: { stiffness: 700, damping: 35 },
  // Soft and gentle
  soft: { stiffness: 300, damping: 25 },
} as const

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Get z-index for an anchored item based on depth.
 */
export function getAnchoredZIndex(depth: number): number {
  return Z_INDEX.ANCHORED_BASE + depth * Z_INDEX.ANCHORED_INCREMENT
}

/**
 * Get number label for display.
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