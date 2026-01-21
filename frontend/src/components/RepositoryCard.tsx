import type { Repository } from '../types'

type RepositoryCardProps = {
  repo: Repository
}

/**
 * Card component displaying a single repository
 */
export function RepositoryCard({ repo }: RepositoryCardProps) {
  return (
    <li className="border border-gray-300 rounded-lg p-3 mb-3">
      <a
        href={repo.htmlUrl}
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-lg hover:text-blue-600"
      >
        {repo.fullName}
      </a>
      <p className="my-1 text-gray-700">
        {repo.description ?? 'No description'}
      </p>
      <div className="flex gap-4 text-sm text-gray-600">
        <span>★ {repo.stargazersCount}</span>
        {repo.language && <span>{repo.language}</span>}
        <span>Open issues: {repo.openIssuesCount}</span>
        <span>Owner: {repo.owner.login}</span>
      </div>
    </li>
  )
}
