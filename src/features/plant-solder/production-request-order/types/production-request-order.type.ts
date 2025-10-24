import z from "zod"

// Enum types
export type ProductionStatus = "WAITING" | "PROCESSING" | "FINISHED"
export type QCResult = "PASSED" | "NOT_PASSED"

// Status validation schemas
export const productionStatusSchema = z.enum(["WAITING", "PROCESSING", "FINISHED"])
export const qcResultSchema = z.enum(["PASSED", "NOT_PASSED"])

// LIST DATA PRODUCTION REQUEST ORDER (GET ALL METHOD)
export type ProductionRequestOrderType = {
  lot_number: string
  product_id: number
  document_number: string
  po_number: string
  timestamp: string
  status: ProductionStatus
  result_qc: QCResult | null
  note: string | null
  production_name: number | null
  qc_name: number | null
  spv_name: number | null
  created_at: string
  updated_at: string
}

// DETAIL DATA PRODUCTION REQUEST ORDER (GET BY ID METHOD)
export type ProductionRequestOrderDetailType = {
  lot_number: string
  product_id: number
  document_number: string
  po_number: string
  timestamp: string
  status: ProductionStatus
  result_qc: QCResult | null
  note: string | null
  production_name: number | null
  qc_name: number | null
  spv_name: number | null
  created_at: string
  updated_at: string
}

// DATA SUBMIT PRODUCTION REQUEST ORDER (POST METHOD)
export const ProductionRequestOrderCreateSchema = z.object({
  lot_number: z.string().min(1, "Lot number is required"),
  product_id: z.string().min(1, "Product is required"),
  po_number: z.string().min(1, "PO number is required"),
  document_number: z.string().min(1, "Document number is required"),
  created_by: z.string().optional(),
})

export type ProductionRequestOrderFormData = z.infer<typeof ProductionRequestOrderCreateSchema>

// DATA UPDATE PRODUCTION STATUS (PATCH METHOD)
export const ProductionStatusUpdateSchema = z.object({
  status: productionStatusSchema,
  spv_name: z.string().min(1, "Supervisor is required"),
})

export type ProductionStatusUpdateFormData = z.infer<typeof ProductionStatusUpdateSchema>

// DATA UPDATE QC RESULT (PATCH METHOD)
export const ProductionQCResultUpdateSchema = z.object({
  result_qc: qcResultSchema,
  note: z.string().optional(),
  qc_name: z.string().min(1, "QC inspector is required"),
})

export type ProductionQCResultUpdateFormData = z.infer<typeof ProductionQCResultUpdateSchema>

// DATA EDIT PRODUCTION REQUEST ORDER (PATCH METHOD)
export const ProductionRequestOrderEditSchema = z.object({
  lot_number: z.string().min(1, "Lot number is required"),
  product_id: z.string().min(1, "Product is required"),
  po_number: z.string().min(1, "PO number is required"),
  document_number: z.string().min(1, "Document number is required"),
})

export type ProductionRequestOrderEditFormData = z.infer<typeof ProductionRequestOrderEditSchema>
