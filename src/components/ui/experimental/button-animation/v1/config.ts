/**
 * ButtonAnimation - Configuration
 *
 * Default values, style tokens, and presets for the button animation component.
 * All animation values are tuned for S-tier quality with performance in mind.
 *
 * @module prod/base/button-animation
 */

import type {
  ParentAnimationConfig,
  ChildAnimationConfig,
  StyleConfig,
  GapSize,
  ButtonSize,
} from './types'

// ============================================================================
// PARENT ANIMATION DEFAULTS
// ============================================================================

/**
 * Default parent animation configuration.
 *
 * Tuned for:
 * - Fast response (high stiffness)
 * - Minimal overshoot (high damping)
 * - Quick exits for snappy feel
 */
export const DEFAULT_PARENT_CONFIG: ParentAnimationConfig = {
  duration: 0.15,
  ease: 'spring',
  stiffness: 500,
  damping: 35,
  exitDuration: 0.1,
  when: 'sync',
}

// ============================================================================
// CHILD ANIMATION DEFAULTS
// ============================================================================

/**
 * Default child animation configuration.
 *
 * Tuned for:
 * - Cascading entry effect
 * - Subtle vertical offset (down 8px)
 * - Fast stagger for responsiveness
 */
export const DEFAULT_CHILD_CONFIG: ChildAnimationConfig = {
  delay: 0,
  stagger: 0.03,
  duration: 0.15,
  ease: 'spring',
  stiffness: 600,
  damping: 35,
  entryDirection: 'down',
  entryDistance: 8,
  entryOrder: 'sequential',
  staggerDirection: 'forward',
  exitDuration: 0.08,
}

// ============================================================================
// STYLE DEFAULTS
// ============================================================================

/**
 * Default style configuration.
 *
 * Uses semantic button variants for clear visual hierarchy:
 * - Parents: tertiary (subtle) → shine (highlighted when expanded)
 * - Children: link-gray (minimal) → link-color (selected)
 * - All: secondary (distinct anchor point)
 */
export const DEFAULT_STYLE_CONFIG: StyleConfig = {
  parentVariant: 'tertiary',
  parentExpandedVariant: 'shine',
  childVariant: 'link-gray',
  childSelectedVariant: 'link-color',
  allButtonVariant: 'secondary',
  allButtonOffset: -8,
  size: 'md',
  roundness: 'default',
  gap: 'md',
  asLink: false,
}

// ============================================================================
// LAYOUT TOKENS
// ============================================================================

/**
 * Gap size mappings to Tailwind classes.
 */
export const GAP_CLASSES: Record<GapSize, string> = {
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
}

/**
 * Fixed height classes per button size.
 * Ensures consistent chip heights regardless of content.
 */
export const SIZE_HEIGHT_CLASSES: Record<ButtonSize, string> = {
  xs: 'h-8',
  sm: 'h-9',
  md: 'h-10',
  lg: 'h-11',
  xl: 'h-12',
}

// ============================================================================
// SPECIAL IDS
// ============================================================================

/**
 * Reserved ID for the "All" anchor button.
 * Always rendered at index 0.
 */
export const ALL_BUTTON_ID = 'all'

// ============================================================================
// DEMO DATA
// ============================================================================

/**
 * Default navigation items for demonstration.
 * Each parent has 3 children for consistent visual testing.
 */
export const DEFAULT_NAV_ITEMS = [
  {
    id: ALL_BUTTON_ID,
    label: 'All',
  },
  {
    id: 'design',
    label: 'Design',
    children: [
      { id: 'figma', label: 'Figma' },
      { id: 'sketch', label: 'Sketch' },
      { id: 'adobe', label: 'Adobe XD' },
    ],
  },
  {
    id: 'develop',
    label: 'Develop',
    children: [
      { id: 'react', label: 'React' },
      { id: 'vue', label: 'Vue' },
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
  {
    id: 'monitor',
    label: 'Monitor',
    children: [
      { id: 'datadog', label: 'Datadog' },
      { id: 'sentry', label: 'Sentry' },
      { id: 'grafana', label: 'Grafana' },
    ],
  },
]

// ============================================================================
// NUMBERING
// ============================================================================

/**
 * Letters for child numbering (a-z).
 * Used for indices like "1a", "1b", "1c".
 */
export const CHILD_LETTERS = 'abcdefghijklmnopqrstuvwxyz'
