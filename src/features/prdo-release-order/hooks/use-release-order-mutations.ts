/**
 * Release Order Mutation Hooks
 * React Query mutation hooks for release order operations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createReleaseOrder,
  updateReleaseOrder,
  updateReleaseOrderChecklist,
} from '../services'
import type {
  ReleaseOrderFormData,
  ReleaseOrderUpdateFormData,
  ReleaseOrderUpdateChecklistFormData,
} from '../types/release-order.type'
import type { ResponseSingleType } from '../../../shared/types/response.type'
import { RELEASE_ORDER_QUERY_KEY } from './release-order-key'

// **POST**: Create new release order
export const useAddReleaseOrder = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<ReleaseOrderFormData>,
    Error,
    ReleaseOrderFormData
  >({
    mutationFn: createReleaseOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RELEASE_ORDER_QUERY_KEY] })
      toast.success('Release order created successfully')
    },
    onError: () => {
      toast.error('Failed to create release order')
    },
  })
}

// **PATCH**: Update release order
export const useUpdateReleaseOrder = (ro_number: string) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<ReleaseOrderUpdateFormData>,
    Error,
    ReleaseOrderUpdateFormData
  >({
    mutationFn: (data) => updateReleaseOrder(ro_number, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RELEASE_ORDER_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [RELEASE_ORDER_QUERY_KEY,'detail', ro_number] })
      toast.success('Release order updated successfully')
    },
    onError: () => {
      toast.error('Failed to update release order')
    },
  })
}

// **POST**: Update release order checklist
export const useUpdateReleaseOrderChecklist = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<ReleaseOrderUpdateChecklistFormData>,
    Error,
    ReleaseOrderUpdateChecklistFormData
  >({
    mutationFn: updateReleaseOrderChecklist,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [RELEASE_ORDER_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [RELEASE_ORDER_QUERY_KEY,'detail', variables.ro_number] })
      toast.success('Release order checklist updated successfully')
    },
    onError: () => {
      toast.error('Failed to update release order checklist')
    },
  })
}
