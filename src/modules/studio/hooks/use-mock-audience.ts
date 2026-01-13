/**
 * Studio Module - Mock Audience Pagination Hook
 *
 * Simulates server-side pagination with delayed loading
 * for realistic infinite scroll testing.
 */

'use client'

import { useState, useCallback, useMemo, useRef, useEffect } from 'react'

import type { AudienceUser, AudienceSortField, AudienceSortOrder, AudienceMetrics } from '../types'
import { MOCK_USERS, calculateMetrics } from '../data/mock-users'
import { PAGE_SIZE } from '../config/column-config'

// =============================================================================
// TYPES
// =============================================================================

interface UseMockAudienceProps {
  /** Initial page size */
  pageSize?: number
  /** Sort field */
  sortBy?: AudienceSortField
  /** Sort order */
  sortOrder?: AudienceSortOrder
  /** Search query */
  searchQuery?: string
  /** Simulated network delay in ms */
  delay?: number
}

interface UseMockAudienceReturn {
  /** Currently loaded items */
  items: AudienceUser[]
  /** Initial loading state */
  isLoading: boolean
  /** Loading more state */
  isLoadingMore: boolean
  /** Total count of all items */
  totalCount: number
  /** Whether more items exist */
  hasNextPage: boolean
  /** Load more items callback */
  loadMore: () => Promise<void>
  /** Reset pagination */
  reset: () => void
  /** Metrics data */
  metrics: AudienceMetrics
}

// =============================================================================
// SORT COMPARATORS
// =============================================================================

const SORT_COMPARATORS: Record<AudienceSortField, (a: AudienceUser, b: AudienceUser) => number> = {
  NAME: (a, b) => a.name.localeCompare(b.name),
  MESSAGES: (a, b) => a.messageCount - b.messageCount,
  LAST_INTERACTED: (a, b) => {
    const dateA = a.lastInteracted.getTime()
    const dateB = b.lastInteracted.getTime()
    return dateA - dateB
  },
}

// =============================================================================
// HOOK
// =============================================================================

export const useMockAudience = ({
  pageSize = PAGE_SIZE,
  sortBy = 'LAST_INTERACTED',
  sortOrder = 'DESC',
  searchQuery,
  delay = 300,
}: UseMockAudienceProps = {}): UseMockAudienceReturn => {
  const [loadedCount, setLoadedCount] = useState(pageSize)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const loadMoreRef = useRef<boolean>(false)

  // Simulate initial load
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  // Reset when search/sort changes
  useEffect(() => {
    setLoadedCount(pageSize)
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, delay)
    return () => clearTimeout(timer)
  }, [searchQuery, sortBy, sortOrder, pageSize, delay])

  // Get sorted and filtered data
  const processedData = useMemo(() => {
    let data = [...MOCK_USERS]

    // Apply search filter
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      data = data.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query)
      )
    }

    // Apply sort
    const comparator = SORT_COMPARATORS[sortBy]
    if (comparator) {
      data.sort((a, b) => {
        const result = comparator(a, b)
        return sortOrder === 'ASC' ? result : -result
      })
    }

    return data
  }, [searchQuery, sortBy, sortOrder])

  // Calculate metrics from all users (not just loaded)
  const metrics = useMemo(() => calculateMetrics(MOCK_USERS), [])

  // Get current page of items
  const items = useMemo(() => {
    if (isLoading) return []
    return processedData.slice(0, loadedCount)
  }, [processedData, loadedCount, isLoading])

  const totalCount = processedData.length
  const hasNextPage = loadedCount < totalCount

  // Load more callback
  const loadMore = useCallback(async () => {
    if (loadMoreRef.current || !hasNextPage) return

    loadMoreRef.current = true
    setIsLoadingMore(true)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, delay))

    setLoadedCount((prev) => Math.min(prev + 25, totalCount))
    setIsLoadingMore(false)
    loadMoreRef.current = false
  }, [hasNextPage, totalCount, delay])

  // Reset pagination
  const reset = useCallback(() => {
    setLoadedCount(pageSize)
  }, [pageSize])

  return {
    items,
    isLoading,
    isLoadingMore,
    totalCount,
    hasNextPage,
    loadMore,
    reset,
    metrics,
  }
}
