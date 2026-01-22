'use client'

import { motion } from 'motion/react'
import type { PitchSlide } from '../../data/slides'
import { contentDelays } from '../../lib/animations'

interface BulletSlideProps {
  slide: PitchSlide
}

export function BulletSlide({ slide }: BulletSlideProps) {
  const bullets = slide.bulletConfig?.bullets ?? []

  return (
    <div className="flex items-start gap-16 max-w-4xl">
      {/* Left: Title section */}
      <div className="flex-shrink-0 w-[200px]">
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
          className="font-display text-display-md text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: contentDelays.title }}
        >
          {slide.title}
        </motion.h1>
      </div>

      {/* Right: Bullets section */}
      <div className="flex-1">
        <ul className="space-y-5">
          {bullets.map((bullet, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: contentDelays.bullets + index * 0.1 }}
            >
              <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-tertiary" />
              <div>
                <p className="text-lg text-primary leading-relaxed">
                  {bullet.bold && (
                    <span className="font-semibold text-secondary">{bullet.bold}: </span>
                  )}
                  {bullet.text}
                </p>
                {bullet.subtext && (
                  <p className="text-sm text-tertiary mt-1">{bullet.subtext}</p>
                )}
              </div>
            </motion.li>
          ))}
        </ul>

        {slide.bulletConfig?.supporting && (
          <motion.p
            className="mt-8 text-base text-tertiary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: contentDelays.bullets + bullets.length * 0.1 + 0.1 }}
          >
            {slide.bulletConfig.supporting}
          </motion.p>
        )}
      </div>
    </div>
  )
}
