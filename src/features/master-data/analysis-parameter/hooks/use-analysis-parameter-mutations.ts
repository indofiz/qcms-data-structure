/**
 * Analysis Parameter Mutation Hooks
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createAnalysisParameter,
  updateAnalysisParameter,
  deleteAnalysisParameter,
} from '../services'
import { AnalysisParameterCreateType } from '../types'

// Create analysis parameter mutation
export const useCreateAnalysisParameter = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AnalysisParameterCreateType) => createAnalysisParameter(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analysis-parameters'] })
      toast.success('Analysis parameter created successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to create analysis parameter: ${error.message}`)
    },
  })
}

// Update analysis parameter mutation
export const useUpdateAnalysisParameter = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AnalysisParameterCreateType> }) =>
      updateAnalysisParameter(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analysis-parameters'] })
      queryClient.invalidateQueries({ queryKey: ['analysis-parameter-detail'] })
      toast.success('Analysis parameter updated successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to update analysis parameter: ${error.message}`)
    },
  })
}

// Delete analysis parameter mutation
export const useDeleteAnalysisParameter = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteAnalysisParameter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analysis-parameters'] })
      toast.success('Analysis parameter deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete analysis parameter: ${error.message}`)
    },
  })
}