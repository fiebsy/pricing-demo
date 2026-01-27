/**
 * Quick Fix Interactions - Type Definitions
 */

// =============================================================================
// CARD CONFIGURATION
// =============================================================================

export interface CardConfig {
  // Dimensions
  width: number
  height: number
  borderRadius: number
  
  // Appearance
  background: 'primary' | 'secondary' | 'tertiary'
  shine: 'none' | 'shine-1' | 'shine-2' | 'shine-3'
  shineIntensity: '' | '-subtle' | '-intense'
  cornerShape: 'round' | 'squircle'
  
  // Text
  textSize: 'text-sm' | 'text-base' | 'text-lg'
  textWeight: 'font-normal' | 'font-medium' | 'font-semibold'
  textColor: 'primary' | 'secondary' | 'tertiary'
  
  // Stack behavior
  stackOffset: number
  stackScale: number
  maxVisibleCards: number
}

// =============================================================================
// SWIPE CONFIGURATION
// =============================================================================

export interface SwipeConfig {
  dragThreshold: number
  velocityThreshold: number
  rotationFactor: number
  scaleOnDrag: number
  animationDuration: number
  easing: string
}

// =============================================================================
// ACTION BUTTONS CONFIGURATION
// =============================================================================

export interface ActionButtonsConfig {
  size: number
  gap: number
  background: 'primary' | 'secondary' | 'tertiary'
  shine: 'none' | 'shine-1' | 'shine-2' | 'shine-3'
  shineIntensity: '' | '-subtle' | '-intense'
  cornerShape: 'round' | 'squircle'
  borderRadius: number
  iconSize: number
  hoverScale: number
  pressScale: number
}

// =============================================================================
// PROGRESS BAR CONFIGURATION
// =============================================================================

export interface ProgressConfig {
  height: number
  width: number
  background: string
  fillColor: string
  borderRadius: number
  animationDuration: number
}

// =============================================================================
// FLOW OPTIONS CONFIGURATION
// =============================================================================

export interface FlowOptionsConfig {
  cardGap: number
  cardBorderRadius: number
  cardBackground: 'primary' | 'secondary' | 'tertiary'
  shine: 'none' | 'shine-1' | 'shine-2' | 'shine-3'
  shineIntensity: '' | '-subtle' | '-intense'
  cornerShape: 'round' | 'squircle'
  iconCircleSize: number
}

// =============================================================================
// COMPLETION STATE CONFIGURATION
// =============================================================================

export interface CompletionConfig {
  bulletSpacing: number
  bulletSize: 'text-xs' | 'text-sm' | 'text-base'
  bulletColor: 'primary' | 'secondary' | 'tertiary'
  buttonVariant: 'primary' | 'secondary' | 'tertiary'
  buttonSize: 'sm' | 'md' | 'lg'
  buttonRoundness: 'rounded' | 'squircle'
}

// =============================================================================
// STATUS ISLAND CONFIGURATION
// =============================================================================

export interface StatusIslandConfig {
  showUpload: boolean
  showScore: boolean
  showConfidence: boolean
  showNotifications: boolean
  shine: 'none' | 'shine-1' | 'shine-2' | 'shine-3'
  shineIntensity: '' | '-subtle' | '-intense'
  cornerShape: 'round' | 'squircle'
  borderRadius: number
  padding: number
  gap: number
  wheelSize: number
  wheelStrokeWidth: number
  scoreSize: 'text-xl' | 'text-2xl' | 'text-3xl'
  scoreWeight: 'font-semibold' | 'font-bold'
  position?: 'top-right' | 'bottom-center'
}

// =============================================================================
// TOAST CONFIGURATION
// =============================================================================

export interface ToastConfig {
  animationDuration: number
  animationDirection: 'left' | 'right' | 'up' | 'down'
  shine: 'none' | 'shine-1' | 'shine-2' | 'shine-3'
  shineIntensity: '' | '-subtle' | '-intense'
  cornerShape: 'round' | 'squircle'
}

// =============================================================================
// MAIN CONFIGURATION
// =============================================================================

export interface QuickFixInteractionsConfig {
  // Preview mode
  previewMode: 'full-flow' | 'card-stack' | 'flow-selector' | 'completion' | 'island' | 'toast'
  modalPreviewMode: 'full-flow' | 'card-stack' | 'flow-selector' | 'completion'
  
  // Component configurations
  card: CardConfig
  swipe: SwipeConfig
  actionButtons: ActionButtonsConfig
  progress: ProgressConfig
  flowOptions: FlowOptionsConfig
  completion: CompletionConfig
  island: StatusIslandConfig
  toast: ToastConfig
}