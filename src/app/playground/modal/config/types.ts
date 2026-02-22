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

export interface HeaderConfig {
  /** Show asset placeholder */
  showAsset: boolean
  /** Asset placeholder height in pixels */
  assetHeight: number
  /** Title typography */
  title: TitleConfig
  /** Title text content */
  titleContent: string
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
}

// ============================================================================
// Text Transition Configuration
// ============================================================================

/** Easing preset for text transitions */
export type TextTransitionEasing = 'spring' | 'elastic' | 'expo-out' | 'ease-out'

/** Text transition mode */
export type TextTransitionMode = 'crossfade' | 'flip'

export interface TextTransitionConfig {
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

export interface StageContentConfig {
  headerTitle: string
  contentA: { lineCount: number; height: number }
  contentB: { lineCount: number; height: number }
  buttons: { primary: string; secondary?: string }
}

export interface StageConfig {
  id: 1 | 2 | 3 | 4
  name: string
  content: StageContentConfig
}
