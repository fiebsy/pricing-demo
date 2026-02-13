/**
 * Orders Summary Card - Core Component
 *
 * A configurable summary card component with value, subtext1, and subtext2.
 * Designed for displaying key metrics at the top of the orders page.
 */

import type { SummaryCardData, SummaryCardConfig } from '../../types'
import { Badge } from '@/components/ui/core/primitives/badge'
import {
  buildContainerClasses,
  buildContainerStyles,
  buildValueClasses,
  buildValueStyles,
  buildSubtext1Classes,
  buildSubtext1Styles,
  buildSubtext2Classes,
  buildSubtext2Styles,
  buildShadyContainerClasses,
  buildShadyContainerStyles,
} from './class-builders'

// =============================================================================
// TYPES
// =============================================================================

export interface OrdersSummaryCardProps {
  data: SummaryCardData
  config: SummaryCardConfig
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function OrdersSummaryCard({ data, config, className = '' }: OrdersSummaryCardProps) {
  const containerClasses = buildContainerClasses(config)
  const containerStyles = buildContainerStyles(config)
  const valueClasses = buildValueClasses(config)
  const valueStyles = buildValueStyles(config)
  const subtext1Classes = buildSubtext1Classes(config)
  const subtext1Styles = buildSubtext1Styles(config)
  const subtext2Classes = buildSubtext2Classes(config)
  const subtext2Styles = buildSubtext2Styles(config)

  // Individual elements
  const valueElement = (
    <span className={valueClasses} style={valueStyles}>{data.value}</span>
  )

  const subtext1Element = (
    <span className={subtext1Classes} style={subtext1Styles}>{data.subtext1}</span>
  )

  const subtext2Element = config.subtext2ShowBadge ? (
    <div style={subtext2Styles}>
      <Badge
        color={config.subtext2BadgeColor}
        size={config.subtext2BadgeSize}
        shape={config.subtext2BadgeShape}
        style={config.subtext2BadgeStyle}
        className={config.subtext2BadgeBorder ? '' : 'ring-transparent'}
      >
        {data.subtext2}
      </Badge>
    </div>
  ) : (
    <span className={subtext2Classes} style={subtext2Styles}>{data.subtext2}</span>
  )

  // Order elements based on stack order
  const getOrderedElements = () => {
    switch (config.stackOrder) {
      case 'subtext1-first':
        // Label → Value → Detail
        return [subtext1Element, valueElement, subtext2Element]
      case 'subtext2-first':
        // Detail → Value → Label
        return [subtext2Element, valueElement, subtext1Element]
      case 'value-first':
      default:
        // Value → Label → Detail
        return [valueElement, subtext1Element, subtext2Element]
    }
  }

  const orderedElements = getOrderedElements()

  // Inner content with flex column
  const innerContent = (
    <div
      className="flex flex-col"
      style={{
        gap: `${config.valueToSubtext1Gap}px`,
      }}
    >
      {orderedElements[0]}
      <div
        className="flex flex-col"
        style={{
          gap: `${config.subtext1ToSubtext2Gap}px`,
        }}
      >
        {orderedElements[1]}
        {orderedElements[2]}
      </div>
    </div>
  )

  // Wrap in shady container if enabled
  const content = config.showShadyContainer ? (
    <div
      className={buildShadyContainerClasses(config)}
      style={buildShadyContainerStyles(config)}
    >
      {innerContent}
    </div>
  ) : (
    innerContent
  )

  return (
    <div
      className={`${containerClasses} ${className}`.trim()}
      style={containerStyles}
    >
      {content}
    </div>
  )
}
