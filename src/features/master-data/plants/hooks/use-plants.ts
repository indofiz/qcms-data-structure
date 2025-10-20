/**
 * Plant Query Hooks
 * Following category pattern for no pagination/filtering
 */

import { useQuery } from '@tanstack/react-query'
import { PlantType } from '../types'
import { getAllPlants, getPlantById } from '../services'
import {
  ResponseListNoPagingType,
  ResponseSingleType,
} from '@/shared/types/response.type'
import { ReactQueryParamType } from '@/shared/types/react-query-param.types'

// **GET**: Get all plants (no pagination, no filtering)
export const useGetPlants = (config?: ReactQueryParamType) => {
  return useQuery<ResponseListNoPagingType<PlantType[]>, Error>({
    queryKey: ['plants'],
    queryFn: getAllPlants,
    staleTime: 30000, // 30 seconds
    ...config,
  })
}

// **GET**: Get plant detail by ID
export const useGetPlant = (id: number, config?: ReactQueryParamType) => {
  return useQuery<ResponseSingleType<PlantType>, Error>({
    queryKey: ['plants', id],
    queryFn: () => getPlantById(id),
    enabled: !!id,
    ...config,
  })
}
