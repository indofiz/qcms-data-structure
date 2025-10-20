/**
 * Roles API Services
 * Following category pattern for simple API functions with no pagination/filtering
 */

import { api, roles_url } from '@/shared/services/api'
import {
  RolesRequestType,
} from '../types'

// Get all roles (no pagination, no filters)
export const getAllRoles = async () => {
  try {
    const response = await api.get(roles_url)
    return response.data
  } catch (error) {
    console.error('Error fetching roles:', error)
    throw error
  }
}

// Get role by ID
export const getRoleById = async (id: number) => {
  try {
    const response = await api.get(`${roles_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching role:', error)
    throw error
  }
}

// Create new role
export const createRole = async (data: RolesRequestType) => {
  try {
    const response = await api.post(roles_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating role:', error)
    throw error
  }
}

// Update role
export const updateRole = async (id: number, data: Partial<RolesRequestType>) => {
  try {
    const response = await api.patch(`${roles_url}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating role:', error)
    throw error
  }
}

// Delete role
export const deleteRole = async (id: number) => {
  try {
    const response = await api.delete(`${roles_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting role:', error)
    throw error
  }
}