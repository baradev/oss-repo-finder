import Fastify from 'fastify'
import { reposRoutes } from './routes/repos'

const server = Fastify({
  logger: true,
})

server.register(import('@fastify/cors'), {
  origin: true,
})

server.register(reposRoutes, { prefix: '/api/repos' })

const start = async () => {
  try {
    await server.listen({
      port: 3001,
      host: '0.0.0.0',
    })
    server.log.info('Server listening on http://localhost:3001')
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
