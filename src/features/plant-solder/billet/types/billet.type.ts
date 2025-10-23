import z from "zod"
import type { UserBasicTypes, UserTypes } from "../../../../shared/types/user.type"

// LIST DATA BILLET (GET ALL METHOD)
export type BilletType = {
  id: number
  lot_number: string
  lot_number_billet: string
  start: number
  finish: number
  billet_qty: number
  weight: number
  width: number
  created_at: string
  created_by: UserTypes
}

// DETAIL DATA BILLET (GET BY ID METHOD)
export type BilletDetailType = {
  id: number
  lot_number: string
  lot_number_billet: string
  start: number
  finish: number
  billet_qty: number
  weight: number
  width: number
  created_at: string
  updated_at: string
  created_by: UserBasicTypes
}

// DATA SUBMIT BILLET (POST METHOD)
export const BilletCreateSchema = z.object({
  lot_number: z.string().min(1, "Lot number is required"),
  lot_number_billet: z.string().min(1, "Lot number billet is required"),
  start: z
    .string()
    .min(1, "Start is required")
    .regex(/^\d+$/, "Start must be a positive number"),
  finish: z
    .string()
    .min(1, "Finish is required")
    .regex(/^\d+$/, "Finish must be a positive number"),
  billet_qty: z
    .string()
    .min(1, "Billet quantity is required")
    .regex(/^\d+$/, "Billet quantity must be a positive number"),
  weight: z
    .string()
    .min(1, "Weight is required")
    .regex(/^\d+(\.\d+)?$/, "Weight must be a positive number"),
  width: z
    .string()
    .min(1, "Width is required")
    .regex(/^\d+(\.\d+)?$/, "Width must be a positive number"),
  created_by: z.string().optional(),
})

export type BilletFormData = z.infer<typeof BilletCreateSchema>

// DATA EDIT BILLET (PATCH METHOD)
export const BilletEditSchema = z.object({
  lot_number: z.string().min(1, "Lot number is required"),
  lot_number_billet: z.string().min(1, "Lot number billet is required"),
  start: z
    .string()
    .min(1, "Start is required")
    .regex(/^\d+$/, "Start must be a positive number"),
  finish: z
    .string()
    .min(1, "Finish is required")
    .regex(/^\d+$/, "Finish must be a positive number"),
  billet_qty: z
    .string()
    .min(1, "Billet quantity is required")
    .regex(/^\d+$/, "Billet quantity must be a positive number"),
  weight: z
    .string()
    .min(1, "Weight is required")
    .regex(/^\d+(\.\d+)?$/, "Weight must be a positive number"),
  width: z
    .string()
    .min(1, "Width is required")
    .regex(/^\d+(\.\d+)?$/, "Width must be a positive number"),
})

export type BilletEditFormData = z.infer<typeof BilletEditSchema>
