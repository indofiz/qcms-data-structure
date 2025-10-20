/**
 * Supplier Mutation Hooks
 * Following packing list pattern for specific mutation hooks
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createSupplier, updateSupplier, deleteSupplier } from '../services'
import { SupplierRequestType } from '../types'
import { ResponseSingleType } from '@/shared/types/response.type'

// **POST**: Create new supplier
export const useAddSupplier = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<SupplierRequestType>,
    Error,
    SupplierRequestType
  >({
    mutationFn: createSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
      queryClient.invalidateQueries({ queryKey: ['suppliers-active'] })
      toast.success('Supplier created successfully')
    },
    onError: () => {
      toast.error('Failed to create supplier')
    },
  })
}

// **PATCH**: Update supplier
export const useUpdateSupplier = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<SupplierRequestType>,
    Error,
    SupplierRequestType
  >({
    mutationFn: (data) => updateSupplier(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
      queryClient.invalidateQueries({ queryKey: ['suppliers-active'] })
      queryClient.invalidateQueries({ queryKey: ['supplier-detail', id] })
      toast.success('Supplier updated successfully')
    },
    onError: () => {
      toast.error('Failed to update supplier')
    },
  })
}

// **DELETE**: Delete supplier
export const useDeleteSupplier = () => {
  const queryClient = useQueryClient()
  return useMutation<ResponseSingleType<{ message: string }>, Error, number>({
    mutationFn: deleteSupplier,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
      queryClient.invalidateQueries({ queryKey: ['suppliers-active'] })
      queryClient.removeQueries({ queryKey: ['supplier-detail', id] })
      toast.success('Supplier deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete supplier')
    },
  })
}
