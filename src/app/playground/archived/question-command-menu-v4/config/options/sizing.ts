/**
 * Question Command Menu V4 - Sizing Options
 *
 * Options for height mode, border radius, and cursor style.
 * Note: Named 'sizing' instead of 'layout' to avoid Next.js App Router reserved name conflict.
 */

export const HEIGHT_MODE_OPTIONS = [
  { label: 'Fixed', value: 'fixed' },
  { label: 'Dynamic (auto-size)', value: 'dynamic' },
  { label: 'Auto (measure content)', value: 'auto' },
] as const

export const BORDER_RADIUS_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'XL', value: 'xl' },
  { label: '2XL', value: '2xl' },
] as const

export const CURSOR_OPTIONS = [
  { label: 'Text', value: 'text' },
  { label: 'Pointer', value: 'pointer' },
] as const

export const TRIGGER_MODE_OPTIONS = [
  { label: 'Input Mode', value: 'input' },
  { label: 'Question Mode', value: 'question' },
  { label: 'Display Mode', value: 'display' },
] as const
