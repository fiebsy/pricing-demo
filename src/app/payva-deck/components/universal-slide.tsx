'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import ArrowRight02Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight02Icon'

import type { UniversalSlideProps, SlideConfig } from '../config/types'
import { getLayoutClasses, LAYOUT_CLASSES } from '../config/layouts'
import { SLIDE_STYLES, getLayoutThemeStyles, getAnimationDelay } from '../config/slide-styles'
import { SlideLayout } from './slide-layout'
import { SlideCard } from './slide-card'
import { SlideSubtitle } from './slide-subtitle'
import { PayvaWordmark } from './payva-wordmark'

/**
 * Universal slide component that renders any slide based on configuration
 */
export function UniversalSlide({ 
  slide, 
  slideNumber, 
  totalSlides, 
  isLightMode = false,
  className 
}: UniversalSlideProps) {
  const theme = slide.theme ?? 'professional'
  const variant = isLightMode ? 'light' : (slide.variant ?? 'light')
  const styles = getLayoutThemeStyles(slide.layout, theme)
  
  // Render based on layout type
  switch (slide.layout) {
    case 'hero':
      return (
        <HeroSlide 
          slide={slide} 
          variant={variant}
          styles={styles}
          slideNumber={slideNumber}
          totalSlides={totalSlides}
          isLightMode={isLightMode}
          className={className}
        />
      )
    
    case 'two-column':
      return (
        <TwoColumnSlide
          slide={slide}
          variant={variant}
          styles={styles}
          slideNumber={slideNumber}
          totalSlides={totalSlides}
          isLightMode={isLightMode}
          className={className}
        />
      )
    
    case 'two-column-stats':
      return (
        <TwoColumnStatsSlide
          slide={slide}
          variant={variant}
          styles={styles}
          slideNumber={slideNumber}
          totalSlides={totalSlides}
          isLightMode={isLightMode}
          className={className}
        />
      )
    
    case 'centered-stat':
      return (
        <CenteredStatSlide
          slide={slide}
          variant={variant}
          styles={styles}
          slideNumber={slideNumber}
          totalSlides={totalSlides}
          isLightMode={isLightMode}
          className={className}
        />
      )
    
    case 'chart':
      return (
        <ChartSlide
          slide={slide}
          variant={variant}
          styles={styles}
          slideNumber={slideNumber}
          totalSlides={totalSlides}
          isLightMode={isLightMode}
          className={className}
        />
      )
    
    case 'grid':
      return (
        <GridSlide
          slide={slide}
          variant={variant}
          styles={styles}
          slideNumber={slideNumber}
          totalSlides={totalSlides}
          isLightMode={isLightMode}
          className={className}
        />
      )
    
    default:
      return (
        <CustomSlide
          slide={slide}
          variant={variant}
          styles={styles}
          slideNumber={slideNumber}
          totalSlides={totalSlides}
          isLightMode={isLightMode}
          className={className}
        />
      )
  }
}

// ============================================
// Layout Components
// ============================================

/**
 * Hero layout - centered large text
 */
function HeroSlide({ slide, variant, styles, slideNumber, totalSlides, isLightMode, className }: any) {
  const content = slide.content
  
  return (
    <SlideLayout
      variant={variant}
      slideNumber={slideNumber}
      totalSlides={totalSlides}
      isLightMode={isLightMode}
      className={className}
    >
      <div className={cn(getLayoutClasses('hero'), 'flex flex-col items-center gap-6')}>
        {/* Payva Wordmark for title slide */}
        {slide.id === 'title' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: getAnimationDelay('title') }}
            className="mb-4"
          >
            <PayvaWordmark className="h-20" />
          </motion.div>
        )}
        
        {/* Title */}
        {slide.id !== 'title' && (
          <motion.h1
            className={styles.title || SLIDE_STYLES.typography.hero.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: getAnimationDelay('title') }}
          >
            {content.title}
          </motion.h1>
        )}
        
        {/* Subtitle */}
        {content.subtitle && (
          <motion.p
            className={styles.subtitle || SLIDE_STYLES.typography.hero.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: getAnimationDelay('subtitle') }}
          >
            {content.subtitle}
          </motion.p>
        )}
        
        {/* Description */}
        {content.description && (
          <motion.p
            className={styles.description || SLIDE_STYLES.typography.hero.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: getAnimationDelay('content') }}
          >
            {content.description}
          </motion.p>
        )}
        
        {/* CTA URL */}
        {content.ctaUrl && (
          <motion.div
            className={cn(SLIDE_STYLES.spacing.margin.ctaTop, 'text-sm text-quaternary')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: getAnimationDelay('supporting') }}
          >
            {content.ctaUrl}
          </motion.div>
        )}
      </div>
    </SlideLayout>
  )
}

/**
 * Two column layout - title left, bullets right
 */
function TwoColumnSlide({ slide, variant, styles, slideNumber, totalSlides, isLightMode, className }: any) {
  const content = slide.content
  const bullets = content.bullets || []
  
  return (
    <SlideLayout
      variant={variant}
      label={slide.label}
      topLeftSubtitle={content.subtitle}
      slideNumber={slideNumber}
      totalSlides={totalSlides}
      isLightMode={isLightMode}
      className={className}
    >
      <div className={getLayoutClasses('two-column')}>
        {/* Left: Title */}
        <div className={LAYOUT_CLASSES.twoColumn.left}>
          <motion.h1
            className={cn(styles.title, 'whitespace-nowrap')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: getAnimationDelay('title') }}
          >
            {content.title}
          </motion.h1>
        </div>
        
        {/* Right: Bullets */}
        <div className={LAYOUT_CLASSES.twoColumn.right}>
          <ul className="space-y-8">
            {bullets.map((bullet: any, index: number) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: getAnimationDelay('bullets', index) }}
              >
                <div>
                  <p className={styles.body}>
                    {bullet.bold && (
                      <span className={styles.bodyBold}>{bullet.bold} </span>
                    )}
                    {bullet.text}
                  </p>
                  {bullet.subtext && (
                    <p className={cn(styles.supporting, 'mt-1')}>{bullet.subtext}</p>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Supporting text */}
      {content.supporting && (
        <motion.p
          className={cn(SLIDE_STYLES.spacing.margin.supportingTop, 'text-lg text-secondary text-center')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: getAnimationDelay('supporting') }}
        >
          {content.supporting}
        </motion.p>
      )}
    </SlideLayout>
  )
}

/**
 * Two column stats layout - title left, stat cards right
 */
function TwoColumnStatsSlide({ slide, variant, styles, slideNumber, totalSlides, isLightMode, className }: any) {
  const content = slide.content
  const stats = content.stats || []
  
  return (
    <SlideLayout
      variant={variant}
      label={slide.label}
      topLeftSubtitle={content.subtitle}
      slideNumber={slideNumber}
      totalSlides={totalSlides}
      isLightMode={isLightMode}
      className={className}
    >
      <div className={getLayoutClasses('two-column')}>
        {/* Left: Title */}
        <div className={LAYOUT_CLASSES.twoColumn.left}>
          <motion.h1
            className={cn(styles.title, 'whitespace-nowrap')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: getAnimationDelay('title') }}
          >
            {content.title}
          </motion.h1>
        </div>
        
        {/* Right: Stat cards */}
        <div className={LAYOUT_CLASSES.twoColumn.right}>
          <div className="flex flex-col gap-4">
            {stats.map((stat: any, index: number) => (
              <SlideCard
                key={index}
                className="flex flex-row items-center justify-between gap-8 px-6 py-4"
                delay={getAnimationDelay('stat', index)}
              >
                <StatValue value={stat.value} className={styles.stat.value} />
                <div className="flex flex-col items-end text-right">
                  <span className={styles.stat.label}>{stat.label}</span>
                  {stat.subtext && (
                    <span className={cn(styles.stat.subtext, 'mt-1')}>{stat.subtext}</span>
                  )}
                </div>
              </SlideCard>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  )
}

/**
 * Centered stat layout - title with single large stat
 */
function CenteredStatSlide({ slide, variant, styles, slideNumber, totalSlides, isLightMode, className }: any) {
  const content = slide.content
  const stat = content.stat
  
  return (
    <SlideLayout
      variant={variant}
      topLeftSubtitle={content.subtitle}
      slideNumber={slideNumber}
      totalSlides={totalSlides}
      isLightMode={isLightMode}
      className={className}
    >
      <div className={getLayoutClasses('centered-stat')}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: getAnimationDelay('title') }}
        >
          {content.title}
        </motion.h1>
        
        <SlideCard 
          className={cn('flex flex-col items-center justify-center', SLIDE_STYLES.spacing.padding.large, SLIDE_STYLES.spacing.dimensions.statCard)}
          delay={getAnimationDelay('stat')}
        >
          <StatValue value={stat.value} className={styles.stat.value} />
          <span className={cn(styles.stat.label, 'mt-3')}>{stat.label}</span>
          {stat.subtext && (
            <span className={cn(styles.stat.subtext, 'mt-1')}>{stat.subtext}</span>
          )}
        </SlideCard>
      </div>
    </SlideLayout>
  )
}

/**
 * Chart layout - title with bar chart
 */
function ChartSlide({ slide, variant, styles, slideNumber, totalSlides, isLightMode, className }: any) {
  const content = slide.content
  const data = content.data || []
  const maxValue = Math.max(...data.map((d: any) => d.value))
  
  return (
    <SlideLayout
      variant={variant}
      label={slide.label}
      topLeftSubtitle={content.subtitle}
      slideNumber={slideNumber}
      totalSlides={totalSlides}
      isLightMode={isLightMode}
      className={className}
    >
      <div className={getLayoutClasses('chart')}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: getAnimationDelay('title') }}
        >
          {content.title}
        </motion.h1>
        
        {/* Chart */}
        <SlideCard className={cn(SLIDE_STYLES.spacing.padding.chart, 'w-full max-w-3xl')}>
          <div className="flex items-end justify-around h-64">
            {data.map((item: any, index: number) => {
              const height = (item.value / maxValue) * 100
              return (
                <motion.div
                  key={index}
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: getAnimationDelay('card', index) }}
                >
                  {/* Value label */}
                  <span className={SLIDE_STYLES.typography.chart.value}>{item.displayValue}</span>
                  
                  {/* Bar */}
                  <motion.div
                    className={cn('bg-brand rounded-t', SLIDE_STYLES.spacing.dimensions.chartBar)}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: getAnimationDelay('card', index) + 0.2, duration: 0.5 }}
                    style={{ minHeight: '2rem' }}
                  />
                  
                  {/* X-axis label */}
                  <span className={cn(SLIDE_STYLES.typography.chart.label, 'mt-2')}>{item.label}</span>
                </motion.div>
              )
            })}
          </div>
        </SlideCard>
        
        {/* Context text */}
        {content.contextText && (
          <motion.p
            className={cn(SLIDE_STYLES.typography.chart.context, 'text-quaternary', SLIDE_STYLES.spacing.margin.chartContext)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: getAnimationDelay('supporting') }}
          >
            {content.contextText}
          </motion.p>
        )}
      </div>
    </SlideLayout>
  )
}

/**
 * Grid layout - team members or logos
 */
function GridSlide({ slide, variant, styles, slideNumber, totalSlides, isLightMode, className }: any) {
  const content = slide.content
  const items = content.items || []
  const columns = content.columns || 3
  const isTeam = content.gridType === 'team'
  
  return (
    <SlideLayout
      variant={variant}
      label={slide.label}
      topLeftSubtitle={content.subtitle}
      slideNumber={slideNumber}
      totalSlides={totalSlides}
      isLightMode={isLightMode}
      className={className}
    >
      <div className={getLayoutClasses('grid')}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: getAnimationDelay('title') }}
        >
          {content.title}
        </motion.h1>
        
        {/* Grid */}
        <div className={cn(LAYOUT_CLASSES.grid[columns as 2 | 3 | 4])}>
          {items.map((item: any, index: number) => (
            <SlideCard
              key={index}
              className={cn(
                'flex flex-col items-center justify-center',
                isTeam ? SLIDE_STYLES.spacing.padding.team : SLIDE_STYLES.spacing.padding.logo,
                isTeam && SLIDE_STYLES.spacing.dimensions.teamCard
              )}
              delay={getAnimationDelay('card', index)}
            >
              {isTeam ? (
                <>
                  {/* Team member photo placeholder */}
                  {item.imageSrc && (
                    <div className="w-24 h-24 rounded-full bg-tertiary mb-4" />
                  )}
                  <span className={SLIDE_STYLES.typography.card.titleSmall}>{item.name}</span>
                  <span className={cn(SLIDE_STYLES.typography.card.role, 'text-tertiary mt-1')}>{item.role}</span>
                </>
              ) : (
                <>
                  {/* Logo display */}
                  <span className={SLIDE_STYLES.typography.card.title}>
                    {item.displayText || item.name}
                  </span>
                </>
              )}
            </SlideCard>
          ))}
        </div>
        
        {/* Supporting text */}
        {content.supporting && (
          <motion.p
            className={cn('text-center', styles.supporting, SLIDE_STYLES.spacing.margin.elementTop)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: getAnimationDelay('supporting') }}
          >
            {content.supporting}
          </motion.p>
        )}
      </div>
    </SlideLayout>
  )
}

/**
 * Custom layout - fallback for unique slides
 */
function CustomSlide({ slide, variant, styles, slideNumber, totalSlides, isLightMode, className }: any) {
  return (
    <SlideLayout
      variant={variant}
      label={slide.label}
      slideNumber={slideNumber}
      totalSlides={totalSlides}
      isLightMode={isLightMode}
      className={className}
    >
      <div className={getLayoutClasses('custom')}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: getAnimationDelay('title') }}
        >
          {slide.content.title}
        </motion.h1>
        {/* Custom content would go here */}
      </div>
    </SlideLayout>
  )
}

// ============================================
// Helper Components
// ============================================

/**
 * Stat value component with arrow support
 */
function StatValue({ value, className }: { value: string; className?: string }) {
  // Check for arrow notation (e.g., "3→36")
  if (value.includes('→')) {
    const [from, to] = value.split('→').map(s => s.trim())
    return (
      <div className="inline-flex items-center gap-4">
        <span className={cn(className, 'text-tertiary')}>{from}</span>
        <HugeIcon
          icon={ArrowRight02Icon}
          size={32}
          strokeWidth={1.5}
          className="text-quaternary"
        />
        <span className={className}>{to}</span>
      </div>
    )
  }
  
  return <span className={className}>{value}</span>
}