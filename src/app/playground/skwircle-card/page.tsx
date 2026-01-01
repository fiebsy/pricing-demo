/**
 * Skwircle Card Playground
 *
 * Interactive experimentation space for showcase card components.
 * Features a unified control panel for real-time customization.
 */

'use client'

import { useCallback, useMemo, useState, useRef, useLayoutEffect } from 'react'
import Link from 'next/link'
import { HugeIcon } from '@/components/ui/icon/huge-icons/huge-icons'
import ArrowLeft01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowLeft01Icon'
import { Skwircle } from '@/components/ui/skwircle/skwircle'
import type { SkwircleBackgroundGradient, SkwircleRoundness, SkwircleElevation } from '@/components/ui/skwircle/types'
import { generateSkwirclePath } from '@/components/ui/skwircle/utils/path-generator'
import { ROUNDNESS_CONFIGS } from '@/components/ui/skwircle/config/roundness'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
  type UnifiedControlPanelConfig,
  type ControlSection,
} from '@/components/ui/controls/unified-control-panel'

// =============================================================================
// TYPES
// =============================================================================

type DepthIntensity = 'none' | '3' | '5' | '10' | '15' | '20' | '25' | '30'
type DepthDirection = 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left' | 'top-left'
type AspectRatio = '4/3' | '16/9' | '3/2' | '1/1' | 'auto'
type FooterStyle = 'dark' | 'light' | 'brand' | 'gradient'

interface ShowcaseCardConfig {
  // Card container
  roundness: SkwircleRoundness
  elevation: SkwircleElevation
  borderWidth: number

  // Depth gradient
  depthIntensity: DepthIntensity
  depthDirection: DepthDirection

  // Preview area
  previewAspectRatio: AspectRatio
  previewBackground: string
  previewPadding: number

  // Footer
  footerStyle: FooterStyle
  footerTitle: string
  footerSubtitle: string
  footerPaddingX: number
  footerPaddingY: number

  // Card dimensions
  cardWidth: number
}

// =============================================================================
// CONSTANTS
// =============================================================================

const DEFAULT_CONFIG: ShowcaseCardConfig = {
  roundness: 'rounded',
  elevation: 'sm',
  borderWidth: 0,
  depthIntensity: 'none',
  depthDirection: 'bottom-right',
  previewAspectRatio: '4/3',
  previewBackground: '#ffffff',
  previewPadding: 24,
  footerStyle: 'dark',
  footerTitle: 'Shared Tooltip',
  footerSubtitle: 'Dec 2025',
  footerPaddingX: 20,
  footerPaddingY: 16,
  cardWidth: 400,
}

const ROUNDNESS_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Subtle', value: 'subtle' },
  { label: 'Moderate', value: 'moderate' },
  { label: 'Rounded', value: 'rounded' },
  { label: 'Pill', value: 'pill' },
]

const ELEVATION_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'XS', value: 'xs' },
  { label: 'SM', value: 'sm' },
]

const DEPTH_INTENSITY_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: '3%', value: '3' },
  { label: '5%', value: '5' },
  { label: '10%', value: '10' },
  { label: '15%', value: '15' },
  { label: '20%', value: '20' },
  { label: '25%', value: '25' },
  { label: '30%', value: '30' },
]

const DEPTH_DIRECTION_OPTIONS = [
  { label: 'Top', value: 'top' },
  { label: 'Top Right', value: 'top-right' },
  { label: 'Right', value: 'right' },
  { label: 'Bottom Right', value: 'bottom-right' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Bottom Left', value: 'bottom-left' },
  { label: 'Left', value: 'left' },
  { label: 'Top Left', value: 'top-left' },
]

const ASPECT_RATIO_OPTIONS = [
  { label: '4:3', value: '4/3' },
  { label: '16:9', value: '16/9' },
  { label: '3:2', value: '3/2' },
  { label: '1:1 (Square)', value: '1/1' },
  { label: 'Auto', value: 'auto' },
]

const FOOTER_STYLE_OPTIONS = [
  { label: 'Dark', value: 'dark' },
  { label: 'Light', value: 'light' },
  { label: 'Brand', value: 'brand' },
  { label: 'Gradient', value: 'gradient' },
]

// Footer style configurations
const FOOTER_STYLES: Record<FooterStyle, { bg: string; title: string; subtitle: string }> = {
  dark: {
    bg: 'bg-gray-900',
    title: 'text-white',
    subtitle: 'text-gray-400',
  },
  light: {
    bg: 'bg-primary',
    title: 'text-primary',
    subtitle: 'text-tertiary',
  },
  brand: {
    bg: 'bg-brand-solid',
    title: 'text-primary_on-brand',
    subtitle: 'text-primary_on-brand/70',
  },
  gradient: {
    bg: 'bg-gradient-to-br from-gray-900 to-gray-800',
    title: 'text-white',
    subtitle: 'text-gray-300',
  },
}

// =============================================================================
// PANEL CONFIGURATION
// =============================================================================

const createPanelConfig = (config: ShowcaseCardConfig): ControlSection => ({
  id: 'showcase-card',
  title: 'Showcase Card',
  tabLabel: 'Card',
  subsections: [
    {
      title: 'Container',
      controls: [
        {
          id: 'cardWidth',
          label: 'Card Width',
          type: 'slider',
          value: config.cardWidth,
          min: 280,
          max: 600,
          step: 20,
          formatLabel: (v: number) => `${v}px`,
        },
        {
          id: 'roundness',
          label: 'Roundness',
          type: 'select',
          value: config.roundness,
          options: ROUNDNESS_OPTIONS,
        },
        {
          id: 'elevation',
          label: 'Elevation',
          type: 'select',
          value: config.elevation,
          options: ELEVATION_OPTIONS,
        },
        {
          id: 'borderWidth',
          label: 'Border Width',
          type: 'slider',
          value: config.borderWidth,
          min: 0,
          max: 4,
          step: 1,
          formatLabel: (v: number) => `${v}px`,
        },
      ],
    },
    {
      title: 'Depth Gradient',
      controls: [
        {
          id: 'depthIntensity',
          label: 'Intensity',
          type: 'select',
          value: config.depthIntensity,
          options: DEPTH_INTENSITY_OPTIONS,
        },
        {
          id: 'depthDirection',
          label: 'Direction',
          type: 'select',
          value: config.depthDirection,
          options: DEPTH_DIRECTION_OPTIONS,
          disabled: config.depthIntensity === 'none',
        },
      ],
    },
    {
      title: 'Preview Area',
      controls: [
        {
          id: 'previewAspectRatio',
          label: 'Aspect Ratio',
          type: 'select',
          value: config.previewAspectRatio,
          options: ASPECT_RATIO_OPTIONS,
        },
        {
          id: 'previewBackground',
          label: 'Background',
          type: 'color',
          value: config.previewBackground,
          showValue: true,
        },
        {
          id: 'previewPadding',
          label: 'Padding',
          type: 'slider',
          value: config.previewPadding,
          min: 0,
          max: 48,
          step: 4,
          formatLabel: (v: number) => `${v}px`,
        },
      ],
    },
    {
      title: 'Footer',
      controls: [
        {
          id: 'footerStyle',
          label: 'Style',
          type: 'select',
          value: config.footerStyle,
          options: FOOTER_STYLE_OPTIONS,
        },
        {
          id: 'footerTitle',
          label: 'Title',
          type: 'text',
          value: config.footerTitle,
          placeholder: 'Card title...',
        },
        {
          id: 'footerSubtitle',
          label: 'Subtitle',
          type: 'text',
          value: config.footerSubtitle,
          placeholder: 'Subtitle...',
        },
        {
          id: 'footerPaddingX',
          label: 'Horizontal Padding',
          type: 'slider',
          value: config.footerPaddingX,
          min: 8,
          max: 32,
          step: 4,
          formatLabel: (v: number) => `${v}px`,
        },
        {
          id: 'footerPaddingY',
          label: 'Vertical Padding',
          type: 'slider',
          value: config.footerPaddingY,
          min: 8,
          max: 32,
          step: 4,
          formatLabel: (v: number) => `${v}px`,
        },
      ],
    },
  ],
})

// =============================================================================
// SHOWCASE CARD COMPONENT
// =============================================================================

interface ShowcaseCardProps {
  config: ShowcaseCardConfig
}

function ShowcaseCard({ config }: ShowcaseCardProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const footerColors = FOOTER_STYLES[config.footerStyle]

  // Measure content dimensions for clip path
  useLayoutEffect(() => {
    if (!contentRef.current) return

    const updateDimensions = () => {
      if (contentRef.current) {
        const { width, height } = contentRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()

    const resizeObserver = new ResizeObserver(updateDimensions)
    resizeObserver.observe(contentRef.current)

    return () => resizeObserver.disconnect()
  }, [config])

  // Construct depth gradient preset
  const depthPreset: SkwircleBackgroundGradient | undefined =
    config.depthIntensity === 'none'
      ? undefined
      : `depth-${config.depthIntensity}-${config.depthDirection}` as SkwircleBackgroundGradient

  // Aspect ratio style
  const aspectStyle = config.previewAspectRatio === 'auto'
    ? { minHeight: 200 }
    : { aspectRatio: config.previewAspectRatio }

  // Generate squircle clip path for content
  // The content wrapper already has margin applied, so clip to measured dimensions
  // Use INNER border radius since we're inside the border
  const clipPath = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return undefined

    const roundnessConfig = ROUNDNESS_CONFIGS[config.roundness]
    const innerConfig = {
      smoothing: roundnessConfig.smoothing,
      pointsPerCorner: roundnessConfig.pointsPerCorner,
      // Inner radius = outer radius - border width (matches Skwircle's background path)
      borderRadius: Math.max(1, roundnessConfig.borderRadius - config.borderWidth),
    }
    const path = generateSkwirclePath(dimensions.width, dimensions.height, innerConfig, 0)
    return `path('${path}')`
  }, [dimensions.width, dimensions.height, config.roundness, config.borderWidth])

  return (
    <Skwircle.Card
      elevation={config.elevation}
      roundness={config.roundness}
      borderWidth={config.borderWidth}
      backgroundGradient={depthPreset}
      intent="default"
      fillMode
      style={{ width: config.cardWidth }}
    >
      {/* Content wrapper with squircle clip path */}
      <div
        ref={contentRef}
        className="flex flex-col flex-1 w-full"
        style={{ clipPath }}
      >
        {/* Preview Area */}
        <div
          className="flex flex-1 items-center justify-center w-full"
          style={{
            ...aspectStyle,
            backgroundColor: config.previewBackground,
            padding: config.previewPadding,
          }}
        >
          {/* Placeholder content */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-1.5 text-sm text-white">
              <span>Menu</span>
              <span className="rounded border border-gray-600 bg-gray-800 px-1.5 py-0.5 text-xs text-gray-400">⌘</span>
              <span className="rounded border border-gray-600 bg-gray-800 px-1.5 py-0.5 text-xs text-gray-400">K</span>
            </div>
            <div className="flex items-center gap-1 rounded-lg bg-gray-900 px-2 py-1.5">
              {['💬', '↗', '👁', '👁', '⬆', '☰'].map((icon, i) => (
                <span key={i} className="flex h-7 w-7 items-center justify-center text-sm text-gray-400">
                  {icon}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`${footerColors.bg} w-full`}
          style={{
            paddingLeft: config.footerPaddingX,
            paddingRight: config.footerPaddingX,
            paddingTop: config.footerPaddingY,
            paddingBottom: config.footerPaddingY,
          }}
        >
          <h3 className={`text-base font-semibold ${footerColors.title}`}>
            {config.footerTitle}
          </h3>
          <p className={`mt-0.5 text-sm ${footerColors.subtitle}`}>
            {config.footerSubtitle}
          </p>
        </div>
      </div>
    </Skwircle.Card>
  )
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function SkwircleCardPage() {
  const [config, setConfig] = useState<ShowcaseCardConfig>(DEFAULT_CONFIG)

  // Panel configuration
  const panelConfig = useMemo<UnifiedControlPanelConfig>(() => ({
    sections: [createPanelConfig(config)],
    defaultActiveTab: 'showcase-card',
    position: {
      top: '80px',
      bottom: '16px',
      right: '16px',
      width: '320px',
    },
    showReset: true,
    resetLabel: 'Reset',
  }), [config])

  // Handle control changes
  const handleControlChange = useCallback((event: ControlChangeEvent) => {
    const { controlId, value } = event
    setConfig(prev => ({ ...prev, [controlId]: value }))
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG)
  }, [])

  // Get config for copy
  const getConfigForCopy = useCallback(() => config, [config])

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="fixed top-0 right-0 left-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/playground"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <HugeIcon icon={ArrowLeft01Icon} size={16} />
              Back
            </Link>
            <div className="h-4 w-px bg-gray-700" />
            <h1 className="text-lg font-semibold text-white">Skwircle Card</h1>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="pt-20 pr-[352px]">
        <div className="flex flex-col min-h-[calc(100vh-80px)] items-center justify-center p-8">
          {/* Description */}
          <p className="text-gray-400 text-lg mb-12 max-w-xl text-center">
            A collection of components and widgets exploring design, animations, and micro-interactions.
          </p>

          {/* Card Preview */}
          <ShowcaseCard config={config} />
        </div>
      </div>

      {/* Control Panel */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleControlChange}
        onReset={handleReset}
        getConfigForCopy={getConfigForCopy}
      />
    </div>
  )
}
