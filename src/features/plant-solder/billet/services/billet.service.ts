/**
 * Billet API Services
 * API functions for managing billet data
 */

import { api } from '../../../../shared/services'
import { filterFalsyParams } from '../../../../shared/utils'

import type {
  BilletFormData,
  BilletEditFormData,
} from '../types/billet.type'

// Billet URL
const billet_url = '/billets'

// Get all billet records with filtering and pagination
export const getAllBillets = async (params: Record<string, unknown>) => {
  try {
    const filteredParams = filterFalsyParams(params)
    const response = await api.get(billet_url, { params: filteredParams })
    return response.data
  } catch (error) {
    console.error('Error fetching billet records:', error)
    throw error
  }
}

// Get billet record detail by ID
export const getBilletById = async (id: number) => {
  try {
    const response = await api.get(`${billet_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching billet record detail:', error)
    throw error
  }
}

// Create new billet record
export const createBillet = async (data: BilletFormData) => {
  try {
    const response = await api.post(billet_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating billet record:', error)
    throw error
  }
}

// Update billet record
export const updateBillet = async (
  id: number,
  data: BilletEditFormData
) => {
  try {
    const response = await api.patch(`${billet_url}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating billet record:', error)
    throw error
  }
}

// Delete billet record
export const deleteBillet = async (id: number) => {
  try {
    const response = await api.delete(`${billet_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting billet record:', error)
    throw error
  }
}
