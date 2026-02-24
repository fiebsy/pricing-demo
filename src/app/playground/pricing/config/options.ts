/**
 * Pricing Modal Control Panel Options
 *
 * Option arrays for control panel dropdowns and selects.
 */

// ============================================================================
// Corner Shape Options
// ============================================================================

export const CORNER_SHAPE_OPTIONS = [
  { label: 'Round', value: 'round' },
  { label: 'Squircle', value: 'squircle' },
  { label: 'Bevel', value: 'bevel' },
  { label: 'Scoop', value: 'scoop' },
] as const

// ============================================================================
// Background Options
// ============================================================================

export const BACKGROUND_OPTIONS = [
  { label: 'Primary', value: 'primary', color: 'var(--color-bg-primary)' },
  { label: 'Primary (S1)', value: 'primary_s1', color: 'var(--color-bg-primary_s1)' },
  { label: 'Secondary', value: 'secondary', color: 'var(--color-bg-secondary)' },
  { label: 'Secondary (P1)', value: 'secondary_p1', color: 'var(--color-bg-secondary_p1)' },
  { label: 'Secondary (T1)', value: 'secondary_t1', color: 'var(--color-bg-secondary_t1)' },
  { label: 'Secondary (T2)', value: 'secondary_t2', color: 'var(--color-bg-secondary_t2)' },
  { label: 'Secondary Subtle', value: 'secondary_subtle', color: 'var(--color-bg-secondary_subtle)' },
  { label: 'Tertiary', value: 'tertiary', color: 'var(--color-bg-tertiary)' },
  { label: 'Quaternary', value: 'quaternary', color: 'var(--color-bg-quaternary)' },
] as const

// ============================================================================
// Shine Options
// ============================================================================

export const SHINE_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Shine 0', value: 'shine-0' },
  { label: 'Shine 0 Subtle', value: 'shine-0-subtle' },
  { label: 'Shine 0 Intense', value: 'shine-0-intense' },
  { label: 'Shine 1', value: 'shine-1' },
  { label: 'Shine 1 Subtle', value: 'shine-1-subtle' },
  { label: 'Shine 1 Intense', value: 'shine-1-intense' },
  { label: 'Shine 2', value: 'shine-2' },
  { label: 'Shine 2 Subtle', value: 'shine-2-subtle' },
  { label: 'Shine 2 Intense', value: 'shine-2-intense' },
  { label: 'Shine 3', value: 'shine-3' },
  { label: 'Shine 3 Subtle', value: 'shine-3-subtle' },
  { label: 'Shine 3 Intense', value: 'shine-3-intense' },
] as const

// ============================================================================
// Depth Options
// ============================================================================

export const DEPTH_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Depth 1', value: 'depth-gradient-1' },
  { label: 'Depth 2', value: 'depth-gradient-2' },
  { label: 'Depth 3', value: 'depth-gradient-3' },
] as const

// ============================================================================
// Shadow Options
// ============================================================================

export const SHADOW_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' },
  { label: '2XL', value: '2xl' },
] as const

// ============================================================================
// Border Color Options
// ============================================================================

export const BORDER_COLOR_OPTIONS = [
  { label: 'None', value: 'transparent', color: 'transparent' },
  { label: 'Primary', value: 'border-primary', color: 'var(--color-border-primary)' },
  { label: 'Secondary', value: 'border-secondary', color: 'var(--color-border-secondary)' },
  { label: 'Tertiary', value: 'border-tertiary', color: 'var(--color-border-tertiary)' },
] as const

// ============================================================================
// Text Color Options
// ============================================================================

export const TEXT_COLOR_OPTIONS = [
  { label: 'Primary', value: 'text-primary', color: 'var(--color-text-primary)' },
  { label: 'Secondary', value: 'text-secondary', color: 'var(--color-text-secondary)' },
  { label: 'Tertiary', value: 'text-tertiary', color: 'var(--color-text-tertiary)' },
  { label: 'Quaternary', value: 'text-quaternary', color: 'var(--color-text-quaternary)' },
] as const

// ============================================================================
// Title Size Options
// ============================================================================

export const TITLE_SIZE_OPTIONS = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' },
  { label: '2XL', value: '2xl' },
  { label: '3XL', value: '3xl' },
] as const

// ============================================================================
// Text Size Options (Subheader)
// ============================================================================

export const TEXT_SIZE_OPTIONS = [
  { label: 'Extra Small', value: 'xs' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
] as const

// ============================================================================
// Text Align Options
// ============================================================================

export const TEXT_ALIGN_OPTIONS = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
] as const

// ============================================================================
// Weight Options
// ============================================================================

export const WEIGHT_OPTIONS = [
  { label: 'Light', value: '300' },
  { label: 'Regular', value: '400' },
  { label: 'Medium', value: '500' },
  { label: 'Semibold', value: '600' },
  { label: 'Bold', value: '700' },
  { label: 'Extrabold', value: '800' },
] as const

// ============================================================================
// Separator Position Options
// ============================================================================

export const SEPARATOR_POSITION_OPTIONS = [
  { label: 'After Header', value: 'after-header' },
  { label: 'After Content A', value: 'after-content-a' },
  { label: 'After Content B', value: 'after-content-b' },
] as const

// ============================================================================
// Button Variant Options
// ============================================================================

export const BUTTON_VARIANT_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Primary Destructive', value: 'primary-destructive' },
  { label: 'Secondary Destructive', value: 'secondary-destructive' },
  { label: 'Tertiary Destructive', value: 'tertiary-destructive' },
] as const

// ============================================================================
// Button Size Options
// ============================================================================

export const BUTTON_SIZE_OPTIONS = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
] as const

// ============================================================================
// Close Button Options
// ============================================================================

export const CLOSE_BUTTON_POSITION_OPTIONS = [
  { label: 'Top Right', value: 'top-right' },
  { label: 'Top Left', value: 'top-left' },
] as const

export const CLOSE_BUTTON_SIZE_OPTIONS = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
] as const

export const ICON_STROKE_WIDTH_OPTIONS = [
  { label: 'Light (1)', value: '1' },
  { label: 'Regular (1.5)', value: '1.5' },
  { label: 'Medium (2)', value: '2' },
  { label: 'Semibold (2.5)', value: '2.5' },
  { label: 'Bold (3)', value: '3' },
] as const

export const BACKGROUND_MODE_OPTIONS = [
  { label: 'Always', value: 'always' },
  { label: 'On Hover', value: 'hover' },
  { label: 'None', value: 'none' },
] as const

export const CLOSE_BUTTON_RADIUS_OPTIONS = [
  { label: 'Full (Pill)', value: 'full' },
  { label: 'XL', value: 'xl' },
  { label: 'LG', value: 'lg' },
  { label: 'MD', value: 'md' },
  { label: 'SM', value: 'sm' },
] as const

export const CLOSE_BUTTON_BG_COLOR_OPTIONS = [
  { label: 'Primary', value: 'bg-primary', color: 'var(--color-bg-primary)' },
  { label: 'Secondary', value: 'bg-secondary', color: 'var(--color-bg-secondary)' },
  { label: 'Tertiary', value: 'bg-tertiary', color: 'var(--color-bg-tertiary)' },
  { label: 'Quaternary', value: 'bg-quaternary', color: 'var(--color-bg-quaternary)' },
] as const

// ============================================================================
// Animation Options
// ============================================================================

export const ANIMATION_PRESET_OPTIONS = [
  { label: 'Scale + Fade', value: 'scale-fade' },
  { label: 'Slide Up', value: 'slide-up' },
  { label: 'Slide Down', value: 'slide-down' },
] as const

// ============================================================================
// Page Background Options
// ============================================================================

export const PAGE_BACKGROUND_OPTIONS = [
  { label: 'Primary', value: 'primary', color: 'var(--color-bg-primary)' },
  { label: 'Secondary', value: 'secondary', color: 'var(--color-bg-secondary)' },
  { label: 'Tertiary', value: 'tertiary', color: 'var(--color-bg-tertiary)' },
] as const

// ============================================================================
// Backdrop Options
// ============================================================================

export const BACKDROP_COLOR_OPTIONS = [
  { label: 'Black', value: 'black', color: '#000000' },
  { label: 'White', value: 'white', color: '#ffffff' },
  { label: 'Gray', value: 'gray', color: '#6b7280' },
] as const

// ============================================================================
// Content Type Options
// ============================================================================

export const CONTENT_TYPE_OPTIONS = [
  { label: 'Wireframe', value: 'wireframe' },
  { label: 'Pro Card', value: 'pro-card' },
  { label: 'Checklist', value: 'checklist' },
] as const

// ============================================================================
// Flow Options
// ============================================================================

export const FLOW_OPTIONS = [
  { label: 'Flow A', value: 'flow-a' },
  { label: 'Flow B', value: 'flow-b' },
  { label: 'Flow C', value: 'flow-c' },
] as const

// ============================================================================
// Pro Card Options
// ============================================================================

export const PRO_CARD_TEXT_STYLE_OPTIONS = [
  { label: 'Arcade Blue', value: 'arcade-blue' },
  { label: 'Ocean Depth', value: 'ocean-depth' },
  { label: 'Frost', value: 'frost' },
  { label: 'Electric', value: 'electric' },
  { label: 'Primary', value: 'text-primary' },
  { label: 'Secondary', value: 'text-secondary' },
  { label: 'Tertiary', value: 'text-tertiary' },
] as const

export const PRO_CARD_BACKGROUND_OPTIONS = [
  { label: 'Primary', value: 'primary', color: 'var(--color-bg-primary)' },
  { label: 'Secondary', value: 'secondary', color: 'var(--color-bg-secondary)' },
  { label: 'Tertiary', value: 'tertiary', color: 'var(--color-bg-tertiary)' },
  { label: 'Transparent', value: 'transparent', color: 'transparent' },
] as const

export const GLOW_COLOR_OPTIONS = [
  { label: 'Sky 300', value: 'sky-300', color: '#7dd3fc' },
  { label: 'Sky 400', value: 'sky-400', color: '#38bdf8' },
  { label: 'Blue 400', value: 'blue-400', color: '#60a5fa' },
  { label: 'Blue 500', value: 'blue-500', color: '#3b82f6' },
  { label: 'White', value: 'white', color: '#ffffff' },
] as const

export const PRO_CARD_FONT_WEIGHT_OPTIONS = [
  { label: 'Medium', value: '500' },
  { label: 'Semibold', value: '600' },
  { label: 'Bold', value: '700' },
  { label: 'Extrabold', value: '800' },
  { label: 'Black', value: '900' },
] as const

// ============================================================================
// Coin Stack Options
// ============================================================================

export const COIN_STACK_PRESET_OPTIONS = [
  { label: 'Classic', value: 'default' },
  { label: 'Arcade Blue Solid', value: 'arcade-blue-solid' },
  { label: 'Arcade Blue', value: 'arcade-blue' },
] as const

export const COIN_STACK_ALIGNMENT_OPTIONS = [
  { label: 'Center', value: 'center' },
  { label: 'Left', value: 'left' },
] as const

export const COIN_STACK_SIZE_MODE_OPTIONS = [
  { label: 'Padding', value: 'padding' },
  { label: 'Fixed Square', value: 'fixed' },
] as const

export const ASSET_BACKGROUND_OPTIONS = [
  { label: 'None', value: 'none', color: 'transparent' },
  { label: 'Primary', value: 'primary', color: 'var(--color-bg-primary)' },
  { label: 'Secondary', value: 'secondary', color: 'var(--color-bg-secondary)' },
  { label: 'Tertiary', value: 'tertiary', color: 'var(--color-bg-tertiary)' },
] as const

// Coin stack specific depth options (using actual CSS utilities)
export const COIN_STACK_DEPTH_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Subtle', value: 'subtle-depth-20-primary' },
  { label: 'Light', value: 'subtle-depth-30-primary' },
  { label: 'Medium', value: 'subtle-depth-40-primary' },
  { label: 'Strong', value: 'subtle-depth-50-primary' },
] as const

// ============================================================================
// Pricing Select Menu Options
// ============================================================================

export const PRICING_SELECT_BACKGROUND_OPTIONS = [
  { label: 'Primary', value: 'primary', color: 'var(--color-bg-primary)' },
  { label: 'Secondary', value: 'secondary', color: 'var(--color-bg-secondary)' },
  { label: 'Tertiary', value: 'tertiary', color: 'var(--color-bg-tertiary)' },
  { label: 'Quaternary', value: 'quaternary', color: 'var(--color-bg-quaternary)' },
] as const

export const PRICING_SELECT_BORDER_RADIUS_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' },
  { label: '2XL', value: '2xl' },
] as const

export const PRICING_SELECT_EASING_OPTIONS = [
  { label: 'Expo Out', value: 'expo-out' },
  { label: 'Ease Out', value: 'ease-out' },
  { label: 'Ease In Out', value: 'ease-in-out' },
  { label: 'Cubic Out', value: 'cubic-out' },
  { label: 'Quart Out', value: 'quart-out' },
  { label: 'Back Out', value: 'back-out' },
  { label: 'Linear', value: 'linear' },
] as const

export const PRICING_SELECT_GRADIENT_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Subtle (Small)', value: 'subtle-depth-sm' },
  { label: 'Subtle (Medium)', value: 'subtle-depth-md' },
  { label: 'Subtle (Large)', value: 'subtle-depth-lg' },
] as const

export const PRICING_SELECT_GRADIENT_COLOR_OPTIONS = [
  { label: 'Brand', value: 'brand', color: 'var(--color-brand-primary)' },
  { label: 'Primary', value: 'primary', color: 'var(--color-bg-primary)' },
  { label: 'Secondary', value: 'secondary', color: 'var(--color-bg-secondary)' },
  { label: 'Tertiary', value: 'tertiary', color: 'var(--color-bg-tertiary)' },
  { label: 'Gray', value: 'gray', color: 'var(--color-gray-500)' },
  { label: 'Gray Light', value: 'gray-light', color: 'var(--color-gray-300)' },
] as const

export const PRICING_SELECT_BORDER_COLOR_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
] as const

// ============================================================================
// Content A Header Options
// ============================================================================

export const CONTENT_A_HEADER_SIZE_OPTIONS = [
  { label: 'Extra Small', value: 'xs' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
] as const

// ============================================================================
// Checklist Options
// ============================================================================

export const CHECKLIST_ITEM_GAP_OPTIONS = [
  { label: 'Tight (8px)', value: 'tight' },
  { label: 'Normal (12px)', value: 'normal' },
  { label: 'Relaxed (16px)', value: 'relaxed' },
  { label: 'Loose (20px)', value: 'loose' },
] as const

export const CHECKLIST_TEXT_SIZE_OPTIONS = [
  { label: 'Extra Small', value: 'xs' },
  { label: 'Small', value: 'sm' },
  { label: 'Base', value: 'base' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' },
] as const

export const CHECKLIST_TEXT_WEIGHT_OPTIONS = [
  { label: 'Normal', value: 'normal' },
  { label: 'Medium', value: 'medium' },
  { label: 'Semibold', value: 'semibold' },
  { label: 'Bold', value: 'bold' },
] as const

export const CHECKLIST_COLOR_OPTIONS = [
  { label: 'Primary', value: 'primary', color: 'var(--color-text-primary)' },
  { label: 'Secondary', value: 'secondary', color: 'var(--color-text-secondary)' },
  { label: 'Tertiary', value: 'tertiary', color: 'var(--color-text-tertiary)' },
  { label: 'Accent', value: 'accent', color: 'var(--color-brand-primary)' },
] as const

export const CHECKLIST_ICON_SIZE_OPTIONS = [
  { label: 'Small (14px)', value: 'sm' },
  { label: 'Base (16px)', value: 'base' },
  { label: 'Large (20px)', value: 'lg' },
] as const

export const CHECKLIST_ICON_WEIGHT_OPTIONS = [
  { label: 'Stroke', value: 'stroke' },
  { label: 'Solid', value: 'solid' },
  { label: 'Duotone', value: 'duotone' },
] as const

export const CHECKLIST_ICON_COLOR_OPTIONS = [
  { label: 'Inherit', value: 'inherit', color: 'var(--color-text-primary)' },
  { label: 'Primary', value: 'primary', color: 'var(--color-text-primary)' },
  { label: 'Secondary', value: 'secondary', color: 'var(--color-text-secondary)' },
  { label: 'Tertiary', value: 'tertiary', color: 'var(--color-text-tertiary)' },
  { label: 'Accent', value: 'accent', color: 'var(--color-brand-primary)' },
] as const

// ============================================================================
// Radial Flare Options
// ============================================================================

export const RADIAL_FLARE_COLOR_OPTIONS = [
  { label: 'White', value: 'white', color: '#ffffff' },
  { label: 'Gray 200', value: 'gray-200', color: '#e5e7eb' },
  { label: 'Gray 300', value: 'gray-300', color: '#d1d5db' },
  { label: 'Gray 400', value: 'gray-400', color: '#9ca3af' },
  { label: 'Blue 400', value: 'blue-400', color: '#60a5fa' },
  { label: 'Blue 500', value: 'blue-500', color: '#3b82f6' },
  { label: 'Blue 600', value: 'blue-600', color: '#2563eb' },
  { label: 'Sky 400', value: 'sky-400', color: '#38bdf8' },
  { label: 'Sky 500', value: 'sky-500', color: '#0ea5e9' },
] as const

// ============================================================================
// Decoration Options
// ============================================================================

export const NOISE_BLEND_MODE_OPTIONS = [
  { label: 'Overlay', value: 'overlay' },
  { label: 'Soft Light', value: 'soft-light' },
  { label: 'Multiply', value: 'multiply' },
  { label: 'Screen', value: 'screen' },
] as const
