/**
 * DMT Query Hooks
 * React Query hooks for fetching DMT sampling data
 */

import { useQuery } from '@tanstack/react-query'
import { getAllDmt, getDmtById } from '../services'
import type { DmtSamplingType, DmtSamplingDetailType } from '../types/dmt.type'

import type { ReactQueryParamType } from '../../../shared/types/react-query-param.types'

import type { ResponseListType, ResponseSingleType } from '../../../shared/types/response.type'
import { useDebounce } from '../../../shared/hooks/use-debounce'
import { DMT_QUERY_KEY } from './dmt-key'


interface IListData {
  config?: ReactQueryParamType
  filter: {
    per_page?: number
    page?: number
    search?: string
    status?: string
    start_date?: string
    end_date?: string
    created_at_order?: 'ASC' | 'DESC'
  }
}

// **GET**: Get all DMT samplings with filtering and pagination
export const useGetDmts = ({ config, filter }: IListData) => {
  const {
    per_page,
    page,
    search,
    status,
    start_date,
    end_date,
    created_at_order,
  } = filter

  // Debounce search to reduce API calls
  const debouncedSearch = useDebounce(search, 500) // 500ms delay

  return useQuery<ResponseListType<DmtSamplingType[]>, Error>({
    queryKey: [
      DMT_QUERY_KEY,
      {
        page,
        per_page,
        search: debouncedSearch,
        status,
        start_date,
        end_date,
        created_at_order,
      },
    ],
    queryFn: () =>
      getAllDmt({
        per_page,
        page,
        search: debouncedSearch,
        status,
        start_date,
        end_date,
        created_at_order,
      }),
    staleTime: 30000, // 30 seconds
    ...config,
  })
}

// **GET**: Get DMT sampling detail by ID
export const useGetDmtDetail = (
  id: number,
  config?: ReactQueryParamType
) => {
  return useQuery<ResponseSingleType<DmtSamplingDetailType>, Error>({
    queryKey: [DMT_QUERY_KEY, 'detail', id],
    queryFn: () => getDmtById(id),
    enabled: !!id,
    ...config,
  })
}
