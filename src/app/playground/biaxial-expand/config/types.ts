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
// SLOT CONFIGURATION
// ============================================================================

export interface SlotPlaygroundConfig {
  enabled: boolean
  heightMode: HeightMode
  height: number
  delayOffset: number
  durationOffset: number
  background: BackgroundOption
  shine: string
  borderRadius: number
  inset: number
  borderWidth: number
  borderColor: BorderColorOption
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
  leftSlot: SlotPlaygroundConfig
  rightSlot: SlotPlaygroundConfig

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
