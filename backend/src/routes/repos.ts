import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { githubService } from '../services/github.service'
import { SearchQuery, SearchResponse } from '../types'

/**
 * Repository routes plugin
 * Handles all /api/repos/* endpoints
 */
export const reposRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance,
) => {
  /**
   * GET /api/repos/search
   * Search for GitHub repositories
   */
  fastify.get<{ Querystring: SearchQuery; Reply: SearchResponse }>(
    '/search',
    async (request) => {
      // Extract query parameters with defaults
      const params: SearchQuery = {
        q: request.query.q,
        language: request.query.language,
        sort: request.query.sort || 'stars',
        order: request.query.order || 'desc',
        page: request.query.page || '1',
      }

      // Delegate to service layer
      // Error handling is done by global error handler
      const result = await githubService.searchRepositories(params)

      return result
    },
  )
}
