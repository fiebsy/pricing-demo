import { cn } from '@/lib/utils'
import type { SlideCardConfig } from '../config/types'

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
  if (shadow !== 'none' && shadow) {
    shineClass += `-shadow-${shadow}`
  }
  return shineClass
}

export function buildBackgroundClass(
  background: string,
  useGradient: boolean,
  gradientFrom: string,
  gradientTo: string
): string {
  if (useGradient && gradientFrom !== gradientTo) {
    return `bg-gradient-to-br from-${gradientFrom} to-${gradientTo}`
  }
  return background === 'transparent' ? 'bg-transparent' : `bg-${background}`
}

export function buildCornerClass(corner: string): string {
  if (corner === 'round') return ''
  return `corner-${corner}`
}

export function buildDepthClass(depth: string): string {
  if (depth === 'none') return ''
  return depth
}

export function buildShadowClass(shadow: string): string {
  if (shadow === 'none' || !shadow) return ''
  return `shadow-${shadow}`
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

export function buildCardClasses(config: SlideCardConfig['card']): string {
  return cn(
    buildBackgroundClass(
      config.background,
      config.backgroundGradient,
      config.gradientFrom,
      config.gradientTo
    ),
    buildShineClass(config.shine, config.shineIntensity, config.shadow),
    buildDepthClass(config.depth),
    buildCornerClass(config.corner),
    buildShadowClass(config.shadow),
    buildBorderClasses(config.border, config.borderColor, config.borderWidth)
  )
}

export function buildCardStyles(config: SlideCardConfig['card']): React.CSSProperties {
  return {
    borderRadius: config.borderRadius,
    padding: config.padding,
  }
}

export function buildLayoutStyles(config: SlideCardConfig['layout']): React.CSSProperties {
  const styles: React.CSSProperties = {}

  if (config.width === 'full') {
    styles.width = '100%'
  } else if (config.width === 'fixed') {
    styles.width = config.minWidth
  }

  if (config.height === 'full') {
    styles.height = '100%'
  } else if (config.height === 'fixed') {
    styles.height = config.minHeight
  }

  styles.minWidth = config.minWidth
  styles.maxWidth = config.maxWidth
  styles.minHeight = config.minHeight

  return styles
}

export function getAnimationVariants(config: SlideCardConfig['animation']) {
  const initial: any = { opacity: 0 }
  const animate: any = { opacity: 1 }

  switch (config.type) {
    case 'scale':
      initial.scale = 0.95
      animate.scale = 1
      break
    case 'slideUp':
      initial.y = 20
      animate.y = 0
      break
    case 'slideDown':
      initial.y = -20
      animate.y = 0
      break
    // 'fade' is default, no additional properties needed
  }

  return { initial, animate }
}

export function getAnimationTransition(config: SlideCardConfig['animation']) {
  const transition: any = {
    duration: config.duration / 1000,
    delay: config.delay / 1000,
  }

  switch (config.easing) {
    case 'easeOut':
      transition.ease = 'easeOut'
      break
    case 'easeInOut':
      transition.ease = 'easeInOut'
      break
    case 'linear':
      transition.ease = 'linear'
      break
    case 'spring':
      transition.type = 'spring'
      transition.stiffness = 100
      transition.damping = 15
      delete transition.ease
      break
  }

  return transition
}