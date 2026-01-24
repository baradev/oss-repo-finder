import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiService } from '../services/api.service'
import type { SearchParams } from '../types'

/**
 * Hook for managing repository search state and operations
 * Uses TanStack Query for automatic caching and state management
 */
export function useRepositories() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    language: 'TypeScript',
    page: 1,
  })

  // Use TanStack Query to fetch and cache repository data
  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ['repositories', searchParams],
    queryFn: () => apiService.searchRepositories(searchParams),
    enabled: !!searchParams.language || !!searchParams.q, // Only run query if we have search criteria
  })

  const repos = data?.items || []
  const totalCount = data?.totalCount || 0
  const currentPage = searchParams.page || 1
  const totalPages = Math.ceil(totalCount / 20)
  const error = queryError ? (queryError as Error).message : null

  /**
   * Search for repositories
   * Updates search params which triggers a new query (or uses cached data)
   */
  const searchRepositories = useCallback((params: SearchParams) => {
    setSearchParams({ ...params, page: params.page || 1 })
  }, [])

  /**
   * Clear search results
   */
  const clearResults = useCallback(() => {
    setSearchParams({ page: 1 })
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
    repos,
    loading: isLoading,
    error,
    totalCount,
    currentPage,
    totalPages,
    searchRepositories,
    clearResults,
    nextPage,
    previousPage,
  }
}
