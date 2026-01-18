import type { Repository } from '../types'

type RepositoryCardProps = {
  repo: Repository
}

/**
 * Card component displaying a single repository
 */
export function RepositoryCard({ repo }: RepositoryCardProps) {
  return (
    <li
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
  )
}
