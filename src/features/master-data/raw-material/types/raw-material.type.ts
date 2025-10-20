/**
 * Raw Material Types
 */

import z from 'zod'
import { PlantType } from '../../plants'
import { CategoryType } from '../../category'
import type { MasterDataBaseEntity } from '../../../../shared/types/base-masterdata.type'

// Raw Material entity (for list view)
export interface MaterialType extends MasterDataBaseEntity {
  material_name: string
  formula: string | null
  category: string
  plants: string[]
}

// Detailed raw material entity (for detail view - with nested objects)
export interface DetailMaterialType extends MasterDataBaseEntity {
  material_name: string
  formula: string | null
  category: Pick<CategoryType, 'id' | 'category_name'>
  plants: Pick<PlantType, 'id' | 'plant_name'>[]
  description: string | null
  created_at: string
  updated_at: string
}

// Form data types for Raw Materials
export const rawMaterialRequestSchema = z.object({
  material_name: z.string().min(1, 'Material name is required'),
  formula: z.string().optional(),
  description: z.string().optional(), // tidak wajib
  category_id: z.string().min(1, 'Category is required'),
  plants: z.array(z.string()).min(1, 'At least one plant must be selected'),
})

export type RawMaterialRequestType = z.infer<typeof rawMaterialRequestSchema>
