/**
 * Incoming Mutation Hooks
 * React Query mutation hooks for incoming material operations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createIncoming,
  updateIncoming,
  changeIncomingStatus,
} from '../services'
import type {
  IncomingEditFormData,
  IncomingChangeStatusFormData,
} from '../types/incoming.type'
import type { ResponseSingleType } from '../../../shared/types/response.type'
import { INCOMING_QUERY_KEY } from './incoming-key'

// **POST**: Create new incoming material with FormData
export const useAddIncoming = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<unknown>,
    Error,
    FormData
  >({
    mutationFn: createIncoming,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INCOMING_QUERY_KEY] })
      toast.success('Incoming material created successfully')
    },
    onError: () => {
      toast.error('Failed to create incoming material')
    },
  })
}

// **PATCH**: Update incoming material
export const useUpdateIncoming = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<IncomingEditFormData>,
    Error,
    IncomingEditFormData
  >({
    mutationFn: (data) => updateIncoming(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INCOMING_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [INCOMING_QUERY_KEY,'detail', id] })
      toast.success('Incoming material updated successfully')
    },
    onError: () => {
      toast.error('Failed to update incoming material')
    },
  })
}

// **PATCH**: Change incoming material status
export const useChangeIncomingStatus = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<IncomingChangeStatusFormData>,
    Error,
    IncomingChangeStatusFormData
  >({
    mutationFn: (data) => changeIncomingStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INCOMING_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [INCOMING_QUERY_KEY,'detail', id] })
      toast.success('Incoming material status changed successfully')
    },
    onError: () => {
      toast.error('Failed to change incoming material status')
    },
  })
}
