// =============================================================================
// Action Bar
// =============================================================================
// Bottom action bar with presets, copy, and reset functionality.
// =============================================================================

'use client'

import { useCallback, useState } from 'react'
import Copy01Icon from '@hugeicons-pro/core-stroke-rounded/Copy01Icon'
import Tick01Icon from '@hugeicons-pro/core-stroke-rounded/Tick01Icon'
import { cx } from '@/components/utils/cx'

// Using deprecated primitives until prod/base/ Select is ready
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/deprecated/base/primitives/select'

// Prod components
import { Button } from '@/components/ui/prod/base/button'

import type { PresetConfig } from '../types'

interface ActionBarProps<T = unknown> {
  presetConfig?: PresetConfig<T>
  showReset?: boolean
  resetLabel?: string
  onReset?: () => void
  onPresetChange?: (presetId: string) => void
  getConfigForCopy?: () => T
}

export function ActionBar<T>({
  presetConfig,
  showReset = true,
  resetLabel = 'Reset',
  onReset,
  onPresetChange,
  getConfigForCopy,
}: ActionBarProps<T>) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle')

  const hasPresets = presetConfig && presetConfig.presets.length > 0
  const showCopyButton = presetConfig?.showCopyButton !== false && getConfigForCopy
  const hasContent = hasPresets || showCopyButton || (showReset && onReset)

  const handleCopyConfig = useCallback(async () => {
    if (!getConfigForCopy) return

    try {
      const configData = getConfigForCopy()
      const jsonString = JSON.stringify(configData, null, 2)
      await navigator.clipboard.writeText(jsonString)
      setCopyStatus('copied')
      setTimeout(() => setCopyStatus('idle'), 2000)
    } catch (err) {
      console.error('Failed to copy config:', err)
    }
  }, [getConfigForCopy])

  const handlePresetSelect = useCallback(
    (presetId: string) => {
      if (presetId && onPresetChange) {
        onPresetChange(presetId)
      }
    },
    [onPresetChange]
  )

  if (!hasContent) return null

  return (
    <div className="bg-primary border-primary shrink-0 rounded-b-xl border p-2">
      <div className="flex items-center gap-2">
        {/* Preset Selector */}
        {hasPresets && (
          <div className="min-w-0 flex-1">
            <Select
              value={presetConfig.activePresetId || undefined}
              onValueChange={handlePresetSelect}
            >
              <SelectTrigger className="h-8 w-full px-2 py-1 font-mono text-xs">
                <SelectValue placeholder="Preset..." />
              </SelectTrigger>
              <SelectContent className="max-w-[280px]">
                {presetConfig.presets.map((preset) => (
                  <SelectItem key={preset.id} value={preset.id} className="font-mono text-xs">
                    {preset.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Copy Button */}
        {showCopyButton && (
          <Button
            size="sm"
            variant={copyStatus === 'copied' ? 'primary' : 'secondary'}
            onClick={handleCopyConfig}
            className="shrink-0"
            iconLeading={copyStatus === 'copied' ? Tick01Icon : Copy01Icon}
          />
        )}

        {/* Reset Button */}
        {showReset && onReset && (
          <Button size="sm" variant="tertiary" onClick={onReset} className="shrink-0">
            {resetLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
