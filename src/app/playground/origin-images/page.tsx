'use client'

/**
 * Origin Images Playground
 *
 * Two display modes:
 * - Card: iPhone-icon style — single asset with name caption, optional backdrop behind
 * - Comparison: Side-by-side poster / logo / backdrop thumbnails
 */

import { useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'

import type { OriginImagesConfig, OriginEntry, ImageType } from './config/types'
import { DEFAULT_CONFIG, PRESETS } from './config/presets'
import { ORIGINS } from './config/origins'
import { buildPanelConfig } from './panels/panel-config'

// =============================================================================
// IMAGE THUMBNAIL
// =============================================================================

function Thumbnail({
  src,
  alt,
  width,
  height,
  borderRadius,
  contain,
  showBg,
  bgPaddingX = 0,
  bgPaddingY = 0,
  bgColor = 'bg-tertiary',
  shine = 'none',
  squircle = false,
  invert = 0,
}: {
  src: string
  alt: string
  width: number
  height: number
  borderRadius: number
  contain?: boolean
  showBg?: boolean
  bgPaddingX?: number
  bgPaddingY?: number
  bgColor?: string
  shine?: string
  squircle?: boolean
  invert?: number
}) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div
        className="bg-tertiary text-tertiary flex shrink-0 items-center justify-center text-[10px] font-medium"
        style={{
          width: showBg ? width + bgPaddingX * 2 : width,
          height: showBg ? height + bgPaddingY * 2 : height,
          borderRadius,
        }}
      >
        ?
      </div>
    )
  }

  const img = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`shrink-0 ${invert > 0 ? '[filter:invert(var(--logo-invert))] dark:[filter:none]' : ''}`}
      style={{
        width,
        height,
        objectFit: contain ? 'contain' : 'cover',
        borderRadius: showBg ? 0 : borderRadius,
        '--logo-invert': invert > 0 ? invert : undefined,
      } as React.CSSProperties}
      onError={() => setErrored(true)}
    />
  )

  if (showBg) {
    const bgClasses = [
      bgColor,
      'flex shrink-0 items-center justify-center',
      shine !== 'none' ? shine : '',
      squircle ? 'corner-squircle' : '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div
        className={bgClasses}
        style={{
          borderRadius,
          paddingInline: bgPaddingX,
          paddingBlock: bgPaddingY,
        }}
      >
        {img}
      </div>
    )
  }

  return img
}

// =============================================================================
// HELPERS
// =============================================================================

function getImageSrc(slug: string, type: ImageType): string {
  switch (type) {
    case 'poster':
      return `/origins/${slug}.jpg`
    case 'logo':
      return `/origins-logos/${slug}.png`
    case 'backdrop':
      return `/origins-backdrops/${slug}.jpg`
  }
}

// =============================================================================
// ASSET CARD (iPhone-icon style)
// =============================================================================

function AssetCard({
  origin,
  config,
}: {
  origin: OriginEntry
  config: OriginImagesConfig
}) {
  const { slug, name } = origin
  const { width, height, borderRadius, cardImageType, showLabel, showBackdropBehind, labelPosition } = config

  const isLogo = cardImageType === 'logo'
  const src = getImageSrc(slug, cardImageType)
  const backdropSrc = `/origins-backdrops/${slug}.jpg`

  // Card wrapper width — use image width, or backdrop width if backdrop is shown
  const cardWidth = showBackdropBehind ? Math.max(width * 1.8, width + 32) : width

  const isRightLabel = labelPosition === 'right'

  return (
    <div
      className={`flex ${isRightLabel ? 'flex-row items-center' : 'flex-col items-center'}`}
      style={{ gap: config.labelGap }}
    >
      {/* Image container */}
      {showBackdropBehind ? (
        <div
          className="relative flex shrink-0 items-center justify-center overflow-hidden"
          style={{
            width: cardWidth,
            height: height * 1.2,
            borderRadius,
          }}
        >
          <Image
            src={backdropSrc}
            alt=""
            width={Math.round(cardWidth)}
            height={Math.round(height * 1.2)}
            className="absolute inset-0"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius,
              opacity: config.backdropOpacity,
            }}
          />
          {/* Shine overlay — above backdrop, below content */}
          {config.backdropShine !== 'none' && (
            <div
              className={`pointer-events-none absolute inset-0 z-[1] ${config.backdropShine}`}
              style={{ borderRadius }}
            />
          )}
          <div className="relative z-10">
            <Thumbnail
              src={src}
              alt={name}
              width={Math.round(width * 0.75)}
              height={Math.round(height * 0.75)}
              borderRadius={Math.max(borderRadius - 4, 2)}
              contain={isLogo}
              showBg={isLogo && config.logoBg}
              bgPaddingX={isLogo && config.logoBg ? config.logoPaddingX : 0}
              bgPaddingY={isLogo && config.logoBg ? config.logoPaddingY : 0}
              bgColor={config.logoBgColor}
              shine={config.logoShine}
              squircle={config.logoSquircle}
              invert={config.logoInvert}
            />
          </div>
        </div>
      ) : (
        <Thumbnail
          src={src}
          alt={name}
          width={width}
          height={height}
          borderRadius={borderRadius}
          contain={isLogo}
          showBg={isLogo && config.logoBg}
          bgPaddingX={isLogo && config.logoBg ? config.logoPaddingX : 0}
          bgPaddingY={isLogo && config.logoBg ? config.logoPaddingY : 0}
          bgColor={config.logoBgColor}
          shine={config.logoShine}
          squircle={config.logoSquircle}
          invert={config.logoInvert}
        />
      )}

      {/* Caption */}
      {showLabel && (
        <span
          className={`${config.labelColor} ${isRightLabel ? 'text-left' : 'text-center'} text-[11px] leading-tight`}
          style={{ opacity: config.labelOpacity, fontWeight: config.labelWeight }}
        >
          {name}
        </span>
      )}
    </div>
  )
}

// =============================================================================
// TYPE LABEL (comparison mode)
// =============================================================================

const TYPE_COLORS: Record<string, string> = {
  poster: 'text-blue-400',
  logo: 'text-emerald-400',
  backdrop: 'text-amber-400',
}

function TypeTag({ type }: { type: string }) {
  return (
    <span className={`text-[9px] font-medium uppercase tracking-wider ${TYPE_COLORS[type] ?? 'text-tertiary'}`}>
      {type}
    </span>
  )
}

// =============================================================================
// COMPARISON CARD (original side-by-side view)
// =============================================================================

function ComparisonCard({
  origin,
  config,
}: {
  origin: OriginEntry
  config: OriginImagesConfig
}) {
  const { slug, name } = origin
  const { width, height, borderRadius, showPoster, showLogo, showBackdrop, showLabel, logoBg } = config

  const wideW = width * 2

  const visibleTypes = [
    showPoster && 'poster',
    showLogo && 'logo',
    showBackdrop && 'backdrop',
  ].filter(Boolean) as string[]

  if (visibleTypes.length === 0) return null

  return (
    <div className="flex flex-col items-center" style={{ gap: config.labelGap }}>
      <div className="flex items-end gap-2">
        {showPoster && (
          <div className="flex flex-col items-center gap-1">
            <Thumbnail
              src={`/origins/${slug}.jpg`}
              alt={`${name} poster`}
              width={width}
              height={height}
              borderRadius={borderRadius}
            />
            {visibleTypes.length > 1 && <TypeTag type="poster" />}
          </div>
        )}
        {showLogo && (
          <div className="flex flex-col items-center gap-1">
            <Thumbnail
              src={`/origins-logos/${slug}.png`}
              alt={`${name} logo`}
              width={wideW}
              height={height}
              borderRadius={borderRadius}
              contain
              showBg={logoBg}
              bgPaddingX={logoBg ? config.logoPaddingX : 0}
              bgPaddingY={logoBg ? config.logoPaddingY : 0}
              bgColor={config.logoBgColor}
              shine={config.logoShine}
              squircle={config.logoSquircle}
              invert={config.logoInvert}
            />
            {visibleTypes.length > 1 && <TypeTag type="logo" />}
          </div>
        )}
        {showBackdrop && (
          <div className="flex flex-col items-center gap-1">
            <Thumbnail
              src={`/origins-backdrops/${slug}.jpg`}
              alt={`${name} backdrop`}
              width={wideW}
              height={height}
              borderRadius={borderRadius}
            />
            {visibleTypes.length > 1 && <TypeTag type="backdrop" />}
          </div>
        )}
      </div>
      {showLabel && (
        <span
          className={`${config.labelColor} max-w-full truncate text-center text-[11px] leading-tight`}
          style={{ opacity: config.labelOpacity, fontWeight: config.labelWeight }}
        >
          {name}
        </span>
      )}
    </div>
  )
}

// =============================================================================
// PAGE
// =============================================================================

export default function OriginImagesPlayground() {
  const [config, setConfig] = useState<OriginImagesConfig>(DEFAULT_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('app-icon')

  const handleChange = useCallback((event: ControlChangeEvent) => {
    setConfig((prev) => ({ ...prev, [event.controlId]: event.value }))
    setActivePresetId(null)
  }, [])

  const handlePresetChange = useCallback((presetId: string) => {
    const preset = PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
    }
  }, [])

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG)
    setActivePresetId('app-icon')
  }, [])

  const panelConfig = useMemo(
    () => buildPanelConfig(config, PRESETS, activePresetId),
    [config, activePresetId],
  )

  const isCardMode = config.displayMode === 'card'

  return (
    <div className="relative min-h-screen bg-primary">
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleChange}
        onPresetChange={handlePresetChange}
        onReset={handleReset}
        getConfigForCopy={() => config}
      />

      {/* Content */}
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-lg font-semibold text-primary">
            {isCardMode ? 'Origin Assets' : 'Origin Image Comparison'}
          </h1>
          <p className="mt-1 text-sm text-secondary">
            {isCardMode
              ? `Viewing ${config.cardImageType} assets with captions. Switch image types and toggle backdrop in the control panel.`
              : 'Compare poster, logo, and backdrop thumbnails from TMDB for each origin.'}
          </p>
        </div>

        {/* Legend (comparison mode only) */}
        {!isCardMode && (
          <div className="mb-6 flex items-center gap-4">
            {config.showPoster && (
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-blue-400" />
                <span className="text-xs text-secondary">Poster (2:3)</span>
              </span>
            )}
            {config.showLogo && (
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-secondary">Logo (wide, transparent)</span>
              </span>
            )}
            {config.showBackdrop && (
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
                <span className="text-xs text-secondary">Backdrop (16:9)</span>
              </span>
            )}
          </div>
        )}

        {/* Grid */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${config.columns}, minmax(0, 1fr))`,
            gap: config.gap,
            paddingInline: config.paddingX,
            paddingBlock: config.paddingY,
          }}
        >
          {ORIGINS.map((origin) =>
            isCardMode ? (
              <AssetCard key={origin.slug} origin={origin} config={config} />
            ) : (
              <ComparisonCard key={origin.slug} origin={origin} config={config} />
            ),
          )}
        </div>
      </div>
    </div>
  )
}
