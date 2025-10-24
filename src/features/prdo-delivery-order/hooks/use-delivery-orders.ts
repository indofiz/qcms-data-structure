/**
 * Delivery Order Query Hooks
 * React Query hooks for fetching delivery order data
 */

import { useQuery } from '@tanstack/react-query'
import { getAllDeliveryOrder, getDeliveryOrderByDoNumber } from '../services'
import type { DeliveryOrderType, DeliveryOrderDetailType } from '../types/delivery-order.type'

import type { ReactQueryParamType } from '../../../shared/types/react-query-param.types'

import type { ResponseListType, ResponseSingleType } from '../../../shared/types/response.type'
import { useDebounce } from '../../../shared/hooks/use-debounce'
import { DELIVERY_ORDER_QUERY_KEY } from './delivery-order-key'


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

// **GET**: Get all delivery orders with filtering and pagination
export const useGetDeliveryOrders = ({ config, filter }: IListData) => {
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

  return useQuery<ResponseListType<DeliveryOrderType[]>, Error>({
    queryKey: [
      DELIVERY_ORDER_QUERY_KEY,
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
      getAllDeliveryOrder({
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

// **GET**: Get delivery order detail by DO Number
export const useGetDeliveryOrderDetail = (
  do_number: string,
  config?: ReactQueryParamType
) => {
  return useQuery<ResponseSingleType<DeliveryOrderDetailType>, Error>({
    queryKey: [DELIVERY_ORDER_QUERY_KEY, 'detail', do_number],
    queryFn: () => getDeliveryOrderByDoNumber(do_number),
    enabled: !!do_number,
    ...config,
  })
}
