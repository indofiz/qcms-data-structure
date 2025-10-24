import z from "zod"
import type { UserTypes} from "../../../shared/types/user.type"

//DELIVERY PARTNER TYPE
export type DeliveryPartnerType = {
  id: number
  company_name: string
  address: string
  phone: string
  fax: string
  email: string
  active: boolean
  created_at: string
  updated_at: string
}

//PACKING LIST INFO TYPE (FOR RO)
export type PackingListInfoType = {
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
}

//DELIVERY ORDER TYPE
export type DeliveryOrderType = {
  do_number: string
  ro_number: string
  ro_date: string
  si_number: string
  si_date: string
  wh_signed: number | null
  qc_signed: number | null
  delivery_partner_id: number
  status: string
  note: string
  created_at: string
  updated_at: string
}

//LIST DATA RELEASE ORDER (GET ALL METHOD)
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
  packing_list: PackingListInfoType
  wh_signed_user: UserTypes | null
  qc_signed_user: UserTypes | null
  release_to_delivery_partner: DeliveryPartnerType
}

//DROPDOWN RO LIST (GET DROPDOWN METHOD)
export type ReleaseOrderDropdownType = {
  ro_number: string
  si_number: string
  ro_date: string
}

//DETAIL DATA RELEASE ORDER (GET BY ID METHOD)
export type ReleaseOrderDetailType = {
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
  packing_list: PackingListInfoType
  wh_signed_user: UserTypes | null
  qc_signed_user: UserTypes | null
  release_to_delivery_partner: DeliveryPartnerType
  delivery_orders: DeliveryOrderType[]
}

//DATA CREATE RELEASE ORDER (POST METHOD)
export const ReleaseOrderCreateSchema = z.object({
  ro_number: z.string().min(1, 'Release order number is required'),
  pl_number: z.string().min(1, 'Packing list number is required'),
  ro_date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date format'),
  si_number: z.string().min(1, 'Shipping instruction number is required'),
  si_date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date format'),
  wh_signed: z.string().min(1, 'Warehouse signatory is required'),
  qc_signed: z.string().min(1, 'QC signatory is required'),
  release_to: z.string().min(1, 'Delivery partner is required'),
  container_number: z.string().min(1, 'Container number is required'),
  seal_number: z.string().min(1, 'Seal number is required'),
  vehicle_number: z.string().min(1, 'Vehicle number is required'),
  vessel_name: z.string().min(1, 'Vessel name is required'),
  pod: z.string().min(1, 'Port of destination is required'),
  status: z.string().min(1, 'Status is required'),
  note: z.string().optional(),
})

export type ReleaseOrderFormData = z.infer<typeof ReleaseOrderCreateSchema>

//DATA UPDATE RELEASE ORDER (PATCH METHOD)
export const ReleaseOrderUpdateSchema = z.object({
  pl_number: z.string().min(1, 'Packing list number is required'),
  ro_date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date format'),
  si_number: z.string().min(1, 'Shipping instruction number is required'),
  si_date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date format'),
  wh_signed: z.string().min(1, 'Warehouse signatory is required'),
  qc_signed: z.string().min(1, 'QC signatory is required'),
  release_to: z.string().min(1, 'Delivery partner is required'),
  container_number: z.string().min(1, 'Container number is required'),
  seal_number: z.string().min(1, 'Seal number is required'),
  vehicle_number: z.string().min(1, 'Vehicle number is required'),
  status: z.string().min(1, 'Status is required'),
  note: z.string().optional(),
})

export type ReleaseOrderUpdateFormData = z.infer<typeof ReleaseOrderUpdateSchema>

//DATA UPDATE CHECKLIST (POST METHOD)
export const ReleaseOrderUpdateChecklistSchema = z.object({
  ro_number: z.string().min(1, 'Release order number is required'),
  note: z.string().min(1, 'Note is required'),
  status: z.string().min(1, 'Status is required'),
})

export type ReleaseOrderUpdateChecklistFormData = z.infer<typeof ReleaseOrderUpdateChecklistSchema>
