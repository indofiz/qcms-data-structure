/**
 * API Configuration and URL Constants
 * Centralized API client and endpoint definitions
 */

import axios from 'axios'

// Create axios instance with default configuration
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API URL Constants
export const suppliers_url = '/suppliers'
export const categories_url = '/categories'
export const departments_url = '/departments'
export const parameters_url = '/parameters'
export const plants_url = '/plants'
export const products_url = '/products'
export const raw_materials_url = '/raw-materials'
export const unit_url = '/units'
export const unit_of_measurement_url = '/unit-of-measurements'
export const delivery_partner_url = '/delivery-partners'
export const positions_url = '/positions'
export const roles_url = '/roles'
export const analysis_parameter_url = '/analysis-parameters'
export const coa_standardization_url = '/coa-standardizations'
export const incoming_url = '/incoming'
export const incoming_check_url = '/incoming-check'
export const packing_list_url = '/packing-lists'
export const delivery_order_url = '/delivery-orders'
export const ordering_goods_url = '/ordering-goods'
export const release_order_url = '/release-orders'
export const dmt_url = '/dmt'
