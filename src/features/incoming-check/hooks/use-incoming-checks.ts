/**
 * Incoming Check Query Hooks
 * React Query hooks for fetching incoming check data
 */

import { useQuery } from '@tanstack/react-query'
import { getAllIncomingCheck, getIncomingCheckById } from '../services'
import type { IncomingCheckType, IncomingCheckDetailType } from '../types/incoming-check.type'

import type { ReactQueryParamType } from '../../../shared/types/react-query-param.types'

import type { ResponseListType, ResponseSingleType } from '../../../shared/types/response.type'
import type { IncomingCheckFilterState } from '../types/incoming-check-filter.type'
import { useDebounce } from '../../../shared/hooks/use-debounce'
import { INCOMING_CHECK_QUERY_KEY } from './incoming-check-key'


interface IListData {
  config?: ReactQueryParamType
  filter: IncomingCheckFilterState
}

// **GET**: Get all incoming checks with filtering and pagination
export const useGetIncomingChecks = ({ config, filter }: IListData) => {
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

  return useQuery<ResponseListType<IncomingCheckType[]>, Error>({
    queryKey: [
      INCOMING_CHECK_QUERY_KEY,
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
      getAllIncomingCheck({
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

// **GET**: Get incoming check detail by ID
export const useGetIncomingCheckDetail = (
  id: number,
  config?: ReactQueryParamType
) => {
  return useQuery<ResponseSingleType<IncomingCheckDetailType>, Error>({
    queryKey: [INCOMING_CHECK_QUERY_KEY, 'detail', id],
    queryFn: () => getIncomingCheckById(id),
    enabled: !!id,
    ...config,
  })
}
