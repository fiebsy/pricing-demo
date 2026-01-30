import type { ReactNode } from 'react'

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right'
export type TooltipAlign = 'start' | 'center' | 'end'

export interface TooltipProps {
  /**
   * The main title text displayed in the tooltip.
   */
  title: ReactNode

  /**
   * Optional description text displayed below the title.
   */
  description?: ReactNode

  /**
   * Whether to show the arrow pointer.
   * @default false
   */
  arrow?: boolean

  /**
   * Delay in milliseconds before showing the tooltip.
   * @default 300
   */
  delay?: number

  /**
   * Delay in milliseconds before hiding the tooltip.
   * @default 0
   */
  closeDelay?: number

  /**
   * The preferred side to position the tooltip relative to the trigger.
   * @default 'top'
   */
  side?: TooltipSide

  /**
   * The alignment of the tooltip relative to the trigger.
   * @default 'center'
   */
  align?: TooltipAlign

  /**
   * Distance in pixels from the trigger element.
   * @default 6
   */
  sideOffset?: number

  /**
   * Whether the tooltip is disabled.
   * @default false
   */
  disabled?: boolean

  /**
   * Controlled open state.
   */
  open?: boolean

  /**
   * Default open state for uncontrolled usage.
   */
  defaultOpen?: boolean

  /**
   * Callback fired when the open state changes.
   */
  onOpenChange?: (open: boolean) => void

  /**
   * The trigger element that activates the tooltip.
   */
  children: ReactNode
}
