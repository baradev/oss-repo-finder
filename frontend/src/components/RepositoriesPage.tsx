import { useRepositories } from '../hooks/useRepositories'
import { SearchForm } from './SearchForm'
import { RepositoryList } from './RepositoryList'
import { ErrorMessage } from './ErrorMessage'
import { Pagination } from './Pagination'
import { LoadingState } from './LoadingState'

/**
 * Repositories page component
 * Main page for searching GitHub repositories
 */
export function RepositoriesPage() {
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">OSS Repo Finder</h1>
        <p className="text-gray-600 mb-6">
          Discover open source repositories on GitHub
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl mb-2">Browse</div>
            <p className="text-sm text-gray-700">
              Explore thousands of open source projects across any language or
              topic
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl mb-2">Contribute</div>
            <p className="text-sm text-gray-700">
              Find real projects welcoming new contributors and make your first
              pull request
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl mb-2">Grow</div>
            <p className="text-sm text-gray-700">
              Gain hands-on skills by working on production codebases used by
              real people
            </p>
          </div>
        </div>
      </div>

      <SearchForm onSearch={handleSearch} isLoading={loading} />

      {error && <ErrorMessage message={error} />}

      {loading && <LoadingState variant="repos" />}

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
