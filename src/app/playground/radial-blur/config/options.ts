/**
 * Radial Blur Control Panel Options
 */

export const STATE_OPTIONS = [
  { label: 'Collapsed', value: 'collapsed' },
  { label: 'Default (45%)', value: 'default' },
  { label: 'Expanded (Full)', value: 'expanded' },
] as const

export const BLUR_AMOUNT_PRESETS = [
  { label: 'Subtle (4px)', value: 4 },
  { label: 'Light (8px)', value: 8 },
  { label: 'Medium (12px)', value: 12 },
  { label: 'Heavy (16px)', value: 16 },
  { label: 'Extreme (24px)', value: 24 },
] as const

export const BG_COLOR_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Quaternary', value: 'quaternary' },
  { label: 'Brand Primary', value: 'brand-primary' },
  { label: 'Brand Secondary', value: 'brand-secondary' },
] as const

export const SHINE_STYLE_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Shine 0', value: 'shine-0' },
  { label: 'Shine 0 Subtle', value: 'shine-0-subtle' },
  { label: 'Shine 1', value: 'shine-1' },
  { label: 'Shine 1 Subtle', value: 'shine-1-subtle' },
  { label: 'Shine 2', value: 'shine-2' },
  { label: 'Shine 2 Subtle', value: 'shine-2-subtle' },
  { label: 'Shine 3', value: 'shine-3' },
  { label: 'Shine 3 Subtle', value: 'shine-3-subtle' },
  { label: 'Brand', value: 'shine-brand' },
  { label: 'Brand Subtle', value: 'shine-brand-subtle' },
] as const
