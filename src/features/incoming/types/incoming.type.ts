import z from "zod"
import type { UserBasicTypes, UserTypes } from "../../../shared/types/user.type"
import type { SupplierType } from "../../master-data"
import type { MaterialType } from "../../master-data/raw-material"
import type { StatusIncomingType } from "./status-incoming.type"

// Nested type for incoming checks
export type IncomingCheckType = {
  id: number
  lot_number: string
  checking_qty: number
  checking_date: string
  description: string
  created_by: UserBasicTypes
}

// Nested type for quality control check
export type QualityControlCheckType = {
  id: number
  documentation_photos: string[]
  checking_date: string
  check_lab: string
  description: string
  created_by: UserBasicTypes
}

// Nested type for COA assessment parameter
export type ParameterType = {
  id: number
  parameter_name: string
  unit: string
}

// Nested type for COA assessment
export type CoaAssessmentType = {
  id: number
  parameter: ParameterType
  standarization_value: string | null
  assesment_value: string
  status: string
}

// Nested type for disposition raw material
export type DispositionRawMaterialType = {
  id: number
  checking_date: string
  decision_manager: string
  description: string
  created_by: UserBasicTypes
}

//LIST DATA INCOMING (GET ALL METHOD)
export type IncomingType = {
  id: number
  material_name: string
  plants: string[]
  supplier_name: string
  lot_number: string
  qty: number
  estimated_date: string
  coa_photos: string[]
  status: StatusIncomingType
  created_at: string
  created_by: UserTypes
}

//DETAIL DATA INCOMING (GET BY ID METHOD)
export type IncomingDetailType = {
  id: number
  material_name: string
  plants: string[]
  supplier_name: string
  lot_number: string
  qty: number
  estimated_date: string
  coa_photos: string[]
  status: string
  created_at: string
  created_by: UserBasicTypes
  raw_material: Pick<MaterialType, 'id' | 'material_name' | 'plants'>
  supplier: SupplierType
  description: string
  updated_at: string
  incoming_checks: IncomingCheckType | null
  quality_control_check: QualityControlCheckType | null
  coa_assesments: CoaAssessmentType[] | null
  disposition_raw_material: DispositionRawMaterialType | null
}

// DATA CREATE INCOMING (POST METHOD) - FORMDATA
export const IncomingCreateSchema = z.object({
  raw_mat_id: z.string().min(1, 'Raw material ID is required'),
  supplier_id: z.string().min(1, 'Supplier ID is required'),
  lot_number: z.string().min(1, 'Lot number is required'),
  qty: z.number().min(1, 'Quantity must be at least 1'),
  estimated_date: z.string().min(1, 'Estimated date is required'),
  coa_photos: z
    .array(z.any())
    .min(1, 'At least one COA photo is required')
    .refine(
      (files) => files.every((file) => file instanceof File),
      'All COA photos must be valid files'
    ),
  description: z.string().optional(),
  created_by: z.string().optional(), // Optional for user role != 'superadmin', 'admin'
})
export type IncomingCreateFormData = z.infer<typeof IncomingCreateSchema>

//DATA UPDATE INCOMING (PATCH METHOD) 
export const IncomingEditSchema = z.object({
  raw_mat_id: z.string().optional(),
  supplier_id: z.string().optional(),
  lot_number: z.string().optional(),
  qty: z.number().optional(),
  estimated_date: z.string().optional(),
  description: z.string().optional(),
})

export type IncomingEditFormData = z.infer<typeof IncomingEditSchema>



//DATA ADD MORE COA PHOTOS INCOMING (POST METHOD) - FORMDATA
export const IncomingAddCoaPhotosSchema = z.object({
  coa_photos: z
    .array(z.any())
    .min(1, 'At least one COA photo is required')
    .refine(
      (files) => files.every((file) => file instanceof File),
      'All COA photos must be valid files'
    ),
})

export type IncomingAddCoaPhotosFormData = z.infer<typeof IncomingAddCoaPhotosSchema>

//DATA CHANGE STATUS INCOMING (PATCH METHOD) 
export const IncomingChangeStatusSchema = z.object({
  status: z.enum([
    "ESTIMATION",
    "INCOMING",
    "QC_CHECK",
    "COA_CHECK",
    "LAB_CHECK",
    "NOT_OKAY_ASSESMENT",
    "FINISH_CHECKING",
    "CONSIDERATION",
    "RETURN"
  ])
})

export type IncomingChangeStatusFormData = z.infer<typeof IncomingChangeStatusSchema>
