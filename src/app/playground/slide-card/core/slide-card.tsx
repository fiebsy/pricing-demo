/**
 * SlideCard Component
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/slide-card
 */

'use client'

import * as React from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'
import { cn } from '@/lib/utils'
import type { SlideCardConfig } from '../config/types'
import { DEFAULT_SLIDECARD_CONFIG } from '../config/presets'
import {
  buildCardClasses,
  buildCardStyles,
  buildLayoutStyles,
  getAnimationVariants,
  getAnimationTransition,
} from '../utils/class-builders'

export interface SlideCardProps {
  config?: Partial<SlideCardConfig>
  className?: string
  children?: React.ReactNode
  motionProps?: Omit<HTMLMotionProps<'div'>, 'className' | 'style'>
}

// Demo content components
function ChartContent({ 
  chartTopPadding = 40,
  barColor = 'secondary',
  barShine = 'shine-1',
  barCorner = 'squircle'
}: { 
  chartTopPadding?: number
  barColor?: string
  barShine?: string
  barCorner?: string
}) {
  const data = [
    { label: '2024', value: 2, displayValue: '$2M', heightPercent: 30 },
    { label: '2025', value: 5, displayValue: '$5M', heightPercent: 50 },
    { label: '2026', value: 20, displayValue: '$20M', heightPercent: 100 },
  ]

  // Calculate actual heights with top padding consideration
  const maxBarHeight = 180 // Maximum bar height in pixels
  const effectiveHeight = maxBarHeight - chartTopPadding

  // Build bar classes
  const getBarClasses = () => {
    const colorClass = `bg-${barColor}`
    const shineClass = barShine !== 'none' ? barShine : ''
    const cornerClass = barCorner !== 'round' && barCorner !== 'sharp' ? `corner-${barCorner}` : ''
    const roundClass = barCorner === 'sharp' ? '' : 'rounded-lg'
    
    return cn('w-20', colorClass, shineClass, cornerClass, roundClass)
  }

  return (
    <div className="flex items-end justify-center gap-12" style={{ height: '240px' }}>
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center gap-3">
          <span className="text-lg font-medium text-primary">
            {item.displayValue}
          </span>
          <motion.div
            className={getBarClasses()}
            initial={{ height: 0 }}
            animate={{ height: `${(item.heightPercent / 100) * effectiveHeight}px` }}
            transition={{
              delay: 0.2 + index * 0.15,
              duration: 0.5,
              ease: 'easeOut',
            }}
          />
          <span className="text-base text-secondary">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

function StatContent() {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="font-display text-display-2xl text-primary">85%</span>
      <span className="text-lg text-secondary mt-3">Conversion Rate</span>
      <span className="text-lg text-tertiary mt-1 opacity-50">+12% vs last month</span>
    </div>
  )
}

function TeamContent() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-24 h-24 rounded-full bg-tertiary" />
      <div className="flex flex-col items-center">
        <span className="text-base font-medium text-primary">Sarah Chen</span>
        <span className="text-xs text-tertiary">CEO & Founder</span>
      </div>
    </div>
  )
}

function LogoContent() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-32 h-16 bg-tertiary rounded-lg" />
      <span className="text-xl font-medium text-primary">Partner Logo</span>
    </div>
  )
}

function CustomContent() {
  return (
    <div className="text-center">
      <h3 className="text-display-sm font-display text-primary">
        SlideCard Preview
      </h3>
      <p className="text-secondary mt-2">
        Configure using the control panel
      </p>
    </div>
  )
}

export const SlideCard = React.forwardRef<HTMLDivElement, SlideCardProps>(
  ({ config: configOverride, className, children, motionProps }, ref) => {
    const config: SlideCardConfig = {
      card: { ...DEFAULT_SLIDECARD_CONFIG.card, ...configOverride?.card },
      animation: { ...DEFAULT_SLIDECARD_CONFIG.animation, ...configOverride?.animation },
      content: { ...DEFAULT_SLIDECARD_CONFIG.content, ...configOverride?.content },
      layout: { ...DEFAULT_SLIDECARD_CONFIG.layout, ...configOverride?.layout },
    }

    const cardClasses = cn(buildCardClasses(config.card), className)
    const cardStyles = {
      ...buildCardStyles(config.card),
      ...buildLayoutStyles(config.layout),
    }

    // Select demo content based on type
    const renderContent = () => {
      if (children) return children

      if (!config.content.showPlaceholder) return null

      switch (config.content.type) {
        case 'chart':
          return (
            <ChartContent 
              chartTopPadding={config.content.chartTopPadding || 40}
              barColor={config.content.barColor || 'secondary'}
              barShine={config.content.barShine || 'shine-1'}
              barCorner={config.content.barCorner || 'squircle'}
            />
          )
        case 'stat':
          return <StatContent />
        case 'team':
          return <TeamContent />
        case 'logo':
          return <LogoContent />
        case 'custom':
        default:
          return <CustomContent />
      }
    }

    if (!config.animation.enabled) {
      return (
        <div ref={ref} className={cardClasses} style={cardStyles}>
          {renderContent()}
        </div>
      )
    }

    const animationVariants = getAnimationVariants(config.animation)
    const animationTransition = getAnimationTransition(config.animation)

    return (
      <motion.div
        ref={ref}
        className={cardClasses}
        style={cardStyles}
        initial={animationVariants.initial}
        animate={animationVariants.animate}
        transition={animationTransition}
        {...motionProps}
      >
        {renderContent()}
      </motion.div>
    )
  }
)

SlideCard.displayName = 'SlideCard'