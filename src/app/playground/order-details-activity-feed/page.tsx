'use client'

/**
 * Order Details Activity Feed Playground
 *
 * Core component: ./core/order-details-feed.tsx
 * Migration target: src/components/ui/features/order-details-feed
 */

import { useCallback, useMemo, useState } from 'react'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/prod/base/control-panel'

import { OrderDetailsFeed } from './core/order-details-feed'
import type { OrderDetailsFeedConfig, ContractData } from './config/types'
import { DEFAULT_ORDER_DETAILS_CONFIG, ORDER_DETAILS_PRESETS } from './config/presets'
import { buildOrderDetailsPanelConfig } from './panels/panel-config'
import { MOCK_CONTRACT } from './types'

function setNestedValue<T>(obj: T, path: string, value: unknown): T {
  const keys = path.split('.')
  const result = { ...obj } as Record<string, unknown>
  let current = result

  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = { ...(current[keys[i]] as Record<string, unknown>) }
    current = current[keys[i]] as Record<string, unknown>
  }

  current[keys[keys.length - 1]] = value
  return result as T
}

export default function OrderDetailsActivityFeedPlayground() {
  const [config, setConfig] = useState<OrderDetailsFeedConfig>(DEFAULT_ORDER_DETAILS_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')

  const handleChange = useCallback((event: ControlChangeEvent) => {
    // Special handling for variant mode changes
    if (event.controlId === 'variant.mode') {
      // When variant mode changes, apply the corresponding preset
      const presetMap: Record<string, string> = {
        'minimal': 'minimal',
        'default': 'default'
      }
      const presetId = presetMap[event.value as string]
      if (presetId) {
        const preset = ORDER_DETAILS_PRESETS.find((p) => p.id === presetId)
        if (preset) {
          setConfig(preset.data)
          setActivePresetId(presetId)
          return
        }
      }
    }
    
    // Special handling for individual tab toggles
    if (event.controlId.startsWith('tabs.show')) {
      const tabName = event.controlId.replace('tabs.show', '').toLowerCase() as 'activity' | 'payouts' | 'info'
      setConfig((prev) => {
        const newVisibleTabs = event.value 
          ? [...prev.tabs.visibleTabs, tabName].filter((v, i, a) => a.indexOf(v) === i)
          : prev.tabs.visibleTabs.filter(t => t !== tabName)
        
        return {
          ...prev,
          tabs: {
            ...prev.tabs,
            visibleTabs: newVisibleTabs as any,
            // Ensure defaultTab is still in visible tabs
            defaultTab: newVisibleTabs.includes(prev.tabs.defaultTab) 
              ? prev.tabs.defaultTab 
              : (newVisibleTabs[0] || 'info') as any
          }
        }
      })
    } else {
      setConfig((prev) => setNestedValue(prev, event.controlId, event.value))
    }
    setActivePresetId(null)
  }, [])

  const handlePresetChange = useCallback((presetId: string) => {
    const preset = ORDER_DETAILS_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
    }
  }, [])

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_ORDER_DETAILS_CONFIG)
    setActivePresetId('default')
  }, [])

  const panelConfig = useMemo(
    () => buildOrderDetailsPanelConfig(config, ORDER_DETAILS_PRESETS, activePresetId),
    [config, activePresetId]
  )

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Control Panel */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleChange}
        onPresetChange={handlePresetChange}
        onReset={handleReset}
        getConfigForCopy={() => config}
      />

      {/* Preview Area */}
      <div className="h-full overflow-y-auto bg-primary p-8 pr-[352px]">
        <div className="flex min-h-full items-center justify-center">
          <OrderDetailsFeed config={config} contract={MOCK_CONTRACT} />
        </div>
      </div>
    </div>
  )
}