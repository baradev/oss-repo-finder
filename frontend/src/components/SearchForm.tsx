import { useState } from 'react'

type SearchFormProps = {
  onSearch: (query: string, language: string) => void
  isLoading: boolean
}

/**
 * Search form component with text input and language selector
 */
export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [query, setQuery] = useState('')
  const [language, setLanguage] = useState('TypeScript')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query, language)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Search text (optional)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Any language</option>
        <option value="TypeScript">TypeScript</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
        <option value="Go">Go</option>
        <option value="Rust">Rust</option>
      </select>
      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}
