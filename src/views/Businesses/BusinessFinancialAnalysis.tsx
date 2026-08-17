import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { formatCurrency, formatPercentage } from '../../utils/formatters'
import type { BankStatement } from '../../types/schemas'
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  Calendar
} from 'lucide-react'

export interface BusinessFinancialAnalysisProps {
  bankStatement?: BankStatement | null
}

export function BusinessFinancialAnalysis({
  bankStatement
}: BusinessFinancialAnalysisProps): React.JSX.Element {
  const credits = bankStatement?.totalCredits ?? 0
  const debits = bankStatement?.totalDebits ?? 0
  const months = bankStatement?.monthsAnalysed ?? 1
  const netCashFlow = credits - debits
  const isNetPositive = netCashFlow >= 0

  const monthlyCredits = credits / months
  const monthlyDebits = debits / months
  const monthlyNet = netCashFlow / months
  const netMargin = credits > 0 ? (netCashFlow / credits) * 100 : 0

  // Percentage distribution between credits and debits for visual bar
  const totalVolume = credits + debits || 1
  const creditShare = (credits / totalVolume) * 100
  const debitShare = (debits / totalVolume) * 100

  return (
    <Card className="p-0 overflow-hidden shadow-sm flex flex-col justify-between">
      <CardHeader className="border-b border-[#F0F2F3] bg-[#F5F7F9]/50 flex-row items-center justify-between space-y-0 py-3.5 px-5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#FF6D63] text-white rounded-lg">
            <Wallet className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-sm">Bank Statement Financials</CardTitle>
            <p className="text-[11px] text-[#5A6B76]">
              Verified cash flow & bank transaction liquidity ({months} Months Analysed)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-bold text-[#5A6B76] bg-white px-2.5 py-1 rounded-lg border border-[rgba(0,0,0,0.06)]">
          <Calendar className="w-3.5 h-3.5 text-[#268FB6]" />
          <span>{months} Mo. Window</span>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-5">
        {/* 3 Core Financial KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Total Inflow / Credits */}
          <div className="p-3.5 bg-[#F5F7F9] rounded-xl border border-[rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between text-[#5A6B76]">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Inflow</span>
              <ArrowUpRight className="w-4 h-4 text-[#1AAE4E]" />
            </div>
            <div className="text-xl font-extrabold text-[#0F253B] mt-1 tabular-nums">
              {formatCurrency(credits)}
            </div>
            <div className="text-[10px] text-[#839098] mt-0.5">
              Avg: {formatCurrency(monthlyCredits)} / mo
            </div>
          </div>

          {/* Total Outflow / Debits */}
          <div className="p-3.5 bg-[#F5F7F9] rounded-xl border border-[rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between text-[#5A6B76]">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Outflow</span>
              <ArrowDownRight className="w-4 h-4 text-[#FF274B]" />
            </div>
            <div className="text-xl font-extrabold text-[#0F253B] mt-1 tabular-nums">
              {formatCurrency(debits)}
            </div>
            <div className="text-[10px] text-[#839098] mt-0.5">
              Avg: {formatCurrency(monthlyDebits)} / mo
            </div>
          </div>

          {/* Net Cash Flow Position */}
          <div
            className={`p-3.5 rounded-xl border ${
              isNetPositive
                ? 'bg-[#E8F8EE] border-[#BBF7D0]'
                : 'bg-[#FFEEF2] border-[#FECDD3]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-[11px] font-bold uppercase tracking-wider ${
                  isNetPositive ? 'text-[#15803D]' : 'text-[#E11D48]'
                }`}
              >
                Net Cash Flow
              </span>
              {isNetPositive ? (
                <TrendingUp className="w-4 h-4 text-[#15803D]" />
              ) : (
                <TrendingDown className="w-4 h-4 text-[#E11D48]" />
              )}
            </div>
            <div
              className={`text-xl font-extrabold mt-1 tabular-nums ${
                isNetPositive ? 'text-[#15803D]' : 'text-[#E11D48]'
              }`}
            >
              {formatCurrency(netCashFlow)}
            </div>
            <div
              className={`text-[10px] mt-0.5 font-medium ${
                isNetPositive ? 'text-[#15803D]/80' : 'text-[#E11D48]/80'
              }`}
            >
              Margin: {formatPercentage(netMargin)} ({formatCurrency(monthlyNet)}/mo)
            </div>
          </div>
        </div>

        {/* Inflow vs Outflow Ratio Visual Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-[#15803D] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#1AAE4E]" />
              Inflow: {creditShare.toFixed(1)}%
            </span>
            <span className="text-[#E11D48] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#FF274B]" />
              Outflow: {debitShare.toFixed(1)}%
            </span>
          </div>

          <div className="w-full h-3 bg-[#E2EAF0] rounded-full overflow-hidden flex">
            <div
              style={{ width: `${creditShare}%` }}
              className="h-full bg-[#1AAE4E] transition-all duration-500"
              title={`Credits: ${formatCurrency(credits)}`}
            />
            <div
              style={{ width: `${debitShare}%` }}
              className="h-full bg-[#FF274B] transition-all duration-500"
              title={`Debits: ${formatCurrency(debits)}`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
