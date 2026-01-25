import type { Issue } from '../types'
import { IssueCard } from './IssueCard'

type IssueListProps = {
  issues: Issue[]
}

/**
 * List component for displaying multiple issues
 */
export function IssueList({ issues }: IssueListProps) {
  if (issues.length === 0) {
    return (
      <p className="text-gray-600 text-center py-8">
        No issues found. Try adjusting your filters.
      </p>
    )
  }

  return (
    <ul className="list-none p-0">
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </ul>
  )
}
