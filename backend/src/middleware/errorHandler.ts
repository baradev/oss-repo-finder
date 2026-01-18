import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

/**
 * Custom error response format
 */
export type ErrorResponse = {
  error: string
  message: string
  statusCode: number
}

/**
 * Global error handler for Fastify
 * Catches all errors thrown in routes and formats them consistently
 */
export async function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  // Log the error (Fastify's logger will handle this)
  request.log.error(error)

  // Determine status code
  const statusCode = error.statusCode || 500

  // Prepare error response
  const errorResponse: ErrorResponse = {
    error: error.name || 'InternalServerError',
    message: error.message || 'An unexpected error occurred',
    statusCode,
  }

  // In production, hide internal error details
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    errorResponse.message = 'Internal server error'
  }

  // Send error response
  reply.status(statusCode).send(errorResponse)
}
