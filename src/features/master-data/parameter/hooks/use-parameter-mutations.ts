/**
 * Parameter Mutation Hooks
 * Following supplier pattern for parameter mutation hooks
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { 
  createParameter, 
  updateParameter, 
  deleteParameter 
} from '../services'
import { 
  ParameterRequestType
} from '../types'
import { ResponseSingleType } from '@/shared/types/response.type'

// **POST**: Create new parameter
export const useAddParameter = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<ParameterRequestType>,
    Error,
    ParameterRequestType
  >({
    mutationFn: createParameter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parameters'] })
      queryClient.invalidateQueries({ queryKey: ['parameters-active'] })
      toast.success('Parameter created successfully')
    },
    onError: () => {
      toast.error('Failed to create parameter')
    },
  })
}

// **PATCH**: Update parameter
export const useUpdateParameter = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<ParameterRequestType>,
    Error,
    ParameterRequestType
  >({
    mutationFn: (data) => updateParameter(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parameters'] })
      queryClient.invalidateQueries({ queryKey: ['parameters-active'] })
      queryClient.invalidateQueries({ queryKey: ['parameter-detail', id] })
      toast.success('Parameter updated successfully')
    },
    onError: () => {
      toast.error('Failed to update parameter')
    },
  })
}

// **DELETE**: Delete parameter
export const useDeleteParameter = () => {
  const queryClient = useQueryClient()
  return useMutation<ResponseSingleType<{ message: string }>, Error, number>({
    mutationFn: deleteParameter,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['parameters'] })
      queryClient.invalidateQueries({ queryKey: ['parameters-active'] })
      queryClient.removeQueries({ queryKey: ['parameter-detail', id] })
      toast.success('Parameter deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete parameter')
    },
  })
}