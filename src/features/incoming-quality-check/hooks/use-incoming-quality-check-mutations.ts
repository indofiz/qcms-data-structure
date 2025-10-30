/**
 * Incoming Quality Check Mutation Hooks
 * React Query mutation hooks for incoming quality check operations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createIncomingQualityCheck,
  updateIncomingQualityCheck,
  deleteIncomingQualityCheck,
} from '../services'
import type { ResponseSingleType } from '../../../shared/types/response.type'
import { INCOMING_QUALITY_CHECK_QUERY_KEY } from './incoming-quality-check-key'

// **POST**: Create new incoming quality check with FormData
export const useAddIncomingQualityCheck = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<unknown>,
    Error,
    FormData
  >({
    mutationFn: createIncomingQualityCheck,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INCOMING_QUALITY_CHECK_QUERY_KEY] })
      toast.success('Incoming quality check created successfully')
    },
    onError: () => {
      toast.error('Failed to create incoming quality check')
    },
  })
}

// **PATCH**: Update incoming quality check
export const useUpdateIncomingQualityCheck = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<unknown>,
    Error,
    FormData
  >({
    mutationFn: (data) => updateIncomingQualityCheck(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INCOMING_QUALITY_CHECK_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [INCOMING_QUALITY_CHECK_QUERY_KEY,'detail', id] })
      toast.success('Incoming quality check updated successfully')
    },
    onError: () => {
      toast.error('Failed to update incoming quality check')
    },
  })
}

// **DELETE**: Delete incoming quality check
export const useDeleteIncomingQualityCheck = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<unknown>,
    Error,
    number
  >({
    mutationFn: deleteIncomingQualityCheck,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INCOMING_QUALITY_CHECK_QUERY_KEY] })
      toast.success('Incoming quality check deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete incoming quality check')
    },
  })
}
