/**
 * DMT API Services
 * API functions for managing DMT sampling data
 */

import { api, dmt_url } from '../../../shared/services'
import { filterFalsyParams } from '../../../shared/utils'

import type {
  PreparationSamplingFormData,
  ProductionReactorOneFormData,
  ProductionReactorTwoFormData,
  TransferProcessFormData,
  TakingSampleUpdateFormData,
  AnalysisSamplingFormData,
  ChangeStatusAnalysisSampleFormData,
} from '../types/dmt.type'

// Get all DMT samplings with filtering and pagination
export const getAllDmt = async (params: Record<string, unknown>) => {
  try {
    const filteredParams = filterFalsyParams(params)
    const response = await api.get(dmt_url, { params: filteredParams })
    return response.data
  } catch (error) {
    console.error('Error fetching DMT samplings:', error)
    throw error
  }
}

// Get DMT sampling detail by ID
export const getDmtById = async (id: number) => {
  try {
    const response = await api.get(`${dmt_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching DMT sampling detail:', error)
    throw error
  }
}

// Create new preparation sampling
export const createPreparationSampling = async (data: PreparationSamplingFormData) => {
  try {
    const response = await api.post(dmt_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating preparation sampling:', error)
    throw error
  }
}

// Create production reactor one record
export const createProductionReactorOne = async (
  id: number,
  data: ProductionReactorOneFormData
) => {
  try {
    const response = await api.post(`${dmt_url}/${id}/reactor-one`, data)
    return response.data
  } catch (error) {
    console.error('Error creating production reactor one record:', error)
    throw error
  }
}

// Create production reactor two record
export const createProductionReactorTwo = async (
  id: number,
  data: ProductionReactorTwoFormData
) => {
  try {
    const response = await api.post(`${dmt_url}/${id}/reactor-two`, data)
    return response.data
  } catch (error) {
    console.error('Error creating production reactor two record:', error)
    throw error
  }
}

// Create transfer process
export const createTransferProcess = async (
  id: number,
  data: TransferProcessFormData
) => {
  try {
    const response = await api.post(`${dmt_url}/${id}/transfer-process`, data)
    return response.data
  } catch (error) {
    console.error('Error creating transfer process:', error)
    throw error
  }
}

// Update taking sample information
export const updateTakingSample = async (
  id: number,
  data: TakingSampleUpdateFormData
) => {
  try {
    const response = await api.patch(`${dmt_url}/${id}/taking-sample`, data)
    return response.data
  } catch (error) {
    console.error('Error updating taking sample:', error)
    throw error
  }
}

// Create analysis sampling
export const createAnalysisSampling = async (
  id: number,
  data: AnalysisSamplingFormData
) => {
  try {
    const response = await api.post(`${dmt_url}/${id}/analysis-sampling`, data)
    return response.data
  } catch (error) {
    console.error('Error creating analysis sampling:', error)
    throw error
  }
}

// Change status analysis sample
export const changeStatusAnalysisSample = async (
  id: number,
  analysisSamplingId: number,
  data: ChangeStatusAnalysisSampleFormData
) => {
  try {
    const response = await api.post(
      `${dmt_url}/${id}/analysis-sampling/${analysisSamplingId}/change-status`,
      data
    )
    return response.data
  } catch (error) {
    console.error('Error changing analysis sample status:', error)
    throw error
  }
}

// Delete DMT sampling
export const deleteDmt = async (id: number) => {
  try {
    const response = await api.delete(`${dmt_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting DMT sampling:', error)
    throw error
  }
}
