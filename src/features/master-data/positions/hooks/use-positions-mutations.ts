/**
 * Positions Mutation Hooks
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createPosition,
  updatePosition,
  deletePosition,
} from '../services'
import { PositionsRequestType } from '../types'

// Create position mutation
export const useCreatePosition = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PositionsRequestType) => createPosition(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['positions'] })
      toast.success('Position created successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to create position: ${error.message}`)
    },
  })
}

// Update position mutation
export const useUpdatePosition = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<PositionsRequestType> }) =>
      updatePosition(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['positions'] })
      queryClient.invalidateQueries({ queryKey: ['position-detail'] })
      toast.success('Position updated successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to update position: ${error.message}`)
    },
  })
}

// Delete position mutation
export const useDeletePosition = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deletePosition(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['positions'] })
      toast.success('Position deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete position: ${error.message}`)
    },
  })
}