import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Building2, ArrowRight, X } from 'lucide-react'
import { Input } from '../../ui/Input'
import { useBusinesses } from '../../../api/queries'
import { useDebounce } from '../../../hooks/useDebounce'

export interface HeaderSearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  isMobile?: boolean
}

export function HeaderSearch({
  searchQuery,
  onSearchChange,
  isMobile = false
}: HeaderSearchProps): React.JSX.Element {
  const navigate = useNavigate()
  const [localInput, setLocalInput] = useState(searchQuery)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const debouncedQuery = useDebounce(localInput, 250)
  const { data: businesses = [] } = useBusinesses()

  // Sync debounced value with parent / search context
  useEffect(() => {
    onSearchChange(debouncedQuery)
  }, [debouncedQuery, onSearchChange])

  // Filter businesses by name or registration number
  const matchingBusinesses = React.useMemo(() => {
    if (!debouncedQuery.trim()) return []
    const query = debouncedQuery.toLowerCase().trim()
    return businesses.filter(
      (b) =>
        b.name.toLowerCase().includes(query) ||
        b.registrationNumber.toLowerCase().includes(query) ||
        b.industry.toLowerCase().includes(query)
    )
  }, [businesses, debouncedQuery])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelectBusiness = (businessId: number) => {
    setIsOpen(false)
    navigate(`/businesses/${businessId}`)
  }

  const handleClear = () => {
    setLocalInput('')
    onSearchChange('')
    setIsOpen(false)
  }

  if (isMobile) {
    return (
      <div className="sm:hidden px-4 pb-3 relative" ref={dropdownRef}>
        <Input
          value={localInput}
          onChange={(e) => {
            setLocalInput(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search companies by name or CIPC..."
          leftIcon={<Search className="w-4 h-4 text-white/40" />}
          rightIcon={
            localInput ? (
              <button
                type="button"
                onClick={handleClear}
                className="text-white/60 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : undefined
          }
          className="bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:bg-white focus:text-[#1A1A1A] focus:placeholder:text-[#839098] rounded-xl h-9 text-xs"
        />

        {/* Mobile Dropdown Search Results */}
        {isOpen && debouncedQuery.trim().length > 0 && (
          <div className="absolute left-4 right-4 top-full mt-1 bg-white rounded-xl shadow-xl border border-[rgba(0,0,0,0.1)] py-2 z-50 max-h-60 overflow-y-auto">
            {matchingBusinesses.length === 0 ? (
              <div className="px-4 py-3 text-center text-xs text-[#839098]">
                No companies found matching "{debouncedQuery}"
              </div>
            ) : (
              <div>
                <div className="px-3 py-1 text-[10px] font-bold text-[#839098] uppercase tracking-wider">
                  Matching Companies ({matchingBusinesses.length})
                </div>
                {matchingBusinesses.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleSelectBusiness(b.id)}
                    className="w-full text-left px-3.5 py-2 hover:bg-[#F5F7F9] flex items-center justify-between gap-2 border-b border-[#F0F2F3] last:border-0 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#268FB6] shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-[#0F253B]">{b.name}</div>
                        <div className="text-[10px] text-[#839098]">{b.industry} • {b.registrationNumber}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#839098]" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex-1 max-w-md mx-2 hidden sm:block relative" ref={dropdownRef}>
      <Input
        value={localInput}
        onChange={(e) => {
          setLocalInput(e.target.value)
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="Search company by name or CIPC number..."
        leftIcon={<Search className="w-4 h-4 text-white/40" />}
        rightIcon={
          localInput ? (
            <button
              type="button"
              onClick={handleClear}
              className="text-white/60 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : undefined
        }
        className="bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:bg-white focus:text-[#1A1A1A] focus:placeholder:text-[#839098] rounded-xl h-10 transition-colors"
      />

      {/* Desktop Dropdown Search Results */}
      {isOpen && debouncedQuery.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-[rgba(0,0,0,0.1)] py-2 z-50 max-h-72 overflow-y-auto">
          {matchingBusinesses.length === 0 ? (
            <div className="px-4 py-4 text-center text-xs text-[#839098]">
              No companies found matching "{debouncedQuery}"
            </div>
          ) : (
            <div>
              <div className="px-4 py-1.5 text-[10px] font-extrabold text-[#839098] uppercase tracking-wider">
                Companies ({matchingBusinesses.length})
              </div>
              {matchingBusinesses.map((b) => (
                <button
                  key={b.id}
                  onClick={() => handleSelectBusiness(b.id)}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#F2F9FC] flex items-center justify-between gap-3 border-b border-[#F0F2F3] last:border-0 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EAF6FB] text-[#268FB6] group-hover:bg-[#FF6D63] group-hover:text-white flex items-center justify-center font-bold text-xs transition-colors shrink-0">
                      {b.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F253B] group-hover:text-[#268FB6] transition-colors">
                        {b.name}
                      </div>
                      <div className="text-[11px] text-[#839098] font-mono">
                        {b.industry} • {b.registrationNumber}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#CFD8DD] group-hover:text-[#FF6D63] group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
