/**
 * Question Command Menu V2 Playground
 *
 * A comprehensive playground for the Question Command Menu component.
 * Features full styling control via UnifiedControlPanel with V3-style comprehensive configuration.
 *
 * Key Features:
 * - Top section with filter tabs (like V4)
 * - Input with action buttons inside
 * - Comprehensive styling controls for all layers
 * - Full preset system with copy functionality
 */

'use client'

import { useCallback, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/prod/base/control-panel'
import {
  BiaxialExpandV4,
  type BiaxialExpandConfig,
} from '@/components/ui/prod/base/biaxial-command-menu-v4'

// Config imports
import type { PlaygroundState, QuestionCommandMenuConfig } from './config/types'
import { DEFAULT_STATE, PRESETS } from './config/presets'
import { buildPanelConfig, updateNestedValue } from './panels/panel-config'

// Variant imports
import { InputWithButtons } from './variants/input-with-buttons'
import { QuestionContent, SAMPLE_QUESTIONS } from './variants/question-content'
import { FilterTabs } from './variants/filter-tabs'
import type { QuestionGroup } from './config/types'

// ============================================================================
// HEIGHT CALCULATION (like V3)
// ============================================================================

function filterQuestionGroups(groups: QuestionGroup[], filter: string): QuestionGroup[] {
  if (!filter) return groups

  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.text.toLowerCase().includes(filter.toLowerCase()) ||
          item.answer?.toLowerCase().includes(filter.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0)
}

function calculateDynamicHeight(
  groups: QuestionGroup[],
  itemHeight: number,
  itemGap: number,
  paddingTop: number,
  paddingBottom: number,
  maxHeight: number
): number {
  const itemCount = groups.reduce((sum, g) => sum + g.items.length, 0)
  const groupCount = groups.length

  if (itemCount === 0) {
    return Math.min(100, maxHeight) // Empty state
  }

  // Calculate content height
  const itemsHeight = itemCount * itemHeight
  const gapsHeight = Math.max(0, itemCount - 1) * itemGap
  const groupHeaderHeight = groupCount * 32 // Group labels
  const groupGapsHeight = Math.max(0, groupCount - 1) * 8

  const contentHeight =
    itemsHeight + gapsHeight + groupHeaderHeight + groupGapsHeight + paddingTop + paddingBottom

  return Math.min(contentHeight, maxHeight)
}

// ============================================================================
// CONFIG TRANSFORMER
// ============================================================================

function transformToV4Config(
  config: QuestionCommandMenuConfig,
  calculatedBottomHeight?: number
): Partial<BiaxialExpandConfig> {
  // Helper to convert 'none' to undefined for Background type compatibility
  const toBackground = (bg: string | undefined) =>
    bg === 'none' ? undefined : bg as 'primary' | 'secondary' | 'tertiary' | 'quaternary' | undefined

  return {
    layout: {
      triggerWidth: config.layout.triggerWidth,
      triggerHeight: config.layout.triggerHeight,
      panelWidth: config.layout.panelWidth,
      maxBottomHeight: calculatedBottomHeight ?? config.layout.maxBottomHeight,
      borderRadius: config.layout.borderRadius,
      topGap: config.layout.topGap,
      bottomGap: config.layout.bottomGap,
      backdropTopOffset: config.layout.backdropTopOffset,
    },
    animation: {
      duration: config.animation.duration,
      collapseDuration: config.animation.collapseDuration,
      contentFadeDuration: config.animation.contentFadeDuration,
      contentFadeDelay: config.animation.contentFadeDelay,
      backdropMode: config.animation.backdropMode,
      backdropDelay: config.animation.backdropDelay,
      backdropDurationOffset: config.animation.backdropDurationOffset,
      animateSlotContainers: config.animation.animateSlotContainers,
      slotContainerDelay: config.animation.slotContainerDelay,
      slotContainerDurationOffset: config.animation.slotContainerDurationOffset,
      expandOrigin: config.animation.expandOrigin,
    },
    appearance: {
      borderRadius: config.appearance.borderRadius,
      shadow: config.appearance.shadow,
      shine: config.appearance.shine,
      background: toBackground(config.appearance.background),
      gradient: config.appearance.gradient,
      gradientColor: config.appearance.gradientColor,
      squircle: config.appearance.squircle,
    },
    topSlot: {
      enabled: config.topSlot.enabled,
      height: config.topSlot.height,
      delayOffset: config.topSlot.delayOffset,
      durationOffset: config.topSlot.durationOffset,
      background: toBackground(config.topSlot.background),
      borderRadius: config.topSlot.borderRadius,
      inset: config.topSlot.inset,
      borderWidth: config.topSlot.borderWidth,
      borderColor: config.topSlot.borderColor,
    },
    bottomSlot: {
      enabled: config.bottomSlot.enabled,
      delayOffset: config.bottomSlot.delayOffset,
      durationOffset: config.bottomSlot.durationOffset,
      background: toBackground(config.bottomSlot.background),
      borderRadius: config.bottomSlot.borderRadius,
      inset: config.bottomSlot.inset,
      borderWidth: config.bottomSlot.borderWidth,
      borderColor: config.bottomSlot.borderColor,
    },
    debug: config.debug,
  }
}

// ============================================================================
// PREVIEW COMPONENT
// ============================================================================

interface PreviewProps {
  config: QuestionCommandMenuConfig
}

function Preview({ config }: PreviewProps) {
  const [filter, setFilter] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  // Filter groups and calculate dynamic height (like V3)
  const filteredGroups = useMemo(
    () => filterQuestionGroups(SAMPLE_QUESTIONS, filter),
    [filter]
  )

  const dynamicBottomHeight = useMemo(
    () =>
      calculateDynamicHeight(
        filteredGroups,
        config.items.height,
        config.items.gap,
        config.bottomSlot.scrollPaddingTop,
        config.bottomSlot.scrollPaddingBottom,
        config.layout.maxBottomHeight
      ),
    [
      filteredGroups,
      config.items.height,
      config.items.gap,
      config.bottomSlot.scrollPaddingTop,
      config.bottomSlot.scrollPaddingBottom,
      config.layout.maxBottomHeight,
    ]
  )

  const v4Config = useMemo(
    () => transformToV4Config(config, dynamicBottomHeight),
    [config, dynamicBottomHeight]
  )

  const handleSelect = useCallback((item: { id: string; text: string }) => {
    console.log('[QuestionCommandMenu] Selected:', item.text)
  }, [])

  const handleButtonClick = useCallback((index: number, buttonConfig: { icon?: string }) => {
    console.log('[QuestionCommandMenu] Button clicked:', index, buttonConfig.icon)
  }, [])

  return (
    <BiaxialExpandV4.Root config={v4Config}>
      {/* Top Slot */}
      {config.topSlot.enabled && (
        <BiaxialExpandV4.TopSlot>
          <FilterTabs
            value={activeTab}
            onChange={setActiveTab}
            options={[
              { id: 'recent', label: 'Recent' },
              { id: 'starred', label: 'Starred' },
              { id: 'all', label: 'All' },
            ]}
          />
        </BiaxialExpandV4.TopSlot>
      )}

      {/* Backdrop */}
      <BiaxialExpandV4.Backdrop />

      {/* Content */}
      <BiaxialExpandV4.Content>
        {/* Trigger */}
        <BiaxialExpandV4.Trigger>
          <InputWithButtons
            placeholder={config.placeholder}
            value={filter}
            onValueChange={setFilter}
            triggerConfig={config.trigger}
            onButtonClick={handleButtonClick}
          />
        </BiaxialExpandV4.Trigger>

        {/* Bottom Content */}
        <BiaxialExpandV4.ContentWrapper>
          <BiaxialExpandV4.BottomSlot>
            <QuestionContent
              groups={SAMPLE_QUESTIONS}
              filter={filter}
              onSelect={handleSelect}
              itemsConfig={config.items}
              bottomSlotConfig={config.bottomSlot}
              emptyMessage={config.emptyStateMessage}
            />
          </BiaxialExpandV4.BottomSlot>
        </BiaxialExpandV4.ContentWrapper>
      </BiaxialExpandV4.Content>
    </BiaxialExpandV4.Root>
  )
}

// ============================================================================
// PLAYGROUND PAGE
// ============================================================================

export default function QuestionCommandMenuV2Playground() {
  const [state, setState] = useState<PlaygroundState>(DEFAULT_STATE)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [lockExpanded, setLockExpanded] = useState(false)

  const handleChange = useCallback((event: ControlChangeEvent) => {
    setState((prev) => updateNestedValue(prev, event.controlId, event.value))
    setActivePresetId(null)
  }, [])

  const handleReset = useCallback(() => {
    setState(DEFAULT_STATE)
    setActivePresetId('default')
  }, [])

  const handlePresetChange = useCallback((presetId: string) => {
    const preset = PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setState(preset.data)
      setActivePresetId(presetId)
    }
  }, [])

  const panelConfig = useMemo(
    () => buildPanelConfig(state, activePresetId),
    [state, activePresetId]
  )

  return (
    <div className="relative min-h-screen" style={{ height: '100vh' }}>
      {/* Control Panel */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleChange}
        onReset={handleReset}
        onPresetChange={handlePresetChange}
        getConfigForCopy={() => state.config}
      />

      {/* Floating Controls */}
      <div className="fixed left-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2">
        <button
          type="button"
          onClick={() => setLockExpanded((prev) => !prev)}
          className={cn(
            'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors shadow-md',
            lockExpanded
              ? 'bg-brand-solid text-on-brand'
              : 'bg-primary text-tertiary hover:bg-secondary hover:text-secondary border border-primary'
          )}
        >
          {lockExpanded ? 'Unlock' : 'Lock'}
        </button>
      </div>

      {/* Preview Canvas */}
      <div className="flex h-full flex-col items-center justify-center overflow-visible pr-[352px]">
        <Preview config={state.config} />

        {/* Info Text */}
        <div className="mt-8 text-center">
          <h1 className="text-lg font-semibold text-primary">
            Question Command Menu V2
          </h1>
          <p className="text-sm text-tertiary mt-1">
            Click the input to expand. Configure with the panel on the right.
          </p>
          <p className="text-xs text-quaternary mt-2">
            Top section with filters | Input with action buttons | Full styling control
          </p>
        </div>
      </div>
    </div>
  )
}
