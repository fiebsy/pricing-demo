/**
 * Skwircle Button Configuration
 *
 * Size, icon, and styling configurations for the button variant.
 * Matches badge pattern with muted icon opacity.
 */

// =============================================================================
// BUTTON SIZE CONFIGURATION
// =============================================================================

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface ButtonSizeConfig {
  /** Horizontal padding */
  paddingX: number
  /** Vertical padding */
  paddingY: number
  /** Left padding when button has a leading icon (reduced for visual balance) */
  paddingLeftWithLeadingIcon: number
  /** Space between icon and text */
  gap: number
  /** Tailwind text size class (includes leading-none for tight bounds) */
  textClass: string
  /** Icon size in pixels */
  iconSize: number
  /** Icon stroke width */
  iconStroke: number
  /** Icon-only padding (square buttons) */
  iconOnlyPadding: number
}

/**
 * Size configuration for buttons.
 * Uses leading-none for pixel-perfect text alignment.
 */
export const BUTTON_SIZE_CONFIGS: Record<ButtonSize, ButtonSizeConfig> = {
  xs: {
    paddingX: 10,
    paddingY: 6,
    paddingLeftWithLeadingIcon: 6,
    gap: 4,
    textClass: 'text-xs leading-none',
    iconSize: 14,
    iconStroke: 2,
    iconOnlyPadding: 6,
  },
  sm: {
    paddingX: 12,
    paddingY: 8,
    paddingLeftWithLeadingIcon: 7,
    gap: 4,
    textClass: 'text-sm leading-none',
    iconSize: 16,
    iconStroke: 2,
    iconOnlyPadding: 8,
  },
  md: {
    paddingX: 14,
    paddingY: 10,
    paddingLeftWithLeadingIcon: 8,
    gap: 6,
    textClass: 'text-sm leading-none',
    iconSize: 18,
    iconStroke: 2,
    iconOnlyPadding: 10,
  },
  lg: {
    paddingX: 16,
    paddingY: 12,
    paddingLeftWithLeadingIcon: 10,
    gap: 6,
    textClass: 'text-md leading-none',
    iconSize: 20,
    iconStroke: 2,
    iconOnlyPadding: 12,
  },
  xl: {
    paddingX: 20,
    paddingY: 14,
    paddingLeftWithLeadingIcon: 12,
    gap: 8,
    textClass: 'text-md leading-none',
    iconSize: 20,
    iconStroke: 2,
    iconOnlyPadding: 14,
  },
}

// =============================================================================
// BUTTON INTENT CONFIGURATION
// =============================================================================

export type ButtonIntent = 'primary' | 'secondary' | 'ghost' | 'error'

export interface ButtonIntentConfig {
  /** Text color class */
  textColor: string
  /** Text color on hover */
  textColorHover?: string
  /** Icon opacity at rest (0.55 for muted) */
  iconOpacity: number
  /** Icon opacity on hover (1.0 for full visibility) */
  iconOpacityHover: number
}

/**
 * Intent configuration for buttons.
 * Icons use 55% opacity at rest, restore to 100% on hover.
 */
export const BUTTON_INTENT_CONFIGS: Record<ButtonIntent, ButtonIntentConfig> = {
  primary: {
    textColor: 'text-primary_on-brand',
    iconOpacity: 0.55,
    iconOpacityHover: 1.0,
  },
  secondary: {
    textColor: 'text-primary',
    iconOpacity: 0.55,
    iconOpacityHover: 1.0,
  },
  ghost: {
    textColor: 'text-tertiary',
    textColorHover: 'text-tertiary_hover',
    iconOpacity: 0.55,
    iconOpacityHover: 1.0,
  },
  error: {
    textColor: 'text-primary_on-brand',
    iconOpacity: 0.55,
    iconOpacityHover: 1.0,
  },
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get size configuration for a button.
 */
export const getButtonSizeConfig = (size: ButtonSize): ButtonSizeConfig => {
  return BUTTON_SIZE_CONFIGS[size]
}

/**
 * Get intent configuration for a button.
 */
export const getButtonIntentConfig = (intent: ButtonIntent): ButtonIntentConfig => {
  return BUTTON_INTENT_CONFIGS[intent]
}

/**
 * Get icon style with opacity for muted appearance.
 * Returns both base style and Tailwind class for hover transition.
 * Uses `group-hover:` since Skwircle parent has `group` class.
 */
export const getButtonIconStyle = (intent: ButtonIntent): { style: React.CSSProperties; className: string } => {
  const config = BUTTON_INTENT_CONFIGS[intent]
  return {
    style: {
      opacity: config.iconOpacity,
      transition: 'opacity 100ms linear',
    },
    className: 'group-hover:opacity-100',
  }
}

/**
 * Get padding style for a button.
 * @param size - Button size
 * @param iconOnly - Whether the button only contains an icon
 * @param hasLeadingIcon - Whether the button has a leading icon (reduces left padding)
 */
export const getButtonPaddingStyle = (
  size: ButtonSize,
  iconOnly: boolean = false,
  hasLeadingIcon: boolean = false
): React.CSSProperties => {
  const config = BUTTON_SIZE_CONFIGS[size]

  if (iconOnly) {
    return {
      padding: `${config.iconOnlyPadding}px`,
    }
  }

  return {
    paddingLeft: hasLeadingIcon
      ? `${config.paddingLeftWithLeadingIcon}px`
      : `${config.paddingX}px`,
    paddingRight: `${config.paddingX}px`,
    paddingTop: `${config.paddingY}px`,
    paddingBottom: `${config.paddingY}px`,
    gap: `${config.gap}px`,
  }
}
