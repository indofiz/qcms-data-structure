/**
 * Incoming Disposition API Services
 * API functions for managing incoming disposition data
 */

import { api, incoming_disposition_url } from '../../../shared/services'
import { filterFalsyParams } from '../../../shared/utils'

import type {
  IncomingDispositionEditFormData,
  IncomingDispositionChangeDecisionFormData,
  IncomingDispositionCreateFormData,
} from '../types/incoming-disposition.type'

// Get all incoming dispositions with filtering and pagination
export const getAllIncomingDisposition = async (params: Record<string, unknown>) => {
  try {
    const filteredParams = filterFalsyParams(params)
    const response = await api.get(incoming_disposition_url, { params: filteredParams })
    return response.data
  } catch (error) {
    console.error('Error fetching incoming dispositions:', error)
    throw error
  }
}

// Get incoming disposition detail by ID
export const getIncomingDispositionById = async (id: number) => {
  try {
    const response = await api.get(`${incoming_disposition_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching incoming disposition detail:', error)
    throw error
  }
}

// Create new incoming disposition
export const createIncomingDisposition = async (data: IncomingDispositionCreateFormData) => {
  try {
    const response = await api.post(incoming_disposition_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating incoming disposition:', error)
    throw error
  }
}

// Update incoming disposition
export const updateIncomingDisposition = async (
  id: number,
  data: IncomingDispositionEditFormData
) => {
  try {
    const response = await api.patch(`${incoming_disposition_url}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating incoming disposition:', error)
    throw error
  }
}

// Change incoming disposition decision manager
export const changeIncomingDispositionDecision = async (
  id: number,
  data: IncomingDispositionChangeDecisionFormData
) => {
  try {
    const response = await api.patch(`${incoming_disposition_url}/${id}/decision`, data)
    return response.data
  } catch (error) {
    console.error('Error changing incoming disposition decision:', error)
    throw error
  }
}

// Delete incoming disposition
export const deleteIncomingDisposition = async (id: number) => {
  try {
    const response = await api.delete(`${incoming_disposition_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting incoming disposition:', error)
    throw error
  }
}
