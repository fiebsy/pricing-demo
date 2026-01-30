/**
 * StickyDataTable V2 - Cell Props
 *
 * Props interface for TableCell component.
 *
 * @module types/props/cell
 */

import type { ReactNode } from 'react'
import type { ComputedColumn, ColumnChange } from '../core/column.types'
import type { StickyState } from '../styling/sticky-state.types'
import type { BorderConfig } from '../styling/border.types'
import type { BackgroundConfig } from '../styling/background.types'

/** Props for TableCell component */
export interface TableCellProps {
  /** Column configuration */
  column: ComputedColumn
  /** Cell content */
  children: ReactNode
  /** Sticky state for styling */
  stickyState: StickyState
  /** Border configuration */
  borderConfig: BorderConfig
  /** Background configuration */
  backgroundConfig: BackgroundConfig
  /** Set of leaving column keys */
  leavingColumnKeys: Set<string>
  /** Current column change */
  columnChange: ColumnChange | null
  /** Force right alignment (for last column) */
  forceRightAlign?: boolean
  /** Text size class for the cell container */
  textSizeClass?: string
  /** Is this a header cell */
  isHeader?: boolean
  /** Header background getter */
  getHeaderBackground?: () => string
}
