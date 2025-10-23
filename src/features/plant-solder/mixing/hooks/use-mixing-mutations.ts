/**
 * Mixing Mutation Hooks
 * React Query mutation hooks for mixing operations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createMixing,
  createBulkMixing,
  updateMixing,
  deleteMixing,
} from '../services/mixing.service'
import type {
  MixingFormData,
  MixingBulkFormData,
  MixingEditFormData,
} from '../types/mixing.type'
import type { ResponseSingleType } from '../../../../shared/types/response.type'
import { MIXING_QUERY_KEY } from './mixing-key'

// **POST**: Create new mixing record
export const useAddMixing = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<MixingFormData>,
    Error,
    MixingFormData
  >({
    mutationFn: createMixing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MIXING_QUERY_KEY] })
      toast.success('Mixing record created successfully')
    },
    onError: () => {
      toast.error('Failed to create mixing record')
    },
  })
}

// **POST**: Create bulk mixing records
export const useAddBulkMixing = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<MixingBulkFormData>,
    Error,
    MixingBulkFormData
  >({
    mutationFn: createBulkMixing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MIXING_QUERY_KEY] })
      toast.success('Bulk mixing records created successfully')
    },
    onError: () => {
      toast.error('Failed to create bulk mixing records')
    },
  })
}

// **PATCH**: Update mixing record
export const useUpdateMixing = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<MixingEditFormData>,
    Error,
    MixingEditFormData
  >({
    mutationFn: (data) => updateMixing(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MIXING_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [MIXING_QUERY_KEY,'detail', id] })
      toast.success('Mixing record updated successfully')
    },
    onError: () => {
      toast.error('Failed to update mixing record')
    },
  })
}

// **DELETE**: Delete mixing record
export const useDeleteMixing = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<void>,
    Error,
    number
  >({
    mutationFn: deleteMixing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MIXING_QUERY_KEY] })
      toast.success('Mixing record deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete mixing record')
    },
  })
}
