/**
 * Positions Query Hooks
 * Following category pattern but simplified for no pagination/filtering
 */

import { useQuery } from '@tanstack/react-query'
import { PositionsType } from '../types'
import { getAllPositions, getPositionById } from '../services'
import {
  ResponseListNoPagingType,
  ResponseSingleType,
} from '@/shared/types/response.type'
import { ReactQueryParamType } from '@/shared/types/react-query-param.types'

// **GET**: Get all positions (no pagination, no filtering)
export const useGetPositions = (config?: ReactQueryParamType) => {
  return useQuery<ResponseListNoPagingType<PositionsType[]>, Error>({
    queryKey: ['positions'],
    queryFn: () => getAllPositions(),
    staleTime: 30000, // 30 seconds
    ...config,
  })
}

// **GET**: Get position detail by ID
export const useGetPositionDetail = (id: number, config?: ReactQueryParamType) => {
  return useQuery<ResponseSingleType<PositionsType>, Error>({
    queryKey: ['position-detail', id],
    queryFn: () => getPositionById(id),
    enabled: !!id,
    ...config,
  })
}