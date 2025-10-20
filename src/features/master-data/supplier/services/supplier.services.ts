/**
 * Supplier API Services
 * Following packing list pattern for specific API functions
 */

import { api, suppliers_url } from '@/shared/services/api'
import { SupplierRequestType } from '../types'
import { filterFalsyParams } from '@/shared/utils/falsy-param'


// Get all suppliers with filtering and pagination
export const getAllSuppliers = async (params: Record<string, unknown>) => {
  try {
    const filteredParams = filterFalsyParams(params)
    const response = await api.get(suppliers_url, { params: filteredParams })
    return response.data
  } catch (error) {
    console.error('Error fetching suppliers:', error)
    throw error
  }
}

// Get supplier by ID
export const getSupplierById = async (id: number) => {
  try {
    const response = await api.get(`${suppliers_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching supplier:', error)
    throw error
  }
}

// Create new supplier
export const createSupplier = async (data: SupplierRequestType) => {
  try {
    const response = await api.post(suppliers_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating supplier:', error)
    throw error
  }
}

// Update supplier
export const updateSupplier = async (id: number, data: SupplierRequestType) => {
  try {
    const response = await api.patch(`${suppliers_url}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating supplier:', error)
    throw error
  }
}

// Delete supplier
export const deleteSupplier = async (id: number) => {
  try {
    const response = await api.delete(`${suppliers_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting supplier:', error)
    throw error
  }
}

