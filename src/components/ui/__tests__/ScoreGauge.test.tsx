import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ScoreGauge } from '../ScoreGauge'

describe('ScoreGauge Component Suite', () => {
  it('renders numeric credit score within 300-850 range', () => {
    render(<ScoreGauge score={741} riskBand="Low" />)
    expect(screen.getByText('741')).toBeInTheDocument()
    expect(screen.getByText(/out of 850/i)).toBeInTheDocument()
    expect(screen.getByText('Low Risk')).toBeInTheDocument()
    expect(screen.getByText('Tier 1 - Prime Qualification')).toBeInTheDocument()
  })

  it('renders Pending state when score is null', () => {
    render(<ScoreGauge score={null} riskBand={null} />)
    expect(screen.getByText('—')).toBeInTheDocument()
    expect(screen.getByText('Pending Assessment')).toBeInTheDocument()
    expect(screen.getByText('Pending Data')).toBeInTheDocument()
  })

  it('renders Thin File flag when flagged on high risk account', () => {
    render(<ScoreGauge score={384} riskBand="High" isThinFile={true} />)
    expect(screen.getByText('384')).toBeInTheDocument()
    expect(screen.getByText('High Risk')).toBeInTheDocument()
    expect(screen.getByText('Thin File')).toBeInTheDocument()
    expect(screen.getByText('Tier 3 - Subprime / Attention')).toBeInTheDocument()
  })
})
