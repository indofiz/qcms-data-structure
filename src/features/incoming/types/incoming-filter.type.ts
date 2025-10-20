import type { StatusIncomingType } from "./status-incoming.type";

export type IncomingFilterType = {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
    status?: StatusIncomingType;
    search?: string;
}