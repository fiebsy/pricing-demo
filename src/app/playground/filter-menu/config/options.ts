/**
 * Filter Menu Control Panel Options
 *
 * These options map directly to the FilterTrigger and Menu component props.
 */

// ============================================================================
// Trigger Options
// ============================================================================

export const TRIGGER_MODE_OPTIONS = [
  { label: 'Icon + Text', value: 'icon-text' },
  { label: 'Icon Only', value: 'icon-only' },
] as const

export const TRIGGER_VARIANT_OPTIONS = [
  { label: 'Default (Shine)', value: 'default' },
  { label: 'Ghost', value: 'ghost' },
  { label: 'Outline', value: 'outline' },
] as const

export const TRIGGER_SIZE_OPTIONS = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
] as const

export const TRIGGER_ROUNDED_OPTIONS = [
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' },
  { label: 'Full (Pill)', value: 'full' },
] as const

export const TRIGGER_ICON_OPTIONS = [
  { label: 'Add', value: 'add-01' },
  { label: 'Filter', value: 'filter' },
  { label: 'Filter Add', value: 'filter-add' },
  { label: 'Filter Mail', value: 'filter-mail-circle' },
  { label: 'Filter Horizontal', value: 'filter-horizontal' },
] as const

// ============================================================================
// Menu Position Options
// ============================================================================

export const MENU_SIDE_OPTIONS = [
  { label: 'Bottom', value: 'bottom' },
  { label: 'Top', value: 'top' },
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
] as const

export const MENU_ALIGN_OPTIONS = [
  { label: 'Start', value: 'start' },
  { label: 'Center', value: 'center' },
  { label: 'End', value: 'end' },
] as const

// ============================================================================
// Menu Appearance Options
// ============================================================================

export const BORDER_RADIUS_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' },
  { label: '2XL', value: '2xl' },
] as const

export const SHADOW_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' },
  { label: '2XL', value: '2xl' },
] as const

export const SHINE_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Shine 0', value: 'shine-0' },
  { label: 'Shine 0 Subtle', value: 'shine-0-subtle' },
  { label: 'Shine 1', value: 'shine-1' },
  { label: 'Shine 1 Subtle', value: 'shine-1-subtle' },
  { label: 'Shine 2', value: 'shine-2' },
  { label: 'Shine 2 Subtle', value: 'shine-2-subtle' },
  { label: 'Brand', value: 'shine-brand' },
  { label: 'Brand Subtle', value: 'shine-brand-subtle' },
] as const

export const BACKGROUND_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Quaternary', value: 'quaternary' },
] as const

export const GRADIENT_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Subtle Depth SM', value: 'subtle-depth-sm' },
  { label: 'Subtle Depth MD', value: 'subtle-depth-md' },
  { label: 'Subtle Depth LG', value: 'subtle-depth-lg' },
  { label: 'Subtle Depth XL', value: 'subtle-depth-xl' },
] as const

// ============================================================================
// Animation Options (Spring-only)
// ============================================================================

export const SPRING_PRESET_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Snappy', value: 'snappy' },
  { label: 'Smooth', value: 'smooth' },
  { label: 'Bouncy', value: 'bouncy' },
  { label: 'Custom', value: 'custom' },
] as const
