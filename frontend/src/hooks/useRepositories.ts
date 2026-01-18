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
  }, [])

  return {
    repos,
    loading,
    error,
    totalCount,
    searchRepositories,
    clearResults,
  }
}
