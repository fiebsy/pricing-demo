/**
 * Unified Control Panel V2 - Type Definitions
 *
 * Streamlined types optimized for scalability and Base UI integration.
 */

import type { ReactNode } from 'react'

// =============================================================================
// Control Types
// =============================================================================

export interface BaseControl {
  id: string
  label: string
  description?: string
  disabled?: boolean
}

export interface SliderControl extends BaseControl {
  type: 'slider'
  value: number
  min: number
  max: number
  step: number
  formatLabel?: (value: number) => string
}

export interface SelectOption {
  label: string
  value: string
  color?: string
  description?: string
}

export interface SelectControl extends BaseControl {
  type: 'select'
  value: string
  options: SelectOption[]
  showColorSwatch?: boolean
}

export interface CheckboxControl extends BaseControl {
  type: 'checkbox'
  value: boolean
}

export interface ToggleControl extends BaseControl {
  type: 'toggle'
  value: boolean
}

export interface ColorControl extends BaseControl {
  type: 'color'
  value: string
  showValue?: boolean
}

export interface ColorSelectControl extends BaseControl {
  type: 'color-select'
  value: string
  options: SelectOption[]
  swatchSize?: 'xs' | 'sm' | 'md'
}

export interface TextControl extends BaseControl {
  type: 'text'
  value: string
  placeholder?: string
  maxLength?: number
}

export interface CustomControl extends BaseControl {
  type: 'custom'
  render: () => ReactNode
}

export type Control =
  | SliderControl
  | SelectControl
  | CheckboxControl
  | ToggleControl
  | ColorControl
  | ColorSelectControl
  | TextControl
  | CustomControl

// =============================================================================
// Section Types
// =============================================================================

export interface ControlGroup {
  title?: string
  description?: string
  controls: Control[]
  columns?: 1 | 2 | 3 | 4
  collapsible?: boolean
  defaultCollapsed?: boolean
}

export interface Section {
  id: string
  label: string
  title?: string
  groups: ControlGroup[]
  defaultCollapsed?: boolean
  collapsedHeight?: number
}

// =============================================================================
// Preset Types
// =============================================================================

export interface Preset<T = unknown> {
  id: string
  name: string
  data: T
}

export interface PresetConfig<T = unknown> {
  presets: Preset<T>[]
  activePresetId: string | null
  showCopyButton?: boolean
  copyLabel?: string
}

// =============================================================================
// Panel Configuration
// =============================================================================

export interface PanelPosition {
  top?: string
  bottom?: string
  right?: string
  width?: string
}

export interface PanelConfig {
  sections: Section[]
  defaultActiveTab?: string
  position?: PanelPosition
  showReset?: boolean
  resetLabel?: string
  presetConfig?: PresetConfig
  title?: string
  minimizedTitle?: string
  defaultMinimized?: boolean
}

// =============================================================================
// Event Types
// =============================================================================

export interface ControlChangeEvent {
  controlId: string
  sectionId: string
  value: unknown
}

// =============================================================================
// Component Props
// =============================================================================

export interface UnifiedControlPanelV2Props<T = unknown> {
  config: PanelConfig
  onChange: (event: ControlChangeEvent) => void
  onReset?: () => void
  onPresetChange?: (presetId: string) => void
  getConfigForCopy?: () => T
  className?: string
}

// =============================================================================
// Context Types
// =============================================================================

export interface PanelState {
  isMinimized: boolean
  activeTab: string
}

export interface PanelActions {
  minimize: () => void
  expand: () => void
  toggle: () => void
  setActiveTab: (tab: string) => void
}
