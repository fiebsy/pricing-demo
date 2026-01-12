/**
 * Collections Module - Mock Pagination Hook
 *
 * Simulates server-side pagination with delayed loading
 * for realistic infinite scroll testing.
 */

'use client'

import { useState, useCallback, useMemo, useRef, useEffect } from 'react'

import type { PartnerRiskItem, PartnerRiskSortField, PartnerRiskSortOrder } from '../types'
import { MOCK_DATA, MOCK_METRICS } from '../mock-data'
import { PAGE_SIZE } from '../config/column-config'

// =============================================================================
// TYPES
// =============================================================================

interface UseMockPaginationProps {
  /** Initial page size */
  pageSize?: number
  /** Sort field */
  sortBy?: PartnerRiskSortField
  /** Sort order */
  sortOrder?: PartnerRiskSortOrder
  /** Search query */
  searchQuery?: string
  /** Simulated network delay in ms */
  delay?: number
}

interface UseMockPaginationReturn {
  /** Currently loaded items */
  items: PartnerRiskItem[]
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
  metrics: typeof MOCK_METRICS
}

// =============================================================================
// SORT COMPARATORS
// =============================================================================

const SORT_COMPARATORS: Record<PartnerRiskSortField, (a: PartnerRiskItem, b: PartnerRiskItem) => number> = {
  ID: (a, b) => a.id - b.id,
  REMAINING_BALANCE: (a, b) => (a.remainingBalance ?? 0) - (b.remainingBalance ?? 0),
  CONTRACT_DATE: (a, b) => {
    const dateA = a.contractDate?.getTime() ?? 0
    const dateB = b.contractDate?.getTime() ?? 0
    return dateA - dateB
  },
  LAST_PAYMENT_CLEARED_DATE: (a, b) => {
    const dateA = a.lastPaymentClearedDate?.getTime() ?? 0
    const dateB = b.lastPaymentClearedDate?.getTime() ?? 0
    return dateA - dateB
  },
  STATUS_CHANGED_AT: (a, b) => {
    const dateA = a.statusChangedAt?.getTime() ?? 0
    const dateB = b.statusChangedAt?.getTime() ?? 0
    return dateA - dateB
  },
  DAYS_IN_COLLECTIONS: (a, b) => (a.daysInCollections ?? 0) - (b.daysInCollections ?? 0),
  DAYS_UNTIL_CLAWBACK: (a, b) => (a.daysUntilClawback ?? 999) - (b.daysUntilClawback ?? 999),
  AT_RISK_FUNDED_AMOUNT: (a, b) => (a.atRiskFundedAmount ?? 0) - (b.atRiskFundedAmount ?? 0),
  SHORTFALL_AMOUNT: (a, b) => (a.shortfallAmount ?? 0) - (b.shortfallAmount ?? 0),
}

// =============================================================================
// HOOK
// =============================================================================

export const useMockPagination = ({
  pageSize = PAGE_SIZE,
  sortBy = 'STATUS_CHANGED_AT',
  sortOrder = 'DESC',
  searchQuery,
  delay = 300,
}: UseMockPaginationProps = {}): UseMockPaginationReturn => {
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
    let data = [...MOCK_DATA]

    // Apply search filter
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      data = data.filter(
        (item) =>
          item.customerName.toLowerCase().includes(query) ||
          item.customerEmail?.toLowerCase().includes(query) ||
          item.contractId.toString().includes(query)
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
    metrics: MOCK_METRICS,
  }
}
