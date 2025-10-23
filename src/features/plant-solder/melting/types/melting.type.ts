import z from "zod"
import type { UserBasicTypes, UserTypes } from "../../../../shared/types/user.type"
import type { MaterialType } from "../../../master-data/raw-material"

// LIST DATA MELTING (GET ALL METHOD)
export type MeltingType = {
  id: number
  lot_number: string
  raw_material_name: string
  qty: number
  temperature: number
  time: string
  created_at: string
  created_by: UserTypes
}

// DETAIL DATA MELTING (GET BY ID METHOD)
export type MeltingDetailType = {
  id: number
  lot_number: string
  raw_mat_id: number
  raw_material: Pick<MaterialType, 'id' | 'material_name'>
  qty: number
  time: string
  temperature: number
  added_raw_mat_id: number
  added_raw_material: Pick<MaterialType, 'id' | 'material_name'>
  added_qty: number
  created_at: string
  updated_at: string
  created_by: UserBasicTypes
}

// DATA SUBMIT MELTING (POST METHOD)
export const MeltingCreateSchema = z.object({
  lot_number: z.string().min(1, "Lot number is required"),
  raw_mat_id: z.string().min(1, "Raw material is required"),
  qty: z
    .string()
    .min(1, "Quantity is required")
    .regex(/^\d+(\.\d+)?$/, "Quantity must be a positive number"),
  temperature: z
    .string()
    .min(1, "Temperature is required")
    .regex(/^\d+(\.\d+)?$/, "Temperature must be a non-negative number"),
  added_raw_mat_id: z.string().min(1, "Added raw material is required"),
  added_qty: z
    .string()
    .min(1, "Added quantity is required")
    .regex(/^\d+(\.\d+)?$/, "Added quantity must be a positive number"),
  created_by: z.string().optional(),
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
  raw_mat_id: z.string().min(1, "Raw material is required"),
  qty: z
    .string()
    .min(1, "Quantity is required")
    .regex(/^\d+(\.\d+)?$/, "Quantity must be a positive number"),
  temperature: z
    .string()
    .min(1, "Temperature is required")
    .regex(/^\d+(\.\d+)?$/, "Temperature must be a non-negative number"),
  added_raw_mat_id: z.string().min(1, "Added raw material is required"),
  added_qty: z
    .string()
    .min(1, "Added quantity is required")
    .regex(/^\d+(\.\d+)?$/, "Added quantity must be a positive number"),
})

export type MeltingEditFormData = z.infer<typeof MeltingEditSchema>
