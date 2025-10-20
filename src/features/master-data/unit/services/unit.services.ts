/**
 * Unit API Services
 * Following parameter pattern for API functions with pagination
 */

import { api, unit_url } from '@/shared/services/api'
import {
  UnitCreateType,
} from '../types'
import { filterFalsyParams } from '@/shared/utils/falsy-param'


// Get all units with filtering and pagination
export const getAllUnits = async (params: Record<string, unknown>) => {
  try {
    const filteredParams = filterFalsyParams(params)
    const response = await api.get(unit_url, { params: filteredParams })
    return response.data
  } catch (error) {
    console.error('Error fetching units:', error)
    throw error
  }
}

// Get unit by ID
export const getUnitById = async (id: number) => {
  try {
    const response = await api.get(`${unit_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching unit:', error)
    throw error
  }
}

// Create new unit
export const createUnit = async (data: UnitCreateType) => {
  try {
    const response = await api.post(unit_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating unit:', error)
    throw error
  }
}

// Update unit
export const updateUnit = async (id: number, data: Partial<UnitCreateType>) => {
  try {
    const response = await api.patch(`${unit_url}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating unit:', error)
    throw error
  }
}

// Delete unit
export const deleteUnit = async (id: number) => {
  try {
    const response = await api.delete(`${unit_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting unit:', error)
    throw error
  }
}

