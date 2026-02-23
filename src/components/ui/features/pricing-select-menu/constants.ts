/**
 * Pricing Select Menu - Constants
 *
 * Default configuration values for the pricing select menu.
 */

import type {
  PricingSelectMenuConfig,
  AnimationConfig,
  LayoutConfig,
  TriggerSlotConfig,
  BottomSlotConfig,
  TextColorOption,
  FontWeightOption,
  FontSizeOption,
  OpacityOption,
  VerticalAlignOption,
  BadgeColor,
  BackgroundOption,
} from './types'

// ============================================================================
// EASING
// ============================================================================

export const EASING_EXPO_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'

// ============================================================================
// DEFAULT ANIMATION CONFIG
// ============================================================================

export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  duration: 300,
  collapseDuration: 150,
  contentFadeDuration: 0,
  contentFadeDelay: 0,
  animateSlotContainers: false,
  slotContainerDelay: 0,
  slotContainerDurationOffset: 100,
  expandOrigin: 'top',
}

// ============================================================================
// DEFAULT LAYOUT CONFIG
// ============================================================================

export const DEFAULT_LAYOUT_CONFIG: LayoutConfig = {
  triggerWidth: 320,
  triggerHeight: 88,
  panelWidth: 320,
  maxBottomHeight: 220,
  borderRadius: 16,
  bottomGap: 0,
}

// ============================================================================
// DEFAULT SLOT CONFIGS
// ============================================================================

export const DEFAULT_TRIGGER_SLOT_CONFIG: TriggerSlotConfig = {
  background: 'none',
  inset: 0,
}

export const DEFAULT_BOTTOM_SLOT_CONFIG: BottomSlotConfig = {
  enabled: true,
  heightMode: 'dynamic',
  height: 200,
  scrollable: true,
  background: 'primary',
  shine: 'none',
  borderRadius: 12,
  inset: 4,
  borderWidth: 1,
  borderColor: 'secondary',
}

// ============================================================================
// COMPLETE DEFAULT CONFIG
// ============================================================================

export const DEFAULT_PRICING_SELECT_MENU_CONFIG: PricingSelectMenuConfig = {
  animation: DEFAULT_ANIMATION_CONFIG,
  layout: DEFAULT_LAYOUT_CONFIG,
  appearance: {
    borderRadius: 'xl',
    shadow: 'lg',
    shine: 'shine-1-subtle',
    background: 'secondary',
    gradient: 'subtle-depth-sm',
    gradientColor: 'secondary',
    squircle: false,
  },
  triggerSlot: DEFAULT_TRIGGER_SLOT_CONFIG,
  bottomSlot: DEFAULT_BOTTOM_SLOT_CONFIG,
  debug: false,
}

// ============================================================================
// STYLE MAPPING CONSTANTS
// ============================================================================

export const TEXT_COLOR_CLASSES: Record<TextColorOption, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  brand: 'text-brand-primary',
}

export const FONT_WEIGHT_CLASSES: Record<FontWeightOption, string> = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
}

export const FONT_SIZE_CLASSES: Record<FontSizeOption, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
}

export const OPACITY_VALUES: Record<OpacityOption, number> = {
  '100': 1,
  '80': 0.8,
  '60': 0.6,
  '40': 0.4,
}

export const VERTICAL_ALIGN_CLASSES: Record<VerticalAlignOption, string> = {
  baseline: 'items-baseline',
  center: 'items-center',
  bottom: 'items-end',
}

export const BADGE_COLOR_CLASSES: Record<BadgeColor, string> = {
  gray: 'bg-quaternary text-secondary',
  brand: 'bg-brand-secondary text-brand-primary',
  success: 'bg-success-secondary text-success-primary',
  warning: 'bg-warning-secondary text-warning-primary',
  error: 'bg-error-secondary text-error-primary',
}

export const HOVER_BACKGROUND_CLASSES: Record<BackgroundOption, string> = {
  none: '',
  primary: 'hover:bg-primary',
  secondary: 'hover:bg-secondary',
  tertiary: 'hover:bg-tertiary',
  quaternary: 'hover:bg-quaternary',
}

export const BACKGROUND_CLASSES: Record<BackgroundOption, string> = {
  none: '',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  quaternary: 'bg-quaternary',
}

export const GROUP_HOVER_BACKGROUND_CLASSES: Record<BackgroundOption, string> = {
  none: '',
  primary: 'group-hover/panel:bg-primary',
  secondary: 'group-hover/panel:bg-secondary',
  tertiary: 'group-hover/panel:bg-tertiary',
  quaternary: 'group-hover/panel:bg-quaternary',
}
