'use client'

import type { PitchSlide, SlideVariant } from '../../data'
import { TitleSlide } from './title-slide'
import { ClosingSlide } from './closing-slide'
import { BulletSlide } from './bullet-slide'
import { StatSlide } from './stat-slide'
import { ChartSlide } from './chart-slide'
import { TeamSlide } from './team-slide'
import { LogoGridSlide } from './logo-grid-slide'

export interface SlideProps {
  slide: PitchSlide
  variant: SlideVariant
  slideNumber: number
  totalSlides: number
  isLightMode: boolean
}

interface SlideContentProps {
  slide: PitchSlide
  variant: SlideVariant
  slideNumber: number
  totalSlides: number
  isLightMode: boolean
}

/**
 * Renders the appropriate slide variant based on slide type.
 */
export function SlideContent({
  slide,
  variant,
  slideNumber,
  totalSlides,
  isLightMode,
}: SlideContentProps) {
  const props: SlideProps = { slide, variant, slideNumber, totalSlides, isLightMode }

  switch (slide.type) {
    case 'title':
      return <TitleSlide {...props} />
    case 'closing':
      return <ClosingSlide {...props} />
    case 'bullet':
      return <BulletSlide {...props} />
    case 'stat':
      return <StatSlide {...props} />
    case 'chart':
      return <ChartSlide {...props} />
    case 'team':
      return <TeamSlide {...props} />
    case 'logo-grid':
      return <LogoGridSlide {...props} />
    default:
      return <TitleSlide {...props} />
  }
}

export {
  TitleSlide,
  ClosingSlide,
  BulletSlide,
  StatSlide,
  ChartSlide,
  TeamSlide,
  LogoGridSlide,
}
