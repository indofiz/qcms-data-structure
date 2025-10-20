/**
 * Plant Mutation Hooks
 * Following category/other master data pattern for mutation hooks
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createPlant, updatePlant, deletePlant } from '../services'
import { PlantCreateType, PlantType } from '../types'
import { ResponseSingleType } from '@/shared/types/response.type'

const PLANTS_QUERY_KEY = 'plants'

// **POST**: Create new plant
export const useCreatePlant = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<PlantType>,
    Error,
    PlantCreateType
  >({
    mutationFn: createPlant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLANTS_QUERY_KEY] })
      toast.success('Plant created successfully')
    },
    onError: () => {
      toast.error('Failed to create plant')
    },
  })
}

// **PATCH**: Update plant
export const useUpdatePlant = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<PlantType>,
    Error,
    Partial<PlantCreateType>
  >({
    mutationFn: (data) => updatePlant(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLANTS_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [PLANTS_QUERY_KEY, id] })
      toast.success('Plant updated successfully')
    },
    onError: () => {
      toast.error('Failed to update plant')
    },
  })
}

// **DELETE**: Delete plant
export const useDeletePlant = () => {
  const queryClient = useQueryClient()
  return useMutation<ResponseSingleType<{ message: string }>, Error, number>({
    mutationFn: deletePlant,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [PLANTS_QUERY_KEY] })
      queryClient.removeQueries({ queryKey: [PLANTS_QUERY_KEY, id] })
      toast.success('Plant deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete plant')
    },
  })
}