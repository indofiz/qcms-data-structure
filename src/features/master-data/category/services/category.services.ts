/**
 * Category API Services
 * Following analysis parameter pattern for simple API functions with no pagination/filtering
 */

import { api, categories_url } from '@/shared/services/api'
import {
  CategoryCreateType,
} from '../types'

// Get all categories (no pagination, no filters)
export const getAllCategories = async () => {
  try {
    const response = await api.get(categories_url)
    return response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

// Get category by ID
export const getCategoryById = async (id: number) => {
  try {
    const response = await api.get(`${categories_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching category:', error)
    throw error
  }
}

// Create new category
export const createCategory = async (data: CategoryCreateType) => {
  try {
    const response = await api.post(categories_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating category:', error)
    throw error
  }
}

// Update category
export const updateCategory = async (id: number, data: Partial<CategoryCreateType>) => {
  try {
    const response = await api.patch(`${categories_url}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating category:', error)
    throw error
  }
}

// Delete category
export const deleteCategory = async (id: number) => {
  try {
    const response = await api.delete(`${categories_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting category:', error)
    throw error
  }
}

