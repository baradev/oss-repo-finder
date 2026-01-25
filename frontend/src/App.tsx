import { useState } from 'react'
import { RepositoriesPage } from './components/RepositoriesPage'
import { IssuesPage } from './components/IssuesPage'

type Page = 'repositories' | 'issues'

/**
 * Main application component
 * Handles navigation between repositories and issues pages
 */
function App() {
  const [currentPage, setCurrentPage] = useState<Page>('repositories')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setCurrentPage('repositories')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                currentPage === 'repositories'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
              }`}
            >
              Repositories
            </button>
            <button
              onClick={() => setCurrentPage('issues')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                currentPage === 'issues'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
              }`}
            >
              Good First Issues
            </button>
          </div>
        </div>
      </nav>

      {/* Page content */}
      {currentPage === 'repositories' && <RepositoriesPage />}
      {currentPage === 'issues' && <IssuesPage />}
    </div>
  )
}

export default App
