import { config } from '../config/index.js'
import type {
  GitHubSearchResponse,
  Repository,
  SearchQuery,
  GitHubIssueSearchResponse,
  Issue,
  IssueSearchQuery,
} from '../types/index.js'

/**
 * Service for interacting with GitHub API
 * Handles all GitHub-related business logic
 */
export class GitHubService {
  private readonly baseUrl: string
  private readonly token: string
  private readonly repoCache = new Map<string, any>()

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
    const {
      q = '',
      language,
      sort = 'stars',
      order = 'desc',
      page = '1',
    } = params

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
      throw new Error(`GitHub API error: ${response.status} - ${errorText}`)
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

  /**
   * Search GitHub issues based on query parameters
   * Focuses on beginner-friendly issues with labels like "good-first-issue"
   * @param params - Search parameters (language, labels, sort, etc.)
   * @returns Mapped issue data with repository information
   */
  async searchIssues(params: IssueSearchQuery): Promise<{
    totalCount: number
    items: Issue[]
  }> {
    const {
      language,
      labels = 'good-first-issue,help-wanted',
      sort = 'created',
      order = 'desc',
      page = '1',
    } = params

    // Build search query for open issues with specified labels
    let query = 'is:issue is:open'

    // Add labels to query
    const labelList = labels.split(',').filter(Boolean)
    labelList.forEach((label) => {
      query += ` label:"${label.trim()}"`
    })

    // Add language filter if specified
    if (language) {
      query += ` language:${language}`
    }

    // Build URL parameters
    const searchParams = new URLSearchParams({
      q: query,
      sort,
      order,
      per_page: '30',
      page,
    })

    // Make request to GitHub API
    const url = `${this.baseUrl}/search/issues?${searchParams.toString()}`
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
      throw new Error(`GitHub API error: ${response.status} - ${errorText}`)
    }

    const data = (await response.json()) as GitHubIssueSearchResponse

    // Fetch repository details for each issue
    const mappedItems = await this.mapIssues(data.items)

    return {
      totalCount: data.total_count,
      items: mappedItems,
    }
  }

  /**
   * Maps GitHub API issue format to our internal format
   * Also fetches repository details for each issue
   */
  private async mapIssues(
    issues: GitHubIssueSearchResponse['items'],
  ): Promise<Issue[]> {
    // Fetch repository details for each unique repository
    const repoDetailsMap = new Map<string, any>()

    for (const issue of issues) {
      const repoUrl = issue.repository_url
      if (!repoDetailsMap.has(repoUrl)) {
        try {
          const repoDetails = await this.fetchRepositoryDetails(repoUrl)
          repoDetailsMap.set(repoUrl, repoDetails)
        } catch (error) {
          console.error(`Failed to fetch repo details for ${repoUrl}:`, error)
          // Continue with other issues even if one fails
        }
      }
    }

    return issues
      .map((issue) => {
        const repoDetails = repoDetailsMap.get(issue.repository_url)
        if (!repoDetails) return null

        return {
          id: issue.id,
          number: issue.number,
          title: issue.title,
          htmlUrl: issue.html_url,
          state: issue.state,
          createdAt: issue.created_at,
          updatedAt: issue.updated_at,
          comments: issue.comments,
          labels: issue.labels.map((label) => ({
            name: label.name,
            color: label.color,
          })),
          repository: {
            fullName: repoDetails.full_name,
            htmlUrl: repoDetails.html_url,
            stargazersCount: repoDetails.stargazers_count,
            language: repoDetails.language,
            owner: {
              login: repoDetails.owner?.login,
              avatarUrl: repoDetails.owner?.avatar_url,
            },
          },
        }
      })
      .filter((issue): issue is Issue => issue !== null)
  }

  /**
   * Fetches detailed information about a repository
   * @param repoUrl - GitHub API repository URL
   */
  private async fetchRepositoryDetails(repoUrl: string): Promise<any> {
    if (this.repoCache.has(repoUrl)) {
      return this.repoCache.get(repoUrl)
    }

    const headers: HeadersInit = {
      Accept: 'application/vnd.github+json',
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const response = await fetch(repoUrl, { headers })

    if (!response.ok) {
      throw new Error(`Failed to fetch repository: ${response.status}`)
    }

    const data = await response.json()
    this.repoCache.set(repoUrl, data)
    return data
  }
}

// Export a singleton instance
export const githubService = new GitHubService()
