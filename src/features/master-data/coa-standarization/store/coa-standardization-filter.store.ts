/**
 * COA Standardization Filter Store
 * Manages filter parameters for COA standardizations master data with pagination
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// COA Standardization-specific filter state
export interface CoaStandardizationFilterState {
  search: string
  page: number
  per_page: number
  // COA Standardization-specific filters
  raw_material?: string
}

// COA Standardization filter actions
export interface CoaStandardizationFilterActions {
  setFilter: (filter: Partial<CoaStandardizationFilterState>) => void
  setSearch: (search: string) => void
  setPage: (page: number) => void
  setPerPage: (perPage: number) => void
  setRawMaterial: (rawMaterial?: string) => void
  nextPage: () => void
  prevPage: () => void
  resetFilter: () => void
  resetPagination: () => void
}

// Combined store type
export type CoaStandardizationFilterStore = CoaStandardizationFilterState & CoaStandardizationFilterActions

// Initial state
const initialState: CoaStandardizationFilterState = {
  search: '',
  page: 1,
  per_page: 10,
  raw_material: undefined,
}

// Create store with persistence
export const useCoaStandardizationFilterStore = create<CoaStandardizationFilterStore>()(
  persist(
    (set) => ({
      ...initialState,
      
      // Generic filter setter
      setFilter: (filter: Partial<CoaStandardizationFilterState>) =>
        set((state) => ({ ...state, ...filter })),
      
      // Specific setters
      setSearch: (search: string) =>
        set((state) => ({ ...state, search, page: 1 })), // Reset to page 1 when searching
      
      setPage: (page: number) =>
        set((state) => ({ ...state, page })),
      
      setPerPage: (perPage: number) =>
        set((state) => ({ ...state, per_page: perPage, page: 1 })), // Reset to page 1 when changing per_page
      
      setRawMaterial: (raw_material?: string) =>
        set((state) => ({ ...state, raw_material, page: 1 })), // Reset to page 1 when filtering
      
      // Pagination actions
      nextPage: () =>
        set((state) => ({ ...state, page: state.page + 1 })),
      
      prevPage: () =>
        set((state) => ({ ...state, page: Math.max(1, state.page - 1) })),
      
      // Reset actions
      resetFilter: () => set(() => initialState),
      
      resetPagination: () =>
        set((state) => ({ ...state, page: 1, per_page: 10 })),
    }),
    {
      name: 'coa-standardization-filter-store',
      partialize: (state) => ({
        search: state.search,
        per_page: state.per_page,
        raw_material: state.raw_material,
        // Don't persist page number to always start from page 1
      }),
    }
  )
)

export default useCoaStandardizationFilterStore