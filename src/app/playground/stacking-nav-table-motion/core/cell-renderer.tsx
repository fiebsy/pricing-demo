/**
 * Stacking Nav + Table Motion Playground - Cell Renderer
 *
 * Minimal cell rendering — wifi signal for threat level, origin text,
 * description text, realm badges, and sparkline lives rescued trends.
 */

'use client'

import React from 'react'
import Image from 'next/image'
import type { Character } from '../config/types'
import { ThreatLevel } from '../config/types'
import { getOriginSlug } from '../config/origin-avatars'
import { getCharacterAvatarPath } from '@/app/playground/character-avatars/config/characters'
import { Badge, type BadgeColor, type BadgeStyle, type BadgeShape } from '@/components/ui/core/primitives/badge'

// =============================================================================
// THREAT LEVEL (wifi signal column)
// =============================================================================

const THREAT_FILLED: Record<ThreatLevel, number> = {
  [ThreatLevel.STier]: 5,
  [ThreatLevel.ATier]: 4,
  [ThreatLevel.BTier]: 3,
  [ThreatLevel.MemeTier]: 1,
}

const THREAT_SCORE: Record<ThreatLevel, number> = {
  [ThreatLevel.STier]: 97,
  [ThreatLevel.ATier]: 74,
  [ThreatLevel.BTier]: 48,
  [ThreatLevel.MemeTier]: 15,
}

const BAR_HEIGHTS = [3, 5, 7, 9, 12]

function ThreatSignal({ level }: { level: ThreatLevel }) {
  const filled = THREAT_FILLED[level]
  const score = THREAT_SCORE[level]
  return (
    <div className="text-secondary flex items-end gap-[2px]">
      {BAR_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-sm bg-current"
          style={{
            height: h,
            opacity: i < filled ? 0.75 : 0.12,
          }}
        />
      ))}
      <span className="ml-1.5 text-[11px] font-medium tabular-nums leading-none opacity-35">
        {score}
      </span>
    </div>
  )
}

// =============================================================================
// SPARKLINE
// =============================================================================

const SPARK_W = 100
const SPARK_PAD = 2

export interface BadgeConfig {
  style: BadgeStyle
  shape: BadgeShape
  neutral: boolean
}

export interface OriginAvatarConfig {
  width: number
  height: number
  imageType: 'poster' | 'logo' | 'backdrop'
  logoBg: boolean
  logoBgColor: string
  logoPaddingX: number
  logoPaddingY: number
  logoShine: string
  logoSquircle: boolean
  logoInvert: number
}

export interface SparklineConfig {
  height: number
  strokeWidth: number
  showFill: boolean
  showDot: boolean
}

const DEFAULT_SPARKLINE_CONFIG: SparklineConfig = {
  height: 24,
  strokeWidth: 1.5,
  showFill: true,
  showDot: true,
}

function Sparkline({ data, config = DEFAULT_SPARKLINE_CONFIG }: { data: number[]; config?: SparklineConfig }) {
  const gradientId = React.useId()
  if (!data.length) return null

  const h = config.height
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((v, i) => {
    const x = SPARK_PAD + (i / (data.length - 1)) * (SPARK_W - SPARK_PAD * 2)
    const y = SPARK_PAD + (1 - (v - min) / range) * (h - SPARK_PAD * 2)
    return [x, y] as const
  })

  const polyline = points.map(([x, y]) => `${x},${y}`).join(' ')

  // Filled area path
  const firstX = points[0][0]
  const lastX = points[points.length - 1][0]
  const areaPath = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')
    + ` L${lastX},${h} L${firstX},${h} Z`

  const lastPt = points[points.length - 1]

  return (
    <svg
      width={SPARK_W}
      height={h}
      viewBox={`0 0 ${SPARK_W} ${h}`}
      className="block text-tertiary"
    >
      {config.showFill && (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity={0.15} />
              <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#${gradientId})`} />
        </>
      )}
      <polyline
        points={polyline}
        fill="none"
        stroke="currentColor"
        strokeWidth={config.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {config.showDot && (
        <circle
          cx={lastPt[0]}
          cy={lastPt[1]}
          r={Math.max(1.5, config.strokeWidth)}
          fill="currentColor"
        />
      )}
    </svg>
  )
}

// =============================================================================
// ORIGIN AVATAR
// =============================================================================

const DEFAULT_AVATAR_CONFIG: OriginAvatarConfig = {
  width: 20,
  height: 20,
  imageType: 'poster',
  logoBg: false,
  logoBgColor: 'bg-tertiary',
  logoPaddingX: 4,
  logoPaddingY: 3,
  logoShine: 'none',
  logoSquircle: false,
  logoInvert: 0,
}

function getOriginSrc(origin: string, imageType: 'poster' | 'logo' | 'backdrop'): string {
  const slug = getOriginSlug(origin)
  switch (imageType) {
    case 'poster':
      return `/origins/${slug}.jpg`
    case 'logo':
      return `/origins-logos/${slug}.png`
    case 'backdrop':
      return `/origins-backdrops/${slug}.jpg`
  }
}

function OriginAvatar({ origin, config = DEFAULT_AVATAR_CONFIG }: { origin: string; config?: OriginAvatarConfig }) {
  const [errored, setErrored] = React.useState(false)
  const { width, height, imageType, logoBg, logoBgColor, logoPaddingX, logoPaddingY, logoShine, logoSquircle, logoInvert } = config
  const src = getOriginSrc(origin, imageType)
  const initial = origin.charAt(0).toUpperCase()
  const isLogo = imageType === 'logo'
  const showBg = isLogo && logoBg

  if (errored) {
    return (
      <div
        className="bg-tertiary text-tertiary flex shrink-0 items-center justify-center rounded-sm text-[10px] font-medium"
        style={{ width, height }}
      >
        {initial}
      </div>
    )
  }

  const img = (
    <Image
      src={src}
      alt={origin}
      width={width}
      height={height}
      loading="lazy"
      className={`shrink-0 ${isLogo ? 'object-contain' : 'rounded-sm object-cover'} ${isLogo && logoInvert > 0 ? '[filter:invert(var(--logo-invert))] dark:[filter:none]' : ''}`}
      style={{
        width,
        height,
        borderRadius: showBg ? 0 : undefined,
        '--logo-invert': isLogo && logoInvert > 0 ? logoInvert : undefined,
      } as React.CSSProperties}
      onError={() => setErrored(true)}
    />
  )

  if (showBg) {
    const bgClasses = [
      logoBgColor,
      'flex shrink-0 items-center justify-center',
      logoShine !== 'none' ? logoShine : '',
      logoSquircle ? 'corner-squircle' : '',
    ].filter(Boolean).join(' ')

    return (
      <div
        className={bgClasses}
        style={{
          borderRadius: 4,
          paddingInline: logoPaddingX,
          paddingBlock: logoPaddingY,
        }}
      >
        {img}
      </div>
    )
  }

  return img
}

// =============================================================================
// CHARACTER AVATAR
// =============================================================================

function CharacterAvatar({ name, slug }: { name: string; slug: string }) {
  const [errored, setErrored] = React.useState(false)
  const initial = name.charAt(0).toUpperCase()

  if (errored) {
    return (
      <div className="bg-tertiary text-tertiary flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-medium">
        {initial}
      </div>
    )
  }

  return (
    <Image
      src={getCharacterAvatarPath(slug)}
      alt={name}
      width={20}
      height={20}
      loading="lazy"
      className="h-5 w-5 shrink-0 rounded-full object-cover"
      onError={() => setErrored(true)}
    />
  )
}

// =============================================================================
// HELPERS
// =============================================================================

/** "Tony Stark" → "Tony S." */
function formatShortName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length < 2) return fullName
  return `${parts[0]} ${parts[parts.length - 1][0]}.`
}

// =============================================================================
// CELL RENDERER
// =============================================================================

export function createRenderCell(sparklineConfig: SparklineConfig, avatarConfig?: OriginAvatarConfig, badgeConfig?: BadgeConfig) {
  return (columnKey: string, item: Character, _index: number): React.ReactNode =>
    renderCell(columnKey, item, _index, sparklineConfig, avatarConfig, badgeConfig)
}

const renderCell = (
  columnKey: string,
  item: Character,
  _index: number,
  sparklineConfig?: SparklineConfig,
  avatarConfig?: OriginAvatarConfig,
  badgeConfig?: BadgeConfig,
): React.ReactNode => {
  switch (columnKey) {
    case 'character': {
      return (
        <div className="flex items-center gap-2.5 min-w-0">
          <CharacterAvatar name={item.name} slug={item.slug} />
          <span className="text-secondary truncate text-sm font-medium">
            {formatShortName(item.name)}
          </span>
        </div>
      )
    }

    case 'realmBadge': {
      const realm = item.realmLabel as string
      const colorMap: Record<string, BadgeColor> = {
        Marvel: 'error',
        Anime: 'brand',
        Westeros: 'warning',
      }
      const color = badgeConfig?.neutral ? 'gray' : (colorMap[realm] ?? 'gray')
      const style = badgeConfig?.style ?? 'default'
      const shape = badgeConfig?.shape ?? 'pill'
      return (
        <Badge color={color} size="xs" shape={shape} style={style}>
          {realm}
        </Badge>
      )
    }

    case 'origin':
      return (
        <div className="flex items-center gap-2 min-w-0">
          <OriginAvatar origin={item.origin} config={avatarConfig} />
          <span className="text-tertiary truncate text-xs">{item.origin}</span>
        </div>
      )

    case 'threatLevel':
      return <ThreatSignal level={item.threatLevel} />

    case 'description':
      return (
        <span className="text-tertiary truncate text-xs italic">{item.description}</span>
      )

    case 'livesRescued':
      return <Sparkline data={item.trend} config={sparklineConfig} />

    default:
      return null
  }
}
