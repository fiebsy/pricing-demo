/**
 * Stacking Nav + Table Playground
 *
 * Demonstrates the stacking nav as a 4-level progressive filter
 * living inside the sticky data table toolbar. Drilling deeper
 * through the nav progressively narrows table results.
 *
 * Domain: Corporate Directory
 * L0: All (~80 employees)
 * L1: Company (~25-30 rows)
 * L2: Department (~8-12 rows)
 * L3: Team (~3-5 rows)
 *
 * Route: /playground/stacking-nav-table
 */

'use client'

import { useState, useMemo, useCallback, useTransition } from 'react'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'
import {
  StackingNav,
  type ActivePath,
} from '@/components/ui/features/stacking-nav'
import { StickyDataTable } from '@/components/ui/patterns/data-table'
import type { ToolbarLayoutConfig } from '@/components/ui/patterns/data-table'

import type { PlaygroundConfig, PageBackground } from './config/types'
import { DIRECTORY_ITEMS, NAV_LABELS } from './config/nav-items'
import { DIRECTORY_COLUMNS, COLUMN_LABELS } from './config/columns'
import {
  HARDENED_DIMENSIONS,
  HARDENED_BORDER_CONFIG,
  HARDENED_BACKGROUND_CONFIG,
} from './config/table-preset'
import { PRESET_DEFAULT, PRESETS, type PresetId } from './config/presets'
import { EMPLOYEE_DATA } from './core/mock-data'
import { renderCell } from './core/cell-renderer'
import { filterByPath } from './core/filter-utils'
import { createPanelConfig } from './panels/panel-config'
import type { Employee } from './config/types'

// =============================================================================
// TOOLBAR LAYOUT - Override for nav-in-toolbar
// =============================================================================

/**
 * Toolbar layout with enough height for the stacking nav.
 * The nav buttons are ~32px tall so 48px gives breathing room.
 */
const NAV_TOOLBAR_CONFIG: ToolbarLayoutConfig = {
  position: 'integrated',
  toolbarBottomMargin: 16,
  toolbarToCountGap: 0,
  headerGap: 12,
  integratedToolbarHeight: 48,
  integratedPadding: {
    top: 8,
    bottom: 8,
    left: 12,
    right: 0,
  },
}

// =============================================================================
// SPRING PRESET FOR NAV
// =============================================================================

const SPRING_ANIMATION = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 30,
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function StackingNavTablePlayground() {
  const [config, setConfig] = useState<PlaygroundConfig>(PRESET_DEFAULT)
  const [currentPath, setCurrentPath] = useState<ActivePath>([])
  const [, startTransition] = useTransition()
  const [resetKey, setResetKey] = useState(0)

  // Filter employees based on nav path
  const filteredData = useMemo(
    () => filterByPath([...EMPLOYEE_DATA] as Employee[], currentPath),
    [currentPath]
  )

  // Build breadcrumb from current path
  const breadcrumb = useMemo(() => {
    if (currentPath.length === 0) return 'All Employees'
    return currentPath
      .map((id) => NAV_LABELS[id] ?? id)
      .join(' > ')
  }, [currentPath])

  // Nav animation config based on variant
  const navAnimationConfig = useMemo(() => {
    if (config.navVariant === 'spring') return SPRING_ANIMATION
    return undefined
  }, [config.navVariant])

  // Panel config
  const panelConfig = useMemo(() => createPanelConfig(config), [config])

  // Handlers
  const handleSelectionChange = useCallback((path: ActivePath) => {
    startTransition(() => {
      setCurrentPath(path)
    })
  }, [startTransition])

  const handleControlChange = useCallback((event: ControlChangeEvent) => {
    const { controlId, value } = event

    // Handle preset selection
    if (controlId === 'preset' && value !== 'custom') {
      const preset = PRESETS[value as PresetId]
      if (preset) {
        setConfig(preset)
        return
      }
    }

    setConfig((prev) => ({ ...prev, [controlId]: value }))
  }, [])

  const handleReset = useCallback(() => {
    setConfig(PRESET_DEFAULT)
    setCurrentPath([])
    setResetKey((k) => k + 1)
  }, [])

  const handleComponentReset = useCallback(() => {
    setResetKey((k) => k + 1)
    setCurrentPath([])
  }, [])

  const getConfigForCopy = useCallback(() => {
    return { config, currentPath }
  }, [config, currentPath])

  // Background class mapping
  const bgClasses: Record<PageBackground, string> = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary',
  }

  // Stacking nav rendered inside the toolbar's left slot
  const navToolbar = (
    <StackingNav
      key={resetKey}
      items={DIRECTORY_ITEMS}
      animationConfig={navAnimationConfig}
      showDebug={config.showNavDebug}
      onReset={handleComponentReset}
      onSelectionChange={handleSelectionChange}
      className="!min-h-0"
    />
  )

  return (
    <div className={`min-h-screen ${bgClasses[config.pageBackground]}`}>
      <div className="pr-[352px] min-h-screen">
        <div className="mx-auto max-w-[1200px] px-6 pt-12">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-primary text-xl font-semibold">Corporate Directory</h1>
            <p className="text-tertiary mt-1 text-sm">{breadcrumb}</p>
          </div>

          {/* Data Table with Nav in Toolbar */}
          <StickyDataTable<Employee>
            data={filteredData}
            columns={DIRECTORY_COLUMNS}
            columnLabels={COLUMN_LABELS}
            renderCell={renderCell}
            borderRadius={HARDENED_DIMENSIONS.borderRadius}
            headerHeight={HARDENED_DIMENSIONS.headerHeight}
            rowHeight={HARDENED_DIMENSIONS.rowHeight}
            borderConfig={HARDENED_BORDER_CONFIG}
            backgroundConfig={HARDENED_BACKGROUND_CONFIG}
            toolbarLayout={NAV_TOOLBAR_CONFIG}
            leftToolbar={navToolbar}
            enableSelection={config.enableSelection}
            showColumnControl={config.showColumnControl}
            showCount={config.showCount}
            totalCount={filteredData.length}
            countLabel="employees"
            getRowId={(row) => String(row.id)}
            className="relative"
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
