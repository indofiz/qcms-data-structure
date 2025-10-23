/**
 * Billet Mutation Hooks
 * React Query mutation hooks for billet operations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createBillet,
  updateBillet,
  deleteBillet,
} from '../services/billet.service'
import type {
  BilletFormData,
  BilletEditFormData,
} from '../types/billet.type'
import type { ResponseSingleType } from '../../../../shared/types/response.type'
import { BILLET_QUERY_KEY } from './billet-key'

// **POST**: Create new billet record
export const useAddBillet = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<BilletFormData>,
    Error,
    BilletFormData
  >({
    mutationFn: createBillet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BILLET_QUERY_KEY] })
      toast.success('Billet record created successfully')
    },
    onError: () => {
      toast.error('Failed to create billet record')
    },
  })
}

// **PATCH**: Update billet record
export const useUpdateBillet = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<BilletEditFormData>,
    Error,
    BilletEditFormData
  >({
    mutationFn: (data) => updateBillet(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BILLET_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [BILLET_QUERY_KEY,'detail', id] })
      toast.success('Billet record updated successfully')
    },
    onError: () => {
      toast.error('Failed to update billet record')
    },
  })
}

// **DELETE**: Delete billet record
export const useDeleteBillet = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<void>,
    Error,
    number
  >({
    mutationFn: deleteBillet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BILLET_QUERY_KEY] })
      toast.success('Billet record deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete billet record')
    },
  })
}
