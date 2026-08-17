import { API_BASE_URL } from '../types/constants'
import {
  BusinessesResponseSchema,
  BusinessSchema,
  AssessmentsResponseSchema,
  AssessmentSchema,
  CreditReportsResponseSchema,
  BankStatementsResponseSchema,
  ScoreItemsResponseSchema,
  DashboardDataSchema,
  type Business,
  type Assessment,
  type CreditReport,
  type BankStatement,
  type ScoreItem,
  type DashboardData
} from '../types/schemas'

async function fetchJson<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${endpoint}: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

export const api = {
  // Businesses with Zod validation
  getBusinesses: async (): Promise<Business[]> => {
    const data = await fetchJson<unknown>('/businesses')
    return BusinessesResponseSchema.parse(data)
  },

  getBusinessById: async (id: number): Promise<Business> => {
    const data = await fetchJson<unknown>(`/businesses/${id}`)
    return BusinessSchema.parse(data)
  },

  // Assessments with Zod validation
  getAssessments: async (params: { businessId?: number } = {}): Promise<Assessment[]> => {
    const query = new URLSearchParams()
    if (params.businessId) query.append('businessId', params.businessId.toString())
    const queryString = query.toString() ? `?${query.toString()}` : ''
    const data = await fetchJson<unknown>(`/assessments${queryString}`)
    return AssessmentsResponseSchema.parse(data)
  },

  getAssessmentById: async (id: number): Promise<Assessment> => {
    const data = await fetchJson<unknown>(`/assessments/${id}`)
    return AssessmentSchema.parse(data)
  },

  // Credit Reports with Zod validation
  getCreditReports: async (params: { assessmentId?: number } = {}): Promise<CreditReport[]> => {
    const query = new URLSearchParams()
    if (params.assessmentId) query.append('assessmentId', params.assessmentId.toString())
    const queryString = query.toString() ? `?${query.toString()}` : ''
    const data = await fetchJson<unknown>(`/creditReports${queryString}`)
    return CreditReportsResponseSchema.parse(data)
  },

  // Bank Statements with Zod validation
  getBankStatements: async (params: { assessmentId?: number } = {}): Promise<BankStatement[]> => {
    const query = new URLSearchParams()
    if (params.assessmentId) query.append('assessmentId', params.assessmentId.toString())
    const queryString = query.toString() ? `?${query.toString()}` : ''
    const data = await fetchJson<unknown>(`/bankStatements${queryString}`)
    return BankStatementsResponseSchema.parse(data)
  },

  // Score Items with Zod validation
  getScoreItems: async (params: { assessmentId?: number } = {}): Promise<ScoreItem[]> => {
    const query = new URLSearchParams()
    if (params.assessmentId) query.append('assessmentId', params.assessmentId.toString())
    const queryString = query.toString() ? `?${query.toString()}` : ''
    const data = await fetchJson<unknown>(`/scoreItems${queryString}`)
    return ScoreItemsResponseSchema.parse(data)
  },

  // Combined holistic dashboard loader with full Zod validation
  getFullDashboardData: async (): Promise<DashboardData> => {
    const [rawBusinesses, rawAssessments, rawCreditReports, rawBankStatements, rawScoreItems] =
      await Promise.all([
        fetchJson<unknown>('/businesses'),
        fetchJson<unknown>('/assessments'),
        fetchJson<unknown>('/creditReports'),
        fetchJson<unknown>('/bankStatements'),
        fetchJson<unknown>('/scoreItems')
      ])

    const businesses = BusinessesResponseSchema.parse(rawBusinesses)
    const assessments = AssessmentsResponseSchema.parse(rawAssessments)
    const creditReports = CreditReportsResponseSchema.parse(rawCreditReports)
    const bankStatements = BankStatementsResponseSchema.parse(rawBankStatements)
    const scoreItems = ScoreItemsResponseSchema.parse(rawScoreItems)

    // Pre-join entities for convenient, type-safe consumption
    const enrichedAssessments = assessments.map((assessment) => {
      const business = businesses.find((b) => b.id === assessment.businessId) || null
      const creditReport = creditReports.find((c) => c.assessmentId === assessment.id) || null
      const bankStatement = bankStatements.find((b) => b.assessmentId === assessment.id) || null
      const scores = scoreItems.filter((s) => s.assessmentId === assessment.id)

      const netCashFlow =
        bankStatement && bankStatement.totalCredits != null && bankStatement.totalDebits != null
          ? bankStatement.totalCredits - bankStatement.totalDebits
          : null

      return {
        ...assessment,
        business,
        creditReport,
        bankStatement,
        scoreItems: scores,
        netCashFlow
      }
    })

    const payload = {
      businesses,
      assessments: enrichedAssessments,
      creditReports,
      bankStatements,
      scoreItems
    }

    return DashboardDataSchema.parse(payload)
  }
}
