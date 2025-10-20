import { MasterDataBaseEntity } from '@/shared/types'
import z from 'zod'

export interface RolesType extends MasterDataBaseEntity {
  name: string
  label: string
}

// Detailed supplier entity (for detail view - nested location objects)
export interface DetailRolesType extends MasterDataBaseEntity {
  name: string
  label: string
  created_at: string
  updated_at: string
}

export const rolesRequestSchema = z.object({
  name: z.string().min(1, 'Roles name is required'),
  label: z.string().min(1, 'Roles label is required'),
})

export type RolesRequestType = z.infer<typeof rolesRequestSchema>
