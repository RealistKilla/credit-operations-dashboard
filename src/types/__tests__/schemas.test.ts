import { describe, it, expect } from 'vitest'
import {
  BusinessSchema,
  AssessmentSchema,
  CreditReportSchema,
  BankStatementSchema,
  ScoreItemSchema,
  BusinessesResponseSchema,
  AssessmentsResponseSchema,
  CreditReportsResponseSchema,
  BankStatementsResponseSchema,
  ScoreItemsResponseSchema
} from '../schemas'

describe('Zod Validation Schemas Suite', () => {
  describe('BusinessSchema', () => {
    it('validates a standard business object', () => {
      const input = {
        id: 1,
        name: 'Acme Traders',
        registrationNumber: '2018/123456/07',
        industry: 'Retail'
      }
      expect(BusinessSchema.parse(input)).toEqual(input)
    })

    it('rejects invalid business missing registrationNumber', () => {
      const invalid = { id: 1, name: 'Acme Traders', industry: 'Retail' }
      expect(() => BusinessSchema.parse(invalid)).toThrow()
    })
  })

  describe('AssessmentSchema', () => {
    it('validates a completed assessment', () => {
      const input = {
        id: 101,
        businessId: 1,
        status: 'Complete',
        createdDate: '2024-01-15T10:00:00.000Z'
      }
      expect(AssessmentSchema.parse(input)).toEqual(input)
    })

    it('validates a pending assessment', () => {
      const input = {
        id: 105,
        businessId: 5,
        status: 'Pending',
        createdDate: '2024-03-01T14:30:00.000Z'
      }
      expect(AssessmentSchema.parse(input)).toEqual(input)
    })
  })

  describe('CreditReportSchema (Nullable & Edge Cases)', () => {
    it('validates completed credit report with score and thin-file flag', () => {
      const input = {
        id: 202,
        assessmentId: 102,
        score: 384,
        riskBand: 'High',
        isThinFile: true
      }
      expect(CreditReportSchema.parse(input)).toEqual(input)
    })

    it('validates pending credit report where score and riskBand are null', () => {
      const input = {
        id: 205,
        assessmentId: 105,
        score: null,
        riskBand: null,
        isThinFile: null
      }
      expect(CreditReportSchema.parse(input)).toEqual(input)
    })
  })

  describe('BankStatementSchema (Nullable & Edge Cases)', () => {
    it('validates completed bank statement metrics', () => {
      const input = {
        id: 301,
        assessmentId: 101,
        totalCredits: 1250000,
        totalDebits: 1100000,
        monthsAnalysed: 6
      }
      expect(BankStatementSchema.parse(input)).toEqual(input)
    })

    it('validates pending bank statement with null credits/debits', () => {
      const input = {
        id: 305,
        assessmentId: 105,
        totalCredits: null,
        totalDebits: null,
        monthsAnalysed: null
      }
      expect(BankStatementSchema.parse(input)).toEqual(input)
    })
  })

  describe('ScoreItemSchema', () => {
    it('validates a category score item', () => {
      const input = {
        id: 401,
        assessmentId: 101,
        category: 'Payment History',
        score: 78
      }
      expect(ScoreItemSchema.parse(input)).toEqual(input)
    })
  })

  describe('Collection Responses Validation', () => {
    it('validates an array of businesses', () => {
      const input = [
        { id: 1, name: 'Acme', registrationNumber: '2018/1', industry: 'Retail' },
        { id: 2, name: 'Bright', registrationNumber: '2019/2', industry: 'Construction' }
      ]
      expect(BusinessesResponseSchema.parse(input)).toHaveLength(2)
    })

    it('validates empty collections without error', () => {
      expect(AssessmentsResponseSchema.parse([])).toEqual([])
      expect(CreditReportsResponseSchema.parse([])).toEqual([])
      expect(BankStatementsResponseSchema.parse([])).toEqual([])
      expect(ScoreItemsResponseSchema.parse([])).toEqual([])
    })
  })
})
