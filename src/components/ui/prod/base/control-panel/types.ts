// =============================================================================
// Unified Control Panel - Type Definitions
// =============================================================================
// Simplified, streamlined types optimized for scalability and ease of use.
// =============================================================================

import type { ReactNode } from 'react'

// -----------------------------------------------------------------------------
// Control Types
// -----------------------------------------------------------------------------

/** Base properties shared by all controls */
interface ControlBase {
  id: string
  label: string
  description?: string
  disabled?: boolean
}

/** Slider control for numeric ranges */
export interface SliderControl extends ControlBase {
  type: 'slider'
  value: number
  min: number
  max: number
  step: number
  formatLabel?: (value: number) => string
}

/** Inline slider control - compact variant with label inside fill */
export interface InlineSliderControl extends ControlBase {
  type: 'inline-slider'
  value: number
  min: number
  max: number
  step: number
  formatLabel?: (value: number) => string
}

/** Select dropdown control */
export interface SelectControl extends ControlBase {
  type: 'select'
  value: string
  options: Array<{
    label: string
    value: string
    color?: string
    description?: string
  }>
  showColorSwatch?: boolean
}

/** Color select with semantic color options */
export interface ColorSelectControl extends ControlBase {
  type: 'color-select'
  value: string
  options: Array<{
    label: string
    value: string
    color?: string
    description?: string
  }>
  swatchSize?: 'xs' | 'sm' | 'md'
}

/** Toggle/checkbox control */
export interface ToggleControl extends ControlBase {
  type: 'toggle' | 'inline-toggle' | 'checkbox' // Legacy aliases supported
  value: boolean
}

/** Color picker control */
export interface ColorControl extends ControlBase {
  type: 'color'
  value: string
  showValue?: boolean
}

/** Text input control */
export interface TextControl extends ControlBase {
  type: 'text'
  value: string
  placeholder?: string
  maxLength?: number
}

/** Custom render control */
export interface CustomControl extends ControlBase {
  type: 'custom'
  render: () => ReactNode
}

/** Union of all control types */
export type Control =
  | SliderControl
  | InlineSliderControl
  | SelectControl
  | ColorSelectControl
  | ToggleControl
  | ColorControl
  | TextControl
  | CustomControl

// -----------------------------------------------------------------------------
// Group & Section Types
// -----------------------------------------------------------------------------

/** A group of controls within a section */
export interface ControlGroup {
  title?: string
  description?: string
  controls: Control[]
  columns?: 1 | 2
  defaultCollapsed?: boolean
}

/** A section containing groups of controls */
export interface Section {
  id: string
  label?: string // Short label for tab
  tabLabel?: string // Legacy alias for label
  title: string // Full title shown in section header
  groups?: ControlGroup[]
  subsections?: ControlGroup[] // Legacy alias for groups
  defaultCollapsed?: boolean
}

// -----------------------------------------------------------------------------
// Preset System
// -----------------------------------------------------------------------------

/** A saved configuration preset */
export interface Preset<T = unknown> {
  id: string
  name: string
  data: T
}

/** Preset configuration */
export interface PresetConfig<T = unknown> {
  presets: Preset<T>[]
  activePresetId: string | null
  showCopyButton?: boolean
  copyLabel?: string
}

// -----------------------------------------------------------------------------
// Panel Configuration
// -----------------------------------------------------------------------------

/** Panel position configuration */
export interface PanelPosition {
  top?: string
  bottom?: string
  right?: string
  width?: string
}

/** Full panel configuration */
export interface PanelConfig {
  sections: Section[]
  defaultActiveTab?: string
  position?: PanelPosition
  title?: string
  minimizedTitle?: string
  showReset?: boolean
  resetLabel?: string
  presetConfig?: PresetConfig
}

// -----------------------------------------------------------------------------
// Event Types
// -----------------------------------------------------------------------------

/** Event emitted when a control value changes */
export interface ControlChangeEvent {
  controlId: string
  sectionId: string
  value: unknown
}

// -----------------------------------------------------------------------------
// Component Props
// -----------------------------------------------------------------------------

/** Props for the UnifiedControlPanel component */
export interface UnifiedControlPanelProps<T = unknown> {
  config: PanelConfig
  onChange: (event: ControlChangeEvent) => void
  onReset?: () => void
  onPresetChange?: (presetId: string) => void
  getConfigForCopy?: () => T
  className?: string
  /** Default minimized state */
  defaultMinimized?: boolean
  /** Controlled minimized state */
  minimized?: boolean
  /** Callback when minimized state changes */
  onMinimizedChange?: (minimized: boolean) => void
}

// -----------------------------------------------------------------------------
// Context Types
// -----------------------------------------------------------------------------

/** Panel context value */
export interface PanelContextValue {
  activeTab: string
  setActiveTab: (id: string) => void
  isMinimized: boolean
  setIsMinimized: (minimized: boolean) => void
  toggleMinimized: () => void
  /** Navigation direction: 1 = moving down (to later section), -1 = moving up (to earlier section) */
  direction: 1 | -1
}
