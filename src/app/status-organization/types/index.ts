/**
 * Status Organization Page - Type Definitions
 */

// =============================================================================
// TYPOGRAPHY TYPES
// =============================================================================

export type BorderColor = 'primary' | 'secondary' | 'tertiary' | 'brand'

// =============================================================================
// TABLE BORDER CONFIG
// =============================================================================

export interface TableBorderConfig {
  showOuterBorder: boolean
  showHeaderRowBorder: boolean
  showRowBorders: boolean
  showCellBorders: boolean
  outerBorderColor: BorderColor
  headerRowBorderColor: BorderColor
  rowBorderColor: BorderColor
  cellBorderColor: BorderColor
  tableBorderRadius: number
}
