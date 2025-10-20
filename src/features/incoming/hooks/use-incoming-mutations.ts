/**
 * Incoming Mutation Hooks
 * React Query mutation hooks for incoming material operations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createIncoming,
  approveIncoming,
  updateIncoming,
} from '../services'
import type {
  IncomingFormData,
  IncomingApproveFormData,
  IncomingEditFormData,
} from '../types/incoming.type'
import type { ResponseSingleType } from '@/shared/types/response.type'

// **POST**: Create new incoming material
export const useAddIncoming = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<IncomingFormData>,
    Error,
    IncomingFormData
  >({
    mutationFn: createIncoming,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomings'] })
      toast.success('Incoming material created successfully')
    },
    onError: () => {
      toast.error('Failed to create incoming material')
    },
  })
}

// **PATCH**: Approve or reject incoming material
export const useApproveIncoming = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<IncomingApproveFormData>,
    Error,
    IncomingApproveFormData
  >({
    mutationFn: (data) => approveIncoming(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['incomings'] })
      queryClient.invalidateQueries({ queryKey: ['incoming-detail', id] })
      const action = variables.status === 'APPROVED' ? 'approved' : 'rejected'
      toast.success(`Incoming material ${action} successfully`)
    },
    onError: () => {
      toast.error('Failed to process incoming material approval')
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
      queryClient.invalidateQueries({ queryKey: ['incomings'] })
      queryClient.invalidateQueries({ queryKey: ['incoming-detail', id] })
      toast.success('Incoming material updated successfully')
    },
    onError: () => {
      toast.error('Failed to update incoming material')
    },
  })
}
