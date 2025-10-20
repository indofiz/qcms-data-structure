/**
 * Raw Material API Services
 * Following packing list pattern for specific API functions
 */

import { api, raw_materials_url } from '@/shared/services/api'
import { RawMaterialRequestType } from '../types'
import { filterFalsyParams } from '@/shared/utils/falsy-param'

// Get all raw materials with filtering and pagination
export const getAllMaterials = async (params: Record<string, unknown>) => {
  try {
    const filteredParams = filterFalsyParams(params)
    const response = await api.get(raw_materials_url, {
      params: filteredParams,
    })
    return response.data
  } catch (error) {
    console.error('Error fetching raw materials:', error)
    throw error
  }
}

// Get raw material by ID
export const getMaterialById = async (id: number) => {
  try {
    const response = await api.get(`${raw_materials_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching raw material:', error)
    throw error
  }
}

// Create new raw material
export const createMaterial = async (data: RawMaterialRequestType) => {
  try {
    const response = await api.post(raw_materials_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating raw material:', error)
    throw error
  }
}

// Update raw material
export const updateMaterial = async (
  id: number,
  data: RawMaterialRequestType
) => {
  try {
    const response = await api.patch(`${raw_materials_url}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating raw material:', error)
    throw error
  }
}

// Delete raw material
export const deleteMaterial = async (id: number) => {
  try {
    const response = await api.delete(`${raw_materials_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting raw material:', error)
    throw error
  }
}

// Get all raw materials (for dropdowns - no pagination)
export const getAllRawMaterials = async () => {
  try {
    const response = await api.get(raw_materials_url, {
      params: { per_page: 1000 }, // Get a large number to include all materials
    })
    return response.data
  } catch (error) {
    console.error('Error fetching all raw materials:', error)
    throw error
  }
}
