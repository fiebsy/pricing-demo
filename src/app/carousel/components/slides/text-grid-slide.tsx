'use client'

import { motion } from 'motion/react'
import type { Slide, GridSection } from '../../data/slides'

/**
 * Text grid slide with heading + items sections
 *
 * Configure via slide.gridSections in data/slides.ts
 */

const DEFAULT_SECTIONS: GridSection[] = [
  {
    heading: 'Healthy',
    items: [
      { text: 'In repayment' },
      { text: 'Modified payment' },
    ],
  },
  {
    heading: 'Risk',
    items: [
      { highlight: 'At risk:', text: 'Low health, Critical' },
      { highlight: 'Lost:', text: 'Shortfalls, Clawbacks' },
    ],
  },
]

interface TextGridSlideProps {
  slide: Slide
}

export function TextGridSlide({ slide }: TextGridSlideProps) {
  const sections = slide.gridSections || DEFAULT_SECTIONS

  return (
    <div className="flex flex-col gap-20 text-left">
      {sections.map((section, sectionIndex) => (
        <motion.div
          key={section.heading}
          className="flex items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + sectionIndex * 0.1 }}
        >
          <h2 className="font-display text-display-sm font-semibold text-primary w-[180px] shrink-0">
            {section.heading}
          </h2>
          <div className="flex flex-col gap-3">
            {section.items.map((item, itemIndex) => (
              <p key={itemIndex} className="text-lg text-tertiary">
                {item.highlight && (
                  <span className="font-semibold text-secondary">{item.highlight} </span>
                )}
                {item.text}
              </p>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
