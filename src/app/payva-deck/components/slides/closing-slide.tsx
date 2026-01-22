'use client'

import { motion } from 'motion/react'
import type { PitchSlide } from '../../data/slides'
import { contentDelays } from '../../lib/animations'

interface ClosingSlideProps {
  slide: PitchSlide
}

export function ClosingSlide({ slide }: ClosingSlideProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <motion.h1
        className="font-display text-display-2xl text-primary mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: contentDelays.title }}
      >
        {slide.title}
      </motion.h1>

      {slide.description && (
        <motion.p
          className="text-xl text-secondary max-w-3xl leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: contentDelays.description }}
        >
          {slide.description}
        </motion.p>
      )}

      <motion.div
        className="mt-12 text-sm text-tertiary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: contentDelays.description + 0.2 }}
      >
        payva.com
      </motion.div>
    </div>
  )
}
