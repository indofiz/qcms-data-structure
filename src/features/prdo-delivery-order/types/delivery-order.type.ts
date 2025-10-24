import z from "zod"
import type {  UserTypes } from "../../../shared/types/user.type"

//DELIVERY PARTNER TYPE (FOR DO)
export type DeliveryPartnerType = {
  id: number
  company_name: string
  address: string
  phone: string
  fax: string | null
  email: string
  active: boolean
  created_at: string
  updated_at: string
}

//LIST DATA DELIVERY ORDER (GET ALL METHOD)
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
  wh_signed_user: UserTypes | null
  qc_signed_user: UserTypes | null
  delivery_partner: DeliveryPartnerType
}

//DETAIL DATA DELIVERY ORDER (GET BY ID METHOD)
export type DeliveryOrderDetailType = {
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
  wh_signed_user: UserTypes | null
  qc_signed_user: UserTypes | null
  delivery_partner: DeliveryPartnerType
}

//DATA CREATE DELIVERY ORDER (POST METHOD)
export const DeliveryOrderCreateSchema = z.object({
  do_number: z.string().min(1, 'Delivery order number is required'),
  ro_number: z.string().min(1, 'Release order number is required'),
  ro_date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date format'),
  si_number: z.string().min(1, 'Shipping instruction number is required'),
  si_date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date format'),
  wh_signed: z.string().min(1, 'Warehouse signatory is required'),
  qc_signed: z.string().min(1, 'QC signatory is required'),
  delivery_partner_id: z.string().min(1, 'Delivery partner is required'),
  status: z.string().min(1, 'Status is required'),
  note: z.string().optional(),
})

export type DeliveryOrderFormData = z.infer<typeof DeliveryOrderCreateSchema>

//DATA UPDATE DELIVERY ORDER (PATCH METHOD)
export const DeliveryOrderUpdateSchema = z.object({
  ro_number: z.string().min(1, 'Release order number is required'),
  ro_date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date format'),
  si_number: z.string().min(1, 'Shipping instruction number is required'),
  si_date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date format'),
  wh_signed: z.string().min(1, 'Warehouse signatory is required'),
  qc_signed: z.string().min(1, 'QC signatory is required'),
  delivery_partner_id: z.string().min(1, 'Delivery partner is required'),
  status: z.string().min(1, 'Status is required'),
  note: z.string().optional(),
})

export type DeliveryOrderUpdateFormData = z.infer<typeof DeliveryOrderUpdateSchema>
