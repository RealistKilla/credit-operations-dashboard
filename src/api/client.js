import { API_BASE_URL } from '../types/constants'

async function fetchJson(endpoint) {
  const url = `${API_BASE_URL}${endpoint}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${endpoint}: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

export const api = {
  // Businesses
  getBusinesses: () => fetchJson('/businesses'),
  getBusinessById: (id) => fetchJson(`/businesses/${id}`),

  // Assessments
  getAssessments: (params = {}) => {
    const query = new URLSearchParams()
    if (params.businessId) query.append('businessId', params.businessId)
    const queryString = query.toString() ? `?${query.toString()}` : ''
    return fetchJson(`/assessments${queryString}`)
  },
  getAssessmentById: (id) => fetchJson(`/assessments/${id}`),

  // Credit Reports
  getCreditReports: (params = {}) => {
    const query = new URLSearchParams()
    if (params.assessmentId) query.append('assessmentId', params.assessmentId)
    const queryString = query.toString() ? `?${query.toString()}` : ''
    return fetchJson(`/creditReports${queryString}`)
  },

  // Bank Statements
  getBankStatements: (params = {}) => {
    const query = new URLSearchParams()
    if (params.assessmentId) query.append('assessmentId', params.assessmentId)
    const queryString = query.toString() ? `?${query.toString()}` : ''
    return fetchJson(`/bankStatements${queryString}`)
  },

  // Score Items
  getScoreItems: (params = {}) => {
    const query = new URLSearchParams()
    if (params.assessmentId) query.append('assessmentId', params.assessmentId)
    const queryString = query.toString() ? `?${query.toString()}` : ''
    return fetchJson(`/scoreItems${queryString}`)
  },

  // Combined holistic dashboard loader for snappy state
  getFullDashboardData: async () => {
    const [businesses, assessments, creditReports, bankStatements, scoreItems] = await Promise.all([
      fetchJson('/businesses'),
      fetchJson('/assessments'),
      fetchJson('/creditReports'),
      fetchJson('/bankStatements'),
      fetchJson('/scoreItems')
    ])

    // Pre-join entities for convenient consumption
    const enrichedAssessments = assessments.map((assessment) => {
      const business = businesses.find((b) => b.id === assessment.businessId) || null
      const creditReport = creditReports.find((c) => c.assessmentId === assessment.id) || null
      const bankStatement = bankStatements.find((b) => b.assessmentId === assessment.id) || null
      const scores = scoreItems.filter((s) => s.assessmentId === assessment.id)

      // Calculate cash flow delta
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

    return {
      businesses,
      assessments: enrichedAssessments,
      creditReports,
      bankStatements,
      scoreItems
    }
  }
}
