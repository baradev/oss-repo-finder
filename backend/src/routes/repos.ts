import { FastifyInstance, FastifyPluginAsync } from 'fastify'

type SearchQuery = {
  q?: string // free text
  language?: string // e.g. "TypeScript"
  sort?: 'stars' | 'help-wanted-issues' | 'updated'
  order?: 'asc' | 'desc'
  page?: string // GitHub pages start at 1
}

export const reposRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance,
) => {
  fastify.get<{ Querystring: SearchQuery }>(
    '/search',
    async (request, reply) => {
      const {
        q = '',
        language,
        sort = 'stars',
        order = 'desc',
        page = '1',
      } = request.query

      // Base query: only public repos, optionally language + text
      let query = q.trim() || 'stars:>100'
      if (language) {
        query += ` language:${language}`
      }

      const params = new URLSearchParams({
        q: query,
        sort,
        order,
        per_page: '20',
        page,
      })

      const githubResponse = await fetch(
        `https://api.github.com/search/repositories?${params.toString()}`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
            // later: "Authorization": `Bearer YOUR_GH_TOKEN`
          },
        },
      )

      if (!githubResponse.ok) {
        const text = await githubResponse.text()
        fastify.log.error(
          { status: githubResponse.status, body: text },
          'GitHub API error',
        )
        return reply.status(502).send({ error: 'GitHub API error' })
      }

      const data = (await githubResponse.json()) as {
        total_count: number
        items: any[]
      }

      const mapped = data.items.map((repo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        htmlUrl: repo.html_url,
        stargazersCount: repo.stargazers_count,
        language: repo.language,
        openIssuesCount: repo.open_issues_count,
        owner: {
          login: repo.owner?.login,
          avatarUrl: repo.owner?.avatar_url,
        },
      }))

      return {
        totalCount: data.total_count,
        items: mapped,
      }
    },
  )
}
