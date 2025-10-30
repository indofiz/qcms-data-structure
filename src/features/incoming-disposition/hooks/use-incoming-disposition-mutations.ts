/**
 * Incoming Disposition Mutation Hooks
 * React Query mutation hooks for incoming disposition operations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createIncomingDisposition,
  updateIncomingDisposition,
  changeIncomingDispositionDecision,
} from '../services'
import type {
  IncomingDispositionCreateFormData,
  IncomingDispositionEditFormData,
  IncomingDispositionChangeDecisionFormData,
} from '../types/incoming-disposition.type'
import type { ResponseSingleType } from '../../../shared/types/response.type'
import { INCOMING_DISPOSITION_QUERY_KEY } from './incoming-disposition-key'

// **POST**: Create new incoming disposition
export const useAddIncomingDisposition = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<unknown>,
    Error,
    IncomingDispositionCreateFormData
  >({
    mutationFn: createIncomingDisposition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INCOMING_DISPOSITION_QUERY_KEY] })
      toast.success('Incoming disposition created successfully')
    },
    onError: () => {
      toast.error('Failed to create incoming disposition')
    },
  })
}

// **PATCH**: Update incoming disposition
export const useUpdateIncomingDisposition = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<IncomingDispositionEditFormData>,
    Error,
    IncomingDispositionEditFormData
  >({
    mutationFn: (data) => updateIncomingDisposition(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INCOMING_DISPOSITION_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [INCOMING_DISPOSITION_QUERY_KEY,'detail', id] })
      toast.success('Incoming disposition updated successfully')
    },
    onError: () => {
      toast.error('Failed to update incoming disposition')
    },
  })
}

// **PATCH**: Change incoming disposition decision manager
export const useChangeIncomingDispositionDecision = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<IncomingDispositionChangeDecisionFormData>,
    Error,
    IncomingDispositionChangeDecisionFormData
  >({
    mutationFn: (data) => changeIncomingDispositionDecision(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INCOMING_DISPOSITION_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [INCOMING_DISPOSITION_QUERY_KEY,'detail', id] })
      toast.success('Incoming disposition decision changed successfully')
    },
    onError: () => {
      toast.error('Failed to change incoming disposition decision')
    },
  })
}
