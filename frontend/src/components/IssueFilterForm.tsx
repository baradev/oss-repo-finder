import { useState } from 'react'

type IssueFilterFormProps = {
  onFilter: (language: string, labels: string) => void
  isLoading: boolean
}

/**
 * Filter form component for issue search
 */
export function IssueFilterForm({ onFilter, isLoading }: IssueFilterFormProps) {
  const [language, setLanguage] = useState('')
  const [selectedLabels, setSelectedLabels] = useState<string[]>([
    'good-first-issue',
    'help-wanted',
  ])

  const availableLabels = [
    { value: 'good-first-issue', label: 'Good First Issue' },
    { value: 'help-wanted', label: 'Help Wanted' },
    { value: 'beginner-friendly', label: 'Beginner Friendly' },
    { value: 'documentation', label: 'Documentation' },
    { value: 'bug', label: 'Bug' },
  ]

  const handleLabelToggle = (labelValue: string) => {
    setSelectedLabels((prev) => {
      if (prev.includes(labelValue)) {
        return prev.filter((l) => l !== labelValue)
      } else {
        return [...prev, labelValue]
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const labels = selectedLabels.join(',')
    onFilter(language, labels)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col gap-4">
        {/* Language selector */}
        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium text-gray-700 min-w-[100px]">
            Language:
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any language</option>
            <option value="TypeScript">TypeScript</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Go">Go</option>
            <option value="Rust">Rust</option>
            <option value="Java">Java</option>
            <option value="Ruby">Ruby</option>
          </select>
        </div>

        {/* Label checkboxes */}
        <div className="flex gap-2 items-start">
          <label className="text-sm font-medium text-gray-700 min-w-[100px] pt-2">
            Labels:
          </label>
          <div className="flex flex-wrap gap-3">
            {availableLabels.map((label) => (
              <label
                key={label.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedLabels.includes(label.value)}
                  onChange={() => handleLabelToggle(label.value)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{label.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading || selectedLabels.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Searching...' : 'Find Issues'}
          </button>
          {selectedLabels.length === 0 && (
            <span className="text-sm text-red-600 self-center">
              Please select at least one label
            </span>
          )}
        </div>
      </div>
    </form>
  )
}
