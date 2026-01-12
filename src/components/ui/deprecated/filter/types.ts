/**
 * Filter Component Type Definitions
 *
 * Animation Architecture Reference:
 * ─────────────────────────────────
 * Container 1:  Menu.Popup (outer wrapper with border, shadow)
 * Container 1A: Root menu panel (home/parent menu)
 * Container 1B: Submenu panel (1B1 = Notifications, 1B2 = Invite Users, etc.)
 *
 * Panel Navigation (1A ↔ 1B) involves three synchronized animations:
 * 1. Slide (translateX) - S-Tier, GPU-accelerated
 * 2. Height (Container 1 grows/shrinks) - B-Tier, layout recalc
 * 3. Opacity crossfade (1A fades out, 1B fades in) - S-Tier
 *
 * @module base-ui/filter/types
 */

import type { MenuAppearanceConfig } from '@/components/ui/deprecated/base/menu'

// Re-export shared types from constants
export type { ChipSize, ChipRounding, ChipGap, ChipSizeConfig } from './constants'

// Re-export from components
export type { ExpandingFilterChipProps, RevealMode } from './components'

// ============================================================================
// Filter Menu Styling Configuration
// ============================================================================

export interface FilterMenuStylingConfig {
  // Container 1 Styling (outer wrapper)
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  borderStyle: 'border' | 'shine'
  shineOption:
    | 'shine-0' | 'shine-0-subtle' | 'shine-0-intense'
    | 'shine-1' | 'shine-1-subtle' | 'shine-1-intense'
    | 'shine-2' | 'shine-2-subtle' | 'shine-2-intense'
    | 'shine-3' | 'shine-3-subtle' | 'shine-3-intense'
    | 'shine-brand' | 'shine-brand-subtle' | 'shine-brand-intense'
  cornerSquircle: boolean
  menuWidth: number

  // Position (where Container 1 appears relative to trigger)
  side: 'top' | 'right' | 'bottom' | 'left'
  align: 'start' | 'center' | 'end'
  sideOffset: number
  alignOffset: number

  // Separator Styling
  separatorOpacity: number
  separatorColor: 'primary' | 'secondary' | 'tertiary' | 'brand' | 'inverted'

  // Item Styling (menu items in 1A and 1B)
  itemRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  itemSquircle: boolean
  iconOpacity: number
  itemHoverColor: 'secondary' | 'tertiary' | 'quaternary' | 'brand-subtle' | 'none'

  // Background & Effects (Container 1)
  backgroundColor: string
  backgroundGradient: string
  gradientColor: string

  // Panel Navigation Animation (1A ↔ 1B)
  /** Main duration for panel transitions (slide + height) in ms */
  panelTransitionDuration: number
  /** Easing curve for panel transitions */
  panelTransitionEasing: string
  /** Whether to animate Container 1 height when switching panels */
  heightAnimationEnabled: boolean
  /** Whether to crossfade opacity between 1A and 1B */
  opacityCrossfadeEnabled: boolean
  /**
   * Opacity duration as ratio of panel duration (0.05 - 1.5)
   * Lower = faster fade, creating more overlap effect
   * Higher = slower fade, can exceed slide duration
   * Default: 0.8 (80% of panel duration)
   */
  opacityDurationRatio: number

  // Legacy (kept for backwards compatibility, maps to panel settings)
  /** @deprecated Use panelTransitionDuration instead */
  slideTransitionDuration: number
  /** @deprecated Use panelTransitionEasing instead */
  slideTransitionEasing: string
  /** @deprecated Height now syncs with panel transition */
  heightTransitionDuration: number
  /** @deprecated Height now syncs with panel transition */
  heightTransitionEasing: string
}

// ============================================================================
// Filter Menu Preset
// ============================================================================

export interface FilterMenuPreset {
  id: string
  name: string
  config: FilterMenuStylingConfig
  appearance: MenuAppearanceConfig
}

// ============================================================================
// Chip Style Preset
// ============================================================================

export type ChipShineType = 'none' | '0' | '1' | '2' | '3' | 'brand'
export type ChipShineIntensity = 'subtle' | 'normal' | 'intense'
export type ChipShadowSize = 'none' | 'xs' | 'sm' | 'md' | 'lg'
export type ChipBackground =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'brand-solid'
  | 'brand-primary'
  | 'brand-secondary'
  | 'error-primary'
  | 'warning-primary'
  | 'success-primary'
export type ChipCloseIconType = 'multiplication' | 'cancel-solid' | 'cancel-bulk'

export type ChipDepthIntensity = 'none' | '10' | '20' | '30' | '40' | '50'
export type ChipDepthColor = 'primary' | 'brand' | 'secondary'
export type ChipDepthDirection = 'bottom' | 'left' | 'right' | 'top'

/** ChipRevealMode - Maps to RevealMode in use-chip-animation.ts */
export type ChipRevealMode = 'fade' | 'delay' | 'sync' | 'instant' | 'none'

export interface ChipStyleConfig {
  // Size & Shape (maps to SIZE_CONFIG keys)
  size: 'xs' | 'sm' | 'default' | 'md' | 'lg' | 'xl'
  rounded: 'none' | 'sm' | 'default' | 'md' | 'lg' | 'xl' | 'full'
  gap: 'none' | 'xs' | 'sm' | 'default' | 'md' | 'lg'
  // Visual
  shine: ChipShineType
  shineIntensity: ChipShineIntensity
  shadow: ChipShadowSize
  background: ChipBackground
  border: boolean
  // Depth gradient
  depthIntensity: ChipDepthIntensity
  depthColor: ChipDepthColor
  depthDirection: ChipDepthDirection
  // Spacing overrides (pixels)
  paddingLeft: number
  paddingRight: number
  iconValueGap: number
  itemGap: number
  // Icon sizing (pixels)
  iconSize: number
  closeIconSize: number
  closeIconType: ChipCloseIconType
  leftIconOpacity: number // 0-100
  // Display
  useIcon: boolean
  // Animation
  noScaleAnimation: boolean
  duration: number // ms
  revealMode: ChipRevealMode
  opacityFadeRatio: number // 0.1 - 1.0
}

export interface ChipStylePreset {
  id: string
  name: string
  config: ChipStyleConfig
}

// ============================================================================
// Filter Trigger Button Configuration
// ============================================================================

export type FilterTriggerShineType = '0' | '1' | '2' | '3' | 'brand' | 'none'
export type FilterTriggerShineIntensity = 'subtle' | 'normal' | 'intense'
export type FilterTriggerBackground = 'primary' | 'secondary' | 'tertiary' | 'quaternary'
export type FilterTriggerRounding = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
export type FilterTriggerFontWeight = 'normal' | 'medium' | 'semibold' | 'bold'

export interface FilterTriggerStyleConfig {
  /** Shine effect level */
  shine: FilterTriggerShineType
  /** Shine intensity */
  shineIntensity: FilterTriggerShineIntensity
  /** Background color class */
  background: FilterTriggerBackground
  /** Background hover color class */
  backgroundHover: FilterTriggerBackground
  /** Show border */
  border: boolean
  /** Button height in pixels */
  height: number
  /** Border radius style */
  rounded: FilterTriggerRounding
  /** Horizontal padding in pixels */
  paddingX: number
  /** Text color class */
  textColor: 'primary' | 'secondary' | 'tertiary' | 'quaternary'
  /** Text hover color class */
  textColorHover: 'primary' | 'secondary' | 'tertiary' | 'quaternary'
  /** Font weight */
  fontWeight: FilterTriggerFontWeight
  /** Icon size in pixels */
  iconSize: number
  /** Icon stroke width */
  iconStrokeWidth: number
  /** Icon color class */
  iconColor: 'primary' | 'secondary' | 'tertiary' | 'quaternary'
}

export interface FilterTriggerStylePreset {
  id: string
  name: string
  config: FilterTriggerStyleConfig
}

// ============================================================================
// Hugeicon Type (shared)
// ============================================================================

/** Hugeicon component type - accepts both stroke (function) and bulk/solid (array data) formats */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HugeIconComponent = any
