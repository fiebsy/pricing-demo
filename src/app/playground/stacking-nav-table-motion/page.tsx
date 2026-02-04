/**
 * Stacking Nav + Table Motion Playground
 *
 * Combines the stacking-nav-motion experimental component (which proves
 * sticky behavior works) with the StickyDataTable toolbar integration.
 * This playground provides full motion animation controls while testing
 * sticky behavior with table data.
 *
 * Domain: Multiverse Power Rankings
 * L0: All (~96 characters)
 * L1: Realm (~24-28 rows)
 * L2: Faction (~6-8 rows)
 * L3: Energy (~1-4 rows)
 *
 * Route: /playground/stacking-nav-table-motion
 */

'use client'

import { useState, useMemo, useCallback, useTransition, useRef, useEffect, type ReactNode } from 'react'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'
import {
  StackingNav,
  type AnimationConfig,
  type StyleConfig,
  type ActivePath,
} from '@/components/ui/features/experimental/stacking-nav-motion'
import { StickyDataTable } from '@/components/ui/patterns/data-table'
import { TableEmptyState } from '@/components/ui/patterns/data-table/components/core/table-empty-state'
import type { ToolbarLayoutConfig, ColumnConfig, BorderConfig } from '@/components/ui/patterns/data-table'

import type {
  PlaygroundConfig,
  PageBackground,
  BorderColor,
  DataVariantId,
  ConfigPreset,
  EntryDirection,
} from './config/types'
import { DIRECTORY_ITEMS } from './config/nav-items'
import { DIRECTORY_COLUMNS, COLUMN_LABELS } from './config/columns'
import {
  HARDENED_DIMENSIONS,
  HARDENED_BACKGROUND_CONFIG,
} from './config/table-preset'
import { PRESET_DEFAULT, CONFIG_PRESETS, type PresetId, PRESETS } from './config/presets'
import { SPRING_PRESETS, ENTRY_DIRECTION_PRESETS } from './config/options'
import { CHARACTER_DATA } from './core/mock-data'
import { createRenderCell } from './core/cell-renderer'
import { filterByPath } from './core/filter-utils'
import {
  EMPLOYEE_DATA,
  EMPLOYEE_NAV_ITEMS,
  EMPLOYEE_COLUMNS,
  EMPLOYEE_COLUMN_LABELS,
  EMPLOYEE_DEFAULT_COLUMN_ORDER,
  createEmployeeRenderCell,
  filterEmployeesByPath,
} from './core/employee-variant'
import { createPanelConfig } from './panels/panel-config'

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
// BORDER HELPERS
// =============================================================================

const toBorderToken = (color: BorderColor) => `border-${color}`

// =============================================================================
// COLUMN REORDER HELPERS
// =============================================================================

const CHARACTER_COLUMN_ORDER = [
  'character',
  'realmBadge',
  'origin',
  'description',
  'threatLevel',
  'livesRescued',
]

function getDefaultColumnOrder(variant: DataVariantId): string[] {
  return variant === 'employees' ? EMPLOYEE_DEFAULT_COLUMN_ORDER : CHARACTER_COLUMN_ORDER
}

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

export default function StackingNavTableMotionPlayground() {
  const [config, setConfig] = useState<PlaygroundConfig>(PRESET_DEFAULT)
  const [currentPath, setCurrentPath] = useState<ActivePath>([])
  const [, startTransition] = useTransition()
  const [resetKey, setResetKey] = useState(0)
  const [columnOrder, setColumnOrder] = useState<string[]>(getDefaultColumnOrder(PRESET_DEFAULT.dataVariant))

  // Prevent sticky disengage when filtering shrinks content below viewport.
  // Locks the wrapper's minHeight before data changes, then smoothly releases.
  const contentWrapperRef = useRef<HTMLDivElement>(null)
  const heightLockRef = useRef(false)

  // DEBUG: Log collector for copy-paste
  const debugLogsRef = useRef<string[]>([])
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle')

  const debugLog = useCallback((tag: string, data?: Record<string, unknown>) => {
    const timestamp = performance.now().toFixed(1)
    const entry = data
      ? `[${timestamp}ms] ${tag} ${JSON.stringify(data)}`
      : `[${timestamp}ms] ${tag}`
    debugLogsRef.current.push(entry)
    // Keep only last 50 entries
    if (debugLogsRef.current.length > 50) {
      debugLogsRef.current = debugLogsRef.current.slice(-50)
    }
    console.log(tag, data ?? '')
  }, [])

  const handleCopyLogs = useCallback(() => {
    const logs = debugLogsRef.current.join('\n')
    navigator.clipboard.writeText(logs).then(() => {
      setCopyStatus('copied')
      setTimeout(() => setCopyStatus('idle'), 2000)
    })
  }, [])

  const handleClearLogs = useCallback(() => {
    debugLogsRef.current = []
  }, [])

  // DEBUG: Track scroll changes during transitions
  useEffect(() => {
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const delta = window.scrollY - lastScrollY
      if (Math.abs(delta) > 5) {
        debugLog('[SCROLL] 📜', {
          from: lastScrollY,
          to: window.scrollY,
          delta,
          heightLocked: heightLockRef.current,
        })
      }
      lastScrollY = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [debugLog])

  // Variant-aware: pick data source, filter function, nav items, columns, labels
  const isEmployees = config.dataVariant === 'employees'

  const filteredData = useMemo(
    () => {
      const data = isEmployees
        ? filterEmployeesByPath([...EMPLOYEE_DATA], currentPath)
        : filterByPath([...CHARACTER_DATA], currentPath)
      return data.sort((a, b) => String(a.name).localeCompare(String(b.name)))
    },
    [currentPath, isEmployees]
  )

  const activeNavItems = isEmployees ? EMPLOYEE_NAV_ITEMS : DIRECTORY_ITEMS
  const activeColumns = isEmployees ? EMPLOYEE_COLUMNS : DIRECTORY_COLUMNS
  const activeColumnLabels = isEmployees ? EMPLOYEE_COLUMN_LABELS : COLUMN_LABELS
  const activeCountLabel = isEmployees ? 'employees' : 'characters'

  // After filtered data renders, release the height lock with smooth transition
  useEffect(() => {
    const wrapper = contentWrapperRef.current
    if (!heightLockRef.current || !wrapper) return

    const lockedHeight = parseFloat(wrapper.style.minHeight) || 0

    debugLog('[HEIGHT LOCK] 🔒 Waiting to release...', {
      lockedHeight: wrapper.style.minHeight,
      scrollY: window.scrollY,
      wrapperOffsetHeight: wrapper.offsetHeight,
    })

    // Wait for nav animation to settle, then measure natural height
    const timeout = setTimeout(() => {
      // Temporarily remove minHeight to measure natural content
      wrapper.style.minHeight = ''
      const naturalHeight = wrapper.offsetHeight

      debugLog('[HEIGHT LOCK] 📐 Measured', {
        lockedHeight,
        naturalHeight,
        scrollY: window.scrollY,
        scrollMax: document.documentElement.scrollHeight - window.innerHeight,
      })

      if (naturalHeight >= lockedHeight) {
        // Content grew or stayed same - just release
        debugLog('[HEIGHT LOCK] ✅ Released (content grew)', { scrollY: window.scrollY })
        heightLockRef.current = false
        return
      }

      // Content shrank - animate the height down smoothly
      // This keeps scroll position valid during transition
      wrapper.style.minHeight = `${lockedHeight}px`
      // Force reflow
      void wrapper.offsetHeight
      wrapper.style.transition = 'min-height 300ms ease-out'
      wrapper.style.minHeight = `${naturalHeight}px`

      debugLog('[HEIGHT LOCK] 🎬 Animating height', {
        from: lockedHeight,
        to: naturalHeight,
        scrollY: window.scrollY,
      })

      const cleanup = () => {
        wrapper.style.transition = ''
        wrapper.style.minHeight = ''
        heightLockRef.current = false
        debugLog('[HEIGHT LOCK] ✅ Released (after animation)', {
          scrollY: window.scrollY,
          wrapperOffsetHeight: wrapper.offsetHeight,
        })
      }

      wrapper.addEventListener('transitionend', cleanup, { once: true })
      // Safety timeout
      setTimeout(cleanup, 350)
    }, 300)

    return () => clearTimeout(timeout)
  }, [filteredData, debugLog])

  // Build full animation config for motion component
  const animationConfig: Partial<AnimationConfig> = useMemo(() => {
    const scale = config.timeScale
    // For spring animations, lower stiffness and damping = slower
    const springMultiplier = scale * scale

    // Synchronized mode: auto-calculate exit timing from collapse duration
    const isSynchronized = config.collapseMode === 'synchronized'
    const effectiveExitDuration = isSynchronized
      ? (config.collapseLayoutDuration * 0.5) / 1000 / scale  // Half of collapse duration
      : (config.exitDuration / 1000) / scale
    const effectiveExitDelay = isSynchronized ? 0 : (config.exitDelay / 1000) / scale
    const effectiveExitUseCustomTiming = isSynchronized ? true : config.exitUseCustomTiming

    return {
      type: config.animationType,
      stiffness: config.springStiffness * springMultiplier,
      damping: config.springDamping * scale,
      duration: (config.tweenDuration / 1000) / scale,
      ease: config.tweenEase,
      promotionDuration: (config.promotionDuration / 1000) / scale,
      promotionScale: config.promotionScale,
      stagger: (config.childStagger / 1000) / scale,
      entryOffsetX: config.entryOffsetX,
      entryOffsetY: config.entryOffsetY,
      childEntryDelay: (config.childEntryDelay / 1000) / scale,
      entryScale: config.childEntryScale,
      exitScale: config.exitScale,
      exitUseCustomTiming: effectiveExitUseCustomTiming,
      exitDuration: effectiveExitDuration,
      exitEase: config.exitEase,
      exitDelay: effectiveExitDelay,
      collapseLayoutDuration: config.collapseLayoutDuration / 1000,
      skipLeafAnimation: config.skipLeafAnimation,
      hoverDelay: config.hoverDelay / 1000,
      timeScale: config.timeScale,
    }
  }, [config])

  // Build full style config for motion component
  const styleConfig: Partial<StyleConfig> = useMemo(() => ({
    peekOffset: config.peekOffset,
    anchoredOpacity: config.anchoredOpacity,
    gap: config.gap,
    buttonSize: config.buttonSize,
    buttonRoundness: config.buttonRoundness,
    expandedVariant: config.expandedVariant,
    childVariant: config.childVariant,
    anchoredVariant: config.anchoredVariant,
    selectedLeafVariant: config.selectedLeafVariant,
    showLevelAll: config.showLevelAll,
    levelAllLabel: config.levelAllLabel,
    levelAllActiveVariant: config.levelAllActiveVariant,
    levelAllInactiveVariant: config.levelAllInactiveVariant,
  }), [config])

  // Cell renderer — rebuilds when sparkline config, avatar config, or variant changes
  const sparklineConfig = useMemo(() => ({
    height: config.sparklineHeight,
    strokeWidth: config.sparklineStrokeWidth,
    showFill: config.sparklineShowFill,
    showDot: config.sparklineShowDot,
  }), [config.sparklineHeight, config.sparklineStrokeWidth, config.sparklineShowFill, config.sparklineShowDot])

  const avatarConfig = useMemo(() => ({
    width: config.originAvatarWidth,
    height: config.originAvatarHeight,
    imageType: config.originImageType,
    logoBg: config.originLogoBg,
    logoBgColor: config.originLogoBgColor,
    logoPaddingX: config.originLogoPaddingX,
    logoPaddingY: config.originLogoPaddingY,
    logoShine: config.originLogoShine,
    logoSquircle: config.originLogoSquircle,
    logoInvert: config.originLogoInvert,
    logoOutline: config.originLogoOutline,
    logoOutlineColor: config.originLogoOutlineColor,
    logoOutlineSize: config.originLogoOutlineSize,
    logoOutlineOpacity: config.originLogoOutlineOpacity,
    logoOutlineIntensity: config.originLogoOutlineIntensity,
  }), [
    config.originAvatarWidth, config.originAvatarHeight,
    config.originImageType, config.originLogoBg, config.originLogoBgColor,
    config.originLogoPaddingX, config.originLogoPaddingY,
    config.originLogoShine, config.originLogoSquircle, config.originLogoInvert,
    config.originLogoOutline, config.originLogoOutlineColor, config.originLogoOutlineSize,
    config.originLogoOutlineOpacity, config.originLogoOutlineIntensity,
  ])

  const badgeConfig = useMemo(() => ({
    style: config.badgeStyle,
    shape: config.badgeShape,
    neutral: config.badgeNeutral,
  }), [config.badgeStyle, config.badgeShape, config.badgeNeutral])

  type CellRenderer = (columnKey: string, row: Record<string, unknown>, index: number) => ReactNode
  const cellRenderer = useMemo<CellRenderer>(
    () => (isEmployees
      ? createEmployeeRenderCell(sparklineConfig)
      : createRenderCell(sparklineConfig, avatarConfig, badgeConfig)) as CellRenderer,
    [sparklineConfig, avatarConfig, badgeConfig, isEmployees]
  )

  // Ordered columns — reacts to drag-and-drop reorder + variant
  const orderedColumns = useMemo(
    () => reorderColumns(activeColumns, columnOrder),
    [activeColumns, columnOrder]
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
  const scrollLockRef = useRef<number | null>(null)

  const handleSelectionChange = useCallback((path: ActivePath) => {
    const savedScrollY = window.scrollY
    scrollLockRef.current = savedScrollY

    debugLog(`[NAV CLICK] 👆 path=[${path}]`, {
      scrollY: savedScrollY,
      containWrapper: document.querySelector('[style*="contain"]') ? 'found' : 'NOT FOUND',
    })

    // Lock container height to prevent scroll jump when data shrinks
    const wrapper = contentWrapperRef.current
    if (wrapper) {
      const currentHeight = wrapper.offsetHeight
      wrapper.style.transition = ''
      wrapper.style.minHeight = `${currentHeight}px`
      heightLockRef.current = true
      debugLog('[HEIGHT LOCK] 🔐 Locked', {
        lockedHeight: currentHeight,
        scrollY: savedScrollY,
      })
    }

    startTransition(() => {
      setCurrentPath(path)
    })

    // Restore scroll position if it jumps during nav animation
    const restoreScroll = () => {
      if (scrollLockRef.current !== null && Math.abs(window.scrollY - scrollLockRef.current) > 50) {
        debugLog('[SCROLL FIX] 🔧 Restoring scroll', {
          from: window.scrollY,
          to: scrollLockRef.current,
        })
        window.scrollTo({ top: scrollLockRef.current, behavior: 'instant' })
      }
    }

    // Check multiple times during the animation
    const t1 = setTimeout(restoreScroll, 100)
    const t2 = setTimeout(restoreScroll, 200)
    const t3 = setTimeout(restoreScroll, 300)
    const t4 = setTimeout(() => {
      restoreScroll()
      scrollLockRef.current = null
    }, 400)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [startTransition, debugLog])

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

    // Handle config preset selection - apply full preset
    if (controlId === 'configPreset' && value !== 'custom') {
      const preset = CONFIG_PRESETS[value as ConfigPreset]
      if (preset) {
        setConfig((prev) => ({
          ...preset,
          dataVariant: prev.dataVariant, // Keep data variant
        }))
        return
      }
    }

    // Handle spring preset selection (within spring animation type)
    if (controlId === 'springPreset' && value !== 'custom') {
      const preset = SPRING_PRESETS[value as keyof typeof SPRING_PRESETS]
      if (preset) {
        setConfig((prev) => ({
          ...prev,
          springPreset: value as PlaygroundConfig['springPreset'],
          springStiffness: preset.stiffness,
          springDamping: preset.damping,
          configPreset: 'custom', // Mark as custom when tuning
        }))
        return
      }
    }

    // Handle manual spring adjustment - switch to custom presets
    if (controlId === 'springStiffness' || controlId === 'springDamping') {
      setConfig((prev) => ({
        ...prev,
        [controlId]: value,
        springPreset: 'custom',
        configPreset: 'custom',
      }))
      return
    }

    // Handle entry direction preset selection
    if (controlId === 'entryDirection' && value !== 'custom') {
      const directionPreset = ENTRY_DIRECTION_PRESETS[value as Exclude<EntryDirection, 'custom'>]
      if (directionPreset) {
        setConfig((prev) => ({
          ...prev,
          entryDirection: value as EntryDirection,
          entryOffsetX: directionPreset.x,
          entryOffsetY: directionPreset.y,
          configPreset: 'custom',
        }))
        return
      }
    }

    // Handle manual entry offset adjustment - detect matching preset or switch to custom
    if (controlId === 'entryOffsetX' || controlId === 'entryOffsetY') {
      setConfig((prev) => {
        const newX = controlId === 'entryOffsetX' ? value as number : prev.entryOffsetX
        const newY = controlId === 'entryOffsetY' ? value as number : prev.entryOffsetY

        // Check if values match any preset
        let matchedPreset: EntryDirection = 'custom'
        for (const [presetName, presetValues] of Object.entries(ENTRY_DIRECTION_PRESETS)) {
          if (presetValues.x === newX && presetValues.y === newY) {
            matchedPreset = presetName as EntryDirection
            break
          }
        }

        return {
          ...prev,
          [controlId]: value,
          entryDirection: matchedPreset,
          configPreset: 'custom',
        }
      })
      return
    }

    // Handle data variant switch — reset nav, columns, and key synchronously
    if (controlId === 'dataVariant') {
      const variant = value as DataVariantId
      setConfig((prev) => ({ ...prev, dataVariant: variant }))
      setCurrentPath([])
      setColumnOrder(getDefaultColumnOrder(variant))
      setResetKey((k) => k + 1)
      return
    }

    // Fields that don't affect the config preset status
    const nonPresetFields = [
      'dataVariant',
      'showNumbers',
      'showNavDebug',
      'pageBackground',
      'showLevelAll',
      'levelAllLabel',
      'levelAllActiveVariant',
      'levelAllInactiveVariant',
      'timeScale',
      // Table-specific fields that don't affect animation preset
      'enableSelection',
      'showColumnControl',
      'showCount',
      'enableColumnReorder',
      'tableOpacity',
      'tableMuted',
      'borderRadius',
      'showOuterBorder',
      'showRowBorders',
      'showCellBorders',
      'outerBorderColor',
      'rowBorderColor',
      'rowBorderOpacity',
      'cellBorderColor',
      'cellBorderOpacity',
      'toolbarPaddingTop',
      'toolbarPaddingBottom',
      'toolbarPaddingLeft',
      'toolbarPaddingRight',
      'navToCountGap',
      'pageTopGap',
      'pageMaxWidth',
      'badgeStyle',
      'badgeShape',
      'badgeNeutral',
      'originAvatarWidth',
      'originAvatarHeight',
      'originImageType',
      'originLogoBg',
      'originLogoBgColor',
      'originLogoPaddingX',
      'originLogoPaddingY',
      'originLogoShine',
      'originLogoSquircle',
      'originLogoInvert',
      'sparklineHeight',
      'sparklineStrokeWidth',
      'sparklineShowFill',
      'sparklineShowDot',
    ]

    // Animation-related changes mark config as custom
    if (!nonPresetFields.includes(controlId)) {
      setConfig((prev) => ({ ...prev, [controlId]: value, configPreset: 'custom' }))
    } else {
      setConfig((prev) => ({ ...prev, [controlId]: value }))
    }
  }, [])

  const handleReset = useCallback(() => {
    setConfig(PRESET_DEFAULT)
    setCurrentPath([])
    setColumnOrder(getDefaultColumnOrder(PRESET_DEFAULT.dataVariant))
    setResetKey((k) => k + 1)
  }, [])

  const handleComponentReset = useCallback(() => {
    setResetKey((k) => k + 1)
    setCurrentPath([])
  }, [])

  const getConfigForCopy = useCallback(() => {
    return {
      config,
      animationConfig,
      styleConfig,
      currentPath,
      columnOrder,
    }
  }, [config, animationConfig, styleConfig, currentPath, columnOrder])

  // Background class mapping
  const bgClasses: Record<PageBackground, string> = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    secondary_alt: 'bg-secondary-alt',
    tertiary: 'bg-tertiary',
  }

  // Table opacity — targets header grid, body scroll, nav arrows, and count row
  // but NOT the integrated toolbar (stacking nav).
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
  // CSS containment isolates Motion's layout measurements from propagating to the table
  // overflow-anchor: none prevents browser scroll anchoring during layout animations
  const navToolbar = (
    <div style={{ contain: 'layout', overflowAnchor: 'none' }}>
      <StackingNav
        key={resetKey}
        items={activeNavItems}
        animationConfig={animationConfig}
        styleConfig={styleConfig}
        showNumbers={config.showNumbers}
        showDebug={config.showNavDebug}
        onReset={handleComponentReset}
        onSelectionChange={handleSelectionChange}
        className="!min-h-0"
      />
    </div>
  )

  return (
    <div className={`min-h-screen ${bgClasses[config.pageBackground]}`}>
      {/* Scoped styles — opacity/mute targets table body only, toolbar stays full */}
      <style dangerouslySetInnerHTML={{ __html: tableScopedCSS }} />

      {/* Version label + Debug controls */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
        <div className="rounded-lg bg-tertiary px-3 py-1.5 text-xs font-semibold text-secondary shadow-md">
          stacking-nav-table-motion
        </div>
        <button
          onClick={handleCopyLogs}
          className="rounded-lg bg-tertiary px-3 py-1.5 text-xs font-semibold text-secondary shadow-md hover:bg-secondary-alt transition-colors"
        >
          {copyStatus === 'copied' ? '✓ Copied!' : '📋 Copy Logs'}
        </button>
        <button
          onClick={handleClearLogs}
          className="rounded-lg bg-tertiary px-3 py-1.5 text-xs font-semibold text-secondary shadow-md hover:bg-secondary-alt transition-colors"
        >
          🗑️ Clear
        </button>
      </div>

      <div className="pr-[352px] min-h-screen">
        <div ref={contentWrapperRef} className="mx-auto px-6 mb-20" style={{ paddingTop: config.pageTopGap, maxWidth: config.pageMaxWidth }}>
          {/* Data Table with Nav in Toolbar */}
          <StickyDataTable<Record<string, unknown>>
            data={filteredData}
            columns={orderedColumns}
            columnLabels={activeColumnLabels}
            renderCell={cellRenderer}
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
            countLabel={activeCountLabel}
            getRowId={(row) => String(row.id)}
            hasActiveFilters={currentPath.length > 0}
            noResultsState={
              <TableEmptyState
                variant="no-results"
                title={`No ${activeCountLabel} found`}
                description={`This filter combination has no matching ${activeCountLabel}.`}
                action={{
                  label: 'Clear Filters',
                  onClick: handleComponentReset,
                }}
              />
            }
            emptyState={
              <TableEmptyState
                variant="empty"
                title={`No ${activeCountLabel}`}
                description={`There are no ${activeCountLabel} to display.`}
              />
            }
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
