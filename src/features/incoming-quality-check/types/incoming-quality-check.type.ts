import z from "zod"
import type { UserBasicTypes } from "../../../shared/types/user.type"
import type { StatusIncomingType } from "../../incoming/types/status-incoming.type"

// LIST DATA INCOMING QUALITY CHECK (GET ALL METHOD)
export type IncomingQualityCheckType = {
  id: number
  material_name: string
  supplier_name: string
  lot_number: string
  checking_date: string // format: YYYY-MM-DD
  check_lab: string // "0" atau "1"
  created_at: string // format: ISO datetime
  created_by: UserBasicTypes
  updated_at?: string
}

// DETAIL DATA INCOMING QUALITY CHECK (GET BY ID METHOD)
export type IncomingQualityCheckDetailType = {
  id: number
  material_name: string
  supplier_name: string
  lot_number: string
  checking_date: string // format: YYYY-MM-DD
  check_lab: string // "0" atau "1"
  created_at: string // format: ISO datetime
  created_by: UserBasicTypes
  documentation_photos: string[] // array of photo URLs
  description: string
  updated_at?: string
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

// DATA CREATE INCOMING QUALITY CHECK (POST METHOD) - FORMDATA
export const IncomingQualityCheckCreateSchema = z.object({
  incoming_id: z.string().min(1, 'Incoming ID is required'),
  documentation_photos: z
    .any()
    .refine((file) => file instanceof File || typeof file === 'string', 'Documentation photo is required'),
  checking_date: z.string().min(1, 'Checking date is required'), // format: YYYY-MM-DD example "2023-10-05"
  check_lab: z.string().min(1, 'Check lab is required'), // "0" atau "1"
  description: z.string().optional(),
  created_by: z.string().optional(), // Optional for user role != 'superadmin', 'admin'
})
export type IncomingQualityCheckCreateFormData = z.infer<typeof IncomingQualityCheckCreateSchema>

// DATA UPDATE INCOMING QUALITY CHECK (PATCH METHOD)
export const IncomingQualityCheckEditSchema = z.object({
  incoming_id: z.string().optional(),
  documentation_photos: z
    .any()
    .refine((file) => file instanceof File || typeof file === 'string', 'Documentation photo is required')
    .optional(),
  checking_date: z.string().optional(),
  check_lab: z.string().optional(),
  description: z.string().optional(),
})

export type IncomingQualityCheckEditFormData = z.infer<typeof IncomingQualityCheckEditSchema>
