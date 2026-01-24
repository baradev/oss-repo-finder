import Fastify from 'fastify'
import { reposRoutes } from './routes/repos.js'
import { config } from './config/index.js'
import { errorHandler } from './middleware/errorHandler.js'

/**
 * Build and configure Fastify app
 * Exported separately from server start for testing
 */
export function buildApp() {
  const app = Fastify({
    logger: true,
  })

  // Register error handler
  app.setErrorHandler(errorHandler)

  // Register CORS
  app.register(import('@fastify/cors'), {
    origin: config.cors.origin,
  })

  // Register routes
  app.register(reposRoutes, { prefix: '/api/repos' })

  return app
}
