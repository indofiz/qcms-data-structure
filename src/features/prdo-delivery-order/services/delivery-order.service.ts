/**
 * Delivery Order API Services
 * API functions for managing delivery order data
 */

import { api, delivery_order_url } from '../../../shared/services'
import { filterFalsyParams } from '../../../shared/utils'

import type {
  DeliveryOrderFormData,
  DeliveryOrderUpdateFormData,
} from '../types/delivery-order.type'

// Get all delivery orders with filtering and pagination
export const getAllDeliveryOrder = async (params: Record<string, unknown>) => {
  try {
    const filteredParams = filterFalsyParams(params)
    const response = await api.get(delivery_order_url, { params: filteredParams })
    return response.data
  } catch (error) {
    console.error('Error fetching delivery orders:', error)
    throw error
  }
}

// Get delivery order detail by DO Number
export const getDeliveryOrderByDoNumber = async (do_number: string) => {
  try {
    const response = await api.get(`${delivery_order_url}/${do_number}`)
    return response.data
  } catch (error) {
    console.error('Error fetching delivery order detail:', error)
    throw error
  }
}

// Create new delivery order
export const createDeliveryOrder = async (data: DeliveryOrderFormData) => {
  try {
    const response = await api.post(delivery_order_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating delivery order:', error)
    throw error
  }
}

// Update delivery order
export const updateDeliveryOrder = async (
  do_number: string,
  data: DeliveryOrderUpdateFormData
) => {
  try {
    const response = await api.patch(`${delivery_order_url}/${do_number}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating delivery order:', error)
    throw error
  }
}

// Delete delivery order
export const deleteDeliveryOrder = async (do_number: string) => {
  try {
    const response = await api.delete(`${delivery_order_url}/${do_number}`)
    return response.data
  } catch (error) {
    console.error('Error deleting delivery order:', error)
    throw error
  }
}
