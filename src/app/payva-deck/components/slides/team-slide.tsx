'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import User02Icon from '@hugeicons-pro/core-stroke-rounded/User02Icon'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import { contentDelays } from '../../lib/animations'
import { slideTypography } from '../../lib/typography'
import { slideSpacing } from '../../lib/spacing'
import { SlideLayout } from '../slide-layout'
import { SlideCard } from '../slide-card'
import type { SlideProps } from './index'

export function TeamSlide({
  slide,
  variant,
  slideNumber,
  totalSlides,
  isLightMode,
}: SlideProps) {
  const members = slide.teamConfig?.members ?? []

  return (
    <SlideLayout
      variant={variant}
      topLeftSubtitle={slide.subtitle}
      slideNumber={slideNumber}
      totalSlides={totalSlides}
      isLightMode={isLightMode}
    >
      <div className={`flex flex-col items-center ${slideSpacing.layout.stacked} text-center max-w-5xl mx-auto`}>
        <motion.h1
          className={slideTypography.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: contentDelays.title }}
        >
          {slide.title}
        </motion.h1>

        {/* Team Grid - fixed width cards for consistency */}
        <div className={`flex flex-wrap justify-center ${slideSpacing.cards.grid} max-w-4xl mx-auto`}>
          {members.map((member, index) => (
            <SlideCard
              key={index}
              className={`flex flex-col items-center gap-4 ${slideSpacing.cardPadding.team} ${slideSpacing.cardWidth.team}`}
              delay={contentDelays.stat + index * 0.1}
              motionProps={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
              }}
            >
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                {member.imageSrc ? (
                  // Use img tag for PDF export compatibility when in light variant
                  variant === 'light' ? (
                    <img
                      src={member.imageSrc}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={member.imageSrc}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <HugeIcon icon={User02Icon} size={48} className="text-tertiary" />
                )}
              </div>

              {/* Name and Role */}
              <div className="flex flex-col items-center gap-1">
                <span className={`${slideTypography.cardName} text-center whitespace-nowrap`}>
                  {member.name}
                </span>
                <span className={`${slideTypography.cardRole} text-center whitespace-nowrap`}>{member.role}</span>
              </div>
            </SlideCard>
          ))}
        </div>
      </div>
    </SlideLayout>
  )
}
