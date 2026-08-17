import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RiskBadge } from '../RiskBadge'

describe('RiskBadge Component Suite', () => {
  it('renders Low Risk badge with qualification', () => {
    render(<RiskBadge riskBand="Low" showQualification />)
    expect(screen.getByText('Low Risk')).toBeInTheDocument()
    expect(screen.getByText(/Qualified \/ Approved/i)).toBeInTheDocument()
  })

  it('renders Medium Risk badge with qualification', () => {
    render(<RiskBadge riskBand="Medium" showQualification />)
    expect(screen.getByText('Medium Risk')).toBeInTheDocument()
    expect(screen.getByText(/Under Review/i)).toBeInTheDocument()
  })

  it('renders High Risk badge with thin file warning flag', () => {
    render(<RiskBadge riskBand="High" isThinFile={true} showQualification />)
    expect(screen.getByText('High Risk')).toBeInTheDocument()
    expect(screen.getByText('Thin File')).toBeInTheDocument()
    expect(screen.getByText(/High Risk \/ Attention/i)).toBeInTheDocument()
  })

  it('handles null/undefined risk band gracefully as Pending Assessment', () => {
    render(<RiskBadge riskBand={null} />)
    expect(screen.getByText('Pending Assessment')).toBeInTheDocument()
  })
})
