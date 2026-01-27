import { cx } from '@/components/utils/cx'
import type { OrderDetailsFeedConfig } from '../config/types'

/**
 * Build Tailwind classes from config
 */

export function buildShineClass(
  type: string,
  intensity: string,
  shadow: string
): string {
  if (type === 'none') return ''
  let shineClass = type
  if (intensity) shineClass += intensity
  if (shadow !== 'none') shineClass += `-shadow-${shadow}`
  return shineClass
}

export function buildBackgroundClass(background: string): string {
  return `bg-${background}`
}

export function buildCornerClass(corner: string): string {
  if (corner === 'round') return ''
  return `corner-${corner}`
}

export function buildDepthClass(depth: string): string {
  if (depth === 'none') return ''
  return depth
}

export function buildBorderClasses(
  showBorder: boolean,
  borderColor: string
): string {
  if (!showBorder) return ''
  return `border border-${borderColor}`
}

export function buildOuterClasses(config: OrderDetailsFeedConfig['outer']): string {
  return cx(
    buildBackgroundClass(config.background),
    buildShineClass(config.shine, config.shineIntensity, config.shadow),
    buildDepthClass(config.depth),
    buildCornerClass(config.corner),
    buildBorderClasses(config.border, config.borderColor)
  )
}

export function buildOuterStyles(config: OrderDetailsFeedConfig['outer']): React.CSSProperties {
  return {
    borderRadius: config.borderRadius,
    padding: config.padding,
  }
}

export function buildSummaryCardClasses(config: OrderDetailsFeedConfig['summaryCard']): string {
  return cx(
    buildBackgroundClass(config.background),
    buildShineClass(config.shine, config.shineIntensity, 'none'),
    'flex items-center justify-center'
  )
}

export function buildSummaryCardStyles(config: OrderDetailsFeedConfig['summaryCard']): React.CSSProperties {
  return {
    height: config.height,
    borderRadius: config.cornerRadius,
    display: config.visible ? 'flex' : 'none',
  }
}

export function getHeaderSizeClass(size: OrderDetailsFeedConfig['typography']['headerSize']): string {
  const sizeMap = {
    'sm': 'text-lg',
    'base': 'text-xl',
    'lg': 'text-2xl',
    'xl': 'text-3xl',
    '2xl': 'text-4xl',
  }
  return sizeMap[size]
}

export function getProductSizeClass(size: OrderDetailsFeedConfig['typography']['productSize']): string {
  const sizeMap = {
    'xs': 'text-xs',
    'sm': 'text-sm',
    'base': 'text-base',
    'lg': 'text-lg',
  }
  return sizeMap[size]
}

export function getMetricsSizeClass(size: OrderDetailsFeedConfig['typography']['metricsSize']): string {
  const sizeMap = {
    'xs': 'text-xs',
    'sm': 'text-sm',
    'base': 'text-base',
  }
  return sizeMap[size]
}

export function getMessageSizeClass(size: OrderDetailsFeedConfig['typography']['messageSize']): string {
  const sizeMap = {
    'base': 'text-base',
    'lg': 'text-lg',
    'xl': 'text-xl',
  }
  return sizeMap[size]
}

export function getSpacingValue(spacing: OrderDetailsFeedConfig['layout']['spacing']): {
  innerPadding: number
  sectionGap: string
  itemGap: string
} {
  switch (spacing) {
    case 'compact':
      return {
        innerPadding: 24,
        sectionGap: 'space-y-4',
        itemGap: 'gap-4',
      }
    case 'spacious':
      return {
        innerPadding: 40,
        sectionGap: 'space-y-10',
        itemGap: 'gap-8',
      }
    default:
      return {
        innerPadding: 32,
        sectionGap: 'space-y-8',
        itemGap: 'gap-6',
      }
  }
}