import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names using clsx and tailwind-merge
 * Used throughout control-panel components for conditional className merging
 */
export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Alias for cx - some files use cn naming convention
 */
export const cn = cx
