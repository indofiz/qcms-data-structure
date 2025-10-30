/**
 * Incoming Query Hooks
 * React Query hooks for fetching incoming material data
 */

import { useQuery } from '@tanstack/react-query'
import { getAllIncoming, getIncomingById } from '../services'
import type { IncomingType, IncomingDetailType } from '../types/incoming.type'

import type { ReactQueryParamType } from '../../../shared/types/react-query-param.types'

import type { ResponseListType, ResponseSingleType } from '../../../shared/types/response.type'
import type { IncomingFilterState } from '../types/incoming-filter.type'
import { useDebounce } from '../../../shared/hooks/use-debounce'
import { INCOMING_QUERY_KEY } from './incoming-key'


interface IListData {
  config?: ReactQueryParamType
  filter: IncomingFilterState
}

// **GET**: Get all incoming materials with filtering and pagination
export const useGetIncomings = ({ config, filter }: IListData) => {
  const {
    per_page,
    page,
    search,
    status,
    start_date,
    end_date,
    created_at_order,
    plant,
  } = filter

  // Debounce search to reduce API calls
  const debouncedSearch = useDebounce(search, 500) // 500ms delay

  return useQuery<ResponseListType<IncomingType[]>, Error>({
    queryKey: [
      INCOMING_QUERY_KEY,
      {
        page,
        per_page,
        search: debouncedSearch,
        status,
        start_date,
        end_date,
        created_at_order,
        plant,
      },
    ],
    queryFn: () =>
      getAllIncoming({
        per_page,
        page,
        search: debouncedSearch,
        status,
        start_date,
        end_date,
        created_at_order,
        plant,
      }),
    staleTime: 30000, // 30 seconds
    ...config,
  })
}

// **GET**: Get incoming material detail by ID
export const useGetIncomingDetail = (
  id: number,
  config?: ReactQueryParamType
) => {
  return useQuery<ResponseSingleType<IncomingDetailType>, Error>({
    queryKey: [INCOMING_QUERY_KEY, 'detail', id],
    queryFn: () => getIncomingById(id),
    enabled: !!id,
    ...config,
  })
}
