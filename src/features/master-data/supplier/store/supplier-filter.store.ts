/**
 * Supplier Filter Store
 * Manages filter parameters for suppliers master data with pagination
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Supplier-specific filter state
export interface SupplierFilterState {
  search: string
  page: number
  per_page: number
  // Add supplier-specific filters when needed
  city?: string
  province?: string
  status?: 'active' | 'inactive' | ''
}

// Supplier filter actions
export interface SupplierFilterActions {
  setFilter: (filter: Partial<SupplierFilterState>) => void
  setSearch: (search: string) => void
  setPage: (page: number) => void
  setPerPage: (perPage: number) => void
  setCity: (city?: string) => void
  setProvince: (province?: string) => void
  setStatus: (status?: 'active' | 'inactive' | '') => void
  nextPage: () => void
  prevPage: () => void
  resetFilter: () => void
  resetPagination: () => void
}

// Combined store type
export type SupplierFilterStore = SupplierFilterState & SupplierFilterActions

// Initial state
const initialState: SupplierFilterState = {
  search: '',
  page: 1,
  per_page: 10,
  city: undefined,
  province: undefined,
  status: '',
}

// Create store with persistence
export const useSupplierFilterStore = create<SupplierFilterStore>()(
  persist(
    (set) => ({
      ...initialState,
      
      // Generic filter setter
      setFilter: (filter: Partial<SupplierFilterState>) =>
        set((state) => ({ ...state, ...filter })),
      
      // Specific setters
      setSearch: (search: string) =>
        set((state) => ({ ...state, search, page: 1 })), // Reset to page 1 when searching
      
      setPage: (page: number) =>
        set((state) => ({ ...state, page })),
      
      setPerPage: (perPage: number) =>
        set((state) => ({ ...state, per_page: perPage, page: 1 })), // Reset to page 1 when changing per_page
      
      setCity: (city?: string) =>
        set((state) => ({ ...state, city, page: 1 })), // Reset to page 1 when filtering
      
      setProvince: (province?: string) =>
        set((state) => ({ ...state, province, page: 1 })), // Reset to page 1 when filtering
      
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
      name: 'supplier-filter-store',
      partialize: (state) => ({
        search: state.search,
        per_page: state.per_page,
        city: state.city,
        province: state.province,
        status: state.status,
        // Don't persist page number to always start from page 1
      }),
    }
  )
)

export default useSupplierFilterStore