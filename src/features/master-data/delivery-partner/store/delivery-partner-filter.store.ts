/**
 * Delivery Partner Filter Store
 * Manages filter parameters for delivery partners master data with pagination
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Delivery Partner-specific filter state
export interface DeliveryPartnerFilterState {
  search: string
  page: number
  per_page: number
  // Add delivery partner-specific filters when needed
  status?: 'active' | 'inactive' | ''
}

// Delivery Partner filter actions
export interface DeliveryPartnerFilterActions {
  setFilter: (filter: Partial<DeliveryPartnerFilterState>) => void
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
export type DeliveryPartnerFilterStore = DeliveryPartnerFilterState & DeliveryPartnerFilterActions

// Initial state
const initialState: DeliveryPartnerFilterState = {
  search: '',
  page: 1,
  per_page: 10,
  status: '',
}

// Create store with persistence
export const useDeliveryPartnerFilterStore = create<DeliveryPartnerFilterStore>()(
  persist(
    (set) => ({
      ...initialState,
      
      // Generic filter setter
      setFilter: (filter: Partial<DeliveryPartnerFilterState>) =>
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
      name: 'delivery-partner-filter-store',
      partialize: (state) => ({
        search: state.search,
        per_page: state.per_page,
        status: state.status,
        // Don't persist page number to always start from page 1
      }),
    }
  )
)

export default useDeliveryPartnerFilterStore