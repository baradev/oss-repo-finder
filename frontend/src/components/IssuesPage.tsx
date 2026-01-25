import { useIssues } from '../hooks/useIssues'
import { IssueFilterForm } from './IssueFilterForm'
import { IssueList } from './IssueList'
import { ErrorMessage } from './ErrorMessage'
import { Pagination } from './Pagination'

/**
 * Issues page component
 * Main page for discovering beginner-friendly issues
 */
export function IssuesPage() {
  const {
    issues,
    loading,
    error,
    currentPage,
    totalPages,
    totalCount,
    searchIssues,
    nextPage,
    previousPage,
  } = useIssues()

  const handleFilter = (language: string, labels: string) => {
    searchIssues({
      language: language || undefined,
      labels,
    })
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Find Good First Issues</h1>
        <p className="text-gray-600">
          Discover beginner-friendly issues to start contributing to open source
          projects
        </p>
      </div>

      <IssueFilterForm onFilter={handleFilter} isLoading={loading} />

      {error && <ErrorMessage message={error} />}

      {!loading && !error && totalCount > 0 && (
        <p className="text-sm text-gray-600 mb-4">
          Found {totalCount.toLocaleString()} issues
        </p>
      )}

      {!loading && <IssueList issues={issues} />}

      {!loading && issues.length > 0 && (
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
