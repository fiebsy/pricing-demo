/**
 * StickyDataTable V2 - Feature Configuration Types
 *
 * Table feature toggles.
 *
 * @module types/configuration/features
 */

/**
 * Table feature toggles
 */
export interface TableFeatureConfig {
  /** Enable row selection with checkboxes */
  enableSelection: boolean
  /** Show column visibility control */
  showColumnControl: boolean
  /** Show count display */
  showCount: boolean
  /** Show export button */
  showExport: boolean
  /** Drag clone mode for column reordering: 'floating' or 'inline' */
  dragCloneMode?: 'floating' | 'inline'
}
