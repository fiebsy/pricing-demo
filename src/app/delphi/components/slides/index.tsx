'use client'

import type { Slide } from '../../data/slides'
import { TextSlide } from './text-slide'
import { ImageSlide } from './image-slide'
import { TextGridSlide } from './text-grid-slide'
import { DualImageSlide } from './dual-image-slide'
import { ButtonSlide } from './button-slide'

interface SlideContentProps {
  slide: Slide
}

/**
 * Renders the appropriate slide variant based on slide type.
 * Add new slide types here.
 */
export function SlideContent({ slide }: SlideContentProps) {
  switch (slide.type) {
    case 'image':
      return <ImageSlide slide={slide} />
    case 'text-grid':
      return <TextGridSlide slide={slide} />
    case 'dual-image':
      return <DualImageSlide slide={slide} />
    case 'button':
      return <ButtonSlide slide={slide} />
    case 'text':
    default:
      return <TextSlide slide={slide} />
  }
}

export { TextSlide, ImageSlide, TextGridSlide, DualImageSlide, ButtonSlide }
