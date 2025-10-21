import z from "zod"
import type { UserBasicTypes } from "../../../shared/types/user.type"
import type { IncomingType } from "../../incoming/types/incoming.type"


//LIST DATA INCOMING CHECK (GET ALL METHOD)
export type IncomingCheckType = {
  id: number
  material_name: string
  supplier_name: string
  lot_number: string
  checking_qty: string // bisa diganti number kalau memang harus angka
  checking_date: string // atau Date kalau mau langsung jadi object Date
  created_at: string // timestamp
  created_by: UserBasicTypes
}

//DETAIL DATA INCOMING CHECK (GET BY ID METHOD)
export type IncomingCheckDetailType = {
  id: number
  material_name: string
  supplier_name: string
  lot_number: string
  checking_date: string // YYYY-MM-DD
  check_lab: string // 0 atau 1
  created_at: string
  created_by: UserBasicTypes
  documentation_photos: string[]
  description: string
  updated_at: string
  incoming_raw_material: Pick<
    IncomingType,
    | 'id'
    | 'lot_number'
    | 'qty'
    | 'estimated_date'
    | 'status'
    | 'created_at'
    | 'created_by'
  >
}

//DATA SUBMIT INCOMING CHECK (POST METHOD) - FORMDATA
export const IncomingCheckCreateSchema = z.object({
  incoming_id: z.string().min(1, 'Incoming ID is required'),
  lot_number: z.string().min(1, 'Lot number is required'),
    checking_qty: z.string().min(1, 'Checking quantity is required'),
    checking_date: z.string().min(1, 'Checking date is required'),
    coa_photo: z
    .any()
    .refine((file) => file instanceof File, 'COA photo is required'),
    description: z.string().optional(),
    created_by: z.string().optional(), // Optional for user role != 'superadmin', 'admin'
});

export type IncomingCheckFormData = z.infer<typeof IncomingCheckCreateSchema>;

//DATA EDIT INCOMING CHECK (PATCH METHOD) - FORMDATA
export const IncomingCheckEditSchema = z.object({
  incoming_id: z.string().min(1, 'Incoming ID is required'),
  lot_number: z.string().min(1, 'Lot number is required'),
    checking_qty: z.string().min(1, 'Checking quantity is required'),
    checking_date: z.string().min(1, 'Checking date is required'),
    coa_photo: z
    .any()
    .refine((file) => file instanceof File || typeof file === 'string', 'COA photo is required'),
    description: z.string().optional(),
    created_by: z.string().optional(), // Optional for user role != 'superadmin', 'admin'
});