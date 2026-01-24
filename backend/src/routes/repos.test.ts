import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { buildApp } from '../app.js'
import type { FastifyInstance } from 'fastify'

describe('GET /api/repos/search', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = buildApp()
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return repositories with default search', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/repos/search?language=TypeScript',
    })

    expect(response.statusCode).toBe(200)
    const body = JSON.parse(response.body)
    expect(body).toHaveProperty('items')
    expect(body).toHaveProperty('totalCount')
    expect(Array.isArray(body.items)).toBe(true)
    expect(body.totalCount).toBeGreaterThan(0)
  })

  it('should return repositories with query and language', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/repos/search?q=react&language=JavaScript',
    })

    expect(response.statusCode).toBe(200)
    const body = JSON.parse(response.body)
    expect(body.items.length).toBeGreaterThan(0)
    expect(body.items[0]).toHaveProperty('name')
    expect(body.items[0]).toHaveProperty('stargazersCount')
  })

  it('should handle pagination', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/repos/search?language=Python&page=2',
    })

    expect(response.statusCode).toBe(200)
    const body = JSON.parse(response.body)
    expect(body.items).toBeDefined()
  })

  it('should return repositories structure with correct fields', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/repos/search?language=TypeScript',
    })

    expect(response.statusCode).toBe(200)
    const body = JSON.parse(response.body)
    const firstRepo = body.items[0]

    // Verify repository structure
    expect(firstRepo).toHaveProperty('id')
    expect(firstRepo).toHaveProperty('name')
    expect(firstRepo).toHaveProperty('fullName')
    expect(firstRepo).toHaveProperty('htmlUrl')
    expect(firstRepo).toHaveProperty('stargazersCount')
    expect(firstRepo).toHaveProperty('owner')
    expect(firstRepo.owner).toHaveProperty('login')
    expect(firstRepo.owner).toHaveProperty('avatarUrl')
  })
})
