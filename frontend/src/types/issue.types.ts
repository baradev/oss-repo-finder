/**
 * Issue-related types for frontend
 * These should match the backend API responses
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

export type IssueSearchResponse = {
  totalCount: number
  items: Issue[]
}

/**
 * Search parameters for issue search
 */
export type IssueSearchParams = {
  language?: string
  labels?: string
  sort?: 'created' | 'updated' | 'comments'
  order?: 'asc' | 'desc'
  page?: number
}
