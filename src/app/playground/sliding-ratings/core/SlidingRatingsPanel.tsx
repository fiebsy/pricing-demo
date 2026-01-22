/**
 * SlidingRatingsPanel Component
 *
 * A ratings panel with sliding transitions between categories and sub-scores.
 * Inspired by the filter-menu-motion component.
 *
 * When a category is clicked:
 * - Other categories hide with a sliding transition
 * - The selected category's sub-scores slide in
 * - A back button appears to return to the category list
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/sliding-ratings
 */

'use client'

import * as React from 'react'
import { useRef, useLayoutEffect, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'

// Icons
import Briefcase01Icon from '@hugeicons-pro/core-stroke-rounded/Briefcase01Icon'
import Plant01Icon from '@hugeicons-pro/core-stroke-rounded/Plant01Icon'
import Wrench01Icon from '@hugeicons-pro/core-stroke-rounded/Wrench01Icon'
import ChartLineData01Icon from '@hugeicons-pro/core-stroke-rounded/ChartLineData01Icon'
import ArrowLeft01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowLeft01Icon'
import SparklesIcon from '@hugeicons-pro/core-stroke-rounded/SparklesIcon'

import type { SlidingRatingsConfig, CategoryData, CategoryId, AnimationConfig, ScaleOrigin } from '../config/types'
import { getScoreColorClass, getScoreBgClass } from '../config/mock-data'

// =============================================================================
// CONSTANTS
// =============================================================================

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

const SCALE_ORIGIN_MAP: Record<ScaleOrigin, string> = {
  'top-left': 'top left',
  'top': 'top center',
  'top-right': 'top right',
  'left': 'left center',
  'center': 'center center',
  'right': 'right center',
  'bottom-left': 'bottom left',
  'bottom': 'bottom center',
  'bottom-right': 'bottom right',
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Briefcase01Icon,
  Plant01Icon,
  Wrench01Icon,
  ChartLineData01Icon,
}

// =============================================================================
// STYLE HELPERS
// =============================================================================

function buildPanelClasses(config: SlidingRatingsConfig['panel']): string {
  const classes: string[] = []

  if (config.showBackground) {
    classes.push(`bg-${config.background}`)
  }

  if (config.border) {
    classes.push('border', `border-${config.borderColor}`)
  }

  if (config.shine !== 'none') {
    let shineClass = config.shine
    if (config.shineIntensity) {
      shineClass += config.shineIntensity
    }
    if (config.shadow !== 'none') {
      shineClass += `-shadow-${config.shadow}`
    }
    classes.push(shineClass)
  } else if (config.shadow !== 'none') {
    classes.push(`shadow-${config.shadow}`)
  }

  return cn(...classes)
}

function buildPanelStyles(config: SlidingRatingsConfig['panel']): React.CSSProperties {
  return {
    borderRadius: config.borderRadius,
    padding: config.padding,
    width: config.width,
  }
}

// =============================================================================
// PROGRESS BAR COMPONENT
// =============================================================================

interface ProgressBarProps {
  value: number
  networkAverage?: number
  showBenchmark?: boolean
  size?: 'sm' | 'md' | 'lg'
}

function ProgressBar({ value, networkAverage, showBenchmark = false, size = 'md' }: ProgressBarProps) {
  const heightMap = { sm: 'h-1', md: 'h-1.5', lg: 'h-2' }
  const bgClass = getScoreBgClass(value)

  return (
    <div className={cn('relative w-full rounded-full bg-quaternary overflow-hidden', heightMap[size])}>
      {/* Progress fill */}
      <motion.div
        className={cn('h-full rounded-full', bgClass)}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: value / 100 }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        style={{ transformOrigin: 'left' }}
      />
      {/* Network benchmark marker */}
      {showBenchmark && networkAverage !== undefined && (
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-tertiary"
          style={{ left: `${networkAverage}%` }}
        />
      )}
    </div>
  )
}

// =============================================================================
// CATEGORY ROW COMPONENT
// =============================================================================

interface CategoryRowProps {
  category: CategoryData
  config: SlidingRatingsConfig
  onClick: () => void
  isVisible: boolean
  index: number
}

function CategoryRow({ category, config, onClick, isVisible, index }: CategoryRowProps) {
  const Icon = ICON_MAP[category.icon] || Briefcase01Icon
  const colorClass = getScoreColorClass(category.aggregate.current)
  const { categoryRow, animation, separators, layout } = config

  const dividerClasses = separators.showCategoryDividers
    ? cn(
        'border-b last:border-b-0',
        `border-${separators.dividerColor}`,
        separators.dividerStyle === 'dashed' && 'border-dashed',
        separators.dividerStyle === 'dotted' && 'border-dotted'
      )
    : ''

  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -15 },
  }

  return (
    <motion.div
      variants={animation.enableItemFade ? itemVariants : undefined}
      initial={animation.enableItemFade ? 'hidden' : false}
      animate={animation.enableItemFade && isVisible ? 'visible' : false}
      exit={animation.enableItemFade ? 'exit' : undefined}
      transition={{
        duration: animation.opacityDuration / 1000,
        delay: animation.enableItemStagger ? (index * animation.itemStagger) / 1000 : 0,
        ease: EASE_OUT_EXPO,
      }}
      className={cn(dividerClasses)}
      style={{ marginBottom: layout.categoryGap }}
    >
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'w-full flex items-center gap-3 py-3 px-2 rounded-lg text-left',
          categoryRow.hoverEffect && 'hover:bg-secondary/50',
          'motion-safe:transition-colors motion-safe:duration-150',
          'motion-reduce:transition-none'
        )}
      >
        {/* Icon */}
        {categoryRow.showIcon && (
          <div className="size-8 rounded-lg bg-quaternary flex items-center justify-center shrink-0">
            <HugeIcon icon={Icon} size={16} strokeWidth={1.5} className="text-secondary" />
          </div>
        )}

        {/* Label and progress */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-primary">{category.label}</span>
            <span className={cn('text-sm font-semibold tabular-nums', colorClass)}>
              {category.aggregate.current}
            </span>
          </div>
          {categoryRow.showProgressBar && (
            <ProgressBar
              value={category.aggregate.current}
              networkAverage={category.aggregate.networkAverage}
              showBenchmark={categoryRow.showNetworkBenchmark}
              size={categoryRow.progressBarSize}
            />
          )}
        </div>

        {/* Arrow indicator */}
        <div className="shrink-0 text-tertiary">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {/* Improve button - separate from main button */}
      {categoryRow.showImproveButton && (
        <div className="px-2 pb-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              console.log('Improve:', category.id)
            }}
            className={cn(
              'px-2.5 py-1 rounded-lg',
              'text-xs font-medium',
              'bg-brand-primary/10 text-brand-primary',
              'hover:bg-brand-primary/20',
              'motion-safe:transition-colors motion-safe:duration-150',
              'motion-reduce:transition-none',
              'flex items-center gap-1'
            )}
          >
            <HugeIcon icon={SparklesIcon} size={12} strokeWidth={2} className="text-current" />
            Improve
          </button>
        </div>
      )}
    </motion.div>
  )
}

// =============================================================================
// SUB-SCORE ROW COMPONENT
// =============================================================================

interface SubScoreRowProps {
  item: CategoryData['subScores'][0]
  config: SlidingRatingsConfig
  isVisible: boolean
  index: number
}

function SubScoreRow({ item, config, isVisible, index }: SubScoreRowProps) {
  const colorClass = getScoreColorClass(item.score.current)
  const { subScore, animation, separators, layout } = config

  const textSizeMap = { xs: 'text-xs', sm: 'text-sm', md: 'text-base' }

  const dividerClasses = separators.showSubScoreDividers
    ? cn(
        'border-b last:border-b-0',
        `border-${separators.dividerColor}`,
        separators.dividerStyle === 'dashed' && 'border-dashed',
        separators.dividerStyle === 'dotted' && 'border-dotted'
      )
    : ''

  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, x: 15 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 15 },
  }

  return (
    <motion.div
      variants={animation.enableItemFade ? itemVariants : undefined}
      initial={animation.enableItemFade ? 'hidden' : false}
      animate={animation.enableItemFade && isVisible ? 'visible' : false}
      exit={animation.enableItemFade ? 'exit' : undefined}
      transition={{
        duration: animation.opacityDuration / 1000,
        delay: animation.enableItemStagger ? (index * animation.itemStagger) / 1000 : 0,
        ease: EASE_OUT_EXPO,
      }}
      className={cn('py-2.5 px-2', dividerClasses)}
      style={{ marginBottom: layout.subScoreGap }}
    >
      <div className="flex items-center justify-between mb-1">
        <span className={cn('text-secondary', textSizeMap[subScore.textSize])}>{item.label}</span>
        <div className="flex items-center gap-2">
          <span className={cn('font-semibold tabular-nums', textSizeMap[subScore.textSize], colorClass)}>
            {item.score.current}
          </span>
          {subScore.showImproveButton && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                console.log('Improve sub-score:', item.id)
              }}
              className={cn(
                'px-2 py-0.5 rounded-md',
                'text-xs font-medium',
                'bg-brand-primary/10 text-brand-primary',
                'hover:bg-brand-primary/20',
                'motion-safe:transition-colors motion-safe:duration-150',
                'motion-reduce:transition-none',
                'flex items-center gap-1'
              )}
            >
              <HugeIcon icon={SparklesIcon} size={10} strokeWidth={2} className="text-current" />
              Improve
            </button>
          )}
        </div>
      </div>
      {subScore.showProgressBar && (
        <ProgressBar
          value={item.score.current}
          networkAverage={item.score.networkAverage}
          showBenchmark={subScore.showNetworkBenchmark}
          size={subScore.progressBarSize}
        />
      )}
    </motion.div>
  )
}

// =============================================================================
// BACK BUTTON COMPONENT
// =============================================================================

interface BackButtonProps {
  title: string
  onBack: () => void
  config: SlidingRatingsConfig
  isVisible: boolean
}

function BackButton({ title, onBack, config, isVisible }: BackButtonProps) {
  const { backButton, animation, layout } = config

  const styleClasses = {
    minimal: 'hover:bg-secondary/50',
    pill: 'bg-secondary hover:bg-tertiary rounded-full',
    ghost: 'hover:text-primary',
  }

  const positionClasses = {
    left: 'justify-start',
    center: 'justify-center',
  }

  return (
    <motion.div
      initial={animation.enableItemFade ? { opacity: 0, x: 15 } : false}
      animate={animation.enableItemFade && isVisible ? { opacity: 1, x: 0 } : false}
      exit={animation.enableItemFade ? { opacity: 0, x: 15 } : undefined}
      transition={{ duration: animation.opacityDuration / 1000, ease: EASE_OUT_EXPO }}
      className={cn('flex items-center', positionClasses[backButton.position])}
      style={{ paddingBottom: layout.headerPadding }}
    >
      <button
        type="button"
        onClick={onBack}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg',
          'text-secondary',
          'motion-safe:transition-colors motion-safe:duration-150',
          'motion-reduce:transition-none',
          styleClasses[backButton.style]
        )}
      >
        {backButton.showIcon && (
          <HugeIcon icon={ArrowLeft01Icon} size={16} strokeWidth={2} className="text-current" />
        )}
        <span className="text-sm font-medium">{title}</span>
      </button>
    </motion.div>
  )
}

// =============================================================================
// HEIGHT MEASUREMENT HOOK
// =============================================================================

function useHeightMeasurement(
  isOpen: boolean,
  selectedCategory: CategoryId | null
) {
  const categoriesRef = useRef<HTMLDivElement>(null)
  const subScoresRef = useRef<HTMLDivElement>(null)
  const [categoriesHeight, setCategoriesHeight] = useState<number | 'auto'>('auto')
  const [subScoresHeight, setSubScoresHeight] = useState<number | 'auto'>('auto')

  const measurePanels = useCallback(() => {
    if (categoriesRef.current) {
      setCategoriesHeight(categoriesRef.current.scrollHeight)
    }
    if (subScoresRef.current) {
      setSubScoresHeight(subScoresRef.current.scrollHeight)
    }
  }, [])

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => measurePanels())
    })
  }, [measurePanels])

  useEffect(() => {
    if (!selectedCategory) return
    const timeoutId = setTimeout(measurePanels, 50)
    return () => clearTimeout(timeoutId)
  }, [selectedCategory, measurePanels])

  useEffect(() => {
    const observer = new ResizeObserver(measurePanels)
    if (categoriesRef.current) observer.observe(categoriesRef.current)
    if (subScoresRef.current) observer.observe(subScoresRef.current)
    return () => observer.disconnect()
  }, [measurePanels])

  return { categoriesRef, subScoresRef, categoriesHeight, subScoresHeight }
}

// =============================================================================
// SLIDING PANEL CONTAINER
// =============================================================================

interface SlidingPanelContainerProps {
  inSubScores: boolean
  animation: AnimationConfig
  categoriesPanel: React.ReactNode
  subScoresPanel: React.ReactNode
  categoriesRef: React.RefObject<HTMLDivElement | null>
  subScoresRef: React.RefObject<HTMLDivElement | null>
  targetHeight: number | 'auto'
}

function SlidingPanelContainer({
  inSubScores,
  animation,
  categoriesPanel,
  subScoresPanel,
  categoriesRef,
  subScoresRef,
  targetHeight,
}: SlidingPanelContainerProps) {
  const { slideOffset, stripWidth, panelExitScale, panelEnterScale, panelScaleOrigin, slideDuration, heightDuration } =
    animation

  const transformOrigin = SCALE_ORIGIN_MAP[panelScaleOrigin]
  const useOverlap = slideOffset < 50

  if (animation.panelTransitionMode === 'popLayout') {
    // PopLayout mode - AnimatePresence with scale transitions
    const duration = slideDuration / 1000

    const categoriesVariants = {
      initial: { scale: panelEnterScale, opacity: animation.enableCrossfade ? 0 : 1, x: -20 },
      animate: { scale: 1, opacity: 1, x: 0 },
      exit: { scale: panelExitScale, opacity: animation.enableCrossfade ? 0 : 1, x: -20 },
    }

    const subScoresVariants = {
      initial: { scale: panelEnterScale, opacity: animation.enableCrossfade ? 0 : 1, x: 20 },
      animate: { scale: 1, opacity: 1, x: 0 },
      exit: { scale: panelExitScale, opacity: animation.enableCrossfade ? 0 : 1, x: 20 },
    }

    const transition = { duration, ease: EASE_OUT_EXPO }

    return (
      <motion.div
        className="relative overflow-hidden"
        initial={false}
        animate={{ height: animation.animateHeight ? targetHeight : 'auto' }}
        transition={{ duration: heightDuration / 1000, ease: EASE_OUT_EXPO }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {inSubScores ? (
            <motion.div
              key="subscores"
              ref={subScoresRef}
              variants={subScoresVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
              style={{ transformOrigin }}
            >
              {subScoresPanel}
            </motion.div>
          ) : (
            <motion.div
              key="categories"
              ref={categoriesRef}
              variants={categoriesVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
              style={{ transformOrigin }}
            >
              {categoriesPanel}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  // Slide mode
  if (useOverlap) {
    // Stacked panels with translate for overlap effect
    return (
      <motion.div
        className="relative"
        initial={false}
        animate={{ height: animation.animateHeight ? targetHeight : 'auto' }}
        transition={{ duration: heightDuration / 1000, ease: EASE_OUT_EXPO }}
      >
        {/* Categories panel - slides out to left */}
        <motion.div
          ref={categoriesRef}
          initial={false}
          animate={{
            x: inSubScores ? `${-100 + (50 - slideOffset)}%` : '0%',
            opacity: inSubScores ? 0 : 1,
            scale: inSubScores ? panelExitScale : 1,
          }}
          transition={{ duration: slideDuration / 1000, ease: EASE_OUT_EXPO }}
          className="absolute inset-0"
          style={{ zIndex: inSubScores ? 0 : 1, transformOrigin }}
        >
          {categoriesPanel}
        </motion.div>
        {/* Sub-scores panel - slides in from right */}
        <motion.div
          ref={subScoresRef}
          initial={false}
          animate={{
            x: inSubScores ? '0%' : `${100 - (50 - slideOffset)}%`,
            opacity: inSubScores ? 1 : 0,
            scale: inSubScores ? 1 : panelEnterScale,
          }}
          transition={{ duration: slideDuration / 1000, ease: EASE_OUT_EXPO }}
          style={{ zIndex: inSubScores ? 1 : 0, transformOrigin }}
        >
          {subScoresPanel}
        </motion.div>
      </motion.div>
    )
  }

  // Standard side-by-side strip mode
  const panelWidthPercent = (100 / stripWidth) * 100

  return (
    <motion.div
      className="relative overflow-hidden"
      initial={false}
      animate={{ height: animation.animateHeight ? targetHeight : 'auto' }}
      transition={{ duration: heightDuration / 1000, ease: EASE_OUT_EXPO }}
    >
      <motion.div
        initial={false}
        animate={{ x: inSubScores ? `${-slideOffset}%` : '0%' }}
        transition={{ duration: slideDuration / 1000, ease: EASE_OUT_EXPO }}
        className="flex items-start"
        style={{ width: `${stripWidth}%` }}
      >
        <motion.div
          ref={categoriesRef}
          initial={false}
          animate={{ scale: inSubScores ? panelExitScale : 1 }}
          transition={{ duration: slideDuration / 1000, ease: EASE_OUT_EXPO }}
          className="flex-shrink-0"
          style={{ width: `${panelWidthPercent}%`, transformOrigin }}
        >
          {categoriesPanel}
        </motion.div>
        <motion.div
          ref={subScoresRef}
          initial={false}
          animate={{ scale: inSubScores ? 1 : panelEnterScale }}
          transition={{ duration: slideDuration / 1000, ease: EASE_OUT_EXPO }}
          className="flex-shrink-0"
          style={{ width: `${panelWidthPercent}%`, transformOrigin }}
        >
          {subScoresPanel}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export interface SlidingRatingsPanelProps {
  categories: CategoryData[]
  config: SlidingRatingsConfig
  className?: string
}

export function SlidingRatingsPanel({ categories, config, className }: SlidingRatingsPanelProps) {
  const shouldReduceMotion = useReducedMotion()
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null)
  const inSubScores = selectedCategory !== null

  const selectedCategoryData = categories.find((c) => c.id === selectedCategory)

  const { categoriesRef, subScoresRef, categoriesHeight, subScoresHeight } = useHeightMeasurement(
    true,
    selectedCategory
  )

  const targetHeight = inSubScores ? subScoresHeight : categoriesHeight

  // Handlers
  const handleCategoryClick = useCallback((categoryId: CategoryId) => {
    setSelectedCategory(categoryId)
  }, [])

  const handleBack = useCallback(() => {
    setSelectedCategory(null)
  }, [])

  // Use reduced motion config if needed
  const effectiveAnimation: AnimationConfig = shouldReduceMotion
    ? {
        ...config.animation,
        slideDuration: 0,
        heightDuration: 0,
        opacityDuration: 0,
        enableItemFade: false,
        enableItemStagger: false,
        enableCrossfade: false,
      }
    : config.animation

  return (
    <aside
      className={cn('overflow-hidden', buildPanelClasses(config.panel), className)}
      style={buildPanelStyles(config.panel)}
    >
      <SlidingPanelContainer
        inSubScores={inSubScores}
        animation={effectiveAnimation}
        categoriesRef={categoriesRef}
        subScoresRef={subScoresRef}
        targetHeight={targetHeight}
        categoriesPanel={
          <div>
            {categories.map((category, index) => (
              <CategoryRow
                key={category.id}
                category={category}
                config={{ ...config, animation: effectiveAnimation }}
                onClick={() => handleCategoryClick(category.id)}
                isVisible={!inSubScores}
                index={index}
              />
            ))}
          </div>
        }
        subScoresPanel={
          <div>
            {selectedCategoryData && (
              <>
                <BackButton
                  title={selectedCategoryData.label}
                  onBack={handleBack}
                  config={{ ...config, animation: effectiveAnimation }}
                  isVisible={inSubScores}
                />
                {selectedCategoryData.subScores.map((subScore, index) => (
                  <SubScoreRow
                    key={subScore.id}
                    item={subScore}
                    config={{ ...config, animation: effectiveAnimation }}
                    isVisible={inSubScores}
                    index={index}
                  />
                ))}
              </>
            )}
          </div>
        }
      />
    </aside>
  )
}
