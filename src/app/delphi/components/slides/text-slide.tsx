'use client'

import { motion } from 'motion/react'
import type { Slide } from '../../data/slides'
import { contentDelays } from '../../lib/animations'

interface TextSlideProps {
  slide: Slide
}

export function TextSlide({ slide }: TextSlideProps) {
  return (
    <>
      <motion.p
        className="text-sm font-medium text-brand-primary uppercase tracking-wider mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: contentDelays.subtitle }}
      >
        {slide.subtitle}
      </motion.p>

      <motion.h1
        className="font-display text-display-xl text-primary mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: contentDelays.title }}
      >
        {slide.title}
      </motion.h1>

      <motion.p
        className="text-lg text-tertiary max-w-xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: contentDelays.description }}
      >
        {slide.description}
      </motion.p>
    </>
  )
}
