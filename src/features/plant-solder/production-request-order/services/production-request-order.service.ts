/**
 * Production Request Order API Services
 * API functions for managing production request order data
 */

import { api } from '../../../../shared/services'
import { filterFalsyParams } from '../../../../shared/utils'

import type {
  ProductionRequestOrderFormData,
  ProductionStatusUpdateFormData,
  ProductionQCResultUpdateFormData,
  ProductionRequestOrderEditFormData,
} from '../types/production-request-order.type'

// Production Request Order URL
const production_request_order_url = '/production-request-orders'

// Get all production request orders with filtering and pagination
export const getAllProductionRequestOrders = async (params: Record<string, unknown>) => {
  try {
    const filteredParams = filterFalsyParams(params)
    const response = await api.get(production_request_order_url, { params: filteredParams })
    return response.data
  } catch (error) {
    console.error('Error fetching production request orders:', error)
    throw error
  }
}

// Get production request order detail by ID
export const getProductionRequestOrderById = async (id: number) => {
  try {
    const response = await api.get(`${production_request_order_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching production request order detail:', error)
    throw error
  }
}

// Create new production request order
export const createProductionRequestOrder = async (data: ProductionRequestOrderFormData) => {
  try {
    const response = await api.post(production_request_order_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating production request order:', error)
    throw error
  }
}

// Update production status
export const updateProductionStatus = async (
  id: number,
  data: ProductionStatusUpdateFormData
) => {
  try {
    const response = await api.patch(`${production_request_order_url}/${id}/status`, data)
    return response.data
  } catch (error) {
    console.error('Error updating production status:', error)
    throw error
  }
}

// Update QC result
export const updateQCResult = async (
  id: number,
  data: ProductionQCResultUpdateFormData
) => {
  try {
    const response = await api.patch(`${production_request_order_url}/${id}/qc-result`, data)
    return response.data
  } catch (error) {
    console.error('Error updating QC result:', error)
    throw error
  }
}

// Update production request order
export const updateProductionRequestOrder = async (
  id: number,
  data: ProductionRequestOrderEditFormData
) => {
  try {
    const response = await api.patch(`${production_request_order_url}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating production request order:', error)
    throw error
  }
}

// Delete production request order
export const deleteProductionRequestOrder = async (id: number) => {
  try {
    const response = await api.delete(`${production_request_order_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting production request order:', error)
    throw error
  }
}