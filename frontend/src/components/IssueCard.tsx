import type { Issue } from '../types'

type IssueCardProps = {
  issue: Issue
}

/**
 * Card component displaying a single issue with repository information
 */
export function IssueCard({ issue }: IssueCardProps) {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'today'
    if (diffDays === 1) return 'yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
  }

  return (
    <li className="border border-gray-300 rounded-lg p-4 mb-3 hover:border-blue-400 transition-colors">
      {/* Repository info */}
      <div className="flex items-center gap-2 mb-2">
        <img
          src={issue.repository.owner.avatarUrl}
          alt={issue.repository.owner.login}
          className="w-6 h-6 rounded-full"
        />
        <a
          href={issue.repository.htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-gray-600 hover:text-blue-600"
        >
          {issue.repository.fullName}
        </a>
        <span className="text-sm text-gray-500">
          ★ {issue.repository.stargazersCount}
        </span>
        {issue.repository.language && (
          <span className="text-sm text-gray-500">
            {issue.repository.language}
          </span>
        )}
      </div>

      {/* Issue title */}
      <a
        href={issue.htmlUrl}
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-lg hover:text-blue-600 block mb-2"
      >
        {issue.title}
      </a>

      {/* Labels */}
      {issue.labels.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {issue.labels.map((label) => (
            <span
              key={label.name}
              className="px-2 py-1 text-xs rounded-full"
              style={{
                backgroundColor: `#${label.color}20`,
                color: `#${label.color}`,
                border: `1px solid #${label.color}40`,
              }}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}

      {/* Metadata */}
      <div className="flex gap-4 text-sm text-gray-600">
        <span>#{issue.number}</span>
        <span>💬 {issue.comments} comments</span>
        <span>Opened {formatDate(issue.createdAt)}</span>
        <span>Updated {formatDate(issue.updatedAt)}</span>
      </div>
    </li>
  )
}
