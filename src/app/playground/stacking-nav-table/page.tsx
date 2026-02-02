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

import { useState, useMemo, useCallback, useTransition, useRef, useEffect } from 'react'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'
import {
  StackingNav,
  DEFAULT_STYLE_CONFIG,
  type ActivePath,
} from '@/components/ui/features/stacking-nav'
import { StickyDataTable } from '@/components/ui/patterns/data-table'
import type { ToolbarLayoutConfig, ColumnConfig, BorderConfig } from '@/components/ui/patterns/data-table'

import type { PlaygroundConfig, PageBackground, BorderColor } from './config/types'
import { DIRECTORY_ITEMS } from './config/nav-items'
import { DIRECTORY_COLUMNS, COLUMN_LABELS } from './config/columns'
import {
  HARDENED_DIMENSIONS,
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
 * Build toolbar layout config with dynamic padding and count gap.
 */
function createToolbarConfig(
  padding: { top: number; bottom: number; left: number; right: number },
  navToCountGap: number,
): ToolbarLayoutConfig {
  return {
    position: 'integrated',
    toolbarBottomMargin: 16,
    toolbarToCountGap: navToCountGap,
    headerGap: 12,
    integratedToolbarHeight: 48,
    integratedPadding: padding,
  }
}

// =============================================================================
// STACKING NAV CONFIG
// =============================================================================

/**
 * Spring animation override — applied when navVariant is 'spring'.
 * All other values fall through to DEFAULT_ANIMATION_CONFIG internally.
 */
const SPRING_ANIMATION = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 30,
}

/**
 * Explicit style config for the nav when used inside the table toolbar.
 * Inherits all DEFAULT_STYLE_CONFIG values, overrides buttonSize to 'sm'
 * for a tighter fit in the toolbar row.
 */
const NAV_STYLE_CONFIG = {
  ...DEFAULT_STYLE_CONFIG,
}

// =============================================================================
// BORDER HELPERS
// =============================================================================

const toBorderToken = (color: BorderColor) => `border-${color}`

// =============================================================================
// COLUMN REORDER HELPERS
// =============================================================================

const DEFAULT_COLUMN_ORDER = [
  'employee',
  'role',
  'status',
  'level',
  'salary',
]

function reorderColumns(
  columns: ColumnConfig[],
  order: string[]
): ColumnConfig[] {
  const map = new Map(columns.map((c) => [c.key, c]))
  return order.map((key) => map.get(key)).filter(Boolean) as ColumnConfig[]
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function StackingNavTablePlayground() {
  const [config, setConfig] = useState<PlaygroundConfig>(PRESET_DEFAULT)
  const [currentPath, setCurrentPath] = useState<ActivePath>([])
  const [, startTransition] = useTransition()
  const [resetKey, setResetKey] = useState(0)
  const [columnOrder, setColumnOrder] = useState<string[]>(DEFAULT_COLUMN_ORDER)

  // Prevent sticky disengage when filtering shrinks content below viewport.
  // Locks the wrapper's minHeight before data changes, then smoothly releases.
  const contentWrapperRef = useRef<HTMLDivElement>(null)
  const heightLockRef = useRef(false)

  // Filter employees based on nav path
  const filteredData = useMemo(
    () => filterByPath([...EMPLOYEE_DATA] as Employee[], currentPath),
    [currentPath]
  )

  // After filtered data renders, smoothly release the height lock
  useEffect(() => {
    const wrapper = contentWrapperRef.current
    if (!heightLockRef.current || !wrapper) return
    heightLockRef.current = false

    requestAnimationFrame(() => {
      // Read the locked height, then measure the natural content height
      const locked = parseFloat(wrapper.style.minHeight) || 0
      wrapper.style.minHeight = ''
      const natural = wrapper.offsetHeight

      if (natural >= locked) return // content grew — nothing to do

      // Content shrank — transition smoothly from locked → natural
      wrapper.style.minHeight = `${locked}px`
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      wrapper.offsetHeight // force reflow before transition
      wrapper.style.transition = 'min-height 250ms ease-out'
      wrapper.style.minHeight = `${natural}px`

      const cleanup = () => {
        wrapper.style.transition = ''
        wrapper.style.minHeight = ''
      }
      wrapper.addEventListener('transitionend', cleanup, { once: true })
      // Safety timeout in case transitionend doesn't fire
      setTimeout(cleanup, 300)
    })
  }, [filteredData])

  // Nav animation config based on variant
  const navAnimationConfig = useMemo(() => {
    if (config.navVariant === 'spring') return SPRING_ANIMATION
    return undefined
  }, [config.navVariant])

  // Ordered columns — reacts to drag-and-drop reorder
  const orderedColumns = useMemo(
    () => reorderColumns(DIRECTORY_COLUMNS, columnOrder),
    [columnOrder]
  )

  // Toolbar config (reacts to padding changes)
  const toolbarConfig = useMemo(
    () => createToolbarConfig(
      { top: config.toolbarPaddingTop, bottom: config.toolbarPaddingBottom, left: config.toolbarPaddingLeft, right: config.toolbarPaddingRight },
      config.navToCountGap,
    ),
    [config.toolbarPaddingTop, config.toolbarPaddingBottom, config.toolbarPaddingLeft, config.toolbarPaddingRight, config.navToCountGap]
  )

  // Border config — built from playground controls
  const borderConfig = useMemo<BorderConfig>(() => {
    const rowToken = config.rowBorderOpacity < 100
      ? `${toBorderToken(config.rowBorderColor)}/${config.rowBorderOpacity}`
      : toBorderToken(config.rowBorderColor)
    const cellToken = config.cellBorderOpacity < 100
      ? `${toBorderToken(config.cellBorderColor)}/${config.cellBorderOpacity}`
      : toBorderToken(config.cellBorderColor)

    return {
      showOuter: config.showOuterBorder,
      showRows: config.showRowBorders,
      showCells: config.showCellBorders,
      outerColor: toBorderToken(config.outerBorderColor),
      rowColor: rowToken,
      cellColor: cellToken,
      stickyColumnRightBorderColor: rowToken,
      hideCellBordersForColumns: ['__checkbox'],
      headerBottomColor: toBorderToken(config.outerBorderColor),
    }
  }, [config.showOuterBorder, config.showRowBorders, config.showCellBorders, config.outerBorderColor, config.rowBorderColor, config.rowBorderOpacity, config.cellBorderColor, config.cellBorderOpacity])

  // Panel config
  const panelConfig = useMemo(() => createPanelConfig(config), [config])

  // Handlers
  const handleSelectionChange = useCallback((path: ActivePath) => {
    if (config.showNavDebug) {
      console.log(`[NAV CLICK] path=[${path}] scrollY=${window.scrollY}`)
    }

    // Lock container height to prevent scroll jump when data shrinks
    const wrapper = contentWrapperRef.current
    if (wrapper) {
      wrapper.style.transition = ''
      wrapper.style.minHeight = `${wrapper.offsetHeight}px`
      heightLockRef.current = true
    }

    startTransition(() => {
      setCurrentPath(path)
    })
  }, [startTransition, config.showNavDebug])

  const handleReorderColumns = useCallback((fromKey: string, toKey: string) => {
    setColumnOrder((prev) => {
      const next = [...prev]
      const fromIdx = next.indexOf(fromKey)
      const toIdx = next.indexOf(toKey)
      if (fromIdx === -1 || toIdx === -1) return prev
      next.splice(fromIdx, 1)
      next.splice(toIdx, 0, fromKey)
      return next
    })
  }, [])

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
    setColumnOrder(DEFAULT_COLUMN_ORDER)
    setResetKey((k) => k + 1)
  }, [])

  const handleComponentReset = useCallback(() => {
    setResetKey((k) => k + 1)
    setCurrentPath([])
  }, [])

  const getConfigForCopy = useCallback(() => {
    return { config, currentPath, columnOrder }
  }, [config, currentPath, columnOrder])

  // Background class mapping
  const bgClasses: Record<PageBackground, string> = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary',
  }

  // Table opacity — targets header grid, body scroll, nav arrows, and count row
  // but NOT the integrated toolbar (stacking nav).
  // Selector breakdown:
  //   [overflow-x-auto]             → column header grid + body scroll container
  //   .sticky > .absolute           → left/right navigation arrows
  //   .text-tertiary.text-xs        → count row ("32 employees")
  const tableOpacity = config.tableOpacity / 100
  const effectiveOpacity = config.tableMuted ? 0 : tableOpacity
  const tableScopedCSS = `
    .snt-table [class*="overflow-x-auto"],
    .snt-table .sticky > .absolute,
    .snt-table .text-tertiary.text-xs {
      opacity: ${effectiveOpacity};
      transition: opacity 200ms;
    }
    ${config.tableMuted ? `.snt-table [class*="overflow-x-auto"],
    .snt-table .sticky > .absolute {
      pointer-events: none;
      user-select: none;
    }` : ''}
  `

  // Stacking nav rendered inside the toolbar's left slot
  const navToolbar = (
    <StackingNav
      key={resetKey}
      items={DIRECTORY_ITEMS}
      animationConfig={navAnimationConfig}
      styleConfig={NAV_STYLE_CONFIG}
      showDebug={config.showNavDebug}
      onReset={handleComponentReset}
      onSelectionChange={handleSelectionChange}
      className="!min-h-0"
    />
  )

  return (
    <div className={`min-h-screen ${bgClasses[config.pageBackground]}`}>
      {/* Scoped styles — opacity/mute targets table body only, toolbar stays full */}
      <style dangerouslySetInnerHTML={{ __html: tableScopedCSS }} />

      <div className="pr-[352px] min-h-screen">
        <div ref={contentWrapperRef} className="mx-auto px-6" style={{ paddingTop: config.pageTopGap, maxWidth: config.pageMaxWidth }}>
          {/* Data Table with Nav in Toolbar */}
          <StickyDataTable<Employee>
            data={filteredData}
            columns={orderedColumns}
            columnLabels={COLUMN_LABELS}
            renderCell={renderCell}
            borderRadius={config.borderRadius}
            headerHeight={HARDENED_DIMENSIONS.headerHeight}
            rowHeight={HARDENED_DIMENSIONS.rowHeight}
            borderConfig={borderConfig}
            backgroundConfig={HARDENED_BACKGROUND_CONFIG}
            toolbarLayout={toolbarConfig}
            leftToolbar={navToolbar}
            enableSelection={config.enableSelection}
            showColumnControl={config.showColumnControl}
            showCount={config.showCount && !config.tableMuted}
            enableColumnReorder={config.enableColumnReorder}
            onReorderColumns={handleReorderColumns}
            totalCount={filteredData.length}
            countLabel="employees"
            getRowId={(row) => String(row.id)}
            className="snt-table relative"
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
