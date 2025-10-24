import z from "zod"

// LIST DATA MELTING (GET ALL METHOD)
export type MeltingType = {
  id: number
  lot_number: string
  raw_mat_id: number
  qty: number
  time: string
  temperature: number
  added_raw_mat_id: number
  added_qty: number
  created_at: string
  updated_at: string
}

// DETAIL DATA MELTING (GET BY ID METHOD)
export type MeltingDetailType = {
  id: number
  lot_number: string
  raw_mat_id: number
  qty: number
  time: string
  temperature: number
  added_raw_mat_id: number
  added_qty: number
  created_at: string
  updated_at: string
}

// DATA SUBMIT MELTING (POST METHOD)
export const MeltingCreateSchema = z.object({
  lot_number: z.string().min(1, "Lot number is required"),
  raw_mat_id: z.number(),
  qty: z.number().positive("Quantity must be a positive number"),
  temperature: z.number().nonnegative("Temperature must be a non-negative number"),
  added_raw_mat_id: z.number(),
  added_qty: z.number().positive("Added quantity must be a positive number"),
})

export type MeltingFormData = z.infer<typeof MeltingCreateSchema>

// DATA SUBMIT BULK MELTING (POST METHOD)
export const MeltingBulkCreateSchema = z.object({
  melting: z.array(MeltingCreateSchema).min(1, "At least one melting record is required"),
})

export type MeltingBulkFormData = z.infer<typeof MeltingBulkCreateSchema>

// DATA EDIT MELTING (PATCH METHOD)
export const MeltingEditSchema = z.object({
  lot_number: z.string().min(1, "Lot number is required"),
  raw_mat_id: z.number(),
  qty: z.number().positive("Quantity must be a positive number"),
  temperature: z.number().nonnegative("Temperature must be a non-negative number"),
  added_raw_mat_id: z.number(),
  added_qty: z.number().positive("Added quantity must be a positive number"),
})

export type MeltingEditFormData = z.infer<typeof MeltingEditSchema>
