/**
 * Collections Module
 *
 * Demo collections dashboard with mock data.
 * Mirrors the front-end partner collections page.
 */

// Types
export * from './types'

// Config
export * from './config'

// Mock data
export { MOCK_DATA, MOCK_METRICS } from './mock-data'

// Hooks
export { useMockPagination } from './hooks/use-mock-pagination'

// Components
export { renderCell } from './components/cell-renderer'
export { MetricTileBar, type MetricTileBarProps } from './components/metric-tile-bar'
export { PayProgressCircle } from './components/parts/pay-progress-circle'
export { LeftToolbarContent, RightToolbarContent } from './components/toolbar'

// Utils
export * from './utils/formatters'
