import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ErrorState } from '../ErrorState'

describe('ErrorState Component Suite', () => {
  it('renders default error message', () => {
    render(<ErrorState />)
    expect(screen.getByText('Oops, something went wrong!')).toBeInTheDocument()
    expect(screen.getByText('Please try again or contact support.')).toBeInTheDocument()
  })

  it('renders custom message and triggers retry callback', () => {
    const handleRetry = vi.fn()
    render(
      <ErrorState
        title="Custom Connection Error"
        message="Unable to reach credit scoring API"
        onRetry={handleRetry}
      />
    )

    expect(screen.getByText('Custom Connection Error')).toBeInTheDocument()
    expect(screen.getByText('Unable to reach credit scoring API')).toBeInTheDocument()

    const retryButton = screen.getByRole('button', { name: /try again/i })
    fireEvent.click(retryButton)
    expect(handleRetry).toHaveBeenCalledTimes(1)
  })
})
