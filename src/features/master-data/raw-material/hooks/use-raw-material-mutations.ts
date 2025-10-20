/**
 * Raw Material Mutation Hooks
 * Following packing list pattern for specific mutation hooks
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createMaterial, updateMaterial, deleteMaterial } from '../services'
import { RawMaterialRequestType } from '../types'
import { ResponseSingleType } from '@/shared/types/response.type'

// **POST**: Create new raw material
export const useAddMaterial = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<RawMaterialRequestType>,
    Error,
    RawMaterialRequestType
  >({
    mutationFn: createMaterial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['raw-materials'] })
      queryClient.invalidateQueries({ queryKey: ['raw-materials-active'] })
      toast.success('Raw material created successfully')
    },
    onError: () => {
      toast.error('Failed to create raw material')
    },
  })
}

// **PATCH**: Update raw material
export const useUpdateMaterial = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<RawMaterialRequestType>,
    Error,
    RawMaterialRequestType
  >({
    mutationFn: (data) => updateMaterial(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['raw-materials'] })
      queryClient.invalidateQueries({ queryKey: ['raw-materials-active'] })
      queryClient.invalidateQueries({ queryKey: ['raw-material-detail', id] })
      toast.success('Raw material updated successfully')
    },
    onError: () => {
      toast.error('Failed to update raw material')
    },
  })
}

// **DELETE**: Delete raw material
export const useDeleteMaterial = () => {
  const queryClient = useQueryClient()
  return useMutation<ResponseSingleType<{ message: string }>, Error, number>({
    mutationFn: deleteMaterial,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['raw-materials'] })
      queryClient.invalidateQueries({ queryKey: ['raw-materials-active'] })
      queryClient.removeQueries({ queryKey: ['raw-material-detail', id] })
      toast.success('Raw material deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete raw material')
    },
  })
}
