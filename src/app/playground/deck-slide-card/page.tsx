'use client'

/**
 * Deck Slide Card Playground
 *
 * Core component: ./core/deck-slide-card.tsx
 * Migration target: src/components/ui/features/deck-slide-card
 */

import { useCallback, useMemo, useState } from 'react'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/prod/base/control-panel'

import { DeckSlideCard } from './core/deck-slide-card'
import type { DeckSlideCardConfig } from './config/types'
import { DEFAULT_DECK_SLIDE_CARD_CONFIG, DECK_SLIDE_CARD_PRESETS } from './config/presets'
import { buildDeckSlideCardPanelConfig } from './panels/panel-config'
import { cn } from '@/lib/utils'

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

// Sample cards for grid display
const SAMPLE_CARDS = [
  {
    type: 'stat' as const,
    value: '$250B → $480B',
    label: 'Creator economy growth by 2027',
    subtext: '',
  },
  {
    type: 'stat' as const,
    value: '10x',
    label: 'Faster processing',
    subtext: 'vs traditional methods',
  },
  {
    type: 'stat' as const,
    value: '99.99%',
    label: 'Uptime SLA',
    subtext: 'Enterprise grade',
  },
]

export default function DeckSlideCardPlayground() {
  const [config, setConfig] = useState<DeckSlideCardConfig>(DEFAULT_DECK_SLIDE_CARD_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [showGrid, setShowGrid] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)

  const handleChange = useCallback((event: ControlChangeEvent) => {
    setConfig((prev) => setNestedValue(prev, event.controlId, event.value))
    setActivePresetId(null)
  }, [])

  const handlePresetChange = useCallback((presetId: string) => {
    const preset = DECK_SLIDE_CARD_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
    }
  }, [])

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_DECK_SLIDE_CARD_CONFIG)
    setActivePresetId('default')
  }, [])

  const handleExportPDF = useCallback(async () => {
    if (isExporting) return
    
    setIsExporting(true)
    setExportError(null)

    try {
      const response = await fetch('/api/payva-deck/export-pdf')

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Export failed')
      }

      // Get the PDF blob and trigger download
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      // Extract filename from header or use default
      const contentDisposition = response.headers.get('Content-Disposition')
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/)
      const filename = filenameMatch?.[1] || 'Deck-Slide-Card-Test.pdf'

      // Create download link and click it
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('PDF export failed:', error)
      setExportError(error instanceof Error ? error.message : 'Export failed')
    } finally {
      setIsExporting(false)
    }
  }, [isExporting])

  const panelConfig = useMemo(
    () => buildDeckSlideCardPanelConfig(config, DECK_SLIDE_CARD_PRESETS, activePresetId),
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
      <div 
        className={cn(
          "flex h-full",
          config.export.printOptimized && "pdf-export-mode",
          config.export.forceLight && "force-light-mode"
        )}
      >
        <div className="flex-1 flex flex-col">
          {/* Action Bar */}
          <div className="flex items-center justify-between px-6 py-3 bg-secondary border-b border-primary">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-md transition-colors",
                  showGrid
                    ? "bg-tertiary text-primary"
                    : "bg-primary text-secondary hover:bg-secondary"
                )}
              >
                {showGrid ? 'Single Card' : 'Grid View'}
              </button>
              
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-md transition-colors",
                  "bg-brand-primary text-brand hover:bg-brand-secondary",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {isExporting ? 'Exporting...' : 'Export PDF Test'}
              </button>
            </div>
            
            {exportError && (
              <span className="text-sm text-error">{exportError}</span>
            )}
            
            <div className="text-xs text-tertiary">
              Preview Mode: {config.export.printOptimized ? 'Print' : 'Browser'}
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 flex items-center justify-center bg-primary p-8 overflow-auto">
            {showGrid ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
                {SAMPLE_CARDS.map((sample, index) => (
                  <DeckSlideCard
                    key={index}
                    config={{
                      ...config,
                      content: {
                        ...config.content,
                        type: 'stat',
                        statValue: sample.value,
                        statLabel: sample.label,
                        statSubtext: sample.subtext,
                      },
                    }}
                  />
                ))}
                <DeckSlideCard config={{ ...config, content: { ...config.content, type: 'bullet' } }} />
                <DeckSlideCard config={{ ...config, content: { ...config.content, type: 'team' } }} />
                <DeckSlideCard config={{ ...config, content: { ...config.content, type: 'chart' } }} />
              </div>
            ) : (
              <DeckSlideCard config={config} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}