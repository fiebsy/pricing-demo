/**
 * Studio Module - Barrel Export
 *
 * Delphi AI Studio Audience Tab dashboard components and utilities.
 */

// Types
export * from './types'

// Config
export * from './config/column-config'
export * from './config/filter-config'
export * from './config/hardened-preset'

// Hooks
export * from './hooks/use-mock-audience'

// Components
export { MetricTileBar, type MetricTileBarProps } from './components/metric-tile-bar'
export { LeftToolbarContent, RightToolbarContent } from './components/toolbar'
export type { LeftToolbarContentProps, RightToolbarContentProps } from './components/toolbar'
export { renderCell } from './components/cell-renderer'

// Data
export { MOCK_USERS, calculateMetrics } from './data/mock-users'
