import { buildApp } from './app.js'
import { config, validateConfig } from './config/index.js'

// Validate configuration at startup
validateConfig()

const server = buildApp()

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
