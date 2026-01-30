'use client'

import { motion } from 'motion/react'
import LinkSquare02Icon from '@hugeicons-pro/core-stroke-rounded/LinkSquare02Icon'
import { Button } from '@/components/ui/core/primitives/button'
import type { Slide } from '../../data/slides'

interface ButtonSlideProps {
  slide: Slide
}

export function ButtonSlide({ slide }: ButtonSlideProps) {
  return (
    <motion.a
      href={slide.buttonHref}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <Button
        variant="shine"
        size="xl"
        roundness="squircle"
        className="text-xl px-12 py-6"
        iconLeading={LinkSquare02Icon}
      >
        {slide.buttonText || 'Open link'}
      </Button>
    </motion.a>
  )
}
