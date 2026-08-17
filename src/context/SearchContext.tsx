import React, { createContext, useContext, useState } from 'react'

interface SearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const SearchContext = createContext<SearchContextType>({
  searchQuery: '',
  setSearchQuery: () => {}
})

export function SearchProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('')

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch(): SearchContextType {
  return useContext(SearchContext)
}
