/**
 * Analysis Parameter Filter Store
 * Minimal store for analysis parameter management (kept for consistency)
 */

import { create } from 'zustand'

// Minimal analysis parameter state (for future use if needed)
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AnalysisParameterFilterState {
}

// Analysis parameter filter actions
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AnalysisParameterFilterActions {
}

// Combined store type
export type AnalysisParameterFilterStore = AnalysisParameterFilterState & AnalysisParameterFilterActions

// Initial state
const initialState: AnalysisParameterFilterState = {}

// Create store
export const useAnalysisParameterFilterStore = create<AnalysisParameterFilterStore>(() => ({
  ...initialState,
}))

export default useAnalysisParameterFilterStore