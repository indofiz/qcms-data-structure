/**
 * Analysis API Services
 * API functions for managing analysis data
 */

import { api } from '../../../../shared/services'
import { filterFalsyParams } from '../../../../shared/utils'

import type {
  AnalysisFormData,
  AnalysisBulkFormData,
  AnalysisEditFormData,
} from '../types/analysis.type'

// Analysis URL
const analysis_url = '/analysis'

// Get all analysis records with filtering and pagination
export const getAllAnalysis = async (params: Record<string, unknown>) => {
  try {
    const filteredParams = filterFalsyParams(params)
    const response = await api.get(analysis_url, { params: filteredParams })
    return response.data
  } catch (error) {
    console.error('Error fetching analysis records:', error)
    throw error
  }
}

// Get analysis record detail by ID
export const getAnalysisById = async (id: number) => {
  try {
    const response = await api.get(`${analysis_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching analysis record detail:', error)
    throw error
  }
}

// Create new analysis record
export const createAnalysis = async (data: AnalysisFormData) => {
  try {
    const response = await api.post(analysis_url, data)
    return response.data
  } catch (error) {
    console.error('Error creating analysis record:', error)
    throw error
  }
}

// Create bulk analysis records
export const createBulkAnalysis = async (data: AnalysisBulkFormData) => {
  try {
    const response = await api.post(`${analysis_url}/bulk`, data)
    return response.data
  } catch (error) {
    console.error('Error creating bulk analysis records:', error)
    throw error
  }
}

// Update analysis record
export const updateAnalysis = async (
  id: number,
  data: AnalysisEditFormData
) => {
  try {
    const response = await api.patch(`${analysis_url}/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error updating analysis record:', error)
    throw error
  }
}

// Delete analysis record
export const deleteAnalysis = async (id: number) => {
  try {
    const response = await api.delete(`${analysis_url}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting analysis record:', error)
    throw error
  }
}
