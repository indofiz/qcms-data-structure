/**
 * Delivery Order Mutation Hooks
 * React Query mutation hooks for delivery order operations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createDeliveryOrder,
  updateDeliveryOrder,
} from '../services'
import type {
  DeliveryOrderFormData,
  DeliveryOrderUpdateFormData,
} from '../types/delivery-order.type'
import type { ResponseSingleType } from '../../../shared/types/response.type'
import { DELIVERY_ORDER_QUERY_KEY } from './delivery-order-key'

// **POST**: Create new delivery order
export const useAddDeliveryOrder = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<DeliveryOrderFormData>,
    Error,
    DeliveryOrderFormData
  >({
    mutationFn: createDeliveryOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DELIVERY_ORDER_QUERY_KEY] })
      toast.success('Delivery order created successfully')
    },
    onError: () => {
      toast.error('Failed to create delivery order')
    },
  })
}

// **PATCH**: Update delivery order
export const useUpdateDeliveryOrder = (do_number: string) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<DeliveryOrderUpdateFormData>,
    Error,
    DeliveryOrderUpdateFormData
  >({
    mutationFn: (data) => updateDeliveryOrder(do_number, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DELIVERY_ORDER_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [DELIVERY_ORDER_QUERY_KEY,'detail', do_number] })
      toast.success('Delivery order updated successfully')
    },
    onError: () => {
      toast.error('Failed to update delivery order')
    },
  })
}
