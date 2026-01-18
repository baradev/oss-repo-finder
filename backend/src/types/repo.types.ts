/**
 * Repository-related types
 */

/**
 * Query parameters for repository search endpoint
 */
export type SearchQuery = {
  q?: string // Free text search
  language?: string // Programming language filter (e.g., "TypeScript")
  sort?: 'stars' | 'help-wanted-issues' | 'updated'
  order?: 'asc' | 'desc'
  page?: string // GitHub pagination starts at 1
}

/**
 * Repository data structure returned by GitHub API
 */
export type GitHubRepository = {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  open_issues_count: number
  owner: {
    login: string
    avatar_url: string
  }
}

/**
 * Simplified repository structure sent to frontend
 */
export type Repository = {
  id: number
  name: string
  fullName: string
  description: string | null
  htmlUrl: string
  stargazersCount: number
  language: string | null
  openIssuesCount: number
  owner: {
    login: string
    avatarUrl: string
  }
}

/**
 * GitHub API search response structure
 */
export type GitHubSearchResponse = {
  total_count: number
  incomplete_results: boolean
  items: GitHubRepository[]
}

/**
 * Our API search response structure
 */
export type SearchResponse = {
  totalCount: number
  items: Repository[]
}
