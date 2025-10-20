/**
 * Unit Filter Store
 * Manages filter parameters for units master data with pagination
 * Following parameter pattern with persistence and enhanced actions
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Unit-specific filter state
export interface UnitFilterState {
  search: string
  page: number
  per_page: number
  // Add unit-specific filters when needed
  status?: 'active' | 'inactive' | ''
}

// Unit filter actions
export interface UnitFilterActions {
  setFilter: (filter: Partial<UnitFilterState>) => void
  setSearch: (search: string) => void
  setPage: (page: number) => void
  setPerPage: (perPage: number) => void
  setStatus: (status?: 'active' | 'inactive' | '') => void
  nextPage: () => void
  prevPage: () => void
  resetFilter: () => void
  resetPagination: () => void
}

// Combined store type
export type UnitFilterStore = UnitFilterState & UnitFilterActions

// Initial state
const initialState: UnitFilterState = {
  search: '',
  page: 1,
  per_page: 10,
  status: '',
}

// Create store with persistence
export const useUnitFilterStore = create<UnitFilterStore>()(
  persist(
    (set) => ({
      ...initialState,
      
      // Generic filter setter
      setFilter: (filter: Partial<UnitFilterState>) =>
        set((state) => ({ ...state, ...filter })),
      
      // Specific setters
      setSearch: (search: string) =>
        set((state) => ({ ...state, search, page: 1 })), // Reset to page 1 when searching
      
      setPage: (page: number) =>
        set((state) => ({ ...state, page })),
      
      setPerPage: (perPage: number) =>
        set((state) => ({ ...state, per_page: perPage, page: 1 })), // Reset to page 1 when changing per_page
      
      setStatus: (status?: 'active' | 'inactive' | '') =>
        set((state) => ({ ...state, status, page: 1 })), // Reset to page 1 when filtering
      
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
      name: 'unit-filter-store',
      partialize: (state) => ({
        search: state.search,
        per_page: state.per_page,
        status: state.status,
        // Don't persist page number to always start from page 1
      }),
    }
  )
)

export default useUnitFilterStore