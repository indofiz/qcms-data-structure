import type { StatusIncomingType } from "./status-incoming.type";

/**
 * Filter State Interface
 */
export interface IncomingFilterState {
  search: string;
  page: number | string;
  per_page: number | string;
  created_at_order: 'ASC' | 'DESC';
  status: string; // StatusIncomingType or comma-separated values
  start_date: string;
  end_date: string;
  plant: string;
}