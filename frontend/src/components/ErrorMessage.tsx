type ErrorMessageProps = {
  message: string
}

/**
 * Error message display component
 */
export function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className="text-red-500 font-medium">{message}</p>
}
