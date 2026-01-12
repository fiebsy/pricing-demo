/**
 * Unified Control Panel - Type Definitions
 */

import { ReactNode } from 'react'

// -----------------------------------------------------------------------------
// Base Control Types
// -----------------------------------------------------------------------------

export interface BaseControlConfig {
  id: string
  label: string
  description?: string
  disabled?: boolean
}

export interface SliderControlConfig extends BaseControlConfig {
  type: 'slider'
  value: number
  min: number
  max: number
  step: number
  formatLabel?: (value: number) => string
}

export interface ColorSwatchOption {
  label: string
  value: string
  color?: string
  description?: string
}

export interface SelectControlConfig extends BaseControlConfig {
  type: 'select'
  value: string
  options: Array<{ label: string; value: string; color?: string; description?: string }>
  showColorSwatch?: boolean
}

export interface CheckboxControlConfig extends BaseControlConfig {
  type: 'checkbox'
  value: boolean
}

export interface ColorControlConfig extends BaseControlConfig {
  type: 'color'
  value: string
  showValue?: boolean
}

export interface ColorArrayControlConfig extends BaseControlConfig {
  type: 'color-array'
  value: string[]
  count: number
}

export interface CustomControlConfig extends BaseControlConfig {
  type: 'custom'
  render: () => ReactNode
}

export interface InlineToggleControlConfig extends BaseControlConfig {
  type: 'inline-toggle'
  value: boolean
}

export interface TextControlConfig extends BaseControlConfig {
  type: 'text'
  value: string
  placeholder?: string
  maxLength?: number
}

export interface ColorSelectControlConfig extends BaseControlConfig {
  type: 'color-select'
  value: string
  options: ColorSwatchOption[]
  swatchSize?: 'xs' | 'sm' | 'md'
}

export type ControlConfig =
  | SliderControlConfig
  | SelectControlConfig
  | CheckboxControlConfig
  | ColorControlConfig
  | ColorArrayControlConfig
  | CustomControlConfig
  | InlineToggleControlConfig
  | ColorSelectControlConfig
  | TextControlConfig

// -----------------------------------------------------------------------------
// Section & Subsection Types
// -----------------------------------------------------------------------------

export interface GradientFadeConfig {
  enabled: boolean
  direction?: 'to-t' | 'to-b' | 'to-l' | 'to-r' | 'to-br' | 'to-bl' | 'to-tr' | 'to-tl'
  from?: string
  to?: string
  opacity?: number
}

export interface ControlSubsection {
  title?: string
  controls: ControlConfig[]
  columns?: 1 | 2 | 3 | 4
  collapsible?: boolean
  defaultCollapsed?: boolean
  depth?: number
  gradientFade?: GradientFadeConfig
  children?: ControlSubsection[]
  description?: string
}

export interface CollapseExpandButtonConfig {
  show?: boolean
  text?: string
  textColorClass?: string
  showIcon?: boolean
  position?: 'center' | 'left' | 'right'
  bottomOffset?: number
  showBorder?: boolean
  borderColorClass?: string
  showShadow?: boolean
}

export interface CollapseCollapseButtonConfig {
  show?: boolean
  text?: string
  textColorClass?: string
  showIcon?: boolean
  position?: 'center' | 'left' | 'right'
  showBorder?: boolean
  borderColorClass?: string
  showShadow?: boolean
}

export interface CollapseGradientConfig {
  enabled?: boolean
  height?: number
  intensity?: number
}

export interface CollapseConfig {
  collapsedHeight?: number
  expandButton?: CollapseExpandButtonConfig
  collapseButton?: CollapseCollapseButtonConfig
  gradient?: CollapseGradientConfig
  animationDuration?: number
}

export interface ControlSection {
  id: string
  title: string
  tabLabel: string
  enableToggle?: {
    enabled: boolean
    key: string
  }
  subsections: ControlSubsection[]
  defaultCollapsed?: boolean
  collapseConfig?: CollapseConfig
}

// -----------------------------------------------------------------------------
// Panel Configuration Types
// -----------------------------------------------------------------------------

export interface PanelPosition {
  top?: string
  bottom?: string
  right?: string
  width?: string
}

export interface Preset<T = unknown> {
  id: string
  name: string
  data: T
}

export interface PresetConfig<T = unknown> {
  presets: Preset<T>[]
  activePresetId: string | null
  showCopyButton?: boolean
  copyButtonLabel?: string
}

export interface ControlChangeEvent {
  controlId: string
  sectionId: string
  value: unknown
}

export interface UnifiedControlPanelConfig {
  sections: ControlSection[]
  defaultActiveTab?: string
  position?: PanelPosition
  showReset?: boolean
  resetLabel?: string
  presetConfig?: PresetConfig
  /** Panel title shown in header */
  title?: string
  /** Title shown in minimized pill (defaults to title or 'Controls') */
  minimizedTitle?: string
  /** Start panel minimized */
  defaultMinimized?: boolean
}

export interface UnifiedControlPanelProps<T = unknown> {
  config: UnifiedControlPanelConfig
  onChange: (event: ControlChangeEvent) => void
  onReset?: () => void
  onPresetChange?: (presetId: string) => void
  getConfigForCopy?: () => T
  className?: string
}

// -----------------------------------------------------------------------------
// Internal Types
// -----------------------------------------------------------------------------

/**
 * State that changes frequently (causes re-renders when consumed)
 */
export interface PanelStateValue {
  activeTab: string
  isScrollingProgrammatically: boolean
  isMinimized: boolean
}

/**
 * Stable actions and refs (don't change, safe to consume without re-renders)
 */
export interface PanelActionsValue {
  setActiveTab: (id: string) => void
  setIsScrollingProgrammatically: (value: boolean) => void
  registerSection: (id: string, element: HTMLElement | null) => void
  scrollToSection: (sectionId: string) => void
  toggleMinimize: () => void
  setMinimized: (value: boolean) => void
  containerRef: React.RefObject<HTMLDivElement | null>
}

/**
 * Combined context value (backwards compatible)
 */
export interface PanelContextValue extends PanelStateValue, PanelActionsValue {}

export interface PanelCSSVariables {
  '--panel-top'?: string
  '--panel-bottom'?: string
  '--panel-right'?: string
  '--panel-width'?: string
}

export interface TabIndicatorState {
  left: number
  width: number
  isInitialized: boolean
}

export interface ScrollSyncOptions {
  rootMargin?: string
  threshold?: number | number[]
}
