import z from 'zod'
import { MasterDataBaseEntity } from '@/shared/types'

export interface PositionsType extends MasterDataBaseEntity {
  position_name: string
}

// Detailed supplier entity (for detail view - nested location objects)
export interface DetailPositionsType extends MasterDataBaseEntity {
  position_name: string
  created_at: string
  updated_at: string
}

export const positionsRequestSchema = z.object({
  position_name: z.string().min(1, 'Positions name is required'),
})

export type PositionsRequestType = z.infer<typeof positionsRequestSchema>
