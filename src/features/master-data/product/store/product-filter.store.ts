/**
 * Product Filter Store
 * Manages filter parameters for products master data with pagination
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Product-specific filter state
export interface ProductFilterState {
  search: string
  page: number
  per_page: number
  plant?: string // plant name from plant master data
  activate?: number // 1 for active, 0 for inactive
}

// Product filter actions
export interface ProductFilterActions {
  setFilter: (filter: Partial<ProductFilterState>) => void
  setSearch: (search: string) => void
  setPage: (page: number) => void
  setPerPage: (perPage: number) => void
  setPlant: (plant: string | undefined) => void
  setActivate: (activate: number | undefined) => void
  nextPage: () => void
  prevPage: () => void
  resetFilter: () => void
  resetPagination: () => void
}

// Combined store type
export type ProductFilterStore = ProductFilterState & ProductFilterActions

// Initial state
const initialState: ProductFilterState = {
  search: '',
  page: 1,
  per_page: 10,
  plant: undefined,
  activate: undefined,
}

// Create store with persistence
export const useProductFilterStore = create<ProductFilterStore>()(
  persist(
    (set) => ({
      ...initialState,
      
      // Generic filter setter
      setFilter: (filter: Partial<ProductFilterState>) =>
        set((state) => ({ ...state, ...filter })),
      
      // Specific setters
      setSearch: (search: string) =>
        set((state) => ({ ...state, search, page: 1 })), // Reset to page 1 when searching
      
      setPage: (page: number) =>
        set((state) => ({ ...state, page })),
      
      setPerPage: (perPage: number) =>
        set((state) => ({ ...state, per_page: perPage, page: 1 })), // Reset to page 1 when changing per_page
      
      setPlant: (plant: string | undefined) =>
        set((state) => ({ ...state, plant, page: 1 })), // Reset to page 1 when filtering
      
      setActivate: (activate: number | undefined) =>
        set((state) => ({ ...state, activate, page: 1 })), // Reset to page 1 when filtering
      
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
      name: 'product-filter-store',
      partialize: (state) => ({
        search: state.search,
        per_page: state.per_page,
        plant: state.plant,
        activate: state.activate,
        // Don't persist page number to always start from page 1
      }),
    }
  )
)

export default useProductFilterStore