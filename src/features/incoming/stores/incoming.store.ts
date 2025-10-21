import { create } from 'zustand'
import type { IncomingFilterType } from '../types/incoming-filter.type'


interface FilterIncomingActions {
  setFilter: (filter: Partial<IncomingFilterType>) => void
  resetFilter: () => void
}

export type FilterIncomingStore = IncomingFilterType & FilterIncomingActions

const initialState: IncomingFilterType = {
  search: '',
  status: '',
  start_date: '',
  end_date: '',
  page: 1,
  per_page: 10,
  created_at_order: 'DESC',
  plant: '',
}

const useFilterIncomingStore = create<FilterIncomingStore>((set) => ({
  ...initialState,

  setFilter: (filter) =>
    set((state) => ({
      ...state,
      ...filter,
      // Reset to page 1 when other filters change (except page itself)
      page: filter.page !== undefined ? filter.page : 1,
    })),

  resetFilter: () => set(initialState),
}))

export default useFilterIncomingStore
