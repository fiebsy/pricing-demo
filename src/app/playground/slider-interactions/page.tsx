'use client'

/**
 * Slider Interactions Playground
 *
 * Focused testing environment for InlineSlider interaction behaviors:
 * - Mark shrink/fade on drag
 * - Fill area behavior during drag
 * - Label and input states during interaction
 */

import { useState } from 'react'
import { InlineSlider, TickSlider } from '@/components/ui/core/primitives'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
  type PanelConfig,
} from '@/components/ui/patterns/control-panel'

interface SliderDemoConfig {
  cornerSize: number
  cornerRadius: number
  opacity: number
  borderRadius: number
  blur: number
  volume: number
  duration: number
  progress: number
  fontSize: number
  gap: number
  padding: number
  lineHeight: number
  columns: number
  width: number
  quality: number
}

const DEFAULT_CONFIG: SliderDemoConfig = {
  cornerSize: 30,
  cornerRadius: 20,
  opacity: 85,
  borderRadius: 12,
  blur: 0,
  volume: 75,
  duration: 200,
  progress: 42,
  fontSize: 14,
  gap: 16,
  padding: 24,
  lineHeight: 1.5,
  columns: 3,
  width: 1,
  quality: 2,
}

function buildPanelConfig(config: SliderDemoConfig): PanelConfig {
  return {
    title: 'Slider Interactions',
    showReset: true,
    resetLabel: 'Reset',
    sections: [
      {
        id: 'sidebar',
        label: 'Sidebar',
        title: 'Sidebar corners',
        groups: [
          {
            title: 'Inverse corners',
            controls: [
              {
                id: 'cornerSize',
                type: 'inline-slider',
                label: 'Corner size',
                value: config.cornerSize,
                min: 8,
                max: 80,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'cornerRadius',
                type: 'inline-slider',
                label: 'Corner radius',
                value: config.cornerRadius,
                min: 2,
                max: 400,
                step: 1,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
        ],
      },
      {
        id: 'sliders',
        label: 'Sliders',
        title: 'Slider values',
        groups: [
          {
            title: 'All slider controls',
            description: 'Interact with these to test mark shrink behavior',
            controls: [
              {
                id: 'opacity',
                type: 'inline-slider',
                label: 'Opacity',
                value: config.opacity,
                min: 0,
                max: 100,
                step: 5,
                formatLabel: (v: number) => `${v}%`,
              },
              {
                id: 'borderRadius',
                type: 'inline-slider',
                label: 'Border radius',
                value: config.borderRadius,
                min: 0,
                max: 32,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'blur',
                type: 'inline-slider',
                label: 'Blur',
                value: config.blur,
                min: 0,
                max: 20,
                step: 1,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'volume',
                type: 'inline-slider',
                label: 'Volume',
                value: config.volume,
                min: 0,
                max: 100,
                step: 1,
                formatLabel: (v: number) => `${v}%`,
              },
              {
                id: 'duration',
                type: 'inline-slider',
                label: 'Duration',
                value: config.duration,
                min: 0,
                max: 1000,
                step: 50,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'progress',
                type: 'inline-slider',
                label: 'Progress',
                value: config.progress,
                min: 0,
                max: 100,
                step: 1,
                formatLabel: (v: number) => `${v}%`,
              },
              {
                id: 'fontSize',
                type: 'inline-slider',
                label: 'Font size',
                value: config.fontSize,
                min: 10,
                max: 32,
                step: 1,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'gap',
                type: 'inline-slider',
                label: 'Gap',
                value: config.gap,
                min: 0,
                max: 48,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'padding',
                type: 'inline-slider',
                label: 'Padding',
                value: config.padding,
                min: 0,
                max: 64,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'lineHeight',
                type: 'inline-slider',
                label: 'Line height',
                value: config.lineHeight,
                min: 1,
                max: 2.5,
                step: 0.1,
                formatLabel: (v: number) => v.toFixed(1),
              },
            ],
          },
        ],
      },
    ],
  }
}

export default function SliderInteractionsPlayground() {
  const [config, setConfig] = useState(DEFAULT_CONFIG)

  const handleChange = (event: ControlChangeEvent) => {
    setConfig((prev) => ({
      ...prev,
      [event.controlId]: event.value,
    }))
  }

  const handleReset = () => setConfig(DEFAULT_CONFIG)

  const panelConfig = buildPanelConfig(config)

  return (
    <div className="relative min-h-screen bg-secondary">
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleChange}
        onReset={handleReset}
        getConfigForCopy={() => config}
        cornerSize={config.cornerSize}
        cornerRadius={config.cornerRadius}
      />

      {/* Preview area */}
      <div className="flex min-h-screen items-center justify-center p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-lg font-semibold text-primary">
              Slider Interactions
            </h1>
            <p className="mt-1 text-sm text-secondary">
              Drag any slider — the mark shrinks and fades on drag start.
            </p>
          </div>

          {/* Tick slider showcase */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xs font-medium uppercase tracking-wider text-tertiary">
                Tick sliders (≤ 10 steps)
              </h3>
              <div className="space-y-1.5">
                <TickSlider
                  label="Width"
                  value={config.width}
                  min={1}
                  max={6}
                  step={1}
                  onChange={(v) =>
                    setConfig((prev) => ({ ...prev, width: v }))
                  }
                />
                <TickSlider
                  label="Columns"
                  value={config.columns}
                  min={1}
                  max={6}
                  step={1}
                  onChange={(v) =>
                    setConfig((prev) => ({ ...prev, columns: v }))
                  }
                />
                <TickSlider
                  label="Quality"
                  value={config.quality}
                  min={0}
                  max={5}
                  step={1}
                  onChange={(v) =>
                    setConfig((prev) => ({ ...prev, quality: v }))
                  }
                />
                <TickSlider
                  label="Blur"
                  value={config.blur}
                  min={0}
                  max={8}
                  step={1}
                  onChange={(v) =>
                    setConfig((prev) => ({ ...prev, blur: v }))
                  }
                  formatLabel={(v) => `${v}px`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-medium uppercase tracking-wider text-tertiary">
                Inline sliders (continuous)
              </h3>
              <div className="space-y-1.5">
                <InlineSlider
                  label="Volume"
                  value={config.volume}
                  min={0}
                  max={100}
                  onChange={(v) =>
                    setConfig((prev) => ({ ...prev, volume: v }))
                  }
                  formatLabel={(v) => `${v}%`}
                />
                <InlineSlider
                  label="Opacity"
                  value={config.opacity}
                  min={0}
                  max={100}
                  step={5}
                  onChange={(v) =>
                    setConfig((prev) => ({ ...prev, opacity: v }))
                  }
                  formatLabel={(v) => `${v}%`}
                />
                <InlineSlider
                  label="Duration"
                  value={config.duration}
                  min={0}
                  max={1000}
                  step={50}
                  onChange={(v) =>
                    setConfig((prev) => ({ ...prev, duration: v }))
                  }
                  formatLabel={(v) => `${v}ms`}
                />
                <InlineSlider
                  label="Border radius"
                  value={config.borderRadius}
                  min={0}
                  max={32}
                  step={2}
                  onChange={(v) =>
                    setConfig((prev) => ({ ...prev, borderRadius: v }))
                  }
                  formatLabel={(v) => `${v}px`}
                />
                <InlineSlider
                  label="Font size"
                  value={config.fontSize}
                  min={10}
                  max={32}
                  step={1}
                  onChange={(v) =>
                    setConfig((prev) => ({ ...prev, fontSize: v }))
                  }
                  formatLabel={(v) => `${v}px`}
                />
              </div>
            </div>

            {/* Live preview box */}
            <div className="space-y-2">
              <h3 className="text-xs font-medium uppercase tracking-wider text-tertiary">
                Live preview
              </h3>
              <div
                className="flex aspect-video items-center justify-center bg-tertiary transition-all duration-200"
                style={{
                  borderRadius: config.borderRadius,
                  opacity: config.opacity / 100,
                  filter: config.blur > 0 ? `blur(${config.blur}px)` : undefined,
                  fontSize: config.fontSize,
                  padding: config.padding,
                  gap: config.gap,
                  lineHeight: config.lineHeight,
                }}
              >
                <span className="text-secondary">
                  Preview area
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
