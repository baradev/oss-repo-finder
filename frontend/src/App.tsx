import { useEffect, useState } from 'react'

type Repo = {
  id: number
  name: string
  fullName: string
  description: string | null
  htmlUrl: string
  stargazersCount: number
  language: string | null
  openIssuesCount: number
  owner: {
    login: string
    avatarUrl: string
  }
}

type SearchResponse = {
  totalCount: number
  items: Repo[]
}

function App() {
  const [language, setLanguage] = useState('TypeScript')
  const [query, setQuery] = useState('')
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRepos = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (language) params.set('language', language)
      if (query) params.set('q', query)

      const res = await fetch(
        `http://localhost:3001/api/repos/search?${params.toString()}`,
      )

      if (!res.ok) {
        throw new Error('Failed to fetch repos')
      }

      const data: SearchResponse = await res.json()
      setRepos(data.items)
    } catch (err: any) {
      setError(err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRepos()
  }, [])

  return (
    <div style={{ padding: '1.5rem', maxWidth: 900, margin: '0 auto' }}>
      <h1>OSS Repo Finder</h1>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search text (optional)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">Any language</option>
          <option value="TypeScript">TypeScript</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Go">Go</option>
          <option value="Rust">Rust</option>
        </select>
        <button onClick={fetchRepos} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {repos.map((repo) => (
          <li
            key={repo.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: '0.75rem',
              marginBottom: '0.75rem',
            }}
          >
            <a
              href={repo.htmlUrl}
              target="_blank"
              rel="noreferrer"
              style={{ fontWeight: 600, fontSize: '1.1rem' }}
            >
              {repo.fullName}
            </a>
            <p style={{ margin: '0.25rem 0' }}>
              {repo.description ?? 'No description'}
            </p>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                fontSize: '0.875rem',
                color: '#555',
              }}
            >
              <span>★ {repo.stargazersCount}</span>
              {repo.language && <span>{repo.language}</span>}
              <span>Open issues: {repo.openIssuesCount}</span>
              <span>Owner: {repo.owner.login}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
