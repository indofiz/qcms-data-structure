/**
 * Ordering Good Mutation Hooks
 * React Query mutation hooks for ordering good operations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createOrderingGood,
  updateOrderingGood,
} from '../services'
import type {
  OrderingGoodFormData,
  OrderingGoodUpdateFormData,
} from '../types/ordering-good.type'
import type { ResponseSingleType } from '../../../shared/types/response.type'
import { ORDERING_GOOD_QUERY_KEY } from './ordering-good-key'

// **POST**: Create new ordering good
export const useAddOrderingGood = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<OrderingGoodFormData>,
    Error,
    OrderingGoodFormData
  >({
    mutationFn: createOrderingGood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ORDERING_GOOD_QUERY_KEY] })
      toast.success('Ordering good created successfully')
    },
    onError: () => {
      toast.error('Failed to create ordering good')
    },
  })
}

// **PATCH**: Update ordering good
export const useUpdateOrderingGood = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<OrderingGoodUpdateFormData>,
    Error,
    OrderingGoodUpdateFormData
  >({
    mutationFn: (data) => updateOrderingGood(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ORDERING_GOOD_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [ORDERING_GOOD_QUERY_KEY,'detail', id] })
      toast.success('Ordering good updated successfully')
    },
    onError: () => {
      toast.error('Failed to update ordering good')
    },
  })
}
