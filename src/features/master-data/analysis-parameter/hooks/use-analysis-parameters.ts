/**
 * Analysis Parameter Query Hooks
 * Following supplier pattern but simplified for no pagination/filtering
 */

import { useQuery } from '@tanstack/react-query'
import { AnalysisParameterType } from '../types'
import { getAllAnalysisParameters, getAnalysisParameterById } from '../services'
import {
  ResponseListNoPagingType,
  ResponseSingleType,
} from '@/shared/types/response.type'
import { ReactQueryParamType } from '@/shared/types/react-query-param.types'

// **GET**: Get all analysis parameters (no pagination, no filtering)
export const useGetAnalysisParameters = (config?: ReactQueryParamType) => {
  return useQuery<ResponseListNoPagingType<AnalysisParameterType[]>, Error>({
    queryKey: ['analysis-parameters'],
    queryFn: () => getAllAnalysisParameters(),
    staleTime: 30000, // 30 seconds
    ...config,
  })
}

// **GET**: Get analysis parameter detail by ID
export const useGetAnalysisParameterDetail = (id: number, config?: ReactQueryParamType) => {
  return useQuery<ResponseSingleType<AnalysisParameterType>, Error>({
    queryKey: ['analysis-parameter-detail', id],
    queryFn: () => getAnalysisParameterById(id),
    enabled: !!id,
    ...config,
  })
}