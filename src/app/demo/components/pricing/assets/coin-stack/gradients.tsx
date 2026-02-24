import type { GradientConfig, EffectsConfig } from './types'
import { resolveColor } from './color-resolver'

// Get linear gradient coordinates based on direction
function getLinearCoords(direction: GradientConfig['direction']): {
  x1: string
  y1: string
  x2: string
  y2: string
} {
  const coords: Record<
    GradientConfig['direction'],
    { x1: string; y1: string; x2: string; y2: string }
  > = {
    'to-bottom': { x1: '0%', y1: '0%', x2: '0%', y2: '100%' },
    'to-top': { x1: '0%', y1: '100%', x2: '0%', y2: '0%' },
    'to-right': { x1: '0%', y1: '0%', x2: '100%', y2: '0%' },
    'to-left': { x1: '100%', y1: '0%', x2: '0%', y2: '0%' },
    'to-bottom-right': { x1: '0%', y1: '0%', x2: '100%', y2: '100%' },
    'to-bottom-left': { x1: '100%', y1: '0%', x2: '0%', y2: '100%' },
    'to-top-right': { x1: '0%', y1: '100%', x2: '100%', y2: '0%' },
    'to-top-left': { x1: '100%', y1: '100%', x2: '0%', y2: '0%' },
  }
  return coords[direction]
}

// Linear gradient definition component
interface GradientDefProps {
  id: string
  config: GradientConfig
}

export function LinearGradientDef({ id, config }: GradientDefProps) {
  const coords = getLinearCoords(config.direction)
  return (
    <linearGradient id={id} {...coords}>
      <stop
        offset="0%"
        stopColor={resolveColor(config.startColor)}
        stopOpacity={config.startOpacity / 100}
      />
      <stop
        offset="100%"
        stopColor={resolveColor(config.endColor)}
        stopOpacity={config.endOpacity / 100}
      />
    </linearGradient>
  )
}

// Radial gradient definition component
export function RadialGradientDef({ id, config }: GradientDefProps) {
  return (
    <radialGradient id={id} cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
      <stop
        offset="0%"
        stopColor={resolveColor(config.startColor)}
        stopOpacity={config.startOpacity / 100}
      />
      <stop
        offset="100%"
        stopColor={resolveColor(config.endColor)}
        stopOpacity={config.endOpacity / 100}
      />
    </radialGradient>
  )
}

// Combined gradient definition based on type
export function GradientDef({ id, config }: GradientDefProps) {
  if (config.type === 'radial') {
    return <RadialGradientDef id={id} config={config} />
  }
  return <LinearGradientDef id={id} config={config} />
}

// Drop shadow filter configuration
interface DropShadowConfig {
  stdDeviation: number
  dy: number
}

const DROP_SHADOW_SIZES: Record<
  Exclude<EffectsConfig['dropShadow'], 'none'>,
  DropShadowConfig
> = {
  sm: { stdDeviation: 2, dy: 1 },
  md: { stdDeviation: 4, dy: 2 },
  lg: { stdDeviation: 8, dy: 4 },
  xl: { stdDeviation: 16, dy: 8 },
}

// Drop shadow filter component
interface DropShadowFilterProps {
  id: string
  size: Exclude<EffectsConfig['dropShadow'], 'none'>
  color: string
  opacity: number
}

export function DropShadowFilter({ id, size, color, opacity }: DropShadowFilterProps) {
  const { stdDeviation, dy } = DROP_SHADOW_SIZES[size]
  return (
    <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow
        dx="0"
        dy={dy}
        stdDeviation={stdDeviation}
        floodColor={resolveColor(color)}
        floodOpacity={opacity / 100}
      />
    </filter>
  )
}

// Inner glow filter component
interface InnerGlowFilterProps {
  id: string
  intensity: Exclude<EffectsConfig['innerGlow'], 'none'>
  color: string
}

const INNER_GLOW_INTENSITIES: Record<
  Exclude<EffectsConfig['innerGlow'], 'none'>,
  { stdDeviation: number; opacity: number }
> = {
  subtle: { stdDeviation: 2, opacity: 0.3 },
  medium: { stdDeviation: 4, opacity: 0.5 },
  strong: { stdDeviation: 6, opacity: 0.7 },
}

export function InnerGlowFilter({ id, intensity, color }: InnerGlowFilterProps) {
  const { stdDeviation, opacity } = INNER_GLOW_INTENSITIES[intensity]
  return (
    <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation={stdDeviation} result="blur" />
      <feFlood floodColor={resolveColor(color)} floodOpacity={opacity} result="color" />
      <feComposite in="color" in2="blur" operator="in" result="glow" />
      <feComposite in="SourceGraphic" in2="glow" operator="over" />
    </filter>
  )
}

// Shine overlay path for top face
interface ShineOverlayProps {
  intensity: Exclude<EffectsConfig['shineOverlay'], 'none'>
  path: string
}

const SHINE_OPACITIES: Record<Exclude<EffectsConfig['shineOverlay'], 'none'>, number> = {
  subtle: 0.15,
  medium: 0.25,
  strong: 0.4,
}

export function ShineOverlay({ intensity, path }: ShineOverlayProps) {
  const opacity = SHINE_OPACITIES[intensity]
  return (
    <path
      d={path}
      fill="url(#shine-gradient)"
      fillOpacity={opacity}
      style={{ pointerEvents: 'none' }}
    />
  )
}

// Shine gradient definition
export function ShineGradientDef({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="white" stopOpacity="0.8" />
      <stop offset="50%" stopColor="white" stopOpacity="0.2" />
      <stop offset="100%" stopColor="white" stopOpacity="0" />
    </linearGradient>
  )
}
