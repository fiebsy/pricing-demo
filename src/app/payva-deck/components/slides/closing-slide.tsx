'use client'

import { motion } from 'motion/react'
import { contentDelays } from '../../lib/animations'
import { slideTypography } from '../../lib/typography'
import { slideSpacing } from '../../lib/spacing'
import { SlideLayout } from '../slide-layout'
import { PayvaWordmark } from '../payva-wordmark'
import type { SlideProps } from './index'

export function ClosingSlide({
  slide,
  variant,
  slideNumber,
  totalSlides,
  isLightMode,
}: SlideProps) {
  const ctaUrl = slide.closingConfig?.ctaUrl

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
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: contentDelays.title }}
        >
          <PayvaWordmark width={280} className="text-primary" />
        </motion.div>

        {slide.description && (
          <motion.p
            className={`${slideTypography.description} max-w-2xl`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: contentDelays.description }}
          >
            {slide.description}
          </motion.p>
        )}

        {ctaUrl && (
          <motion.div
            className={`${slideSpacing.margin.ctaTop} ${slideTypography.supporting}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: contentDelays.description + 0.2 }}
          >
            {ctaUrl}
          </motion.div>
        )}
      </div>
    </SlideLayout>
  )
}
