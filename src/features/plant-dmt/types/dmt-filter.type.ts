/**
 * Filter State Interface
 */
export interface DmtFilterState {
  search: string;
  page: number | string;
  per_page: number | string;
  status: string; // Comma-separated: "WAITING,QC_CHECK,SAMPLING,FINISHED"
  created_at_order: 'ASC' | 'DESC';
}