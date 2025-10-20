/**
 * Raw Material Filter Data Hooks
 * Hooks for fetching data needed for raw material filters (categories and plants)
 */

import { useQuery } from '@tanstack/react-query'
import { getAllCategories } from '@/features/master-data/category/services/category.services'
import { getAllPlants } from '@/features/master-data/plants/services/plants.services'
import type { CategoryType } from '@/features/master-data/category/types/category.type'
import type { PlantType } from '@/features/master-data/plants/types/plants.type'

// Hook for fetching all categories for filter options
export const useGetCategories = () => {
  return useQuery<{ data: CategoryType[] }>({
    queryKey: ['categories'],
    queryFn: getAllCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Hook for fetching all plants for filter options
export const useGetPlants = () => {
  return useQuery<{ data: PlantType[] }>({
    queryKey: ['plants'],
    queryFn: getAllPlants,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}