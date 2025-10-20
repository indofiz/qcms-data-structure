/**
 * Category Query Hooks
 * Following analysis parameter pattern but simplified for no pagination/filtering
 */

import { useQuery } from '@tanstack/react-query'
import { CategoryType } from '../types'
import { getAllCategories, getCategoryById } from '../services'
import {
  ResponseListNoPagingType,
  ResponseSingleType,
} from '@/shared/types/response.type'
import { ReactQueryParamType } from '@/shared/types/react-query-param.types'

// **GET**: Get all categories (no pagination, no filtering)
export const useGetCategories = (config?: ReactQueryParamType) => {
  return useQuery<ResponseListNoPagingType<CategoryType[]>, Error>({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
    staleTime: 30000, // 30 seconds
    ...config,
  })
}

// **GET**: Get category detail by ID
export const useGetCategoryDetail = (id: number, config?: ReactQueryParamType) => {
  return useQuery<ResponseSingleType<CategoryType>, Error>({
    queryKey: ['category-detail', id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
    ...config,
  })
}