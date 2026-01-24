import { useRepositories } from './hooks/useRepositories'
import { SearchForm } from './components/SearchForm'
import { RepositoryList } from './components/RepositoryList'
import { ErrorMessage } from './components/ErrorMessage'
import { Pagination } from './components/Pagination'

/**
 * Main application component
 * Orchestrates repository search functionality
 */
function App() {
  const {
    repos,
    loading,
    error,
    currentPage,
    totalPages,
    searchRepositories,
    nextPage,
    previousPage,
  } = useRepositories()

  const handleSearch = (query: string, language: string) => {
    searchRepositories({
      q: query || undefined,
      language: language || undefined,
    })
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1>OSS Repo Finder</h1>

      <SearchForm onSearch={handleSearch} isLoading={loading} />

      {error && <ErrorMessage message={error} />}

      {!loading && <RepositoryList repos={repos} />}

      {!loading && repos.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={previousPage}
          onNext={nextPage}
          isLoading={loading}
        />
      )}
    </div>
  )
}

export default App
