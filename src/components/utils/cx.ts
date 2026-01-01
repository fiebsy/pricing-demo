import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names using clsx and tailwind-merge
 * Used throughout v2 components for conditional className merging
 */
export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}





