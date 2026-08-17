export const API_BASE_URL = 'http://localhost:3001'

export const RISK_BANDS = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  PENDING: 'Pending'
}

export const RISK_BAND_CONFIG = {
  [RISK_BANDS.LOW]: {
    label: 'Low Risk',
    qualification: 'Qualified / Approved',
    color: '#1aae4e',
    bgColor: '#e8f8ee',
    textColor: '#15803d',
    borderColor: '#bbf7d0',
    description: 'Strong credit profile with consistent cash flow and healthy repayment history.'
  },
  [RISK_BANDS.MEDIUM]: {
    label: 'Medium Risk',
    qualification: 'Under Review',
    color: '#d97706',
    bgColor: '#fff8e6',
    textColor: '#b45309',
    borderColor: '#fed7aa',
    description: 'Moderate credit profile requiring analyst verification or covenant conditions.'
  },
  [RISK_BANDS.HIGH]: {
    label: 'High Risk',
    qualification: 'High Risk / Attention',
    color: '#ff274b',
    bgColor: '#ffeef2',
    textColor: '#e11d48',
    borderColor: '#fecdd3',
    description: 'Elevated risk parameters or thin credit file requiring senior underwriting review.'
  },
  [RISK_BANDS.PENDING]: {
    label: 'Pending Assessment',
    qualification: 'Awaiting Ingestion',
    color: '#64748b',
    bgColor: '#f1f5f9',
    textColor: '#475569',
    borderColor: '#e2e8f0',
    description: 'Credit assessment or bank statement ingestion in progress.'
  }
}

export const CATEGORY_ICONS = {
  'Payment History': 'History',
  'Credit Utilisation': 'Percent',
  'Business Age': 'Building2',
  'Cash Flow': 'TrendingUp'
}

export const CATEGORY_DESCRIPTIONS = {
  'Payment History': 'On-time debt servicing and supplier repayment track record.',
  'Credit Utilisation': 'Ratio of utilized revolving credit vs total approved limits.',
  'Business Age': 'Operating maturity and statutory registration continuity.',
  'Cash Flow': 'Operational net cash velocity and revenue stability.'
}

export const NAV_ITEMS = {
  OVERVIEW: 'overview',
  BUSINESSES: 'businesses',
  ASSESSMENTS: 'assessments'
}
