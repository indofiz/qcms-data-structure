/**
 * Raw Material Filter Store
 * Manages filter parameters for raw materials master data with pagination
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Raw Material-specific filter state
export interface RawMaterialFilterState {
  search: string
  page: number
  per_page: number
  category?: string // category name from master data categories
  plant?: string // plant name from master data plants
}

// Raw Material filter actions
export interface RawMaterialFilterActions {
  setFilter: (filter: Partial<RawMaterialFilterState>) => void
  setSearch: (search: string) => void
  setPage: (page: number) => void
  setPerPage: (perPage: number) => void
  setCategory: (category: string | undefined) => void
  setPlant: (plant: string | undefined) => void
  nextPage: () => void
  prevPage: () => void
  resetFilter: () => void
  resetPagination: () => void
}

// Combined store type
export type RawMaterialFilterStore = RawMaterialFilterState &
  RawMaterialFilterActions

// Initial state
const initialState: RawMaterialFilterState = {
  search: '',
  page: 1,
  per_page: 10,
  category: undefined,
  plant: undefined,
}

// Create store with persistence
export const useRawMaterialFilterStore = create<RawMaterialFilterStore>()(
  persist(
    (set) => ({
      ...initialState,

      // Generic filter setter
      setFilter: (filter: Partial<RawMaterialFilterState>) =>
        set((state) => ({ ...state, ...filter })),

      // Specific setters
      setSearch: (search: string) =>
        set((state) => ({ ...state, search, page: 1 })), // Reset to page 1 when searching

      setPage: (page: number) => set((state) => ({ ...state, page })),

      setPerPage: (perPage: number) =>
        set((state) => ({ ...state, per_page: perPage, page: 1 })), // Reset to page 1 when changing per_page

      setCategory: (category: string | undefined) =>
        set((state) => ({ ...state, category, page: 1 })), // Reset to page 1 when filtering

      setPlant: (plant: string | undefined) =>
        set((state) => ({ ...state, plant, page: 1 })), // Reset to page 1 when filtering

      // Pagination actions
      nextPage: () => set((state) => ({ ...state, page: state.page + 1 })),

      prevPage: () =>
        set((state) => ({ ...state, page: Math.max(1, state.page - 1) })),

      // Reset actions
      resetFilter: () => set(() => initialState),

      resetPagination: () =>
        set((state) => ({ ...state, page: 1, per_page: 10 })),
    }),
    {
      name: 'raw-material-filter-store',
      partialize: (state) => ({
        search: state.search,
        per_page: state.per_page,
        category: state.category,
        plant: state.plant,

        // Don't persist page number to always start from page 1
      }),
    }
  )
)

export default useRawMaterialFilterStore
