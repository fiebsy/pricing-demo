// =============================================================================
// Unified Control Panel - Public API
// =============================================================================

// Main component
export { UnifiedControlPanel } from './unified-control-panel'

// All types
export type {
  // Control types
  Control,
  SliderControl,
  InlineSliderControl,
  SelectControl,
  ColorSelectControl,
  ToggleControl,
  ColorControl,
  TextControl,
  CustomControl,
  // Enhanced control types
  FontWeightSelectControl,
  ColorEnhancedSelectControl,
  RadiusSelectControl,
  // Group & Section types
  ControlGroup,
  Section,
  // Preset types
  Preset,
  PresetConfig,
  // Panel types
  PanelPosition,
  PanelConfig,
  // Event types
  ControlChangeEvent,
  // Props
  UnifiedControlPanelProps,
  // Context
  PanelContextValue,
} from './types'

// Context for advanced use cases
export { PanelProvider, usePanelContext } from './context'

// Sub-components for composition
export { ScrollableTabList, TabTrigger, MinimizeButton } from './components/tab-navigation'
export { SidebarNavigation } from './components/sidebar-navigation'
export { SectionRenderer, ActiveSectionContent } from './components/section-renderer'
export { ActionBar } from './components/action-bar'
export { MinimizedHeader } from './components/minimized-header'
export { PanelToggleButton } from './components/panel-toggle-button'

// Control primitives
export {
  ControlGroupWrapper,
  ControlGrid,
  ColorSwatch,
  SliderControl as SliderControlComponent,
  SelectControl as SelectControlComponent,
  ColorSelectControl as ColorSelectControlComponent,
  ToggleControl as ToggleControlComponent,
  ColorControl as ColorControlComponent,
  TextControl as TextControlComponent,
  ControlRenderer,
  InlineSlider,
} from './components/controls'
export type { InlineSliderProps } from './components/controls'

// =============================================================================
// Framework Enhancements
// =============================================================================

// Tokens - Design token constants for consistent styling options
export * from './tokens'

// Builders - Section builder functions for rapid playground creation
export * from './builders'

// Enhanced controls - Visual preview controls
export {
  FontWeightSelect,
  ColorEnhancedSelect,
  RadiusPreviewSelect,
} from './controls'
export type {
  FontWeightSelectProps,
  ColorEnhancedSelectProps,
  RadiusPreviewSelectProps,
} from './controls'

// =============================================================================
// Playground Layout (internal)
// =============================================================================

export { PlaygroundLayout } from './playground-layout'
export type {
  PlaygroundLayoutProps,
  DebugControlsConfig,
  DebugPosition,
} from './playground-layout'

// Debug controls (also available via PlaygroundLayout)
export {
  PlaygroundDebugControls,
  type PlaygroundDebugControlsProps,
} from './playground-layout'

// =============================================================================
// Internal Primitives (re-exported for advanced usage)
// =============================================================================

// Utils
export { cx, cn } from './utils'

// Primitives - if needed outside the control panel
export {
  HugeIcon,
  Icon,
  ButtonUtility,
  InlineSelect,
  TickSlider,
  TurtleIcon,
  BunnyIcon,
  inlineSelectStyles,
} from './primitives'

export type {
  HugeIconProps,
  ButtonUtilityProps,
  InlineSelectProps,
  SelectOption,
} from './primitives'
