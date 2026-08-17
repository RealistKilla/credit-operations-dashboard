import React from 'react'
import { Button } from '../../components/ui/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface AssessmentsPaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export function AssessmentsPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange
}: AssessmentsPaginationProps): React.JSX.Element | null {
  if (totalItems === 0) return null

  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#5A6B76] pt-2">
      {/* Result Count Readout */}
      <div className="flex items-center gap-2">
        <span>
          Showing <strong className="text-[#0F253B]">{startItem}</strong> to{' '}
          <strong className="text-[#0F253B]">{endItem}</strong> of{' '}
          <strong className="text-[#0F253B]">{totalItems}</strong> assessments
        </span>
      </div>

      {/* Page Size Selector & Prev/Next Controls */}
      <div className="flex items-center gap-3 self-end sm:self-auto">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-[#839098]">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="bg-white text-xs rounded-lg border border-[#CFD8DD] px-2 py-1 focus:outline-none cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="h-8 px-2"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <span className="px-2 font-bold text-[#0F253B]">
            {currentPage} / {Math.max(1, totalPages)}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="h-8 px-2"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
