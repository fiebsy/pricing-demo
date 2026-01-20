'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import type { Slide } from '../../data/slides'

interface ImageSlideProps {
  slide: Slide
}

export function ImageSlide({ slide }: ImageSlideProps) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="rounded-3xl corner-squircle bg-secondary p-2 shine-3">
          <div className="overflow-hidden rounded-[20px] corner-squircle">
            <Image
              src={slide.imageSrc || '/skwircle-kid.png'}
              alt={slide.title}
              width={800}
              height={600}
              draggable={false}
              className="pointer-events-none select-none object-cover"
            />
          </div>
        </div>
      </motion.div>
      <motion.p
        className="mt-6 text-lg text-tertiary max-w-[400px] text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {slide.description}
      </motion.p>
    </div>
  )
}
