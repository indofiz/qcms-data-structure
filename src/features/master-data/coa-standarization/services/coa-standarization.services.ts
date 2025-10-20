/**
 * COA Standardization API Services
 * Following supplier pattern for API functions
 */

import { api, coa_standarization_url } from '@/shared/services/api'
import { CoaStandarizationRequestType } from '../types/coa-standarization.type'
import { filterFalsyParams } from '@/shared/utils/falsy-param'


// Get all COA standardizations with filtering and pagination
export const getAllCoaStandardizations = async (params: Record<string, unknown>) => {
  try {
    const filteredParams = filterFalsyParams(params)
    const response = await api.get(coa_standarization_url, { params: filteredParams })
    return response.data
  } catch (error) {
    console.error('Error fetching COA standardizations:', error)
    throw error
  }
}

// Get COA standardization by ID
export const getCoaStandardizationById = async (id: number) => {
  try {
    const response = await api.get(`${coa_standarization_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching COA standardization:', error)
    throw error
  }
}

// Create new COA standardization
export const createCoaStandardization = async (data: CoaStandarizationRequestType) => {
  try {
    const response = await api.post(coa_standarization_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating COA standardization:', error)
    throw error
  }
}

// Update COA standardization
export const updateCoaStandardization = async (id: number, data: CoaStandarizationRequestType) => {
  try {
    const response = await api.patch(`${coa_standarization_url}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating COA standardization:', error)
    throw error
  }
}

// Delete COA standardization
export const deleteCoaStandardization = async (id: number) => {
  try {
    const response = await api.delete(`${coa_standarization_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting COA standardization:', error)
    throw error
  }
}

