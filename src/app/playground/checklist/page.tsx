/**
 * Checklist Playground
 *
 * Focused checklist component with full styling control.
 *
 * Features:
 * - Dynamic item add/remove with optional date field
 * - Text style controls (size, weight, color, opacity)
 * - Date style controls (size, weight, color, opacity)
 * - Icon style controls (size, weight, color, opacity)
 * - Layout controls (item gap)
 */

'use client'

import { useCallback, useState, useMemo } from 'react'
import {
  UnifiedControlPanel,
  PlaygroundLayout,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'

import { Checklist } from './core/checklist'
import type { ChecklistConfig } from './config/types'
import { DEFAULT_CHECKLIST_CONFIG, CHECKLIST_PRESETS, createNewItem } from './config/presets'
import { buildChecklistPanelConfig } from './panels/panel-config'

// ============================================================================
// Utility: Deep set nested value
// ============================================================================

function setNestedValue<T>(obj: T, path: string, value: unknown): T {
  const keys = path.split('.')
  const result = structuredClone(obj) as Record<string, unknown>
  let current = result

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    const nextKey = keys[i + 1]
    const nextIsArrayIndex = /^\d+$/.test(nextKey)

    if (typeof current[key] !== 'object' || current[key] === null) {
      current[key] = nextIsArrayIndex ? [] : {}
    } else if (Array.isArray(current[key])) {
      current[key] = [...(current[key] as unknown[])]
    } else {
      current[key] = { ...(current[key] as Record<string, unknown>) }
    }
    current = current[key] as Record<string, unknown>
  }

  current[keys[keys.length - 1]] = value
  return result as T
}

// ============================================================================
// Demo Content
// ============================================================================

interface DemoContentProps {
  config: ChecklistConfig
}

function DemoContent({ config }: DemoContentProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-secondary">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <Checklist config={config} />
      </div>
    </div>
  )
}

// ============================================================================
// Item Controls Component
// ============================================================================

interface ItemControlsProps {
  itemCount: number
  onAdd: () => void
  onRemove: () => void
}

function ItemControls({ itemCount, onAdd, onRemove }: ItemControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onRemove}
        disabled={itemCount <= 1}
        className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-primary transition-colors hover:bg-tertiary disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Remove item"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 8H13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <span className="min-w-[3ch] text-center text-sm text-secondary">
        {itemCount}
      </span>
      <button
        onClick={onAdd}
        disabled={itemCount >= 10}
        className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-primary transition-colors hover:bg-tertiary disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Add item"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 3V13M3 8H13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  )
}

// ============================================================================
// Page Component
// ============================================================================

export default function ChecklistPlayground() {
  const [config, setConfig] = useState<ChecklistConfig>(DEFAULT_CHECKLIST_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')

  // Handle adding an item
  const handleAddItem = useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      items: [...prev.items, createNewItem(prev.items.length)],
    }))
    setActivePresetId(null)
  }, [])

  // Handle removing the last item
  const handleRemoveItem = useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      items: prev.items.slice(0, -1),
    }))
    setActivePresetId(null)
  }, [])

  // Handle control changes
  const handleChange = useCallback((event: ControlChangeEvent) => {
    // Skip the custom add/remove control
    if (event.controlId === 'items.add') return

    setConfig((prev) => {
      // If setting a dateStyle property and dateStyle doesn't exist, initialize from textStyle
      if (event.controlId.startsWith('dateStyle.') && !prev.dateStyle) {
        const withDateStyle = { ...prev, dateStyle: { ...prev.textStyle } }
        return setNestedValue(withDateStyle, event.controlId, event.value)
      }
      return setNestedValue(prev, event.controlId, event.value)
    })
    setActivePresetId(null)
  }, [])

  // Handle preset selection
  const handlePresetChange = useCallback((presetId: string) => {
    const preset = CHECKLIST_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
    }
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CHECKLIST_CONFIG)
    setActivePresetId('default')
  }, [])

  // Build panel configuration
  const panelConfig = useMemo(
    () => buildChecklistPanelConfig(config, CHECKLIST_PRESETS, activePresetId),
    [config, activePresetId]
  )

  // Override the custom control render
  const enhancedPanelConfig = useMemo(() => {
    const sections = panelConfig.sections.map((section) => {
      if (section.id !== 'items') return section

      return {
        ...section,
        groups: section.groups?.map((group) => {
          if (group.title !== 'Manage Items') return group

          return {
            ...group,
            controls: group.controls.map((control) => {
              if (control.id !== 'items.add') return control

              return {
                ...control,
                render: () => (
                  <ItemControls
                    itemCount={config.items.length}
                    onAdd={handleAddItem}
                    onRemove={handleRemoveItem}
                  />
                ),
              }
            }),
          }
        }),
      }
    })

    return { ...panelConfig, sections }
  }, [panelConfig, config.items.length, handleAddItem, handleRemoveItem])

  return (
    <PlaygroundLayout
      className="bg-primary"
      controlPanel={
        <UnifiedControlPanel
          config={enhancedPanelConfig}
          onChange={handleChange}
          onPresetChange={handlePresetChange}
          onReset={handleReset}
          getConfigForCopy={() => config}
        />
      }
    >
      <DemoContent config={config} />
    </PlaygroundLayout>
  )
}
