/**
 * Raw Material Query Hooks
 * Following packing list pattern for specific hooks
 */

import { useQuery } from '@tanstack/react-query'
import { MaterialType, DetailMaterialType } from '../types'
import { getAllMaterials, getMaterialById, getAllRawMaterials } from '../services'
import { RawMaterialFilterState } from '../store'
import {
  ResponseListType,
  ResponseSingleType,
} from '@/shared/types/response.type'
import { ReactQueryParamType } from '@/shared/types/react-query-param.types'
import { useDebounce } from '@/shared/hooks/use-debounce'

interface IListData {
  config?: ReactQueryParamType
  filter: RawMaterialFilterState
}

// **GET**: Get all raw materials with filtering and pagination
export const useGetMaterials = ({ config, filter }: IListData) => {
  const { per_page, page, search, category, plant } = filter

  // Debounce search to reduce API calls
  const debouncedSearch = useDebounce(search, 500) // 500ms delay

  return useQuery<ResponseListType<MaterialType[]>, Error>({
    queryKey: [
      'raw-materials',
      { page, per_page, search: debouncedSearch, category, plant },
    ],
    queryFn: () =>
      getAllMaterials({
        per_page,
        page,
        search: debouncedSearch,
        category,
        plant,
      }),
    staleTime: 30000, // 30 seconds
    ...config,
  })
}

// **GET**: Get raw material detail by ID
export const useGetMaterialDetail = (id: number) => {
  return useQuery<ResponseSingleType<DetailMaterialType>>({
    queryKey: ['raw-material-detail', id],
    queryFn: () => getMaterialById(id),
    enabled: !!id,
  })
}

// **GET**: Get all raw materials (for dropdowns)
export const useGetAllRawMaterials = (config?: ReactQueryParamType) => {
  return useQuery<ResponseListType<MaterialType[]>, Error>({
    queryKey: ['raw-materials-all'],
    queryFn: () => getAllRawMaterials(),
    staleTime: 300000, // 5 minutes (longer since this data changes less frequently)
    ...config,
  })
}