/**
 * Modal Class Builder Utilities
 *
 * Build CSS classes and animation variants from config
 */

import { cn } from '@/lib/utils'
import type { ModalPlaygroundConfig, AnimationConfig, CloseButtonConfig } from '../config/types'

// ============================================================================
// Container Classes
// ============================================================================

export function buildContainerClasses(config: ModalPlaygroundConfig): string {
  const { container } = config

  // Background
  const bgClass =
    container.background === 'primary'
      ? 'bg-primary'
      : container.background === 'secondary'
        ? 'bg-secondary'
        : 'bg-tertiary'

  // Corner shape (squircle removed)
  const cornerClass = ''

  // Shine
  const shineClass = container.shine !== 'none' ? container.shine : ''

  // Depth
  const depthClass = container.depth !== 'none' ? container.depth : ''

  // Shadow
  const shadowClass =
    container.shadow !== 'none'
      ? `shadow-${container.shadow}`
      : ''

  return cn(bgClass, cornerClass, shineClass, depthClass, shadowClass)
}

function getDropShadowValue(size: string): string {
  const values: Record<string, string> = {
    sm: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))',
    md: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
    lg: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',
    xl: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))',
    '2xl': 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))',
  }
  return values[size] || ''
}

export function buildContainerStyles(config: ModalPlaygroundConfig): React.CSSProperties {
  const { container } = config

  const borderColor =
    container.borderColor === 'transparent'
      ? 'transparent'
      : `var(--color-${container.borderColor})`

  // Drop shadow filter
  const dropShadowFilter =
    container.dropShadow !== 'none' ? getDropShadowValue(container.dropShadow) : undefined

  return {
    width: container.width,
    minHeight: container.minHeight,
    maxHeight: container.maxHeight,
    padding: container.padding,
    gap: container.gap,
    borderRadius: container.borderRadius,
    borderWidth: container.borderWidth,
    borderStyle: container.borderWidth > 0 ? 'solid' : 'none',
    borderColor,
    filter: dropShadowFilter,
    // Allow absolute-positioned children (like expanded pricing select) to overflow
    overflow: 'visible',
  }
}

// ============================================================================
// Animation Variants
// ============================================================================

export interface AnimationVariants {
  initial: Record<string, number>
  animate: Record<string, number>
  exit: Record<string, number>
}

export function buildAnimationVariants(animation: AnimationConfig): AnimationVariants {
  const { preset, scale, translateY } = animation

  switch (preset) {
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

    case 'flip-3d':
      return {
        initial: { opacity: 0, rotateX: -15, scale: 0.9 },
        animate: { opacity: 1, rotateX: 0, scale: 1 },
        exit: { opacity: 0, rotateX: 15, scale: 0.9 },
      }

    case 'bounce':
      return {
        initial: { opacity: 0, scale: 0.3, y: -50 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.3, y: 50 },
      }

    case 'custom':
      return {
        initial: {
          opacity: 0,
          scale: scale.initial,
          y: translateY.initial,
        },
        animate: {
          opacity: 1,
          scale: scale.animate,
          y: translateY.animate,
        },
        exit: {
          opacity: 0,
          scale: scale.initial,
          y: translateY.initial,
        },
      }

    default:
      return {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
      }
  }
}

export function buildSpringTransition(animation: AnimationConfig, slowMo: boolean) {
  const durationSeconds = (animation.duration / 1000) * (slowMo ? 4 : 1)

  return {
    type: 'spring' as const,
    duration: durationSeconds,
    bounce: animation.bounce,
    delay: animation.delay / 1000,
  }
}

// ============================================================================
// Title Typography Classes
// ============================================================================

export function buildTitleClasses(config: ModalPlaygroundConfig): string {
  const { header } = config
  const { title } = header

  const sizeClass =
    title.size === 'sm'
      ? 'text-sm'
      : title.size === 'md'
        ? 'text-base'
        : title.size === 'lg'
          ? 'text-lg'
          : 'text-xl'

  const weightClass =
    title.weight === '400'
      ? 'font-normal'
      : title.weight === '500'
        ? 'font-medium'
        : title.weight === '600'
          ? 'font-semibold'
          : 'font-bold'

  const colorClass = title.color

  return cn(sizeClass, weightClass, colorClass)
}

// ============================================================================
// Subheader Typography Classes
// ============================================================================

export function buildSubheaderClasses(config: ModalPlaygroundConfig): string {
  const { header } = config
  const { subheader } = header

  const sizeClass =
    subheader.size === 'xs'
      ? 'text-xs'
      : subheader.size === 'sm'
        ? 'text-sm'
        : 'text-base'

  const weightClass =
    subheader.weight === '400'
      ? 'font-normal'
      : subheader.weight === '500'
        ? 'font-medium'
        : subheader.weight === '600'
          ? 'font-semibold'
          : 'font-bold'

  const colorClass = subheader.color

  return cn(sizeClass, weightClass, colorClass)
}

// ============================================================================
// Content Text Classes
// ============================================================================

export function buildContentTextClasses(
  config: ModalPlaygroundConfig,
  section: 'contentTop' | 'contentBottom'
): string {
  const { text } = config[section]

  const sizeClass =
    text.size === 'xs'
      ? 'text-xs'
      : text.size === 'sm'
        ? 'text-sm'
        : 'text-base'

  const weightClass =
    text.weight === '400'
      ? 'font-normal'
      : text.weight === '500'
        ? 'font-medium'
        : text.weight === '600'
          ? 'font-semibold'
          : 'font-bold'

  const colorClass = text.color

  return cn(sizeClass, weightClass, colorClass)
}

// ============================================================================
// Button Layout Classes
// ============================================================================

export function buildButtonLayoutClasses(config: ModalPlaygroundConfig): string {
  const { buttons } = config

  const directionClass =
    buttons.layout === 'horizontal'
      ? 'flex-row'
      : buttons.layout === 'horizontal-reverse'
        ? 'flex-row-reverse'
        : 'flex-col'

  return cn('flex', directionClass)
}

// ============================================================================
// Close Button Classes
// ============================================================================

export function buildCloseButtonSizeClasses(size: 'sm' | 'md' | 'lg'): string {
  switch (size) {
    case 'sm':
      return 'h-6 w-6'
    case 'md':
      return 'h-8 w-8'
    case 'lg':
      return 'h-10 w-10'
  }
}

export function buildCloseButtonIconSize(size: 'sm' | 'md' | 'lg'): number {
  switch (size) {
    case 'sm':
      return 14
    case 'md':
      return 18
    case 'lg':
      return 22
  }
}

export function buildCloseButtonClasses(closeButton: CloseButtonConfig): string {
  const { backgroundMode, backgroundColor, backgroundOpacity, backgroundRadius } = closeButton

  // Build radius class
  const radiusClass = backgroundRadius === 'full' ? 'rounded-full' : `rounded-${backgroundRadius}`

  if (backgroundMode === 'none') {
    // No background, just icon with hover color change
    return cn(radiusClass, 'text-secondary hover:text-primary')
  }

  if (backgroundMode === 'hover') {
    // Background only visible on hover
    return cn(
      radiusClass,
      'text-secondary hover:text-primary',
      `hover:${backgroundColor}/${backgroundOpacity}`
    )
  }

  // 'always' - background always visible
  return cn(
    radiusClass,
    `${backgroundColor}/${backgroundOpacity}`,
    'text-secondary hover:text-primary',
    `hover:${backgroundColor}`
  )
}
