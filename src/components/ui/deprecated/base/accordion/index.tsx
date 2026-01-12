'use client'

/**
 * Animated Line Accordion
 *
 * A high-level accordion component with animated L-shaped connection lines.
 * Self-contained with minimal dependencies - designed for clean portability.
 *
 * CSS animations are defined in: src/styles/utilities/animations.css
 * - accordion-draw-line: SVG line drawing
 * - accordion-fade-in-line: Line opacity fade
 * - accordion-fade-in-up: Item slide-in with scale
 *
 * @example
 * ```tsx
 * <Accordion label="Gallery" defaultExpanded>
 *   <Accordion.Item href="/gallery/one">Item One</Accordion.Item>
 *   <Accordion.Item href="/gallery/two">Item Two</Accordion.Item>
 * </Accordion>
 * ```
 */
import * as React from 'react'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowDown01Icon } from '@hugeicons-pro/core-solid-rounded'

import { HugeIcon } from '@/components/ui/prod/base/icon'

// ============================================================================
// ANIMATION CONFIG
// ============================================================================

const ANIMATION_CONFIG = {
  // Line animation
  lineAnimationDuration: 1.2,
  lineAnimationEasing: 'linear',
  lineAnimationDelay: 0,
  lineOpacityDuration: 0.1,
  lineOpacityEasing: 'ease-in',
  lineOpacityDelay: 0,

  // Button animation
  buttonAnimationDelay: 0,
  buttonAnimationDuration: 0.15,
  buttonAnimationEasing: 'ease-out',
  buttonOpacityStart: 1,
  buttonOpacityEnd: 1,
  buttonScaleStart: 0.83,
  buttonScaleEnd: 1,
  staggerDelay: 0.025,

  // Accordion
  accordionDuration: 200,
  chevronAnimationDuration: 100,
}

// ============================================================================
// PRESETS
// ============================================================================

export interface AccordionSizePreset {
  id: 'compact' | 'default' | 'comfortable'
  name: string
  trigger: { height: number; fontSize: number }
  item: { itemHeight: number; buttonGap: number; animationDistance: number }
}

export const ACCORDION_PRESETS: Record<AccordionSizePreset['id'], AccordionSizePreset> = {
  compact: {
    id: 'compact',
    name: 'Compact',
    trigger: { height: 28, fontSize: 13 },
    item: { itemHeight: 26, buttonGap: 2, animationDistance: 12 },
  },
  default: {
    id: 'default',
    name: 'Default',
    trigger: { height: 32, fontSize: 14 },
    item: { itemHeight: 32, buttonGap: 4, animationDistance: 15 },
  },
  comfortable: {
    id: 'comfortable',
    name: 'Comfortable',
    trigger: { height: 40, fontSize: 15 },
    item: { itemHeight: 40, buttonGap: 6, animationDistance: 18 },
  },
}

// ============================================================================
// DEFAULT CONFIG
// ============================================================================

const DEFAULT_CONFIG = {
  containerLeftPadding: 22,
  containerTopPadding: 2,
  buttonGap: 4,
  nestedItemHeight: 32,
  nestedItemPaddingX: 8,
  nestedItemPaddingY: 4,
  nestedItemFontSize: 14,
  nestedItemBorderRadius: 6,
  triggerBackgroundColor: 'transparent',
  triggerBackgroundOpacity: 100,
  showChevron: true,
  lineColor: '--border-color-tertiary',
  lineStrokeWidth: 1.5,
  lineCornerRadius: 12,
  visualOffset: 12,
  firstLineOffset: 2,
}

// ============================================================================
// GEOMETRY CALCULATION
// ============================================================================

function calculateLineGeometry(config: {
  nestedItemHeight: number
  buttonGap: number
  visualOffset: number
  containerTopPadding: number
  firstLineOffset: number
}) {
  const lineHeight = config.nestedItemHeight + config.buttonGap + config.visualOffset
  const firstLineHeight = Math.max(
    config.containerTopPadding + config.nestedItemHeight / 2 - config.firstLineOffset,
    8
  )
  return { lineHeight, firstLineHeight }
}

// ============================================================================
// CONTEXT
// ============================================================================

interface AccordionContextValue {
  isExpanded: boolean
  lineGeometry: { lineHeight: number; firstLineHeight: number }
  config: {
    itemHeight: number
    strokeWidth: number
    cornerRadius: number
    lineColor: string
    paddingX: number
    borderRadius: number
    animationDistance: number
  }
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

const useAccordionContext = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('Accordion.Item must be used within an Accordion')
  }
  return context
}

// ============================================================================
// ACCORDION ITEM
// ============================================================================

export interface AccordionItemProps {
  href: string
  children: React.ReactNode
  index?: number
  onClick?: () => void
}

const AccordionItem: React.FC<AccordionItemProps> = ({ href, children, index = 0, onClick }) => {
  const { isExpanded, lineGeometry, config } = useAccordionContext()

  const isFirst = index === 0
  const currentLineHeight = isFirst ? lineGeometry.firstLineHeight : lineGeometry.lineHeight
  const svgWidth = config.cornerRadius
  const svgHeight = currentLineHeight

  return (
    <div className="relative cursor-pointer" style={{ isolation: 'isolate' }}>
      {/* SVG L-shaped stroke */}
      <svg
        className="pointer-events-none absolute"
        style={{
          overflow: 'visible',
          right: `calc(100% + 1px)`,
          top: '50%',
          transform: `translateY(-${svgHeight}px)`,
          width: svgWidth,
          height: svgHeight,
          zIndex: 1,
        }}
      >
        <path
          d={`
            M 0 0
            L 0 ${currentLineHeight - config.cornerRadius}
            Q 0 ${currentLineHeight} ${config.cornerRadius} ${currentLineHeight}
            L ${config.cornerRadius} ${currentLineHeight}
          `}
          fill="none"
          stroke={`var(${config.lineColor})`}
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          style={{
            animation: isExpanded
              ? `accordion-draw-line ${ANIMATION_CONFIG.lineAnimationDuration}s ${ANIMATION_CONFIG.lineAnimationEasing} ${ANIMATION_CONFIG.lineAnimationDelay}s forwards, accordion-fade-in-line ${ANIMATION_CONFIG.lineOpacityDuration}s ${ANIMATION_CONFIG.lineOpacityEasing} ${ANIMATION_CONFIG.lineOpacityDelay}s forwards`
              : 'none',
          }}
        />
      </svg>

      {/* Link with button animation */}
      <Link
        href={href}
        onClick={onClick}
        className="text-secondary hover:bg-secondary_hover relative block cursor-pointer rounded-md text-sm transition-colors"
        style={
          {
            height: `${config.itemHeight}px`,
            paddingLeft: `${config.paddingX}px`,
            paddingRight: `${config.paddingX}px`,
            lineHeight: `${config.itemHeight}px`,
            borderRadius: `${config.borderRadius}px`,
            '--accordion-translate-x': `-${config.animationDistance}px`,
            '--accordion-scale-start': String(ANIMATION_CONFIG.buttonScaleStart),
            '--accordion-scale-end': String(ANIMATION_CONFIG.buttonScaleEnd),
            '--accordion-opacity-start': String(ANIMATION_CONFIG.buttonOpacityStart),
            '--accordion-opacity-end': String(ANIMATION_CONFIG.buttonOpacityEnd),
            animation: isExpanded
              ? `accordion-fade-in-up ${ANIMATION_CONFIG.buttonAnimationDuration}s ${ANIMATION_CONFIG.buttonAnimationEasing} ${ANIMATION_CONFIG.buttonAnimationDelay + index * ANIMATION_CONFIG.staggerDelay}s both`
              : 'none',
            zIndex: 10,
          } as React.CSSProperties
        }
      >
        {children}
      </Link>
    </div>
  )
}

// ============================================================================
// ACCORDION
// ============================================================================

export interface AccordionProps {
  label: string
  icon?: React.ComponentType<{ className?: string }>
  children: React.ReactNode
  defaultExpanded?: boolean
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  onLabelClick?: () => void
  toggleOnChevronOnly?: boolean
  showCount?: boolean
  triggerConfig?: Partial<{
    height: number
    paddingX: number
    paddingY: number
    fontSize: number
    backgroundColor: string
    backgroundOpacity: number
    borderRadius: number
    showChevron: boolean
  }>
  itemConfig?: Partial<{
    itemHeight: number
    strokeWidth: number
    cornerRadius: number
    lineColor: string
    paddingX: number
    borderRadius: number
    containerLeftPadding: number
    containerTopPadding: number
    buttonGap: number
    visualOffset: number
    firstLineOffset: number
    animationDistance: number
  }>
}

const AccordionRoot: React.FC<AccordionProps> = ({
  label,
  icon,
  children,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onExpandedChange,
  onLabelClick,
  toggleOnChevronOnly = false,
  showCount = true,
  triggerConfig = {},
  itemConfig = {},
}) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)
  const [animationKey, setAnimationKey] = useState(0)

  const isControlled = controlledExpanded !== undefined
  const isExpanded = isControlled ? controlledExpanded : internalExpanded

  const mergedTriggerConfig = useMemo(
    () => ({
      height: triggerConfig.height ?? DEFAULT_CONFIG.nestedItemHeight,
      paddingX: triggerConfig.paddingX ?? DEFAULT_CONFIG.nestedItemPaddingX,
      paddingY: triggerConfig.paddingY ?? DEFAULT_CONFIG.nestedItemPaddingY,
      fontSize: triggerConfig.fontSize ?? DEFAULT_CONFIG.nestedItemFontSize,
      backgroundColor: triggerConfig.backgroundColor ?? DEFAULT_CONFIG.triggerBackgroundColor,
      backgroundOpacity: triggerConfig.backgroundOpacity ?? DEFAULT_CONFIG.triggerBackgroundOpacity,
      borderRadius: triggerConfig.borderRadius ?? DEFAULT_CONFIG.nestedItemBorderRadius,
      showChevron: triggerConfig.showChevron ?? DEFAULT_CONFIG.showChevron,
    }),
    [triggerConfig]
  )

  const mergedItemConfig = useMemo(
    () => ({
      itemHeight: itemConfig.itemHeight ?? DEFAULT_CONFIG.nestedItemHeight,
      strokeWidth: itemConfig.strokeWidth ?? DEFAULT_CONFIG.lineStrokeWidth,
      cornerRadius: itemConfig.cornerRadius ?? DEFAULT_CONFIG.lineCornerRadius,
      lineColor: itemConfig.lineColor ?? DEFAULT_CONFIG.lineColor,
      paddingX: itemConfig.paddingX ?? DEFAULT_CONFIG.nestedItemPaddingX,
      borderRadius: itemConfig.borderRadius ?? DEFAULT_CONFIG.nestedItemBorderRadius,
      containerLeftPadding: itemConfig.containerLeftPadding ?? DEFAULT_CONFIG.containerLeftPadding,
      containerTopPadding: itemConfig.containerTopPadding ?? DEFAULT_CONFIG.containerTopPadding,
      buttonGap: itemConfig.buttonGap ?? DEFAULT_CONFIG.buttonGap,
      visualOffset: itemConfig.visualOffset ?? DEFAULT_CONFIG.visualOffset,
      firstLineOffset: itemConfig.firstLineOffset ?? DEFAULT_CONFIG.firstLineOffset,
      animationDistance: itemConfig.animationDistance ?? 29,
    }),
    [itemConfig]
  )

  const lineGeometry = useMemo(
    () =>
      calculateLineGeometry({
        nestedItemHeight: mergedItemConfig.itemHeight,
        buttonGap: mergedItemConfig.buttonGap,
        visualOffset: mergedItemConfig.visualOffset,
        containerTopPadding: mergedItemConfig.containerTopPadding,
        firstLineOffset: mergedItemConfig.firstLineOffset,
      }),
    [mergedItemConfig]
  )

  const childCount = React.Children.count(children)

  const handleToggle = useCallback(() => {
    const newExpanded = !isExpanded
    if (!isControlled) {
      setInternalExpanded(newExpanded)
    }
    onExpandedChange?.(newExpanded)
    onLabelClick?.()
    if (newExpanded) {
      setAnimationKey((k) => k + 1)
    }
  }, [isExpanded, isControlled, onExpandedChange, onLabelClick])

  const maxHeight = useMemo(() => {
    const itemsHeight = childCount * mergedItemConfig.itemHeight
    const gapsHeight = Math.max(0, childCount - 1) * mergedItemConfig.buttonGap
    const padding = mergedItemConfig.containerTopPadding
    return itemsHeight + gapsHeight + padding + 20
  }, [childCount, mergedItemConfig])

  const contextValue = useMemo<AccordionContextValue>(
    () => ({
      isExpanded,
      lineGeometry,
      config: {
        itemHeight: mergedItemConfig.itemHeight,
        strokeWidth: mergedItemConfig.strokeWidth,
        cornerRadius: mergedItemConfig.cornerRadius,
        lineColor: mergedItemConfig.lineColor,
        paddingX: mergedItemConfig.paddingX,
        borderRadius: mergedItemConfig.borderRadius,
        animationDistance: mergedItemConfig.animationDistance,
      },
    }),
    [isExpanded, lineGeometry, mergedItemConfig]
  )

  const indexedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement<AccordionItemProps>(child)) {
      return React.cloneElement(child, { index })
    }
    return child
  })

  const bgColor = useMemo(
    () =>
      mergedTriggerConfig.backgroundColor === 'transparent'
        ? 'transparent'
        : `color-mix(in srgb, ${mergedTriggerConfig.backgroundColor} ${mergedTriggerConfig.backgroundOpacity}%, transparent)`,
    [mergedTriggerConfig.backgroundColor, mergedTriggerConfig.backgroundOpacity]
  )

  return (
    <AccordionContext.Provider value={contextValue}>
      <div>
        {/* Trigger */}
        <div
          className="group hover:bg-secondary_hover flex cursor-pointer items-center gap-2 transition-colors"
          style={{
            height: `${mergedTriggerConfig.height}px`,
            paddingLeft: `${mergedTriggerConfig.paddingX}px`,
            paddingRight: `${mergedTriggerConfig.paddingX}px`,
            paddingTop: `${mergedTriggerConfig.paddingY}px`,
            paddingBottom: `${mergedTriggerConfig.paddingY}px`,
            backgroundColor: bgColor,
            borderRadius: `${mergedTriggerConfig.borderRadius}px`,
          }}
          onClick={toggleOnChevronOnly ? onLabelClick : handleToggle}
        >
          {icon && <HugeIcon icon={icon} size={18} strokeWidth={1.5} className="text-tertiary shrink-0" />}
          <span className="text-tertiary font-medium" style={{ fontSize: `${mergedTriggerConfig.fontSize}px` }}>
            {label}
          </span>
          {showCount && (
            <span className="text-tertiary/50 font-medium" style={{ fontSize: `${mergedTriggerConfig.fontSize}px` }}>
              {childCount}
            </span>
          )}
          {mergedTriggerConfig.showChevron && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleToggle()
              }}
              className="group/chevron -mr-1 cursor-pointer rounded p-0.5 hover:bg-tertiary/10"
            >
              <HugeIcon
                icon={ArrowDown01Icon}
                size={16}
                strokeWidth={0}
                className={`text-tertiary transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
                style={{ transitionDuration: `${ANIMATION_CONFIG.chevronAnimationDuration}ms` }}
              />
            </button>
          )}
        </div>

        {/* Content */}
        <div
          className="overflow-hidden"
          style={{
            maxHeight: isExpanded ? `${maxHeight}px` : '0px',
            opacity: isExpanded ? 1 : 0,
            transition: `max-height ${ANIMATION_CONFIG.accordionDuration}ms ease-in-out, opacity ${isExpanded ? ANIMATION_CONFIG.accordionDuration : 80}ms ease-${isExpanded ? 'in' : 'out'}`,
          }}
        >
          <div
            key={animationKey}
            className="flex flex-col"
            style={{
              paddingTop: `${mergedItemConfig.containerTopPadding}px`,
              paddingLeft: `${mergedItemConfig.containerLeftPadding}px`,
              gap: `${mergedItemConfig.buttonGap}px`,
            }}
          >
            {indexedChildren}
          </div>
        </div>
      </div>
    </AccordionContext.Provider>
  )
}

// ============================================================================
// COMPOUND COMPONENT EXPORT
// ============================================================================

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
})
