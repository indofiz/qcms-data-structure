/**
 * Parameter API Services
 * Following supplier pattern for API functions with pagination
 */

import { api, parameter_url } from '@/shared/services/api'
import {
  ParameterRequestType,
} from '../types'
import { filterFalsyParams } from '@/shared/utils/falsy-param'


// Get all parameters with filtering and pagination
export const getAllParameters = async (params: Record<string, unknown>) => {
  try {
    const filteredParams = filterFalsyParams(params)
    const response = await api.get(parameter_url, { params: filteredParams })
    return response.data
  } catch (error) {
    console.error('Error fetching parameters:', error)
    throw error
  }
}

// Get parameter by ID
export const getParameterById = async (id: number) => {
  try {
    const response = await api.get(`${parameter_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching parameter:', error)
    throw error
  }
}

// Create new parameter
export const createParameter = async (data: ParameterRequestType) => {
  try {
    const response = await api.post(parameter_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating parameter:', error)
    throw error
  }
}

// Update parameter
export const updateParameter = async (id: number, data: ParameterRequestType) => {
  try {
    const response = await api.patch(`${parameter_url}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating parameter:', error)
    throw error
  }
}

// Delete parameter
export const deleteParameter = async (id: number) => {
  try {
    const response = await api.delete(`${parameter_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting parameter:', error)
    throw error
  }
}

