/**
 * Melting API Services
 * API functions for managing melting data
 */

import { api } from '../../../../shared/services'
import { filterFalsyParams } from '../../../../shared/utils'

import type {
  MeltingFormData,
  MeltingBulkFormData,
  MeltingEditFormData,
} from '../types/melting.type'

// Melting URL
const melting_url = '/meltings'

// Get all melting records with filtering and pagination
export const getAllMeltings = async (params: Record<string, unknown>) => {
  try {
    const filteredParams = filterFalsyParams(params)
    const response = await api.get(melting_url, { params: filteredParams })
    return response.data
  } catch (error) {
    console.error('Error fetching melting records:', error)
    throw error
  }
}

// Get melting record detail by ID
export const getMeltingById = async (id: number) => {
  try {
    const response = await api.get(`${melting_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching melting record detail:', error)
    throw error
  }
}

// Create new melting record
export const createMelting = async (data: MeltingFormData) => {
  try {
    const response = await api.post(melting_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating melting record:', error)
    throw error
  }
}

// Create bulk melting records
export const createBulkMelting = async (data: MeltingBulkFormData) => {
  try {
    const response = await api.post(`${melting_url}/bulk`, data)
    return response.data
  } catch (error) {
    console.error('Error creating bulk melting records:', error)
    throw error
  }
}

// Update melting record
export const updateMelting = async (
  id: number,
  data: MeltingEditFormData
) => {
  try {
    const response = await api.patch(`${melting_url}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating melting record:', error)
    throw error
  }
}

// Delete melting record
export const deleteMelting = async (id: number) => {
  try {
    const response = await api.delete(`${melting_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting melting record:', error)
    throw error
  }
}
