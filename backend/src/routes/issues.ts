import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { githubService } from '../services/github.service.js'
import type { IssueSearchQuery, IssueSearchResponse } from '../types/index.js'

/**
 * Issue routes plugin
 * Handles all /api/issues/* endpoints
 */
export const issuesRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance,
) => {
  /**
   * GET /api/issues/search
   * Search for GitHub issues with beginner-friendly labels
   */
  fastify.get<{ Querystring: IssueSearchQuery; Reply: IssueSearchResponse }>(
    '/search',
    async (request) => {
      // Extract query parameters with defaults
      const params: IssueSearchQuery = {
        language: request.query.language,
        labels: request.query.labels || 'good-first-issue,help-wanted',
        sort: request.query.sort || 'created',
        order: request.query.order || 'desc',
        page: request.query.page || '1',
      }

      // Delegate to service layer
      // Error handling is done by global error handler
      const result = await githubService.searchIssues(params)

      return result
    },
  )
}
