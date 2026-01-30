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
