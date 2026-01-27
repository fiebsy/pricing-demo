/**
 * Question Command Menu V3 - Button Options
 *
 * Options for all button-related configurations.
 */

export const BUTTON_POSITION_OPTIONS = [
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
] as const

export const BUTTON_TYPE_OPTIONS = [
  { label: 'Icon Only', value: 'icon' },
  { label: 'Text Only', value: 'text' },
  { label: 'Icon + Text', value: 'icon-text' },
  { label: 'Indicator (non-interactive)', value: 'indicator' },
] as const

export const BUTTON_VARIANT_OPTIONS = [
  { label: 'Primary (Solid Brand)', value: 'primary' },
  { label: 'Secondary (Outlined)', value: 'secondary' },
  { label: 'Tertiary (Minimal)', value: 'tertiary' },
  { label: 'Shine (Gradient)', value: 'shine' },
  { label: 'Primary Destructive', value: 'primary-destructive' },
  { label: 'Secondary Destructive', value: 'secondary-destructive' },
  { label: 'Tertiary Destructive', value: 'tertiary-destructive' },
] as const

export const BUTTON_SIZE_OPTIONS = [
  { label: 'Extra Small', value: 'xs' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
] as const

export const ACTION_BUTTON_SIZE_OPTIONS = [
  { label: 'Extra Small', value: 'xs' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
] as const

export const BUTTON_ROUNDNESS_OPTIONS = [
  { label: 'Default (rounded-xl)', value: 'default' },
  { label: 'Pill (fully round)', value: 'pill' },
  { label: 'Squircle', value: 'squircle' },
] as const

export const BUTTON_SHOW_WHEN_OPTIONS = [
  { label: 'Always', value: 'always' },
  { label: 'Only When Expanded', value: 'expanded' },
  { label: 'Only When Collapsed', value: 'collapsed' },
] as const

export const ACTION_BUTTON_VARIANT_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Shine', value: 'shine' },
] as const

export const BUTTONS_DIRECTION_OPTIONS = [
  { label: 'Horizontal', value: 'horizontal' },
  { label: 'Vertical', value: 'vertical' },
] as const
