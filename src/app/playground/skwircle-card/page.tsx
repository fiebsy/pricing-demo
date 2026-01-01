/**
 * Skwircle Card Playground
 *
 * Interactive experimentation space for showcase card components.
 * Features a unified control panel for real-time customization.
 */

'use client'

import { useCallback, useMemo, useState, useRef, useLayoutEffect } from 'react'
import { Breadcrumbs } from '@/components/ui/nav'
import { Skwircle } from '@/components/ui/skwircle/skwircle'
import type { SkwircleBackgroundGradient, SkwircleBorderGradient, SkwircleRoundness, SkwircleElevation, GradientConfig } from '@/components/ui/skwircle/types'
import { generateSkwirclePath } from '@/components/ui/skwircle/utils/path-generator'
import { ROUNDNESS_CONFIGS } from '@/components/ui/skwircle/config/roundness'
import { GRADIENT_BORDER_PRESETS } from '@/components/ui/skwircle/config/constants'
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
type BorderColor = 'none' | 'border-primary' | 'border-secondary' | 'border-tertiary' | 'border-brand' | 'border-brand-solid' | 'border-error' | 'border-success' | 'border-warning'
type RingColor = 'border-brand' | 'border-brand-solid' | 'border-primary' | 'border-secondary' | 'border-error' | 'border-success' | 'border-warning'
type PreviewBackground =
  | 'white'
  | 'bg-primary'
  | 'bg-secondary'
  | 'bg-tertiary'
  | 'bg-quaternary'
  | 'bg-primary_alt'
  | 'bg-secondary_alt'
  | 'bg-brand-primary'
  | 'bg-brand-secondary'
  | 'bg-brand-solid'
  | 'bg-inverted-primary'
  | 'bg-inverted-secondary'
type PreviewGradientSize = 'none' | 'sm' | 'md' | 'lg'
type GradientColor =
  | 'brand'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'gray'
  | 'gray-light'
  | 'success'
  | 'error'
  | 'warning'

interface ShowcaseCardConfig {
  // Card container
  roundness: SkwircleRoundness
  elevation: SkwircleElevation

  // Border
  borderWidth: number
  borderColor: BorderColor
  borderOpacity: number
  borderGradient: SkwircleBorderGradient

  // Ring (outer border)
  ringEnabled: boolean
  ringColor: RingColor
  ringWidth: number
  ringOpacity: number

  // Depth gradient
  depthIntensity: DepthIntensity
  depthDirection: DepthDirection

  // Preview area
  previewAspectRatio: AspectRatio
  previewBackground: PreviewBackground
  previewGradientSize: PreviewGradientSize
  previewGradientColor: GradientColor
  previewGradientInverse: boolean
  previewPadding: number

  // Footer
  footerStyle: FooterStyle
  footerTitle: string
  footerSubtitle: string
  footerPaddingX: number
  footerPaddingY: number

  // Card dimensions
  cardWidth: number
  cardHeight: number | null  // null = auto
  fillWidth: boolean
}

// =============================================================================
// CONSTANTS
// =============================================================================

const DEFAULT_CONFIG: ShowcaseCardConfig = {
  roundness: 'rounded',
  elevation: 'sm',
  borderWidth: 0,
  borderColor: 'border-secondary',
  borderOpacity: 100,
  borderGradient: 'none',
  ringEnabled: false,
  ringColor: 'border-brand',
  ringWidth: 2,
  ringOpacity: 100,
  depthIntensity: 'none',
  depthDirection: 'bottom-right',
  previewAspectRatio: '4/3',
  previewBackground: 'white',
  previewGradientSize: 'none',
  previewGradientColor: 'brand',
  previewGradientInverse: false,
  previewPadding: 24,
  footerStyle: 'dark',
  footerTitle: 'Shared Tooltip',
  footerSubtitle: 'Dec 2025',
  footerPaddingX: 20,
  footerPaddingY: 16,
  cardWidth: 400,
  cardHeight: null,
  fillWidth: false,
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

const BORDER_COLOR_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Primary', value: 'border-primary' },
  { label: 'Secondary', value: 'border-secondary' },
  { label: 'Tertiary', value: 'border-tertiary' },
  { label: 'Brand', value: 'border-brand' },
  { label: 'Brand Solid', value: 'border-brand-solid' },
  { label: 'Error', value: 'border-error' },
  { label: 'Success', value: 'border-success' },
  { label: 'Warning', value: 'border-warning' },
]

const BORDER_GRADIENT_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Shine Corners', value: 'shine-corners' },
  { label: 'Edge Glow', value: 'edge-glow' },
  { label: 'Corner TL→BR', value: 'corner-tl-br-5' },
  { label: 'Corner TR→BL', value: 'corner-tr-bl-5' },
]

const RING_COLOR_OPTIONS = [
  { label: 'Brand', value: 'border-brand' },
  { label: 'Brand Solid', value: 'border-brand-solid' },
  { label: 'Primary', value: 'border-primary' },
  { label: 'Secondary', value: 'border-secondary' },
  { label: 'Error', value: 'border-error' },
  { label: 'Success', value: 'border-success' },
  { label: 'Warning', value: 'border-warning' },
]

const PREVIEW_BACKGROUND_OPTIONS = [
  { label: 'White', value: 'white' },
  { label: 'Primary', value: 'bg-primary' },
  { label: 'Secondary', value: 'bg-secondary' },
  { label: 'Tertiary', value: 'bg-tertiary' },
  { label: 'Quaternary', value: 'bg-quaternary' },
  { label: 'Primary Alt', value: 'bg-primary_alt' },
  { label: 'Secondary Alt', value: 'bg-secondary_alt' },
  { label: 'Brand Primary', value: 'bg-brand-primary' },
  { label: 'Brand Secondary', value: 'bg-brand-secondary' },
  { label: 'Brand Solid', value: 'bg-brand-solid' },
  { label: 'Inverted Primary', value: 'bg-inverted-primary' },
  { label: 'Inverted Secondary', value: 'bg-inverted-secondary' },
]

const PREVIEW_GRADIENT_SIZE_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
]

const GRADIENT_COLOR_OPTIONS = [
  { label: 'Brand', value: 'brand' },
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Gray', value: 'gray' },
  { label: 'Gray Light', value: 'gray-light' },
  { label: 'Success', value: 'success' },
  { label: 'Error', value: 'error' },
  { label: 'Warning', value: 'warning' },
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
      title: 'Dimensions',
      controls: [
        {
          id: 'cardWidth',
          label: 'Width',
          type: 'slider',
          value: config.cardWidth,
          min: 200,
          max: 800,
          step: 10,
          formatLabel: (v: number) => `${v}px`,
          disabled: config.fillWidth,
        },
        {
          id: 'cardHeight',
          label: 'Height',
          type: 'slider',
          value: config.cardHeight ?? 0,
          min: 0,
          max: 600,
          step: 10,
          formatLabel: (v: number) => v === 0 ? 'Auto' : `${v}px`,
        },
        {
          id: 'fillWidth',
          label: 'Fill Width',
          type: 'checkbox',
          value: config.fillWidth,
        },
      ],
    },
    {
      title: 'Container',
      controls: [
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
      ],
    },
    {
      title: 'Border',
      controls: [
        {
          id: 'borderWidth',
          label: 'Width',
          type: 'slider',
          value: config.borderWidth,
          min: 0,
          max: 8,
          step: 1,
          formatLabel: (v: number) => `${v}px`,
        },
        {
          id: 'borderColor',
          label: 'Color',
          type: 'select',
          value: config.borderColor,
          options: BORDER_COLOR_OPTIONS,
          disabled: config.borderWidth === 0,
        },
        {
          id: 'borderOpacity',
          label: 'Opacity',
          type: 'slider',
          value: config.borderOpacity,
          min: 0,
          max: 100,
          step: 5,
          formatLabel: (v: number) => `${v}%`,
          disabled: config.borderWidth === 0,
        },
        {
          id: 'borderGradient',
          label: 'Gradient',
          type: 'select',
          value: config.borderGradient,
          options: BORDER_GRADIENT_OPTIONS,
          disabled: config.borderWidth === 0,
        },
      ],
    },
    {
      title: 'Ring',
      controls: [
        {
          id: 'ringEnabled',
          label: 'Enable Ring',
          type: 'checkbox',
          value: config.ringEnabled,
        },
        {
          id: 'ringWidth',
          label: 'Width',
          type: 'slider',
          value: config.ringWidth,
          min: 1,
          max: 6,
          step: 1,
          formatLabel: (v: number) => `${v}px`,
          disabled: !config.ringEnabled,
        },
        {
          id: 'ringColor',
          label: 'Color',
          type: 'select',
          value: config.ringColor,
          options: RING_COLOR_OPTIONS,
          disabled: !config.ringEnabled,
        },
        {
          id: 'ringOpacity',
          label: 'Opacity',
          type: 'slider',
          value: config.ringOpacity,
          min: 0,
          max: 100,
          step: 5,
          formatLabel: (v: number) => `${v}%`,
          disabled: !config.ringEnabled,
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
          type: 'select',
          value: config.previewBackground,
          options: PREVIEW_BACKGROUND_OPTIONS,
        },
        {
          id: 'previewGradientSize',
          label: 'Gradient Depth',
          type: 'select',
          value: config.previewGradientSize,
          options: PREVIEW_GRADIENT_SIZE_OPTIONS,
        },
        {
          id: 'previewGradientColor',
          label: 'Gradient Color',
          type: 'select',
          value: config.previewGradientColor,
          options: GRADIENT_COLOR_OPTIONS,
          disabled: config.previewGradientSize === 'none',
        },
        {
          id: 'previewGradientInverse',
          label: 'Inverse Gradient',
          type: 'checkbox',
          value: config.previewGradientInverse,
          disabled: config.previewGradientSize === 'none',
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

  // Build card style with dimensions
  const cardStyle: React.CSSProperties = config.fillWidth
    ? { width: '100%' }
    : { width: config.cardWidth }

  // Add height if specified
  if (config.cardHeight !== null && config.cardHeight > 0) {
    cardStyle.height = config.cardHeight
  }

  // Compute border color with opacity
  // Border tokens map: 'border-primary' -> 'border-color-primary'
  const getBorderCssVar = (token: string) => token.replace('border-', 'border-color-')
  const borderColorWithOpacity = config.borderColor === 'none'
    ? undefined
    : config.borderOpacity < 100
      ? `color-mix(in srgb, var(--${getBorderCssVar(config.borderColor)}) ${config.borderOpacity}%, transparent)`
      : config.borderColor

  // Compute ring color with opacity
  const ringColorWithOpacity = config.ringOpacity < 100
    ? `color-mix(in srgb, var(--${getBorderCssVar(config.ringColor)}) ${config.ringOpacity}%, transparent)`
    : config.ringColor

  // Build custom border gradient config with user's selected color
  const getCustomBorderGradient = (): GradientConfig | undefined => {
    if (config.borderGradient === 'none' || config.borderColor === 'none') return undefined

    const preset = GRADIENT_BORDER_PRESETS[config.borderGradient]
    if (!preset) return undefined

    // Clone the preset and replace the color with user's selection
    return {
      ...preset,
      colors: [config.borderColor],
    }
  }

  // Compute preview background
  const getPreviewBackgroundClass = () => {
    if (config.previewBackground === 'white') return 'bg-white'
    return config.previewBackground
  }

  // Generate the full gradient CSS inline (required due to CSS variable scoping)
  // The gradient patterns in CSS use var(--gradient-color) which is resolved at :root,
  // so we must generate the entire gradient with the color injected
  const getPreviewGradientStyle = (): string | undefined => {
    if (config.previewGradientSize === 'none') return undefined

    const colorMap: Record<GradientColor, string> = {
      'brand': 'var(--border-color-brand)',
      'primary': 'var(--border-color-primary)',
      'secondary': 'var(--border-color-secondary)',
      'tertiary': 'var(--border-color-tertiary)',
      'gray': 'var(--color-gray-400)',
      'gray-light': 'var(--color-gray-300)',
      'success': 'var(--color-success-500)',
      'error': 'var(--color-error-500)',
      'warning': 'var(--color-warning-500)',
    }
    const color = colorMap[config.previewGradientColor]

    // Gradient intensity configs (matches gradients.css)
    const intensityMap: Record<PreviewGradientSize, number[]> = {
      'none': [],
      'sm': [3, 8, 15, 22, 28],
      'md': [9, 20, 32, 44, 54],
      'lg': [15, 32, 48, 64, 80],
    }
    const stops = intensityMap[config.previewGradientSize]
    const orderedStops = config.previewGradientInverse ? [...stops].reverse() : stops

    return `linear-gradient(238deg, ${orderedStops.map((opacity, i) =>
      `color-mix(in srgb, ${color} ${opacity}%, transparent) ${i * 25}%`
    ).join(', ')})`
  }

  return (
    <Skwircle.Card
      elevation={config.elevation}
      roundness={config.roundness}
      borderWidth={config.borderWidth}
      borderColor={borderColorWithOpacity}
      borderGradient={config.borderGradient !== 'none' ? 'custom' : 'none'}
      customBorderGradient={getCustomBorderGradient()}
      ring={config.ringEnabled}
      ringColor={ringColorWithOpacity}
      ringWidth={config.ringWidth}
      ringOpacity={config.ringOpacity}
      backgroundGradient={depthPreset}
      intent="default"
      fillMode
      style={cardStyle}
    >
      {/* Content wrapper with squircle clip path */}
      <div
        ref={contentRef}
        className="flex flex-col flex-1 w-full"
        style={{ clipPath }}
      >
        {/* Preview Area */}
        <div
          className={`flex flex-1 items-center justify-center w-full ${getPreviewBackgroundClass()}`}
          style={{
            ...aspectStyle,
            padding: config.previewPadding,
            // Generate gradient inline (CSS variable scoping workaround)
            backgroundImage: getPreviewGradientStyle(),
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
      top: '16px',
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

    // Convert cardHeight 0 to null (auto)
    if (controlId === 'cardHeight') {
      const heightValue = value as number
      setConfig(prev => ({ ...prev, cardHeight: heightValue === 0 ? null : heightValue }))
      return
    }

    setConfig(prev => ({ ...prev, [controlId]: value }))
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG)
  }, [])

  // Get config for copy
  const getConfigForCopy = useCallback(() => config, [config])

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <div className="nav-clearance px-6">
        <Breadcrumbs
          items={[
            { label: 'Playground', href: '/playground' },
            { label: 'Skwircle Card' },
          ]}
        />
      </div>

      {/* Preview Area */}
      <div className="pr-[352px] pb-24 md:pb-0">
        <div className="flex flex-col min-h-[calc(100vh-120px)] items-center justify-center p-8">
          {/* Description */}
          <p className="text-tertiary text-lg mb-12 max-w-xl text-center">
            A collection of components and widgets exploring design, animations, and micro-interactions.
          </p>

          {/* Card Preview */}
          <div className={config.fillWidth ? 'w-full max-w-4xl' : undefined}>
            <ShowcaseCard config={config} />
          </div>
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
