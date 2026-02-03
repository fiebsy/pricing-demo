/**
 * Stacking Nav + Table Playground - Types
 *
 * Core types for the Multiverse Power Rankings playground.
 */

// =============================================================================
// ENUMS
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

// =============================================================================
// CHARACTER INTERFACE
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

// =============================================================================
// EMPLOYEE ENUMS (Corporate Directory variant)
// =============================================================================

export enum EmployeeStatus {
  Active = 'active',
  OnLeave = 'on-leave',
  Remote = 'remote',
  Contractor = 'contractor',
}

// =============================================================================
// EMPLOYEE INTERFACE
// =============================================================================

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
// PLAYGROUND CONFIG
// =============================================================================

export type DataVariantId = 'characters' | 'employees'
export type PageBackground = 'primary' | 'secondary' | 'secondary_alt' | 'tertiary'
export type NavVariant = 'default' | 'spring'
export type BorderColor = 'primary' | 'secondary' | 'tertiary'
export type BadgeStyleVariant = 'default' | 'modern'
export type BadgeShapeVariant = 'pill' | 'rounded' | 'squircle'

export type OriginImageType = 'none' | 'poster' | 'logo' | 'backdrop'

export interface PlaygroundConfig {
  // Data
  dataVariant: DataVariantId
  // Layout
  pageBackground: PageBackground
  pageTopGap: number
  pageMaxWidth: number
  // Table
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
  // Borders
  borderRadius: number
  showOuterBorder: boolean
  showRowBorders: boolean
  showCellBorders: boolean
  outerBorderColor: BorderColor
  rowBorderColor: BorderColor
  rowBorderOpacity: number
  cellBorderColor: BorderColor
  cellBorderOpacity: number
  // Badge
  badgeStyle: BadgeStyleVariant
  badgeShape: BadgeShapeVariant
  badgeNeutral: boolean
  // Origin Avatar
  originAvatarWidth: number
  originAvatarHeight: number
  originImageType: OriginImageType
  originShowLabel: boolean
  originLabelOpacity: number
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
  // Backdrop behind
  originShowBackdrop: boolean
  originBackdropPaddingX: number
  originBackdropPaddingY: number
  originBackdropShine: string
  originBackdropOpacity: number
  originBackdropRadius: number
  // Chart
  sparklineHeight: number
  sparklineStrokeWidth: number
  sparklineShowFill: boolean
  sparklineShowDot: boolean
  // Nav
  navVariant: NavVariant
  showNavDebug: boolean
}
