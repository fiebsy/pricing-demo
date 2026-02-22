// Size configuration
export interface SizeConfig {
  width: number // 50-400px
}

// Gradient configuration for tier fills
export interface GradientConfig {
  enabled: boolean
  type: 'linear' | 'radial'
  direction:
    | 'to-bottom'
    | 'to-top'
    | 'to-right'
    | 'to-left'
    | 'to-bottom-right'
    | 'to-bottom-left'
    | 'to-top-right'
    | 'to-top-left'
  startColor: string // semantic token
  endColor: string // semantic token
  startOpacity: number // 0-100
  endOpacity: number // 0-100
}

// Tier configuration (bottom & top)
export interface TierConfig {
  faceColor: string // semantic token (when gradient disabled)
  useGradient: boolean
  gradient: GradientConfig
  strokeColor: string
  strokeWidth: number // 0-6px
  shadowColor: string // dark "body" of coin
  shadowOpacity: number // 0-100
}

// Effects configuration
export interface EffectsConfig {
  dropShadow: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  dropShadowColor: string
  dropShadowOpacity: number
  innerGlow: 'none' | 'subtle' | 'medium' | 'strong'
  innerGlowColor: string
  shineOverlay: 'none' | 'subtle' | 'medium' | 'strong'
}

// Demo configuration
export interface DemoConfig {
  pageBackground: 'primary' | 'secondary' | 'tertiary'
  showDebug: boolean
}

// Full configuration
export interface CoinStackConfig {
  size: SizeConfig
  bottomTier: TierConfig
  topTier: TierConfig
  effects: EffectsConfig
  demo: DemoConfig
}

// Preset definition
export interface CoinStackPreset {
  id: string
  name: string
  description: string
  config: CoinStackConfig
}
