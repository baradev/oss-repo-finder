import { config } from '../config/index.js'
import type {
  GitHubSearchResponse,
  Repository,
  SearchQuery,
} from '../types/index.js'

/**
 * Service for interacting with GitHub API
 * Handles all GitHub-related business logic
 */
export class GitHubService {
  private readonly baseUrl: string
  private readonly token: string

  constructor() {
    this.baseUrl = config.github.apiUrl
    this.token = config.github.token
  }

  /**
   * Search GitHub repositories based on query parameters
   * @param params - Search parameters (query, language, sort, etc.)
   * @returns Mapped repository data
   */
  async searchRepositories(params: SearchQuery): Promise<{
    totalCount: number
    items: Repository[]
  }> {
    const { q = '', language, sort = 'stars', order = 'desc', page = '1' } = params

    // Build search query
    let query = q.trim() || 'stars:>100'
    if (language) {
      query += ` language:${language}`
    }

    // Build URL parameters
    const searchParams = new URLSearchParams({
      q: query,
      sort,
      order,
      per_page: '20',
      page,
    })

    // Make request to GitHub API
    const url = `${this.baseUrl}/search/repositories?${searchParams.toString()}`
    const headers: HeadersInit = {
      Accept: 'application/vnd.github+json',
    }

    // Add authorization header if token is available
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const response = await fetch(url, { headers })

    // Handle non-OK responses
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `GitHub API error: ${response.status} - ${errorText}`,
      )
    }

    const data = (await response.json()) as GitHubSearchResponse

    // Map GitHub API response to our internal format
    const mappedItems = this.mapRepositories(data.items)

    return {
      totalCount: data.total_count,
      items: mappedItems,
    }
  }

  /**
   * Maps GitHub API repository format to our internal format
   * Converts snake_case to camelCase and selects only needed fields
   */
  private mapRepositories(repos: GitHubSearchResponse['items']): Repository[] {
    return repos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      htmlUrl: repo.html_url,
      stargazersCount: repo.stargazers_count,
      language: repo.language,
      openIssuesCount: repo.open_issues_count,
      owner: {
        login: repo.owner?.login,
        avatarUrl: repo.owner?.avatar_url,
      },
    }))
  }
}

// Export a singleton instance
export const githubService = new GitHubService()