/**
 * DMT Mutation Hooks
 * React Query mutation hooks for DMT sampling operations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createPreparationSampling,
  createProductionReactorOne,
  createProductionReactorTwo,
  createTransferProcess,
  updateTakingSample,
  createAnalysisSampling,
  changeStatusAnalysisSample,
} from '../services'
import type {
  PreparationSamplingFormData,
  ProductionReactorOneFormData,
  ProductionReactorTwoFormData,
  TransferProcessFormData,
  TakingSampleUpdateFormData,
  AnalysisSamplingFormData,
  ChangeStatusAnalysisSampleFormData,
} from '../types/dmt.type'
import type { ResponseSingleType } from '../../../shared/types/response.type'
import { DMT_QUERY_KEY } from './dmt-key'

// **POST**: Create new preparation sampling
export const useAddPreparationSampling = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<PreparationSamplingFormData>,
    Error,
    PreparationSamplingFormData
  >({
    mutationFn: createPreparationSampling,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DMT_QUERY_KEY] })
      toast.success('Preparation sampling created successfully')
    },
    onError: () => {
      toast.error('Failed to create preparation sampling')
    },
  })
}

// **POST**: Create production reactor one record
export const useAddProductionReactorOne = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<ProductionReactorOneFormData>,
    Error,
    ProductionReactorOneFormData
  >({
    mutationFn: (data) => createProductionReactorOne(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DMT_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [DMT_QUERY_KEY,'detail', id] })
      toast.success('Production reactor one record created successfully')
    },
    onError: () => {
      toast.error('Failed to create production reactor one record')
    },
  })
}

// **POST**: Create production reactor two record
export const useAddProductionReactorTwo = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<ProductionReactorTwoFormData>,
    Error,
    ProductionReactorTwoFormData
  >({
    mutationFn: (data) => createProductionReactorTwo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DMT_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [DMT_QUERY_KEY,'detail', id] })
      toast.success('Production reactor two record created successfully')
    },
    onError: () => {
      toast.error('Failed to create production reactor two record')
    },
  })
}

// **POST**: Create transfer process
export const useAddTransferProcess = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<TransferProcessFormData>,
    Error,
    TransferProcessFormData
  >({
    mutationFn: (data) => createTransferProcess(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DMT_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [DMT_QUERY_KEY,'detail', id] })
      toast.success('Transfer process created successfully')
    },
    onError: () => {
      toast.error('Failed to create transfer process')
    },
  })
}

// **PATCH**: Update taking sample information
export const useUpdateTakingSample = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<TakingSampleUpdateFormData>,
    Error,
    TakingSampleUpdateFormData
  >({
    mutationFn: (data) => updateTakingSample(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DMT_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [DMT_QUERY_KEY,'detail', id] })
      toast.success('Taking sample updated successfully')
    },
    onError: () => {
      toast.error('Failed to update taking sample')
    },
  })
}

// **POST**: Create analysis sampling
export const useAddAnalysisSampling = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<AnalysisSamplingFormData>,
    Error,
    AnalysisSamplingFormData
  >({
    mutationFn: (data) => createAnalysisSampling(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DMT_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [DMT_QUERY_KEY,'detail', id] })
      toast.success('Analysis sampling created successfully')
    },
    onError: () => {
      toast.error('Failed to create analysis sampling')
    },
  })
}

// **POST**: Change status analysis sample
export const useChangeStatusAnalysisSample = (id: number, analysisSamplingId: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    ResponseSingleType<ChangeStatusAnalysisSampleFormData>,
    Error,
    ChangeStatusAnalysisSampleFormData
  >({
    mutationFn: (data) => changeStatusAnalysisSample(id, analysisSamplingId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DMT_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [DMT_QUERY_KEY,'detail', id] })
      toast.success('Analysis sample status updated successfully')
    },
    onError: () => {
      toast.error('Failed to update analysis sample status')
    },
  })
}
