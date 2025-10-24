/**
 * Packing List API Services
 * API functions for managing packing list data
 */

import { api, packing_list_url } from '../../../shared/services'
import { filterFalsyParams } from '../../../shared/utils'

import type {
  PackingListFormData,
  PackingListBulkFormData,
  PackingListUpdateFormData,
  PackingListUpdateStatusQCFormData,
  PackingListUpdateStatusPLFormData,
} from '../types/packing-list.type'

// Get all packing lists with filtering and pagination
export const getAllPackingList = async (params: Record<string, unknown>) => {
  try {
    const filteredParams = filterFalsyParams(params)
    const response = await api.get(packing_list_url, { params: filteredParams })
    return response.data
  } catch (error) {
    console.error('Error fetching packing lists:', error)
    throw error
  }
}

// Get packing list detail by PL Number
export const getPackingListByPlNumber = async (pl_number: string) => {
  try {
    const response = await api.get(`${packing_list_url}/${pl_number}`)
    return response.data
  } catch (error) {
    console.error('Error fetching packing list detail:', error)
    throw error
  }
}

// Get packing list dropdown
export const getPackingListDropdown = async () => {
  try {
    const response = await api.get(`${packing_list_url}/dropdown`)
    return response.data
  } catch (error) {
    console.error('Error fetching packing list dropdown:', error)
    throw error
  }
}

// Create new packing list
export const createPackingList = async (data: PackingListFormData) => {
  try {
    const response = await api.post(packing_list_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating packing list:', error)
    throw error
  }
}

// Create bulk packing list with ordering goods
export const createBulkPackingList = async (data: PackingListBulkFormData) => {
  try {
    const response = await api.post(`${packing_list_url}/bulk`, data)
    return response.data
  } catch (error) {
    console.error('Error creating bulk packing list:', error)
    throw error
  }
}

// Update packing list
export const updatePackingList = async (
  pl_number: string,
  data: PackingListUpdateFormData
) => {
  try {
    const response = await api.patch(`${packing_list_url}/${pl_number}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating packing list:', error)
    throw error
  }
}

// Update packing list status QC
export const updatePackingListStatusQC = async (
  data: PackingListUpdateStatusQCFormData
) => {
  try {
    const response = await api.post(`${packing_list_url}/status-qc`, data)
    return response.data
  } catch (error) {
    console.error('Error updating packing list status QC:', error)
    throw error
  }
}

// Update packing list status PL
export const updatePackingListStatusPL = async (
  data: PackingListUpdateStatusPLFormData
) => {
  try {
    const response = await api.post(`${packing_list_url}/status-pl`, data)
    return response.data
  } catch (error) {
    console.error('Error updating packing list status PL:', error)
    throw error
  }
}

// Delete packing list
export const deletePackingList = async (pl_number: string) => {
  try {
    const response = await api.delete(`${packing_list_url}/${pl_number}`)
    return response.data
  } catch (error) {
    console.error('Error deleting packing list:', error)
    throw error
  }
}
