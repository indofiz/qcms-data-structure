/**
 * Delivery Partner Query Hooks
 */

import { useQuery } from '@tanstack/react-query'
import { DeliveryPartnerType } from '../types'
import { getAllDeliveryPartners, getDeliveryPartnerById } from '../services'
import { DeliveryPartnerFilterState } from '../store'
import {
  ResponseListType,
  ResponseSingleType,
} from '@/shared/types/response.type'
import { ReactQueryParamType } from '@/shared/types/react-query-param.types'
import { useDebounce } from '@/shared/hooks/use-debounce'

interface IListData {
  config?: ReactQueryParamType
  filter: DeliveryPartnerFilterState
}

// **GET**: Get all delivery partners with filtering and pagination
export const useGetDeliveryPartners = ({ config, filter }: IListData) => {
  const { per_page, page, search, status } = filter

  // Debounce search to reduce API calls
  const debouncedSearch = useDebounce(search, 500) // 500ms delay

  return useQuery<ResponseListType<DeliveryPartnerType[]>, Error>({
    queryKey: [
      'delivery-partners',
      { page, per_page, search: debouncedSearch, status },
    ],
    queryFn: () =>
      getAllDeliveryPartners({
        per_page,
        page,
        search: debouncedSearch,
        status,
      }),
    staleTime: 30000, // 30 seconds
    ...config,
  })
}

// **GET**: Get delivery partner detail by ID
export const useGetDeliveryPartnerDetail = (id: number) => {
  return useQuery<ResponseSingleType<DeliveryPartnerType>>({
    queryKey: ['delivery-partner-detail', id],
    queryFn: () => getDeliveryPartnerById(id),
    enabled: !!id,
  })
}