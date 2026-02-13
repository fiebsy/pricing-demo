/**
 * Orders Page - Table Section
 *
 * Barrel export for table components and configuration.
 */

export { OrdersTable } from './OrdersTable'
export type { OrdersTableProps } from './OrdersTable'

export { createRenderCell } from './OrdersCellRenderer'

export { ORDER_COLUMNS, COLUMN_LABELS, COLUMN_KEYS } from './columns'
export type { ColumnKey } from './columns'

export { COLUMN_OPTIONS } from './options'

export { createColumnsSection, createTableSection } from './panel-config'
