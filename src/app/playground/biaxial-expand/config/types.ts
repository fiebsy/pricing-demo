/**
 * BiaxialExpand Playground Configuration Types
 *
 * @status incubating
 * @migration-target src/components/ui/core/primitives/biaxial-expand
 */

import type {
  BackgroundOption,
  BorderColorOption,
  BackdropAnimationMode,
  ExpandOrigin,
  ExpandOriginX,
  PositionMode,
  VerticalAlign,
} from '@/components/ui/core/primitives/biaxial-expand'
import type {
  BorderRadius,
  Shadow,
  ShineVariant,
  GradientPattern,
  GradientColor,
} from '@/components/ui/core/primitives/menu/types'

// ============================================================================
// DEMO TYPES
// ============================================================================

export type DemoVariant = 'command-menu' | 'dashboard-metric' | 'custom'
export type PageBackground = 'primary' | 'secondary' | 'tertiary'
export type HeightMode = 'fixed' | 'auto' | 'dynamic'

// ============================================================================
// TRIGGER CONFIGURATION
// ============================================================================

/**
 * Styling configuration for trigger in a specific state (collapsed or expanded).
 */
export interface TriggerStateStyle {
  background: BackgroundOption
  shine: string
  borderRadius: number
  borderWidth: number
  borderColor: BorderColorOption
}

/**
 * Complete trigger playground configuration with collapsed and expanded states.
 */
export interface TriggerPlaygroundConfig {
  collapsed: TriggerStateStyle
  expanded: TriggerStateStyle
}

// ============================================================================
// SLOT CONFIGURATION
// ============================================================================

export interface SlotPlaygroundConfig {
  enabled: boolean
  heightMode: HeightMode
  height: number
  /**
   * Whether this slot's height contributes to panel height calculation.
   * When true, the slot's configured height will be considered.
   * The tallest slot wins via Math.max().
   * @default true for bottom, false for top/left/right
   */
  drivesPanelHeight?: boolean
  background: BackgroundOption
  shine: string
  borderRadius: number
  inset: number
  borderWidth: number
  borderColor: BorderColorOption
}

/**
 * Extended config for horizontal slots (left/right) with height/alignment options.
 *
 * Note: Width is controlled ONLY via layout.maxLeftWidth/maxRightWidth.
 * Per-slot width controls were removed as they were never wired to the component.
 */
export interface HorizontalSlotPlaygroundConfig extends SlotPlaygroundConfig {
  /** Maximum height for the slot (null = full panel height) - kept for backward compatibility */
  maxHeight: number | null
  /** Vertical alignment within the panel height */
  verticalAlign: VerticalAlign
  /**
   * The height value to use when drivesPanelHeight is true.
   * This height will contribute to panel height calculation.
   */
  drivingHeight?: number
}

// ============================================================================
// MAIN PLAYGROUND CONFIG
// ============================================================================

export interface BiaxialExpandPlaygroundConfig {
  // Layout
  layout: {
    triggerWidth: number          // 120-600
    triggerHeight: number         // 32-64
    panelWidth: number            // 200-800
    maxTopHeight: number          // 0-400
    maxBottomHeight: number       // 100-600
    maxLeftWidth: number          // 0-400
    maxRightWidth: number         // 0-400
    borderRadius: number          // 0-40
    topGap: number                // 0-24
    bottomGap: number             // 0-24
    leftGap: number               // 0-24
    rightGap: number              // 0-24
    backdropTopOffset: number     // 0-20
    expandOriginX: ExpandOriginX  // 'left' | 'center' | 'right'
    positionMode: PositionMode    // 'overlay' | 'push'
  }

  // Animation
  animation: {
    duration: number              // 100-800
    collapseDuration: number      // 50-400
    contentFadeDuration: number   // 0-400
    contentFadeDelay: number      // 0-200
    backdropMode: BackdropAnimationMode
    backdropDelay: number
    backdropDurationOffset: number
    animateSlotContainers: boolean
    slotContainerDelay: number
    slotContainerDurationOffset: number
    expandOrigin: ExpandOrigin
    topExpandOrigin: ExpandOrigin
    leftExpandOrigin: ExpandOriginX
    rightExpandOrigin: ExpandOriginX
  }

  // Appearance
  appearance: {
    borderRadius: BorderRadius
    shadow: Shadow
    shine: ShineVariant
    background: BackgroundOption
    gradient: GradientPattern
    gradientColor: GradientColor
    squircle: boolean
  }

  // Slots
  topSlot: SlotPlaygroundConfig
  bottomSlot: SlotPlaygroundConfig
  leftSlot: HorizontalSlotPlaygroundConfig
  rightSlot: HorizontalSlotPlaygroundConfig

  // Trigger styling
  trigger: TriggerPlaygroundConfig

  // Demo settings
  demo: {
    variant: DemoVariant
    pageBackground: PageBackground
    showDebug: boolean
    slowMo: boolean
  }
}

// ============================================================================
// PRESET TYPES
// ============================================================================

export interface BiaxialExpandPresetMeta {
  id: string
  name: string
  description?: string
  category?: 'default' | 'use-case' | 'minimal' | 'custom'
  data: BiaxialExpandPlaygroundConfig
}
