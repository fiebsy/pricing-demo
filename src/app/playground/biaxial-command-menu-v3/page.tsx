/**
 * Biaxial Command Menu V3 - Playground
 *
 * Minimal canvas for experimenting with stacked menu configurations.
 */

'use client'

import * as React from 'react'
import { useCallback, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/prod/base/control-panel'

// V3 imports
import {
  BiaxialCommandMenuV3,
  SAMPLE_COMMANDS,
} from '@/components/ui/prod/base/biaxial-command-menu-v3'
import type { CommandItemAction } from '@/components/ui/prod/base/biaxial-command-menu-v3'

// Icons for customization
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'

// Playground imports
import type { PlaygroundState } from '@/components/ui/prod/base/biaxial-command-menu-v3/playground'
import {
  PRESETS,
  DEFAULT_STATE,
  buildPanelConfig,
  updateNestedValue,
} from '@/components/ui/prod/base/biaxial-command-menu-v3/playground'

// ============================================================================
// PLAYGROUND PAGE
// ============================================================================

export default function BiaxialCommandMenuV3Playground() {
  const [state, setState] = useState<PlaygroundState>(DEFAULT_STATE)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [expandedMenus, setExpandedMenus] = useState<Record<number, boolean>>({})
  const [lockExpanded, setLockExpanded] = useState(false)
  const [menuCount, setMenuCount] = useState(1)
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null)

  const handleChange = useCallback((event: ControlChangeEvent) => {
    setState((prev) => updateNestedValue(prev, event.controlId, event.value))
    setActivePresetId(null)
  }, [])

  const handleReset = useCallback(() => {
    setState(DEFAULT_STATE)
    setActivePresetId('default')
    setExpandedMenus({})
    setLockExpanded(false)
    setActiveMenuIndex(null)
  }, [])

  const handlePresetChange = useCallback((presetId: string) => {
    const preset = PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setState(preset.data)
      setActivePresetId(presetId)
    }
  }, [])

  const handleSelect = useCallback((item: CommandItemAction) => {
    console.log('[BiaxialCommandMenuV3] Selected:', item.label)
  }, [])

  const handleExpandedChange = useCallback((index: number, newExpanded: boolean) => {
    if (lockExpanded && !newExpanded) return
    setExpandedMenus((prev) => ({ ...prev, [index]: newExpanded }))
    setActiveMenuIndex(newExpanded ? index : null)
  }, [lockExpanded])

  const handleLockToggle = useCallback(() => {
    setLockExpanded((prev) => {
      if (!prev) {
        // Lock all currently expanded menus, or expand first one
        setExpandedMenus((menus) => {
          const hasExpanded = Object.values(menus).some(Boolean)
          return hasExpanded ? menus : { 0: true }
        })
        setActiveMenuIndex(0)
      }
      return !prev
    })
  }, [])

  const panelConfig = useMemo(
    () => buildPanelConfig(state, activePresetId),
    [state, activePresetId]
  )

  return (
    <div className="relative min-h-screen" style={{ height: '100vh' }}>
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleChange}
        onReset={handleReset}
        onPresetChange={handlePresetChange}
        getConfigForCopy={() => state}
      />

      {/* Floating Controls - Left Center */}
      <div className="fixed left-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2">
        <button
          type="button"
          onClick={handleLockToggle}
          className={cn(
            'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors shadow-md',
            lockExpanded
              ? 'bg-brand-solid text-on-brand'
              : 'bg-primary text-tertiary hover:bg-secondary hover:text-secondary border border-primary'
          )}
        >
          {lockExpanded ? 'Unlock' : 'Lock'}
        </button>

        {/* Menu Count Controls */}
        <div className="flex items-center gap-1 rounded-lg bg-primary border border-primary shadow-md">
          <button
            type="button"
            onClick={() => setMenuCount((c) => Math.max(1, c - 1))}
            disabled={menuCount <= 1}
            className="px-2.5 py-1.5 text-sm font-medium text-tertiary hover:text-secondary disabled:opacity-30 disabled:cursor-not-allowed"
          >
            −
          </button>
          <span className="text-xs font-medium text-secondary min-w-[20px] text-center">
            {menuCount}
          </span>
          <button
            type="button"
            onClick={() => setMenuCount((c) => Math.min(5, c + 1))}
            disabled={menuCount >= 5}
            className="px-2.5 py-1.5 text-sm font-medium text-tertiary hover:text-secondary disabled:opacity-30 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>

      {/* Transparent Canvas */}
      <div className="flex h-full flex-col items-center justify-center overflow-visible">
        {/* Menu Stack Container */}
        <div className="flex flex-col items-center gap-4">
          {Array.from({ length: menuCount }).map((_, index) => (
            <div
              key={index}
              className="relative"
              style={{
                zIndex: activeMenuIndex === index ? 50 : menuCount - index,
              }}
            >
              <BiaxialCommandMenuV3
                groups={SAMPLE_COMMANDS}
                config={{
                  ...state.config,
                  // Provide default right icon for playground testing
                  rightIcon: state.config.showRightIcon ? ArrowRight01Icon : undefined,
                }}
                expanded={expandedMenus[index] ?? false}
                onExpandedChange={(newExpanded) => handleExpandedChange(index, newExpanded)}
                onSelect={handleSelect}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
