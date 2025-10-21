export type ResponseSingleType<T> = {
  status: string
  message: string
  data: T
}

export type PaginationReponse = {
  current_page: number
  per_page: number
  total: number
  last_page: number
}

export type ResponseListType<T> = {
  status: string
  message: string
  data: {
    data: T
    pagination: PaginationReponse
  }
}

export type ResponseListNoPagingType<T> = {
  status: string
  message: string
  data: T
}

export type PlantData<T> = {
  data: T[]
  pagination: PaginationReponse
}

export type MultiPlantResponse<T> = {
  status: string
  message: string
  data: Record<string, PlantData<T>>
}
