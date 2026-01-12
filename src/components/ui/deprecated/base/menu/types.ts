/**
 * Base UI Menu - Type Definitions
 *
 * Core types for the animated menu component with nested submenu support.
 * Built on Base UI primitives.
 *
 * @module base-ui/menu/types
 */

import type { ReactNode, ComponentType } from 'react'

// ============================================================================
// Menu Item Types
// ============================================================================

/**
 * Icon type - supports HugeIcons components (both function and data formats)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IconType = any

/**
 * Base menu item properties shared by all item types
 */
export interface MenuItemBase {
  /** Unique identifier for the menu item */
  id: string
  /** Display label for the menu item */
  label: string
  /** Optional icon component */
  icon?: IconType
  /** Additional CSS classes */
  className?: string
  /** Show divider before or after this item */
  divider?: 'before' | 'after'
  /** Whether the item is disabled */
  disabled?: boolean
}

/**
 * Action menu item - triggers a callback when clicked
 */
export interface MenuItemAction extends MenuItemBase {
  type?: 'action'
  /** Click handler */
  onClick?: () => void
  /** Keyboard shortcut hint (e.g., "⌘K") */
  shortcut?: string
  /** Optional addon element (right side) */
  addon?: ReactNode
}

/**
 * Submenu item - contains nested menu items
 */
export interface MenuItemSubmenu extends MenuItemBase {
  type: 'submenu'
  /** Nested menu items */
  items: MenuItem[]
  /** Optional description/subtext shown below the label */
  description?: string
  /** Keyboard shortcut hint (e.g., "⌘K") */
  shortcut?: string
}

/**
 * Separator item - visual divider between items
 */
export interface MenuItemSeparator {
  type: 'separator'
  id: string
}

/**
 * Label item - non-interactive section header
 */
export interface MenuItemLabel {
  type: 'label'
  id: string
  label: string
}

/**
 * Union type for all menu item types
 */
export type MenuItem =
  | MenuItemAction
  | MenuItemSubmenu
  | MenuItemSeparator
  | MenuItemLabel

// ============================================================================
// Configuration Types
// ============================================================================

/**
 * Menu alignment relative to trigger
 */
export type MenuAlign = 'start' | 'center' | 'end'

/**
 * Which side of the trigger to open the menu
 */
export type MenuSide = 'top' | 'right' | 'bottom' | 'left'

/**
 * Visual variants affecting spacing and sizing
 */
export type MenuVariant = 'default' | 'compact' | 'spacious'

// ============================================================================
// Animation Configuration Types
// ============================================================================

/**
 * Configuration for the reveal/scale animation when menu opens
 */
export interface RevealAnimationConfig {
  /** Duration of the scale animation in ms */
  duration: number
  /** CSS easing function */
  easing: string
  /** Direction the reveal originates from (affects transform-origin) */
  direction: 'left' | 'right' | 'top' | 'bottom' | 'center'
  /** Starting scale value (0-1) */
  scaleStart: number
  /** Ending scale value (typically 1) */
  scaleEnd: number
  /** How the inner content animates during reveal */
  contentAnimation: 'normal' | 'fade' | 'scale-with' | 'scale-opposite'
  /** Delay before content animation starts (ms) */
  contentDelay: number
  /** Whether to loop the animation (for testing) */
  loop?: boolean
  /** Whether to include opacity in container animation (default: true) */
  includeOpacity?: boolean
  /** Starting opacity value (0-1, default: 0) */
  opacityStart?: number
  /** Ending opacity value (0-1, default: 1) */
  opacityEnd?: number
  /** Delay before opacity animation starts (ms, default: 0) */
  opacityDelay?: number
}

/**
 * @deprecated No longer needed - CSS Grid handles height automatically
 * Kept for backwards compatibility
 */
export interface HeightTransitionConfig {
  /** Duration of the height animation in ms */
  duration: number
  /** CSS easing function */
  easing: string
}

// ============================================================================
// Appearance Configuration Types
// ============================================================================

/**
 * Available gradient patterns for menu background
 *
 * Intensity levels:
 * - sm: Very subtle, barely visible (max 28% opacity)
 * - md: Moderate depth effect (max 54% opacity)
 * - lg: Strong depth effect (max 80% opacity)
 * - xl: Bold/pronounced effect (max 95% opacity) - good for inverted colors
 */
export type MenuGradientPattern =
  | 'none'
  | 'subtle-depth-sm'
  | 'subtle-depth-md'
  | 'subtle-depth-lg'
  | 'subtle-depth-xl'
  | 'subtle-depth-sm-inverse'
  | 'subtle-depth-md-inverse'
  | 'subtle-depth-lg-inverse'
  | 'subtle-depth-xl-inverse'

/**
 * Available gradient colors (semantic tokens)
 */
export type MenuGradientColor =
  | 'brand'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'gray'
  | 'gray-light'
  | 'inverted-primary'
  | 'inverted-secondary'
  | 'inverted-tertiary'
  | 'inverted-quaternary'
  | 'success'
  | 'error'
  | 'warning'
  | 'chart-1'
  | 'chart-2'
  | 'chart-3'
  | 'chart-4'

/**
 * Available background colors (semantic tokens)
 */
export type MenuBackgroundColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'white'
  | 'black'

/**
 * Available border radius sizes
 */
export type MenuBorderRadius =
  | 'none'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | 'full'

/**
 * Available shadow intensities
 */
export type MenuShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

/**
 * Available border/shine styles
 * Each shine level has 3 intensities: default, subtle, intense
 */
export type MenuBorderStyle =
  | 'none'
  | 'default'
  // Shine 0 variants
  | 'shine-0'
  | 'shine-0-subtle'
  | 'shine-0-intense'
  // Shine 1 variants
  | 'shine-1'
  | 'shine-1-subtle'
  | 'shine-1-intense'
  // Shine 2 variants
  | 'shine-2'
  | 'shine-2-subtle'
  | 'shine-2-intense'
  // Shine 3 variants
  | 'shine-3'
  | 'shine-3-subtle'
  | 'shine-3-intense'
  // Brand variants
  | 'shine-brand'
  | 'shine-brand-subtle'
  | 'shine-brand-intense'

/**
 * Appearance configuration for the menu popup
 * Controls background, gradient, border, shadow, and shape
 */
export interface MenuAppearanceConfig {
  /** Background color token - defaults to 'primary' */
  backgroundColor?: MenuBackgroundColor
  /** Gradient pattern to apply - defaults to 'subtle-depth-md' */
  gradient?: MenuGradientPattern
  /** Gradient color token - defaults to 'gray-light' */
  gradientColor?: MenuGradientColor
  /** Border radius size - defaults to 'full' (24px) */
  borderRadius?: MenuBorderRadius
  /** Shadow intensity - defaults to 'lg' */
  shadow?: MenuShadow
  /** Border/shine style - defaults to 'shine-1' */
  border?: MenuBorderStyle
  /** Enable iOS-style corner squircle - defaults to true */
  cornerSquircle?: boolean
}

/**
 * Configuration for slide transition between menu levels
 */
export interface SlideTransitionConfig {
  /** Duration of the slide animation in ms */
  duration: number
  /** CSS easing function */
  easing: string
}

// ============================================================================
// Component Props Types
// ============================================================================

/**
 * Props for the core BaseUIMenu component
 *
 * Animation Architecture:
 * - Container 1: Menu.Popup (outer wrapper)
 * - Container 1A: Root menu panel
 * - Container 1B: Submenu panel(s)
 */
export interface BaseUIMenuProps {
  /** Trigger element */
  trigger: ReactNode
  /** Menu items to display */
  items: MenuItem[]
  /** Horizontal alignment relative to trigger */
  align?: MenuAlign
  /** Which side of the trigger to open */
  side?: MenuSide
  /** Offset from trigger in pixels (vertical) */
  sideOffset?: number
  /** Offset along the alignment axis in pixels (horizontal) */
  alignOffset?: number
  /** Fixed width in pixels */
  width?: number
  /** Visual variant */
  variant?: MenuVariant
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Additional className for the menu content (animations, etc.) */
  className?: string
  /**
   * Appearance configuration for the menu popup
   * Controls background, gradient, border, shadow, and shape
   * When provided, these props take precedence over defaults
   */
  appearance?: MenuAppearanceConfig
  /**
   * @deprecated No longer used - uses slideTransition timing
   */
  heightTransition?: HeightTransitionConfig
  /** Transition configuration for slide and height animations */
  slideTransition?: SlideTransitionConfig
  /**
   * Whether the menu should be modal (blocks interaction with rest of page)
   * @default false
   */
  modal?: boolean
  /** Optional header content to render at the top of the root menu */
  header?: ReactNode

  // ============================================================================
  // Panel Navigation Animation (1A ↔ 1B)
  // ============================================================================

  /**
   * Whether to animate Container 1 height when switching panels
   * @default true
   */
  heightAnimationEnabled?: boolean

  /**
   * Whether to crossfade opacity between 1A and 1B during transitions
   * @default true
   */
  opacityCrossfadeEnabled?: boolean

  /**
   * Opacity duration as ratio of slide duration (0.5 - 1.0)
   * Lower = faster fade, creating more overlap effect
   * @default 0.8
   */
  opacityDurationRatio?: number
}

/**
 * Icon trigger configuration for RevealMenu
 */
export interface IconTriggerConfig {
  icon: IconType
  className?: string
  variant?: 'default' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Props for the RevealMenu wrapper (adds reveal animation)
 */
export interface RevealMenuProps extends Omit<BaseUIMenuProps, 'open' | 'trigger'> {
  /** Trigger element or icon configuration */
  trigger: ReactNode | IconTriggerConfig
  /** Reveal animation configuration */
  revealConfig?: RevealAnimationConfig
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
}

/**
 * Props for the icon trigger button
 */
export interface IconTriggerProps {
  /** Icon component to render */
  icon: IconType
  /** Additional CSS classes */
  className?: string
  /** Whether the menu is currently open */
  isOpen?: boolean
}

// ============================================================================
// Internal State Types
// ============================================================================

/**
 * CSS custom properties for menu animations
 */
export interface MenuCSSVars {
  '--menu-root-height': string
  '--menu-submenu-height': string
  '--menu-target-height': string
  '--menu-transition-duration': string
  '--menu-transition-easing': string
}
