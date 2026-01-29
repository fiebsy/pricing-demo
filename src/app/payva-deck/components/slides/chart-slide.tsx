'use client'

import { motion } from 'motion/react'
import { contentDelays } from '../../lib/animations'
import { slideTypography } from '../../lib/typography'
import { slideSpacing } from '../../lib/spacing'
import { SlideLayout } from '../slide-layout'
import { SlideCard } from '../slide-card'
import type { SlideProps } from './index'

export function ChartSlide({
  slide,
  variant,
  slideNumber,
  totalSlides,
  isLightMode,
}: SlideProps) {
  const data = slide.chartConfig?.data ?? []
  const contextText = slide.chartConfig?.contextText
  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <SlideLayout
      variant={variant}
      label={slide.subtitle ? undefined : slide.label}
      topLeftSubtitle={slide.subtitle}
      slideNumber={slideNumber}
      totalSlides={totalSlides}
      isLightMode={isLightMode}
    >
      <div className={`flex flex-col items-center ${slideSpacing.layout.stacked} max-w-3xl w-full`}>
        {/* Title */}
        <motion.h1
          className={`${slideTypography.sectionTitle} text-center`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: contentDelays.title }}
        >
          {slide.title}
        </motion.h1>

        {/* Chart Card */}
        <div className="flex flex-col items-center">
          <SlideCard className={slideSpacing.cardPadding.chart}>
            <div className="flex items-end justify-center gap-12 h-56">
              {data.map((item, index) => {
                const heightPercent = (item.value / maxValue) * 100
                // Adjust height to account for top padding
                const maxBarHeight = 180
                const chartTopPadding = 26
                const effectiveHeight = maxBarHeight - chartTopPadding
                const barHeight = (heightPercent / 100) * effectiveHeight

                return (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: contentDelays.stat + 0.1 + index * 0.15 }}
                  >
                    <span className={slideTypography.chartValue}>
                      {item.displayValue ?? item.value}
                    </span>
                    <motion.div
                      className="w-20 rounded-lg corner-squircle bg-gray-300"
                      initial={{ height: 0 }}
                      animate={{ height: `${barHeight}px` }}
                      transition={{
                        delay: contentDelays.stat + 0.2 + index * 0.15,
                        duration: 0.5,
                        ease: 'easeOut',
                      }}
                    />
                    <span className={slideTypography.chartLabel}>{item.label}</span>
                  </motion.div>
                )
              })}
            </div>
          </SlideCard>

          {/* Context description - data-driven */}
          {contextText && (
            <motion.p
              className={`${slideTypography.supporting} text-center ${slideSpacing.margin.chartContext}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: contentDelays.stat + 0.5 }}
            >
              {contextText}
            </motion.p>
          )}
        </div>
      </div>
    </SlideLayout>
  )
}
