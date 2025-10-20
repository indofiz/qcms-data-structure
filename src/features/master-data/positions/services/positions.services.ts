/**
 * Positions API Services
 * Following category pattern for simple API functions with no pagination/filtering
 */

import { api, positions_url } from '@/shared/services/api'
import {
  PositionsRequestType,
} from '../types'

// Get all positions (no pagination, no filters)
export const getAllPositions = async () => {
  try {
    const response = await api.get(positions_url)
    return response.data
  } catch (error) {
    console.error('Error fetching positions:', error)
    throw error
  }
}

// Get position by ID
export const getPositionById = async (id: number) => {
  try {
    const response = await api.get(`${positions_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching position:', error)
    throw error
  }
}

// Create new position
export const createPosition = async (data: PositionsRequestType) => {
  try {
    const response = await api.post(positions_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating position:', error)
    throw error
  }
}

// Update position
export const updatePosition = async (id: number, data: Partial<PositionsRequestType>) => {
  try {
    const response = await api.patch(`${positions_url}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating position:', error)
    throw error
  }
}

// Delete position
export const deletePosition = async (id: number) => {
  try {
    const response = await api.delete(`${positions_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting position:', error)
    throw error
  }
}