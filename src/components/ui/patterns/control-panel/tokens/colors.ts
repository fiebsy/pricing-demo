// =============================================================================
// Color Token Constants
// =============================================================================
// Semantic color options for control panel dropdowns.
// Includes CSS variable references for resolution.
// =============================================================================

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface SemanticColorOption {
  label: string
  value: string
  cssVar: string
  category?: 'neutral' | 'brand' | 'status'
  description?: string
}

// -----------------------------------------------------------------------------
// Semantic Text Colors
// -----------------------------------------------------------------------------

export const SEMANTIC_TEXT_COLORS: SemanticColorOption[] = [
  // Neutral colors
  { label: 'Primary', value: 'primary', cssVar: '--text-color-primary', category: 'neutral' },
  { label: 'Secondary', value: 'secondary', cssVar: '--text-color-secondary', category: 'neutral' },
  { label: 'Tertiary', value: 'tertiary', cssVar: '--text-color-tertiary', category: 'neutral' },
  { label: 'Quaternary', value: 'quaternary', cssVar: '--text-color-quaternary', category: 'neutral' },
  { label: 'Disabled', value: 'disabled', cssVar: '--text-color-disabled', category: 'neutral' },
  { label: 'Placeholder', value: 'placeholder', cssVar: '--text-color-placeholder', category: 'neutral' },
  // Brand colors
  { label: 'Brand', value: 'brand', cssVar: '--text-color-brand', category: 'brand' },
  { label: 'Brand Secondary', value: 'brand-secondary', cssVar: '--text-color-brand-secondary', category: 'brand' },
  // Status colors
  { label: 'Success', value: 'success', cssVar: '--text-color-success', category: 'status' },
  { label: 'Warning', value: 'warning', cssVar: '--text-color-warning', category: 'status' },
  { label: 'Error', value: 'error', cssVar: '--text-color-error', category: 'status' },
  { label: 'Info', value: 'info', cssVar: '--text-color-info', category: 'status' },
]

// -----------------------------------------------------------------------------
// Semantic Background Colors
// -----------------------------------------------------------------------------

export const SEMANTIC_BG_COLORS: SemanticColorOption[] = [
  // Neutral colors
  { label: 'Primary', value: 'primary', cssVar: '--bg-color-primary', category: 'neutral' },
  { label: 'Secondary', value: 'secondary', cssVar: '--bg-color-secondary', category: 'neutral' },
  { label: 'Tertiary', value: 'tertiary', cssVar: '--bg-color-tertiary', category: 'neutral' },
  { label: 'Quaternary', value: 'quaternary', cssVar: '--bg-color-quaternary', category: 'neutral' },
  { label: 'Elevated', value: 'elevated', cssVar: '--bg-color-elevated', category: 'neutral' },
  { label: 'Overlay', value: 'overlay', cssVar: '--bg-color-overlay', category: 'neutral' },
  // Brand colors
  { label: 'Brand', value: 'brand', cssVar: '--bg-color-brand', category: 'brand' },
  { label: 'Brand Subtle', value: 'brand-subtle', cssVar: '--bg-color-brand-subtle', category: 'brand' },
  // Status colors
  { label: 'Success', value: 'success', cssVar: '--bg-color-success', category: 'status' },
  { label: 'Success Subtle', value: 'success-subtle', cssVar: '--bg-color-success-subtle', category: 'status' },
  { label: 'Warning', value: 'warning', cssVar: '--bg-color-warning', category: 'status' },
  { label: 'Warning Subtle', value: 'warning-subtle', cssVar: '--bg-color-warning-subtle', category: 'status' },
  { label: 'Error', value: 'error', cssVar: '--bg-color-error', category: 'status' },
  { label: 'Error Subtle', value: 'error-subtle', cssVar: '--bg-color-error-subtle', category: 'status' },
  { label: 'Info', value: 'info', cssVar: '--bg-color-info', category: 'status' },
  { label: 'Info Subtle', value: 'info-subtle', cssVar: '--bg-color-info-subtle', category: 'status' },
]

// -----------------------------------------------------------------------------
// Semantic Border Colors
// -----------------------------------------------------------------------------

export const SEMANTIC_BORDER_COLORS: SemanticColorOption[] = [
  // Neutral colors
  { label: 'Primary', value: 'primary', cssVar: '--border-color-primary', category: 'neutral' },
  { label: 'Secondary', value: 'secondary', cssVar: '--border-color-secondary', category: 'neutral' },
  { label: 'Tertiary', value: 'tertiary', cssVar: '--border-color-tertiary', category: 'neutral' },
  // Brand colors
  { label: 'Brand', value: 'brand', cssVar: '--border-color-brand', category: 'brand' },
  // Status colors
  { label: 'Success', value: 'success', cssVar: '--border-color-success', category: 'status' },
  { label: 'Warning', value: 'warning', cssVar: '--border-color-warning', category: 'status' },
  { label: 'Error', value: 'error', cssVar: '--border-color-error', category: 'status' },
  { label: 'Info', value: 'info', cssVar: '--border-color-info', category: 'status' },
]

// -----------------------------------------------------------------------------
// Utility Functions
// -----------------------------------------------------------------------------

/** Get color options grouped by category */
export function getColorsByCategory(colors: SemanticColorOption[]) {
  return {
    neutral: colors.filter((c) => c.category === 'neutral'),
    brand: colors.filter((c) => c.category === 'brand'),
    status: colors.filter((c) => c.category === 'status'),
  }
}

/** Convert semantic color options to select control format */
export function toSelectOptions(colors: SemanticColorOption[]) {
  return colors.map((c) => ({
    label: c.label,
    value: c.value,
    color: `var(${c.cssVar})`,
    description: c.description,
  }))
}
