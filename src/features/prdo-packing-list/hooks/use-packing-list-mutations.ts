/**
 * Packing List Mutation Hooks
 * React Query mutation hooks for packing list operations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createPackingList,
  createBulkPackingList,
  updatePackingList,
  updatePackingListStatusQC,
  updatePackingListStatusPL,
} from '../services'
import type {
  PackingListFormData,
  PackingListBulkFormData,
  PackingListUpdateFormData,
  PackingListUpdateStatusQCFormData,
  PackingListUpdateStatusPLFormData,
} from '../types/packing-list.type'
import type { ResponseSingleType } from '../../../shared/types/response.type'
import { PACKING_LIST_QUERY_KEY } from './packing-list-key'

// **POST**: Create new packing list
export const useAddPackingList = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<PackingListFormData>,
    Error,
    PackingListFormData
  >({
    mutationFn: createPackingList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PACKING_LIST_QUERY_KEY] })
      toast.success('Packing list created successfully')
    },
    onError: () => {
      toast.error('Failed to create packing list')
    },
  })
}

// **POST**: Create bulk packing list with ordering goods
export const useAddBulkPackingList = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<PackingListBulkFormData>,
    Error,
    PackingListBulkFormData
  >({
    mutationFn: createBulkPackingList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PACKING_LIST_QUERY_KEY] })
      toast.success('Bulk packing list created successfully')
    },
    onError: () => {
      toast.error('Failed to create bulk packing list')
    },
  })
}

// **PATCH**: Update packing list
export const useUpdatePackingList = (pl_number: string) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<PackingListUpdateFormData>,
    Error,
    PackingListUpdateFormData
  >({
    mutationFn: (data) => updatePackingList(pl_number, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PACKING_LIST_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [PACKING_LIST_QUERY_KEY,'detail', pl_number] })
      toast.success('Packing list updated successfully')
    },
    onError: () => {
      toast.error('Failed to update packing list')
    },
  })
}

// **POST**: Update packing list status QC
export const useUpdatePackingListStatusQC = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<PackingListUpdateStatusQCFormData>,
    Error,
    PackingListUpdateStatusQCFormData
  >({
    mutationFn: updatePackingListStatusQC,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [PACKING_LIST_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [PACKING_LIST_QUERY_KEY,'detail', variables.pl_number] })
      toast.success('Packing list status QC updated successfully')
    },
    onError: () => {
      toast.error('Failed to update packing list status QC')
    },
  })
}

// **POST**: Update packing list status PL
export const useUpdatePackingListStatusPL = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<PackingListUpdateStatusPLFormData>,
    Error,
    PackingListUpdateStatusPLFormData
  >({
    mutationFn: updatePackingListStatusPL,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [PACKING_LIST_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [PACKING_LIST_QUERY_KEY,'detail', variables.pl_number] })
      toast.success('Packing list status updated successfully')
    },
    onError: () => {
      toast.error('Failed to update packing list status')
    },
  })
}
