/**
 * Analysis Mutation Hooks
 * React Query mutation hooks for analysis operations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createAnalysis,
  createBulkAnalysis,
  updateAnalysis,
  deleteAnalysis,
} from '../services/analysis.service'
import type {
  AnalysisFormData,
  AnalysisBulkFormData,
  AnalysisEditFormData,
} from '../types/analysis.type'
import type { ResponseSingleType } from '../../../../shared/types/response.type'
import { ANALYSIS_QUERY_KEY } from './analysis-key'

// **POST**: Create new analysis record
export const useAddAnalysis = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<AnalysisFormData>,
    Error,
    AnalysisFormData
  >({
    mutationFn: createAnalysis,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ANALYSIS_QUERY_KEY] })
      toast.success('Analysis record created successfully')
    },
    onError: () => {
      toast.error('Failed to create analysis record')
    },
  })
}

// **POST**: Create bulk analysis records
export const useAddBulkAnalysis = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<AnalysisBulkFormData>,
    Error,
    AnalysisBulkFormData
  >({
    mutationFn: createBulkAnalysis,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ANALYSIS_QUERY_KEY] })
      toast.success('Bulk analysis records created successfully')
    },
    onError: () => {
      toast.error('Failed to create bulk analysis records')
    },
  })
}

// **PATCH**: Update analysis record
export const useUpdateAnalysis = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<AnalysisEditFormData>,
    Error,
    AnalysisEditFormData
  >({
    mutationFn: (data) => updateAnalysis(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ANALYSIS_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [ANALYSIS_QUERY_KEY,'detail', id] })
      toast.success('Analysis record updated successfully')
    },
    onError: () => {
      toast.error('Failed to update analysis record')
    },
  })
}

// **DELETE**: Delete analysis record
export const useDeleteAnalysis = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<void>,
    Error,
    number
  >({
    mutationFn: deleteAnalysis,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ANALYSIS_QUERY_KEY] })
      toast.success('Analysis record deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete analysis record')
    },
  })
}
