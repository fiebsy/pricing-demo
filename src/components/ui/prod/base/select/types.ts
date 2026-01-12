/**
 * Select - Type Definitions
 *
 * Types for the Select component, styled to match the Menu component.
 * Uses Base UI Select primitive for accessibility and functionality.
 *
 * @module prod/base/select/types
 */

import type { ReactNode, ComponentType } from 'react'

// ============================================================================
// Option Types
// ============================================================================

/** Icon component type */
export type IconType = ComponentType<{ className?: string }>

/** A selectable option in the dropdown */
export interface SelectOption {
  /** Unique value for this option */
  value: string
  /** Display label */
  label: string
  /** Optional icon */
  icon?: IconType
  /** Whether this option is disabled */
  disabled?: boolean
  /** Optional description shown below label */
  description?: string
}

/** Group of options with a label */
export interface SelectOptionGroup {
  type: 'group'
  /** Group label */
  label: string
  /** Options in this group */
  options: SelectOption[]
}

/** Visual separator between options */
export interface SelectSeparator {
  type: 'separator'
  id: string
}

/** Union of all option types */
export type SelectItem = SelectOption | SelectOptionGroup | SelectSeparator

// ============================================================================
// Position Types (reused from Menu)
// ============================================================================

export type SelectSide = 'top' | 'right' | 'bottom' | 'left'
export type SelectAlign = 'start' | 'center' | 'end'

// ============================================================================
// Appearance Types (reused from Menu)
// ============================================================================

export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type Shadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type ShineVariant =
  | 'none'
  | 'shine-0' | 'shine-0-subtle' | 'shine-0-intense'
  | 'shine-1' | 'shine-1-subtle' | 'shine-1-intense'
  | 'shine-2' | 'shine-2-subtle' | 'shine-2-intense'
  | 'shine-3' | 'shine-3-subtle' | 'shine-3-intense'
  | 'shine-brand' | 'shine-brand-subtle' | 'shine-brand-intense'
export type Background = 'primary' | 'secondary' | 'tertiary' | 'quaternary'
export type GradientPattern =
  | 'none'
  | 'subtle-depth-sm' | 'subtle-depth-md' | 'subtle-depth-lg' | 'subtle-depth-xl'
export type GradientColor =
  | 'brand' | 'primary' | 'secondary' | 'tertiary'
  | 'gray' | 'gray-light'

/** Appearance configuration for the select popup */
export interface SelectAppearance {
  borderRadius?: BorderRadius
  shadow?: Shadow
  shine?: ShineVariant
  background?: Background
  gradient?: GradientPattern
  gradientColor?: GradientColor
  squircle?: boolean
}

// ============================================================================
// Component Props
// ============================================================================

export interface SelectProps {
  /** Options to display */
  options: SelectItem[]
  /** Currently selected value */
  value?: string
  /** Default value (uncontrolled) */
  defaultValue?: string
  /** Callback when value changes */
  onValueChange?: (value: string) => void
  /** Placeholder text when no value selected */
  placeholder?: string
  /** Custom trigger element (replaces default button) */
  trigger?: ReactNode
  /** Select width in pixels */
  width?: number
  /** Popup width (defaults to trigger width) */
  popupWidth?: number | 'trigger'
  /** Position relative to trigger */
  side?: SelectSide
  /** Alignment relative to trigger */
  align?: SelectAlign
  /** Offset from trigger (pixels) */
  sideOffset?: number
  /** Offset along alignment axis (pixels) */
  alignOffset?: number
  /** Whether the select is disabled */
  disabled?: boolean
  /** Whether the select is required */
  required?: boolean
  /** Form field name */
  name?: string
  /** Callback when popup opens/closes */
  onOpenChange?: (open: boolean) => void
  /** Appearance overrides */
  appearance?: SelectAppearance
  /** Additional className for popup */
  className?: string
  /** Additional className for trigger */
  triggerClassName?: string
  /** aria-label for accessibility */
  'aria-label'?: string
}

/** Props for individual option items */
export interface SelectOptionProps {
  option: SelectOption
}
