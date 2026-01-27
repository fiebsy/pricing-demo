/**
 * Biaxial Command Menu - Playground Page
 *
 * A search input that expands into a command palette using
 * the biaxial animation system.
 */

'use client'

import * as React from 'react'
import { useCallback, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/prod/base/control-panel'

// Core imports
import {
  BiaxialCommandMenu,
  SAMPLE_COMMANDS,
} from '@/components/ui/prod/base/biaxial-command-menu'
import type { CommandItemAction } from '@/components/ui/prod/base/biaxial-command-menu'

// Playground imports
import type { PlaygroundState } from '@/components/ui/prod/base/biaxial-command-menu/playground'
import {
  PRESETS,
  DEFAULT_STATE,
  buildPanelConfig,
  updateNestedValue,
} from '@/components/ui/prod/base/biaxial-command-menu/playground'

// ============================================================================
// PLAYGROUND PAGE
// ============================================================================

export default function BiaxialCommandMenuPlayground() {
  const [state, setState] = useState<PlaygroundState>(DEFAULT_STATE)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [expanded, setExpanded] = useState(false)
  const [lastSelected, setLastSelected] = useState<string | null>(null)

  const handleChange = useCallback((event: ControlChangeEvent) => {
    setState((prev) => updateNestedValue(prev, event.controlId, event.value))
    // Clear active preset when user makes manual changes
    setActivePresetId(null)
  }, [])

  const handleReset = useCallback(() => {
    setState(DEFAULT_STATE)
    setActivePresetId('default')
    setExpanded(false)
    setLastSelected(null)
  }, [])

  const handlePresetChange = useCallback((presetId: string) => {
    const preset = PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setState(preset.data)
      setActivePresetId(presetId)
    }
  }, [])

  const handleSelect = useCallback((item: CommandItemAction) => {
    setLastSelected(item.label)
    console.log('[BiaxialCommandMenu] Selected:', item.label)
  }, [])

  const panelConfig = useMemo(
    () => buildPanelConfig(state, activePresetId),
    [state, activePresetId]
  )

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ height: '100vh' }}
    >
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleChange}
        onReset={handleReset}
        onPresetChange={handlePresetChange}
        getConfigForCopy={() => state}
      />

      <div className="bg-secondary flex h-full flex-col overflow-auto">
        <div className="flex flex-1 flex-col items-center pt-16">
          {/* Page Title */}
          <h1 className="text-primary text-xl font-semibold mb-8">
            Biaxial Command Menu
          </h1>

          {/* Toolbar Container */}
          <div
            className={cn(
              'bg-primary border-secondary flex h-12 w-[480px] items-center justify-center rounded-xl border px-3'
            )}
          >
            <BiaxialCommandMenu
              groups={SAMPLE_COMMANDS}
              config={state.config}
              expanded={expanded}
              onExpandedChange={setExpanded}
              onSelect={handleSelect}
            />
          </div>

          {/* Config Info */}
          <div className="mt-8 text-tertiary rounded-lg bg-tertiary px-3 py-2 font-mono text-xs">
            <span className="text-secondary">Input:</span>{' '}
            <span className="text-brand-primary">
              {state.config.inputWidth}x{state.config.inputHeight}
            </span>
            {' | '}
            <span className="text-secondary">Panel:</span>{' '}
            <span className="text-brand-primary">{state.config.panelWidth}px</span>
            {' | '}
            <span className="text-secondary">Radius:</span>{' '}
            <span className="text-brand-primary">{state.config.borderRadius}px</span>
          </div>

          {/* Last Selected */}
          {lastSelected && (
            <div className="mt-4 text-tertiary rounded-lg bg-tertiary px-3 py-1.5 text-xs">
              Last selected:{' '}
              <span className="text-success font-medium">{lastSelected}</span>
            </div>
          )}

          {/* Instructions */}
          <p className="text-quaternary mt-6 text-xs">
            Click input to expand. Type to filter. Arrow keys to navigate. Enter
            to select.
          </p>

          {/* Feature Notes */}
          <div className="mt-8 max-w-md text-quaternary rounded-lg bg-tertiary px-4 py-3 text-xs">
            <p className="font-medium text-secondary mb-2">
              Command Menu Features:
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                <span className="text-tertiary">Input Trigger</span> - Search
                input expands on focus
              </li>
              <li>
                <span className="text-tertiary">Biaxial Animation</span> - Same
                two-layer system as menu
              </li>
              <li>
                <span className="text-tertiary">Keyboard Navigation</span> -
                Arrow keys + Enter to select
              </li>
              <li>
                <span className="text-tertiary">Filtering</span> - Type to filter
                commands by label/description
              </li>
              <li>
                <span className="text-tertiary">Grouped Items</span> - Commands
                organized by category
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
