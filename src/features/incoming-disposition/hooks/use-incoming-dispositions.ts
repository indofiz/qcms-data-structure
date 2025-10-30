/**
 * Incoming Disposition Query Hooks
 * React Query hooks for fetching incoming disposition data
 */

import { useQuery } from '@tanstack/react-query'
import { getAllIncomingDisposition, getIncomingDispositionById } from '../services'
import type { IncomingDispositionType, IncomingDispositionDetailType } from '../types/incoming-disposition.type'

import type { ReactQueryParamType } from '../../../shared/types/react-query-param.types'

import type { ResponseListType, ResponseSingleType } from '../../../shared/types/response.type'
import type { IncomingDispositionFilterState } from '../types/incoming-disposition-filter.type'
import { useDebounce } from '../../../shared/hooks/use-debounce'
import { INCOMING_DISPOSITION_QUERY_KEY } from './incoming-disposition-key'


interface IListData {
  config?: ReactQueryParamType
  filter: IncomingDispositionFilterState
}

// **GET**: Get all incoming dispositions with filtering and pagination
export const useGetIncomingDispositions = ({ config, filter }: IListData) => {
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

  return useQuery<ResponseListType<IncomingDispositionType[]>, Error>({
    queryKey: [
      INCOMING_DISPOSITION_QUERY_KEY,
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
      getAllIncomingDisposition({
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

// **GET**: Get incoming disposition detail by ID
export const useGetIncomingDispositionDetail = (
  id: number,
  config?: ReactQueryParamType
) => {
  return useQuery<ResponseSingleType<IncomingDispositionDetailType>, Error>({
    queryKey: [INCOMING_DISPOSITION_QUERY_KEY, 'detail', id],
    queryFn: () => getIncomingDispositionById(id),
    enabled: !!id,
    ...config,
  })
}
