/**
 * Biaxial Command Menu V2 - Experimental Playground
 *
 * Explore animation sync between backdrop and content layers.
 * Try different presets to see various timing relationships.
 */

'use client'

import * as React from 'react'
import { useCallback, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/prod/base/control-panel'

// V2 imports
import {
  BiaxialCommandMenuV2,
  SAMPLE_COMMANDS,
} from '@/components/ui/prod/base/biaxial-command-menu-v2'
import type { CommandItemAction } from '@/components/ui/prod/base/biaxial-command-menu-v2'

// Playground imports
import type { PlaygroundState } from '@/components/ui/prod/base/biaxial-command-menu-v2/playground'
import {
  PRESETS,
  DEFAULT_STATE,
  buildPanelConfig,
  updateNestedValue,
} from '@/components/ui/prod/base/biaxial-command-menu-v2/playground'

// ============================================================================
// PLAYGROUND PAGE
// ============================================================================

export default function BiaxialCommandMenuV2Playground() {
  const [state, setState] = useState<PlaygroundState>(DEFAULT_STATE)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [expanded, setExpanded] = useState(false)
  const [lastSelected, setLastSelected] = useState<string | null>(null)

  const handleChange = useCallback((event: ControlChangeEvent) => {
    setState((prev) => updateNestedValue(prev, event.controlId, event.value))
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
    console.log('[BiaxialCommandMenuV2] Selected:', item.label)
  }, [])

  const panelConfig = useMemo(
    () => buildPanelConfig(state, activePresetId),
    [state, activePresetId]
  )

  // Current animation sync info for display
  const syncInfo = state.config.animationSync

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
          <h1 className="text-primary text-xl font-semibold mb-2">
            Biaxial Command Menu V2
          </h1>
          <p className="text-tertiary text-sm mb-8">
            Experimental Animation Sync
          </p>

          {/* Toolbar Container */}
          <div
            className={cn(
              'bg-primary border-secondary flex h-12 w-[480px] items-center justify-center rounded-xl border px-3'
            )}
          >
            <BiaxialCommandMenuV2
              groups={SAMPLE_COMMANDS}
              config={state.config}
              expanded={expanded}
              onExpandedChange={setExpanded}
              onSelect={handleSelect}
            />
          </div>

          {/* Animation Sync Info */}
          <div className="mt-8 text-tertiary rounded-lg bg-tertiary px-4 py-3 font-mono text-xs">
            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
              <div>
                <span className="text-quaternary">Backdrop Mode:</span>{' '}
                <span className="text-brand-primary">{syncInfo.backdropMode}</span>
              </div>
              <div>
                <span className="text-quaternary">Menu Anim:</span>{' '}
                <span className={syncInfo.animateMenuContainer ? 'text-success' : 'text-tertiary'}>
                  {syncInfo.animateMenuContainer ? 'ON' : 'OFF'}
                </span>
              </div>
              <div>
                <span className="text-quaternary">Backdrop Delay:</span>{' '}
                <span className="text-secondary">{syncInfo.backdropDelay}ms</span>
              </div>
              <div>
                <span className="text-quaternary">Menu Delay:</span>{' '}
                <span className="text-secondary">{syncInfo.menuContainerDelay}ms</span>
              </div>
              <div>
                <span className="text-quaternary">Backdrop Offset:</span>{' '}
                <span className="text-secondary">
                  {syncInfo.backdropDurationOffset > 0 ? '+' : ''}
                  {syncInfo.backdropDurationOffset}ms
                </span>
              </div>
              <div>
                <span className="text-quaternary">Origin:</span>{' '}
                <span className="text-secondary">{syncInfo.expandOrigin}</span>
              </div>
            </div>
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
            Click input to expand. Try different presets to explore animation timing.
          </p>

          {/* Feature Notes */}
          <div className="mt-8 max-w-lg text-quaternary rounded-lg bg-tertiary px-4 py-3 text-xs">
            <p className="font-medium text-secondary mb-2">
              V2 Animation Sync Features:
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                <span className="text-tertiary">Backdrop Mode</span> - Choose
                size-based or clip-path animation
              </li>
              <li>
                <span className="text-tertiary">Backdrop Delay</span> - Offset
                backdrop start time vs content
              </li>
              <li>
                <span className="text-tertiary">Duration Offset</span> - Make
                backdrop faster or slower than content
              </li>
              <li>
                <span className="text-tertiary">Menu Container Animation</span> -
                Enable growing card effect
              </li>
              <li>
                <span className="text-tertiary">Expand Origin</span> - Control
                where menu grows from (top/center)
              </li>
            </ul>
          </div>

          {/* Preset Recommendations */}
          <div className="mt-4 max-w-lg text-quaternary rounded-lg bg-quaternary px-4 py-3 text-xs">
            <p className="font-medium text-secondary mb-2">
              Recommended Presets to Try:
            </p>
            <ul className="space-y-1">
              <li>
                <span className="text-brand-primary font-medium">Clip-Path Sync</span>{' '}
                - Backdrop uses same reveal as content
              </li>
              <li>
                <span className="text-brand-primary font-medium">Menu Grows</span>{' '}
                - Menu container animates separately
              </li>
              <li>
                <span className="text-brand-primary font-medium">Staggered Reveal</span>{' '}
                - Three-layer staggered animation
              </li>
              <li>
                <span className="text-brand-primary font-medium">Perfect Sync</span>{' '}
                - Backdrop and content perfectly aligned
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
