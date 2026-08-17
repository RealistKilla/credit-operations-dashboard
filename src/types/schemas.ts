import { z } from 'zod'

// 1. Business Schema
export const BusinessSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Business name is required'),
  registrationNumber: z.string().min(1, 'Registration number is required'),
  industry: z.string().min(1, 'Industry is required')
})

export const BusinessesResponseSchema = z.array(BusinessSchema)

// 2. Assessment Schema
export const AssessmentStatusEnum = z.enum(['Complete', 'Pending'])

export const AssessmentSchema = z.object({
  id: z.number(),
  businessId: z.number(),
  createdDate: z.string(),
  status: AssessmentStatusEnum
})

export const AssessmentsResponseSchema = z.array(AssessmentSchema)

// 3. Credit Report Schema
export const RiskBandEnum = z.enum(['Low', 'Medium', 'High'])

export const CreditReportSchema = z.object({
  id: z.number(),
  assessmentId: z.number(),
  score: z.number().nullable(),
  riskBand: RiskBandEnum.nullable(),
  isThinFile: z.boolean().nullable()
})

export const CreditReportsResponseSchema = z.array(CreditReportSchema)

// 4. Bank Statement Schema
export const BankStatementSchema = z.object({
  id: z.number(),
  assessmentId: z.number(),
  totalCredits: z.number().nullable(),
  totalDebits: z.number().nullable(),
  monthsAnalysed: z.number().nullable()
})

export const BankStatementsResponseSchema = z.array(BankStatementSchema)

// 5. Score Item Schema
export const ScoreCategoryEnum = z.enum([
  'Payment History',
  'Credit Utilisation',
  'Business Age',
  'Cash Flow'
])

export const ScoreItemSchema = z.object({
  id: z.number(),
  assessmentId: z.number(),
  category: z.string(),
  score: z.number().min(0).max(100)
})

export const ScoreItemsResponseSchema = z.array(ScoreItemSchema)

// 6. Enriched Assessment Schema
export const EnrichedAssessmentSchema = AssessmentSchema.extend({
  business: BusinessSchema.nullable(),
  creditReport: CreditReportSchema.nullable(),
  bankStatement: BankStatementSchema.nullable(),
  scoreItems: z.array(ScoreItemSchema),
  netCashFlow: z.number().nullable()
})

export const DashboardDataSchema = z.object({
  businesses: z.array(BusinessSchema),
  assessments: z.array(EnrichedAssessmentSchema),
  creditReports: z.array(CreditReportSchema),
  bankStatements: z.array(BankStatementSchema),
  scoreItems: z.array(ScoreItemSchema)
})

// Inferred TypeScript types
export type Business = z.infer<typeof BusinessSchema>
export type AssessmentStatus = z.infer<typeof AssessmentStatusEnum>
export type Assessment = z.infer<typeof AssessmentSchema>
export type RiskBand = z.infer<typeof RiskBandEnum>
export type CreditReport = z.infer<typeof CreditReportSchema>
export type BankStatement = z.infer<typeof BankStatementSchema>
export type ScoreCategory = z.infer<typeof ScoreCategoryEnum>
export type ScoreItem = z.infer<typeof ScoreItemSchema>
export type EnrichedAssessment = z.infer<typeof EnrichedAssessmentSchema>
export type DashboardData = z.infer<typeof DashboardDataSchema>
