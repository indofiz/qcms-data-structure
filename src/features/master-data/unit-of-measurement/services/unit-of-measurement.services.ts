/**
 * Unit of Measurement API Services
 * Following analysis parameter pattern for simple API functions with no pagination/filtering
 */

import { api, unit_of_measurements_url } from '@/shared/services/api'
import {
  UnitOfMeasurementCreateType,
} from '../types'

// Get all unit of measurements (no pagination, no filters)
export const getAllUnitOfMeasurements = async () => {
  try {
    const response = await api.get(unit_of_measurements_url)
    return response.data
  } catch (error) {
    console.error('Error fetching unit of measurements:', error)
    throw error
  }
}

// Get unit of measurement by ID
export const getUnitOfMeasurementById = async (id: number) => {
  try {
    const response = await api.get(`${unit_of_measurements_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching unit of measurement:', error)
    throw error
  }
}

// Create new unit of measurement
export const createUnitOfMeasurement = async (data: UnitOfMeasurementCreateType) => {
  try {
    const response = await api.post(unit_of_measurements_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating unit of measurement:', error)
    throw error
  }
}

// Update unit of measurement
export const updateUnitOfMeasurement = async (id: number, data: Partial<UnitOfMeasurementCreateType>) => {
  try {
    const response = await api.patch(`${unit_of_measurements_url}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating unit of measurement:', error)
    throw error
  }
}

// Delete unit of measurement
export const deleteUnitOfMeasurement = async (id: number) => {
  try {
    const response = await api.delete(`${unit_of_measurements_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting unit of measurement:', error)
    throw error
  }
}

