/**
 * Incoming Check API Services
 * API functions for managing incoming check data
 */

import { api, incoming_check_url } from '../../../shared/services'
import { filterFalsyParams } from '../../../shared/utils'

import type {
  IncomingCheckFormData,
} from '../types/incoming-check.type'

// Get all incoming checks with filtering and pagination
export const getAllIncomingCheck = async (params: Record<string, unknown>) => {
  try {
    const filteredParams = filterFalsyParams(params)
    const response = await api.get(incoming_check_url, { params: filteredParams })
    return response.data
  } catch (error) {
    console.error('Error fetching incoming checks:', error)
    throw error
  }
}

// Get incoming check detail by ID
export const getIncomingCheckById = async (id: number) => {
  try {
    const response = await api.get(`${incoming_check_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching incoming check detail:', error)
    throw error
  }
}

// Create new incoming check
export const createIncomingCheck = async (data: IncomingCheckFormData) => {
  try {
    // Since this includes file upload (coa_photo), we need to send as FormData
    const formData = new FormData()

    formData.append('incoming_id', data.incoming_id)
    formData.append('lot_number', data.lot_number)
    formData.append('checking_qty', data.checking_qty)
    formData.append('checking_date', data.checking_date)

    if (data.coa_photo instanceof File) {
      formData.append('coa_photo', data.coa_photo)
    }

    if (data.description) {
      formData.append('description', data.description)
    }

    if (data.created_by) {
      formData.append('created_by', data.created_by)
    }

    const response = await api.post(incoming_check_url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error creating incoming check:', error)
    throw error
  }
}

// Update incoming check
export const updateIncomingCheck = async (
  id: number,
  data: IncomingCheckFormData
) => {
  try {
    // Since this includes file upload (coa_photo), we need to send as FormData
    const formData = new FormData()

    formData.append('incoming_id', data.incoming_id)
    formData.append('lot_number', data.lot_number)
    formData.append('checking_qty', data.checking_qty)
    formData.append('checking_date', data.checking_date)

    if (data.coa_photo instanceof File) {
      formData.append('coa_photo', data.coa_photo)
    } else if (typeof data.coa_photo === 'string') {
      // If it's a string (URL), it means we're keeping the existing photo
      formData.append('coa_photo', data.coa_photo)
    }

    if (data.description) {
      formData.append('description', data.description)
    }

    if (data.created_by) {
      formData.append('created_by', data.created_by)
    }

    const response = await api.patch(`${incoming_check_url}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error updating incoming check:', error)
    throw error
  }
}
