import z from 'zod'
import { MasterDataBaseEntity } from '@/shared/types'

// For unit relationship
export interface UnitRelationType {
  id: number
  unit_name: string
}

// Parameter entity (for list view - simple strings)
export interface ParameterType extends MasterDataBaseEntity {
  parameter_name: string
  unit: string // This is likely the unit name as string
}

// Detailed parameter entity (for detail view - nested unit object)
export interface DetailParameterType extends MasterDataBaseEntity {
  parameter_name: string
  unit: UnitRelationType | null
}

// For form create and update requests
export const parameterRequestSchema = z.object({
  parameter_name: z.string().min(1, 'Parameter name is required'),
  unit_id: z.string().optional().or(z.literal('')),
})

export type ParameterRequestType = z.infer<typeof parameterRequestSchema>

// For backward compatibility
export type ParameterCreateType = ParameterRequestType
export const parameterSchema = parameterRequestSchema
