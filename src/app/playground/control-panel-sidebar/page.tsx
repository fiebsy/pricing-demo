'use client'

/**
 * Control Panel Sidebar Experiment
 *
 * Testing the sidebar navigation variant that fans out on hover.
 * Comparing UX between tab-based and sidebar-based navigation.
 */

import { useCallback, useMemo, useState } from 'react'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
  type PanelConfig,
} from '@/components/ui/patterns/control-panel'
import { InlineSlider } from '@/components/ui/core/primitives'
import { cn } from '@/lib/utils'

// Sample configuration for testing
interface DemoConfig {
  layout: {
    columns: number
    gap: number
    padding: number
  }
  appearance: {
    background: string
    borderRadius: number
    shadow: string
  }
  typography: {
    fontSize: number
    fontWeight: string
    lineHeight: number
  }
  animation: {
    duration: number
    easing: string
    delay: number
  }
  debug: {
    showGrid: boolean
    showBorders: boolean
    highlightHover: boolean
  }
}

const DEFAULT_CONFIG: DemoConfig = {
  layout: {
    columns: 3,
    gap: 16,
    padding: 24,
  },
  appearance: {
    background: 'primary',
    borderRadius: 12,
    shadow: 'md',
  },
  typography: {
    fontSize: 14,
    fontWeight: 'medium',
    lineHeight: 1.5,
  },
  animation: {
    duration: 200,
    easing: 'ease-out',
    delay: 0,
  },
  debug: {
    showGrid: false,
    showBorders: false,
    highlightHover: false,
  },
}

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

function buildPanelConfig(config: DemoConfig): PanelConfig {
  return {
    sections: [
      {
        id: 'layout',
        label: 'Layout',
        title: 'Layout',
        groups: [
          {
            title: 'Grid configuration',
            controls: [
              {
                id: 'layout.columns',
                type: 'inline-slider',
                label: 'Columns',
                value: config.layout.columns,
                min: 1,
                max: 6,
                step: 1,
              },
              {
                id: 'layout.gap',
                type: 'inline-slider',
                label: 'Gap',
                value: config.layout.gap,
                min: 0,
                max: 48,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'layout.padding',
                type: 'inline-slider',
                label: 'Padding',
                value: config.layout.padding,
                min: 0,
                max: 64,
                step: 8,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
        ],
      },
      {
        id: 'appearance',
        label: 'Appearance',
        title: 'Appearance',
        groups: [
          {
            title: 'Visual style',
            controls: [
              {
                id: 'appearance.background',
                type: 'select',
                label: 'Background',
                value: config.appearance.background,
                options: [
                  { label: 'Primary', value: 'primary' },
                  { label: 'Secondary', value: 'secondary' },
                  { label: 'Tertiary', value: 'tertiary' },
                ],
              },
              {
                id: 'appearance.borderRadius',
                type: 'inline-slider',
                label: 'Border radius',
                value: config.appearance.borderRadius,
                min: 0,
                max: 32,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'appearance.shadow',
                type: 'select',
                label: 'Shadow',
                value: config.appearance.shadow,
                options: [
                  { label: 'None', value: 'none' },
                  { label: 'Small', value: 'sm' },
                  { label: 'Medium', value: 'md' },
                  { label: 'Large', value: 'lg' },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'typography',
        label: 'Typography',
        title: 'Typography',
        groups: [
          {
            title: 'Text styles',
            controls: [
              {
                id: 'typography.fontSize',
                type: 'inline-slider',
                label: 'Font size',
                value: config.typography.fontSize,
                min: 10,
                max: 24,
                step: 1,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'typography.fontWeight',
                type: 'select',
                label: 'Font weight',
                value: config.typography.fontWeight,
                options: [
                  { label: 'Regular', value: 'regular' },
                  { label: 'Medium', value: 'medium' },
                  { label: 'Semibold', value: 'semibold' },
                  { label: 'Bold', value: 'bold' },
                ],
              },
              {
                id: 'typography.lineHeight',
                type: 'inline-slider',
                label: 'Line height',
                value: config.typography.lineHeight,
                min: 1,
                max: 2,
                step: 0.1,
                formatLabel: (v: number) => v.toFixed(1),
              },
            ],
          },
        ],
      },
      {
        id: 'animation',
        label: 'Animation',
        title: 'Animation',
        groups: [
          {
            title: 'Timing',
            controls: [
              {
                id: 'animation.duration',
                type: 'inline-slider',
                label: 'Duration',
                value: config.animation.duration,
                min: 0,
                max: 1000,
                step: 50,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'animation.easing',
                type: 'select',
                label: 'Easing',
                value: config.animation.easing,
                options: [
                  { label: 'Linear', value: 'linear' },
                  { label: 'Ease', value: 'ease' },
                  { label: 'Ease in', value: 'ease-in' },
                  { label: 'Ease out', value: 'ease-out' },
                  { label: 'Ease in out', value: 'ease-in-out' },
                ],
              },
              {
                id: 'animation.delay',
                type: 'inline-slider',
                label: 'Delay',
                value: config.animation.delay,
                min: 0,
                max: 500,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
            ],
          },
        ],
      },
      {
        id: 'debug',
        label: 'Debug',
        title: 'Debug',
        groups: [
          {
            title: 'Visual debugging',
            controls: [
              {
                id: 'debug.showGrid',
                type: 'toggle',
                label: 'Show grid',
                value: config.debug.showGrid,
              },
              {
                id: 'debug.showBorders',
                type: 'toggle',
                label: 'Show borders',
                value: config.debug.showBorders,
              },
              {
                id: 'debug.highlightHover',
                type: 'toggle',
                label: 'Highlight on hover',
                value: config.debug.highlightHover,
              },
            ],
          },
        ],
      },
      // Additional sections to test scroll behavior
      {
        id: 'spacing',
        label: 'Spacing',
        title: 'Spacing',
        groups: [
          {
            title: 'Margins',
            controls: [
              {
                id: 'spacing.marginTop',
                type: 'inline-slider',
                label: 'Margin top',
                value: 16,
                min: 0,
                max: 64,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'spacing.marginBottom',
                type: 'inline-slider',
                label: 'Margin bottom',
                value: 16,
                min: 0,
                max: 64,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
        ],
      },
      {
        id: 'colors',
        label: 'Colors',
        title: 'Colors',
        groups: [
          {
            title: 'Color scheme',
            controls: [
              {
                id: 'colors.primary',
                type: 'select',
                label: 'Primary color',
                value: 'blue',
                options: [
                  { label: 'Blue', value: 'blue' },
                  { label: 'Green', value: 'green' },
                  { label: 'Purple', value: 'purple' },
                ],
              },
              {
                id: 'colors.accent',
                type: 'select',
                label: 'Accent color',
                value: 'orange',
                options: [
                  { label: 'Orange', value: 'orange' },
                  { label: 'Pink', value: 'pink' },
                  { label: 'Teal', value: 'teal' },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'effects',
        label: 'Effects',
        title: 'Effects',
        groups: [
          {
            title: 'Visual effects',
            controls: [
              {
                id: 'effects.blur',
                type: 'inline-slider',
                label: 'Blur',
                value: 0,
                min: 0,
                max: 20,
                step: 1,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'effects.opacity',
                type: 'inline-slider',
                label: 'Opacity',
                value: 100,
                min: 0,
                max: 100,
                step: 5,
                formatLabel: (v: number) => `${v}%`,
              },
            ],
          },
        ],
      },
      {
        id: 'advanced',
        label: 'Advanced',
        title: 'Advanced',
        groups: [
          {
            title: 'Advanced settings',
            controls: [
              {
                id: 'advanced.zIndex',
                type: 'inline-slider',
                label: 'Z-index',
                value: 1,
                min: 0,
                max: 100,
                step: 1,
              },
              {
                id: 'advanced.overflow',
                type: 'select',
                label: 'Overflow',
                value: 'visible',
                options: [
                  { label: 'Visible', value: 'visible' },
                  { label: 'Hidden', value: 'hidden' },
                  { label: 'Scroll', value: 'scroll' },
                  { label: 'Auto', value: 'auto' },
                ],
              },
            ],
          },
        ],
      },
    ],
    title: 'Control panel',
    showReset: true,
    resetLabel: 'Reset',
  }
}

export default function ControlPanelSidebarPlayground() {
  const [config, setConfig] = useState<DemoConfig>(DEFAULT_CONFIG)
  const [careerValue, setCareerValue] = useState(68)

  const handleChange = useCallback((event: ControlChangeEvent) => {
    setConfig((prev) => setNestedValue(prev, event.controlId, event.value))
  }, [])

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG)
  }, [])

  const panelConfig = useMemo(() => buildPanelConfig(config), [config])

  // Generate shadow class
  const shadowClass = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  }[config.appearance.shadow]

  // Generate background class
  const bgClass = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary',
  }[config.appearance.background]

  return (
    <div className="relative min-h-screen bg-secondary">
      {/* Control Panel */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleChange}
        onReset={handleReset}
        getConfigForCopy={() => config}
      />

      {/* Preview Area */}
      <div className="flex h-screen flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-primary bg-primary px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-primary">
              Sidebar Navigation Experiment
            </h1>
            <p className="text-sm text-secondary">
              Hover over the sidebar to see section labels fan out
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-tertiary">
            <span className="rounded bg-secondary px-2 py-1">
              {config.layout.columns} cols
            </span>
            <span className="rounded bg-secondary px-2 py-1">
              {config.layout.gap}px gap
            </span>
          </div>
        </div>

        {/* Preview Grid */}
        <div className="flex-1 overflow-auto p-8">
          <div
            className="mx-auto max-w-4xl"
            style={{ padding: config.layout.padding }}
          >
            {/* Inline Slider Demo */}
            <div className="mb-8 space-y-3">
              <h3 className="text-sm font-medium text-secondary">Inline Slider Demo</h3>
              <div className="max-w-sm space-y-2">
                <InlineSlider
                  label="Career"
                  value={careerValue}
                  min={0}
                  max={100}
                  onChange={setCareerValue}
                />
                <InlineSlider
                  label="Progress"
                  value={42}
                  min={0}
                  max={100}
                  onChange={() => {}}
                />
                <InlineSlider
                  label="Volume"
                  value={75}
                  min={0}
                  max={100}
                  onChange={() => {}}
                  formatLabel={(v) => `${v}%`}
                />
              </div>
            </div>

            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${config.layout.columns}, 1fr)`,
                gap: config.layout.gap,
              }}
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex aspect-square items-center justify-center transition-all',
                    bgClass,
                    shadowClass,
                    config.debug.showBorders && 'border-2 border-dashed border-brand-primary',
                    config.debug.highlightHover && 'hover:ring-2 hover:ring-brand-primary'
                  )}
                  style={{
                    borderRadius: config.appearance.borderRadius,
                    fontSize: config.typography.fontSize,
                    lineHeight: config.typography.lineHeight,
                    transitionDuration: `${config.animation.duration}ms`,
                    transitionTimingFunction: config.animation.easing,
                    transitionDelay: `${config.animation.delay}ms`,
                  }}
                >
                  <span
                    className={cn(
                      'text-primary',
                      config.typography.fontWeight === 'regular' && 'font-normal',
                      config.typography.fontWeight === 'medium' && 'font-medium',
                      config.typography.fontWeight === 'semibold' && 'font-semibold',
                      config.typography.fontWeight === 'bold' && 'font-bold'
                    )}
                  >
                    Item {i + 1}
                  </span>
                </div>
              ))}
            </div>

            {/* Debug grid overlay */}
            {config.debug.showGrid && (
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
