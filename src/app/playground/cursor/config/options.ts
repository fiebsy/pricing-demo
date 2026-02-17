/**
 * Cursor Control Panel Options
 *
 * These options populate the control panel dropdowns and sliders.
 */

// ============================================================================
// Mode Options
// ============================================================================

export const MODE_OPTIONS = [
  { label: 'Replace', value: 'replace', description: 'Hide browser cursor' },
  { label: 'Follow', value: 'follow', description: 'Trail behind cursor' },
] as const

// ============================================================================
// Style Options
// ============================================================================

export const BACKGROUND_OPTIONS = [
  { label: 'Neutral', value: 'var(--color-text-secondary)' },
  { label: 'Primary', value: 'var(--color-text-primary)' },
  { label: 'Brand', value: 'var(--color-brand-primary)' },
  { label: 'White', value: '#ffffff' },
  { label: 'Black', value: '#000000' },
  { label: 'Red', value: '#ef4444' },
  { label: 'Blue', value: '#3b82f6' },
  { label: 'Green', value: '#22c55e' },
  { label: 'Purple', value: '#a855f7' },
  { label: 'Orange', value: '#f97316' },
] as const

export const MIX_BLEND_OPTIONS = [
  { label: 'Normal', value: 'normal' },
  { label: 'Difference', value: 'difference' },
  { label: 'Multiply', value: 'multiply' },
  { label: 'Screen', value: 'screen' },
  { label: 'Overlay', value: 'overlay' },
] as const

// ============================================================================
// Size Preset Options (for quick selection)
// ============================================================================

export const SIZE_PRESET_OPTIONS = [
  { label: 'Dot (8px)', value: '8' },
  { label: 'Small (16px)', value: '16' },
  { label: 'Medium (24px)', value: '24' },
  { label: 'Large (32px)', value: '32' },
  { label: 'XL (48px)', value: '48' },
  { label: 'Auto', value: 'auto' },
] as const
