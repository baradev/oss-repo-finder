type PaginationProps = {
  currentPage: number
  totalPages: number
  onPrevious: () => void
  onNext: () => void
  isLoading?: boolean
}

/**
 * Pagination component for navigating between pages of results
 */
export function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  isLoading = false,
}: PaginationProps) {
  const hasPrevious = currentPage > 1
  const hasNext = currentPage < totalPages

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={onPrevious}
        disabled={!hasPrevious || isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
      >
        Previous
      </button>

      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={!hasNext || isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
      >
        Next
      </button>
    </div>
  )
}
