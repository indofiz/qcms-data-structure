import z from 'zod'
import { MasterDataBaseEntity } from '@/shared/types'

export interface PlantType extends MasterDataBaseEntity {
  plant_name: string
}

//for form create and update
export const plantSchema = z.object({
  plant_name: z.string().min(1, 'Plant name is required'),
})

export type PlantCreateType = z.infer<typeof plantSchema>
