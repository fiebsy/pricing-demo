'use client'

import { motion } from 'motion/react'
import type { PitchSlide } from '../../data/slides'
import { contentDelays } from '../../lib/animations'
import { cn } from '@/lib/utils'

interface StatSlideProps {
  slide: PitchSlide
}

export function StatSlide({ slide }: StatSlideProps) {
  const stats = slide.statConfig?.stats ?? []
  const layout = slide.statConfig?.layout ?? 'horizontal'

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

      <div
        className={cn(
          layout === 'horizontal' && 'flex items-stretch justify-center gap-6',
          layout === 'stacked' && 'flex flex-col items-center gap-6',
          layout === 'single' && 'flex flex-col items-center'
        )}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={cn(
              'rounded-2xl corner-squircle bg-secondary p-1.5 shine-3',
              layout === 'horizontal' && 'flex-1 max-w-xs',
              layout === 'single' && 'w-full max-w-md'
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: contentDelays.stat + index * 0.15 }}
          >
            <div className="flex flex-col items-center justify-center rounded-xl corner-squircle bg-primary px-8 py-8">
              <span className="font-display text-display-2xl text-primary">
                {stat.value}
              </span>
              <span className="text-lg text-secondary mt-2">{stat.label}</span>
              {stat.subtext && (
                <span className="text-sm text-tertiary mt-1">{stat.subtext}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {slide.description && (
        <motion.p
          className="mt-10 text-lg text-tertiary max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: contentDelays.stat + stats.length * 0.15 + 0.1 }}
        >
          {slide.description}
        </motion.p>
      )}
    </div>
  )
}
