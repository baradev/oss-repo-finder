type ErrorMessageProps = {
  message: string
}

/**
 * Error message display component
 */
export function ErrorMessage({ message }: ErrorMessageProps) {
  return <p style={{ color: 'red', fontWeight: 500 }}>{message}</p>
}
