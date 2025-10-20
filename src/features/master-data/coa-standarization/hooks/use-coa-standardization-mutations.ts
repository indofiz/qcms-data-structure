/**
 * COA Standardization Mutation Hooks
 * Following supplier pattern for mutation hooks
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createCoaStandardization, updateCoaStandardization, deleteCoaStandardization } from '../services/coa-standarization.services'
import { CoaStandarizationRequestType } from '../types/coa-standarization.type'
import { ResponseSingleType } from '@/shared/types/response.type'

// **POST**: Create new COA standardization
export const useAddCoaStandardization = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<CoaStandarizationRequestType>,
    Error,
    CoaStandarizationRequestType
  >({
    mutationFn: createCoaStandardization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coa-standardizations'] })
      queryClient.invalidateQueries({ queryKey: ['coa-standardizations-active'] })
      toast.success('COA standardization created successfully')
    },
    onError: () => {
      toast.error('Failed to create COA standardization')
    },
  })
}

// **PATCH**: Update COA standardization
export const useUpdateCoaStandardization = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<CoaStandarizationRequestType>,
    Error,
    CoaStandarizationRequestType
  >({
    mutationFn: (data) => updateCoaStandardization(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coa-standardizations'] })
      queryClient.invalidateQueries({ queryKey: ['coa-standardizations-active'] })
      queryClient.invalidateQueries({ queryKey: ['coa-standardization-detail', id] })
      toast.success('COA standardization updated successfully')
    },
    onError: () => {
      toast.error('Failed to update COA standardization')
    },
  })
}

// **DELETE**: Delete COA standardization
export const useDeleteCoaStandardization = () => {
  const queryClient = useQueryClient()
  return useMutation<ResponseSingleType<{ message: string }>, Error, number>({
    mutationFn: deleteCoaStandardization,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['coa-standardizations'] })
      queryClient.invalidateQueries({ queryKey: ['coa-standardizations-active'] })
      queryClient.removeQueries({ queryKey: ['coa-standardization-detail', id] })
      toast.success('COA standardization deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete COA standardization')
    },
  })
}