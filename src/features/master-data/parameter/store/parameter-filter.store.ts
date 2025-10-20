/**
 * Parameter Filter Store
 * Manages filter parameters for parameters master data with pagination
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Parameter-specific filter state
export interface ParameterFilterState {
  search: string
  page: number
  per_page: number
  // Add parameter-specific filters when needed
  status?: 'active' | 'inactive' | ''
}

// Parameter filter actions
export interface ParameterFilterActions {
  setFilter: (filter: Partial<ParameterFilterState>) => void
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
export type ParameterFilterStore = ParameterFilterState & ParameterFilterActions

// Initial state
const initialState: ParameterFilterState = {
  search: '',
  page: 1,
  per_page: 10,
  status: '',
}

// Create store with persistence
export const useParameterFilterStore = create<ParameterFilterStore>()(
  persist(
    (set) => ({
      ...initialState,
      
      // Generic filter setter
      setFilter: (filter: Partial<ParameterFilterState>) =>
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
      name: 'parameter-filter-store',
      partialize: (state) => ({
        search: state.search,
        per_page: state.per_page,
        status: state.status,
        // Don't persist page number to always start from page 1
      }),
    }
  )
)

export default useParameterFilterStore