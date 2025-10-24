/**
 * Release Order API Services
 * API functions for managing release order data
 */

import { api, release_order_url } from '../../../shared/services'
import { filterFalsyParams } from '../../../shared/utils'

import type {
  ReleaseOrderFormData,
  ReleaseOrderUpdateFormData,
  ReleaseOrderUpdateChecklistFormData,
} from '../types/release-order.type'

// Get all release orders with filtering and pagination
export const getAllReleaseOrder = async (params: Record<string, unknown>) => {
  try {
    const filteredParams = filterFalsyParams(params)
    const response = await api.get(release_order_url, { params: filteredParams })
    return response.data
  } catch (error) {
    console.error('Error fetching release orders:', error)
    throw error
  }
}

// Get release order detail by RO Number
export const getReleaseOrderByRoNumber = async (ro_number: string) => {
  try {
    const response = await api.get(`${release_order_url}/${ro_number}`)
    return response.data
  } catch (error) {
    console.error('Error fetching release order detail:', error)
    throw error
  }
}

// Get release order dropdown
export const getReleaseOrderDropdown = async () => {
  try {
    const response = await api.get(`${release_order_url}/dropdown`)
    return response.data
  } catch (error) {
    console.error('Error fetching release order dropdown:', error)
    throw error
  }
}

// Create new release order
export const createReleaseOrder = async (data: ReleaseOrderFormData) => {
  try {
    const response = await api.post(release_order_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating release order:', error)
    throw error
  }
}

// Update release order
export const updateReleaseOrder = async (
  ro_number: string,
  data: ReleaseOrderUpdateFormData
) => {
  try {
    const response = await api.patch(`${release_order_url}/${ro_number}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating release order:', error)
    throw error
  }
}

// Update release order checklist
export const updateReleaseOrderChecklist = async (
  data: ReleaseOrderUpdateChecklistFormData
) => {
  try {
    const response = await api.post(`${release_order_url}/checklist`, data)
    return response.data
  } catch (error) {
    console.error('Error updating release order checklist:', error)
    throw error
  }
}

// Delete release order
export const deleteReleaseOrder = async (ro_number: string) => {
  try {
    const response = await api.delete(`${release_order_url}/${ro_number}`)
    return response.data
  } catch (error) {
    console.error('Error deleting release order:', error)
    throw error
  }
}
