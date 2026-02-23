/**
 * Modal Control Panel Options
 *
 * These options populate the control panel dropdowns and selects.
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
  { label: 'Secondary', value: 'secondary', color: 'var(--color-bg-secondary)' },
  { label: 'Tertiary', value: 'tertiary', color: 'var(--color-bg-tertiary)' },
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
// Drop Shadow Options (CSS filter: drop-shadow)
// ============================================================================

export const DROP_SHADOW_OPTIONS = [
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
] as const

// ============================================================================
// Text Size Options
// ============================================================================

export const TEXT_SIZE_OPTIONS = [
  { label: 'Extra Small', value: 'xs' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
] as const

// ============================================================================
// Weight Options
// ============================================================================

export const WEIGHT_OPTIONS = [
  { label: 'Regular', value: '400' },
  { label: 'Medium', value: '500' },
  { label: 'Semibold', value: '600' },
  { label: 'Bold', value: '700' },
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
// Button Count Options
// ============================================================================

export const BUTTON_COUNT_OPTIONS = [
  { label: '1 Button', value: '1' },
  { label: '2 Buttons', value: '2' },
] as const

// ============================================================================
// Button Layout Options
// ============================================================================

export const BUTTON_LAYOUT_OPTIONS = [
  { label: 'Horizontal', value: 'horizontal' },
  { label: 'Horizontal Reverse', value: 'horizontal-reverse' },
  { label: 'Vertical', value: 'vertical' },
] as const

// ============================================================================
// Button Radius Options
// ============================================================================

export const BUTTON_RADIUS_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Sync to Modal', value: 'sync' },
] as const

// ============================================================================
// Close Button Position Options
// ============================================================================

export const CLOSE_BUTTON_POSITION_OPTIONS = [
  { label: 'Top Right', value: 'top-right' },
  { label: 'Top Left', value: 'top-left' },
] as const

// ============================================================================
// Close Button Size Options
// ============================================================================

export const CLOSE_BUTTON_SIZE_OPTIONS = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
] as const

// ============================================================================
// Close Button Icon Stroke Width Options
// ============================================================================

export const ICON_STROKE_WIDTH_OPTIONS = [
  { label: 'Light (1)', value: '1' },
  { label: 'Regular (1.5)', value: '1.5' },
  { label: 'Medium (2)', value: '2' },
  { label: 'Semibold (2.5)', value: '2.5' },
  { label: 'Bold (3)', value: '3' },
] as const

// ============================================================================
// Close Button Background Mode Options
// ============================================================================

export const BACKGROUND_MODE_OPTIONS = [
  { label: 'Always', value: 'always' },
  { label: 'On Hover', value: 'hover' },
  { label: 'None', value: 'none' },
] as const

// ============================================================================
// Close Button Radius Options
// ============================================================================

export const CLOSE_BUTTON_RADIUS_OPTIONS = [
  { label: 'Full (Pill)', value: 'full' },
  { label: 'XL', value: 'xl' },
  { label: 'LG', value: 'lg' },
  { label: 'MD', value: 'md' },
  { label: 'SM', value: 'sm' },
] as const

// ============================================================================
// Close Button Background Color Options
// ============================================================================

export const CLOSE_BUTTON_BG_COLOR_OPTIONS = [
  { label: 'Primary', value: 'bg-primary', color: 'var(--color-bg-primary)' },
  { label: 'Secondary', value: 'bg-secondary', color: 'var(--color-bg-secondary)' },
  { label: 'Tertiary', value: 'bg-tertiary', color: 'var(--color-bg-tertiary)' },
  { label: 'Quaternary', value: 'bg-quaternary', color: 'var(--color-bg-quaternary)' },
] as const

// ============================================================================
// Animation Preset Options
// ============================================================================

export const ANIMATION_PRESET_OPTIONS = [
  { label: 'Scale + Fade', value: 'scale-fade', description: 'Classic modal animation' },
  { label: 'Slide Up', value: 'slide-up', description: 'Slide from bottom' },
  { label: 'Slide Down', value: 'slide-down', description: 'Slide from top' },
  { label: 'Flip 3D', value: 'flip-3d', description: 'Dramatic 3D flip' },
  { label: 'Bounce', value: 'bounce', description: 'Playful bounce effect' },
  { label: 'Custom', value: 'custom', description: 'Define your own' },
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
// Text Transition Options
// ============================================================================

export const TEXT_TRANSITION_MODE_OPTIONS = [
  { label: 'Crossfade', value: 'crossfade', description: 'Overlapping enter/exit' },
  { label: 'Flip', value: 'flip', description: 'Sequential exit then enter' },
] as const

export const TEXT_EASING_OPTIONS = [
  { label: 'Spring', value: 'spring', description: 'Physics-based spring' },
  { label: 'Elastic', value: 'elastic', description: 'Elastic bounce (0.25, 1, 0.5, 1)' },
  { label: 'Expo Out', value: 'expo-out', description: 'Exponential ease out' },
  { label: 'Ease Out', value: 'ease-out', description: 'Standard ease out' },
] as const

// ============================================================================
// Content Type Options (for per-stage content slots)
// ============================================================================

export const CONTENT_TYPE_OPTIONS = [
  { label: 'Wireframe', value: 'wireframe' },
  { label: 'Text', value: 'text' },
  { label: 'Pro Card', value: 'pro-card' },
  { label: 'Checklist', value: 'checklist' },
] as const

// ============================================================================
// Pro Card Options
// ============================================================================

export const PRO_CARD_GRADIENT_OPTIONS = [
  { label: 'Arcade Blue', value: 'arcade-blue' },
  { label: 'Ocean Depth', value: 'ocean-depth' },
  { label: 'Frost', value: 'frost' },
  { label: 'Electric', value: 'electric' },
] as const

/** Combined text style options: gradients + semantic tokens */
export const PRO_CARD_TEXT_STYLE_OPTIONS = [
  // Gradients
  { label: 'Arcade Blue', value: 'arcade-blue' },
  { label: 'Ocean Depth', value: 'ocean-depth' },
  { label: 'Frost', value: 'frost' },
  { label: 'Electric', value: 'electric' },
  // Semantic Tokens
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

// ============================================================================
// Pro Card Text Options
// ============================================================================

export const PRO_CARD_FONT_WEIGHT_OPTIONS = [
  { label: 'Medium', value: '500' },
  { label: 'Semibold', value: '600' },
  { label: 'Bold', value: '700' },
  { label: 'Extrabold', value: '800' },
  { label: 'Black', value: '900' },
] as const

export const PRO_CARD_LETTER_SPACING_OPTIONS = [
  { label: 'Tighter', value: '-0.05' },
  { label: 'Tight', value: '-0.025' },
  { label: 'Normal', value: '0' },
  { label: 'Wide', value: '0.025' },
  { label: 'Wider', value: '0.05' },
] as const

// ============================================================================
// Layout Animation Options
// ============================================================================

export const LAYOUT_ANIMATION_STYLE_OPTIONS = [
  { label: 'Spring', value: 'spring', description: 'Physics-based spring' },
  { label: 'Tween', value: 'tween', description: 'Duration-based easing' },
] as const

export const LAYOUT_EASING_OPTIONS = [
  { label: 'Ease Out', value: 'easeOut' },
  { label: 'Ease In Out', value: 'easeInOut' },
  { label: 'Linear', value: 'linear' },
] as const

// ============================================================================
// Animation Sync Mode Options
// ============================================================================

export const ANIMATION_SYNC_MODE_OPTIONS = [
  { label: 'Independent', value: 'independent', description: 'Separate timing for each system' },
  { label: 'Synced', value: 'synced', description: 'Unified timing for all animations' },
] as const

// ============================================================================
// Fluid Button Options
// ============================================================================

export const FLUID_TIMING_OPTIONS = [
  { label: 'Default', value: 'default', description: 'Balanced timing (250ms collapse, 525ms expand)' },
  { label: 'Snappy', value: 'snappy', description: 'Quick, responsive feel (150ms collapse, 300ms expand)' },
  { label: 'Smooth', value: 'smooth', description: 'Slower, more deliberate (400ms collapse, 700ms expand)' },
  { label: 'Synced', value: 'synced', description: 'Derives timing from modal master config' },
] as const

export const CHECKMARK_STYLE_OPTIONS = [
  { label: 'Draw', value: 'draw', description: 'Animated SVG path draw' },
  { label: 'Flip', value: 'flip', description: 'Slide in with container' },
] as const

// ============================================================================
// Asset Type Options
// ============================================================================

export const ASSET_TYPE_OPTIONS = [
  { label: 'Placeholder', value: 'placeholder' },
  { label: 'Coin Stack', value: 'coin-stack' },
] as const

// ============================================================================
// Coin Stack State Options
// ============================================================================

export const COIN_STACK_STATE_OPTIONS = [
  { label: 'Classic (Black/White)', value: '1' },
  { label: 'Arcade Blue Solid', value: '2' },
] as const

// ============================================================================
// Asset Alignment Options
// ============================================================================

export const ASSET_ALIGNMENT_OPTIONS = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
] as const
