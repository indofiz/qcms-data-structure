/**
 * Product Filter Data Hooks
 * Hooks for fetching data needed for product filters (plants)
 */

import { useQuery } from '@tanstack/react-query'
import { getAllPlants } from '@/features/master-data/plants/services/plants.services'
import type { PlantType } from '@/features/master-data/plants/types/plants.type'

// Hook for fetching all plants for filter options
export const useGetPlants = () => {
  return useQuery<{ data: PlantType[] }>({
    queryKey: ['plants'],
    queryFn: getAllPlants,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}