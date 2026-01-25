/**
 * useBioKeywords Hook
 *
 * Extracts and highlights keywords from bio text.
 *
 * @module b/profile-v2/hooks
 */

import { useMemo } from 'react'
import type * as React from 'react'

// =============================================================================
// TYPES
// =============================================================================

export interface BioKeyword {
  word: string
  start: number
  end: number
}

export interface UseBioKeywordsReturn {
  /** Array of found keywords with positions */
  keywords: BioKeyword[]
  /** Check if a word is a keyword */
  isKeyword: (word: string) => boolean
}

// =============================================================================
// DEFAULT KEYWORDS
// =============================================================================

const DEFAULT_KEYWORDS = [
  'design',
  'designer',
  'engineer',
  'engineering',
  'developer',
  'development',
  'product',
  'user experience',
  'UI',
  'UX',
  'code',
  'coding',
  'build',
  'builder',
  'create',
  'creating',
  'passionate',
  'passion',
  'delightful',
  'thoughtful',
  'clean',
  'iteration',
  'feedback',
  'mentoring',
  'aspiring',
]

// =============================================================================
// HOOK
// =============================================================================

export function useBioKeywords(
  bio: string,
  customKeywords?: string[]
): UseBioKeywordsReturn {
  const keywordList = customKeywords || DEFAULT_KEYWORDS

  const keywords = useMemo<BioKeyword[]>(() => {
    const found: BioKeyword[] = []
    const lowerBio = bio.toLowerCase()

    for (const keyword of keywordList) {
      const lowerKeyword = keyword.toLowerCase()
      let start = 0

      while ((start = lowerBio.indexOf(lowerKeyword, start)) !== -1) {
        // Check word boundaries
        const beforeChar = start > 0 ? lowerBio[start - 1] : ' '
        const afterChar =
          start + lowerKeyword.length < lowerBio.length
            ? lowerBio[start + lowerKeyword.length]
            : ' '

        const isWordBoundaryBefore = /[\s.,!?;:'"()\-]/.test(beforeChar)
        const isWordBoundaryAfter = /[\s.,!?;:'"()\-]/.test(afterChar)

        if (isWordBoundaryBefore && isWordBoundaryAfter) {
          found.push({
            word: bio.slice(start, start + keyword.length),
            start,
            end: start + keyword.length,
          })
        }

        start += 1
      }
    }

    // Sort by position
    return found.sort((a, b) => a.start - b.start)
  }, [bio, keywordList])

  const isKeyword = useMemo(() => {
    const keywordSet = new Set(keywordList.map((k) => k.toLowerCase()))
    return (word: string) => keywordSet.has(word.toLowerCase())
  }, [keywordList])

  return {
    keywords,
    isKeyword,
  }
}
