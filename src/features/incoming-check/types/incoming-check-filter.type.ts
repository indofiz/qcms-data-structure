
export type IncomingCheckFilterType = {
  search?: string
  start_date?: string
  end_date?: string
  page?: number
  per_page?: number
  created_at_order?: 'ASC' | 'DESC'
}