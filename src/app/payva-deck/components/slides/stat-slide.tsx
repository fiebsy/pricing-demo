'use client'

import { motion } from 'motion/react'
import { contentDelays } from '../../lib/animations'
import { slideTypography } from '../../lib/typography'
import { slideSpacing } from '../../lib/spacing'
import { cn } from '@/lib/utils'
import { SlideLayout } from '../slide-layout'
import { SlideCard } from '../slide-card'
import type { SlideProps } from './index'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import ArrowRight02Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight02Icon'

/**
 * Renders a stat value, replacing "→" with a Hugeicon arrow
 */
function StatValue({ value, className, iconSize = 'large' }: { 
  value: string
  className?: string
  iconSize?: 'medium' | 'large'
}) {
  // Check if value contains an arrow transition (e.g., "$250B → $480B")
  if (value.includes('→')) {
    const [from, to] = value.split('→').map((s) => s.trim())
    const iconClass = iconSize === 'medium' ? 'stat-arrow-icon-md' : 'stat-arrow-icon'
    const iconSizeValue = iconSize === 'medium' ? '2rem' : '3rem'
    
    // Extract just the font and size classes, not the color
    const fontClasses = className?.replace(/text-primary|text-secondary|text-tertiary|text-quaternary/g, '').trim()
    
    return (
      <div className="inline-flex items-center" style={{ gap: '1rem' }}>
        {/* From value with full font classes */}
        <span className={`${fontClasses} text-tertiary`}>{from}</span>
        
        {/* Icon in separate container with fixed size */}
        <span className={cn('text-quaternary shrink-0 inline-flex items-center', iconClass)} 
              style={{ width: iconSizeValue, height: iconSizeValue }}>
          <HugeIcon
            icon={ArrowRight02Icon}
            size={32}
            strokeWidth={1.5}
            className="w-full h-full"
          />
        </span>
        
        {/* To value with full font classes */}
        <span className={`${fontClasses} text-primary`}>{to}</span>
      </div>
    )
  }
  // Single value without arrow
  return <span className={className}>{value}</span>
}

export function StatSlide({
  slide,
  variant,
  slideNumber,
  totalSlides,
  isLightMode,
}: SlideProps) {
  const stats = slide.statConfig?.stats ?? []
  const layout = slide.statConfig?.layout ?? 'horizontal'

  // Centered single-stat layout (subtitle in top-left, no badge)
  if (layout === 'single' && stats.length === 1) {
    return (
      <SlideLayout
        variant={variant}
        topLeftSubtitle={slide.subtitle}
        slideNumber={slideNumber}
        totalSlides={totalSlides}
        isLightMode={isLightMode}
      >
        <div className={`flex flex-col items-center ${slideSpacing.layout.stacked} text-center max-w-4xl mx-auto`}>
          <motion.h1
            className={slideTypography.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: contentDelays.title }}
          >
            {slide.title}
          </motion.h1>

          {/* Large centered stat card */}
          <SlideCard className={`flex flex-col items-center justify-center ${slideSpacing.cardPadding.large} min-w-[320px]`}>
            <StatValue value={stats[0].value} className={slideTypography.statValue} />
            <span className={`${slideTypography.statLabel} mt-3`}>{stats[0].label}</span>
            {stats[0].subtext && (
              <span className={`${slideTypography.supporting} mt-1 opacity-50`}>{stats[0].subtext}</span>
            )}
          </SlideCard>
          
          {/* Supporting text below card */}
          {slide.statConfig?.supporting && (
            <motion.p
              className={`text-sm text-quaternary text-center mt-0`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: contentDelays.stat + 0.2 }}
            >
              {slide.statConfig.supporting}
            </motion.p>
          )}
        </div>
      </SlideLayout>
    )
  }

  // Two-column layout for Traction slide (title left, cards right)
  if (layout === 'stacked' && slide.statConfig?.stats?.length === 3) {
    return (
      <SlideLayout
        variant={variant}
        label={slide.subtitle ? undefined : slide.label}
        topLeftSubtitle={slide.subtitle}
        slideNumber={slideNumber}
        totalSlides={totalSlides}
        isLightMode={isLightMode}
      >
        <div className="flex flex-col items-center max-w-5xl w-full">
          {/* Two column layout */}
          <div className="flex items-start gap-24">
            {/* Left: Title */}
            <div className="flex-shrink-0">
              <motion.h1
                className={`${slideTypography.sectionTitle} whitespace-nowrap`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: contentDelays.title }}
              >
                {slide.title}
              </motion.h1>
            </div>

            {/* Right: Vertically stacked stat cards */}
            <div className="flex-1">
              <div className="flex flex-col gap-4 w-full">
                {stats.map((stat, index) => (
                  <SlideCard 
                    key={index}
                    className="flex flex-row items-center justify-between gap-8 px-6 py-4 w-full"
                    delay={contentDelays.stat + index * 0.1}
                  >
                    <StatValue value={stat.value} className="font-display text-display-xl text-primary" iconSize="medium" />
                    <div className="flex flex-col items-end text-right">
                      <span className={`${slideTypography.statLabel}`}>{stat.label}</span>
                      {stat.subtext && (
                        <span className={`${slideTypography.supporting} mt-1 opacity-50`}>{stat.subtext}</span>
                      )}
                    </div>
                  </SlideCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SlideLayout>
    )
  }

  // Stacked layout: vertical stack of cards with centered title
  if (layout === 'stacked') {
    return (
      <SlideLayout
        variant={variant}
        label={slide.subtitle ? undefined : slide.label}
        topLeftSubtitle={slide.subtitle}
        slideNumber={slideNumber}
        totalSlides={totalSlides}
        isLightMode={isLightMode}
      >
        <div className={`flex flex-col items-center ${slideSpacing.layout.stacked} text-center max-w-4xl mx-auto`}>
          <motion.h1
            className={slideTypography.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: contentDelays.title }}
          >
            {slide.title}
          </motion.h1>

          {/* Vertically stacked stat cards */}
          <div className="flex flex-col gap-4 w-full">
            {stats.map((stat, index) => (
              <SlideCard 
                key={index}
                className={`flex flex-col items-center justify-center ${slideSpacing.cardPadding.stat}`}
                delay={contentDelays.stat + index * 0.1}
              >
                <StatValue value={stat.value} className={slideTypography.statValue} />
                <span className={`${slideTypography.statLabel} mt-3`}>{stat.label}</span>
                {stat.subtext && (
                  <span className={`${slideTypography.supporting} mt-1 opacity-50`}>{stat.subtext}</span>
                )}
              </SlideCard>
            ))}
          </div>
        </div>
      </SlideLayout>
    )
  }

  // Default horizontal layout
  return (
    <SlideLayout
      variant={variant}
      label={slide.subtitle ? undefined : slide.label}
      topLeftSubtitle={slide.subtitle}
      slideNumber={slideNumber}
      totalSlides={totalSlides}
      isLightMode={isLightMode}
    >
      <div className="flex flex-col items-center max-w-4xl w-full">
        {/* Two column layout matching bullet slides */}
        <div className={`flex items-start ${slideSpacing.layout.twoColumn}`}>
          {/* Left: Title */}
          <div className="flex-shrink-0">
            <motion.h1
              className={`${slideTypography.sectionTitle} whitespace-nowrap`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: contentDelays.title }}
            >
              {slide.title}
            </motion.h1>
          </div>

          {/* Right: Stats */}
          <div className="flex-1">
            <div className={`flex items-stretch ${slideSpacing.cards.horizontal}`}>
              {stats.map((stat, index) => (
                <SlideCard
                  key={index}
                  className={cn(
                    `flex flex-col items-center justify-center ${slideSpacing.cardPadding.stat}`,
                    stats.length === 1 ? 'flex-1' : 'flex-1 max-w-xs'
                  )}
                  delay={contentDelays.stat + index * 0.15}
                >
                  <StatValue value={stat.value} className={slideTypography.statValue} />
                  <span className={`${slideTypography.statLabel} mt-2`}>{stat.label}</span>
                  {stat.subtext && (
                    <span className={`${slideTypography.supporting} mt-1 opacity-50`}>{stat.subtext}</span>
                  )}
                </SlideCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  )
}
