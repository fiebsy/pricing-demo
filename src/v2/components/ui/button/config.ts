import type { ButtonSize, ButtonHierarchy, ButtonColorConfig } from './types'

/**
 * Size configuration for buttons
 * Following Untitled UI pattern: consistent 20px icons (size-5), asymmetric padding
 * Note: Badges use 12px icons, Buttons use 20px icons (matching Untitled UI standards)
 */
export const BUTTON_SIZE_CONFIG: Record<
  ButtonSize,
  {
    padding: {
      icon: number // Icon side padding (left for leading, right for trailing)
      text: number // Text side padding (right for leading, left for trailing)
      vertical: number // Top and bottom padding
    }
    gap: number // Space between icon and text
    textSize: string // Tailwind text size class
    iconSize: number // Icon size in pixels (consistent 20px across all sizes - Untitled UI standard)
    iconStroke: number // Icon stroke width
  }
> = {
  sm: {
    padding: { icon: 8, text: 12, vertical: 8 },
    gap: 6,
    textSize: 'text-sm',
    iconSize: 20, // Matches Untitled UI (size-5 = 20px)
    iconStroke: 2,
  },
  md: {
    padding: { icon: 10, text: 14, vertical: 10 },
    gap: 6,
    textSize: 'text-sm',
    iconSize: 20, // Same as sm (Untitled UI pattern)
    iconStroke: 2,
  },
  lg: {
    padding: { icon: 12, text: 16, vertical: 10 },
    gap: 8,
    textSize: 'text-md',
    iconSize: 20, // Same as sm/md (Untitled UI pattern)
    iconStroke: 2,
  },
  xl: {
    padding: { icon: 14, text: 18, vertical: 12 },
    gap: 8,
    textSize: 'text-md',
    iconSize: 20, // Same as sm/md/lg (Untitled UI pattern)
    iconStroke: 2,
  },
}

/**
 * Hierarchy configuration for button visual styles
 */
export const BUTTON_HIERARCHY_CONFIG: Record<
  ButtonHierarchy,
  {
    roundness: 0 | 1 | 2 | 3 | 4 | 5
    shadow: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    borderWidth: number
    useSquircle: boolean // Link variants don't use Squircle
  }
> = {
  primary: {
    roundness: 2,
    shadow: 'xs',
    borderWidth: 1,
    useSquircle: true,
  },
  secondary: {
    roundness: 2,
    shadow: 'xs',
    borderWidth: 1,
    useSquircle: true,
  },
  tertiary: {
    roundness: 2,
    shadow: 'none',
    borderWidth: 0,
    useSquircle: true,
  },
  'link-gray': {
    roundness: 2,
    shadow: 'none',
    borderWidth: 0,
    useSquircle: false, // Text-only, no Squircle needed
  },
  'link-color': {
    roundness: 2,
    shadow: 'none',
    borderWidth: 0,
    useSquircle: false, // Text-only, no Squircle needed
  },
  'primary-destructive': {
    roundness: 2,
    shadow: 'xs',
    borderWidth: 1,
    useSquircle: true,
  },
  'secondary-destructive': {
    roundness: 2,
    shadow: 'xs',
    borderWidth: 1,
    useSquircle: true,
  },
  'tertiary-destructive': {
    roundness: 2,
    shadow: 'none',
    borderWidth: 0,
    useSquircle: true,
  },
  'link-destructive': {
    roundness: 2,
    shadow: 'none',
    borderWidth: 0,
    useSquircle: false, // Text-only, no Squircle needed
  },
}

/**
 * Color configuration using semantic tokens
 * CRITICAL: Must use semantic tokens (not utility tokens) for dark mode support
 * Emulates Untitled UI button colors perfectly
 */
export const BUTTON_COLOR_CONFIG: Record<ButtonHierarchy, ButtonColorConfig> = {
  primary: {
    backgroundColor: 'background-color-brand-solid',
    backgroundHover: 'background-color-brand-solid_hover',
    backgroundActive: 'background-color-brand-solid_hover',
    backgroundDisabled: 'background-color-disabled',
    borderColor: 'transparent', // Untitled UI uses transparent (no visible border)
    borderHover: 'transparent',
    textColor: 'white', // Pure white text on brand background
    textHover: 'white',
    textDisabled: 'text-color-disabled',
    iconColor: 'button-primary-icon', // Untitled UI token (without text- prefix)
    iconHover: 'button-primary-icon_hover',
    focusRing: 'outline-color-brand',
  },
  secondary: {
    backgroundColor: 'background-color-primary',
    backgroundHover: 'background-color-primary_hover',
    backgroundActive: 'background-color-primary_hover',
    backgroundDisabled: 'background-color-primary',
    borderColor: 'border-color-primary',
    borderHover: 'border-color-primary',
    textColor: 'text-color-secondary',
    textHover: 'text-color-secondary_hover',
    textDisabled: 'text-color-disabled',
    iconColor: 'fg-quaternary', // Untitled UI token (without text- prefix)
    iconHover: 'fg-quaternary_hover',
    focusRing: 'outline-color-primary',
  },
  tertiary: {
    backgroundColor: 'transparent',
    backgroundHover: 'background-color-primary_hover',
    backgroundActive: 'background-color-primary_hover',
    backgroundDisabled: 'transparent',
    borderColor: 'transparent',
    borderHover: 'transparent',
    textColor: 'text-color-tertiary',
    textHover: 'text-color-tertiary_hover',
    textDisabled: 'text-color-disabled',
    iconColor: 'fg-quaternary', // Untitled UI token (without text- prefix)
    iconHover: 'fg-quaternary_hover',
    focusRing: 'outline-color-primary',
  },
  'link-gray': {
    backgroundColor: 'transparent',
    backgroundHover: 'transparent',
    backgroundActive: 'transparent',
    backgroundDisabled: 'transparent',
    borderColor: 'transparent',
    borderHover: 'transparent',
    textColor: 'text-color-tertiary',
    textHover: 'text-color-tertiary_hover',
    textDisabled: 'text-color-disabled',
    iconColor: 'fg-quaternary', // Untitled UI token (without text- prefix)
    iconHover: 'fg-quaternary_hover',
    focusRing: 'outline-color-primary',
  },
  'link-color': {
    backgroundColor: 'transparent',
    backgroundHover: 'transparent',
    backgroundActive: 'transparent',
    backgroundDisabled: 'transparent',
    borderColor: 'transparent',
    borderHover: 'transparent',
    textColor: 'text-color-brand-secondary',
    textHover: 'text-color-brand-secondary_hover',
    textDisabled: 'text-color-disabled',
    iconColor: 'fg-brand-secondary_alt', // Untitled UI token (without text- prefix)
    iconHover: 'fg-brand-secondary_hover',
    focusRing: 'outline-color-brand',
  },
  'primary-destructive': {
    backgroundColor: 'background-color-error-solid',
    backgroundHover: 'background-color-error-solid_hover',
    backgroundActive: 'background-color-error-solid_hover',
    backgroundDisabled: 'background-color-disabled',
    borderColor: 'transparent',
    borderHover: 'transparent',
    textColor: 'white', // Pure white text on error background
    textHover: 'white',
    textDisabled: 'text-color-disabled',
    iconColor: 'button-destructive-primary-icon', // Untitled UI token (without text- prefix)
    iconHover: 'button-destructive-primary-icon_hover',
    focusRing: 'outline-color-error',
  },
  'secondary-destructive': {
    backgroundColor: 'background-color-primary',
    backgroundHover: 'background-color-error-primary',
    backgroundActive: 'background-color-error-primary',
    backgroundDisabled: 'background-color-primary',
    borderColor: 'border-color-error_subtle',
    borderHover: 'border-color-error', // Changes to prominent error border on hover
    textColor: 'text-color-error-primary',
    textHover: 'text-color-error-primary_hover',
    textDisabled: 'text-color-disabled',
    iconColor: 'fg-error-secondary', // Untitled UI token (without text- prefix)
    iconHover: 'fg-error-primary',
    focusRing: 'outline-color-error',
  },
  'tertiary-destructive': {
    backgroundColor: 'transparent',
    backgroundHover: 'background-color-error-primary',
    backgroundActive: 'background-color-error-primary',
    backgroundDisabled: 'transparent',
    borderColor: 'transparent',
    borderHover: 'transparent',
    textColor: 'text-color-error-primary',
    textHover: 'text-color-error-primary_hover',
    textDisabled: 'text-color-disabled',
    iconColor: 'fg-error-secondary', // Untitled UI token (without text- prefix)
    iconHover: 'fg-error-primary',
    focusRing: 'outline-color-error',
  },
  'link-destructive': {
    backgroundColor: 'transparent',
    backgroundHover: 'transparent',
    backgroundActive: 'transparent',
    backgroundDisabled: 'transparent',
    borderColor: 'transparent',
    borderHover: 'transparent',
    textColor: 'text-color-error-primary',
    textHover: 'text-color-error-primary_hover',
    textDisabled: 'text-color-disabled',
    iconColor: 'fg-error-secondary', // Untitled UI token (without text- prefix)
    iconHover: 'fg-error-primary',
    focusRing: 'outline-color-error',
  },
}

/**
 * Get effective roundness for a button
 */
export const getButtonRoundness = (
  hierarchy: ButtonHierarchy,
  override?: 0 | 1 | 2 | 3 | 4 | 5
): 0 | 1 | 2 | 3 | 4 | 5 => {
  return override !== undefined ? override : BUTTON_HIERARCHY_CONFIG[hierarchy].roundness
}

/**
 * Get effective shadow for a button
 * Maps shadow values to Squircle's supported values (only 'none', 'xs', 'sm' supported)
 */
export const getButtonShadow = (
  hierarchy: ButtonHierarchy,
  override?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
): 'none' | 'xs' | 'sm' => {
  const shadow = override !== undefined ? override : BUTTON_HIERARCHY_CONFIG[hierarchy].shadow
  // Map unsupported shadow values to 'sm' (Squircle only supports none/xs/sm)
  if (shadow === 'md' || shadow === 'lg' || shadow === 'xl' || shadow === '2xl') {
    return 'sm'
  }
  return shadow as 'none' | 'xs' | 'sm'
}
