/**
 * Unified Control Panel V2
 *
 * Exports all public API for the V2 control panel.
 */

// Main component
export { UnifiedControlPanelV2 } from './unified-control-panel-v2'

// Context hooks
export { PanelProvider, usePanelState, usePanelActions, usePanel } from './context'

// Types
export type {
  // Control types
  Control,
  BaseControl,
  SliderControl,
  SelectControl,
  CheckboxControl,
  ToggleControl,
  ColorControl,
  ColorSelectControl,
  TextControl,
  CustomControl,
  SelectOption,
  // Section types
  Section,
  ControlGroup,
  // Preset types
  Preset,
  PresetConfig,
  // Panel types
  PanelConfig,
  PanelPosition,
  UnifiedControlPanelV2Props,
  ControlChangeEvent,
  // Context types
  PanelState,
  PanelActions,
} from './types'
