/**
 * Skwircle Demo Types
 *
 * Type definitions for all component configurations
 */

// =============================================================================
// SHARED TYPES
// =============================================================================

export type RoundnessPreset = 'none' | 'subtle' | 'moderate' | 'rounded' | 'pill'
export type ElevationPreset = 'none' | 'xs' | 'sm'
export type DepthIntensity = 'none' | '3' | '5' | '10' | '15' | '20' | '25' | '30'
export type DepthDirection = 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left' | 'top-left'

// =============================================================================
// BUTTON TYPES
// =============================================================================

export type ButtonIntent = 'primary' | 'secondary' | 'ghost' | 'error'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface ButtonConfig {
  intent: ButtonIntent
  size: ButtonSize
  roundness: RoundnessPreset
  label: string
  showIcon: boolean
  iconOnly: boolean
  ring: boolean
  ringOpacity: number
  borderWidth: number
}

// =============================================================================
// INPUT TYPES
// =============================================================================

export type InputState = 'default' | 'focused' | 'error' | 'disabled'

export interface InputConfig {
  roundness: RoundnessPreset
  state: InputState
  placeholder: string
  value: string
  showIcon: boolean
  ring: boolean
  ringColor: string
  ringWidth: number
}

// =============================================================================
// BADGE TYPES
// =============================================================================

export type BadgeType = 'badge' | 'pill'
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'
export type BadgeColor = 'gray' | 'brand' | 'success' | 'warning' | 'error' | 'blue' | 'indigo' | 'purple' | 'orange'

export interface BadgeConfig {
  type: BadgeType
  size: BadgeSize
  color: BadgeColor
  roundness: RoundnessPreset
  label: string
  showIcon: boolean
}

// =============================================================================
// CARD TYPES
// =============================================================================

export type CardIntent = 'default' | 'primary' | 'success' | 'warning' | 'error'

export interface CardConfig {
  intent: CardIntent
  elevation: ElevationPreset
  roundness: RoundnessPreset
  fillMode: boolean
  // Depth
  depthIntensity: DepthIntensity
  depthDirection: DepthDirection
  // Background override
  backgroundColor: string | null
  backgroundColorHover: string | null
  // Border override
  borderColor: string | null
  borderWidth: number
  // Ring
  ring: boolean
  ringColor: string
  ringWidth: number
  ringOpacity: number
}

// =============================================================================
// DASHBOARD TYPES
// =============================================================================

export interface DashboardConfig {
  intent: CardIntent
  elevation: ElevationPreset
  roundness: RoundnessPreset
  fillMode: boolean
  // Depth
  depthIntensity: DepthIntensity
  depthDirection: DepthDirection
  // Border
  borderColor: string | null
  borderWidth: number
  // Ring
  ring: boolean
  ringColor: string
  ringWidth: number
  ringOpacity: number
}

// =============================================================================
// DEMO TABS
// =============================================================================

export type DemoTab = 'button' | 'input' | 'badge' | 'card' | 'dashboard'
