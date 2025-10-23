import z from "zod"
import type { UserBasicTypes, UserTypes } from "../../../../shared/types/user.type"
import type { ProductionRequestOrderDetailType } from "../../production-request-order/types/production-request-order.type"



type ProductionRequestOrderReference = Pick<ProductionRequestOrderDetailType, 
  'lot_number' | 
  'product_id' |
  'document_number' |
  'po_number' |
  'status'
>

// LIST DATA ANALYSIS (GET ALL METHOD)
export type AnalysisType = {
  id: number
  lot_number: string
  lot_number_analysis: string
  date: string
  time: string
  bar_qty: number
  created_at: string
  created_by: UserTypes
  production_request_order: ProductionRequestOrderReference
}

// DETAIL DATA ANALYSIS (GET BY ID METHOD)
export type AnalysisDetailType = {
  id: number
  lot_number: string
  lot_number_analysis: string
  date: string
  time: string
  bar_qty: number
  created_at: string
  updated_at: string
  created_by: UserBasicTypes
  production_request_order: ProductionRequestOrderReference
}

// DATA SUBMIT ANALYSIS (POST METHOD)
export const AnalysisCreateSchema = z.object({
  lot_number: z.string().min(1, "Lot number is required"),
  lot_number_analysis: z.string().min(1, "Lot number analysis is required"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, "Invalid time format"),
  bar_qty: z
    .string()
    .min(1, "Bar quantity is required")
    .regex(/^\d+$/, "Bar quantity must be a positive number"),
  created_by: z.string().optional(),
})

export type AnalysisFormData = z.infer<typeof AnalysisCreateSchema>

// DATA SUBMIT BULK ANALYSIS (POST METHOD)
export const AnalysisBulkCreateSchema = z.object({
  analyst: z.array(AnalysisCreateSchema).min(1, "At least one analysis record is required"),
})

export type AnalysisBulkFormData = z.infer<typeof AnalysisBulkCreateSchema>

// DATA EDIT ANALYSIS (PATCH METHOD)
export const AnalysisEditSchema = z.object({
  lot_number: z.string().min(1, "Lot number is required"),
  lot_number_analysis: z.string().min(1, "Lot number analysis is required"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, "Invalid time format"),
  bar_qty: z
    .string()
    .min(1, "Bar quantity is required")
    .regex(/^\d+$/, "Bar quantity must be a positive number"),
})

export type AnalysisEditFormData = z.infer<typeof AnalysisEditSchema>
