import z from "zod"
import type { UserBasicTypes, UserTypes } from "../../../shared/types/user.type"
import type { SupplierType } from "../../master-data"
import type { MaterialType } from "../../master-data/raw-material"
import type { StatusIncomingType } from "./status-incoming.type"

//LIST DATA INCOMING (GET ALL METHOD)
export type IncomingType = {
  id: number
  material_name: string
  plants: string[]
  supplier_name: string
  lot_number: string
  qty: string
  estimated_date: string
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
  qty: string
  estimated_date: string
  status: string
  created_at: string
  created_by: UserBasicTypes
  raw_material: Pick<MaterialType, 'id' | 'material_name' | 'plants'>
  supplier: SupplierType
  description: string
  updated_at: string
}

//DATA SUBMIT INCOMING (POST METHOD)
export const IncomingCreateSchema = z.object({
  raw_mat_id: z.string().min(1, 'Material is required'),
  supplier_id: z.string().min(1, 'Supplier is required'),
  lot_number: z.string().min(1, 'Lot number is required'),
  qty: z
    .string()
    .min(1, 'Quantity is required')
    .regex(/^\d+(\.\d+)?$/, 'Quantity must be a positive number'),
  estimated_date: z.string().refine((val) => !isNaN(Date.parse(val))),
  description: z.string().optional(),
  created_by: z.string().optional(), // Optional for edit, may not be editable
});

export type IncomingFormData = z.infer<typeof IncomingCreateSchema>;

//DATA APPROVE INCOMING (PATCH METHOD)
export const IncomingApproveSchema = z.object({
  id: z.number(),
  status: z.enum(["APPROVED", "REJECTED"]),
  notes: z.string().optional(),
  inspector_name: z.string(),
});

export type IncomingApproveFormData = z.infer<typeof IncomingApproveSchema>;


//DATA EDIT INCOMING (PATCH METHOD)
export const IncomingEditSchema = z.object({
  raw_mat_id: z.string().min(1, 'Material is required'),
  supplier_id: z.string().min(1, 'Supplier is required'),
  lot_number: z.string().min(1, 'Lot number is required'),
  qty: z
    .string()
    .min(1, 'Quantity is required')
    .regex(/^\d+(\.\d+)?$/, 'Quantity must be a positive number'),
  estimated_date: z.string().refine((val) => !isNaN(Date.parse(val))),
  description: z.string().optional(),
  created_by: z.string().optional(), // Optional for edit, may not be editable
})

export type IncomingEditFormData = z.infer<typeof IncomingEditSchema>
