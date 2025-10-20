/**
 * Plants Filter Store
 * Minimal store for plants management (kept for consistency)
 */

import { create } from 'zustand'

// Minimal plants state (for future use if needed)
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PlantsFilterState {
}

// Plants filter actions
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PlantsFilterActions {
}

// Combined store type
export type PlantsFilterStore = PlantsFilterState & PlantsFilterActions

// Initial state
const initialState: PlantsFilterState = {}

// Create store
export const usePlantsFilterStore = create<PlantsFilterStore>(() => ({
  ...initialState,
}))

export default usePlantsFilterStore