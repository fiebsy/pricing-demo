'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import type { Slide } from '../../data/slides'

/**
 * Dual image comparison slide
 *
 * Shows legacy vs new side by side with interactive hover effects.
 * Configure images via the slide's dualImage property in data/slides.ts
 */

interface DualImageSlideProps {
  slide: Slide
}

export function DualImageSlide({ slide }: DualImageSlideProps) {
  const [hoveredImage, setHoveredImage] = useState<'legacy' | 'new' | null>(null)

  const config = slide.dualImage
  if (!config) return null

  const NewImageWrapper = config.new.href ? motion.a : motion.div
  const newImageProps = config.new.href
    ? { href: config.new.href, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <div className="flex gap-6 w-full">
      {/* Legacy Image */}
      <motion.div
        className="flex-1 flex flex-col items-center cursor-pointer"
        initial={{ opacity: 0, x: -20, scale: 0.92 }}
        animate={{
          opacity: hoveredImage === 'new' ? 0.6 : hoveredImage === 'legacy' ? 1 : 0.85,
          x: 0,
          scale: hoveredImage === 'legacy' ? 1.08 : hoveredImage === 'new' ? 0.88 : 0.94,
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setHoveredImage('legacy')}
        onHoverEnd={() => setHoveredImage(null)}
      >
        <div className="w-full rounded-3xl corner-squircle bg-secondary p-2 shine-3">
          <div className="overflow-hidden rounded-[20px] corner-squircle">
            <Image
              src={config.legacy.src}
              alt={config.legacy.alt}
              width={800}
              height={600}
              draggable={false}
              className="pointer-events-none select-none object-cover w-full h-auto"
            />
          </div>
        </div>
        <p className="mt-4 text-sm text-tertiary">{config.legacy.label || 'Legacy'}</p>
      </motion.div>

      {/* New Image */}
      <NewImageWrapper
        {...newImageProps}
        className="flex-1 flex flex-col items-center cursor-pointer"
        initial={{ opacity: 0, x: 20, scale: 0.92 }}
        animate={{
          opacity: hoveredImage === 'legacy' ? 0.6 : 1,
          x: 0,
          scale: hoveredImage === 'new' ? 1.15 : hoveredImage === 'legacy' ? 0.85 : 1,
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setHoveredImage('new')}
        onHoverEnd={() => setHoveredImage(null)}
      >
        <div className="w-full rounded-3xl corner-squircle bg-secondary p-2 shine-3">
          <div className="overflow-hidden rounded-[20px] corner-squircle">
            <Image
              src={config.new.src}
              alt={config.new.alt}
              width={800}
              height={600}
              draggable={false}
              className="pointer-events-none select-none object-cover w-full h-auto"
            />
          </div>
        </div>
        <p className="mt-4 text-sm text-tertiary">{config.new.label || 'New'}</p>
      </NewImageWrapper>
    </div>
  )
}
