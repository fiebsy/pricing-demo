'use client'

import { motion } from 'motion/react'
import type { PitchSlide } from '../../data/slides'
import { contentDelays } from '../../lib/animations'

interface TitleSlideProps {
  slide: PitchSlide
}

export function TitleSlide({ slide }: TitleSlideProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <motion.h1
        className="font-display text-display-2xl text-primary mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: contentDelays.title }}
      >
        {slide.title}
      </motion.h1>

      {slide.subtitle && (
        <motion.p
          className="font-display text-display-md text-secondary mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: contentDelays.subtitle + 0.1 }}
        >
          {slide.subtitle}
        </motion.p>
      )}

      {slide.description && (
        <motion.p
          className="text-xl text-tertiary max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: contentDelays.description + 0.1 }}
        >
          {slide.description}
        </motion.p>
      )}
    </div>
  )
}
