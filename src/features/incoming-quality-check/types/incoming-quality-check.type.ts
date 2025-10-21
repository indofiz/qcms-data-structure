import z from "zod"
import type { UserBasicTypes } from "../../../shared/types/user.type"
import type { IncomingType } from "../../incoming/types/incoming.type"


//DATA GET ALL INCOMING QUALITY CHECK (GET ALL METHOD)
export type IncomingQualityCheckType = {
    id: number
   material_name: string
   supplier_name: string
   lot_number: string
   checking_date: string // format: YYYY-MM-DD
   check_lab: string // "0" atau "1"
   created_at: string // format: ISO datetime
   created_by: UserBasicTypes
   updated_at?: string
}

//DETAIL DATA INCOMING QUALITY CHECK (GET BY ID METHOD)
export type IncomingQualityCheckDetailType = {
    id: number
   material_name: string
   supplier_name: string
   lot_number: string  
    checking_date: string // format: YYYY-MM-DD
   check_lab: string // "0" atau "1"
    created_at: string // format: ISO datetime
   created_by: UserBasicTypes
    documentation_photos: string[] // array of photo URLs
    description: string
    updated_at?: string
    incoming_raw_material: 
      Pick<IncomingType, 'id' | 'lot_number' | 'qty' | 'estimated_date' | 'status' | 'created_at'>   
}


//DATA SUBMIT INCOMING QUALITY CHECK (POST METHOD)
export const IncomingQualityCheckCreateSchema = z.object({
    incoming_id: z.string().min(1, 'Incoming ID is required'),
    
})