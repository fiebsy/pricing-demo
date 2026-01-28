import { cn } from '@/lib/utils'
import type { DeckSlideCardConfig } from '../config/types'

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

export function buildBackgroundClass(background: string, gradientConfig?: {
  from?: string
  to?: string
  direction?: string
}): string {
  if (background === 'gradient' && gradientConfig?.from && gradientConfig?.to) {
    const direction = gradientConfig.direction || 'to-br'
    return `bg-gradient-${direction} from-${gradientConfig.from} to-${gradientConfig.to}`
  }
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
  borderColor: string,
  borderWidth: number
): string {
  if (!showBorder) return ''
  const widthClass = borderWidth === 1 ? 'border' : `border-${borderWidth}`
  return `${widthClass} border-${borderColor}`
}

export function buildShadowClass(shadow: string): string {
  if (shadow === 'none') return ''
  return `shadow-${shadow}`
}

export function buildTextClass(color: string, prefix: string = 'text'): string {
  return `${prefix}-${color}`
}

export function buildTextSizeClass(size: string): string {
  if (size.startsWith('display-')) {
    return `text-${size}`
  }
  return `text-${size}`
}

export function buildOuterClasses(config: DeckSlideCardConfig['outer']): string {
  return cn(
    buildBackgroundClass(config.background, {
      from: config.gradientFrom,
      to: config.gradientTo,
      direction: config.gradientDirection
    }),
    buildShineClass(config.shine, config.shineIntensity, config.shadow),
    buildDepthClass(config.depth),
    buildCornerClass(config.corner),
    buildBorderClasses(config.border, config.borderColor, config.borderWidth || 1),
    buildShadowClass(config.shadow)
  )
}

export function buildOuterStyles(config: DeckSlideCardConfig['outer']): React.CSSProperties {
  return {
    borderRadius: `${config.borderRadius}px`,
    padding: `${config.padding}px`,
  }
}

export function buildLayoutClasses(config: DeckSlideCardConfig['layout']): string {
  const classes: string[] = []
  
  if (config.width === 'full') {
    classes.push('w-full')
  } else if (config.width === 'auto') {
    classes.push('w-auto')
  }
  
  if (config.height === 'full') {
    classes.push('h-full')
  } else if (config.height === 'auto') {
    classes.push('h-auto')
  }
  
  if (config.aspectRatio && config.aspectRatio !== 'auto') {
    classes.push(`aspect-[${config.aspectRatio.replace('/', '/')}]`)
  }
  
  return cn(...classes)
}

export function buildLayoutStyles(config: DeckSlideCardConfig['layout']): React.CSSProperties {
  const styles: React.CSSProperties = {}
  
  if (config.minWidth) {
    styles.minWidth = `${config.minWidth}px`
  }
  
  if (config.minHeight) {
    styles.minHeight = `${config.minHeight}px`
  }
  
  if (config.width === 'fixed' && config.minWidth) {
    styles.width = `${config.minWidth}px`
  }
  
  if (config.height === 'fixed' && config.minHeight) {
    styles.height = `${config.minHeight}px`
  }
  
  return styles
}

export function buildPrintClasses(config: DeckSlideCardConfig['export']): string {
  const classes: string[] = []
  
  if (config.printOptimized) {
    classes.push('print-optimized')
  }
  
  if (config.forceLight) {
    classes.push('force-light-mode')
  }
  
  if (config.viewportScaling) {
    classes.push('pdf-export-mode')
  }
  
  return cn(...classes)
}

export function buildContentClasses(config: DeckSlideCardConfig['content']): {
  title: string
  label: string
  subtext: string
} {
  return {
    title: cn(
      buildTextClass(config.titleColor),
      buildTextSizeClass(config.titleSize),
      'font-display'
    ),
    label: cn(
      buildTextClass(config.labelColor),
      buildTextSizeClass(config.labelSize)
    ),
    subtext: cn(
      buildTextClass(config.subtextColor),
      buildTextSizeClass(config.subtextSize),
      'opacity-80'
    ),
  }
}