/**
 * DMT Filter List Store
 *
 * Simple Zustand store for managing DMT list filter state.
 * Use this with React Query hooks for API filtering.
 */

import { create } from 'zustand';
import type { DmtFilterState } from '../types/dmt-filter.type';

/**
 * Store Actions
 */
export interface DmtFilterActions {
  setSearch: (search: string) => void;
  setPage: (page: number | string) => void;
  setPerPage: (per_page: number | string) => void;
  setStatus: (status: string) => void;
  setCreatedAtOrder: (order: 'ASC' | 'DESC') => void;
  setFilters: (filters: Partial<DmtFilterState>) => void;
  resetFilters: () => void;
}

/**
 * Complete Store Type
 */
export type DmtFilterStore = DmtFilterState & DmtFilterActions;

/**
 * Default filter values
 */
const defaultFilters: DmtFilterState = {
  search: '',
  page: 1,
  per_page: 10,
  status: '',
  created_at_order: 'DESC',
};

/**
 * DMT Filter Store
 *
 * @example
 * ```tsx
 * // Get all state and actions
 * const { search, page, status, setSearch, setPage, resetFilters } = useDmtFilterStore();
 *
 * // Use with React Query
 * const filters = useDmtFilterStore((state) => ({
 *   search: state.search,
 *   page: state.page,
 *   per_page: state.per_page,
 *   status: state.status,
 *   created_at_order: state.created_at_order,
 * }));
 * const { data } = useGetDmts({ filter: filters });
 * ```
 */
export const useDmtFilterStore = create<DmtFilterStore>((set) => ({
  // State
  ...defaultFilters,

  // Actions
  setSearch: (search) => set({ search }),
  setPage: (page) => set({ page }),
  setPerPage: (per_page) => set({ per_page }),
  setStatus: (status) => set({ status }),
  setCreatedAtOrder: (created_at_order) => set({ created_at_order }),
  setFilters: (filters) => set((state) => ({ ...state, ...filters })),
  resetFilters: () => set(defaultFilters),
}));