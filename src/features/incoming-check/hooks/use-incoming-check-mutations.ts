/**
 * Incoming Check Mutation Hooks
 * React Query mutation hooks for incoming check operations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createIncomingCheck,
  updateIncomingCheck,
} from '../services'
import type {
  IncomingCheckFormData,
} from '../types/incoming-check.type'
import type { ResponseSingleType } from '../../../shared/types/response.type'
import { INCOMING_CHECK_QUERY_KEY } from './incoming-check-key'

// **POST**: Create new incoming check
export const useAddIncomingCheck = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<IncomingCheckFormData>,
    Error,
    IncomingCheckFormData
  >({
    mutationFn: createIncomingCheck,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INCOMING_CHECK_QUERY_KEY] })
      toast.success('Incoming check created successfully')
    },
    onError: () => {
      toast.error('Failed to create incoming check')
    },
  })
}

// **PATCH**: Update incoming check
export const useUpdateIncomingCheck = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<IncomingCheckFormData>,
    Error,
    IncomingCheckFormData
  >({
    mutationFn: (data) => updateIncomingCheck(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INCOMING_CHECK_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [INCOMING_CHECK_QUERY_KEY,'detail', id] })
      toast.success('Incoming check updated successfully')
    },
    onError: () => {
      toast.error('Failed to update incoming check')
    },
  })
}
