'use client'

import { motion } from 'motion/react'
import User02Icon from '@hugeicons-pro/core-stroke-rounded/User02Icon'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import type { PitchSlide } from '../../data/slides'
import { contentDelays } from '../../lib/animations'

interface TeamSlideProps {
  slide: PitchSlide
}

export function TeamSlide({ slide }: TeamSlideProps) {
  const members = slide.teamConfig?.members ?? []

  return (
    <div className="text-center max-w-5xl mx-auto">
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

      {/* Team Grid */}
      <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
        {members.map((member, index) => (
          <motion.div
            key={index}
            className="rounded-2xl corner-squircle bg-secondary p-1.5 shine-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: contentDelays.stat + index * 0.1 }}
          >
            <div className="flex flex-col items-center gap-3 rounded-xl corner-squircle bg-primary px-8 py-6 min-w-[160px]">
              {/* Avatar Placeholder */}
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                <HugeIcon icon={User02Icon} size={28} className="text-tertiary" />
              </div>

              {/* Name */}
              <span className="text-base font-medium text-primary">
                {member.name}
              </span>

              {/* Role */}
              <span className="text-xs text-tertiary">{member.role}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
