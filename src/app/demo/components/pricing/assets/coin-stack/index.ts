/**
 * Coin Stack Asset
 *
 * Barrel exports for coin stack component and utilities.
 */

export { CoinStack } from './coin-stack'
export { getPresetById, PRESETS, DEFAULT_CONFIG } from './presets'
export { DEFAULT_TRANSITION, STAGE_IDS, STAGE_LABELS, DEFAULT_STAGES, getStageLabel } from './stages'
export { resolveColor } from './color-resolver'
export type {
  CoinStackConfig,
  CoinStackPreset,
  TierConfig,
  GradientConfig,
  EffectsConfig,
  SizeConfig,
  DemoConfig,
  StageId,
  StageTransitionConfig,
} from './types'
