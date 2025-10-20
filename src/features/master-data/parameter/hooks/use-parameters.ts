/**
 * Parameter Query Hooks
 * Following supplier pattern for parameter hooks
 */

import { useQuery } from '@tanstack/react-query'
import { ParameterType } from '../types'
import { getAllParameters, getParameterById } from '../services'
import { ParameterFilterState } from '../store'
import {
  ResponseListType,
  ResponseSingleType,
} from '@/shared/types/response.type'
import { ReactQueryParamType } from '@/shared/types/react-query-param.types'
import { useDebounce } from '@/shared/hooks/use-debounce'

interface IListData {
  config?: ReactQueryParamType
  filter: ParameterFilterState
}

// **GET**: Get all parameters with filtering and pagination
export const useGetParameters = ({ config, filter }: IListData) => {
  const { per_page, page, search, status } = filter

  // Debounce search to reduce API calls
  const debouncedSearch = useDebounce(search, 500) // 500ms delay

  return useQuery<ResponseListType<ParameterType[]>, Error>({
    queryKey: [
      'parameters',
      { page, per_page, search: debouncedSearch, status },
    ],
    queryFn: () =>
      getAllParameters({
        per_page,
        page,
        search: debouncedSearch,
        status,
      }),
    staleTime: 30000, // 30 seconds
    ...config,
  })
}

// **GET**: Get parameter detail by ID
export const useGetParameterDetail = (id: number, config?: ReactQueryParamType) => {
  return useQuery<ResponseSingleType<ParameterType>>({
    queryKey: ['parameter-detail', id],
    queryFn: () => getParameterById(id),
    enabled: !!id,
    ...config,
  })
}