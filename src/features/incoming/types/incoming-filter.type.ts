import type { StatusIncomingType } from "./status-incoming.type";

export type IncomingFilterType = {
  search?: string
  status?: StatusIncomingType | ''
  start_date?: string
  end_date?: string
  page?: number
  per_page?: number
  created_at_order?: 'ASC' | 'DESC'
  plant?: string
}