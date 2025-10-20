/**
 * Category Mutation Hooks
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services'
import { CategoryCreateType } from '../types'

// Create category mutation
export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CategoryCreateType) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Category created successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to create category: ${error.message}`)
    },
  })
}

// Update category mutation
export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CategoryCreateType> }) =>
      updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['category-detail'] })
      toast.success('Category updated successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to update category: ${error.message}`)
    },
  })
}

// Delete category mutation
export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Category deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete category: ${error.message}`)
    },
  })
}