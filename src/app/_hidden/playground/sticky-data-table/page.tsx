/**
 * Sticky Data Table Playground
 *
 * Minimalist testing environment for StickyDataTable component.
 * Allows optimization and feature testing with sample data.
 */

'use client'

import { useCallback, useMemo, useState } from 'react'
import { Breadcrumbs } from '@/components/ui/deprecated/nav'
import {
  StickyDataTable,
  type ColumnConfig,
} from '@/components/ui/prod/data/sticky-data-table'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
  type Section as ControlSection,
  type UnifiedControlPanelProps,
} from '@/components/ui/prod/base/control-panel'
type UnifiedControlPanelConfig = UnifiedControlPanelProps['config']

// =============================================================================
// TYPES
// =============================================================================

interface SampleRow extends Record<string, unknown> {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive' | 'pending'
  amount: number
  date: string
  department: string
  location: string
}

type ToolbarPosition = 'above' | 'integrated'

interface TableConfig {
  // Data
  rowCount: number
  // Dimensions
  borderRadius: number
  rowHeight: number
  headerHeight: number
  // Sticky Layout
  headerGap: number
  toolbarPosition: ToolbarPosition
  toolbarBottomMargin: number
  toolbarToCountGap: number
  // Features
  showColumnControl: boolean
  enableSelection: boolean
}

// =============================================================================
// SAMPLE DATA
// =============================================================================

const DEPARTMENTS = ['Engineering', 'Marketing', 'Sales', 'Operations', 'Finance', 'HR']
const LOCATIONS = ['New York', 'San Francisco', 'London', 'Tokyo', 'Sydney', 'Berlin']
const STATUSES: SampleRow['status'][] = ['active', 'inactive', 'pending']

// Seeded pseudo-random for deterministic data generation
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

const generateSampleData = (count: number): SampleRow[] => {
  // Fixed base date for deterministic dates
  const baseDate = new Date('2024-01-01').getTime()

  return Array.from({ length: count }, (_, i) => ({
    id: `USR-${String(i + 1).padStart(4, '0')}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    status: STATUSES[i % 3],
    amount: Math.round(seededRandom(i + 1) * 10000) / 100,
    date: new Date(baseDate - seededRandom(i + 100) * 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US'),
    department: DEPARTMENTS[i % DEPARTMENTS.length],
    location: LOCATIONS[i % LOCATIONS.length],
  }))
}

// =============================================================================
// COLUMN CONFIGURATION
// =============================================================================

const columns: ColumnConfig[] = [
  { key: 'id', width: 100, align: 'left', isSticky: true },
  { key: 'name', width: 160, align: 'left', isSticky: true },
  { key: 'email', width: 220, align: 'left' },
  { key: 'status', width: 100, align: 'center', sortable: true },
  { key: 'amount', width: 120, align: 'right', sortable: true },
  { key: 'date', width: 120, align: 'left', sortable: true },
  { key: 'department', width: 140, align: 'left' },
  { key: 'location', width: 140, align: 'left' },
]

const columnLabels: Record<string, string> = {
  id: 'ID',
  name: 'Name',
  email: 'Email',
  status: 'Status',
  amount: 'Amount',
  date: 'Date',
  department: 'Department',
  location: 'Location',
}

// =============================================================================
// CONSTANTS
// =============================================================================

const DEFAULT_CONFIG: TableConfig = {
  // Data
  rowCount: 50,
  // Dimensions
  borderRadius: 20,
  rowHeight: 46,
  headerHeight: 48,
  // Sticky Layout
  headerGap: 12,
  toolbarPosition: 'above',
  toolbarBottomMargin: 16,
  toolbarToCountGap: 6,
  // Features
  showColumnControl: true,
  enableSelection: false,
}

// =============================================================================
// PANEL CONFIGURATION
// =============================================================================

const TOOLBAR_POSITION_OPTIONS = [
  { label: 'Above Table', value: 'above' },
  { label: 'Integrated (Sticky)', value: 'integrated' },
]

const createPanelConfig = (config: TableConfig): ControlSection => ({
  id: 'table-config',
  title: 'Table Configuration',
  tabLabel: 'Config',
  subsections: [
    {
      title: 'Data',
      controls: [
        {
          id: 'rowCount',
          label: 'Row Count',
          type: 'slider',
          value: config.rowCount,
          min: 10,
          max: 500,
          step: 10,
          formatLabel: (v: number) => `${v} rows`,
        },
      ],
    },
    {
      title: 'Dimensions',
      controls: [
        {
          id: 'borderRadius',
          label: 'Border Radius',
          type: 'slider',
          value: config.borderRadius,
          min: 0,
          max: 32,
          step: 4,
          formatLabel: (v: number) => `${v}px`,
        },
        {
          id: 'rowHeight',
          label: 'Row Height',
          type: 'slider',
          value: config.rowHeight,
          min: 36,
          max: 64,
          step: 2,
          formatLabel: (v: number) => `${v}px`,
        },
        {
          id: 'headerHeight',
          label: 'Header Height',
          type: 'slider',
          value: config.headerHeight,
          min: 40,
          max: 64,
          step: 4,
          formatLabel: (v: number) => `${v}px`,
        },
      ],
    },
    {
      title: 'Sticky Layout',
      controls: [
        {
          id: 'headerGap',
          label: 'Header Gap',
          type: 'slider',
          value: config.headerGap,
          min: 0,
          max: 64,
          step: 4,
          formatLabel: (v: number) => `${v}px`,
        },
        {
          id: 'toolbarPosition',
          label: 'Toolbar Position',
          type: 'select',
          value: config.toolbarPosition,
          options: TOOLBAR_POSITION_OPTIONS,
        },
        {
          id: 'toolbarBottomMargin',
          label: 'Toolbar Bottom Margin',
          type: 'slider',
          value: config.toolbarBottomMargin,
          min: 0,
          max: 32,
          step: 4,
          formatLabel: (v: number) => `${v}px`,
          disabled: config.toolbarPosition === 'integrated',
        },
        {
          id: 'toolbarToCountGap',
          label: 'Toolbar to Count Gap',
          type: 'slider',
          value: config.toolbarToCountGap,
          min: 0,
          max: 16,
          step: 2,
          formatLabel: (v: number) => `${v}px`,
        },
      ],
    },
    {
      title: 'Features',
      controls: [
        {
          id: 'showColumnControl',
          label: 'Column Control',
          type: 'checkbox',
          value: config.showColumnControl,
        },
        {
          id: 'enableSelection',
          label: 'Row Selection',
          type: 'checkbox',
          value: config.enableSelection,
        },
      ],
    },
  ],
})

// =============================================================================
// STATUS BADGE COMPONENT
// =============================================================================

interface StatusBadgeProps {
  status: SampleRow['status']
}

function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<SampleRow['status'], string> = {
    active: 'bg-success-50 text-success-700 border-success-200',
    inactive: 'bg-secondary text-tertiary border-secondary',
    pending: 'bg-warning-50 text-warning-700 border-warning-200',
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function StickyDataTablePlayground() {
  const [config, setConfig] = useState<TableConfig>(DEFAULT_CONFIG)

  // Generate sample data based on config
  const data = useMemo(() => generateSampleData(config.rowCount), [config.rowCount])

  // Cell renderer
  const renderCell = useCallback((columnKey: string, row: SampleRow) => {
    switch (columnKey) {
      case 'id':
        return <span className="text-xs font-mono text-tertiary">{row.id}</span>
      case 'name':
        return <span className="text-sm text-primary">{row.name}</span>
      case 'email':
        return <span className="text-sm text-primary">{row.email}</span>
      case 'status':
        return <StatusBadge status={row.status} />
      case 'amount':
        return <span className="text-sm text-primary">${row.amount.toFixed(2)}</span>
      case 'date':
        return <span className="text-sm text-primary">{row.date}</span>
      case 'department':
        return <span className="text-sm text-primary">{row.department}</span>
      case 'location':
        return <span className="text-sm text-secondary">{row.location}</span>
      default:
        return null
    }
  }, [])

  // Row ID getter for selection
  const getRowId = useCallback((row: SampleRow) => row.id, [])

  // Panel configuration
  const panelConfig = useMemo<UnifiedControlPanelConfig>(() => ({
    sections: [createPanelConfig(config)],
    defaultActiveTab: 'table-config',
    position: {
      top: '16px',
      bottom: '16px',
      right: '16px',
      width: '320px',
    },
    showReset: true,
    resetLabel: 'Reset',
  }), [config])

  // Handle control changes
  const handleControlChange = useCallback((event: ControlChangeEvent) => {
    const { controlId, value } = event
    setConfig(prev => ({ ...prev, [controlId]: value }))
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG)
  }, [])

  // Get config for copy
  const getConfigForCopy = useCallback(() => config, [config])

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <div className="nav-clearance px-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: 'Playground', href: '/playground' },
              { label: 'Sticky Data Table' },
            ]}
          />
          <div className="text-xs text-tertiary">
            {data.length} rows
          </div>
        </div>
      </div>

      {/* Preview Area - offset for panel width */}
      <div className="pr-[352px] pb-24 md:pb-0">
        <div className="p-6">
          <StickyDataTable<SampleRow>
            data={data}
            columns={columns}
            columnLabels={columnLabels}
            renderCell={renderCell}
            borderRadius={config.borderRadius}
            rowHeight={config.rowHeight}
            headerHeight={config.headerHeight}
            showColumnControl={config.showColumnControl}
            enableSelection={config.enableSelection}
            getRowId={getRowId}
            showCount
            totalCount={data.length}
            countLabel="users"
            toolbarLayout={{
              position: config.toolbarPosition,
              headerGap: config.headerGap,
              toolbarBottomMargin: config.toolbarBottomMargin,
              toolbarToCountGap: config.toolbarToCountGap,
            }}
          />
        </div>
      </div>

      {/* Control Panel */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleControlChange}
        onReset={handleReset}
        getConfigForCopy={getConfigForCopy}
      />
    </div>
  )
}
