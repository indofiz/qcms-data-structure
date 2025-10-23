/**
 * Mixing Query Hooks
 * React Query hooks for fetching mixing data
 */

import { useQuery } from '@tanstack/react-query'
import { getAllMixings, getMixingById } from '../services/mixing.service'
import type { MixingType, MixingDetailType } from '../types/mixing.type'

import type { ReactQueryParamType } from '../../../../shared/types/react-query-param.types'

import type { ResponseListType, ResponseSingleType } from '../../../../shared/types/response.type'
import { useDebounce } from '../../../../shared/hooks/use-debounce'
import { MIXING_QUERY_KEY } from './mixing-key'


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

// **GET**: Get all mixing records with filtering and pagination
export const useGetMixings = ({ config, filter }: IListData) => {
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

  return useQuery<ResponseListType<MixingType[]>, Error>({
    queryKey: [
      MIXING_QUERY_KEY,
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
      getAllMixings({
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

// **GET**: Get mixing record detail by ID
export const useGetMixingDetail = (
  id: number,
  config?: ReactQueryParamType
) => {
  return useQuery<ResponseSingleType<MixingDetailType>, Error>({
    queryKey: [MIXING_QUERY_KEY, 'detail', id],
    queryFn: () => getMixingById(id),
    enabled: !!id,
    ...config,
  })
}
