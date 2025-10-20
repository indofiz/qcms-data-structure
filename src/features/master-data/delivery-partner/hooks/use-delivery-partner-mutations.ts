/**
 * Delivery Partner Mutation Hooks
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createDeliveryPartner, updateDeliveryPartner, deleteDeliveryPartner } from '../services'
import { DeliveryPartnerRequestType } from '../types'
import { ResponseSingleType } from '@/shared/types/response.type'

// **POST**: Create new delivery partner
export const useAddDeliveryPartner = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<DeliveryPartnerRequestType>,
    Error,
    DeliveryPartnerRequestType
  >({
    mutationFn: createDeliveryPartner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['delivery-partners'] })
      queryClient.invalidateQueries({ queryKey: ['delivery-partners-active'] })
      toast.success('Delivery partner created successfully')
    },
    onError: () => {
      toast.error('Failed to create delivery partner')
    },
  })
}

// **PATCH**: Update delivery partner
export const useUpdateDeliveryPartner = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<DeliveryPartnerRequestType>,
    Error,
    DeliveryPartnerRequestType
  >({
    mutationFn: (data) => updateDeliveryPartner(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['delivery-partners'] })
      queryClient.invalidateQueries({ queryKey: ['delivery-partners-active'] })
      queryClient.invalidateQueries({ queryKey: ['delivery-partner-detail', id] })
      toast.success('Delivery partner updated successfully')
    },
    onError: () => {
      toast.error('Failed to update delivery partner')
    },
  })
}

// **DELETE**: Delete delivery partner
export const useDeleteDeliveryPartner = () => {
  const queryClient = useQueryClient()
  return useMutation<ResponseSingleType<{ message: string }>, Error, number>({
    mutationFn: deleteDeliveryPartner,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['delivery-partners'] })
      queryClient.invalidateQueries({ queryKey: ['delivery-partners-active'] })
      queryClient.removeQueries({ queryKey: ['delivery-partner-detail', id] })
      toast.success('Delivery partner deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete delivery partner')
    },
  })
}