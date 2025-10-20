/**
 * Roles Mutation Hooks
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createRole,
  updateRole,
  deleteRole,
} from '../services'
import { RolesRequestType } from '../types'

// Create role mutation
export const useCreateRole = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RolesRequestType) => createRole(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      toast.success('Role created successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to create role: ${error.message}`)
    },
  })
}

// Update role mutation
export const useUpdateRole = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<RolesRequestType> }) =>
      updateRole(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      queryClient.invalidateQueries({ queryKey: ['role-detail'] })
      toast.success('Role updated successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to update role: ${error.message}`)
    },
  })
}

// Delete role mutation
export const useDeleteRole = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      toast.success('Role deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete role: ${error.message}`)
    },
  })
}