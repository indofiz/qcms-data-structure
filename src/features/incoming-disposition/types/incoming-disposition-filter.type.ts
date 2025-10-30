/**
 * Filter State Interface
 */
export interface IncomingDispositionFilterState {
  search: string;
  page: number | string;
  per_page: number | string;
  created_at_order: 'ASC' | 'DESC';
  start_date: string;
  end_date: string;
}
