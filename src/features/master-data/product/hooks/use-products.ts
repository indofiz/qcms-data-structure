/**
 * Product Query Hooks
 * Following supplier pattern for specific hooks
 */

import { useQuery } from '@tanstack/react-query'
import { ProductType, DetailProductType } from '../types'
import { getAllProducts, getProductById } from '../services'
import { ProductFilterState } from '../store'
import {
  ResponseListType,
  ResponseSingleType,
} from '@/shared/types/response.type'
import { ReactQueryParamType } from '@/shared/types/react-query-param.types'
import { useDebounce } from '@/shared/hooks/use-debounce'

interface IListData {
  config?: ReactQueryParamType
  filter: ProductFilterState
}

// **GET**: Get all products with filtering and pagination
export const useGetProducts = ({ config, filter }: IListData) => {
  const { per_page, page, search, plant, activate } = filter

  // Debounce search to reduce API calls
  const debouncedSearch = useDebounce(search, 500) // 500ms delay

  return useQuery<ResponseListType<ProductType[]>, Error>({
    queryKey: [
      'products',
      { page, per_page, search: debouncedSearch, plant, activate },
    ],
    queryFn: () =>
      getAllProducts({
        per_page,
        page,
        search: debouncedSearch,
        plant,
        activate,
      }),
    staleTime: 30000, // 30 seconds
    ...config,
  })
}

// **GET**: Get product detail by ID
export const useGetProductDetail = (id: number) => {
  return useQuery<ResponseSingleType<DetailProductType>>({
    queryKey: ['product-detail', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  })
}