'use client'

/**
 * Control Panel Sidebar - Enhanced Playground
 *
 * Demonstrates the new UnifiedControlPanel framework enhancements:
 * - Builder functions for rapid section creation
 * - Design token constants (colors, typography, radius, shine, animation)
 * - Section icons via sectionType automatic mapping
 * - Enhanced visual controls (font-weight, color-enhanced, radius-preview)
 */

import { useCallback, useMemo, useState } from 'react'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
  type PanelConfig,
  type Section,
  // Builders
  createTypographySection,
  createColorsSection,
  createBorderRadiusSection,
  createShineSection,
  createAnimationSection,
  createSpacingSection,
  // Tokens
  getShineClassName,
  getRadiusClassName,
  getFontWeight,
  getEasingCssValue,
  getDurationSeconds,
  getSpacingPixels,
} from '@/components/ui/patterns/control-panel'
import { InlineSlider, TickSlider } from '@/components/ui/core/primitives'
import { cn } from '@/lib/utils'

// =============================================================================
// Config Types
// =============================================================================

interface DemoConfig {
  // Typography
  fontWeight: string
  fontSize: string
  lineHeight: string
  letterSpacing: string
  // Colors
  textColor: string
  bgColor: string
  borderColor: string
  // Border Radius
  borderRadius: string
  // Shine & Effects
  shinePreset: string
  shineIntensity: 'subtle' | 'normal' | 'intense'
  shadow: string
  // Animation
  easing: string
  duration: string
  delay: string
  // Spacing
  gap: string
  padding: string
  // Layout (manual section)
  columns: number
  // Debug (manual section)
  showGrid: boolean
  showBorders: boolean
  highlightHover: boolean
  // Sidebar corners
  cornerSize: number
  cornerRadius: number
  cornerSquircle: boolean
}

const DEFAULT_CONFIG: DemoConfig = {
  // Typography
  fontWeight: '500',
  fontSize: 'md',
  lineHeight: 'normal',
  letterSpacing: 'normal',
  // Colors
  textColor: 'primary',
  bgColor: 'primary',
  borderColor: 'primary',
  // Border Radius
  borderRadius: 'lg',
  // Shine
  shinePreset: '2',
  shineIntensity: 'subtle',
  shadow: 'md',
  // Animation
  easing: 'expo-out',
  duration: '200',
  delay: '0',
  // Spacing
  gap: '4',
  padding: '6',
  // Layout
  columns: 3,
  // Debug
  showGrid: false,
  showBorders: false,
  highlightHover: false,
  // Sidebar corners
  cornerSize: 30,
  cornerRadius: 20,
  cornerSquircle: false,
}

// =============================================================================
// Helper Functions
// =============================================================================

function setNestedValue<T>(obj: T, path: string, value: unknown): T {
  // Handle simple key (no dot notation)
  if (!path.includes('.')) {
    return { ...obj, [path]: value } as T
  }
  
  // Handle nested path
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

// =============================================================================
// Panel Config Builder
// =============================================================================

function buildPanelConfig(config: DemoConfig): PanelConfig {
  // Use builder functions for standard sections
  const typographySection = createTypographySection({
    values: {
      fontWeight: config.fontWeight,
      fontSize: config.fontSize,
      lineHeight: config.lineHeight,
      letterSpacing: config.letterSpacing,
    },
    options: {
      useCommonWeights: true,
    },
  })

  const colorsSection = createColorsSection({
    values: {
      textColor: config.textColor,
      bgColor: config.bgColor,
      borderColor: config.borderColor,
    },
  })

  const radiusSection = createBorderRadiusSection({
    values: {
      borderRadius: config.borderRadius,
    },
    options: {
      useCommonOptions: true,
    },
  })

  const shineSection = createShineSection({
    values: {
      shinePreset: config.shinePreset,
      shineIntensity: config.shineIntensity,
      shadow: config.shadow,
    },
  })

  const animationSection = createAnimationSection({
    values: {
      easing: config.easing,
      duration: config.duration,
      delay: config.delay,
    },
    options: {
      useCommonEasings: true,
    },
  })

  const spacingSection = createSpacingSection({
    values: {
      gap: config.gap,
      padding: config.padding,
    },
    options: {
      include: ['gap', 'padding'],
    },
  })

  // Manual sections for sidebar corners and debug
  const sidebarSection: Section = {
    id: 'sidebar',
    label: 'Sidebar',
    title: 'Sidebar Corners',
    sectionType: 'settings',
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
          {
            id: 'cornerSquircle',
            type: 'toggle',
            label: 'Corner squircle',
            value: config.cornerSquircle,
          },
        ],
      },
    ],
  }

  const layoutSection: Section = {
    id: 'layout',
    label: 'Layout',
    title: 'Layout',
    sectionType: 'layout',
    groups: [
      {
        title: 'Grid configuration',
        controls: [
          {
            id: 'columns',
            type: 'inline-slider',
            label: 'Columns',
            value: config.columns,
            min: 1,
            max: 6,
            step: 1,
          },
        ],
      },
    ],
  }

  const debugSection: Section = {
    id: 'debug',
    label: 'Debug',
    title: 'Debug',
    sectionType: 'debug',
    groups: [
      {
        title: 'Visual debugging',
        controls: [
          {
            id: 'showGrid',
            type: 'toggle',
            label: 'Show grid',
            value: config.showGrid,
          },
          {
            id: 'showBorders',
            type: 'toggle',
            label: 'Show borders',
            value: config.showBorders,
          },
          {
            id: 'highlightHover',
            type: 'toggle',
            label: 'Highlight on hover',
            value: config.highlightHover,
          },
        ],
      },
    ],
  }

  return {
    sections: [
      sidebarSection,
      layoutSection,
      typographySection,
      colorsSection,
      radiusSection,
      shineSection,
      animationSection,
      spacingSection,
      debugSection,
    ],
    title: 'Control panel',
    showReset: true,
    resetLabel: 'Reset',
  }
}

// =============================================================================
// Main Component
// =============================================================================

export default function ControlPanelSidebarPlayground() {
  const [config, setConfig] = useState<DemoConfig>(DEFAULT_CONFIG)
  const [careerValue, setCareerValue] = useState(68)
  const [tickValues, setTickValues] = useState({ width: 1, columns: 3, quality: 2, blur: 0 })

  const handleChange = useCallback((event: ControlChangeEvent) => {
    setConfig((prev) => setNestedValue(prev, event.controlId, event.value))
  }, [])

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG)
  }, [])

  const panelConfig = useMemo(() => buildPanelConfig(config), [config])

  // Derive styles from config using token utilities
  const shineClass = getShineClassName(config.shinePreset, config.shineIntensity)
  const radiusClass = getRadiusClassName(config.borderRadius)
  const fontWeight = getFontWeight(config.fontWeight)
  const easingCss = getEasingCssValue(config.easing)
  const durationSec = getDurationSeconds(config.duration)
  const gapPx = getSpacingPixels(config.gap)
  const paddingPx = getSpacingPixels(config.padding)

  // Shadow class from shadow value
  const shadowClass = config.shadow !== 'none' ? `shadow-${config.shadow}` : ''

  // Background class from bgColor
  const bgClass = `bg-${config.bgColor}`

  // Text class from textColor
  const textClass = `text-${config.textColor}`

  // Border class from borderColor
  const borderClass = `border-${config.borderColor}`

  return (
    <div className="relative min-h-screen bg-secondary">
      {/* Control Panel */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleChange}
        onReset={handleReset}
        getConfigForCopy={() => config}
        cornerSize={config.cornerSize}
        cornerRadius={config.cornerRadius}
        cornerSquircle={config.cornerSquircle}
      />

      {/* Preview Area */}
      <div className="flex h-screen flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-primary bg-primary px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-primary">
              Enhanced Control Panel Demo
            </h1>
            <p className="text-sm text-secondary">
              Demonstrating builders, tokens, icons, and enhanced controls
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-tertiary">
            <span className="rounded bg-secondary px-2 py-1">
              {config.columns} cols
            </span>
            <span className="rounded bg-secondary px-2 py-1">
              {gapPx}px gap
            </span>
            <span className="rounded bg-secondary px-2 py-1">
              {shineClass || 'no shine'}
            </span>
          </div>
        </div>

        {/* Preview Grid */}
        <div className="flex-1 overflow-auto p-8">
          <div
            className="mx-auto max-w-4xl"
            style={{ padding: paddingPx }}
          >
            {/* Config Summary */}
            <div className="mb-6 rounded-lg bg-tertiary p-4 text-xs">
              <h3 className="mb-2 font-medium text-secondary">Active Configuration</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-tertiary md:grid-cols-4">
                <div><span className="text-quaternary">Font:</span> {config.fontWeight} / {config.fontSize}</div>
                <div><span className="text-quaternary">Radius:</span> {radiusClass}</div>
                <div><span className="text-quaternary">Shine:</span> {shineClass || 'none'}</div>
                <div><span className="text-quaternary">Easing:</span> {config.easing}</div>
                <div><span className="text-quaternary">Duration:</span> {durationSec}s</div>
                <div><span className="text-quaternary">Gap:</span> {gapPx}px</div>
                <div><span className="text-quaternary">Padding:</span> {paddingPx}px</div>
                <div><span className="text-quaternary">Text:</span> {config.textColor}</div>
              </div>
            </div>

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

            {/* Tick Slider Demo */}
            <div className="mb-8 space-y-3">
              <h3 className="text-sm font-medium text-secondary">Tick Slider Demo</h3>
              <div className="max-w-sm space-y-2">
                <TickSlider
                  label="Width"
                  value={tickValues.width}
                  min={1}
                  max={6}
                  step={1}
                  onChange={(v) => setTickValues((prev) => ({ ...prev, width: v }))}
                />
                <TickSlider
                  label="Columns"
                  value={tickValues.columns}
                  min={1}
                  max={6}
                  step={1}
                  onChange={(v) => setTickValues((prev) => ({ ...prev, columns: v }))}
                />
                <TickSlider
                  label="Quality"
                  value={tickValues.quality}
                  min={0}
                  max={5}
                  step={1}
                  onChange={(v) => setTickValues((prev) => ({ ...prev, quality: v }))}
                />
                <TickSlider
                  label="Blur"
                  value={tickValues.blur}
                  min={0}
                  max={8}
                  step={1}
                  onChange={(v) => setTickValues((prev) => ({ ...prev, blur: v }))}
                  formatLabel={(v) => `${v}px`}
                />
              </div>
            </div>

            {/* Grid Preview */}
            <div className="mb-8 space-y-3">
              <h3 className="text-sm font-medium text-secondary">Grid Preview (with applied styles)</h3>
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${config.columns}, 1fr)`,
                  gap: gapPx,
                }}
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex aspect-square items-center justify-center border',
                      bgClass,
                      borderClass,
                      shadowClass,
                      shineClass,
                      radiusClass,
                      config.showBorders && 'border-2 border-dashed border-brand-primary',
                      config.highlightHover && 'hover:ring-2 hover:ring-brand-primary'
                    )}
                    style={{
                      fontWeight,
                      transitionDuration: `${durationSec}s`,
                      transitionTimingFunction: easingCss,
                    }}
                  >
                    <span className={cn(textClass)}>
                      Item {i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Debug grid overlay */}
            {config.showGrid && (
              <div
                className="pointer-events-none fixed inset-0 z-50"
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
