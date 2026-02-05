// =============================================================================
// TYPE ALIASES
// =============================================================================

export type ConfigPreset = 'default' | 'snappy' | 'bouncy' | 'smooth' | 'custom'

export type CSSEasing =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | `cubic-bezier(${string})`

export type PageBackground = 'primary' | 'secondary' | 'tertiary'

export type TriggerColor = 'neutral' | 'secondary' | 'tertiary'

export type SlotColor = 'error' | 'success' | 'warning' | 'brand'

/**
 * Side-stack mode determines which slots are enabled.
 * - 'both': Left + Trigger + Right
 * - 'left-only': Left + Trigger
 * - 'right-only': Trigger + Right
 */
export type SideStackMode = 'both' | 'left-only' | 'right-only'

// =============================================================================
// PLAYGROUND CONFIG INTERFACE
// =============================================================================

/**
 * Playground config for side-stack-layout.
 * Uses CSS Grid animation with clip-path reveals for side expansion.
 */
export interface PlaygroundConfig {
  // Preset
  configPreset: ConfigPreset

  // Mode
  sideStackMode: SideStackMode

  // Layout
  containerCount: number // 2-6 containers in horizontal row
  triggerWidth: number // px
  triggerHeight: number // px
  leftSlotWidth: number // px
  rightSlotWidth: number // px
  containerGap: number // Gap between containers in row
  slotInset: number // Padding inside slot containers

  // Animation
  animationDuration: number // ms - grid transition
  animationEasing: CSSEasing
  collapseDuration: number // ms - collapse animation
  slotContainerDurationOffset: number // ms - stagger timing

  // Slot Content Animation
  animateSlotContainers: boolean
  slotEntryDelay: number // ms - delay before content animates
  slotEntryDuration: number // ms - content animation duration

  // Appearance
  triggerColor: TriggerColor
  leftSlotColor: SlotColor
  rightSlotColor: SlotColor
  borderRadius: number // px
  containerBorderRadius: number // px
  showContainerBorder: boolean
  showSlotLabels: boolean

  // Page
  pageBackground: PageBackground

  // Debug
  showDebug: boolean
  slowMoEnabled: boolean
  reduceMotion: boolean
}
