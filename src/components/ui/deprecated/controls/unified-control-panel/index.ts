/**
 * Unified Control Panel
 *
 * Re-exports all public API
 */

export { UnifiedControlPanel } from './unified-control-panel'

// Context hooks
export { usePanelState, usePanelActions, usePanelContext } from './context/panel-context'

// Control registry
export {
  registerControl,
  unregisterControl,
  getControl,
  hasControl,
  getRegisteredTypes,
  useControlRegistry,
  ControlRegistryProvider,
} from './registry/control-registry'
export type { ControlComponent, ControlComponentProps, ControlRegistry } from './registry/control-registry'

// Unified Presets (GAN2)
export {
  GAN2_PRESET,
  UNIFIED_PRESETS,
  getUnifiedPreset,
  getDefaultPreset,
  getTableConfigFromPreset,
  getFilterConfigsFromPreset,
  getMetricTileConfigFromPreset,
  createInitialPlaygroundState,
  applyPreset,
} from './presets'
export type {
  UnifiedPresetConfig,
  LocalPlaygroundConfig,
  CompletePresetConfig,
  PresetDefinition,
} from './presets'

// Types
export type {
  // Control types
  ControlConfig,
  BaseControlConfig,
  SliderControlConfig,
  SelectControlConfig,
  CheckboxControlConfig,
  ColorControlConfig,
  ColorArrayControlConfig,
  CustomControlConfig,
  InlineToggleControlConfig,
  TextControlConfig,
  ColorSelectControlConfig,

  // Section types
  ControlSection,
  ControlSubsection,
  CollapseConfig,

  // Panel types
  UnifiedControlPanelConfig,
  UnifiedControlPanelProps,
  ControlChangeEvent,
  PresetConfig,
  Preset,

  // Context types
  PanelStateValue,
  PanelActionsValue,
  PanelContextValue,
} from './types'
