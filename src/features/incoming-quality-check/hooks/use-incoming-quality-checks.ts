/**
 * Incoming Quality Check Query Hooks
 * React Query hooks for fetching incoming quality check data
 */

import { useQuery } from '@tanstack/react-query'
import { getAllIncomingQualityCheck, getIncomingQualityCheckById } from '../services'
import type { IncomingQualityCheckType, IncomingQualityCheckDetailType } from '../types/incoming-quality-check.type'

import type { ReactQueryParamType } from '../../../shared/types/react-query-param.types'

import type { ResponseListType, ResponseSingleType } from '../../../shared/types/response.type'
import type { IncomingQualityCheckFilterState } from '../types/incoming-quality-check-filter.type'
import { useDebounce } from '../../../shared/hooks/use-debounce'
import { INCOMING_QUALITY_CHECK_QUERY_KEY } from './incoming-quality-check-key'


interface IListData {
  config?: ReactQueryParamType
  filter: IncomingQualityCheckFilterState
}

// **GET**: Get all incoming quality checks with filtering and pagination
export const useGetIncomingQualityChecks = ({ config, filter }: IListData) => {
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

  return useQuery<ResponseListType<IncomingQualityCheckType[]>, Error>({
    queryKey: [
      INCOMING_QUALITY_CHECK_QUERY_KEY,
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
      getAllIncomingQualityCheck({
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

// **GET**: Get incoming quality check detail by ID
export const useGetIncomingQualityCheckDetail = (
  id: number,
  config?: ReactQueryParamType
) => {
  return useQuery<ResponseSingleType<IncomingQualityCheckDetailType>, Error>({
    queryKey: [INCOMING_QUALITY_CHECK_QUERY_KEY, 'detail', id],
    queryFn: () => getIncomingQualityCheckById(id),
    enabled: !!id,
    ...config,
  })
}
