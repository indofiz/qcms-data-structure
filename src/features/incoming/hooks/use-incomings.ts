/**
 * Incoming Query Hooks
 * React Query hooks for fetching incoming material data
 */

import { useQuery } from '@tanstack/react-query'
import { getAllIncoming, getIncomingById } from '../services'
import type { IncomingType, IncomingDetailType } from '../types/incoming.type'
import type {
  ResponseListType,
  ResponseSingleType,
} from '@/shared/types/response.type'
import type { ReactQueryParamType } from '@/shared/types/react-query-param.types'
import { useDebounce } from '@/shared/hooks/use-debounce'

export interface IncomingFilterState {
  page?: number
  per_page?: number
  search?: string
  status?: string
  material_name?: string
  supplier_name?: string
  plant?: string
}

interface IListData {
  config?: ReactQueryParamType
  filter: IncomingFilterState
}

// **GET**: Get all incoming materials with filtering and pagination
export const useGetIncomings = ({ config, filter }: IListData) => {
  const {
    per_page,
    page,
    search,
    status,
    material_name,
    supplier_name,
    plant,
  } = filter

  // Debounce search to reduce API calls
  const debouncedSearch = useDebounce(search, 500) // 500ms delay

  return useQuery<ResponseListType<IncomingType[]>, Error>({
    queryKey: [
      'incomings',
      {
        page,
        per_page,
        search: debouncedSearch,
        status,
        material_name,
        supplier_name,
        plant,
      },
    ],
    queryFn: () =>
      getAllIncoming({
        per_page,
        page,
        search: debouncedSearch,
        status,
        material_name,
        supplier_name,
        plant,
      }),
    staleTime: 30000, // 30 seconds
    ...config,
  })
}

// **GET**: Get incoming material detail by ID
export const useGetIncomingDetail = (
  id: number,
  config?: ReactQueryParamType
) => {
  return useQuery<ResponseSingleType<IncomingDetailType>, Error>({
    queryKey: ['incoming-detail', id],
    queryFn: () => getIncomingById(id),
    enabled: !!id,
    ...config,
  })
}
