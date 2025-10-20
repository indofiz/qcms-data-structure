import { api, plant_url } from '@/shared/services/api'
import { PlantCreateType, PlantType } from '../types'
import {
  ResponseListNoPagingType,
  ResponseSingleType,
} from '@/shared/types/response.type'

// Get all plants (no pagination, no filters)
export const getAllPlants = async (): Promise<ResponseListNoPagingType<PlantType[]>> => {
  try {
    const response = await api.get(plant_url)
    return response.data
  } catch (error) {
    console.error('Error fetching plants:', error)
    throw error
  }
}

// Get plant by ID
export const getPlantById = async (id: number): Promise<ResponseSingleType<PlantType>> => {
  try {
    const response = await api.get(`${plant_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching plant:', error)
    throw error
  }
}

// Create new plant
export const createPlant = async (data: PlantCreateType): Promise<ResponseSingleType<PlantType>> => {
  try {
    const response = await api.post(plant_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating plant:', error)
    throw error
  }
}

// Update plant
export const updatePlant = async (
  id: number,
  data: Partial<PlantCreateType>
): Promise<ResponseSingleType<PlantType>> => {
  try {
    const response = await api.patch(`${plant_url}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating plant:', error)
    throw error
  }
}

// Delete plant
export const deletePlant = async (id: number): Promise<ResponseSingleType<{ message: string }>> => {
  try {
    const response = await api.delete(`${plant_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting plant:', error)
    throw error
  }
}

