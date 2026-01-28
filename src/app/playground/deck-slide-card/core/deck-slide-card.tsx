/**
 * Deck Slide Card Component
 *
 * @status incubating
 * @migration-target src/components/ui/features/deck-slide-card
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { DeckSlideCardConfig } from '../config/types'
import { DEFAULT_DECK_SLIDE_CARD_CONFIG } from '../config/presets'
import {
  buildOuterClasses,
  buildOuterStyles,
  buildLayoutClasses,
  buildLayoutStyles,
  buildPrintClasses,
  buildContentClasses,
} from '../utils/class-builders'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import ArrowRight02Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight02Icon'

export interface DeckSlideCardProps {
  config?: Partial<DeckSlideCardConfig>
  className?: string
  children?: React.ReactNode
  animate?: boolean
}

/**
 * Renders a stat value, replacing "→" with a Hugeicon arrow
 */
function StatValue({
  value,
  className,
  showArrow = true,
}: {
  value: string
  className?: string
  showArrow?: boolean
}) {
  // Check if value contains an arrow transition (e.g., "$250B → $480B")
  if (showArrow && value.includes('→')) {
    const [from, to] = value.split('→').map((s) => s.trim())

    return (
      <div className="inline-flex items-center gap-4">
        <span className={cn(className, 'text-tertiary')}>{from}</span>

        <span className="text-quaternary shrink-0 inline-flex items-center w-12 h-12">
          <HugeIcon
            icon={ArrowRight02Icon}
            size={32}
            strokeWidth={1.5}
            className="w-full h-full"
          />
        </span>

        <span className={cn(className, 'text-primary')}>{to}</span>
      </div>
    )
  }
  // Single value without arrow
  return <span className={className}>{value}</span>
}

function BulletContent({
  title,
  items,
  classes,
}: {
  title: string
  items: string[]
  classes: { title: string; label: string }
}) {
  return (
    <div className="space-y-4">
      <h3 className={classes.title}>{title}</h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className={cn(classes.label, 'flex items-start')}>
            <span className="text-quaternary mr-2">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TeamContent({
  name,
  role,
  classes,
}: {
  name: string
  role: string
  classes: { title: string; label: string; subtext: string }
}) {
  return (
    <div className="flex flex-col items-center text-center space-y-2">
      <div className="w-20 h-20 rounded-full bg-tertiary mb-2" />
      <h3 className={classes.title}>{name}</h3>
      <p className={classes.label}>{role}</p>
    </div>
  )
}

function ChartContent({
  title,
  value,
  change,
  classes,
}: {
  title: string
  value: string
  change?: string
  classes: { title: string; label: string; subtext: string }
}) {
  return (
    <div className="flex flex-col items-center text-center space-y-2">
      <h3 className={classes.label}>{title}</h3>
      <div className={classes.title}>{value}</div>
      {change && <span className={cn(classes.subtext, 'text-success')}>{change}</span>}
    </div>
  )
}

export const DeckSlideCard = React.forwardRef<HTMLDivElement, DeckSlideCardProps>(
  ({ config: configOverride, className, children, animate = false }, ref) => {
    // Merge config with defaults
    const config: DeckSlideCardConfig = React.useMemo(() => {
      const base = DEFAULT_DECK_SLIDE_CARD_CONFIG
      if (!configOverride) return base

      return {
        outer: { ...base.outer, ...configOverride.outer },
        content: { ...base.content, ...configOverride.content },
        layout: { ...base.layout, ...configOverride.layout },
        export: { ...base.export, ...configOverride.export },
      }
    }, [configOverride])

    const contentClasses = buildContentClasses(config.content)

    // Render content based on type
    const renderContent = () => {
      if (children) return children

      switch (config.content.type) {
        case 'stat':
          return (
            <div className="flex flex-col items-center justify-center text-center space-y-3">
              <StatValue
                value={config.content.statValue || ''}
                className={contentClasses.title}
                showArrow={config.content.showArrow}
              />
              <span className={contentClasses.label}>{config.content.statLabel}</span>
              {config.content.statSubtext && (
                <span className={contentClasses.subtext}>{config.content.statSubtext}</span>
              )}
            </div>
          )

        case 'bullet':
          return (
            <BulletContent
              title="Key Features"
              items={[
                'Advanced analytics dashboard',
                'Real-time collaboration',
                'Enterprise-grade security',
                'Custom integrations',
              ]}
              classes={contentClasses}
            />
          )

        case 'team':
          return (
            <TeamContent
              name="Sarah Johnson"
              role="CEO & Co-founder"
              classes={contentClasses}
            />
          )

        case 'chart':
          return (
            <ChartContent
              title="Monthly Revenue"
              value="$125K"
              change="+22% from last month"
              classes={contentClasses}
            />
          )

        case 'custom':
        default:
          return (
            <div className="flex flex-col items-center justify-center text-center">
              <p className={contentClasses.label}>Custom content area</p>
              <p className={contentClasses.subtext}>Add your own content here</p>
            </div>
          )
      }
    }

    const cardClasses = cn(
      buildOuterClasses(config.outer),
      buildLayoutClasses(config.layout),
      buildPrintClasses(config.export),
      className
    )

    const cardStyles = {
      ...buildOuterStyles(config.outer),
      ...buildLayoutStyles(config.layout),
    }

    // For animation support (if needed in future)
    if (animate) {
      return (
        <div ref={ref} className={cardClasses} style={cardStyles}>
          {renderContent()}
        </div>
      )
    }

    return (
      <div ref={ref} className={cardClasses} style={cardStyles}>
        {renderContent()}
      </div>
    )
  }
)

DeckSlideCard.displayName = 'DeckSlideCard'