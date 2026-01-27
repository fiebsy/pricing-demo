'use client'

import { motion } from 'motion/react'
import { contentDelays } from '../../lib/animations'
import { slideTypography } from '../../lib/typography'
import { SlideLayout } from '../slide-layout'
import { PayvaWordmark } from '../payva-wordmark'
import type { SlideProps } from './index'

export function TitleSlide({
  slide,
  variant,
  slideNumber,
  totalSlides,
  isLightMode,
}: SlideProps) {
  return (
    <SlideLayout
      variant={variant}
      label={slide.label}
      slideNumber={slideNumber}
      totalSlides={totalSlides}
      isLightMode={isLightMode}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: contentDelays.title }}
        >
          <PayvaWordmark width={280} className="text-primary" />
        </motion.div>

        {slide.subtitle && (
          <motion.p
            className={`${slideTypography.heroSubtitle} mb-4`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: contentDelays.subtitle + 0.1 }}
          >
            {slide.subtitle}
          </motion.p>
        )}

        {slide.description && (
          <motion.p
            className={`${slideTypography.body} max-w-2xl`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: contentDelays.description + 0.1 }}
          >
            {slide.description}
          </motion.p>
        )}
      </div>
    </SlideLayout>
  )
}
