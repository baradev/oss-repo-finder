import Fastify from 'fastify'
import { reposRoutes } from './routes/repos.js'
import { config, validateConfig } from './config/index.js'
import { errorHandler } from './middleware/errorHandler.js'

// Validate configuration at startup
validateConfig()

const server = Fastify({
  logger: true,
})

// Register error handler
server.setErrorHandler(errorHandler)

server.register(import('@fastify/cors'), {
  origin: config.cors.origin,
})

server.register(reposRoutes, { prefix: '/api/repos' })

const start = async () => {
  try {
    await server.listen({
      port: config.server.port,
      host: config.server.host,
    })
    server.log.info(
      `Server listening on http://localhost:${config.server.port}`,
    )
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
