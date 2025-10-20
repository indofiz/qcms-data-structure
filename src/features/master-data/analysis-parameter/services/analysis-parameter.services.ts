/**
 * Analysis Parameter API Services
 * Following supplier pattern for simple API functions with no pagination/filtering
 */

import { api, analysis_parameters_url } from '@/shared/services/api'
import {
  AnalysisParameterCreateType,
} from '../types'

// Get all analysis parameters (no pagination, no filters)
export const getAllAnalysisParameters = async () => {
  try {
    const response = await api.get(analysis_parameters_url)
    return response.data
  } catch (error) {
    console.error('Error fetching analysis parameters:', error)
    throw error
  }
}

// Get analysis parameter by ID
export const getAnalysisParameterById = async (id: number) => {
  try {
    const response = await api.get(`${analysis_parameters_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching analysis parameter:', error)
    throw error
  }
}

// Create new analysis parameter
export const createAnalysisParameter = async (data: AnalysisParameterCreateType) => {
  try {
    const response = await api.post(analysis_parameters_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating analysis parameter:', error)
    throw error
  }
}

// Update analysis parameter
export const updateAnalysisParameter = async (id: number, data: Partial<AnalysisParameterCreateType>) => {
  try {
    const response = await api.patch(`${analysis_parameters_url}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating analysis parameter:', error)
    throw error
  }
}

// Delete analysis parameter
export const deleteAnalysisParameter = async (id: number) => {
  try {
    const response = await api.delete(`${analysis_parameters_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting analysis parameter:', error)
    throw error
  }
}

