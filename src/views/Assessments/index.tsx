import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useBusinesses,
  useAssessments,
  useCreditReports,
  useBankStatements,
  useScoreItems
} from '../../api/queries'
import { useSearch } from '../../context/SearchContext'
import { AssessmentsSummaryBar } from './AssessmentsSummaryBar'
import { AssessmentsFilterBar, type FilterState } from './AssessmentsFilterBar'
import { AssessmentsRankedTable } from './AssessmentsRankedTable'
import { AssessmentsPagination } from './AssessmentsPagination'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/ErrorState'
import { RISK_BANDS } from '../../types/constants'
import type { EnrichedAssessment } from '../../types/schemas'

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  datePreset: 'all',
  startDate: '',
  endDate: '',
  scorePreset: 'all',
  minScore: 300,
  maxScore: 850,
  selectedRiskBands: [RISK_BANDS.LOW, RISK_BANDS.MEDIUM, RISK_BANDS.HIGH, RISK_BANDS.PENDING],
  thinFileOnly: false,
  sortBy: 'score_desc'
}

export function AssessmentsView(): React.JSX.Element {
  const navigate = useNavigate()
  const { searchQuery: globalSearch } = useSearch()

  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  // 1. Fetch data from TanStack Query endpoints
  const {
    data: businesses = [],
    isLoading: isBusinessesLoading,
    isError: isBusinessesError,
    isFetching: isBusinessesFetching,
    refetch: refetchBusinesses
  } = useBusinesses()

  const {
    data: assessments = [],
    isLoading: isAssessmentsLoading,
    isError: isAssessmentsError,
    isFetching: isAssessmentsFetching,
    refetch: refetchAssessments
  } = useAssessments()

  const {
    data: creditReports = [],
    isLoading: isCreditReportsLoading,
    isError: isCreditReportsError,
    isFetching: isCreditReportsFetching,
    refetch: refetchCreditReports
  } = useCreditReports()

  const {
    data: bankStatements = [],
    isLoading: isBankStatementsLoading,
    isError: isBankStatementsError,
    isFetching: isBankStatementsFetching,
    refetch: refetchBankStatements
  } = useBankStatements()

  const {
    data: scoreItems = [],
    isLoading: isScoreItemsLoading,
    isError: isScoreItemsError,
    isFetching: isScoreItemsFetching,
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

  const isRetrying =
    isBusinessesFetching ||
    isAssessmentsFetching ||
    isCreditReportsFetching ||
    isBankStatementsFetching ||
    isScoreItemsFetching

  const refetchAll = () => {
    refetchBusinesses()
    refetchAssessments()
    refetchCreditReports()
    refetchBankStatements()
    refetchScoreItems()
  }

  // Pre-join entities
  const enrichedAssessments: EnrichedAssessment[] = useMemo(() => {
    const safeAssessments = Array.isArray(assessments) ? assessments : []
    const safeBusinesses = Array.isArray(businesses) ? businesses : []
    const safeCreditReports = Array.isArray(creditReports) ? creditReports : []
    const safeBankStatements = Array.isArray(bankStatements) ? bankStatements : []
    const safeScoreItems = Array.isArray(scoreItems) ? scoreItems : []

    return safeAssessments.map((a) => {
      const business = safeBusinesses.find((b) => b.id === a.businessId) || null
      const creditReport = safeCreditReports.find((c) => c.assessmentId === a.id) || null
      const bankStatement = safeBankStatements.find((b) => b.assessmentId === a.id) || null
      const scores = safeScoreItems.filter((s) => s.assessmentId === a.id)

      const netCashFlow =
        bankStatement &&
        bankStatement.totalCredits != null &&
        bankStatement.totalDebits != null
          ? bankStatement.totalCredits - bankStatement.totalDebits
          : null

      return {
        ...a,
        business,
        creditReport,
        bankStatement,
        scoreItems: scores,
        netCashFlow
      }
    })
  }, [assessments, businesses, creditReports, bankStatements, scoreItems])

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (filters.datePreset !== 'all') count++
    if (filters.scorePreset !== 'all' || filters.minScore > 300 || filters.maxScore < 850) count++
    if (filters.selectedRiskBands.length < 4) count++
    if (filters.thinFileOnly) count++
    if (globalSearch || filters.searchQuery) count++
    return count
  }, [filters, globalSearch])

  // Multi-Filter & Ranking Logic
  const filteredAndSortedAssessments = useMemo(() => {
    const query = (globalSearch || filters.searchQuery || '').toLowerCase().trim()

    let results = enrichedAssessments.filter((item) => {
      const businessName = item.business?.name.toLowerCase() || ''
      const reg = item.business?.registrationNumber.toLowerCase() || ''
      const industry = item.business?.industry.toLowerCase() || ''
      const riskBand = item.creditReport?.riskBand || RISK_BANDS.PENDING
      const score = item.creditReport?.score

      // 1. Search Query Filter
      if (query) {
        const matchesQuery =
          businessName.includes(query) ||
          reg.includes(query) ||
          industry.includes(query)
        if (!matchesQuery) return false
      }

      // 2. Risk Band Multi-Select Filter
      if (
        filters.selectedRiskBands.length > 0 &&
        !filters.selectedRiskBands.includes(riskBand)
      ) {
        return false
      }

      // 3. Credit Score Range Filter
      if (score != null) {
        if (score < filters.minScore || score > filters.maxScore) {
          return false
        }
      } else {
        // If pending and pending risk band is not selected, omit
        if (!filters.selectedRiskBands.includes(RISK_BANDS.PENDING)) {
          return false
        }
      }

      // 4. Thin File Filter
      if (filters.thinFileOnly && !item.creditReport?.isThinFile) {
        return false
      }

      // 5. Date Range Filter
      if (item.createdDate) {
        const itemDate = new Date(item.createdDate)
        const now = new Date()

        if (filters.datePreset === '30days') {
          const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          if (itemDate < thirtyDaysAgo) return false
        } else if (filters.datePreset === '90days') {
          const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
          if (itemDate < ninetyDaysAgo) return false
        } else if (filters.datePreset === 'ytd') {
          const startOfYear = new Date('2024-01-01')
          if (itemDate < startOfYear) return false
        } else if (filters.datePreset === 'custom') {
          if (filters.startDate && itemDate < new Date(filters.startDate)) return false
          if (filters.endDate && itemDate > new Date(filters.endDate)) return false
        }
      }

      return true
    })

    // Sorting
    results.sort((a, b) => {
      const scoreA = a.creditReport?.score ?? -1
      const scoreB = b.creditReport?.score ?? -1
      const creditsA = a.bankStatement?.totalCredits ?? -1
      const creditsB = b.bankStatement?.totalCredits ?? -1
      const dateA = new Date(a.createdDate).getTime() || 0
      const dateB = new Date(b.createdDate).getTime() || 0
      const nameA = a.business?.name.toLowerCase() || ''
      const nameB = b.business?.name.toLowerCase() || ''

      if (filters.sortBy === 'score_desc') return scoreB - scoreA
      if (filters.sortBy === 'score_asc') return scoreA - scoreB
      if (filters.sortBy === 'credits_desc') return creditsB - creditsA
      if (filters.sortBy === 'date_desc') return dateB - dateA
      if (filters.sortBy === 'date_asc') return dateA - dateB
      if (filters.sortBy === 'name_asc') return nameA.localeCompare(nameB)
      return 0
    })

    return results
  }, [enrichedAssessments, filters, globalSearch])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedAssessments.length / pageSize) || 1
  const paginatedAssessments = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredAndSortedAssessments.slice(start, start + pageSize)
  }, [filteredAndSortedAssessments, currentPage, pageSize])

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
    setCurrentPage(1) // Reset to page 1 on filter changes
  }

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS)
    setCurrentPage(1)
  }

  // Loading skeleton placeholder
  if (isLoading) {
    return (
      <div className="space-y-6 pb-12 animate-pulse">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
        <Skeleton className="h-44 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  // Error recovery state
  if (isError) {
    return (
      <ErrorState
        title="Oops, something went wrong!"
        message="Unable to fetch assessments ranking data. Please verify the API server is running on port 3001."
        onRetry={refetchAll}
        isRetrying={isRetrying}
      />
    )
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Title Bar */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#0F253B] tracking-tight">
          Assessments & Qualification Ranking
        </h1>
        <p className="text-xs text-[#5A6B76] mt-1">
          Rank and filter SME credit files across risk tiers, score thresholds, date ranges, and bank statement turnover.
        </p>
      </div>

      {/* 1. Top Summary Metric Bar */}
      <AssessmentsSummaryBar
        filteredAssessments={filteredAndSortedAssessments}
        totalAssessmentsCount={enrichedAssessments.length}
      />

      {/* 2. Scalable Multi-Filter Controls */}
      <AssessmentsFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        activeFiltersCount={activeFiltersCount}
      />

      {/* 3. Ranked Table */}
      <div className="space-y-3">
        <AssessmentsRankedTable
          assessments={paginatedAssessments}
          onSelectBusiness={(id) => navigate(`/businesses/${id}`)}
        />

        {/* 4. Pagination */}
        <AssessmentsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredAndSortedAssessments.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize)
            setCurrentPage(1)
          }}
        />
      </div>
    </div>
  )
}

export * from './AssessmentsSummaryBar'
export * from './AssessmentsFilterBar'
export * from './AssessmentsRankedTable'
export * from './AssessmentsPagination'
