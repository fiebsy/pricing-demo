/**
 * Question Command Menu - Control Panel Options
 *
 * These options map directly to our semantic token system.
 * See: src/styles/docs/reference/all-utilities.md
 */

// ============================================================================
// BACKGROUND OPTIONS
// ============================================================================

export const BACKGROUND_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Quaternary', value: 'quaternary' },
] as const

export const BACKGROUND_WITH_NONE_OPTIONS = [
  { label: 'None', value: 'none' },
  ...BACKGROUND_OPTIONS,
] as const

// ============================================================================
// APPEARANCE OPTIONS
// ============================================================================

export const SHINE_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Shine 1', value: 'shine-1' },
  { label: 'Shine 1 Subtle', value: 'shine-1-subtle' },
  { label: 'Shine 2', value: 'shine-2' },
  { label: 'Shine 2 Subtle', value: 'shine-2-subtle' },
  { label: 'Shine 3', value: 'shine-3' },
  { label: 'Brand', value: 'shine-brand' },
] as const

export const SHADOW_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'XL', value: 'xl' },
  { label: '2XL', value: '2xl' },
] as const

export const BORDER_RADIUS_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'XL', value: 'xl' },
  { label: '2XL', value: '2xl' },
] as const

export const GRADIENT_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Subtle SM', value: 'subtle-depth-sm' },
  { label: 'Subtle MD', value: 'subtle-depth-md' },
  { label: 'Subtle LG', value: 'subtle-depth-lg' },
  { label: 'Subtle XL', value: 'subtle-depth-xl' },
] as const

export const GRADIENT_COLOR_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Brand', value: 'brand' },
  { label: 'Gray', value: 'gray' },
] as const

// ============================================================================
// BORDER OPTIONS
// ============================================================================

export const BORDER_COLOR_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Quaternary', value: 'quaternary' },
  { label: 'Brand', value: 'brand' },
] as const

// ============================================================================
// ANIMATION OPTIONS
// ============================================================================

export const BACKDROP_MODE_OPTIONS = [
  { label: 'Size (Original)', value: 'size' },
  { label: 'Clip-Path (Sync)', value: 'clip-path' },
] as const

export const EXPAND_ORIGIN_OPTIONS = [
  { label: 'Top', value: 'top' },
  { label: 'Center', value: 'center' },
  { label: 'Bottom', value: 'bottom' },
] as const

// ============================================================================
// TRIGGER OPTIONS
// ============================================================================

export const CURSOR_OPTIONS = [
  { label: 'Text', value: 'text' },
  { label: 'Pointer', value: 'pointer' },
] as const

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
] as const

export const BUTTON_SIZE_OPTIONS = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
] as const

export const BUTTON_ROUNDNESS_OPTIONS = [
  { label: 'Default (rounded-xl)', value: 'default' },
  { label: 'Pill (fully round)', value: 'pill' },
  { label: 'Squircle', value: 'squircle' },
] as const

// ============================================================================
// TOP SECTION OPTIONS
// ============================================================================

export const TOP_SECTION_CONTENT_OPTIONS = [
  { label: 'Filters', value: 'filters' },
  { label: 'Questions (Scrollable)', value: 'questions' },
  { label: 'Breadcrumbs', value: 'breadcrumbs' },
  { label: 'Tabs', value: 'tabs' },
  { label: 'Custom', value: 'custom' },
] as const

// ============================================================================
// BOTTOM SECTION OPTIONS
// ============================================================================

export const BOTTOM_SECTION_CONTENT_OPTIONS = [
  { label: 'Questions (Scrollable)', value: 'questions' },
  { label: 'Filters', value: 'filters' },
  { label: 'Buttons', value: 'buttons' },
  { label: 'Custom', value: 'custom' },
] as const

// ============================================================================
// ICON OPTIONS (for button configuration)
// ============================================================================

export const ICON_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Search', value: 'search' },
  { label: 'Add', value: 'add' },
  { label: 'Send', value: 'send' },
  { label: 'Check', value: 'check' },
  { label: 'Close', value: 'close' },
  { label: 'Refresh', value: 'refresh' },
  { label: 'Settings', value: 'settings' },
  { label: 'Edit', value: 'edit' },
  { label: 'Delete', value: 'delete' },
  { label: 'Sparkle', value: 'sparkle' },
  { label: 'Arrow Right', value: 'arrow-right' },
  { label: 'Arrow Up', value: 'arrow-up' },
] as const
