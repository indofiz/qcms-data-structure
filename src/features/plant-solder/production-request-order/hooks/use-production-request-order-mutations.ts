/**
 * Production Request Order Mutation Hooks
 * React Query mutation hooks for production request order operations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createProductionRequestOrder,
  updateProductionStatus,
  updateQCResult,
  updateProductionRequestOrder,
  deleteProductionRequestOrder,
} from '../services/production-request-order.service'
import type {
  ProductionRequestOrderFormData,
  ProductionStatusUpdateFormData,
  ProductionQCResultUpdateFormData,
  ProductionRequestOrderEditFormData,
} from '../types/production-request-order.type'
import type { ResponseSingleType } from '../../../../shared/types/response.type'
import { PRODUCTION_REQUEST_ORDER_QUERY_KEY } from './production-request-order-key'

// **POST**: Create new production request order
export const useAddProductionRequestOrder = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<ProductionRequestOrderFormData>,
    Error,
    ProductionRequestOrderFormData
  >({
    mutationFn: createProductionRequestOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTION_REQUEST_ORDER_QUERY_KEY] })
      toast.success('Production request order created successfully')
    },
    onError: () => {
      toast.error('Failed to create production request order')
    },
  })
}

// **PATCH**: Update production status
export const useUpdateProductionStatus = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<ProductionStatusUpdateFormData>,
    Error,
    ProductionStatusUpdateFormData
  >({
    mutationFn: (data) => updateProductionStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTION_REQUEST_ORDER_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [PRODUCTION_REQUEST_ORDER_QUERY_KEY,'detail', id] })
      toast.success('Production status updated successfully')
    },
    onError: () => {
      toast.error('Failed to update production status')
    },
  })
}

// **PATCH**: Update QC result
export const useUpdateQCResult = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<ProductionQCResultUpdateFormData>,
    Error,
    ProductionQCResultUpdateFormData
  >({
    mutationFn: (data) => updateQCResult(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTION_REQUEST_ORDER_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [PRODUCTION_REQUEST_ORDER_QUERY_KEY,'detail', id] })
      toast.success('QC result updated successfully')
    },
    onError: () => {
      toast.error('Failed to update QC result')
    },
  })
}

// **PATCH**: Update production request order
export const useUpdateProductionRequestOrder = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<ProductionRequestOrderEditFormData>,
    Error,
    ProductionRequestOrderEditFormData
  >({
    mutationFn: (data) => updateProductionRequestOrder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTION_REQUEST_ORDER_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [PRODUCTION_REQUEST_ORDER_QUERY_KEY,'detail', id] })
      toast.success('Production request order updated successfully')
    },
    onError: () => {
      toast.error('Failed to update production request order')
    },
  })
}

// **DELETE**: Delete production request order
export const useDeleteProductionRequestOrder = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<void>,
    Error,
    number
  >({
    mutationFn: deleteProductionRequestOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTION_REQUEST_ORDER_QUERY_KEY] })
      toast.success('Production request order deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete production request order')
    },
  })
}
