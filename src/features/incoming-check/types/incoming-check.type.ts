import z from "zod"
import type { UserBasicTypes } from "../../../shared/types/user.type"
import type { StatusIncomingType } from "../../incoming/types/status-incoming.type"


// LIST DATA INCOMING CHECK (GET ALL METHOD)
export type IncomingCheckType = {
  id: number
  material_name: string
  supplier_name: string
  lot_number: string
  checking_qty: number
  checking_date: string // format: YYYY-MM-DD
  created_at: string // format: ISO datetime
  created_by: UserBasicTypes
}

// DETAIL DATA INCOMING CHECK (GET BY ID METHOD)
export type IncomingCheckDetailType = {
  id: number
  material_name: string
  supplier_name: string
  lot_number: string
  checking_qty: number
  checking_date: string // format: YYYY-MM-DD
  created_at: string // format: ISO datetime
  created_by: UserBasicTypes
  description: string
  updated_at: string
  incoming_raw_material: {
    id: number
    lot_number: string
    qty: number
    estimated_date: string
    status: StatusIncomingType
    created_at: string
    updated_at: string
  }
}

// DATA CREATE INCOMING CHECK (POST METHOD) - FORMDATA
export const IncomingCheckCreateSchema = z.object({
  incoming_id: z.string().min(1, 'Incoming ID is required'),
  lot_number: z.string().min(1, 'Lot number is required'),
  checking_qty: z.string().min(1, 'Checking quantity is required'),
  checking_date: z.string().min(1, 'Checking date is required'),
  coa_photo: z
    .any()
    .refine((file) => file instanceof File, 'COA photo is required'),
  description: z.string().optional(),
  created_by: z.string().optional(), // Optional for user role != 'superadmin', 'admin'
})
export type IncomingCheckCreateFormData = z.infer<typeof IncomingCheckCreateSchema>

// DATA UPDATE INCOMING CHECK (PATCH METHOD)
export const IncomingCheckEditSchema = z.object({
  incoming_id: z.string().optional(),
  lot_number: z.string().optional(),
  checking_qty: z.string().optional(),
  checking_date: z.string().optional(),
  coa_photo: z
    .any()
    .refine((file) => file instanceof File || typeof file === 'string', 'COA photo is required')
    .optional(),
  description: z.string().optional(),
})

export type IncomingCheckEditFormData = z.infer<typeof IncomingCheckEditSchema>