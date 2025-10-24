import z from "zod"

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
  updated_at: string
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
}

// DATA SUBMIT MIXING (POST METHOD)
export const MixingCreateSchema = z.object({
  lot_number: z.string().min(1, "Lot number is required"),
  lot_number_mixing: z.string().min(1, "Lot number mixing is required"),
  duration: z.number().positive("Duration must be a positive number"),
  quantity_kg: z.number().positive("Quantity must be a positive number"),
  actual_duration: z.string().min(1, "Actual duration is required"),
  temperature: z.number().positive("Temperature must be a positive number"),
  actual_temperature: z.number().positive("Actual temperature must be a positive number"),
  motor_scale: z.number().positive("Motor scale must be a positive number"),
  actual_motor: z.number().positive("Actual motor must be a positive number"),
  qty: z.number().positive("Quantity must be a positive number"),
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
  duration: z.number().positive("Duration must be a positive number"),
  quantity_kg: z.number().positive("Quantity must be a positive number"),
  actual_duration: z.string().min(1, "Actual duration is required"),
  temperature: z.number().positive("Temperature must be a positive number"),
  actual_temperature: z.number().positive("Actual temperature must be a positive number"),
  motor_scale: z.number().positive("Motor scale must be a positive number"),
  actual_motor: z.number().positive("Actual motor must be a positive number"),
  qty: z.number().positive("Quantity must be a positive number"),
})

export type MixingEditFormData = z.infer<typeof MixingEditSchema>
