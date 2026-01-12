/**
 * StickyDataTable V2 - Header Props
 *
 * Props interface for TableHeader component.
 *
 * @module types/props/header
 */

import type { RefObject } from 'react'

/** Props for TableHeader component */
export interface TableHeaderProps {
  /** Forwarded ref for scroll container */
  headerRef?: RefObject<HTMLDivElement>
}
