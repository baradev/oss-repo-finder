import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiService } from '../services/api.service'
import type { IssueSearchParams } from '../types'

/**
 * Hook for managing issue search state and operations
 * Uses TanStack Query for automatic caching and state management
 */
export function useIssues() {
  const [searchParams, setSearchParams] = useState<IssueSearchParams>({
    labels: 'good-first-issue,help-wanted',
    page: 1,
  })

  // Use TanStack Query to fetch and cache issue data
  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ['issues', searchParams],
    queryFn: () => apiService.searchIssues(searchParams),
  })

  const issues = data?.items || []
  const totalCount = data?.totalCount || 0
  const currentPage = searchParams.page || 1
  const totalPages = Math.ceil(totalCount / 30)
  const error = queryError ? (queryError as Error).message : null

  /**
   * Search for issues
   * Updates search params which triggers a new query (or uses cached data)
   */
  const searchIssues = useCallback((params: IssueSearchParams) => {
    setSearchParams({ ...params, page: params.page || 1 })
  }, [])

  /**
   * Clear search results
   */
  const clearResults = useCallback(() => {
    setSearchParams({ labels: 'good-first-issue,help-wanted', page: 1 })
  }, [])

  /**
   * Navigate to next page
   */
  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setSearchParams((prev) => ({ ...prev, page: currentPage + 1 }))
    }
  }, [currentPage, totalPages])

  /**
   * Navigate to previous page
   */
  const previousPage = useCallback(() => {
    if (currentPage > 1) {
      setSearchParams((prev) => ({ ...prev, page: currentPage - 1 }))
    }
  }, [currentPage])

  return {
    issues,
    loading: isLoading,
    error,
    totalCount,
    currentPage,
    totalPages,
    searchIssues,
    clearResults,
    nextPage,
    previousPage,
  }
}
