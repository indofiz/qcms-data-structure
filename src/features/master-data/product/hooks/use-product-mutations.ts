/**
 * Product Mutation Hooks
 * Following supplier pattern for specific mutation hooks
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../services'
import { 
  ProductRequestType 
} from '../types'
import { ResponseSingleType } from '@/shared/types/response.type'

// **POST**: Create new product
export const useAddProduct = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<ProductRequestType>,
    Error,
    ProductRequestType
  >({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['products-active'] })
      toast.success('Product created successfully')
    },
    onError: () => {
      toast.error('Failed to create product')
    },
  })
}

// **PATCH**: Update product
export const useUpdateProduct = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<ProductRequestType>,
    Error,
    ProductRequestType
  >({
    mutationFn: (data) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['products-active'] })
      queryClient.invalidateQueries({ queryKey: ['product-detail', id] })
      toast.success('Product updated successfully')
    },
    onError: () => {
      toast.error('Failed to update product')
    },
  })
}

// **DELETE**: Delete product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation<ResponseSingleType<{ message: string }>, Error, number>({
    mutationFn: deleteProduct,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['products-active'] })
      queryClient.removeQueries({ queryKey: ['product-detail', id] })
      toast.success('Product deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete product')
    },
  })
}