/**
 * ButtonAnimation V2 - Configuration
 *
 * Default values and constants for the multi-level stacking component.
 *
 * @module prod/base/button-animation-v2
 */

import type {
  AnimationConfig,
  StyleConfig,
  GapSize,
  StackItem,
  ButtonSize,
  OffsetTarget,
} from './types'

// ============================================================================
// ANIMATION DEFAULTS
// ============================================================================

export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  // Active button animation
  ease: 'spring',
  duration: 0.2,
  stiffness: 500,
  damping: 35,
  // Child animation
  childEase: 'spring',
  childDuration: 0.2,
  childStiffness: 400,
  childDamping: 30,
  // Timing
  exitDuration: 0.1,
  childEntryDelay: 0.05,
  stagger: 0.03,
  entryDirection: 'down',
  entryDistance: 8,
  entryOrder: 'sequential',
  staggerDirection: 'forward',
  // Terminal (active child) animation
  terminalDuration: 0.25,
  terminalScale: 1.04,
}

// ============================================================================
// STYLE DEFAULTS
// ============================================================================

export const DEFAULT_STYLE_CONFIG: StyleConfig = {
  collapsedVariant: 'tertiary',
  expandedVariant: 'shine',
  anchoredVariant: 'secondary',
  selectedVariant: 'link-color',
  childVariant: 'tertiary',
  peekOffset: 8,
  offsetTarget: 'incoming',
  anchoredOpacity: 0.6,
  size: 'md',
  roundness: 'default',
  gap: 'md',
  childGap: 12,
  asLink: false,
}

// ============================================================================
// LAYOUT TOKENS
// ============================================================================

export const GAP_CLASSES: Record<GapSize, string> = {
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
}

export const GAP_PIXELS: Record<GapSize, number> = {
  sm: 8,
  md: 12,
  lg: 16,
}

export const SIZE_HEIGHT_CLASSES: Record<ButtonSize, string> = {
  xs: 'h-8',
  sm: 'h-9',
  md: 'h-10',
  lg: 'h-11',
  xl: 'h-12',
}

// ============================================================================
// Z-INDEX SYSTEM
// ============================================================================

/**
 * Base z-index increment per level.
 * Level 0 = z-0, Level 1 = z-10, Level 2 = z-20, etc.
 */
export const Z_INDEX_INCREMENT = 10

/**
 * Get z-index for a given level.
 */
export function getZIndexForLevel(level: number): number {
  return level * Z_INDEX_INCREMENT
}

/**
 * Get z-index class string for a given level.
 */
export function getZIndexClass(level: number): string {
  const z = getZIndexForLevel(level)
  // Tailwind uses z-0, z-10, z-20, etc.
  return `z-${z}`
}

// ============================================================================
// NUMBERING
// ============================================================================

export const CHILD_LETTERS = 'abcdefghijklmnopqrstuvwxyz'

/**
 * Generate number label for an item at given path.
 * e.g., level 0 index 1 = "1"
 *       level 1 index 0 = "1a"
 *       level 2 index 2 = "1ac"
 */
export function getNumberLabel(
  levelIndices: number[],
): string {
  if (levelIndices.length === 0) return '0'

  let label = ''
  levelIndices.forEach((index, level) => {
    if (level === 0) {
      label += index.toString()
    } else {
      label += CHILD_LETTERS[index] || index.toString()
    }
  })
  return label
}

// ============================================================================
// DEMO DATA
// ============================================================================

/**
 * Default items demonstrating multi-level nesting.
 * Each level has children to show the stacking pattern.
 */
export const DEFAULT_STACK_ITEMS: StackItem[] = [
  {
    id: 'all',
    label: 'All',
  },
  {
    id: 'design',
    label: 'Design',
    children: [
      {
        id: 'figma',
        label: 'Figma',
        children: [
          { id: 'components', label: 'Components' },
          { id: 'prototypes', label: 'Prototypes' },
          { id: 'design-system', label: 'Design System' },
        ],
      },
      {
        id: 'sketch',
        label: 'Sketch',
        children: [
          { id: 'symbols', label: 'Symbols' },
          { id: 'libraries', label: 'Libraries' },
        ],
      },
      { id: 'adobe', label: 'Adobe XD' },
    ],
  },
  {
    id: 'develop',
    label: 'Develop',
    children: [
      {
        id: 'react',
        label: 'React',
        children: [
          { id: 'hooks', label: 'Hooks' },
          { id: 'components-lib', label: 'Components' },
          { id: 'state', label: 'State Management' },
        ],
      },
      {
        id: 'vue',
        label: 'Vue',
        children: [
          { id: 'composition', label: 'Composition API' },
          { id: 'pinia', label: 'Pinia' },
        ],
      },
      { id: 'svelte', label: 'Svelte' },
    ],
  },
  {
    id: 'deploy',
    label: 'Deploy',
    children: [
      { id: 'vercel', label: 'Vercel' },
      { id: 'netlify', label: 'Netlify' },
      { id: 'aws', label: 'AWS' },
    ],
  },
]

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Reserved ID for the root "All" button (level 0 anchor).
 */
export const ROOT_ANCHOR_ID = 'all'

/**
 * Transition delay for phase changes (ms).
 */
export const PHASE_TRANSITION_DELAY_MS = 100
