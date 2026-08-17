import React from 'react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { RISK_BANDS } from '../../types/constants'
import {
  Filter,
  RotateCcw,
  Calendar,
  SlidersHorizontal,
  FileWarning,
  ArrowUpDown
} from 'lucide-react'

export interface FilterState {
  searchQuery: string
  datePreset: 'all' | '30days' | '90days' | 'ytd' | 'custom'
  startDate: string
  endDate: string
  scorePreset: 'all' | 'prime' | 'standard' | 'subprime' | 'custom'
  minScore: number
  maxScore: number
  selectedRiskBands: string[]
  thinFileOnly: boolean
  sortBy: 'score_desc' | 'score_asc' | 'credits_desc' | 'date_desc' | 'date_asc' | 'name_asc'
}

export interface AssessmentsFilterBarProps {
  filters: FilterState
  onFilterChange: (newFilters: Partial<FilterState>) => void
  onResetFilters: () => void
  activeFiltersCount: number
}

export function AssessmentsFilterBar({
  filters,
  onFilterChange,
  onResetFilters,
  activeFiltersCount
}: AssessmentsFilterBarProps): React.JSX.Element {
  const toggleRiskBand = (band: string) => {
    const exists = filters.selectedRiskBands.includes(band)
    const next = exists
      ? filters.selectedRiskBands.filter((b) => b !== band)
      : [...filters.selectedRiskBands, band]
    onFilterChange({ selectedRiskBands: next })
  }

  const handleScorePreset = (preset: 'all' | 'prime' | 'standard' | 'subprime') => {
    if (preset === 'all') {
      onFilterChange({ scorePreset: 'all', minScore: 300, maxScore: 850 })
    } else if (preset === 'prime') {
      onFilterChange({ scorePreset: 'prime', minScore: 700, maxScore: 850 })
    } else if (preset === 'standard') {
      onFilterChange({ scorePreset: 'standard', minScore: 500, maxScore: 699 })
    } else if (preset === 'subprime') {
      onFilterChange({ scorePreset: 'subprime', minScore: 300, maxScore: 499 })
    }
  }

  return (
    <Card className="p-5 bg-white border border-[rgba(0,0,0,0.08)] shadow-sm space-y-4">
      {/* Header Row: Title, Active Filter Badge & Reset Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0F2F3] pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#0F253B] text-white rounded-lg">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0F253B]">Assessment Filters & Sorting</h3>
            <p className="text-[11px] text-[#5A6B76]">
              Query parameters designed for large-scale SME credit assessment portfolios
            </p>
          </div>
          {activeFiltersCount > 0 && (
            <span className="bg-[#FF6D63] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full ml-1">
              {activeFiltersCount} Active
            </span>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            className="text-xs text-[#5A6B76] hover:text-[#0F253B] self-start sm:self-auto"
          >
            Reset Filters
          </Button>
        )}
      </div>

      {/* Filter Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Date Range Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#0F253B] flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#268FB6]" />
            <span>Date Range</span>
          </label>
          <div className="space-y-1.5">
            <select
              value={filters.datePreset}
              onChange={(e) => {
                const preset = e.target.value as FilterState['datePreset']
                onFilterChange({ datePreset: preset })
              }}
              className="w-full bg-[#F5F7F9] text-[#1A1A1A] text-xs rounded-xl border border-[#CFD8DD] px-3 py-2 focus:outline-none focus:border-[#268FB6] cursor-pointer"
            >
              <option value="all">All Time</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="ytd">Year to Date (2024)</option>
              <option value="custom">Custom Date Range</option>
            </select>

            {filters.datePreset === 'custom' && (
              <div className="flex items-center gap-1.5 pt-1">
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => onFilterChange({ startDate: e.target.value })}
                  className="w-1/2 bg-[#F5F7F9] text-[11px] rounded-lg border border-[#CFD8DD] px-2 py-1.5 focus:outline-none"
                />
                <span className="text-xs text-[#839098]">to</span>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => onFilterChange({ endDate: e.target.value })}
                  className="w-1/2 bg-[#F5F7F9] text-[11px] rounded-lg border border-[#CFD8DD] px-2 py-1.5 focus:outline-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* 2. Credit Score Range Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#0F253B] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#268FB6]" />
              <span>Credit Score Range</span>
            </span>
            <span className="text-[11px] font-mono text-[#268FB6] font-extrabold">
              {filters.minScore} - {filters.maxScore}
            </span>
          </label>

          <div className="space-y-1.5">
            {/* Quick Score Preset Pills */}
            <div className="grid grid-cols-4 gap-1">
              <button
                type="button"
                onClick={() => handleScorePreset('all')}
                className={`text-[10px] font-bold py-1 px-1.5 rounded-lg border transition-all cursor-pointer ${
                  filters.scorePreset === 'all'
                    ? 'bg-[#0F253B] text-white border-[#0F253B]'
                    : 'bg-[#F5F7F9] text-[#5A6B76] border-[#CFD8DD] hover:bg-white'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => handleScorePreset('prime')}
                className={`text-[10px] font-bold py-1 px-1.5 rounded-lg border transition-all cursor-pointer ${
                  filters.scorePreset === 'prime'
                    ? 'bg-[#1AAE4E] text-white border-[#1AAE4E]'
                    : 'bg-[#F5F7F9] text-[#15803D] border-[#CFD8DD] hover:bg-white'
                }`}
              >
                700+
              </button>
              <button
                type="button"
                onClick={() => handleScorePreset('standard')}
                className={`text-[10px] font-bold py-1 px-1.5 rounded-lg border transition-all cursor-pointer ${
                  filters.scorePreset === 'standard'
                    ? 'bg-[#D97706] text-white border-[#D97706]'
                    : 'bg-[#F5F7F9] text-[#B45309] border-[#CFD8DD] hover:bg-white'
                }`}
              >
                500-699
              </button>
              <button
                type="button"
                onClick={() => handleScorePreset('subprime')}
                className={`text-[10px] font-bold py-1 px-1.5 rounded-lg border transition-all cursor-pointer ${
                  filters.scorePreset === 'subprime'
                    ? 'bg-[#FF274B] text-white border-[#FF274B]'
                    : 'bg-[#F5F7F9] text-[#E11D48] border-[#CFD8DD] hover:bg-white'
                }`}
              >
                &lt;500
              </button>
            </div>

            {/* Min/Max Manual Inputs */}
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min={300}
                max={850}
                value={filters.minScore}
                onChange={(e) =>
                  onFilterChange({
                    scorePreset: 'custom',
                    minScore: Math.max(300, Math.min(850, Number(e.target.value)))
                  })
                }
                placeholder="Min 300"
                className="w-1/2 bg-[#F5F7F9] text-xs rounded-lg border border-[#CFD8DD] px-2 py-1 focus:outline-none"
              />
              <span className="text-xs text-[#839098]">to</span>
              <input
                type="number"
                min={300}
                max={850}
                value={filters.maxScore}
                onChange={(e) =>
                  onFilterChange({
                    scorePreset: 'custom',
                    maxScore: Math.max(300, Math.min(850, Number(e.target.value)))
                  })
                }
                placeholder="Max 850"
                className="w-1/2 bg-[#F5F7F9] text-xs rounded-lg border border-[#CFD8DD] px-2 py-1 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 3. Risk Band Multi-Select */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#0F253B]">
            Risk Band Multi-Select
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: RISK_BANDS.LOW, label: 'Low Risk', bg: 'bg-[#E8F8EE] text-[#15803D] border-[#BBF7D0]' },
              { id: RISK_BANDS.MEDIUM, label: 'Med Risk', bg: 'bg-[#FFF8E6] text-[#B45309] border-[#FED7AA]' },
              { id: RISK_BANDS.HIGH, label: 'High Risk', bg: 'bg-[#FFEEF2] text-[#E11D48] border-[#FECDD3]' },
              { id: RISK_BANDS.PENDING, label: 'Pending', bg: 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]' }
            ].map((band) => {
              const isSelected = filters.selectedRiskBands.includes(band.id)
              return (
                <button
                  key={band.id}
                  type="button"
                  onClick={() => toggleRiskBand(band.id)}
                  className={`text-[11px] font-bold py-1.5 px-2 rounded-xl border transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
                    isSelected
                      ? `${band.bg} ring-2 ring-offset-1 ring-[#0F253B]/20`
                      : 'bg-[#F5F7F9] text-[#839098] border-[#CFD8DD] hover:bg-white opacity-60'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-current' : 'bg-[#839098]'}`} />
                  <span>{band.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 4. Sorting & Thin File Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#0F253B] flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#268FB6]" />
            <span>Sort Ranking Order</span>
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })
            }
            className="w-full bg-[#F5F7F9] text-[#1A1A1A] text-xs rounded-xl border border-[#CFD8DD] px-3 py-2 focus:outline-none focus:border-[#268FB6] cursor-pointer"
          >
            <option value="score_desc">Score: Highest to Lowest (Rank #1)</option>
            <option value="score_asc">Score: Lowest to Highest</option>
            <option value="credits_desc">Turnover Volume: High to Low</option>
            <option value="date_desc">Assessment Date: Newest First</option>
            <option value="date_asc">Assessment Date: Oldest First</option>
            <option value="name_asc">Company Name: A to Z</option>
          </select>

          {/* Thin File Checkbox Toggle */}
          <label className="flex items-center gap-2 pt-1 cursor-pointer select-none text-xs text-[#0F253B] font-medium">
            <input
              type="checkbox"
              checked={filters.thinFileOnly}
              onChange={(e) => onFilterChange({ thinFileOnly: e.target.checked })}
              className="w-4 h-4 rounded text-[#FF6D63] focus:ring-[#FF6D63] border-[#CFD8DD] cursor-pointer"
            />
            <span className="flex items-center gap-1">
              <FileWarning className="w-3.5 h-3.5 text-[#7E22CE]" />
              <span>Thin-File Accounts Only</span>
            </span>
          </label>
        </div>
      </div>
    </Card>
  )
}
