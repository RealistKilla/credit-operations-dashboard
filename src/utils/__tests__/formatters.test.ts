import { describe, it, expect } from 'vitest'
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatDate
} from '../formatters'

describe('Formatters Utility Suite', () => {
  describe('formatCurrency', () => {
    it('formats standard positive monetary amounts in ZAR', () => {
      const result = formatCurrency(150000)
      expect(result).toMatch(/R\s?150[,\s]000/)
    })

    it('formats zero correctly', () => {
      const result = formatCurrency(0)
      expect(result).toMatch(/R\s?0/)
    })

    it('handles negative monetary amounts (net outflow/burn)', () => {
      const result = formatCurrency(-45000)
      expect(result).toContain('-')
      expect(result).toMatch(/45[,\s]000/)
    })

    it('handles null or undefined gracefully with fallback', () => {
      expect(formatCurrency(null as unknown as number)).toBe('—')
      expect(formatCurrency(undefined as unknown as number)).toBe('—')
    })

    it('handles NaN gracefully', () => {
      expect(formatCurrency(NaN)).toBe('—')
    })

    it('handles large multi-million enterprise turnover', () => {
      const result = formatCurrency(12500000)
      expect(result).toMatch(/R\s?12[,\s]500[,\s]000/)
    })
  })

  describe('formatNumber', () => {
    it('formats standard integers with locale separators', () => {
      const result = formatNumber(1234567)
      expect(result).toMatch(/1[,\s]234[,\s]567/)
    })

    it('handles zero', () => {
      expect(formatNumber(0)).toBe('0')
    })

    it('handles null/undefined gracefully', () => {
      expect(formatNumber(null as unknown as number)).toBe('—')
      expect(formatNumber(undefined as unknown as number)).toBe('—')
    })
  })

  describe('formatPercentage', () => {
    it('formats positive percentages with default 1 decimal place', () => {
      expect(formatPercentage(42.56)).toBe('42.6%')
    })

    it('formats 0% without crashing', () => {
      expect(formatPercentage(0)).toBe('0.0%')
    })

    it('formats negative percentages (e.g. negative margin)', () => {
      expect(formatPercentage(-12.4)).toBe('-12.4%')
    })

    it('handles null/undefined gracefully', () => {
      expect(formatPercentage(null as unknown as number)).toBe('—')
      expect(formatPercentage(undefined as unknown as number)).toBe('—')
    })
  })

  describe('formatDate', () => {
    it('formats valid ISO date strings to readable local format', () => {
      const formatted = formatDate('2024-01-15T10:00:00.000Z')
      expect(formatted).toMatch(/15\s+Jan\s+2024|Jan\s+15,\s+2024/)
    })

    it('handles empty string or null/undefined gracefully', () => {
      expect(formatDate('')).toBe('—')
      expect(formatDate(null as unknown as string)).toBe('—')
      expect(formatDate(undefined as unknown as string)).toBe('—')
    })

    it('handles invalid date strings gracefully without throwing exception', () => {
      expect(formatDate('not-a-valid-date')).toBe('—')
    })
  })
})
