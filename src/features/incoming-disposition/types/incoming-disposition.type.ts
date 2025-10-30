import z from "zod"
import type { UserBasicTypes } from "../../../shared/types/user.type"
import type { StatusIncomingType } from "../../incoming/types/status-incoming.type"

// LIST DATA INCOMING DISPOSITION (GET ALL METHOD)
export type IncomingDispositionType = {
  id: number
  material_name: string
  supplier_name: string
  lot_number: string
  description: string
  checking_date: string // format: YYYY-MM-DD
  decision_manager: string // "0" atau "1"
  created_at: string // format: ISO datetime
  created_by: UserBasicTypes
}

// DETAIL DATA INCOMING DISPOSITION (GET BY ID METHOD)
export type IncomingDispositionDetailType = {
  id: number
  material_name: string
  supplier_name: string
  lot_number: string
  description: string
  checking_date: string // format: YYYY-MM-DD
  decision_manager: string // "0" atau "1"
  created_at: string // format: ISO datetime
  created_by: UserBasicTypes
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

// DATA CREATE INCOMING DISPOSITION (POST METHOD)
export const IncomingDispositionCreateSchema = z.object({
  incoming_id: z.string().min(1, 'Incoming ID is required'),
  checking_date: z.string().min(1, 'Checking date is required'), // format: YYYY-MM-DD
  description: z.string().min(1, 'Description is required'),
  created_by: z.string().optional(), // Optional for user role != 'superadmin', 'admin'
})
export type IncomingDispositionCreateFormData = z.infer<typeof IncomingDispositionCreateSchema>

// DATA UPDATE INCOMING DISPOSITION (PATCH METHOD)
export const IncomingDispositionEditSchema = z.object({
  checking_date: z.string().optional(),
  description: z.string().optional(),
  created_by: z.string().optional(),
})

export type IncomingDispositionEditFormData = z.infer<typeof IncomingDispositionEditSchema>

// DATA CHANGE DECISION MANAGER (PATCH METHOD)
export const IncomingDispositionChangeDecisionSchema = z.object({
  decision_manager: z.enum(["0", "1"]),
})

export type IncomingDispositionChangeDecisionFormData = z.infer<typeof IncomingDispositionChangeDecisionSchema>
