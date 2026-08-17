import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useBusinesses,
  useAssessments,
  useCreditReports,
  useBankStatements
} from '../../api/queries'
import { useSearch } from '../../context/SearchContext'
import { OverviewMetricsGrid } from './OverviewMetricsGrid'
import { OverviewAttentionSection } from './OverviewAttentionSection'
import { OverviewRecentAssessments } from './OverviewRecentAssessments'
import { Skeleton } from '../../components/ui/Skeleton'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '../../components/ui/Button'

export function OverviewView(): React.JSX.Element {
  const navigate = useNavigate()
  const { searchQuery } = useSearch()

  // TanStack Query Hooks for data fetching directly from json-server endpoints
  const {
    data: businesses = [],
    isLoading: isBusinessesLoading,
    isError: isBusinessesError,
    refetch: refetchBusinesses
  } = useBusinesses()

  const {
    data: assessments = [],
    isLoading: isAssessmentsLoading,
    isError: isAssessmentsError,
    refetch: refetchAssessments
  } = useAssessments()

  const {
    data: creditReports = [],
    isLoading: isCreditReportsLoading,
    isError: isCreditReportsError,
    refetch: refetchCreditReports
  } = useCreditReports()

  const {
    data: bankStatements = [],
    isLoading: isBankStatementsLoading,
    isError: isBankStatementsError,
    refetch: refetchBankStatements
  } = useBankStatements()

  const isLoading =
    isBusinessesLoading ||
    isAssessmentsLoading ||
    isCreditReportsLoading ||
    isBankStatementsLoading

  const isError =
    isBusinessesError ||
    isAssessmentsError ||
    isCreditReportsError ||
    isBankStatementsError

  const refetchAll = () => {
    refetchBusinesses()
    refetchAssessments()
    refetchCreditReports()
    refetchBankStatements()
  }

  // Filter assessments based on search query matching against businesses
  const filteredAssessments = useMemo(() => {
    if (!searchQuery) return assessments
    const query = searchQuery.toLowerCase()
    return assessments.filter((assessment) => {
      const business = businesses.find((b) => b.id === assessment.businessId)
      const report = creditReports.find((c) => c.assessmentId === assessment.id)
      const name = business?.name.toLowerCase() || ''
      const reg = business?.registrationNumber.toLowerCase() || ''
      const industry = business?.industry.toLowerCase() || ''
      const status = assessment.status.toLowerCase()
      const risk = report?.riskBand?.toLowerCase() || ''
      return (
        name.includes(query) ||
        reg.includes(query) ||
        industry.includes(query) ||
        status.includes(query) ||
        risk.includes(query)
      )
    })
  }, [assessments, businesses, creditReports, searchQuery])

  // Loading skeleton state
  if (isLoading) {
    return (
      <div className="space-y-6 pb-12 animate-pulse">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
        <Skeleton className="h-80" />
      </div>
    )
  }

  // Error recovery state
  if (isError) {
    return (
      <div className="bg-[#FFEEF2] border border-[#FECDD3] rounded-2xl p-8 text-center max-w-lg mx-auto mt-12 space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#FF274B]/10 text-[#FF274B] flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#0F253B]">Error Fetching Overview Data</h3>
          <p className="text-xs text-[#5A6B76] mt-1.5">
            Unable to connect to the backend server. Please verify that the API server is active on port 3001.
          </p>
          <div className="mt-2 bg-[#0F253B] text-[#61B8D8] font-mono text-xs py-2 px-3 rounded-lg inline-block">
            npm run api
          </div>
        </div>
        <Button
          variant="primary"
          onClick={refetchAll}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          Retry Connection
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Title Bar */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#0F253B] tracking-tight">
          Credit Operations Overview
        </h1>
        <p className="text-xs text-[#5A6B76] mt-1">
          High-level operational summary of business assessments and credit status.
        </p>
      </div>

      {/* 1. Priority Attention Banner */}
      <OverviewAttentionSection
        businesses={businesses}
        assessments={assessments}
        creditReports={creditReports}
        onSelectBusiness={(businessId) => {
          navigate(`/businesses/${businessId}`)
        }}
      />

      {/* 2. Top-level Summary Metrics Grid */}
      <OverviewMetricsGrid
        businesses={businesses}
        assessments={assessments}
        creditReports={creditReports}
        bankStatements={bankStatements}
      />

      {/* 3. Assessed Businesses Table */}
      <OverviewRecentAssessments
        businesses={businesses}
        assessments={filteredAssessments}
        creditReports={creditReports}
        bankStatements={bankStatements}
        onSelectBusiness={(businessId) => {
          navigate(`/businesses/${businessId}`)
        }}
        onViewAllAssessments={() => navigate('/assessments')}
      />
    </div>
  )
}

export * from './OverviewMetricsGrid'
export * from './OverviewAttentionSection'
export * from './OverviewRecentAssessments'
