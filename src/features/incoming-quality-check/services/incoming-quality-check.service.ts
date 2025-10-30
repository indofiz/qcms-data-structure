/**
 * Incoming Quality Check API Services
 * API functions for managing incoming quality check data
 */

import { api, incoming_quality_check_url } from '../../../shared/services'
import { filterFalsyParams } from '../../../shared/utils'

// Get all incoming quality checks with filtering and pagination
export const getAllIncomingQualityCheck = async (params: Record<string, unknown>) => {
  try {
    const filteredParams = filterFalsyParams(params)
    const response = await api.get(incoming_quality_check_url, { params: filteredParams })
    return response.data
  } catch (error) {
    console.error('Error fetching incoming quality checks:', error)
    throw error
  }
}

// Get incoming quality check detail by ID
export const getIncomingQualityCheckById = async (id: number) => {
  try {
    const response = await api.get(`${incoming_quality_check_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching incoming quality check detail:', error)
    throw error
  }
}

// Create new incoming quality check with FormData
export const createIncomingQualityCheck = async (data: FormData) => {
  try {
    const response = await api.post(incoming_quality_check_url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error creating incoming quality check:', error)
    throw error
  }
}

// Update incoming quality check
export const updateIncomingQualityCheck = async (
  id: number,
  data: FormData
) => {
  try {
    const response = await api.patch(`${incoming_quality_check_url}/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error updating incoming quality check:', error)
    throw error
  }
}

// Delete incoming quality check
export const deleteIncomingQualityCheck = async (id: number) => {
  try {
    const response = await api.delete(`${incoming_quality_check_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting incoming quality check:', error)
    throw error
  }
}
