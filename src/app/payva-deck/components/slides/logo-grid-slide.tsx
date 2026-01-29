'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { contentDelays } from '../../lib/animations'
import { slideTypography } from '../../lib/typography'
import { slideSpacing } from '../../lib/spacing'
import { SlideLayout } from '../slide-layout'
import { SlideCard } from '../slide-card'
import type { SlideProps } from './index'

export function LogoGridSlide({
  slide,
  variant,
  slideNumber,
  totalSlides,
  isLightMode,
}: SlideProps) {
  const logos = slide.logoConfig?.logos ?? []
  const columns = slide.logoConfig?.columns ?? 3
  const supporting = slide.logoConfig?.supporting

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

        {/* Logo Grid */}
        <div
          className={`grid ${slideSpacing.cards.grid} max-w-3xl mx-auto`}
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {logos.map((logo, index) => (
            <SlideCard
              key={index}
              className={`flex flex-col items-center justify-center gap-4 ${slideSpacing.cardPadding.logo} min-h-[200px]`}
              delay={contentDelays.stat + index * 0.1}
            >
              {/* Logo Image or Text Display */}
              <div className="flex items-center justify-center h-24 w-full px-4">
                {logo.isTextCard ? (
                  // Text card (50+ Integration Partners)
                  <span className={`${slideTypography.statValueMd} text-primary`}>
                    {logo.displayText}
                  </span>
                ) : logo.src ? (
                  // Logo image - use img tag for PDF export compatibility
                  variant === 'light' ? (
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="max-w-full h-auto object-contain"
                      style={{ 
                        maxHeight: '80px', 
                        width: 'auto',
                        imageRendering: 'crisp-edges',
                        WebkitFontSmoothing: 'antialiased'
                      }}
                    />
                  ) : (
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={200}
                      height={80}
                      className="max-w-full h-auto object-contain"
                      style={{ maxHeight: '80px' }}
                    />
                  )
                ) : (
                  // Fallback text
                  <span className={slideTypography.cardTitle}>
                    {logo.name}
                  </span>
                )}
              </div>
              
              {/* Company Name as Subtext - using supporting style */}
              {!logo.isTextCard && (
                <span className={slideTypography.supporting}>
                  {logo.displayText || logo.name}
                </span>
              )}
              {logo.isTextCard && logo.name !== logo.displayText && (
                <span className={slideTypography.supporting}>
                  {logo.name}
                </span>
              )}
            </SlideCard>
          ))}
        </div>

        {supporting && (
          <motion.p
            className={`${slideTypography.supporting} text-center mt-8`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: contentDelays.stat + logos.length * 0.1 + 0.1 }}
          >
            {supporting}
          </motion.p>
        )}
      </div>
    </SlideLayout>
  )
}
