import z from 'zod'
import { MasterDataBaseEntity } from '@/shared/types'

export interface UnitType extends MasterDataBaseEntity {
  unit_name: string
}

//for form create and update
export const unitSchema = z.object({
  unit_name: z.string().min(1, 'Unit name is required'),
})

export type UnitCreateType = z.infer<typeof unitSchema>
export type UnitUpdateType = UnitCreateType
