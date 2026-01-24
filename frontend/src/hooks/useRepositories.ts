import { useState, useCallback } from 'react'
import { apiService } from '../services/api.service'
import type { Repository, SearchParams } from '../types'

/**
 * Hook for managing repository search state and operations
 * Encapsulates all logic for fetching and managing repository data
 */
export function useRepositories() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [lastSearchParams, setLastSearchParams] = useState<Omit<SearchParams, 'page'>>({})

  /**
   * Search for repositories
   * @param params - Search parameters
   * Wrapped in useCallback to prevent unnecessary re-renders
   */
  const searchRepositories = useCallback(async (params: SearchParams) => {
    setLoading(true)
    setError(null)

    try {
      const data = await apiService.searchRepositories(params)
      setRepos(data.items)
      setTotalCount(data.totalCount)
      setCurrentPage(params.page || 1)

      // Store search params (without page) for pagination
      const { page, ...otherParams } = params
      setLastSearchParams(otherParams)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setError(message)
      setRepos([])
      setTotalCount(0)
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Clear search results
   * Wrapped in useCallback for consistency
   */
  const clearResults = useCallback(() => {
    setRepos([])
    setTotalCount(0)
    setError(null)
    setCurrentPage(1)
    setLastSearchParams({})
  }, [])

  /**
   * Navigate to next page
   */
  const nextPage = useCallback(() => {
    const totalPages = Math.ceil(totalCount / 20) // 20 items per page
    if (currentPage < totalPages) {
      searchRepositories({ ...lastSearchParams, page: currentPage + 1 })
    }
  }, [currentPage, totalCount, lastSearchParams, searchRepositories])

  /**
   * Navigate to previous page
   */
  const previousPage = useCallback(() => {
    if (currentPage > 1) {
      searchRepositories({ ...lastSearchParams, page: currentPage - 1 })
    }
  }, [currentPage, lastSearchParams, searchRepositories])

  return {
    repos,
    loading,
    error,
    totalCount,
    currentPage,
    totalPages: Math.ceil(totalCount / 20),
    searchRepositories,
    clearResults,
    nextPage,
    previousPage,
  }
}
