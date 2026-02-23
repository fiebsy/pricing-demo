/**
 * Modal Playground Configuration Types
 *
 * @status incubating
 * @migration-target src/components/ui/core/primitives/modal
 */

// ============================================================================
// Container Configuration
// ============================================================================

export interface ContainerConfig {
  /** Modal width in pixels (320-640) */
  width: number
  /** Minimum height in pixels (200-600) */
  minHeight: number
  /** Maximum height in pixels (400-800) */
  maxHeight: number
  /** Internal padding in pixels (16-48) */
  padding: number
  /** Gap between sections in pixels (8-32) */
  gap: number
  /** Border radius in pixels (8-32) */
  borderRadius: number
  /** Corner shape variant */
  cornerShape: 'round' | 'squircle' | 'bevel' | 'scoop'
  /** Background semantic color */
  background: 'primary' | 'secondary' | 'tertiary'
  /** Shine effect preset */
  shine:
    | 'none'
    | 'shine-0'
    | 'shine-0-subtle'
    | 'shine-0-intense'
    | 'shine-1'
    | 'shine-1-subtle'
    | 'shine-1-intense'
    | 'shine-2'
    | 'shine-2-subtle'
    | 'shine-2-intense'
    | 'shine-3'
    | 'shine-3-subtle'
    | 'shine-3-intense'
  /** Depth gradient preset */
  depth: 'none' | 'depth-gradient-1' | 'depth-gradient-2' | 'depth-gradient-3'
  /** Shadow size */
  shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Drop shadow filter (CSS filter: drop-shadow) */
  dropShadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Border width in pixels */
  borderWidth: number
  /** Border color (semantic token) */
  borderColor: string
  /** Push buttons to bottom of modal (adds flex-1 spacer) */
  pushButtonsToBottom: boolean
  /** Show horizontal line separator above buttons */
  showSeparator: boolean
}

// ============================================================================
// Header Configuration
// ============================================================================

export interface TitleConfig {
  /** Text color (semantic token) */
  color: string
  /** Font size */
  size: 'sm' | 'md' | 'lg' | 'xl'
  /** Font weight */
  weight: '400' | '500' | '600' | '700'
}

export interface SubheaderConfig {
  /** Show subheader text */
  show: boolean
  /** Text color (semantic token) */
  color: string
  /** Font size */
  size: 'xs' | 'sm' | 'md'
  /** Font weight */
  weight: '400' | '500' | '600' | '700'
}

export interface HeaderConfig {
  /** Show asset placeholder */
  showAsset: boolean
  /** Asset placeholder height in pixels (legacy - use asset.height) */
  assetHeight: number
  /** Asset configuration */
  asset?: AssetConfig
  /** Title typography */
  title: TitleConfig
  /** Title text content */
  titleContent: string
  /** Subheader typography (global styling) */
  subheader: SubheaderConfig
  /** Subheader text content (default for all stages) */
  subheaderContent: string
}

// ============================================================================
// Content Section Configuration
// ============================================================================

export interface ContentSectionConfig {
  /** Show this content section */
  show: boolean
  /** Section height in pixels */
  height: number
  /** Number of wireframe lines */
  lineCount: number
  /** Gap between lines in pixels */
  lineGap: number
  /** Text styling for labels */
  text: {
    color: string
    size: 'xs' | 'sm' | 'md'
    weight: '400' | '500' | '600' | '700'
  }
}

// ============================================================================
// Button Configuration
// ============================================================================

export interface ButtonItemConfig {
  /** Button variant */
  variant:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'primary-destructive'
    | 'secondary-destructive'
    | 'tertiary-destructive'
  /** Button size */
  size: 'sm' | 'md' | 'lg'
  /** Button label */
  label: string
}

export interface ButtonsConfig {
  /** Number of buttons (1 or 2) */
  buttonCount: 1 | 2
  /** Primary button config */
  primary: ButtonItemConfig
  /** Secondary button config */
  secondary: ButtonItemConfig
  /** Button layout direction */
  layout: 'horizontal' | 'horizontal-reverse' | 'vertical'
  /** Gap between buttons in pixels */
  gap: number
  /** Button corner radius mode */
  buttonRadius: 'default' | 'sync'
  /** Enable corner-squircle on buttons */
  cornerSquircle: boolean
  /** Fluid button animation config */
  fluid: FluidButtonConfig
}

// ============================================================================
// Close Button Configuration
// ============================================================================

export interface CloseButtonConfig {
  /** Show close button */
  show: boolean
  /** Position of close button */
  position: 'top-right' | 'top-left'
  /** Offset from edge in pixels */
  offset: number
  /** Close button size */
  size: 'sm' | 'md' | 'lg'

  // Icon customization
  /** Icon stroke weight */
  iconStrokeWidth: 1 | 1.5 | 2 | 2.5 | 3
  /** Icon color (semantic token) */
  iconColor: string

  // Background customization
  /** When to show background */
  backgroundMode: 'always' | 'hover' | 'none'
  /** Background color token */
  backgroundColor: string
  /** Background opacity (0-100%) */
  backgroundOpacity: number
  /** Border radius preset */
  backgroundRadius: 'full' | 'xl' | 'lg' | 'md' | 'sm'
}

// ============================================================================
// Backdrop Configuration
// ============================================================================

export interface BackdropConfig {
  /** Blur amount in pixels (0-20) */
  blur: number
  /** Opacity percentage (0-100) */
  opacity: number
  /** Allow clicking backdrop to close */
  dismissable: boolean
}

// ============================================================================
// Animation Configuration
// ============================================================================

/** Layout morphing animation style */
export type LayoutAnimationStyle = 'spring' | 'tween'

/** Animation sync mode: independent timing or unified */
export type AnimationSyncMode = 'independent' | 'synced'

/** Master animation config (used when synced) */
export interface MasterAnimationConfig {
  /** Duration in seconds (0.15-0.8) */
  duration: number
  /** Spring bounce (0-0.4) */
  bounce: number
  /** Line stagger delay in seconds */
  stagger: number
}

export interface LayoutAnimationConfig {
  /** Animation style: spring physics or tween (duration-based) */
  style: LayoutAnimationStyle
  /** Duration in seconds (0.2-1.0) */
  duration: number
  /** Spring bounce (0-0.5), only applies to spring style */
  bounce: number
  /** Tween easing, only applies to tween style (Motion uses camelCase) */
  easing: 'easeOut' | 'easeInOut' | 'linear'
}

export interface AnimationConfig {
  /** Animation preset */
  preset: 'scale-fade' | 'slide-up' | 'slide-down' | 'flip-3d' | 'bounce' | 'custom'
  /** Animation duration in ms */
  duration: number
  /** Spring bounce (0-1) */
  bounce: number
  /** Animation delay in ms */
  delay: number
  /** Custom scale values */
  scale: {
    initial: number
    animate: number
  }
  /** Custom translateY values */
  translateY: {
    initial: number
    animate: number
  }
  /** Sync mode: independent timing or unified master timing */
  syncMode: AnimationSyncMode
  /** Master timing config (used when syncMode is 'synced') */
  master: MasterAnimationConfig
  /** Layout morphing animation (height transitions between stages) */
  layout: LayoutAnimationConfig
}

// ============================================================================
// Text Transition Configuration
// ============================================================================

/** Easing preset for text transitions */
export type TextTransitionEasing = 'spring' | 'elastic' | 'expo-out' | 'ease-out'

/** Text transition mode */
export type TextTransitionMode = 'crossfade' | 'flip'

export interface TextTransitionConfig {
  /** Whether text transition animation is enabled */
  enabled: boolean
  /** Animation mode: crossfade (overlapping) or flip (sequential) */
  mode: TextTransitionMode
  /** Vertical offset for enter/exit animation in pixels */
  yOffset: number
  /** Easing preset */
  easing: TextTransitionEasing
  /** Duration in ms (for non-spring easings) */
  duration: number
}

// ============================================================================
// Demo/Debug Configuration
// ============================================================================

export interface DemoConfig {
  /** Page background color */
  pageBackground: 'primary' | 'secondary' | 'tertiary'
  /** Show debug overlay */
  showDebug: boolean
  /** Slow motion animations (4x slower) */
  slowMo: boolean
  /** Auto-open modal on load */
  autoOpen: boolean
  /** Show colored outlines around container sections for debugging layout */
  showContainerOutlines: boolean
}

// ============================================================================
// Full Configuration
// ============================================================================

export interface ModalPlaygroundConfig {
  container: ContainerConfig
  header: HeaderConfig
  contentTop: ContentSectionConfig
  contentBottom: ContentSectionConfig
  buttons: ButtonsConfig
  closeButton: CloseButtonConfig
  backdrop: BackdropConfig
  animation: AnimationConfig
  textTransition: TextTransitionConfig
  demo: DemoConfig
  /** Global Pro Card configuration (used when content type is 'pro-card') */
  proCard: ProCardConfig
  /** Global Checklist configuration (used when content type is 'checklist') */
  checklist: ChecklistConfig
  /** Global Pricing Select configuration (used when content type is 'pricing-select') */
  pricingSelect: PricingSelectConfig
  /** Per-stage content configuration (title, content slots, button labels) */
  stages: StagesConfig
}

// ============================================================================
// Preset Types
// ============================================================================

export interface ModalPresetMeta {
  id: string
  name: string
  description?: string
  category?: 'default' | 'confirmation' | 'form' | 'dramatic'
  data: ModalPlaygroundConfig
}

// ============================================================================
// Stage Configuration (for multi-stage transitions)
// ============================================================================

/** Content slot type: wireframe placeholder bars, editable text, pro card, checklist, or pricing-select */
export type ContentSlotType = 'wireframe' | 'text' | 'pro-card' | 'checklist' | 'pricing-select'

// ============================================================================
// Asset Configuration (for header)
// ============================================================================

/** Asset type for modal header */
export type AssetType = 'placeholder' | 'coin-stack'

/** Coin stack state ID (1 = default/classic, 2 = arcade-blue) */
export type CoinStackStateId = 1 | 2

/** Coin stack asset configuration */
export interface CoinStackAssetConfig {
  /** Width of the coin stack in pixels (50-200) */
  width: number
  /** Default coin stack state/preset */
  stateId: CoinStackStateId
  /** Enable animated transitions between states */
  transitionEnabled: boolean
  /** Spring animation duration in seconds (0.1-1.0) */
  transitionDuration: number
  /** Spring animation bounce (0-0.5) */
  transitionBounce: number
}

/** Asset alignment */
export type AssetAlignment = 'left' | 'center'

/** Asset configuration for modal header */
export interface AssetConfig {
  /** Type of asset to display */
  type: AssetType
  /** Height of the asset container in pixels */
  height: number
  /** Horizontal alignment of the asset */
  alignment: AssetAlignment
  /** Horizontal offset in pixels (positive = right, negative = left) */
  offsetX: number
  /** Coin stack specific configuration (when type = 'coin-stack') */
  coinStack?: CoinStackAssetConfig
}

/** Per-stage asset state configuration */
export interface StageAssetConfig {
  /** Coin stack state ID for this stage */
  coinStackStateId: CoinStackStateId
}

/** Pro card gradient presets (arcade blue palette) */
export type ProCardGradient =
  | 'arcade-blue' // sky-300 -> blue-500
  | 'ocean-depth' // blue-400 -> blue-600
  | 'frost' // white -> sky-400
  | 'electric' // indigo-400 -> blue-500

/** Semantic text color tokens */
export type SemanticTextColor =
  | 'text-primary'
  | 'text-secondary'
  | 'text-tertiary'

/** Pro card text style: gradient or semantic token */
export type ProCardTextStyle = ProCardGradient | SemanticTextColor

/** Pro card text typography configuration */
export interface ProCardTextConfig {
  /** Font size in pixels ('auto' = calculate from height) */
  fontSize: number | 'auto'
  /** Font weight */
  fontWeight: '400' | '500' | '600' | '700' | '800' | '900'
  /** Letter spacing in em units (e.g., -0.02, 0, 0.02) */
  letterSpacing: number
  /** Text style for title (gradient or semantic token) */
  titleGradient: ProCardTextStyle
  /** Text style for multiplier (gradient or semantic token) */
  multiplierGradient: ProCardTextStyle
}

/** Pro card configuration */
export interface ProCardConfig {
  /** Display title (e.g., "Pro") */
  title: string
  /** Multiplier value (e.g., 2 -> displays as "Pro 2x") */
  multiplier: number
  /** Height of the pro card in pixels (40-300) */
  height: number
  /** Gradient preset for text (legacy - use text.titleGradient/multiplierGradient) */
  gradient: ProCardGradient
  /** Text typography settings */
  text: ProCardTextConfig
  /** Container styling */
  container: {
    /** Background semantic color */
    background: 'primary' | 'secondary' | 'tertiary' | 'transparent'
    /** Shine effect preset */
    shine: ContainerConfig['shine']
    /** Border radius in pixels */
    borderRadius: number
    /** Internal padding in pixels */
    padding: number
  }
  /** Glow effect settings */
  glow: {
    /** Enable glow effect */
    enabled: boolean
    /** Glow color (Tailwind color name) */
    color: string
    /** Blur amount in pixels */
    blur: number
    /** Opacity percentage (0-100) */
    opacity: number
    /** Hide glow effect on mobile devices */
    hideOnMobile: boolean
  }
}

/** Checklist content configuration */
export interface ChecklistConfig {
  /** Title text (e.g., "Next billing cycle (Mar 20th 2026)") */
  title: string
  /** Checklist items */
  items: string[]
  /** Title typography */
  titleSize: 'xs' | 'sm' | 'md'
  titleWeight: '400' | '500' | '600' | '700'
  titleColor: SemanticTextColor
  /** Item typography */
  itemSize: 'xs' | 'sm' | 'md'
  itemWeight: '400' | '500' | '600' | '700'
  itemColor: SemanticTextColor
  /** Checkmark color */
  checkColor: SemanticTextColor
  /** Gap between items in pixels */
  gap: number
}

/** Pricing select header configuration */
export interface PricingSelectHeaderConfig {
  /** Show header above pricing select */
  show: boolean
  /** Header text */
  text: string
  /** Font size */
  fontSize: 'xs' | 'sm' | 'md'
  /** Font weight */
  fontWeight: 'normal' | 'medium' | 'semibold'
  /** Text color */
  textColor: 'primary' | 'secondary' | 'tertiary'
  /** Opacity (0-100) */
  opacity: number
  /** Margin below header in pixels */
  marginBottom: number
}

/** Pricing select menu configuration */
export interface PricingSelectConfig {
  /** Available tier IDs for selection */
  availableTiers: string[]
  /** Enable upgrade mode (hides base tier) */
  upgradeMode: boolean
  /** Variant A dimensions (expandable dropdown) */
  variantA: {
    triggerHeight: number
    maxBottomHeight: number
  }
  /** Variant B dimensions (static card) */
  variantB: {
    triggerHeight: number
    bottomHeight: number
  }
  /** Panel width (number in px, or 'fill' to fill container) */
  panelWidth: number | 'fill'
  /** Appearance styling */
  appearance: {
    borderRadius: number
    shine: string
    background: 'primary' | 'secondary' | 'tertiary'
  }
  /** Variant transition animation */
  transition: {
    enabled: boolean
    duration: number
    bounce: number
    yOffset: number
  }
  /** Header configuration (shown above pricing select) */
  header: PricingSelectHeaderConfig
}

/** Pricing variant for pricing-select content type */
export type PricingVariant = 'A' | 'B'

/** Content slot configuration with type-specific options */
export interface ContentSlotConfig {
  /** Show this content slot (defaults to true if omitted) */
  show?: boolean
  /** Content type: wireframe bars, text paragraph, or pro card */
  type: ContentSlotType
  /** Height of the content slot in pixels (for wireframe/text types) */
  height: number
  /** Number of wireframe lines (only for wireframe type) */
  lineCount?: number
  /** Text content (only for text type) */
  text?: string
  /** Pricing select variant (only for pricing-select type) */
  pricingVariant?: PricingVariant
}

// ============================================================================
// Button State Types (for fluid button integration)
// ============================================================================

/** Checkmark entrance animation style */
export type CheckmarkEntranceStyle = 'draw' | 'flip'

/** Primary button visual state (maps to AnimatedRightButton) */
export interface PrimaryButtonState {
  /** Button label text */
  text: string
  /** Show loading spinner */
  showSpinner: boolean
  /** Show checkmark icon */
  showCheckmark: boolean
  /** Show text label */
  showText: boolean
}

/** Per-stage button configuration with visual state */
export interface StageButtonConfig {
  /** Primary button state */
  primary: PrimaryButtonState
  /** Secondary button label (null = hide secondary) */
  secondary: string | null
}

/** Fluid button animation config */
export interface FluidButtonConfig {
  /** Enable fluid layout animations */
  enabled: boolean
  /** Timing preset ('synced' derives values from modal master timing) */
  timing: 'default' | 'snappy' | 'smooth' | 'synced'
  /** Gap between buttons in pixels */
  gap: number
  /** Enable blur effect on exiting content */
  exitBlur: boolean
  /** Checkmark entrance animation style */
  checkmarkStyle: CheckmarkEntranceStyle
  /** Text slide duration in ms */
  textSlideDuration: number
  /** Checkmark draw duration in ms */
  checkmarkDrawDuration: number
  /** Enable text animation on button label changes */
  textAnimationEnabled?: boolean
}

/** Per-stage content configuration */
export interface StageContentConfig {
  headerTitle: string
  /** Per-stage subheader text (undefined = use global header.subheaderContent) */
  headerSubheader?: string
  contentA: ContentSlotConfig
  contentB: ContentSlotConfig
  buttons: StageButtonConfig
  /** Override global pushButtonsToBottom for this stage (undefined = use global) */
  pushButtonsToBottom?: boolean
  /** Per-stage asset configuration (overrides header.asset.coinStack.stateId) */
  asset?: StageAssetConfig
}

/** Stage ID type (1-5) */
export type StageId = 1 | 2 | 3 | 4 | 5

/** Stages configuration record */
export type StagesConfig = Record<StageId, StageContentConfig>
