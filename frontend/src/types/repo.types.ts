/**
 * Repository-related types for frontend
 * These should match the backend API responses
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

export type SearchResponse = {
  totalCount: number
  items: Repository[]
}

/**
 * Search parameters for repository search
 */
export type SearchParams = {
  q?: string
  language?: string
  sort?: 'stars' | 'help-wanted-issues' | 'updated'
  order?: 'asc' | 'desc'
  page?: number
}
