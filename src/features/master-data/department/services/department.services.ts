/**
 * Department API Services
 * Following analysis-parameter pattern for simple API functions with no pagination/filtering
 */

import { api, departments_url } from '@/shared/services/api'
import {
  DepartmentCreateType,
} from '../types'

// Get all departments (no pagination, no filters)
export const getAllDepartments = async () => {
  try {
    const response = await api.get(departments_url)
    return response.data
  } catch (error) {
    console.error('Error fetching departments:', error)
    throw error
  }
}

// Get department by ID
export const getDepartmentById = async (id: number) => {
  try {
    const response = await api.get(`${departments_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching department:', error)
    throw error
  }
}

// Create new department
export const createDepartment = async (data: DepartmentCreateType) => {
  try {
    const response = await api.post(departments_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating department:', error)
    throw error
  }
}

// Update department
export const updateDepartment = async (id: number, data: Partial<DepartmentCreateType>) => {
  try {
    const response = await api.patch(`${departments_url}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating department:', error)
    throw error
  }
}

// Delete department
export const deleteDepartment = async (id: number) => {
  try {
    const response = await api.delete(`${departments_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting department:', error)
    throw error
  }
}

