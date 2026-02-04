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
  powerScore: number
  origin: string
  description: string
  /**
   * Lives rescued/taken trend data (30 days).
   * Range: -100 to +100 (signed sparkline)
   * - Positive values = lives saved (heroes)
   * - Negative values = lives taken/endangered (villains)
   * - Zero = neutral impact
   *
   * Generated based on character archetype:
   * - pure-hero: +50 to +95, stable positive
   * - anti-hero: -20 to +60, volatile, crosses zero
   * - villain: -90 to -20, consistently negative
   * - redeemed: -40 → +60, upward trend
   * - fallen: +60 → -40, downward trend (e.g., Daenerys)
   * - neutral: -10 to +30, near zero
   * - mass-casualty: -60 to -100 with spikes (e.g., Thanos)
   * - incompetent: -20 to +5, comedic villains
   */
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
export type ChartType = 'line' | 'bar'
export type BarColorMode = 'neutral' | 'status' | 'chart'
export type ChartColorId = '1' | '2' | '3' | '4'
export type StatusColorId = 'neutral' | 'neutral-dark' | 'success' | 'error' | 'warning' | 'chart-1' | 'chart-2' | 'chart-3' | 'chart-4'

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
  chartType: ChartType
  sparklineHeight: number
  sparklineStrokeWidth: number
  sparklineShowFill: boolean
  sparklineShowDot: boolean
  // Baseline
  sparklineShowBaseline: boolean
  sparklineBaselineWidth: number
  sparklineBaselineOpacity: number
  // Bar Chart
  barGap: number
  barRadius: number
  barOpacity: number
  barColorMode: BarColorMode
  barChartColor: ChartColorId
  barPositiveColor: StatusColorId
  barNegativeColor: StatusColorId
  barShowTips: boolean
  barTipSize: number
  barTipColorMode: BarColorMode
  barTipChartColor: ChartColorId
  barTipPositiveColor: StatusColorId
  barTipNegativeColor: StatusColorId
  barShowTrendLine: boolean
  barTrendLineWidth: number
  barTrendLineOpacity: number
  barTrendLineColorMode: BarColorMode
  barTrendLineChartColor: ChartColorId
  barTrendLineStatusColor: StatusColorId
  // Baseline
  barBaselineColorMode: BarColorMode
  barBaselineChartColor: ChartColorId
  barBaselineStatusColor: StatusColorId
  // Nav
  navVariant: NavVariant
  showNavDebug: boolean
}
