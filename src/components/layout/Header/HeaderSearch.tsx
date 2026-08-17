import React from 'react'
import { Search } from 'lucide-react'
import { Input } from '../../ui/Input'

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
  if (isMobile) {
    return (
      <div className="sm:hidden px-4 pb-3">
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search businesses, reg no..."
          leftIcon={<Search className="w-4 h-4 text-white/40" />}
          className="bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:bg-white focus:text-[#1A1A1A] focus:placeholder:text-[#839098] rounded-xl h-9 text-xs"
        />
      </div>
    )
  }

  return (
    <div className="flex-1 max-w-md mx-2 hidden sm:block">
      <Input
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search businesses, reg numbers, assessments..."
        leftIcon={<Search className="w-4 h-4 text-white/40" />}
        className="bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:bg-white focus:text-[#1A1A1A] focus:placeholder:text-[#839098] rounded-xl h-10 transition-colors"
      />
    </div>
  )
}
