/**
 * Frontend configuration
 * Centralized access to environment variables
 */

export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  },
} as const
