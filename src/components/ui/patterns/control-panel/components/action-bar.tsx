// =============================================================================
// Action Bar
// =============================================================================
// Bottom action bar with presets, copy, and reset functionality.
// =============================================================================

'use client'

import { useCallback, useState } from 'react'
import { Select } from '@base-ui/react/select'
import Copy01Icon from '@hugeicons-pro/core-stroke-rounded/Copy01Icon'
import Tick01Icon from '@hugeicons-pro/core-stroke-rounded/Tick01Icon'
import { cx } from '@/components/utils/cx'
import { inlineSelectStyles as selectStyles } from '@/components/ui/core/primitives/select'

// Prod components
import { Button } from '@/components/ui/core/primitives/button'

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
  const hasContent = true // Always show action bar
  
  // Build presets list - always include Default
  const presets = hasPresets 
    ? presetConfig.presets 
    : [{ id: 'default', name: 'Default' }]
  const activePresetId = presetConfig?.activePresetId || 'default'

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
        {/* Preset Selector - Always shown */}
        <div className="min-w-0 flex-1">
          <Select.Root
            value={activePresetId}
            onValueChange={(v) => v !== null && handlePresetSelect(v)}
          >
            <Select.Trigger
              className={cx(
                'bg-tertiary/50 relative flex h-7 w-full items-center rounded-md',
                'cursor-pointer outline-none px-2.5',
                'focus-visible:ring-brand focus-visible:ring-1',
                'data-[popup-open]:bg-tertiary/70',
              )}
            >
              <Select.Value className="text-secondary text-xs font-medium">
                {presets.find((p) => p.id === activePresetId)?.name || 'Default'}
              </Select.Value>
              <span className="flex-1" />
              <Select.Icon className={selectStyles.chevron}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M2.5 3.75L5 6.25L7.5 3.75"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner
                alignItemWithTrigger={false}
                side="bottom"
                align="end"
                sideOffset={4}
                collisionPadding={8}
                className="z-[99]"
              >
                <Select.Popup className={selectStyles.popup}>
                  {presets.map((preset) => (
                    <Select.Item
                      key={preset.id}
                      value={preset.id}
                      className={selectStyles.popupItem}
                    >
                      <Select.ItemText>{preset.name}</Select.ItemText>
                      <Select.ItemIndicator className={selectStyles.itemIndicator}>
                        <CheckIcon />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* Copy Button */}
        {showCopyButton && (
          <Button
            size="xs"
            variant={copyStatus === 'copied' ? 'primary' : 'secondary'}
            onClick={handleCopyConfig}
            className="shrink-0"
            iconLeading={copyStatus === 'copied' ? Tick01Icon : Copy01Icon}
          />
        )}

        {/* Reset Button */}
        {showReset && onReset && (
          <Button size="xs" variant="tertiary" onClick={onReset} className="shrink-0">
            {resetLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path
        d="M13.5 4.5L6.5 11.5L3 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
