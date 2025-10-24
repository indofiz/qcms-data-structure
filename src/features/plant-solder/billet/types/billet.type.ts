import z from "zod"

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
  updated_at: string
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
}

// DATA SUBMIT BILLET (POST METHOD)
export const BilletCreateSchema = z.object({
  lot_number: z.string().min(1, "Lot number is required"),
  lot_number_billet: z.string().min(1, "Lot number billet is required"),
  start: z.number().positive("Start must be a positive number"),
  finish: z.number().positive("Finish must be a positive number"),
  billet_qty: z.number().positive("Billet quantity must be a positive number"),
  weight: z.number().positive("Weight must be a positive number"),
  width: z.number().positive("Width must be a positive number"),
  created_by: z.string().optional(),
})

export type BilletFormData = z.infer<typeof BilletCreateSchema>

// DATA EDIT BILLET (PATCH METHOD)
export const BilletEditSchema = z.object({
  lot_number: z.string().min(1, "Lot number is required"),
  lot_number_billet: z.string().min(1, "Lot number billet is required"),
  start: z.number().positive("Start must be a positive number"),
  finish: z.number().positive("Finish must be a positive number"),
  billet_qty: z.number().positive("Billet quantity must be a positive number"),
  weight: z.number().positive("Weight must be a positive number"),
  width: z.number().positive("Width must be a positive number"),
})

export type BilletEditFormData = z.infer<typeof BilletEditSchema>
