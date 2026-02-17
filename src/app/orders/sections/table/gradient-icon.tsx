/**
 * Gradient Icon Utility
 *
 * Renders Hugeicons with gradient fills using CSS mask technique.
 */

import { cn } from '@/lib/utils'

type HugeIconData = Array<[string, Record<string, string>]>

/**
 * Convert Hugeicons array format to SVG string
 */
function hugeIconToSvg(iconData: HugeIconData, size: number = 24): string {
  const paths = iconData
    .map(([tag, attrs]) => {
      const attrString = Object.entries(attrs)
        .filter(([key]) => key !== 'key')
        .map(([key, value]) => {
          // Replace currentColor with white for mask (needs to be opaque)
          const val = value === 'currentColor' ? '#000' : value
          return `${key}="${val}"`
        })
        .join(' ')
      return `<${tag} ${attrString}/>`
    })
    .join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}">${paths}</svg>`
}

/**
 * Convert SVG string to data URL
 */
function svgToDataUrl(svg: string): string {
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22')
  return `url("data:image/svg+xml,${encoded}")`
}

export type GradientPreset = 'neutral' | 'brand' | 'success' | 'warning' | 'purple' | 'ocean'

const GRADIENT_CLASSES: Record<GradientPreset, string> = {
  neutral: 'bg-utility-gray-500',
  brand: 'bg-gradient-to-br from-brand-500 to-brand-700',
  success: 'bg-gradient-to-br from-success-500 to-success-700',
  warning: 'bg-gradient-to-br from-warning-500 to-warning-600',
  purple: 'bg-gradient-to-br from-brand-500 to-purple-600',
  ocean: 'bg-gradient-to-br from-cyan-500 to-brand-600',
}

interface GradientIconProps {
  icon: HugeIconData
  size?: number
  gradient: GradientPreset
  className?: string
}

/**
 * Renders a Hugeicon with a gradient fill using CSS mask
 */
export function GradientIcon({ icon, size = 14, gradient, className }: GradientIconProps) {
  const svg = hugeIconToSvg(icon, size)
  const maskUrl = svgToDataUrl(svg)

  return (
    <div
      className={cn('shrink-0', GRADIENT_CLASSES[gradient], className)}
      style={{
        width: size,
        height: size,
        WebkitMaskImage: maskUrl,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        maskImage: maskUrl,
        maskRepeat: 'no-repeat',
        maskSize: 'contain',
      }}
    />
  )
}
