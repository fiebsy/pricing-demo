'use client'

import { motion } from 'motion/react'
import { contentDelays } from '../../lib/animations'
import { slideTypography } from '../../lib/typography'
import { slideSpacing } from '../../lib/spacing'
import { SlideLayout } from '../slide-layout'
import type { SlideProps } from './index'

export function BulletSlide({
  slide,
  variant,
  slideNumber,
  totalSlides,
  isLightMode,
}: SlideProps) {
  const bullets = slide.bulletConfig?.bullets ?? []

  return (
    <SlideLayout
      variant={variant}
      label={slide.subtitle ? undefined : slide.label}
      topLeftSubtitle={slide.subtitle}
      slideNumber={slideNumber}
      totalSlides={totalSlides}
      isLightMode={isLightMode}
    >
      <div className="flex flex-col items-center max-w-4xl w-full">

        {/* Two column layout */}
        <div className={`flex items-start ${slideSpacing.layout.twoColumn}`}>
          {/* Left: Title */}
          <div className="flex-shrink-0">
            <motion.h1
              className={`${slideTypography.sectionTitle} whitespace-nowrap`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: contentDelays.title }}
            >
              {slide.title}
            </motion.h1>
          </div>

          {/* Right: Bullets section */}
          <div className="flex-1">
            <ul className="space-y-8">
              {bullets.map((bullet, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: contentDelays.bullets + index * 0.1 }}
                >
                  <div>
                    <p className={slideTypography.body}>
                      {bullet.bold && (
                        <span className={slideTypography.bodyBold}>{bullet.bold} </span>
                      )}
                      {bullet.text}
                    </p>
                    {bullet.subtext && (
                      <p className={`${slideTypography.supporting} mt-1`}>{bullet.subtext}</p>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Supporting text - Centered below */}
        {slide.bulletConfig?.supporting && (
          <motion.p
            className={`${slideTypography.supporting} ${slideSpacing.margin.supportingTop} text-center`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: contentDelays.bullets + bullets.length * 0.1 + 0.1 }}
          >
            {slide.bulletConfig.supporting}
          </motion.p>
        )}
      </div>
    </SlideLayout>
  )
}
