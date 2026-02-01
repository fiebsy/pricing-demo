/**
 * Stacking Nav + Table Playground - Types
 *
 * Core types for the corporate directory playground.
 */

// =============================================================================
// ENUMS
// =============================================================================

export enum EmployeeStatus {
  Active = 'active',
  OnLeave = 'on-leave',
  Remote = 'remote',
  Contractor = 'contractor',
}

export enum SeniorityLevel {
  Junior = 'junior',
  Mid = 'mid',
  Senior = 'senior',
  Lead = 'lead',
  Director = 'director',
}

export enum PerformanceRating {
  Exceeds = 'exceeds',
  Meets = 'meets',
  Developing = 'developing',
  New = 'new',
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
  department: string
  departmentLabel: string
  team: string
  teamLabel: string
  status: EmployeeStatus
  level: SeniorityLevel
  salary: number
  startDate: Date
  performance: PerformanceRating
  projectCount: number
}

// =============================================================================
// PLAYGROUND CONFIG
// =============================================================================

export type PageBackground = 'primary' | 'secondary' | 'tertiary'
export type NavVariant = 'default' | 'spring'
export type BorderColor = 'primary' | 'secondary' | 'tertiary'

export interface PlaygroundConfig {
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
  // Nav
  navVariant: NavVariant
  showNavDebug: boolean
}
