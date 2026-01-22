'use client'

import type { PitchSlide } from '../../data/slides'
import { TitleSlide } from './title-slide'
import { ClosingSlide } from './closing-slide'
import { BulletSlide } from './bullet-slide'
import { StatSlide } from './stat-slide'
import { ChartSlide } from './chart-slide'
import { TeamSlide } from './team-slide'
import { LogoGridSlide } from './logo-grid-slide'

interface SlideContentProps {
  slide: PitchSlide
}

/**
 * Renders the appropriate slide variant based on slide type.
 */
export function SlideContent({ slide }: SlideContentProps) {
  switch (slide.type) {
    case 'title':
      return <TitleSlide slide={slide} />
    case 'closing':
      return <ClosingSlide slide={slide} />
    case 'bullet':
      return <BulletSlide slide={slide} />
    case 'stat':
      return <StatSlide slide={slide} />
    case 'chart':
      return <ChartSlide slide={slide} />
    case 'team':
      return <TeamSlide slide={slide} />
    case 'logo-grid':
      return <LogoGridSlide slide={slide} />
    default:
      return <TitleSlide slide={slide} />
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
