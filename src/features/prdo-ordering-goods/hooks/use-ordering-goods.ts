/**
 * Ordering Good Query Hooks
 * React Query hooks for fetching ordering good data
 */

import { useQuery } from '@tanstack/react-query'
import { getAllOrderingGood, getOrderingGoodById } from '../services'
import type { OrderingGoodType, OrderingGoodDetailType } from '../types/ordering-good.type'

import type { ReactQueryParamType } from '../../../shared/types/react-query-param.types'

import type { ResponseListType, ResponseSingleType } from '../../../shared/types/response.type'
import { useDebounce } from '../../../shared/hooks/use-debounce'
import { ORDERING_GOOD_QUERY_KEY } from './ordering-good-key'


interface IListData {
  config?: ReactQueryParamType
  filter: {
    per_page?: number
    page?: number
    search?: string
    pl_number?: string
    start_date?: string
    end_date?: string
    created_at_order?: 'ASC' | 'DESC'
  }
}

// **GET**: Get all ordering goods with filtering and pagination
export const useGetOrderingGoods = ({ config, filter }: IListData) => {
  const {
    per_page,
    page,
    search,
    pl_number,
    start_date,
    end_date,
    created_at_order,
  } = filter

  // Debounce search to reduce API calls
  const debouncedSearch = useDebounce(search, 500) // 500ms delay

  return useQuery<ResponseListType<OrderingGoodType[]>, Error>({
    queryKey: [
      ORDERING_GOOD_QUERY_KEY,
      {
        page,
        per_page,
        search: debouncedSearch,
        pl_number,
        start_date,
        end_date,
        created_at_order,
      },
    ],
    queryFn: () =>
      getAllOrderingGood({
        per_page,
        page,
        search: debouncedSearch,
        pl_number,
        start_date,
        end_date,
        created_at_order,
      }),
    staleTime: 30000, // 30 seconds
    ...config,
  })
}

// **GET**: Get ordering good detail by ID
export const useGetOrderingGoodDetail = (
  id: number,
  config?: ReactQueryParamType
) => {
  return useQuery<ResponseSingleType<OrderingGoodDetailType>, Error>({
    queryKey: [ORDERING_GOOD_QUERY_KEY, 'detail', id],
    queryFn: () => getOrderingGoodById(id),
    enabled: !!id,
    ...config,
  })
}
