/**
 * Stacking Nav + Table Motion Playground - Types
 *
 * Combined types from stacking-nav-table and stacking-nav-motion.
 * Includes table configuration fields and full motion animation controls.
 */

import type {
  AnimationType,
  EasingType,
  ButtonVariant,
  ButtonSize,
  ButtonRoundness,
} from '@/components/ui/features/experimental/stacking-nav-motion'

// =============================================================================
// TABLE ENUMS (from stacking-nav-table)
// =============================================================================

export enum CharacterEnergy {
  MainCharacter = 'main-character',
  VillainArc = 'villain-arc',
  SideQuest = 'side-quest',
  NPCEnergy = 'npc-energy',
}

export enum ThreatLevel {
  STier = 's-tier',
  ATier = 'a-tier',
  BTier = 'b-tier',
  MemeTier = 'meme-tier',
}

export enum EmployeeStatus {
  Active = 'active',
  OnLeave = 'on-leave',
  Remote = 'remote',
  Contractor = 'contractor',
}

// =============================================================================
// DATA INTERFACES
// =============================================================================

export interface Character extends Record<string, unknown> {
  id: number
  name: string
  slug: string
  realm: string
  realmLabel: string
  faction: string
  factionLabel: string
  energy: CharacterEnergy
  threatLevel: ThreatLevel
  origin: string
  description: string
  trend: number[]
}

export interface Employee extends Record<string, unknown> {
  id: number
  name: string
  email: string
  role: string
  company: string
  companyLabel: string
  status: EmployeeStatus
  trend: number[]
}

// =============================================================================
// PLAYGROUND CONFIG TYPES
// =============================================================================

export type DataVariantId = 'characters' | 'employees'
export type PageBackground = 'primary' | 'secondary' | 'secondary_alt' | 'tertiary'
export type BorderColor = 'primary' | 'secondary' | 'tertiary'
export type BadgeStyleVariant = 'default' | 'modern'
export type BadgeShapeVariant = 'pill' | 'rounded' | 'squircle'
export type OriginImageType = 'poster' | 'logo' | 'backdrop'

// Motion-specific types
export type ConfigPreset = 'default' | 'spring' | 'custom'
export type CollapseMode = 'synchronized' | 'custom'
export type EntryDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'up-left'
  | 'up-right'
  | 'down-left'
  | 'down-right'
  | 'none'
  | 'custom'

// =============================================================================
// COMBINED PLAYGROUND CONFIG
// =============================================================================

export interface PlaygroundConfig {
  // =========================================================================
  // DATA
  // =========================================================================
  dataVariant: DataVariantId

  // =========================================================================
  // LAYOUT (Page)
  // =========================================================================
  pageBackground: PageBackground
  pageTopGap: number
  pageMaxWidth: number

  // =========================================================================
  // TABLE FEATURES
  // =========================================================================
  enableSelection: boolean
  showColumnControl: boolean
  showCount: boolean
  toolbarPaddingTop: number
  toolbarPaddingBottom: number
  toolbarPaddingLeft: number
  toolbarPaddingRight: number
  navToCountGap: number
  tableOpacity: number
  tableMuted: boolean
  enableColumnReorder: boolean

  // =========================================================================
  // TABLE BORDERS
  // =========================================================================
  borderRadius: number
  showOuterBorder: boolean
  showRowBorders: boolean
  showCellBorders: boolean
  outerBorderColor: BorderColor
  rowBorderColor: BorderColor
  rowBorderOpacity: number
  cellBorderColor: BorderColor
  cellBorderOpacity: number

  // =========================================================================
  // BADGE (Realm Badge)
  // =========================================================================
  badgeStyle: BadgeStyleVariant
  badgeShape: BadgeShapeVariant
  badgeNeutral: boolean

  // =========================================================================
  // ORIGIN AVATAR
  // =========================================================================
  originAvatarWidth: number
  originAvatarHeight: number
  originImageType: OriginImageType
  originLogoBg: boolean
  originLogoBgColor: string
  originLogoPaddingX: number
  originLogoPaddingY: number
  originLogoShine: string
  originLogoSquircle: boolean
  originLogoInvert: number
  // Logo outline
  originLogoOutline: boolean
  originLogoOutlineColor: string
  originLogoOutlineSize: number
  originLogoOutlineOpacity: number
  originLogoOutlineIntensity: number

  // =========================================================================
  // SPARKLINE CHART
  // =========================================================================
  sparklineHeight: number
  sparklineStrokeWidth: number
  sparklineShowFill: boolean
  sparklineShowDot: boolean

  // =========================================================================
  // MOTION CONFIG PRESET
  // =========================================================================
  configPreset: ConfigPreset

  // =========================================================================
  // ANIMATION TYPE
  // =========================================================================
  animationType: AnimationType

  // =========================================================================
  // SPRING ANIMATION
  // =========================================================================
  springStiffness: number
  springDamping: number
  springPreset: 'custom' | 'smooth' | 'snappy' | 'soft' | 'bouncy'

  // =========================================================================
  // TWEEN/EASING ANIMATION
  // =========================================================================
  tweenDuration: number
  tweenEase: EasingType

  // =========================================================================
  // PROMOTION ANIMATION
  // =========================================================================
  promotionDuration: number
  promotionScale: number

  // =========================================================================
  // CHILD ENTRY ANIMATION
  // =========================================================================
  childStagger: number
  entryDirection: EntryDirection
  entryOffsetX: number
  entryOffsetY: number
  childEntryDelay: number
  childEntryScale: number

  // =========================================================================
  // EXIT ANIMATION
  // =========================================================================
  /** Collapse mode: 'synchronized' auto-syncs exit/collapse timing, 'custom' allows manual control */
  collapseMode: CollapseMode
  exitScale: number
  exitUseCustomTiming: boolean
  exitDuration: number
  exitEase: EasingType
  exitDelay: number
  collapseLayoutDuration: number

  // =========================================================================
  // LEAF NODE BEHAVIOR
  // =========================================================================
  skipLeafAnimation: boolean

  // =========================================================================
  // BUTTON STYLE
  // =========================================================================
  buttonSize: ButtonSize
  buttonRoundness: ButtonRoundness

  // =========================================================================
  // BUTTON VARIANTS
  // =========================================================================
  expandedVariant: ButtonVariant
  childVariant: ButtonVariant
  anchoredVariant: ButtonVariant
  selectedLeafVariant: ButtonVariant

  // =========================================================================
  // STACKING BEHAVIOR
  // =========================================================================
  peekOffset: number
  anchoredOpacity: number
  gap: 'sm' | 'md' | 'lg'

  // =========================================================================
  // LEVEL ALL BUTTON
  // =========================================================================
  showLevelAll: boolean
  levelAllLabel: string
  levelAllActiveVariant: ButtonVariant
  levelAllInactiveVariant: ButtonVariant

  // =========================================================================
  // INTERACTION
  // =========================================================================
  hoverDelay: number

  // =========================================================================
  // DEBUG / DISPLAY
  // =========================================================================
  showNumbers: boolean
  showNavDebug: boolean
  timeScale: number
}
