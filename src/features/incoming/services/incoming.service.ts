/**
 * Incoming API Services
 * API functions for managing incoming material data
 */

import { api, incoming_url } from '../../../shared/services'
import { filterFalsyParams } from '../../../shared/utils'

import type {
  IncomingEditFormData,
  IncomingChangeStatusFormData,
} from '../types/incoming.type'

// Get all incoming materials with filtering and pagination
export const getAllIncoming = async (params: Record<string, unknown>) => {
  try {
    const filteredParams = filterFalsyParams(params)
    const response = await api.get(incoming_url, { params: filteredParams })
    return response.data
  } catch (error) {
    console.error('Error fetching incoming materials:', error)
    throw error
  }
}

// Get incoming material detail by ID
export const getIncomingById = async (id: number) => {
  try {
    const response = await api.get(`${incoming_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching incoming material detail:', error)
    throw error
  }
}

// Create new incoming material with FormData
export const createIncoming = async (data: FormData) => {
  try {
    const response = await api.post(incoming_url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error creating incoming material:', error)
    throw error
  }
}

// Update incoming material
export const updateIncoming = async (
  id: number,
  data: IncomingEditFormData
) => {
  try {
    const response = await api.patch(`${incoming_url}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating incoming material:', error)
    throw error
  }
}

// Change incoming material status
export const changeIncomingStatus = async (
  id: number,
  data: IncomingChangeStatusFormData
) => {
  try {
    const response = await api.patch(`${incoming_url}/${id}/status`, data)
    return response.data
  } catch (error) {
    console.error('Error changing incoming material status:', error)
    throw error
  }
}

// Delete incoming material
export const deleteIncoming = async (id: number) => {
  try {
    const response = await api.delete(`${incoming_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting incoming material:', error)
    throw error
  }
}
