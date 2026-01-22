'use client'

import { motion } from 'motion/react'
import type { PitchSlide } from '../../data/slides'
import { contentDelays } from '../../lib/animations'

interface LogoGridSlideProps {
  slide: PitchSlide
}

export function LogoGridSlide({ slide }: LogoGridSlideProps) {
  const logos = slide.logoConfig?.logos ?? []
  const columns = slide.logoConfig?.columns ?? 3
  const note = slide.logoConfig?.note

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

      {/* Logo Grid */}
      <div
        className="grid gap-6 max-w-3xl mx-auto"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {logos.map((logo, index) => (
          <motion.div
            key={index}
            className="rounded-2xl corner-squircle bg-secondary p-1.5 shine-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: contentDelays.stat + index * 0.1 }}
          >
            <div className="flex flex-col items-center justify-center rounded-xl corner-squircle bg-primary px-6 py-10">
              {/* Logo Placeholder (text name) */}
              <span className="text-xl font-medium text-primary">
                {logo.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {note && (
        <motion.p
          className="mt-10 text-lg text-tertiary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: contentDelays.stat + logos.length * 0.1 + 0.1 }}
        >
          {note}
        </motion.p>
      )}
    </div>
  )
}
