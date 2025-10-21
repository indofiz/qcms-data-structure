import { create } from 'zustand'
import type { IncomingCheckFilterType } from '../types/incoming-check-filter.type'


interface FilterIncomingCheckActions {
  setFilter: (filter: Partial<IncomingCheckFilterType>) => void
  resetFilter: () => void
}

export type FilterIncomingCheckStore = IncomingCheckFilterType & FilterIncomingCheckActions

const initialState: IncomingCheckFilterType = {
  search: '',
  start_date: '',
  end_date: '',
  page: 1,
  per_page: 10,
  created_at_order: 'DESC',
}

const useFilterIncomingCheckStore = create<FilterIncomingCheckStore>((set) => ({
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

export default useFilterIncomingCheckStore
