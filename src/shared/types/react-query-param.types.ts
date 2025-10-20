/**
 * React Query Parameter Types
 * Configuration options for React Query hooks
 */

import { UseQueryOptions } from '@tanstack/react-query'

export type ReactQueryParamType = Omit<
  UseQueryOptions,
  'queryKey' | 'queryFn'
>
