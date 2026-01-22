'use client'

import { motion } from 'motion/react'
import type { PitchSlide } from '../../data/slides'
import { contentDelays } from '../../lib/animations'

interface ChartSlideProps {
  slide: PitchSlide
}

export function ChartSlide({ slide }: ChartSlideProps) {
  const data = slide.chartConfig?.data ?? []
  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className="text-center max-w-4xl mx-auto">
      {slide.subtitle && (
        <motion.p
          className="text-sm font-medium text-tertiary uppercase tracking-wider mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: contentDelays.subtitle }}
        >
          {slide.subtitle}
        </motion.p>
      )}

      <motion.h1
        className="font-display text-display-lg text-primary mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: contentDelays.title }}
      >
        {slide.title}
      </motion.h1>

      {/* Chart Container with Shine Border */}
      <motion.div
        className="rounded-2xl corner-squircle bg-secondary p-1.5 shine-3"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: contentDelays.stat }}
      >
        <div className="rounded-xl corner-squircle bg-primary px-8 py-10">
          {/* Bar Chart */}
          <div className="flex items-end justify-center gap-10 h-56">
            {data.map((item, index) => {
              const heightPercent = (item.value / maxValue) * 100

              return (
                <motion.div
                  key={index}
                  className="flex flex-col items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: contentDelays.stat + 0.1 + index * 0.15 }}
                >
                  {/* Display value above bar */}
                  <span className="text-lg font-medium text-primary">
                    {item.displayValue ?? item.value}
                  </span>

                  {/* Bar with subtle gradient */}
                  <motion.div
                    className="w-20 rounded-lg corner-squircle bg-tertiary"
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercent * 1.6}px` }}
                    transition={{
                      delay: contentDelays.stat + 0.2 + index * 0.15,
                      duration: 0.5,
                      ease: 'easeOut',
                    }}
                  />

                  {/* Label below bar */}
                  <span className="text-sm text-secondary">{item.label}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
