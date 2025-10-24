/**
 * Packing List Query Hooks
 * React Query hooks for fetching packing list data
 */

import { useQuery } from '@tanstack/react-query'
import { getAllPackingList, getPackingListByPlNumber, getPackingListDropdown } from '../services'
import type { PackingListType, PackingListDetailType, PackingListDropdownType } from '../types/packing-list.type'

import type { ReactQueryParamType } from '../../../shared/types/react-query-param.types'

import type { ResponseListType, ResponseSingleType } from '../../../shared/types/response.type'
import { useDebounce } from '../../../shared/hooks/use-debounce'
import { PACKING_LIST_QUERY_KEY } from './packing-list-key'


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

// **GET**: Get all packing lists with filtering and pagination
export const useGetPackingLists = ({ config, filter }: IListData) => {
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

  return useQuery<ResponseListType<PackingListType[]>, Error>({
    queryKey: [
      PACKING_LIST_QUERY_KEY,
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
      getAllPackingList({
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

// **GET**: Get packing list detail by PL Number
export const useGetPackingListDetail = (
  pl_number: string,
  config?: ReactQueryParamType
) => {
  return useQuery<ResponseSingleType<PackingListDetailType>, Error>({
    queryKey: [PACKING_LIST_QUERY_KEY, 'detail', pl_number],
    queryFn: () => getPackingListByPlNumber(pl_number),
    enabled: !!pl_number,
    ...config,
  })
}

// **GET**: Get packing list dropdown
export const useGetPackingListDropdown = (
  config?: ReactQueryParamType
) => {
  return useQuery<ResponseListType<PackingListDropdownType[]>, Error>({
    queryKey: [PACKING_LIST_QUERY_KEY, 'dropdown'],
    queryFn: () => getPackingListDropdown(),
    staleTime: 30000, // 30 seconds
    ...config,
  })
}
