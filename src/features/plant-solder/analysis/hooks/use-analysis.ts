/**
 * Analysis Query Hooks
 * React Query hooks for fetching analysis data
 */

import { useQuery } from '@tanstack/react-query'
import { getAllAnalysis, getAnalysisById } from '../services/analysis.service'
import type { AnalysisType, AnalysisDetailType } from '../types/analysis.type'

import type { ReactQueryParamType } from '../../../../shared/types/react-query-param.types'

import type { ResponseListType, ResponseSingleType } from '../../../../shared/types/response.type'
import { useDebounce } from '../../../../shared/hooks/use-debounce'
import { ANALYSIS_QUERY_KEY } from './analysis-key'


interface IListData {
  config?: ReactQueryParamType
  filter: {
    per_page?: number
    page?: number
    search?: string
    start_date?: string
    end_date?: string
    created_at_order?: string
  }
}

// **GET**: Get all analysis records with filtering and pagination
export const useGetAnalysis = ({ config, filter }: IListData) => {
  const {
    per_page,
    page,
    search,
    start_date,
    end_date,
    created_at_order,
  } = filter

  // Debounce search to reduce API calls
  const debouncedSearch = useDebounce(search, 500) // 500ms delay

  return useQuery<ResponseListType<AnalysisType[]>, Error>({
    queryKey: [
      ANALYSIS_QUERY_KEY,
      {
        page,
        per_page,
        search: debouncedSearch,
        start_date,
        end_date,
        created_at_order,
      },
    ],
    queryFn: () =>
      getAllAnalysis({
        per_page,
        page,
        search: debouncedSearch,
        start_date,
        end_date,
        created_at_order,
      }),
    staleTime: 30000, // 30 seconds
    ...config,
  })
}

// **GET**: Get analysis record detail by ID
export const useGetAnalysisDetail = (
  id: number,
  config?: ReactQueryParamType
) => {
  return useQuery<ResponseSingleType<AnalysisDetailType>, Error>({
    queryKey: [ANALYSIS_QUERY_KEY, 'detail', id],
    queryFn: () => getAnalysisById(id),
    enabled: !!id,
    ...config,
  })
}
