/**
 * Incoming Check Filter Store
 *
 * Simple Zustand store for managing incoming check list filter state.
 * Use this with React Query hooks for API filtering.
 */

import { create } from 'zustand';
import type { IncomingCheckFilterState } from '../types/incoming-check-filter.type';

/**
 * Store Actions
 */
export interface IncomingCheckFilterActions {
  setSearch: (search: string) => void;
  setPage: (page: number | string) => void;
  setPerPage: (per_page: number | string) => void;
  setStartDate: (start_date: string) => void;
  setEndDate: (end_date: string) => void;
  setCreatedAtOrder: (order: 'ASC' | 'DESC') => void;
  setFilters: (filters: Partial<IncomingCheckFilterState>) => void;
  resetFilters: () => void;
}

/**
 * Complete Store Type
 */
export type IncomingCheckFilterStore = IncomingCheckFilterState & IncomingCheckFilterActions;

/**
 * Default filter values
 */
const defaultFilters: IncomingCheckFilterState = {
  search: '',
  page: 1,
  per_page: 10,
  created_at_order: 'DESC',
  start_date: '',
  end_date: '',
};

/**
 * Incoming Check Filter Store
 *
 * @example
 * ```tsx
 * // Get all state and actions
 * const { search, page, setSearch, setPage, resetFilters } = useIncomingCheckFilterStore();
 *
 * // Use with React Query
 * const filters = useIncomingCheckFilterStore((state) => ({
 *   search: state.search,
 *   page: state.page,
 *   per_page: state.per_page,
 *   created_at_order: state.created_at_order,
 * }));
 * const { data } = useGetIncomingChecks({ filter: filters });
 * ```
 */
export const useIncomingCheckFilterStore = create<IncomingCheckFilterStore>((set) => ({
  // State
  ...defaultFilters,

  // Actions
  setSearch: (search) => set({ search }),
  setPage: (page) => set({ page }),
  setPerPage: (per_page) => set({ per_page }),
  setStartDate: (start_date) => set({ start_date }),
  setEndDate: (end_date) => set({ end_date }),
  setCreatedAtOrder: (created_at_order) => set({ created_at_order }),
  setFilters: (filters) => set((state) => ({ ...state, ...filters })),
  resetFilters: () => set(defaultFilters),
}));
