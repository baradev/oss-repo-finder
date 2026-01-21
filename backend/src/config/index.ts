import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

/**
 * Application configuration object
 * Loads and validates environment variables at startup
 */
export const config = {
  // Server settings
  server: {
    port: parseInt(process.env.PORT || '3001', 10),
    host: process.env.HOST || '0.0.0.0',
    nodeEnv: process.env.NODE_ENV || 'development',
  },

  // GitHub API settings
  github: {
    token: process.env.GITHUB_TOKEN || '',
    apiUrl: 'https://api.github.com',
  },

  // CORS settings
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  },
} as const

/**
 * Validates required environment variables
 * Throws an error if any required variable is missing
 */
export function validateConfig(): void {
  const errors: string[] = []

  // GitHub token is optional but recommended (rate limits are higher with token)
  if (!config.github.token) {
    console.warn(
      '⚠️  Warning: GITHUB_TOKEN not set. API rate limits will be lower.',
    )
  }

  if (errors.length > 0) {
    throw new Error(`Configuration validation failed:\n${errors.join('\n')}`)
  }

  console.info('✅ Configuration validated successfully')
}
