/**
 * FilterSelectChipMotion Playground
 *
 * Interactive testing environment for the filter chip motion component.
 * Allows real-time configuration of animation and styling properties.
 *
 * @module playground/filter-chip-motion
 */

'use client'

import * as React from 'react'
import { useCallback, useMemo, useState } from 'react'
import { Breadcrumbs } from '@/components/ui/deprecated/nav'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
  type Section as ControlSection,
  type UnifiedControlPanelProps,
} from '@/components/ui/prod/base/control-panel'
import {
  FilterSelectChipMotion,
  type FilterChipData,
  type AnimationConfig,
  type StyleConfig,
  type TransitionType,
  type EasingType,
  type ChipSize,
  type ChipGap,
  type ChipRoundness,
  type AnimationPreset,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_STYLE_CONFIG,
  TRANSITION_TYPE_OPTIONS,
  EASING_OPTIONS,
  SIZE_OPTIONS,
  GAP_OPTIONS,
  ROUNDNESS_OPTIONS,
  PRESET_OPTIONS,
  getPresetConfig,
} from '@/components/ui/prod/base/filter/filter-select-chip-motion'

// Icons for sample filters
import FilterIcon from '@hugeicons-pro/core-stroke-rounded/FilterIcon'

type UnifiedControlPanelConfig = UnifiedControlPanelProps['config']

// =============================================================================
// TYPES
// =============================================================================

interface PlaygroundConfig {
  // Animation
  preset: AnimationPreset
  usePreset: boolean
  transitionType: TransitionType
  easing: EasingType
  duration: number
  stiffness: number
  damping: number
  exitDuration: number
  // Style
  size: ChipSize
  gap: ChipGap
  roundness: ChipRoundness
  // Demo
  showDebug: boolean
  autoAdd: boolean
  autoAddInterval: number
}

// =============================================================================
// SAMPLE FILTER DATA
// =============================================================================

const AVAILABLE_FILTERS: FilterChipData[] = [
  {
    id: 'status',
    label: 'Status',
    icon: FilterIcon,
    value: 'active',
    options: [
      { id: 'all', label: 'All' },
      { id: 'active', label: 'Active' },
      { id: 'pending', label: 'Pending' },
      { id: 'completed', label: 'Completed' },
      { id: 'archived', label: 'Archived' },
    ],
  },
  {
    id: 'assignee',
    label: 'Assignee',
    icon: FilterIcon,
    value: 'me',
    options: [
      { id: 'anyone', label: 'Anyone' },
      { id: 'me', label: 'Me' },
      { id: 'unassigned', label: 'Unassigned' },
      { id: 'team-a', label: 'Team A' },
      { id: 'team-b', label: 'Team B' },
    ],
  },
  {
    id: 'date',
    label: 'Date',
    icon: FilterIcon,
    value: 'week',
    options: [
      { id: 'today', label: 'Today' },
      { id: 'week', label: 'This Week' },
      { id: 'month', label: 'This Month' },
      { id: 'quarter', label: 'This Quarter' },
      { id: 'year', label: 'This Year' },
    ],
  },
  {
    id: 'project',
    label: 'Project',
    icon: FilterIcon,
    value: 'all',
    options: [
      { id: 'all', label: 'All Projects' },
      { id: 'payva', label: 'Payva' },
      { id: 'skwircle', label: 'Skwircle' },
      { id: 'demo', label: 'Demo Repo' },
    ],
  },
  {
    id: 'location',
    label: 'Location',
    icon: FilterIcon,
    value: 'remote',
    options: [
      { id: 'all', label: 'All Locations' },
      { id: 'remote', label: 'Remote' },
      { id: 'office', label: 'Office' },
      { id: 'hybrid', label: 'Hybrid' },
    ],
  },
  {
    id: 'priority',
    label: 'Priority',
    icon: FilterIcon,
    value: 'high',
    options: [
      { id: 'all', label: 'All' },
      { id: 'low', label: 'Low' },
      { id: 'medium', label: 'Medium' },
      { id: 'high', label: 'High' },
      { id: 'urgent', label: 'Urgent' },
    ],
  },
]

// =============================================================================
// CONSTANTS
// =============================================================================

const DEFAULT_CONFIG: PlaygroundConfig = {
  // Animation
  preset: 'snappy',
  usePreset: true,
  transitionType: DEFAULT_ANIMATION_CONFIG.transitionType,
  easing: DEFAULT_ANIMATION_CONFIG.easing,
  duration: DEFAULT_ANIMATION_CONFIG.duration,
  stiffness: DEFAULT_ANIMATION_CONFIG.stiffness,
  damping: DEFAULT_ANIMATION_CONFIG.damping,
  exitDuration: DEFAULT_ANIMATION_CONFIG.exitDuration,
  // Style
  size: DEFAULT_STYLE_CONFIG.size,
  gap: DEFAULT_STYLE_CONFIG.gap,
  roundness: DEFAULT_STYLE_CONFIG.roundness,
  // Demo
  showDebug: false,
  autoAdd: false,
  autoAddInterval: 2000,
}

// =============================================================================
// PANEL CONFIGURATION
// =============================================================================

const createAnimationSection = (config: PlaygroundConfig): ControlSection => ({
  id: 'animation',
  title: 'Animation',
  tabLabel: 'Animate',
  subsections: [
    {
      title: 'Quick Presets',
      controls: [
        {
          id: 'usePreset',
          label: 'Use Preset',
          type: 'checkbox',
          value: config.usePreset,
        },
        {
          id: 'preset',
          label: 'Preset',
          type: 'select',
          value: config.preset,
          options: PRESET_OPTIONS,
          disabled: !config.usePreset,
        },
      ],
    },
    {
      title: 'Transition Type',
      controls: [
        {
          id: 'transitionType',
          label: 'Type',
          type: 'select',
          value: config.transitionType,
          options: TRANSITION_TYPE_OPTIONS,
          disabled: config.usePreset,
        },
      ],
    },
    {
      title: 'Tween Settings',
      controls: [
        {
          id: 'easing',
          label: 'Easing',
          type: 'select',
          value: config.easing,
          options: EASING_OPTIONS,
          disabled: config.usePreset || config.transitionType !== 'tween',
        },
        {
          id: 'duration',
          label: 'Duration',
          type: 'slider',
          value: config.duration,
          min: 0.05,
          max: 0.5,
          step: 0.01,
          formatLabel: (v: number) => `${(v * 1000).toFixed(0)}ms`,
          disabled: config.usePreset || config.transitionType !== 'tween',
        },
      ],
    },
    {
      title: 'Spring Settings',
      controls: [
        {
          id: 'stiffness',
          label: 'Stiffness',
          type: 'slider',
          value: config.stiffness,
          min: 100,
          max: 1000,
          step: 50,
          formatLabel: (v: number) => `${v}`,
          disabled: config.usePreset || config.transitionType !== 'spring',
        },
        {
          id: 'damping',
          label: 'Damping',
          type: 'slider',
          value: config.damping,
          min: 5,
          max: 50,
          step: 5,
          formatLabel: (v: number) => `${v}`,
          disabled: config.usePreset || config.transitionType !== 'spring',
        },
      ],
    },
    {
      title: 'Exit Animation',
      controls: [
        {
          id: 'exitDuration',
          label: 'Exit Duration',
          type: 'slider',
          value: config.exitDuration,
          min: 0.02,
          max: 0.2,
          step: 0.01,
          formatLabel: (v: number) => `${(v * 1000).toFixed(0)}ms`,
          disabled: config.usePreset,
        },
      ],
    },
  ],
})

const createStyleSection = (config: PlaygroundConfig): ControlSection => ({
  id: 'style',
  title: 'Style',
  tabLabel: 'Style',
  subsections: [
    {
      title: 'Chip Appearance',
      controls: [
        {
          id: 'size',
          label: 'Size',
          type: 'select',
          value: config.size,
          options: SIZE_OPTIONS,
        },
        {
          id: 'roundness',
          label: 'Roundness',
          type: 'select',
          value: config.roundness,
          options: ROUNDNESS_OPTIONS,
        },
        {
          id: 'gap',
          label: 'Gap',
          type: 'select',
          value: config.gap,
          options: GAP_OPTIONS,
        },
      ],
    },
  ],
})

const createDemoSection = (config: PlaygroundConfig): ControlSection => ({
  id: 'demo',
  title: 'Demo',
  tabLabel: 'Demo',
  subsections: [
    {
      title: 'Debug',
      controls: [
        {
          id: 'showDebug',
          label: 'Show Indices',
          type: 'checkbox',
          value: config.showDebug,
        },
      ],
    },
    {
      title: 'Auto Add',
      controls: [
        {
          id: 'autoAdd',
          label: 'Auto Add Filters',
          type: 'checkbox',
          value: config.autoAdd,
        },
        {
          id: 'autoAddInterval',
          label: 'Interval',
          type: 'slider',
          value: config.autoAddInterval,
          min: 500,
          max: 5000,
          step: 250,
          formatLabel: (v: number) => `${(v / 1000).toFixed(1)}s`,
          disabled: !config.autoAdd,
        },
      ],
    },
  ],
})

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function FilterChipMotionPlayground() {
  const [config, setConfig] = useState<PlaygroundConfig>(DEFAULT_CONFIG)
  const [activeFilters, setActiveFilters] = useState<FilterChipData[]>([
    AVAILABLE_FILTERS[0], // Status
    AVAILABLE_FILTERS[1], // Assignee
  ])

  // Build animation config based on playground settings
  const animationConfig = useMemo<Partial<AnimationConfig>>(() => {
    if (config.usePreset) {
      return getPresetConfig(config.preset)
    }
    return {
      transitionType: config.transitionType,
      easing: config.easing,
      duration: config.duration,
      stiffness: config.stiffness,
      damping: config.damping,
      exitDuration: config.exitDuration,
    }
  }, [config])

  // Build style config
  const styleConfig = useMemo<Partial<StyleConfig>>(() => ({
    size: config.size,
    gap: config.gap,
    roundness: config.roundness,
  }), [config.size, config.gap, config.roundness])

  // Get available filters (not already active)
  const availableToAdd = useMemo(() => {
    const activeIds = new Set(activeFilters.map((f) => f.id))
    return AVAILABLE_FILTERS.filter((f) => !activeIds.has(f.id))
  }, [activeFilters])

  // Auto-add effect
  React.useEffect(() => {
    if (!config.autoAdd || availableToAdd.length === 0) return

    const interval = setInterval(() => {
      setActiveFilters((prev) => {
        const activeIds = new Set(prev.map((f) => f.id))
        const next = AVAILABLE_FILTERS.find((f) => !activeIds.has(f.id))
        if (!next) return prev
        return [...prev, next]
      })
    }, config.autoAddInterval)

    return () => clearInterval(interval)
  }, [config.autoAdd, config.autoAddInterval, availableToAdd.length])

  // Handler: Add filter
  const handleAddFilter = useCallback((filterId: string) => {
    const filter = AVAILABLE_FILTERS.find((f) => f.id === filterId)
    if (filter) {
      setActiveFilters((prev) => [...prev, filter])
    }
  }, [])

  // Handler: Change filter value
  const handleFilterChange = useCallback((filterId: string, value: string) => {
    setActiveFilters((prev) =>
      prev.map((f) => (f.id === filterId ? { ...f, value } : f))
    )
  }, [])

  // Handler: Remove filter
  const handleFilterRemove = useCallback((filterId: string) => {
    setActiveFilters((prev) => prev.filter((f) => f.id !== filterId))
  }, [])

  // Handler: Clear all filters
  const handleClearAll = useCallback(() => {
    setActiveFilters([])
  }, [])

  // Handler: Add all filters
  const handleAddAll = useCallback(() => {
    setActiveFilters(AVAILABLE_FILTERS)
  }, [])

  // Panel configuration
  const panelConfig = useMemo<UnifiedControlPanelConfig>(
    () => ({
      sections: [
        createAnimationSection(config),
        createStyleSection(config),
        createDemoSection(config),
      ],
      defaultActiveTab: 'animation',
      position: {
        top: '16px',
        bottom: '16px',
        right: '16px',
        width: '320px',
      },
      showReset: true,
      resetLabel: 'Reset',
    }),
    [config]
  )

  // Handle control changes
  const handleControlChange = useCallback((event: ControlChangeEvent) => {
    const { controlId, value } = event
    setConfig((prev) => ({ ...prev, [controlId]: value }))
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG)
    setActiveFilters([AVAILABLE_FILTERS[0], AVAILABLE_FILTERS[1]])
  }, [])

  // Get config for copy
  const getConfigForCopy = useCallback(() => config, [config])

  return (
    <div className="min-h-screen bg-primary">
      {/* Breadcrumbs */}
      <div className="nav-clearance px-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: 'Playground', href: '/playground' },
              { label: 'Filter Chip Motion' },
            ]}
          />
          <div className="text-xs text-tertiary">
            {activeFilters.length} of {AVAILABLE_FILTERS.length} filters active
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="pr-[352px] pb-24 md:pb-0">
        <div className="flex flex-col min-h-[calc(100vh-120px)] p-8">
          {/* Description */}
          <div className="mb-8 max-w-2xl">
            <h1 className="text-2xl font-semibold text-primary mb-2">
              Filter Chip Motion
            </h1>
            <p className="text-tertiary">
              AnimatePresence + popLayout for fluid add/remove animations with
              Base UI Select dropdowns. GPU-optimized transitions using only
              opacity, scale, and transform.
            </p>
          </div>

          {/* Filter Controls */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-tertiary mr-2">Add filter:</span>
            {availableToAdd.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleAddFilter(filter.id)}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-secondary text-secondary hover:bg-tertiary hover:text-primary transition-colors"
              >
                + {filter.label}
              </button>
            ))}
            {availableToAdd.length === 0 && (
              <span className="text-xs text-quaternary italic">
                All filters active
              </span>
            )}
          </div>

          {/* Active Filters - The Main Component */}
          <div className="bg-secondary rounded-2xl p-6 mb-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-primary">
                Active Filters
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleClearAll}
                  disabled={activeFilters.length === 0}
                  className="px-3 py-1 text-xs rounded-lg bg-tertiary text-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={handleAddAll}
                  disabled={availableToAdd.length === 0}
                  className="px-3 py-1 text-xs rounded-lg bg-brand-primary text-primary_on-brand hover:bg-brand-primary_hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Add All
                </button>
              </div>
            </div>

            {activeFilters.length > 0 ? (
              <FilterSelectChipMotion
                filters={activeFilters}
                onFilterChange={handleFilterChange}
                onFilterRemove={handleFilterRemove}
                animationConfig={animationConfig}
                styleConfig={styleConfig}
                showDebug={config.showDebug}
              />
            ) : (
              <div className="flex items-center justify-center h-16 text-quaternary text-sm">
                No active filters. Click a filter above to add one.
              </div>
            )}
          </div>

          {/* Current Config Display */}
          <div className="bg-tertiary rounded-xl p-4">
            <div className="text-xs font-mono text-tertiary">
              <div className="mb-2 text-secondary font-medium">
                Current Animation Config:
              </div>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(animationConfig, null, 2)}
              </pre>
            </div>
          </div>
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
