import { config } from '../config'
import type { SearchParams, SearchResponse } from '../types'

/**
 * API Service for backend communication
 * Handles all HTTP requests to the backend API
 */
class ApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = config.api.baseUrl
  }

  /**
   * Search repositories via backend API
   * @param params - Search parameters (query, language, sort, etc.)
   * @returns Search results with repositories
   */
  async searchRepositories(params: SearchParams): Promise<SearchResponse> {
    const searchParams = new URLSearchParams()

    // Add parameters to URL if they exist
    if (params.q) searchParams.set('q', params.q)
    if (params.language) searchParams.set('language', params.language)
    if (params.sort) searchParams.set('sort', params.sort)
    if (params.order) searchParams.set('order', params.order)
    if (params.page) searchParams.set('page', params.page.toString())

    const url = `${this.baseUrl}/api/repos/search?${searchParams.toString()}`

    const response = await fetch(url)

    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = 'Failed to fetch repositories'
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorMessage
      } catch {
        // If parsing fails, use default message
      }
      throw new Error(errorMessage)
    }

    return response.json()
  }
}

// Export singleton instance
export const apiService = new ApiService()
