/**
 * Unified Presets
 *
 * Centralized preset system for all component configurations.
 */

export {
  // Types
  type UnifiedPresetConfig,
  type LocalPlaygroundConfig,
  type CompletePresetConfig,
  type PresetDefinition,
  // Constants
  GAN2_PRESET,
  UNIFIED_PRESETS,
  // Functions
  getUnifiedPreset,
  getDefaultPreset,
  getTableConfigFromPreset,
  getFilterConfigsFromPreset,
  getMetricTileConfigFromPreset,
  createInitialPlaygroundState,
  applyPreset,
} from './gan2-preset'
