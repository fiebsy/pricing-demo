/**
 * Quick Fix Interactions - Configuration Types
 *
 * Types for the swipeable card, option selection, and island components.
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/quick-fix
 */

// =============================================================================
// CARD CONFIGURATION
// =============================================================================

export interface CardConfig {
  // Sizing
  width: number
  height: number
  padding: number
  borderRadius: number

  // Stack appearance
  stackOffset: number // Y offset for stacked cards
  stackScale: number // Scale reduction per card (0.05 = 5%)
  visibleCards: number // How many cards visible in stack

  // Background & border
  background: string
  border: boolean
  borderColor: string
  shadow: string

  // Shine effect
  shine: string // none | shine-0 | shine-1 | shine-2 | shine-3 | shine-brand
  shineIntensity: string // (empty) | -subtle | -intense

  // Corner shape
  cornerShape: 'round' | 'squircle'

  // Typography
  fontSize: string
  fontWeight: string
  textColor: string
}

// =============================================================================
// SWIPE CONFIGURATION
// =============================================================================

export interface SwipeConfig {
  // Thresholds
  swipeThreshold: number // Pixels to trigger swipe
  velocityThreshold: number // Min velocity for quick swipe

  // Animation
  exitDistance: number // How far card flies off
  exitRotation: number // Max rotation on exit (degrees)
  exitDuration: number // Exit animation duration (ms)
  returnDuration: number // Return to center duration (ms)

  // Drag feedback
  maxRotation: number // Max rotation while dragging
  rotationFactor: number // How much rotation per pixel
  scaleOnDrag: number // Scale change while dragging

  // Overlay feedback
  showOverlay: boolean
  overlayOpacity: number // 0-100
}

// =============================================================================
// BUTTON CONFIGURATION
// =============================================================================

export type ButtonDisplayMode = 'icon-only' | 'text-only' | 'icon-text'

export type ProdButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'shine'
  | 'primary-destructive'
  | 'secondary-destructive'
  | 'tertiary-destructive'
  | 'primary-success'
  | 'secondary-success'
  | 'tertiary-success'

export interface ActionButtonConfig {
  // Display mode
  displayMode: ButtonDisplayMode

  // Sizing (for custom buttons)
  size: number
  iconSize: string

  // Use prod Button component
  useProdButton: boolean
  prodButtonSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  prodButtonRoundness: 'default' | 'pill' | 'squircle'
  prodTrueVariant: ProdButtonVariant
  prodFalseVariant: ProdButtonVariant

  // Custom appearance (when not using prod button)
  trueBackground: string
  falseBackground: string
  trueColor: string
  falseColor: string
  borderRadius: number

  // Feedback
  hoverScale: number
  pressScale: number
  showRipple: boolean

  // Labels (for text modes)
  trueLabel: string
  falseLabel: string
}

// =============================================================================
// PROGRESS CONFIGURATION
// =============================================================================

export interface ProgressConfig {
  // Bar appearance
  height: number
  borderRadius: number
  background: string
  fillColor: string

  // Animation
  animateFill: boolean
  fillDuration: number

  // Label position
  showCount: boolean
  showLabel: boolean
  labelPosition: 'above' | 'inline'
}

// =============================================================================
// COMPLETION CONFIGURATION
// =============================================================================

export interface CompletionConfig {
  // Success icon
  iconSize: number
  iconBackground: string
  iconColor: string

  // Memory bullets
  bulletStyle: 'dot' | 'check' | 'arrow'
  bulletColor: string
  bulletSpacing: number

  // CTA button
  buttonStyle: 'solid' | 'outline' | 'ghost'
  buttonSize: 'sm' | 'md' | 'lg'
  buttonText?: string
}

// =============================================================================
// TOAST CONFIGURATION
// =============================================================================

export interface ToastConfig {
  // Layout
  padding: number
  gap: number
  borderRadius: number
  iconContainerSize: number

  // Background & effects
  background: string
  shine: string // none | shine-0 | shine-1 | shine-2 | shine-3 | shine-brand
  shineIntensity: string // (empty) | -subtle | -intense
  cornerShape: 'round' | 'squircle'

  // Typography
  titleSize: string
  titleWeight: string
  titleColor: string
  subtitleSize: string
  subtitleWeight: string
  subtitleColor: string

  // Icon
  iconSize: number
  iconColor: string
  iconContainerBackground: string

  // Animation
  animationDirection: 'left' | 'right' | 'up' | 'down'
  animationDuration: number
}

// =============================================================================
// ISLAND CONFIGURATION
// =============================================================================

export interface IslandConfig {
  // Layout
  padding: number
  gap: number
  borderRadius: number

  // Background
  background: string
  backdropBlur: number
  border: boolean
  borderColor: string

  // Sections
  showUpload: boolean
  showScore: boolean
  showConfidence: boolean
  showNotifications: boolean

  // Confidence wheel
  wheelSize: number
  wheelStrokeWidth: number

  // Notification panel
  showNotificationPanel: boolean
}

// =============================================================================
// FLOW METHOD OPTION CONFIGURATION
// =============================================================================

export interface FlowOptionConfig {
  // Card sizing
  cardPadding: number
  cardBorderRadius: number
  cardGap: number

  // Shine effect
  shine: string
  shineIntensity: string
  cornerShape: 'round' | 'squircle'

  // Icon circle
  iconSize: number
  iconCircleSize: number
  iconCircleBackground: string

  // Text
  labelSize: string
  descriptionSize: string

  // States
  hoverBackground: string
  selectedBackground: string
  selectedBorder: string
}

// =============================================================================
// COMBINED CONFIGURATION
// =============================================================================

export interface QuickFixInteractionsConfig {
  card: CardConfig
  swipe: SwipeConfig
  actionButtons: ActionButtonConfig
  progress: ProgressConfig
  completion: CompletionConfig
  toast: ToastConfig
  island: IslandConfig
  flowOptions: FlowOptionConfig

  // Preview mode
  previewMode: 'card-stack' | 'flow-selector' | 'completion' | 'island' | 'toast' | 'full-flow'
}

// =============================================================================
// PRESET METADATA
// =============================================================================

export interface QuickFixPresetMeta {
  id: string
  name: string
  description?: string
  category?: 'default' | 'minimal' | 'playful' | 'premium' | 'compact'
  data: QuickFixInteractionsConfig
}

// =============================================================================
// FLOW DEFINITION & REGISTRY
// =============================================================================

export type FlowId = 'quick-fix' | 'add-to-mind' | 'manual-fix'

/**
 * Flow definition for configurable flow registry.
 * Allows enabling/disabling flows and customizing their appearance.
 */
export interface FlowDefinition {
  id: FlowId
  enabled: boolean
  label: string
  description: string
  icon: string // Icon name for dynamic lookup (e.g., 'SparklesIcon')
  /**
   * For Add to Mind flow: determines which component variant to render
   * - 'generic': File/link/text upload interface (edit-questions style)
   * - 'category-aware': Impact-ranked suggestions by category (profile style)
   */
  variant?: 'generic' | 'category-aware'
}

/**
 * Flow registry configuration for solution presets.
 */
export interface FlowRegistry {
  flows: FlowDefinition[]
  defaultFlow: FlowId | null
}

// =============================================================================
// INTEGRATION CONFIGURATION
// =============================================================================

export type IntegrationMode = 'modal' | 'inline' | 'panel'
export type OnCompleteAction = 'close' | 'toast' | 'callback'

/**
 * Integration configuration for embedding quick-fix flows.
 */
export interface IntegrationConfig {
  mode: IntegrationMode
  showHeader: boolean
  showBackButton: boolean
  showCloseButton: boolean
  /** Header title. Use {category} for dynamic category name substitution. */
  headerTitle?: string
  showStepIndicator: boolean
  onCompleteAction: OnCompleteAction
}

// =============================================================================
// SOLUTION PRESETS
// =============================================================================

export type SolutionId = 'edit-questions' | 'profile-v3' | 'standalone'

/**
 * Solution preset for pre-configured integration scenarios.
 * Combines base config, flow registry, and integration settings.
 */
export interface SolutionPreset {
  id: string
  name: string
  solution: SolutionId
  description: string
  baseConfig: QuickFixInteractionsConfig
  flowRegistry: FlowRegistry
  integration: IntegrationConfig
}
