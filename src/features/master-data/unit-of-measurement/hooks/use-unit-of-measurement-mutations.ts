import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createUnitOfMeasurement, updateUnitOfMeasurement, deleteUnitOfMeasurement } from '../services'
import { UnitOfMeasurementCreateType } from '../types'

const UNIT_OF_MEASUREMENTS_QUERY_KEY = 'unit-of-measurements'

export const useCreateUnitOfMeasurement = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUnitOfMeasurement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UNIT_OF_MEASUREMENTS_QUERY_KEY] })
      toast.success('Unit of measurement created successfully')
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error && 'response' in error 
        ? ((error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to create unit of measurement')
        : 'Failed to create unit of measurement'
      toast.error(errorMessage)
    },
  })
}

export const useUpdateUnitOfMeasurement = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UnitOfMeasurementCreateType }) =>
      updateUnitOfMeasurement(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UNIT_OF_MEASUREMENTS_QUERY_KEY] })
      toast.success('Unit of measurement updated successfully')
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error && 'response' in error 
        ? ((error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to update unit of measurement')
        : 'Failed to update unit of measurement'
      toast.error(errorMessage)
    },
  })
}

export const useDeleteUnitOfMeasurement = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUnitOfMeasurement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UNIT_OF_MEASUREMENTS_QUERY_KEY] })
      toast.success('Unit of measurement deleted successfully')
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error && 'response' in error 
        ? ((error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to delete unit of measurement')
        : 'Failed to delete unit of measurement'
      toast.error(errorMessage)
    },
  })
}