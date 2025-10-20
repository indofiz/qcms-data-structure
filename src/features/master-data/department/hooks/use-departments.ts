/**
 * Department Query Hooks
 * Following analysis-parameter pattern but simplified for no pagination/filtering
 */

import { useQuery } from '@tanstack/react-query'
import { DepartmentType } from '../types'
import { getAllDepartments, getDepartmentById } from '../services'
import {
  ResponseListNoPagingType,
  ResponseSingleType,
} from '@/shared/types/response.type'
import { ReactQueryParamType } from '@/shared/types/react-query-param.types'

// **GET**: Get all departments (no pagination, no filtering)
export const useGetDepartments = (config?: ReactQueryParamType) => {
  return useQuery<ResponseListNoPagingType<DepartmentType[]>, Error>({
    queryKey: ['departments'],
    queryFn: () => getAllDepartments(),
    staleTime: 30000, // 30 seconds
    ...config,
  })
}

// **GET**: Get department detail by ID
export const useGetDepartmentDetail = (id: number, config?: ReactQueryParamType) => {
  return useQuery<ResponseSingleType<DepartmentType>, Error>({
    queryKey: ['department-detail', id],
    queryFn: () => getDepartmentById(id),
    enabled: !!id,
    ...config,
  })
}