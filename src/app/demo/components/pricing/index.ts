/**
 * Pricing Components
 *
 * Self-contained pricing modal system for design challenge evaluation.
 */

// Main wrapper component
export { DemoPricingWrapper } from './pricing-wrapper'

// Core components
export { PricingModal } from './core/pricing-modal'
export { ButtonSection } from './core/button-section'
export { ProCard } from './core/pro-card'
export { PricingSelectSlot } from './core/pricing-select-slot'
export { ChecklistSlot } from './core/checklist-slot'
export { PRICING_TIERS } from './core/pricing-tiers'

// Config
export { DEFAULT_PRICING_CONFIG } from './config/presets'
export type {
  PricingPlaygroundConfig,
  FlowId,
  ContainerConfig,
  AssetConfig,
  HeaderConfig,
  ButtonConfig,
  ProCardConfig,
  ChecklistConfig,
  AnimationConfig,
  BackdropConfig,
  FlowsConfig,
  PricingSelectConfig,
} from './config/types'

// Hooks
export { usePricingFlow } from './hooks/use-pricing-flow'
export type { UsePricingFlowOptions, UsePricingFlowReturn } from './hooks/use-pricing-flow'

// Utilities
export {
  flowToStateId,
  stateIdToFlow,
  isStateInFlow,
  getStatesForFlow,
} from './utils/button-adapter'

// Assets
export { CoinStack, getPresetById as getCoinStackPresetById } from './assets/coin-stack'
export { ChecklistIcon, ICON_SIZE_MAP } from './assets/checklist-icons'
export type { IconType, IconWeight } from './assets/checklist-icons'
