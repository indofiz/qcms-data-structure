/**
 * Roles Query Hooks
 * Following category pattern but simplified for no pagination/filtering
 */

import { useQuery } from '@tanstack/react-query'
import { RolesType } from '../types'
import { getAllRoles, getRoleById } from '../services'
import {
  ResponseListNoPagingType,
  ResponseSingleType,
} from '@/shared/types/response.type'
import { ReactQueryParamType } from '@/shared/types/react-query-param.types'

// **GET**: Get all roles (no pagination, no filtering)
export const useGetRoles = (config?: ReactQueryParamType) => {
  return useQuery<ResponseListNoPagingType<RolesType[]>, Error>({
    queryKey: ['roles'],
    queryFn: () => getAllRoles(),
    staleTime: 30000, // 30 seconds
    ...config,
  })
}

// **GET**: Get role detail by ID
export const useGetRoleDetail = (id: number, config?: ReactQueryParamType) => {
  return useQuery<ResponseSingleType<RolesType>, Error>({
    queryKey: ['role-detail', id],
    queryFn: () => getRoleById(id),
    enabled: !!id,
    ...config,
  })
}