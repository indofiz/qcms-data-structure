/**
 * Unit Mutation Hooks
 * Following parameter pattern for unit mutation hooks
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { 
  createUnit, 
  updateUnit, 
  deleteUnit 
} from '../services'
import { 
  UnitCreateType
} from '../types'
import { ResponseSingleType } from '@/shared/types/response.type'

// **POST**: Create new unit
export const useAddUnit = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<UnitCreateType>,
    Error,
    UnitCreateType
  >({
    mutationFn: createUnit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['units'] })
      queryClient.invalidateQueries({ queryKey: ['units-active'] })
      toast.success('Unit created successfully')
    },
    onError: () => {
      toast.error('Failed to create unit')
    },
  })
}

// **PATCH**: Update unit
export const useUpdateUnit = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<UnitCreateType>,
    Error,
    Partial<UnitCreateType>
  >({
    mutationFn: (data) => updateUnit(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['units'] })
      queryClient.invalidateQueries({ queryKey: ['units-active'] })
      queryClient.invalidateQueries({ queryKey: ['unit-detail', id] })
      toast.success('Unit updated successfully')
    },
    onError: () => {
      toast.error('Failed to update unit')
    },
  })
}

// **DELETE**: Delete unit
export const useDeleteUnit = () => {
  const queryClient = useQueryClient()
  return useMutation<ResponseSingleType<{ message: string }>, Error, number>({
    mutationFn: deleteUnit,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['units'] })
      queryClient.invalidateQueries({ queryKey: ['units-active'] })
      queryClient.removeQueries({ queryKey: ['unit-detail', id] })
      toast.success('Unit deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete unit')
    },
  })
}

// Legacy exports for backward compatibility
export const useCreateUnit = useAddUnit