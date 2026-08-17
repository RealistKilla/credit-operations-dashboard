import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useBusinesses,
  useAssessments,
  useCreditReports,
  useBankStatements,
  useScoreItems
} from '../../api/queries'
import { useSearch } from '../../context/SearchContext'
import { OverviewMetricsGrid } from './OverviewMetricsGrid'
import { OverviewAttentionSection } from './OverviewAttentionSection'
import { OverviewPortfolioDistribution } from './OverviewPortfolioDistribution'
import { OverviewRecentAssessments } from './OverviewRecentAssessments'
import { Skeleton } from '../../components/ui/Skeleton'
import { Sparkles, AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import type { EnrichedAssessment } from '../../types/schemas'

export function OverviewView(): React.JSX.Element {
  const navigate = useNavigate()
  const { searchQuery } = useSearch()

  // TanStack Query Hooks for data fetching
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

  const {
    data: scoreItems = [],
    isLoading: isScoreItemsLoading,
    isError: isScoreItemsError,
    refetch: refetchScoreItems
  } = useScoreItems()

  const isLoading =
    isBusinessesLoading ||
    isAssessmentsLoading ||
    isCreditReportsLoading ||
    isBankStatementsLoading ||
    isScoreItemsLoading

  const isError =
    isBusinessesError ||
    isAssessmentsError ||
    isCreditReportsError ||
    isBankStatementsError ||
    isScoreItemsError

  const refetchAll = () => {
    refetchBusinesses()
    refetchAssessments()
    refetchCreditReports()
    refetchBankStatements()
    refetchScoreItems()
  }

  // Join and enrich assessment records from TanStack Query datasets
  const enrichedAssessments: EnrichedAssessment[] = useMemo(() => {
    return assessments.map((assessment) => {
      const business = businesses.find((b) => b.id === assessment.businessId) || null
      const creditReport = creditReports.find((c) => c.assessmentId === assessment.id) || null
      const bankStatement = bankStatements.find((b) => b.assessmentId === assessment.id) || null
      const scores = scoreItems.filter((s) => s.assessmentId === assessment.id)

      const netCashFlow =
        bankStatement &&
        bankStatement.totalCredits != null &&
        bankStatement.totalDebits != null
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
  }, [assessments, businesses, creditReports, bankStatements, scoreItems])

  // Filter assessments based on search query
  const filteredAssessments = useMemo(() => {
    if (!searchQuery) return enrichedAssessments
    const query = searchQuery.toLowerCase()
    return enrichedAssessments.filter((assessment) => {
      const name = assessment.business?.name.toLowerCase() || ''
      const reg = assessment.business?.registrationNumber.toLowerCase() || ''
      const industry = assessment.business?.industry.toLowerCase() || ''
      const status = assessment.status.toLowerCase()
      const risk = assessment.creditReport?.riskBand?.toLowerCase() || ''
      const id = assessment.id.toString()
      return (
        name.includes(query) ||
        reg.includes(query) ||
        industry.includes(query) ||
        status.includes(query) ||
        risk.includes(query) ||
        id.includes(query)
      )
    })
  }, [enrichedAssessments, searchQuery])

  // Loading skeleton state
  if (isLoading) {
    return (
      <div className="space-y-6 pb-12 animate-pulse">
        <div className="space-y-2">
          <Skeleton className="h-8 w-80" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
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
            Unable to connect to the backend server. Please verify that the API server is active.
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
      {/* Top Banner / Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(0,0,0,0.08)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#0F253B] tracking-tight">
              Executive Credit Operations Overview
            </h1>
            <span className="bg-[#1AAE4E]/15 text-[#15803D] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#BBF7D0]">
              Live Feed
            </span>
          </div>
          <p className="text-xs text-[#5A6B76] mt-1">
            Real-time portfolio underwriting intelligence, credit scores, cash flow liquidity, and risk allocation.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#0F253B] bg-white px-3 py-1.5 rounded-xl border border-[rgba(0,0,0,0.08)] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6D63]" />
          <span>Underwriting Engine Active</span>
        </div>
      </div>

      {/* 1. Priority Attention Banner for High Risk / Pending accounts */}
      <OverviewAttentionSection
        assessments={enrichedAssessments}
        onSelectBusiness={(businessId) => {
          navigate(`/businesses/${businessId}`)
        }}
      />

      {/* 2. Top-level KPI Metrics Grid */}
      <OverviewMetricsGrid
        totalBusinessesCount={businesses.length}
        assessments={enrichedAssessments}
        onFilterRiskBand={() => navigate('/assessments')}
      />

      {/* 3. Portfolio Risk Distribution & Cash Flow Velocity */}
      <OverviewPortfolioDistribution assessments={enrichedAssessments} />

      {/* 4. Recent Assessed Business Pipeline Table */}
      <OverviewRecentAssessments
        assessments={filteredAssessments}
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
export * from './OverviewPortfolioDistribution'
export * from './OverviewRecentAssessments'
