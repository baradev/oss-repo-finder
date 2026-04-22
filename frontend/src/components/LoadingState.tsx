import { useEffect, useState } from 'react'

const repoMessages = [
  'Scouting the open source universe...',
  'Asking GitHub very nicely...',
  'Wrangling repositories from the wild...',
  'Bribing the GitHub API with kind words...',
  'Summoning repos from the git void...',
  'Teaching octocats to fetch...',
  'Untangling dependency graphs...',
  'Herding stars into a neat list...',
]

const issueMessages = [
  "Hunting for issues that won't bite...",
  'Finding your perfect first contribution...',
  'Searching for low-hanging fruit...',
  'Locating your open source destiny...',
  'Sifting through the issue haystack...',
  'Recruiting beginner-friendly bugs...',
  'Discovering where the community needs you...',
  'Matching you with your open source soulmate...',
]

interface LoadingStateProps {
  variant?: 'repos' | 'issues'
}

export function LoadingState({ variant = 'repos' }: LoadingStateProps) {
  const messages = variant === 'repos' ? repoMessages : issueMessages
  const [messageIndex, setMessageIndex] = useState(() =>
    Math.floor(Math.random() * messages.length),
  )
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setMessageIndex((i) => (i + 1) % messages.length)
        setVisible(true)
      }, 300)
    }, 3800)
    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
      </div>

      <p
        className="text-gray-500 text-sm text-center max-w-xs transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {messages[messageIndex]}
      </p>
    </div>
  )
}
