/**
 * Production Request Order Query Hooks
 * React Query hooks for fetching production request order data
 */

import { useQuery } from '@tanstack/react-query'
import { getAllProductionRequestOrders, getProductionRequestOrderById } from '../services/production-request-order.service'
import type { ProductionRequestOrderType, ProductionRequestOrderDetailType } from '../types/production-request-order.type'

import type { ReactQueryParamType } from '../../../../shared/types/react-query-param.types'

import type { ResponseListType, ResponseSingleType } from '../../../../shared/types/response.type'
import { useDebounce } from '../../../../shared/hooks/use-debounce'
import { PRODUCTION_REQUEST_ORDER_QUERY_KEY } from './production-request-order-key'


interface IListData {
  config?: ReactQueryParamType
  filter: {
    per_page?: number
    page?: number
    search?: string
    status?: string
    start_date?: string
    end_date?: string
    created_at_order?: string
  }
}

// **GET**: Get all production request orders with filtering and pagination
export const useGetProductionRequestOrders = ({ config, filter }: IListData) => {
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

  return useQuery<ResponseListType<ProductionRequestOrderType[]>, Error>({
    queryKey: [
      PRODUCTION_REQUEST_ORDER_QUERY_KEY,
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
      getAllProductionRequestOrders({
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

// **GET**: Get production request order detail by ID
export const useGetProductionRequestOrderDetail = (
  id: number,
  config?: ReactQueryParamType
) => {
  return useQuery<ResponseSingleType<ProductionRequestOrderDetailType>, Error>({
    queryKey: [PRODUCTION_REQUEST_ORDER_QUERY_KEY, 'detail', id],
    queryFn: () => getProductionRequestOrderById(id),
    enabled: !!id,
    ...config,
  })
}
