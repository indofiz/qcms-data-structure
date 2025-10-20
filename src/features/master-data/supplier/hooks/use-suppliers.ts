/**
 * Supplier Query Hooks
 * Following packing list pattern for specific hooks
 */

import { useQuery } from '@tanstack/react-query'
import { SupplierType, DetailSupplierType } from '../types'
import { getAllSuppliers, getSupplierById } from '../services'
import { SupplierFilterState } from '../store'
import {
  ResponseListType,
  ResponseSingleType,
} from '@/shared/types/response.type'
import { ReactQueryParamType } from '@/shared/types/react-query-param.types'
import { useDebounce } from '@/shared/hooks/use-debounce'

interface IListData {
  config?: ReactQueryParamType
  filter: SupplierFilterState
}

// **GET**: Get all suppliers with filtering and pagination
export const useGetSuppliers = ({ config, filter }: IListData) => {
  const { per_page, page, search, city, province, status } = filter

  // Debounce search to reduce API calls
  const debouncedSearch = useDebounce(search, 500) // 500ms delay

  return useQuery<ResponseListType<SupplierType[]>, Error>({
    queryKey: [
      'suppliers',
      { page, per_page, search: debouncedSearch, city, province, status },
    ],
    queryFn: () =>
      getAllSuppliers({
        per_page,
        page,
        search: debouncedSearch,
        city,
        province,
      }),
    staleTime: 30000, // 30 seconds
    ...config,
  })
}

// **GET**: Get supplier detail by ID
export const useGetSupplierDetail = (id: number) => {
  return useQuery<ResponseSingleType<DetailSupplierType>>({
    queryKey: ['supplier-detail', id],
    queryFn: () => getSupplierById(id),
    enabled: !!id,
  })
}
