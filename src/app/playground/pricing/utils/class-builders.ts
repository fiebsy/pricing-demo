/**
 * Pricing Modal Class Builder Utilities
 *
 * Build CSS classes and styles from config.
 */

import { cn } from '@/lib/utils'
import type {
  PricingPlaygroundConfig,
  AnimationConfig,
  CloseButtonConfig,
  RadialFlareColor,
  RadialFlareItem,
  NoiseDecorationConfig,
  SparklesDecorationConfig,
  RingsDecorationConfig,
} from '../config/types'

// ============================================================================
// Container Classes
// ============================================================================

export function buildContainerClasses(config: PricingPlaygroundConfig): string {
  const { container } = config

  const bgClass = `bg-${container.background}`
  const cornerClass = ''
  const depthClass = container.depth !== 'none' ? container.depth : ''

  // Handle shine + shadow combination
  // Both use box-shadow, so we need combined utilities to prevent override
  const hasShine = container.shine !== 'none'
  const hasShadow = container.shadow !== 'none'

  let effectClass = ''

  if (hasShine && hasShadow) {
    // Map shadow sizes to available combined utility suffixes
    // Combined utilities only exist for xs, sm, md, lg
    const shadowSuffix =
      container.shadow === 'xl' || container.shadow === '2xl'
        ? 'lg' // Fall back to lg for larger shadows
        : container.shadow

    // Use combined utility: e.g., "shine-3-shadow-lg"
    effectClass = `${container.shine}-shadow-${shadowSuffix}`
  } else if (hasShine) {
    effectClass = container.shine
  } else if (hasShadow) {
    effectClass = `shadow-${container.shadow}`
  }

  return cn(bgClass, cornerClass, depthClass, effectClass)
}

export function buildContainerStyles(config: PricingPlaygroundConfig): React.CSSProperties {
  const { container } = config

  const borderColor =
    container.borderColor === 'transparent'
      ? 'transparent'
      : `var(--color-${container.borderColor})`

  return {
    width: container.width,
    height: container.height,
    padding: container.padding,
    gap: container.gap,
    borderRadius: container.borderRadius,
    borderWidth: container.borderWidth,
    borderStyle: container.borderWidth > 0 ? 'solid' : 'none',
    borderColor,
    overflow: 'visible',
  }
}

// ============================================================================
// Animation Variants
// ============================================================================

export function buildAnimationVariants(animation: AnimationConfig) {
  switch (animation.preset) {
    case 'scale-fade':
      return {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
      }
    case 'slide-up':
      return {
        initial: { opacity: 0, y: 100 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 100 },
      }
    case 'slide-down':
      return {
        initial: { opacity: 0, y: -100 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -100 },
      }
    default:
      return {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
      }
  }
}

export function buildSpringTransition(animation: AnimationConfig) {
  return {
    type: 'spring' as const,
    duration: animation.duration / 1000,
    bounce: animation.bounce,
  }
}

// ============================================================================
// Typography Classes
// ============================================================================

export function buildTitleClasses(config: PricingPlaygroundConfig): string {
  const { header } = config

  const sizeMap: Record<string, string> = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
  }
  const sizeClass = sizeMap[header.titleSize] || 'text-xl'

  const weightMap: Record<string, string> = {
    '300': 'font-light',
    '400': 'font-normal',
    '500': 'font-medium',
    '600': 'font-semibold',
    '700': 'font-bold',
    '800': 'font-extrabold',
  }
  const weightClass = weightMap[header.titleWeight] || 'font-semibold'

  return cn(sizeClass, weightClass, header.titleColor)
}

export function buildSubheaderClasses(config: PricingPlaygroundConfig): string {
  const { header } = config

  const sizeMap: Record<string, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }
  const sizeClass = sizeMap[header.subheaderSize] || 'text-sm'

  const weightMap: Record<string, string> = {
    '300': 'font-light',
    '400': 'font-normal',
    '500': 'font-medium',
    '600': 'font-semibold',
    '700': 'font-bold',
    '800': 'font-extrabold',
  }
  const weightClass = weightMap[header.subheaderWeight] || 'font-normal'

  return cn(sizeClass, weightClass, header.subheaderColor)
}

// ============================================================================
// Close Button Classes
// ============================================================================

export function buildCloseButtonSizeClasses(size: 'sm' | 'md' | 'lg'): string {
  switch (size) {
    case 'sm': return 'h-6 w-6'
    case 'md': return 'h-8 w-8'
    case 'lg': return 'h-10 w-10'
  }
}

export function buildCloseButtonIconSize(size: 'sm' | 'md' | 'lg'): number {
  switch (size) {
    case 'sm': return 14
    case 'md': return 18
    case 'lg': return 22
  }
}

export function buildCloseButtonClasses(closeButton: CloseButtonConfig): string {
  const { backgroundMode, backgroundColor, backgroundOpacity, backgroundRadius } = closeButton

  const radiusClass = backgroundRadius === 'full' ? 'rounded-full' : `rounded-${backgroundRadius}`

  if (backgroundMode === 'none') {
    return cn(radiusClass, 'text-secondary hover:text-primary')
  }

  if (backgroundMode === 'hover') {
    return cn(
      radiusClass,
      'text-secondary hover:text-primary',
      `hover:${backgroundColor}/${backgroundOpacity}`
    )
  }

  return cn(
    radiusClass,
    `${backgroundColor}/${backgroundOpacity}`,
    'text-secondary hover:text-primary',
    `hover:${backgroundColor}`
  )
}

// ============================================================================
// Radial Flare Utilities
// ============================================================================

const FLARE_COLOR_MAP: Record<RadialFlareColor, string> = {
  white: '#ffffff',
  'gray-200': '#e5e7eb',
  'gray-300': '#d1d5db',
  'gray-400': '#9ca3af',
  'blue-400': '#60a5fa',
  'blue-500': '#3b82f6',
  'blue-600': '#2563eb',
  'sky-400': '#38bdf8',
  'sky-500': '#0ea5e9',
}

export function getFlareColorValue(color: RadialFlareColor): string {
  return FLARE_COLOR_MAP[color] || '#ffffff'
}

export function buildFlareStyle(flare: RadialFlareItem): React.CSSProperties | null {
  if (!flare.enabled) return null

  const colorHex = getFlareColorValue(flare.color)

  return {
    position: 'absolute',
    top: 0,
    right: 0,
    width: flare.size,
    height: flare.size,
    borderRadius: '50%',
    background: `radial-gradient(circle, ${colorHex} 0%, transparent 70%)`,
    opacity: flare.opacity / 100,
    filter: `blur(${flare.blur}px)`,
    transform: `translate(${flare.offsetX}px, ${flare.offsetY}px)`,
    pointerEvents: 'none',
  }
}

// ============================================================================
// Decoration Utilities
// ============================================================================

/** Generate SVG noise filter */
export function generateNoiseFilter(id: string, scale: number): string {
  return `
    <filter id="${id}">
      <feTurbulence type="fractalNoise" baseFrequency="${0.6 / scale}" numOctaves="4" stitchTiles="stitch" result="noise"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
  `
}

/** Build noise decoration styles */
export function buildNoiseStyles(config: NoiseDecorationConfig): React.CSSProperties {
  return {
    position: 'absolute',
    inset: 0,
    opacity: config.opacity / 100,
    mixBlendMode: config.blendMode,
    pointerEvents: 'none',
    maskImage: config.radialFade > 0
      ? `radial-gradient(ellipse at top right, black 0%, transparent ${100 - config.radialFade}%)`
      : undefined,
    WebkitMaskImage: config.radialFade > 0
      ? `radial-gradient(ellipse at top right, black 0%, transparent ${100 - config.radialFade}%)`
      : undefined,
  }
}

/** Generate sparkle positions (deterministic based on count) */
export function generateSparklePositions(count: number, spread: number, sizeVariation: number, baseSize: number): Array<{ x: number; y: number; size: number; rotation: number }> {
  const positions: Array<{ x: number; y: number; size: number; rotation: number }> = []

  // Use golden angle for nice distribution
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < count; i++) {
    // Spiral distribution from corner
    const t = i / count
    const radius = spread * Math.sqrt(t) * 0.8
    const angle = i * goldenAngle - Math.PI / 4 // Start from top-right diagonal

    const x = radius * Math.cos(angle)
    const y = radius * Math.sin(angle)

    // Size variation
    const variationFactor = 1 - (sizeVariation / 100) * (0.5 + 0.5 * Math.sin(i * 2.5))
    const size = baseSize * variationFactor

    // Random-ish rotation
    const rotation = (i * 137.5) % 360

    positions.push({ x, y, size, rotation })
  }

  return positions
}

/** Generate 4-point star SVG path */
export function generateStarPath(size: number): string {
  const outer = size / 2
  const inner = size / 6

  return `M ${outer} 0 L ${inner} ${inner} L 0 ${outer} L ${inner} ${size - inner} L ${outer} ${size} L ${size - inner} ${size - inner} L ${size} ${outer} L ${size - inner} ${inner} Z`
}

/** Build sparkles decoration styles */
export function buildSparklesContainerStyles(config: SparklesDecorationConfig): React.CSSProperties {
  return {
    position: 'absolute',
    top: 0,
    right: 0,
    width: config.spread * 2,
    height: config.spread * 2,
    transform: 'translate(50%, -50%)',
    pointerEvents: 'none',
    opacity: config.opacity / 100,
    maskImage: config.radialFade > 0
      ? `radial-gradient(circle at center, black 0%, transparent ${100 - config.radialFade}%)`
      : undefined,
    WebkitMaskImage: config.radialFade > 0
      ? `radial-gradient(circle at center, black 0%, transparent ${100 - config.radialFade}%)`
      : undefined,
  }
}

/** Generate ring arc path */
export function generateRingArc(radius: number, arcAngle: number): string {
  // Arc starts from top and goes clockwise
  const startAngle = -90 // Top
  const endAngle = startAngle + arcAngle

  const startRad = (startAngle * Math.PI) / 180
  const endRad = (endAngle * Math.PI) / 180

  const x1 = radius + radius * Math.cos(startRad)
  const y1 = radius + radius * Math.sin(startRad)
  const x2 = radius + radius * Math.cos(endRad)
  const y2 = radius + radius * Math.sin(endRad)

  const largeArc = arcAngle > 180 ? 1 : 0

  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`
}

/** Build rings decoration styles */
export function buildRingsContainerStyles(config: RingsDecorationConfig): React.CSSProperties {
  const maxRadius = config.startRadius + (config.count - 1) * config.gap
  const containerSize = (maxRadius + config.strokeWidth) * 2 + 20

  return {
    position: 'absolute',
    top: 0,
    right: 0,
    width: containerSize,
    height: containerSize,
    transform: 'translate(50%, -50%)',
    pointerEvents: 'none',
    opacity: config.opacity / 100,
    maskImage: config.radialFade > 0
      ? `radial-gradient(circle at center, black 0%, transparent ${100 - config.radialFade}%)`
      : undefined,
    WebkitMaskImage: config.radialFade > 0
      ? `radial-gradient(circle at center, black 0%, transparent ${100 - config.radialFade}%)`
      : undefined,
  }
}
