import z from "zod"
import type { UserBasicTypes, UserTypes } from "../../../../shared/types/user.type"

// LIST DATA MIXING (GET ALL METHOD)
export type MixingType = {
  id: number
  lot_number: string
  lot_number_mixing: string
  duration: number
  actual_duration: number
  temperature: number
  actual_temperature: number
  motor_scale: number
  actual_motor: number
  qty: number
  created_at: string
  created_by: UserTypes
}

// DETAIL DATA MIXING (GET BY ID METHOD)
export type MixingDetailType = {
  id: number
  lot_number: string
  lot_number_mixing: string
  duration: number
  actual_duration: number
  temperature: number
  actual_temperature: number
  motor_scale: number
  actual_motor: number
  qty: number
  created_at: string
  updated_at: string
  created_by: UserBasicTypes
}

// DATA SUBMIT MIXING (POST METHOD)
export const MixingCreateSchema = z.object({
  lot_number: z.string().min(1, "Lot number is required"),
  lot_number_mixing: z.string().min(1, "Lot number mixing is required"),
  duration: z
    .string()
    .min(1, "Duration is required")
    .regex(/^\d+(\.\d+)?$/, "Duration must be a positive number"),
  quantity_kg: z
    .string()
    .min(1, "Quantity is required")
    .regex(/^\d+(\.\d+)?$/, "Quantity must be a positive number"),
  actual_duration: z
    .string()
    .min(1, "Actual duration is required")
    .regex(/^\d+(\.\d+)?$/, "Actual duration must be a positive number"),
  temperature: z
    .string()
    .min(1, "Temperature is required")
    .regex(/^\d+(\.\d+)?$/, "Temperature must be a positive number"),
  actual_temperature: z
    .string()
    .min(1, "Actual temperature is required")
    .regex(/^\d+(\.\d+)?$/, "Actual temperature must be a positive number"),
  motor_scale: z
    .string()
    .min(1, "Motor scale is required")
    .regex(/^\d+(\.\d+)?$/, "Motor scale must be a positive number"),
  actual_motor: z
    .string()
    .min(1, "Actual motor is required")
    .regex(/^\d+(\.\d+)?$/, "Actual motor must be a positive number"),
  qty: z
    .string()
    .min(1, "Quantity is required")
    .regex(/^\d+(\.\d+)?$/, "Quantity must be a positive number"),
  created_by: z.string().optional(),
})

export type MixingFormData = z.infer<typeof MixingCreateSchema>

// DATA SUBMIT BULK MIXING (POST METHOD)
export const MixingBulkCreateSchema = z.object({
  mixing: z.array(MixingCreateSchema).min(1, "At least one mixing record is required"),
})

export type MixingBulkFormData = z.infer<typeof MixingBulkCreateSchema>

// DATA EDIT MIXING (PATCH METHOD)
export const MixingEditSchema = z.object({
  lot_number: z.string().min(1, "Lot number is required"),
  lot_number_mixing: z.string().min(1, "Lot number mixing is required"),
  duration: z
    .string()
    .min(1, "Duration is required")
    .regex(/^\d+(\.\d+)?$/, "Duration must be a positive number"),
  quantity_kg: z
    .string()
    .min(1, "Quantity is required")
    .regex(/^\d+(\.\d+)?$/, "Quantity must be a positive number"),
  actual_duration: z
    .string()
    .min(1, "Actual duration is required")
    .regex(/^\d+(\.\d+)?$/, "Actual duration must be a positive number"),
  temperature: z
    .string()
    .min(1, "Temperature is required")
    .regex(/^\d+(\.\d+)?$/, "Temperature must be a positive number"),
  actual_temperature: z
    .string()
    .min(1, "Actual temperature is required")
    .regex(/^\d+(\.\d+)?$/, "Actual temperature must be a positive number"),
  motor_scale: z
    .string()
    .min(1, "Motor scale is required")
    .regex(/^\d+(\.\d+)?$/, "Motor scale must be a positive number"),
  actual_motor: z
    .string()
    .min(1, "Actual motor is required")
    .regex(/^\d+(\.\d+)?$/, "Actual motor must be a positive number"),
  qty: z
    .string()
    .min(1, "Quantity is required")
    .regex(/^\d+(\.\d+)?$/, "Quantity must be a positive number"),
})

export type MixingEditFormData = z.infer<typeof MixingEditSchema>
