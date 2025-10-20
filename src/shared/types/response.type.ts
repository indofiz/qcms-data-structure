/**
 * API Response Types
 * Standard response structure for API calls
 */

export type ResponseListType<T> = {
  status: boolean
  message: string
  data: T
  pagination: {
    current_page: number
    per_page: number
    total: number
    total_pages: number
  }
}

export type ResponseListNoPagingType<T> = {
  status: boolean
  message: string
  data: T
}

export type ResponseSingleType<T> = {
  status: boolean
  message: string
  data: T
}
