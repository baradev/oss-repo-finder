import type { Repository } from '../types'
import { RepositoryCard } from './RepositoryCard'

type RepositoryListProps = {
  repos: Repository[]
}

/**
 * List component displaying multiple repositories
 */
export function RepositoryList({ repos }: RepositoryListProps) {
  if (repos.length === 0) {
    return <p>No repositories found. Try a different search.</p>
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {repos.map((repo) => (
        <RepositoryCard key={repo.id} repo={repo} />
      ))}
    </ul>
  )
}
