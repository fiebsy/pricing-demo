/**
 * Pricing Modal Configuration Types
 *
 * Simplified modal layout with fixed dimensions, flow-based content,
 * and configurable sections: Asset, Header, Content A, Content B, Button.
 */

// ============================================================================
// Flow Configuration
// ============================================================================

/** Flow identifier */
export type FlowId = 'flow-a' | 'flow-b' | 'flow-c'

// ============================================================================
// Container Configuration
// ============================================================================

export interface ContainerConfig {
  /** Fixed modal width in pixels */
  width: number
  /** Fixed modal height in pixels */
  height: number
  /** Internal padding in pixels */
  padding: number
  /** Gap between sections in pixels */
  gap: number
  /** Border radius in pixels */
  borderRadius: number
  /** Corner shape variant */
  cornerShape: 'round' | 'squircle' | 'bevel' | 'scoop'
  /** Background semantic color */
  background:
    | 'primary'
    | 'primary_s1'
    | 'secondary'
    | 'secondary_p1'
    | 'secondary_t1'
    | 'secondary_t2'
    | 'secondary_subtle'
    | 'tertiary'
    | 'quaternary'
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
  /** Border width in pixels */
  borderWidth: number
  /** Border color (semantic token) */
  borderColor: string
}

// ============================================================================
// Asset Configuration
// ============================================================================

/** Coin stack preset IDs available for selection */
export type CoinStackPresetId = 'default' | 'arcade-blue-solid' | 'arcade-blue'

/** Coin stack horizontal alignment */
export type CoinStackAlignment = 'center' | 'left'

/** Coin stack configuration within asset section */
export interface CoinStackAssetConfig {
  /** Enable coin stack display */
  enabled: boolean
  /** Preset ID for coin stack styling */
  presetId: CoinStackPresetId
  /** Width of coin stack in pixels */
  width: number
  /** Horizontal alignment within asset section */
  alignment: CoinStackAlignment
  /** Show background container around coin stack */
  showBackground: boolean
  /** Background color for coin stack container */
  background: 'primary' | 'secondary' | 'tertiary'
  /** Border radius for background container */
  backgroundRadius: number | 'full'
  /** Corner shape variant */
  cornerShape: 'round' | 'squircle' | 'bevel' | 'scoop'
  /** Size mode: padding-based or fixed square */
  sizeMode: 'padding' | 'fixed'
  /** Padding for background container (when sizeMode is 'padding') */
  backgroundPadding: number
  /** Fixed square size in pixels (when sizeMode is 'fixed') */
  fixedSize: number
  /** Shine effect preset */
  shine: ContainerConfig['shine']
  /** Depth gradient preset (using actual CSS class names) */
  depth: 'none' | 'subtle-depth-20-primary' | 'subtle-depth-30-primary' | 'subtle-depth-40-primary' | 'subtle-depth-50-primary'
  /** Shadow size */
  shadow: ContainerConfig['shadow']
}

export interface AssetConfig {
  /** Show asset section */
  show: boolean
  /** Asset height in pixels */
  height: number
  /** Placeholder background */
  background: 'none' | 'primary' | 'secondary' | 'tertiary'
  /** Horizontal offset for asset positioning (can be negative) */
  xOffset: number
  /** Coin stack configuration */
  coinStack: CoinStackAssetConfig
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
  /** Icon stroke weight */
  iconStrokeWidth: 1 | 1.5 | 2 | 2.5 | 3
  /** Icon color (semantic token) */
  iconColor: string
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
// Header Configuration
// ============================================================================

export interface HeaderConfig {
  /** Title text */
  title: string
  /** Title text color */
  titleColor: string
  /** Title font size */
  titleSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  /** Title font weight */
  titleWeight: '300' | '400' | '500' | '600' | '700' | '800'
  /** Text alignment */
  textAlign: 'left' | 'center'
  /** Show subheader */
  showSubheader: boolean
  /** Subheader text */
  subheader: string
  /** Subheader text color */
  subheaderColor: string
  /** Subheader font size */
  subheaderSize: 'xs' | 'sm' | 'md' | 'lg'
  /** Subheader font weight */
  subheaderWeight: '300' | '400' | '500' | '600' | '700' | '800'
  /** Gap between title and subheader in pixels */
  gap: number
  /** Top offset/margin for header alignment (can be negative) */
  topOffset: number
}

// ============================================================================
// Content Section Configuration
// ============================================================================

/** Content type options */
export type ContentType = 'wireframe' | 'pro-card' | 'pricing-select' | 'checklist'

export interface ContentSectionConfig {
  /** Show this content section */
  show: boolean
  /** Content display type */
  type: ContentType
  /** Section height in pixels (for wireframe type) */
  height: number
  /** Number of wireframe lines */
  lineCount: number
  /** Gap between wireframe lines */
  lineGap: number
  /** Text color */
  textColor: string
  /** Text size */
  textSize: 'xs' | 'sm' | 'md'
  /** Text weight */
  textWeight: '300' | '400' | '500' | '600' | '700' | '800'
}

// ============================================================================
// Separator Configuration
// ============================================================================

export interface SeparatorConfig {
  /** Show separator line */
  show: boolean
  /** Position of the separator */
  position: 'after-header' | 'after-content-a' | 'after-content-b'
  /** Thickness in pixels (1-4) */
  thickness: number
  /** Border color (semantic token) */
  color: string
  /** Full width or inset */
  fullWidth: boolean
  /** Horizontal inset amount when not full width (0-32px) */
  insetAmount: number
}

// ============================================================================
// Content B Configuration (extends with fill behavior)
// ============================================================================

export interface ContentBConfig extends ContentSectionConfig {
  /** Whether content B fills remaining space (flex-1) */
  fill: boolean
  /** Checklist layout settings (when type is 'checklist') */
  checklistLayout: {
    /** Max width for checklist (0 = no constraint) */
    maxWidth: number
    /** Center the checklist horizontally */
    centered: boolean
    /** Prevent text wrapping */
    noWrap: boolean
    /** Allow content to overflow container */
    overflow: boolean
  }
}

// ============================================================================
// Button Configuration
// ============================================================================

export interface ButtonConfig {
  /** Button label */
  label: string
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
  /** Enable corner squircle */
  cornerSquircle: boolean
}

// ============================================================================
// Pro Card Configuration
// ============================================================================

/** Pro card gradient presets */
export type ProCardGradient =
  | 'arcade-blue'
  | 'ocean-depth'
  | 'frost'
  | 'electric'

/** Semantic text color tokens */
export type SemanticTextColor =
  | 'text-primary'
  | 'text-secondary'
  | 'text-tertiary'

/** Pro card text style: gradient or semantic token */
export type ProCardTextStyle = ProCardGradient | SemanticTextColor

export interface ProCardConfig {
  /** Display title */
  title: string
  /** Multiplier value */
  multiplier: number
  /** Gradient preset for text */
  gradient: ProCardGradient
  /** Text typography */
  text: {
    fontSize: number | 'auto'
    fontWeight: '400' | '500' | '600' | '700' | '800' | '900'
    letterSpacing: number
    titleGradient: ProCardTextStyle
    multiplierGradient: ProCardTextStyle
  }
  /** Container styling */
  container: {
    background: 'primary' | 'secondary' | 'tertiary' | 'transparent'
    shine: ContainerConfig['shine']
    borderRadius: number
    padding: number
  }
  /** Glow effect */
  glow: {
    enabled: boolean
    color: string
    blur: number
    opacity: number
    hideOnMobile: boolean
  }
}

// ============================================================================
// Animation Configuration
// ============================================================================

export interface AnimationConfig {
  /** Animation preset */
  preset: 'scale-fade' | 'slide-up' | 'slide-down'
  /** Duration in ms */
  duration: number
  /** Spring bounce */
  bounce: number
}

// ============================================================================
// Demo/Debug Configuration
// ============================================================================

export interface DemoConfig {
  /** Page background */
  pageBackground: 'primary' | 'secondary' | 'tertiary'
  /** Auto-open modal */
  autoOpen: boolean
  /** Show debug outlines */
  showOutlines: boolean
  /** Slow motion mode for debugging animations */
  slowMo?: boolean
}

// ============================================================================
// Backdrop Configuration
// ============================================================================

export interface BackdropConfig {
  /** Backdrop opacity (0-100) */
  opacity: number
  /** Backdrop blur amount in pixels */
  blur: number
  /** Backdrop color */
  color: 'black' | 'white' | 'gray'
  /** Click to dismiss when not in autoOpen mode */
  dismissable: boolean
}

// ============================================================================
// Checklist Configuration
// ============================================================================

/** Gap between checklist items */
export type ChecklistItemGap = 'tight' | 'normal' | 'relaxed' | 'loose'

/** Available icon types for checklist */
export type ChecklistIconType = 'checkmark' | 'sparkles' | 'circle' | 'star' | 'none'

/** Icon weight variants */
export type ChecklistIconWeight = 'stroke' | 'solid' | 'duotone'

/** Text size options */
export type ChecklistTextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl'

/** Text weight options */
export type ChecklistTextWeight = 'normal' | 'medium' | 'semibold' | 'bold'

/** Semantic color options */
export type ChecklistSemanticColor = 'primary' | 'secondary' | 'tertiary' | 'accent'

/** Icon size options */
export type ChecklistIconSize = 'sm' | 'base' | 'lg'

/** Checklist text style configuration */
export interface ChecklistTextStyle {
  size: ChecklistTextSize
  weight: ChecklistTextWeight
  color: ChecklistSemanticColor
  opacity: number // 0-100
}

/** Checklist icon style configuration */
export interface ChecklistIconStyle {
  size: ChecklistIconSize
  weight: ChecklistIconWeight
  color: ChecklistSemanticColor | 'inherit'
  opacity: number // 0-100
}

/** Individual checklist item */
export interface ChecklistItem {
  id: string
  /** Text content - supports {price}, {credits}, {planName} interpolation */
  text: string
  /** Optional secondary text (date, price, etc.) - supports interpolation */
  date?: string
  /** Icon type */
  icon: ChecklistIconType
}

/** Complete checklist configuration */
export interface ChecklistConfig {
  items: ChecklistItem[]
  itemGap: ChecklistItemGap
  textStyle: ChecklistTextStyle
  iconStyle: ChecklistIconStyle
  dateStyle: ChecklistTextStyle
}

// ============================================================================
// Per-Flow Content Configuration
// ============================================================================

/** Content A Header configuration (optional header above content A) */
export interface ContentAHeaderConfig {
  /** Show the header */
  show: boolean
  /** Header text */
  text: string
  /** Text size */
  size: 'xs' | 'sm' | 'md' | 'lg'
  /** Font weight */
  weight: '300' | '400' | '500' | '600' | '700' | '800'
  /** Text color (semantic token) */
  color: string
  /** Text opacity (0-100%) */
  opacity: number
}

export interface FlowContentConfig {
  /** Header title for this flow */
  headerTitle: string
  /** Header subheader for this flow */
  headerSubheader: string
  /** Content A configuration overrides */
  contentA: {
    show: boolean
    type: ContentType
    height: number
    lineCount: number
  }
  /** Content B configuration overrides */
  contentB: {
    show: boolean
    type: ContentType
    height: number
    lineCount: number
  }
  /** Button label for this flow */
  buttonLabel: string
  /** Asset section overrides for this flow */
  asset?: {
    /** Show coin stack in this flow (overrides global setting) */
    showCoinStack?: boolean
    /** Coin stack preset ID override for this flow */
    coinStackPresetId?: CoinStackPresetId
  }
  /** Optional header above content A (useful for pricing-select type) */
  contentAHeader?: ContentAHeaderConfig
  /** Optional per-flow checklist items override */
  checklistItems?: ChecklistItem[]
}

/** Flow configuration record */
export type FlowsConfig = Record<FlowId, FlowContentConfig>

// ============================================================================
// Pricing Select Menu Configuration
// ============================================================================

/** Easing options for animations */
export type PricingSelectEasing =
  | 'expo-out'
  | 'ease-out'
  | 'ease-in-out'
  | 'cubic-out'
  | 'quart-out'
  | 'back-out'
  | 'linear'

/** Background options for pricing select */
export type PricingSelectBackground = 'primary' | 'secondary' | 'tertiary' | 'quaternary'

/** Background options for menu (matches MenuAppearance.background) */
export type PricingSelectMenuBackground = 'primary' | 'secondary' | 'tertiary' | 'quaternary'

/** Gradient presets for depth effect */
export type PricingSelectGradient = 'none' | 'subtle-depth-sm' | 'subtle-depth-md' | 'subtle-depth-lg'

/** Gradient color (matches pricing select menu GradientColor) */
export type PricingSelectGradientColor = 'brand' | 'primary' | 'secondary' | 'tertiary' | 'gray' | 'gray-light'

export interface PricingSelectConfig {
  /** Appearance settings */
  appearance: {
    /** Container background color */
    background: PricingSelectMenuBackground
    /** Shine effect preset */
    shine: ContainerConfig['shine']
    /** Shadow depth */
    shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    /** Border radius preset */
    borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    /** Enable squircle corners */
    squircle: boolean
    /** Depth gradient effect */
    gradient: PricingSelectGradient
    /** Gradient color base */
    gradientColor: PricingSelectGradientColor
  }
  /** Animation settings */
  animation: {
    /** Expand animation duration in ms */
    duration: number
    /** Collapse animation duration in ms */
    collapseDuration: number
    /** Easing function */
    easing: PricingSelectEasing
  }
  /** Bottom slot (options list) settings */
  bottomSlot: {
    /** Background color */
    background: PricingSelectBackground
    /** Shine effect */
    shine: ContainerConfig['shine']
    /** Border radius in px */
    borderRadius: number
    /** Inset from container edge in px */
    inset: number
    /** Border width in px */
    borderWidth: number
    /** Border color token */
    borderColor: 'primary' | 'secondary' | 'tertiary'
  }
  /** Trigger hover background */
  triggerHoverBackground: PricingSelectBackground
}

// ============================================================================
// Radial Flare Configuration
// ============================================================================

/** Available flare colors */
export type RadialFlareColor =
  | 'white'
  | 'gray-200'
  | 'gray-300'
  | 'gray-400'
  | 'blue-400'
  | 'blue-500'
  | 'blue-600'
  | 'sky-400'
  | 'sky-500'

/** Single radial flare configuration */
export interface RadialFlareItem {
  /** Enable this flare */
  enabled: boolean
  /** Flare color */
  color: RadialFlareColor
  /** Opacity (0-100) */
  opacity: number
  /** Size in pixels */
  size: number
  /** Blur amount in pixels */
  blur: number
  /** X offset from top-right corner (negative moves left) */
  offsetX: number
  /** Y offset from top-right corner (positive moves down) */
  offsetY: number
}

/** Radial flare configuration (supports up to 3 layered radials) */
export interface RadialFlareConfig {
  /** Enable flare effects */
  enabled: boolean
  /** First radial flare (typically largest/most subtle) */
  flare1: RadialFlareItem
  /** Second radial flare (medium layer) */
  flare2: RadialFlareItem
  /** Third radial flare (accent layer) */
  flare3: RadialFlareItem
}

// ============================================================================
// Decorations Configuration
// ============================================================================

/** Noise texture configuration */
export interface NoiseDecorationConfig {
  /** Enable noise texture */
  enabled: boolean
  /** Opacity (0-100) */
  opacity: number
  /** Noise scale/frequency (smaller = finer grain) */
  scale: number
  /** Radial fade from corner (0 = no fade, 100 = max fade) */
  radialFade: number
  /** Blend mode */
  blendMode: 'overlay' | 'soft-light' | 'multiply' | 'screen'
}

/** Sparkles decoration configuration */
export interface SparklesDecorationConfig {
  /** Enable sparkles */
  enabled: boolean
  /** Number of sparkles (3-12) */
  count: number
  /** Base size in pixels */
  size: number
  /** Size variation (0-100) */
  sizeVariation: number
  /** Opacity (0-100) */
  opacity: number
  /** Radial fade from corner (0 = no fade, 100 = max fade) */
  radialFade: number
  /** Sparkle color */
  color: RadialFlareColor
  /** Spread area in pixels from corner */
  spread: number
}

/** Rings decoration configuration */
export interface RingsDecorationConfig {
  /** Enable rings */
  enabled: boolean
  /** Number of rings (1-5) */
  count: number
  /** Starting radius in pixels */
  startRadius: number
  /** Gap between rings in pixels */
  gap: number
  /** Ring stroke width in pixels */
  strokeWidth: number
  /** Opacity (0-100) */
  opacity: number
  /** Radial fade from corner (0 = no fade, 100 = max fade) */
  radialFade: number
  /** Ring color */
  color: RadialFlareColor
  /** Arc angle (90 = quarter circle, 180 = half) */
  arcAngle: number
}

/** Combined decorations config */
export interface DecorationsConfig {
  /** Noise texture */
  noise: NoiseDecorationConfig
  /** Sparkle accents */
  sparkles: SparklesDecorationConfig
  /** Concentric rings */
  rings: RingsDecorationConfig
}

// ============================================================================
// Full Configuration
// ============================================================================

export interface PricingPlaygroundConfig {
  container: ContainerConfig
  radialFlare: RadialFlareConfig
  decorations: DecorationsConfig
  asset: AssetConfig
  closeButton: CloseButtonConfig
  header: HeaderConfig
  separator: SeparatorConfig
  contentA: ContentSectionConfig
  contentB: ContentBConfig
  button: ButtonConfig
  proCard: ProCardConfig
  checklist: ChecklistConfig
  animation: AnimationConfig
  demo: DemoConfig
  backdrop: BackdropConfig
  flows: FlowsConfig
  pricingSelect: PricingSelectConfig
}
