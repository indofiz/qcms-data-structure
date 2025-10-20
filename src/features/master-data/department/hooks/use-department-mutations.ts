/**
 * Department Mutation Hooks
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../services'
import { DepartmentCreateType } from '../types'

// Create department mutation
export const useCreateDepartment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: DepartmentCreateType) => createDepartment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] })
      toast.success('Department created successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to create department: ${error.message}`)
    },
  })
}

// Update department mutation
export const useUpdateDepartment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<DepartmentCreateType> }) =>
      updateDepartment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] })
      queryClient.invalidateQueries({ queryKey: ['department-detail'] })
      toast.success('Department updated successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to update department: ${error.message}`)
    },
  })
}

// Delete department mutation
export const useDeleteDepartment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteDepartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] })
      toast.success('Department deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete department: ${error.message}`)
    },
  })
}