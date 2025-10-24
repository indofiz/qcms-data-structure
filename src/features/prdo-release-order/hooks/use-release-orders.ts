/**
 * Release Order Query Hooks
 * React Query hooks for fetching release order data
 */

import { useQuery } from '@tanstack/react-query'
import { getAllReleaseOrder, getReleaseOrderByRoNumber, getReleaseOrderDropdown } from '../services'
import type { ReleaseOrderType, ReleaseOrderDetailType, ReleaseOrderDropdownType } from '../types/release-order.type'

import type { ReactQueryParamType } from '../../../shared/types/react-query-param.types'

import type { ResponseListType, ResponseSingleType } from '../../../shared/types/response.type'
import { useDebounce } from '../../../shared/hooks/use-debounce'
import { RELEASE_ORDER_QUERY_KEY } from './release-order-key'


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

// **GET**: Get all release orders with filtering and pagination
export const useGetReleaseOrders = ({ config, filter }: IListData) => {
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

  return useQuery<ResponseListType<ReleaseOrderType[]>, Error>({
    queryKey: [
      RELEASE_ORDER_QUERY_KEY,
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
      getAllReleaseOrder({
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

// **GET**: Get release order detail by RO Number
export const useGetReleaseOrderDetail = (
  ro_number: string,
  config?: ReactQueryParamType
) => {
  return useQuery<ResponseSingleType<ReleaseOrderDetailType>, Error>({
    queryKey: [RELEASE_ORDER_QUERY_KEY, 'detail', ro_number],
    queryFn: () => getReleaseOrderByRoNumber(ro_number),
    enabled: !!ro_number,
    ...config,
  })
}

// **GET**: Get release order dropdown
export const useGetReleaseOrderDropdown = (
  config?: ReactQueryParamType
) => {
  return useQuery<ResponseListType<ReleaseOrderDropdownType[]>, Error>({
    queryKey: [RELEASE_ORDER_QUERY_KEY, 'dropdown'],
    queryFn: () => getReleaseOrderDropdown(),
    staleTime: 30000, // 30 seconds
    ...config,
  })
}
