/**
 * Product Types
 */

import { MasterDataBaseEntity } from '@/shared/types/master-data/base.types'
import z from 'zod'
import { PlantType } from '../../plants/types'

// Product entity (for list view)
export interface ProductType extends MasterDataBaseEntity {
  product_name: string
  product_code: string
  company_name: string
  activate: string
  product_type_code: string
  plant: {
    id: number
    plant_name: string
  }
  solder_type: string | null
}

// Detailed product entity (for detail view)
export interface DetailProductType extends MasterDataBaseEntity {
  product_name: string
  product_code: string
  company_name: string
  activate: string // 0 or 1
  product_type_code: string
  plant: Pick<PlantType, 'id' | 'plant_name'>
  solder_type: string | null
  created_at: string
  updated_at: string
}

export const productRequestSchema = z.object({
  product_name: z.string().min(1, 'Product name is required'),
  product_code: z.string().min(1, 'Product code is required'),
  company_name: z.string().min(1, 'Company name is required'),
  activate: z.number().int(), // karena datanya 1 (number), bisa juga boolean transform
  product_type_code: z.string().min(1, 'Product type is required'),
  plant_id: z.string().min(1, 'plant_id is required'),
})

export type ProductRequestType = z.infer<typeof productRequestSchema>
