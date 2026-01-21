/**
 * Biaxial Command Menu V3 Playground - Exports
 */

export type { PlaygroundState } from './types'
export { PRESETS, DEFAULT_STATE } from './presets'
export { buildPanelConfig, updateNestedValue } from './panel-config'
export {
  SHINE_OPTIONS,
  SHADOW_OPTIONS,
  BACKGROUND_OPTIONS,
  GRADIENT_OPTIONS,
  GRADIENT_COLOR_OPTIONS,
  AREA_BACKGROUND_OPTIONS,
  BACKDROP_MODE_OPTIONS,
  EXPAND_ORIGIN_OPTIONS,
} from './options'

// Re-export section builders for advanced usage
export {
  buildSyncSection,
  buildInputSection,
  buildMenuSection,
  buildBackdropSection,
} from './panel-config'
