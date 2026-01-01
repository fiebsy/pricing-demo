/**
 * Base UI Menu - Reveal Animation Hook
 *
 * Generates CSS keyframe animations for the reveal effect when menu opens.
 *
 * @module base-ui/menu/hooks/use-reveal-animation
 */

import { useMemo, useRef } from 'react'
import type { RevealAnimationConfig, MenuSide, MenuAlign } from '../types'
import { getTransformOrigin as getTransformOriginConfig } from '../config'

interface UseRevealAnimationOptions {
  /** Whether the menu is open */
  isOpen: boolean
  /** Reveal animation configuration */
  revealConfig: RevealAnimationConfig
  /** Menu side */
  side: MenuSide
  /** Menu alignment */
  align: MenuAlign
  /** Animation key for forcing re-animation */
  animationKey: number
}

interface UseRevealAnimationReturn {
  /** Unique class name for CSS targeting */
  uniqueClass: string
  /** Generated CSS string to inject */
  animationCss: string
  /** Computed transform origin */
  transformOrigin: string
}

/**
 * Hook for generating reveal animation CSS
 */
export function useRevealAnimation({
  isOpen,
  revealConfig,
  side,
  align,
  animationKey,
}: UseRevealAnimationOptions): UseRevealAnimationReturn {
  const wrapperIdRef = useRef(`base-ui-menu-${Math.random().toString(36).substr(2, 9)}`)
  const wrapperId = wrapperIdRef.current
  const uniqueClass = `base-ui-menu-content-${wrapperId}`

  // ============================================================================
  // Transform Origin Calculation
  // ============================================================================

  const transformOrigin = useMemo(() => {
    const { direction } = revealConfig

    if (direction === 'center') {
      return 'center center'
    }

    return getTransformOriginConfig(side, align)
  }, [revealConfig.direction, side, align])

  // ============================================================================
  // CSS Generation
  // ============================================================================

  const animationCss = useMemo(() => {
    if (!isOpen) return ''

    const {
      duration,
      easing,
      contentAnimation,
      contentDelay,
      scaleStart,
      scaleEnd,
      opacityStart = 0,
      opacityEnd = 1,
      includeOpacity = true,
      opacityDelay = 0,
    } = revealConfig

    const scaleKeyframeName = `base-ui-reveal-scale-${wrapperId}-${animationKey}`
    const opacityKeyframeName = `base-ui-reveal-opacity-${wrapperId}-${animationKey}`

    const scaleAnimation = `${scaleKeyframeName} ${duration}ms ${easing} both`
    const opacityAnimation = includeOpacity
      ? `, ${opacityKeyframeName} ${duration}ms ${easing} ${opacityDelay}ms both`
      : ''

    // Target Base UI's data-open attribute
    let css = `
      .${uniqueClass}[data-open] {
        transform-origin: ${transformOrigin} !important;
        animation: ${scaleAnimation}${opacityAnimation} !important;
        will-change: transform${includeOpacity ? ', opacity' : ''};
      }

      @keyframes ${scaleKeyframeName} {
        from { transform: scale(${scaleStart}); }
        to { transform: scale(${scaleEnd}); }
      }

      @keyframes ${opacityKeyframeName} {
        from { opacity: ${opacityStart}; }
        to { opacity: ${opacityEnd}; }
      }
    `

    // Content animation
    const contentKeyframeName = `base-ui-reveal-content-${wrapperId}-${animationKey}`
    const innerSelector = `.${uniqueClass}[data-open] > div`

    let contentInitialState = ''
    let contentKeyframes = ''

    switch (contentAnimation) {
      case 'normal':
        contentInitialState = `
          transform: scale(${1 / scaleStart});
          opacity: 1;
        `
        contentKeyframes = `
          @keyframes ${contentKeyframeName} {
            from { transform: scale(${1 / scaleStart}); opacity: 1; }
            to { transform: scale(${1 / scaleEnd}); opacity: 1; }
          }
        `
        break

      case 'fade':
        contentInitialState = `
          transform: scale(1);
          opacity: 0;
        `
        contentKeyframes = `
          @keyframes ${contentKeyframeName} {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `
        break

      case 'scale-with':
        contentInitialState = `
          transform: scale(${scaleStart});
          opacity: 1;
        `
        contentKeyframes = `
          @keyframes ${contentKeyframeName} {
            from { transform: scale(${scaleStart}); opacity: 1; }
            to { transform: scale(${scaleEnd}); opacity: 1; }
          }
        `
        break

      case 'scale-opposite':
        const oppositeStart = 1 / scaleStart
        const oppositeEnd = 1 / scaleEnd
        contentInitialState = `
          transform: scale(${oppositeStart});
          opacity: 1;
        `
        contentKeyframes = `
          @keyframes ${contentKeyframeName} {
            from { transform: scale(${oppositeStart}); opacity: 1; }
            to { transform: scale(${oppositeEnd}); opacity: 1; }
          }
        `
        break
    }

    if (contentKeyframes) {
      css += `
        ${innerSelector} {
          transform-origin: ${transformOrigin} !important;
          ${contentInitialState}
          animation: ${contentKeyframeName} ${duration}ms ${easing} ${contentDelay}ms forwards !important;
          will-change: transform;
          backface-visibility: hidden;
        }
        ${contentKeyframes}
      `
    }

    return css
  }, [isOpen, wrapperId, animationKey, revealConfig, transformOrigin, uniqueClass])

  return {
    uniqueClass,
    animationCss,
    transformOrigin,
  }
}
