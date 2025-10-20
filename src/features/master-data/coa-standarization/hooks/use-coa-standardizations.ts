/**
 * COA Standardization Query Hooks
 * Following supplier pattern for hooks
 */

import { useQuery } from '@tanstack/react-query'
import { CoaStandarizationType, DetailCoaStandarizationType } from '../types/coa-standarization.type'
import { getAllCoaStandardizations, getCoaStandardizationById } from '../services/coa-standarization.services'
import {
  ResponseListType,
  ResponseSingleType,
} from '@/shared/types/response.type'
import { ReactQueryParamType } from '@/shared/types/react-query-param.types'
import { useDebounce } from '@/shared/hooks/use-debounce'

interface IListData {
  config?: ReactQueryParamType
  filter: {
    per_page: number
    page: number
    search: string
    raw_material?: string
  }
}

// **GET**: Get all COA standardizations with filtering and pagination
export const useGetCoaStandardizations = ({ config, filter }: IListData) => {
  const { per_page, page, search, raw_material } = filter

  // Debounce search to reduce API calls
  const debouncedSearch = useDebounce(search, 500) // 500ms delay

  return useQuery<ResponseListType<CoaStandarizationType[]>, Error>({
    queryKey: [
      'coa-standardizations',
      { page, per_page, search: debouncedSearch, raw_material },
    ],
    queryFn: () =>
      getAllCoaStandardizations({
        per_page,
        page,
        search: debouncedSearch,
        raw_material,
      }),
    staleTime: 30000, // 30 seconds
    ...config,
  })
}

// **GET**: Get COA standardization detail by ID
export const useGetCoaStandardizationDetail = (id: number) => {
  return useQuery<ResponseSingleType<DetailCoaStandarizationType>>({
    queryKey: ['coa-standardization-detail', id],
    queryFn: () => getCoaStandardizationById(id),
    enabled: !!id,
  })
}