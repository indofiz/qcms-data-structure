/**
 * Unit Query Hooks
 * Following analysis-parameter pattern but simplified for no pagination/filtering
 */

import { useQuery } from '@tanstack/react-query'
import { UnitType } from '../types'
import { getAllUnits, getUnitById } from '../services'
import { UnitFilterState } from '../store'
import {
  ResponseListType,
  ResponseSingleType,
} from '@/shared/types/response.type'
import { ReactQueryParamType } from '@/shared/types/react-query-param.types'
import { useDebounce } from '@/shared/hooks/use-debounce'

interface IListData {
  config?: ReactQueryParamType
  filter: UnitFilterState
}

// **GET**: Get all units with filtering and pagination
export const useGetUnits = ({ config, filter }: IListData) => {
  const { per_page, page, search, status } = filter

  // Debounce search to reduce API calls
  const debouncedSearch = useDebounce(search, 500) // 500ms delay

  return useQuery<ResponseListType<UnitType[]>, Error>({
    queryKey: [
      'units',
      { page, per_page, search: debouncedSearch, status },
    ],
    queryFn: () =>
      getAllUnits({
        per_page,
        page,
        search: debouncedSearch,
        status,
      }),
    staleTime: 30000, // 30 seconds
    ...config,
  })
}

// **GET**: Get unit detail by ID
export const useGetUnitDetail = (id: number, config?: ReactQueryParamType) => {
  return useQuery<ResponseSingleType<UnitType>, Error>({
    queryKey: ['unit-detail', id],
    queryFn: () => getUnitById(id),
    enabled: !!id,
    ...config,
  })
}