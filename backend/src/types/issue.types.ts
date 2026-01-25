/**
 * Issue-related types
 */

/**
 * Query parameters for issue search endpoint
 */
export type IssueSearchQuery = {
  language?: string // Programming language filter
  labels?: string // Comma-separated labels (e.g., "good-first-issue,help-wanted")
  sort?: 'created' | 'updated' | 'comments'
  order?: 'asc' | 'desc'
  page?: string // GitHub pagination starts at 1
}

/**
 * GitHub Issue Label structure
 */
export type GitHubLabel = {
  id: number
  name: string
  color: string
  description: string | null
}

/**
 * Issue data structure returned by GitHub API
 */
export type GitHubIssue = {
  id: number
  number: number
  title: string
  html_url: string
  state: string
  created_at: string
  updated_at: string
  comments: number
  labels: GitHubLabel[]
  repository_url: string
  user: {
    login: string
    avatar_url: string
  }
}

/**
 * Simplified issue structure sent to frontend
 */
export type Issue = {
  id: number
  number: number
  title: string
  htmlUrl: string
  state: string
  createdAt: string
  updatedAt: string
  comments: number
  labels: {
    name: string
    color: string
  }[]
  repository: {
    fullName: string
    htmlUrl: string
    stargazersCount: number
    language: string | null
    owner: {
      login: string
      avatarUrl: string
    }
  }
}

/**
 * GitHub API issue search response structure
 */
export type GitHubIssueSearchResponse = {
  total_count: number
  incomplete_results: boolean
  items: GitHubIssue[]
}

/**
 * Our API issue search response structure
 */
export type IssueSearchResponse = {
  totalCount: number
  items: Issue[]
}
