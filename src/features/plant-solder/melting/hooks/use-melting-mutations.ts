/**
 * Melting Mutation Hooks
 * React Query mutation hooks for melting operations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createMelting,
  createBulkMelting,
  updateMelting,
  deleteMelting,
} from '../services/melting.service'
import type {
  MeltingFormData,
  MeltingBulkFormData,
  MeltingEditFormData,
} from '../types/melting.type'
import type { ResponseSingleType } from '../../../../shared/types/response.type'
import { MELTING_QUERY_KEY } from './melting-key'

// **POST**: Create new melting record
export const useAddMelting = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<MeltingFormData>,
    Error,
    MeltingFormData
  >({
    mutationFn: createMelting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MELTING_QUERY_KEY] })
      toast.success('Melting record created successfully')
    },
    onError: () => {
      toast.error('Failed to create melting record')
    },
  })
}

// **POST**: Create bulk melting records
export const useAddBulkMelting = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<MeltingBulkFormData>,
    Error,
    MeltingBulkFormData
  >({
    mutationFn: createBulkMelting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MELTING_QUERY_KEY] })
      toast.success('Bulk melting records created successfully')
    },
    onError: () => {
      toast.error('Failed to create bulk melting records')
    },
  })
}

// **PATCH**: Update melting record
export const useUpdateMelting = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<MeltingEditFormData>,
    Error,
    MeltingEditFormData
  >({
    mutationFn: (data) => updateMelting(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MELTING_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [MELTING_QUERY_KEY,'detail', id] })
      toast.success('Melting record updated successfully')
    },
    onError: () => {
      toast.error('Failed to update melting record')
    },
  })
}

// **DELETE**: Delete melting record
export const useDeleteMelting = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<void>,
    Error,
    number
  >({
    mutationFn: deleteMelting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MELTING_QUERY_KEY] })
      toast.success('Melting record deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete melting record')
    },
  })
}
