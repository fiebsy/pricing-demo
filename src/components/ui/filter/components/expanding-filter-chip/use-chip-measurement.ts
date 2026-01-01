/**
 * Chip Measurement Hook
 *
 * Measures the collapsed and expanded widths of a chip using
 * hidden measurement elements. This allows for smooth width
 * animations without layout thrashing.
 *
 * @module base-ui/filter/components/expanding-filter-chip/use-chip-measurement
 */

import { useState, useRef, useLayoutEffect } from 'react'

export interface ChipMeasurementRefs {
  /** Ref for the full content measurement element */
  measureRef: React.RefObject<HTMLDivElement | null>
  /** Ref for the icon/label portion measurement */
  iconLabelMeasureRef: React.RefObject<HTMLSpanElement | null>
}

export interface ChipMeasurementResult {
  /** Width when collapsed (icon/label only) */
  collapsedWidth: number
  /** Width when fully expanded */
  expandedWidth: number
  /** Refs to attach to measurement elements */
  refs: ChipMeasurementRefs
}

/**
 * useChipMeasurement - Measures chip widths for animation
 *
 * @param deps - Dependencies that trigger re-measurement
 * @returns Measured widths and refs for measurement elements
 */
export function useChipMeasurement(deps: React.DependencyList): ChipMeasurementResult {
  const measureRef = useRef<HTMLDivElement>(null)
  const iconLabelMeasureRef = useRef<HTMLSpanElement>(null)

  const [collapsedWidth, setCollapsedWidth] = useState<number>(0)
  const [expandedWidth, setExpandedWidth] = useState<number>(0)

  useLayoutEffect(() => {
    if (measureRef.current) {
      setExpandedWidth(measureRef.current.offsetWidth)
    }
    if (iconLabelMeasureRef.current) {
      setCollapsedWidth(iconLabelMeasureRef.current.offsetWidth)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return {
    collapsedWidth,
    expandedWidth,
    refs: {
      measureRef,
      iconLabelMeasureRef,
    },
  }
}
