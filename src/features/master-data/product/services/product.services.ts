/**
 * Product API Services
 * Following supplier pattern for specific API functions
 */

import { api, products_url } from '@/shared/services/api'
import { ProductRequestType } from '../types'
import { filterFalsyParams } from '@/shared/utils/falsy-param'

// Get all products with filtering and pagination
export const getAllProducts = async (params: Record<string, unknown>) => {
  try {
    const filteredParams = filterFalsyParams(params)
    const response = await api.get(products_url, { params: filteredParams })
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

// Get product by ID
export const getProductById = async (id: number) => {
  try {
    const response = await api.get(`${products_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

// Create new product
export const createProduct = async (data: ProductRequestType) => {
  try {
    const response = await api.post(products_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

// Update product
export const updateProduct = async (id: number, data: ProductRequestType) => {
  try {
    const response = await api.patch(`${products_url}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

// Delete product
export const deleteProduct = async (id: number) => {
  try {
    const response = await api.delete(`${products_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}
