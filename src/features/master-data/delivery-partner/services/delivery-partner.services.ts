/**
 * Delivery Partner API Services
 */

import { api, delivery_partners_url } from '@/shared/services/api'
import { DeliveryPartnerRequestType } from '../types'
import { filterFalsyParams } from '@/shared/utils/falsy-param'

// Get all delivery partners with filtering and pagination
export const getAllDeliveryPartners = async (
  params: Record<string, unknown>
) => {
  try {
    const filteredParams = filterFalsyParams(params)
    const response = await api.get(delivery_partners_url, {
      params: filteredParams,
    })
    return response.data
  } catch (error) {
    console.error('Error fetching delivery partners:', error)
    throw error
  }
}

// Get delivery partner by ID
export const getDeliveryPartnerById = async (id: number) => {
  try {
    const response = await api.get(`${delivery_partners_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching delivery partner:', error)
    throw error
  }
}

// Create new delivery partner
export const createDeliveryPartner = async (
  data: DeliveryPartnerRequestType
) => {
  try {
    const response = await api.post(delivery_partners_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating delivery partner:', error)
    throw error
  }
}

// Update delivery partner
export const updateDeliveryPartner = async (
  id: number,
  data: DeliveryPartnerRequestType
) => {
  try {
    const response = await api.patch(`${delivery_partners_url}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating delivery partner:', error)
    throw error
  }
}

// Delete delivery partner
export const deleteDeliveryPartner = async (id: number) => {
  try {
    const response = await api.delete(`${delivery_partners_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting delivery partner:', error)
    throw error
  }
}
