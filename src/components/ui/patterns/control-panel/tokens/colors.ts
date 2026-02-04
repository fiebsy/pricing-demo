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
// CSS variable names must match theme.css / theme-delphi.css exactly.
// Pattern: --text-color-{name} for neutral, --text-color-{category}-primary for semantic
// -----------------------------------------------------------------------------

export const SEMANTIC_TEXT_COLORS: SemanticColorOption[] = [
  // Neutral colors (value matches Tailwind class: text-{value})
  { label: 'Primary', value: 'primary', cssVar: '--text-color-primary', category: 'neutral' },
  { label: 'Secondary', value: 'secondary', cssVar: '--text-color-secondary', category: 'neutral' },
  { label: 'Tertiary', value: 'tertiary', cssVar: '--text-color-tertiary', category: 'neutral' },
  { label: 'Quaternary', value: 'quaternary', cssVar: '--text-color-quaternary', category: 'neutral' },
  // Brand colors (Tailwind: text-brand-primary, text-brand-secondary)
  { label: 'Brand', value: 'brand-primary', cssVar: '--text-color-brand-primary', category: 'brand' },
  { label: 'Brand Secondary', value: 'brand-secondary', cssVar: '--text-color-brand-secondary', category: 'brand' },
  // Status colors (Tailwind: text-success-primary, text-warning-primary, text-error-primary)
  { label: 'Success', value: 'success-primary', cssVar: '--text-color-success-primary', category: 'status' },
  { label: 'Warning', value: 'warning-primary', cssVar: '--text-color-warning-primary', category: 'status' },
  { label: 'Error', value: 'error-primary', cssVar: '--text-color-error-primary', category: 'status' },
]

// -----------------------------------------------------------------------------
// Semantic Background Colors
// -----------------------------------------------------------------------------
// CSS variable names must match theme.css / theme-delphi.css exactly.
// Pattern: --background-color-{name} for neutral, --background-color-{category}-primary for semantic
// -----------------------------------------------------------------------------

export const SEMANTIC_BG_COLORS: SemanticColorOption[] = [
  // Neutral colors (value matches Tailwind class: bg-{value})
  { label: 'Primary', value: 'primary', cssVar: '--background-color-primary', category: 'neutral' },
  { label: 'Secondary', value: 'secondary', cssVar: '--background-color-secondary', category: 'neutral' },
  { label: 'Tertiary', value: 'tertiary', cssVar: '--background-color-tertiary', category: 'neutral' },
  { label: 'Quaternary', value: 'quaternary', cssVar: '--background-color-quaternary', category: 'neutral' },
  // Brand colors (Tailwind: bg-brand-primary, bg-brand-secondary, bg-brand-solid)
  { label: 'Brand', value: 'brand-primary', cssVar: '--background-color-brand-primary', category: 'brand' },
  { label: 'Brand Subtle', value: 'brand-secondary', cssVar: '--background-color-brand-secondary', category: 'brand' },
  { label: 'Brand Solid', value: 'brand-solid', cssVar: '--background-color-brand-solid', category: 'brand' },
  // Status colors (Tailwind: bg-success-primary, bg-success-secondary, etc.)
  { label: 'Success', value: 'success-primary', cssVar: '--background-color-success-primary', category: 'status' },
  { label: 'Success Subtle', value: 'success-secondary', cssVar: '--background-color-success-secondary', category: 'status' },
  { label: 'Success Solid', value: 'success-solid', cssVar: '--background-color-success-solid', category: 'status' },
  { label: 'Warning', value: 'warning-primary', cssVar: '--background-color-warning-primary', category: 'status' },
  { label: 'Warning Subtle', value: 'warning-secondary', cssVar: '--background-color-warning-secondary', category: 'status' },
  { label: 'Warning Solid', value: 'warning-solid', cssVar: '--background-color-warning-solid', category: 'status' },
  { label: 'Error', value: 'error-primary', cssVar: '--background-color-error-primary', category: 'status' },
  { label: 'Error Subtle', value: 'error-secondary', cssVar: '--background-color-error-secondary', category: 'status' },
  { label: 'Error Solid', value: 'error-solid', cssVar: '--background-color-error-solid', category: 'status' },
]

// -----------------------------------------------------------------------------
// Semantic Border Colors
// -----------------------------------------------------------------------------
// CSS variable names must match theme.css / theme-delphi.css exactly.
// Note: Only success and error have border color tokens defined.
// -----------------------------------------------------------------------------

export const SEMANTIC_BORDER_COLORS: SemanticColorOption[] = [
  // Neutral colors (value matches Tailwind class: border-{value})
  { label: 'Primary', value: 'primary', cssVar: '--border-color-primary', category: 'neutral' },
  { label: 'Secondary', value: 'secondary', cssVar: '--border-color-secondary', category: 'neutral' },
  { label: 'Tertiary', value: 'tertiary', cssVar: '--border-color-tertiary', category: 'neutral' },
  // Brand colors (Tailwind: border-brand)
  { label: 'Brand', value: 'brand', cssVar: '--border-color-brand', category: 'brand' },
  // Status colors (only error has Tailwind utilities: border-error, border-error_subtle)
  { label: 'Error', value: 'error', cssVar: '--border-color-error', category: 'status' },
  { label: 'Error Subtle', value: 'error_subtle', cssVar: '--border-color-error_subtle', category: 'status' },
]

// -----------------------------------------------------------------------------
// Chart Colors
// -----------------------------------------------------------------------------
// Chart palette colors for data visualization.
// Pattern: --color-chart-{n}-500 for the main color
// -----------------------------------------------------------------------------

export const CHART_PALETTE_COLORS: SemanticColorOption[] = [
  { label: 'Green (Active)', value: '1', cssVar: '--color-chart-1-500', category: 'brand' },
  { label: 'Lavender (At-Risk)', value: '2', cssVar: '--color-chart-2-500', category: 'brand' },
  { label: 'Magenta (Clawback)', value: '3', cssVar: '--color-chart-3-500', category: 'brand' },
  { label: 'Teal (Paid Off)', value: '4', cssVar: '--color-chart-4-500', category: 'brand' },
]

// -----------------------------------------------------------------------------
// Status Colors for Charts (Positive/Negative)
// -----------------------------------------------------------------------------
// Combined status and chart colors for bar chart positive/negative indicators.
// -----------------------------------------------------------------------------

export const BAR_STATUS_COLORS: SemanticColorOption[] = [
  // Neutral colors
  { label: 'Neutral', value: 'neutral', cssVar: '--foreground-color-quaternary', category: 'neutral' },
  { label: 'Neutral Dark', value: 'neutral-dark', cssVar: '--foreground-color-tertiary', category: 'neutral' },
  // Status colors
  { label: 'Success (Green)', value: 'success', cssVar: '--color-success-500', category: 'status' },
  { label: 'Error (Red)', value: 'error', cssVar: '--color-error-500', category: 'status' },
  { label: 'Warning (Amber)', value: 'warning', cssVar: '--color-warning-500', category: 'status' },
  // Chart colors
  { label: 'Chart Green', value: 'chart-1', cssVar: '--color-chart-1-500', category: 'brand' },
  { label: 'Lavender', value: 'chart-2', cssVar: '--color-chart-2-500', category: 'brand' },
  { label: 'Magenta', value: 'chart-3', cssVar: '--color-chart-3-500', category: 'brand' },
  { label: 'Teal', value: 'chart-4', cssVar: '--color-chart-4-500', category: 'brand' },
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
