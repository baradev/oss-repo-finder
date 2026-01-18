import { useEffect } from 'react'
import { useRepositories } from './hooks/useRepositories'
import { SearchForm } from './components/SearchForm'
import { RepositoryList } from './components/RepositoryList'
import { ErrorMessage } from './components/ErrorMessage'

/**
 * Main application component
 * Orchestrates repository search functionality
 */
function App() {
  const { repos, loading, error, searchRepositories } = useRepositories()

  // Fetch initial results on mount
  useEffect(() => {
    searchRepositories({ language: 'TypeScript' })
  }, [searchRepositories])

  const handleSearch = (query: string, language: string) => {
    searchRepositories({
      q: query || undefined,
      language: language || undefined,
    })
  }

  return (
    <div style={{ padding: '1.5rem', maxWidth: 900, margin: '0 auto' }}>
      <h1>OSS Repo Finder</h1>

      <SearchForm onSearch={handleSearch} isLoading={loading} />

      {error && <ErrorMessage message={error} />}

      {!loading && <RepositoryList repos={repos} />}
    </div>
  )
}

export default App
