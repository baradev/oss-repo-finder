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
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}
    >
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
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}
