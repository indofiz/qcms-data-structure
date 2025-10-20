/**
 * Incoming API Services
 * API functions for managing incoming material data
 */

import { api, incoming_url } from '@/shared/services/api'
import { filterFalsyParams } from '@/shared/utils/falsy-param'

import type {
  IncomingFormData,
  IncomingApproveFormData,
  IncomingEditFormData,
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

// Create new incoming material
export const createIncoming = async (data: IncomingFormData) => {
  try {
    const response = await api.post(incoming_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating incoming material:', error)
    throw error
  }
}

// Approve/Reject incoming material
export const approveIncoming = async (
  id: number,
  data: IncomingApproveFormData
) => {
  try {
    const response = await api.patch(`${incoming_url}/${id}/approve`, data)
    return response.data
  } catch (error) {
    console.error('Error approving/rejecting incoming material:', error)
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
