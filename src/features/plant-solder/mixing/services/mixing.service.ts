/**
 * Mixing API Services
 * API functions for managing mixing data
 */

import { api } from '../../../../shared/services'
import { filterFalsyParams } from '../../../../shared/utils'

import type {
  MixingFormData,
  MixingBulkFormData,
  MixingEditFormData,
} from '../types/mixing.type'

// Mixing URL
const mixing_url = '/mixings'

// Get all mixing records with filtering and pagination
export const getAllMixings = async (params: Record<string, unknown>) => {
  try {
    const filteredParams = filterFalsyParams(params)
    const response = await api.get(mixing_url, { params: filteredParams })
    return response.data
  } catch (error) {
    console.error('Error fetching mixing records:', error)
    throw error
  }
}

// Get mixing record detail by ID
export const getMixingById = async (id: number) => {
  try {
    const response = await api.get(`${mixing_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching mixing record detail:', error)
    throw error
  }
}

// Create new mixing record
export const createMixing = async (data: MixingFormData) => {
  try {
    const response = await api.post(mixing_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating mixing record:', error)
    throw error
  }
}

// Create bulk mixing records
export const createBulkMixing = async (data: MixingBulkFormData) => {
  try {
    const response = await api.post(`${mixing_url}/bulk`, data)
    return response.data
  } catch (error) {
    console.error('Error creating bulk mixing records:', error)
    throw error
  }
}

// Update mixing record
export const updateMixing = async (
  id: number,
  data: MixingEditFormData
) => {
  try {
    const response = await api.patch(`${mixing_url}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating mixing record:', error)
    throw error
  }
}

// Delete mixing record
export const deleteMixing = async (id: number) => {
  try {
    const response = await api.delete(`${mixing_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting mixing record:', error)
    throw error
  }
}
