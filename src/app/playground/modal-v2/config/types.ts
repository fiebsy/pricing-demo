/**
 * Modal V2 Playground Configuration Types
 *
 * Simplified type definitions - ~200 lines instead of 700+
 * Flat structures, no deep nesting
 *
 * @status incubating
 */

// ============================================================================
// Stage Configuration
// ============================================================================

/** Stage ID (1-5) */
export type StageId = 1 | 2 | 3 | 4 | 5

/** Content type for stages */
export type ContentType = 'pricing' | 'success'

/** Pricing variant */
export type PricingVariant = 'A' | 'B'

/** Coin stack state ID */
export type CoinStackStateId = 1 | 2

/** Primary button visual state */
export interface PrimaryButtonState {
  text?: string
  loading?: boolean
  checkmark?: boolean
  showText?: boolean
}

/** Stage button configuration */
export interface StageButtons {
  primary: PrimaryButtonState
  secondary?: { text: string } | null
}

/** Stage header configuration */
export interface StageHeader {
  title: string
  subtext?: string
  assetStateId?: CoinStackStateId
}

/** Stage content configuration */
export interface StageContent {
  type: ContentType
  pricingVariant?: PricingVariant
  showContentB?: boolean
}

/** Stage definition - flat and explicit */
export interface Stage {
  id: StageId
  label: string
  header: StageHeader
  content: StageContent
  buttons: StageButtons
}

// ============================================================================
// Modal Appearance
// ============================================================================

/** Shine effect preset */
export type ShinePreset =
  | 'none'
  | 'shine-0'
  | 'shine-0-subtle'
  | 'shine-1'
  | 'shine-1-subtle'
  | 'shine-2'
  | 'shine-3'

/** Depth gradient preset */
export type DepthPreset = 'none' | 'depth-gradient-1' | 'depth-gradient-2' | 'depth-gradient-3'

/** Shadow size */
export type ShadowSize = 'none' | 'sm' | 'md' | 'lg' | 'xl'

/** Background semantic color */
export type BackgroundColor = 'primary' | 'secondary' | 'tertiary'

/** Modal appearance config - flat, no deep nesting */
export interface ModalAppearance {
  width: number
  padding: number
  gap: number
  borderRadius: number
  background: BackgroundColor
  shine: ShinePreset
  depth: DepthPreset
  shadow: ShadowSize
}

// ============================================================================
// Animation Configuration
// ============================================================================

/** Animation config - single source */
export interface AnimationConfig {
  /** Spring duration in seconds */
  duration: number
  /** Spring bounce (0-0.5) */
  bounce: number
  /** Stagger delay in seconds */
  stagger: number
}

// ============================================================================
// Demo Controls
// ============================================================================

/** Demo/debug configuration */
export interface DemoConfig {
  slowMo: boolean
  autoOpen: boolean
  pageBackground: BackgroundColor
}

// ============================================================================
// Asset Configuration
// ============================================================================

/** Asset type */
export type AssetType = 'placeholder' | 'coin-stack'

/** Asset alignment */
export type AssetAlignment = 'left' | 'center'

/** Asset configuration */
export interface AssetConfig {
  type: AssetType
  height: number
  alignment: AssetAlignment
  offsetX: number
  coinStackWidth?: number
}

// ============================================================================
// Header Configuration
// ============================================================================

/** Title typography */
export interface TitleConfig {
  color: string
  size: 'sm' | 'md' | 'lg' | 'xl'
  weight: '400' | '500' | '600' | '700'
}

/** Subtext typography */
export interface SubtextConfig {
  show: boolean
  color: string
  size: 'xs' | 'sm' | 'md'
  weight: '400' | '500' | '600' | '700'
}

/** Header configuration */
export interface HeaderConfig {
  showAsset: boolean
  asset: AssetConfig
  title: TitleConfig
  subtext: SubtextConfig
}

// ============================================================================
// Button Configuration
// ============================================================================

/** Button variant */
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'

/** Button size */
export type ButtonSize = 'sm' | 'md' | 'lg'

/** Button appearance */
export interface ButtonAppearance {
  variant: ButtonVariant
  size: ButtonSize
}

/** Checkmark entrance style */
export type CheckmarkStyle = 'draw' | 'flip'

/** Fluid button timing preset */
export type FluidTiming = 'default' | 'snappy' | 'smooth' | 'synced'

/** Fluid button configuration */
export interface FluidConfig {
  enabled: boolean
  timing: FluidTiming
  gap: number
  exitBlur: boolean
  checkmarkStyle: CheckmarkStyle
  textSlideDuration: number
  checkmarkDrawDuration: number
}

/** Buttons configuration */
export interface ButtonsConfig {
  primary: ButtonAppearance
  secondary: ButtonAppearance
  layout: 'horizontal' | 'horizontal-reverse' | 'vertical'
  gap: number
  cornerSquircle: boolean
  fluid: FluidConfig
}

// ============================================================================
// Pro Card Configuration
// ============================================================================

/** Pro card gradient */
export type ProCardGradient = 'arcade-blue' | 'ocean-depth' | 'frost' | 'electric'

/** Pro card text style */
export type ProCardTextStyle = ProCardGradient | 'text-primary' | 'text-secondary' | 'text-tertiary'

/** Pro card configuration */
export interface ProCardConfig {
  title: string
  multiplier: number
  height: number
  gradient: ProCardGradient
  titleGradient: ProCardTextStyle
  multiplierGradient: ProCardTextStyle
  containerBackground: BackgroundColor
  containerShine: ShinePreset
  containerBorderRadius: number
  glowEnabled: boolean
  glowColor: string
  glowBlur: number
  glowOpacity: number
}

// ============================================================================
// Pricing Select Configuration
// ============================================================================

/** Pricing select configuration */
export interface PricingSelectConfig {
  availableTiers: string[]
  upgradeMode: boolean
  variantATriggerHeight: number
  variantAMaxBottomHeight: number
  variantBTriggerHeight: number
  variantBBottomHeight: number
  panelWidth: number | 'fill'
  borderRadius: number
  shine: string
  background: BackgroundColor
  headerShow: boolean
  headerText: string
  headerMarginBottom: number
}

// ============================================================================
// Root Configuration
// ============================================================================

/** Modal V2 configuration */
export interface ModalV2Config {
  appearance: ModalAppearance
  animation: AnimationConfig
  demo: DemoConfig
  header: HeaderConfig
  buttons: ButtonsConfig
  proCard: ProCardConfig
  pricingSelect: PricingSelectConfig
}

// ============================================================================
// Preset Types
// ============================================================================

/** Preset metadata */
export interface ModalV2PresetMeta {
  id: string
  name: string
  description?: string
  data: ModalV2Config
}
