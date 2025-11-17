// Enhanced Roundness configuration with custom shadow support
export interface RoundnessConfig {
  smoothing: number
  borderRadius: number
  pointsPerCorner: number
  performance: 'high' | 'balanced' | 'smooth' | 'ultra-smooth'
  adaptiveQuality: boolean
}

// Custom shadow configuration
export interface CustomShadowConfig {
  offsetX: number
  offsetY: number
  blur: number
  spread: number
  color: string
  opacity: number
}

// Gradient border configuration
export interface GradientBorderConfig {
  type: 'linear' | 'radial' | 'conic' | 'corner-emphasis'
  colors: string[] // Array of color stops
  stops?: number[] // Optional stop positions (0-100)
  angle?: number // For linear gradients (0-360 degrees)
  opacity?: number // Overall opacity multiplier
  useOpacityGradient?: boolean // Use opacity variation for emphasis effect
  // 3-stop opacity support
  startOpacity?: number // Start opacity for corner emphasis gradients (0-1)
  middleOpacity?: number // Middle opacity for corner emphasis gradients (0-1)
  endOpacity?: number // End opacity for corner emphasis gradients (0-1)
  // 5-stop opacity support for finer control
  opacities?: number[] // Array of opacity values at each stop position (0-1)
}

export type BorderGradientPreset =
  | 'none'
  | 'radial-edge-glow'
  | 'corner-tl-br-1'
  | 'corner-tl-br-2'
  | 'corner-tl-br-3'
  | 'corner-tl-br-4'
  | 'corner-tl-br-5'
  | 'corner-tr-bl-1'
  | 'corner-tr-bl-2'
  | 'corner-tr-bl-3'
  | 'corner-tr-bl-4'
  | 'corner-tr-bl-5'
  | 'custom'

export type BackgroundGradientPreset =
  | 'none'
  | 'subtle-depth-sm'
  | 'subtle-depth'
  | 'subtle-depth-md'
  | 'subtle-depth-lg'
  | 'custom'

export interface SquircleProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  backgroundColor?: string
  borderColor?: string
  borderWidth?: number
  borderGradient?: BorderGradientPreset
  customBorderGradient?: GradientBorderConfig
  backgroundGradient?: BackgroundGradientPreset
  customBackgroundGradient?: GradientBorderConfig
  backgroundGradientOverlayColor?: string // Color for the gradient overlay (when using gradient over solid background)
  outerBorderColor?: string // Color for the outer border layer (double border effect)
  outerBorderWidth?: number // Width of the outer border layer (default: 1px)
  roundness?: 0 | 1 | 2 | 3 | 4 | 5
  customSmoothing?: number
  customBorderRadius?: number
  customPointsPerCorner?: number
  overflow?: 'visible' | 'hidden' | 'clip'
  debugColors?: boolean

  // Shadow System
  // NOTE: Only 'xs' and 'sm' shadows work without clipping (larger shadows disabled)
  shadow?: 'none' | 'xs' | 'sm' | 'custom'
  customShadow?: CustomShadowConfig
  gradient?: boolean
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: 'to-r' | 'to-br' | 'to-b' | 'to-bl' | 'to-l' | 'to-tl' | 'to-t' | 'to-tr'
  animation?: 'none' | 'pulse' | 'bounce' | 'fade' | 'scale'
  animationDuration?: 'fast' | 'normal' | 'slow'
  hoverEffects?: boolean
  hoverScale?: number
  hoverOpacity?: number

  // Hover Color Transitions (matches Untitled UI button behavior)
  backgroundColorHover?: string
  borderColorHover?: string

  // Custom Shadow System
  customShadowLayer?: boolean // Enable the custom shadow layer instead of CSS shadows
  shadowMethod?: 'custom' | 'duplicate' | 'css' // Shadow rendering method - duplicate works best!
  shadowOffsetX?: number
  shadowOffsetY?: number
  shadowBlur?: number
  shadowSpread?: number
  shadowColor?: string
  shadowOpacity?: number

  // Performance & Quality
  performance?: 'high' | 'balanced' | 'smooth' | 'ultra-smooth'
  adaptiveQuality?: boolean

  // Layout Behavior
  fillMode?: boolean // If true, Squircle fills container and content stretches to fill Squircle (for buttons, cards, inputs)

  // FOUC Prevention
  initialDimensions?: { width: number; height: number } // Provide estimated dimensions to prevent {0,0} flash
  fadeInOnMount?: boolean // Fade in from opacity 0 to 1 after dimensions are measured (default: true)

  // Debug & Development
  debugLayerColors?: boolean // Enable color-coded layer visualization for debugging

  // Events
  onDimensionsChange?: (width: number, height: number) => void
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  onAnimationComplete?: () => void
}
