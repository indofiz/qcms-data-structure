/**
 * Ordering Good API Services
 * API functions for managing ordering good data
 */

import { api, ordering_goods_url } from '../../../shared/services'
import { filterFalsyParams } from '../../../shared/utils'

import type {
  OrderingGoodFormData,
  OrderingGoodUpdateFormData,
} from '../types/ordering-good.type'

// Get all ordering goods with filtering and pagination
export const getAllOrderingGood = async (params: Record<string, unknown>) => {
  try {
    const filteredParams = filterFalsyParams(params)
    const response = await api.get(ordering_goods_url, { params: filteredParams })
    return response.data
  } catch (error) {
    console.error('Error fetching ordering goods:', error)
    throw error
  }
}

// Get ordering good detail by ID
export const getOrderingGoodById = async (id: number) => {
  try {
    const response = await api.get(`${ordering_goods_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching ordering good detail:', error)
    throw error
  }
}

// Create new ordering good
export const createOrderingGood = async (data: OrderingGoodFormData) => {
  try {
    const response = await api.post(ordering_goods_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating ordering good:', error)
    throw error
  }
}

// Update ordering good
export const updateOrderingGood = async (
  id: number,
  data: OrderingGoodUpdateFormData
) => {
  try {
    const response = await api.patch(`${ordering_goods_url}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating ordering good:', error)
    throw error
  }
}

// Delete ordering good
export const deleteOrderingGood = async (id: number) => {
  try {
    const response = await api.delete(`${ordering_goods_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting ordering good:', error)
    throw error
  }
}
