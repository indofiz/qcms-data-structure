import z from "zod"
import type {  UserTypes } from "../../../shared/types/user.type"

//CUSTOMER COMPANY TYPE
export type CustomerCompanyType = {
  id: number
  company_name: string
  address: string
  phone: string
  fax: string
  email: string
  active: boolean
  foreign: boolean
  created_at: string
  updated_at: string
}

//LIST ALL DATA PL (GET ALL METHOD)
export type PackingListType = {
  pl_number: string
  pl_date: string
  po_number: string
  sold_to: number
  term_of_delivery: string
  signed: number
  wh_name: number
  status: string
  status_pl: string
  note: string
  created_at: string
  updated_at: string
  customer_company: CustomerCompanyType
  signed_user: UserTypes | null
  warehouse_user: UserTypes | null
}

//DROPDOWN PL LIST (GET DROPDOWN METHOD)
export type PackingListDropdownType = {
  pl_number: string
  po_number: string
  pl_date: string
}

//ORDERING GOODS TYPE
export type OrderingGoodsType = {
  id: number
  description: string
  qty: string
  pkgs: number
  gw: number
  nw: number
  measurement: number
  lot_number: string
  hdpe_drum_info: string
  pl_number: string
  created_at: string
  updated_at: string
}

//RELEASE ORDER TYPE
export type ReleaseOrderType = {
  ro_number: string
  pl_number: string
  ro_date: string
  si_number: string
  si_date: string
  wh_signed: number
  qc_signed: number
  release_to: number
  container_number: string
  seal_number: string
  vehicle_number: string
  vessel_name: string
  pod: string
  status: string
  note: string
  created_at: string
  updated_at: string
}

//DETAIL DATA PL (GET BY PL NUMBER METHOD)
export type PackingListDetailType = {
  pl_number: string
  pl_date: string
  po_number: string
  sold_to: number
  term_of_delivery: string
  signed: number
  wh_name: number
  status: string
  status_pl: string
  note: string
  created_at: string
  updated_at: string
  customer_company: CustomerCompanyType
  signed_user: UserTypes | null
  warehouse_user: UserTypes | null
  ordering_goods: OrderingGoodsType[]
  release_orders: ReleaseOrderType[]
}

//DATA CREATE PL (POST METHOD)
export const PackingListCreateSchema = z.object({
  pl_number: z.string().min(1, 'Packing list number is required'),
  pl_date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date format'),
  po_number: z.string().min(1, 'Purchase order number is required'),
  sold_to: z.string().min(1, 'Customer company is required'),
  term_of_delivery: z.string().min(1, 'Term of delivery is required'),
  signed: z.string().min(1, 'Signed user is required'),
})

export type PackingListFormData = z.infer<typeof PackingListCreateSchema>

//ORDERING GOODS ITEM SCHEMA FOR BULK CREATE
export const OrderingGoodsItemSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  qty: z.string().min(1, 'Quantity is required'),
  pkgs: z.string().min(1, 'Packages is required'),
  gw: z.string().min(1, 'Gross weight is required'),
  nw: z.string().min(1, 'Net weight is required'),
  measurement: z.string().min(1, 'Measurement is required'),
})

export type OrderingGoodsItemFormData = z.infer<typeof OrderingGoodsItemSchema>

//DATA CREATE BULK PL (POST METHOD)
export const PackingListCreateBulkSchema = z.object({
  pl_number: z.string().min(1, 'Packing list number is required'),
  pl_date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date format'),
  po_number: z.string().min(1, 'Purchase order number is required'),
  sold_to: z.string().min(1, 'Customer company is required'),
  term_of_delivery: z.string().min(1, 'Term of delivery is required'),
  signed: z.string().min(1, 'Signed user is required'),
  ordering_goods: z.array(OrderingGoodsItemSchema).min(1, 'At least one ordering good is required'),
})

export type PackingListBulkFormData = z.infer<typeof PackingListCreateBulkSchema>

//DATA UPDATE PL (PATCH METHOD)
export const PackingListUpdateSchema = z.object({
  pl_date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date format'),
  po_number: z.string().min(1, 'Purchase order number is required'),
  sold_to: z.string().min(1, 'Customer company is required'),
  term_of_delivery: z.string().min(1, 'Term of delivery is required'),
  signed: z.string().min(1, 'Signed user is required'),
})

export type PackingListUpdateFormData = z.infer<typeof PackingListUpdateSchema>

//DATA UPDATE STATUS QC (POST METHOD)
export const PackingListUpdateStatusQCSchema = z.object({
  pl_number: z.string().min(1, 'Packing list number is required'),
  note: z.string().min(1, 'Note is required'),
  status: z.string().min(1, 'Status is required'),
})

export type PackingListUpdateStatusQCFormData = z.infer<typeof PackingListUpdateStatusQCSchema>

//DATA UPDATE STATUS PL (POST METHOD)
export const PackingListUpdateStatusPLSchema = z.object({
  pl_number: z.string().min(1, 'Packing list number is required'),
  status_pl: z.string().min(1, 'Packing list status is required'),
})

export type PackingListUpdateStatusPLFormData = z.infer<typeof PackingListUpdateStatusPLSchema>
