/**
 * Melting Query Hooks
 * React Query hooks for fetching melting data
 */

import { useQuery } from '@tanstack/react-query'
import { getAllMeltings, getMeltingById } from '../services/melting.service'
import type { MeltingType, MeltingDetailType } from '../types/melting.type'

import type { ReactQueryParamType } from '../../../../shared/types/react-query-param.types'

import type { ResponseListType, ResponseSingleType } from '../../../../shared/types/response.type'
import { useDebounce } from '../../../../shared/hooks/use-debounce'
import { MELTING_QUERY_KEY } from './melting-key'


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

// **GET**: Get all melting records with filtering and pagination
export const useGetMeltings = ({ config, filter }: IListData) => {
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

  return useQuery<ResponseListType<MeltingType[]>, Error>({
    queryKey: [
      MELTING_QUERY_KEY,
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
      getAllMeltings({
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

// **GET**: Get melting record detail by ID
export const useGetMeltingDetail = (
  id: number,
  config?: ReactQueryParamType
) => {
  return useQuery<ResponseSingleType<MeltingDetailType>, Error>({
    queryKey: [MELTING_QUERY_KEY, 'detail', id],
    queryFn: () => getMeltingById(id),
    enabled: !!id,
    ...config,
  })
}
