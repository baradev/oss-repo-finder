import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorMessage } from './ErrorMessage'

describe('ErrorMessage', () => {
  it('renders error message text', () => {
    const message = 'Something went wrong'
    render(<ErrorMessage message={message} />)

    expect(screen.getByText(message)).toBeInTheDocument()
  })

  it('has correct styling classes', () => {
    const message = 'Test error'
    render(<ErrorMessage message={message} />)

    const element = screen.getByText(message)
    expect(element).toHaveClass('text-red-500')
    expect(element).toHaveClass('font-medium')
  })
})
