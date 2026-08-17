import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, Calendar, FileText, ChevronDown, ArrowLeft } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'
import { RiskBadge } from '../../components/ui/RiskBadge'
import { Button } from '../../components/ui/Button'
import { formatDate } from '../../utils/formatters'
import type { Business, Assessment, CreditReport } from '../../types/schemas'

export interface BusinessProfileHeaderProps {
  business: Business
  allBusinesses: Business[]
  assessment?: Assessment | null
  creditReport?: CreditReport | null
  onSelectBusiness: (businessId: number) => void
}

export function BusinessProfileHeader({
  business,
  allBusinesses = [],
  assessment,
  creditReport,
  onSelectBusiness
}: BusinessProfileHeaderProps): React.JSX.Element {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] p-6 shadow-sm space-y-4">
      {/* Top action row: Back button & Quick Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0F2F3] pb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/overview')}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          className="text-[#5A6B76] hover:text-[#0F253B] self-start"
        >
          Back to Overview
        </Button>

        {/* Business Selector Dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-semibold text-[#839098]">Select Business:</span>
          <div className="relative">
            <select
              value={business.id}
              onChange={(e) => onSelectBusiness(Number(e.target.value))}
              className="appearance-none bg-[#F5F7F9] hover:bg-[#EAF6FB] text-[#0F253B] font-bold text-xs rounded-xl border border-[#CFD8DD] pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#268FB6]/30 cursor-pointer transition-colors"
            >
              {allBusinesses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.industry})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#5A6B76] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Profile Info Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0F253B] text-white flex items-center justify-center font-extrabold text-xl shadow-md shrink-0">
            {business.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F253B] tracking-tight">
                {business.name}
              </h1>
              {assessment?.status === 'Complete' ? (
                <Badge variant="success" size="sm">
                  Assessment Complete
                </Badge>
              ) : (
                <Badge variant="warning" size="sm">
                  Assessment Pending
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-[#5A6B76] flex-wrap">
              <div className="flex items-center gap-1 font-mono">
                <FileText className="w-3.5 h-3.5 text-[#839098]" />
                <span>CIPC: {business.registrationNumber}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#839098]" />
                <span className="font-semibold text-[#0F253B]">{business.industry}</span>
              </div>
              {assessment?.createdDate && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#839098]" />
                    <span>Evaluated {formatDate(assessment.createdDate)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Quick Risk Badge Callout */}
        <div className="flex items-center gap-2 self-start md:self-center bg-[#F5F7F9] p-3 rounded-xl border border-[rgba(0,0,0,0.06)]">
          <div className="text-right mr-2 hidden sm:block">
            <span className="text-[10px] font-bold uppercase text-[#839098] block">Underwriting Tier</span>
            <span className="text-xs font-bold text-[#0F253B]">
              {creditReport?.riskBand ? `${creditReport.riskBand} Risk` : 'Pending Review'}
            </span>
          </div>
          <RiskBadge
            riskBand={creditReport?.riskBand}
            isThinFile={creditReport?.isThinFile}
            showQualification
            size="md"
          />
        </div>
      </div>
    </div>
  )
}
