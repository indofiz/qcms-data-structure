/**
 * Category Filter Store
 * Minimal store for category management (kept for consistency)
 */

import { create } from 'zustand'

// Minimal category state (for future use if needed)
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CategoryFilterState {
}

// Category filter actions
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CategoryFilterActions {
}

// Combined store type
export type CategoryFilterStore = CategoryFilterState & CategoryFilterActions

// Initial state
const initialState: CategoryFilterState = {}

// Create store
export const useCategoryFilterStore = create<CategoryFilterStore>(() => ({
  ...initialState,
}))

export default useCategoryFilterStore