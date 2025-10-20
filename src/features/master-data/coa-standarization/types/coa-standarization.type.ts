import { MasterDataBaseEntity } from '@/shared/types'
import { MaterialType } from '../../raw-material'
import { ParameterType } from '../../parameter'
import z from 'zod'

export interface CoaStandarizationType extends MasterDataBaseEntity {
  raw_mat_id: string
  material_name?: string
  parameter_id: string
  parameter_name?: string
  standarization_type: string // bisa dibuat union: "STRING" | "NUMBER"
  min_value: string
  max_value: string | null
  status: string
  // Support nested relationships as backup
  material?: { material_name: string }
  parameter?: { parameter_name: string }
}

export interface DetailCoaStandarizationType extends CoaStandarizationType {
  raw_mat_id: string
  material: Pick<MaterialType, 'id' | 'material_name'>
  parameter_id: string
  parameter: Pick<ParameterType, 'id' | 'parameter_name'>
  standarization_type: string
  min_value: string
  max_value: string | null
  status: string
  created_at: string // ISO timestamp
  updated_at: string // ISO timestamp
}

export const coaStandarizationRequestSchema = z.object({
  raw_mat_id: z.string().min(1, 'Raw material is required'),
  parameter_id: z.string().min(1, 'Parameter is required'),
  standarization_type: z.enum(['STRING', 'NUMBER'], {
    errorMap: () => ({
      message: 'Standardization type must be STRING or NUMBER',
    }),
  }),
  min_value: z.string().min(1, 'Min value is required'),
  max_value: z.string().optional().nullable(),
  status: z
    .union([z.literal('1'), z.literal('0'), z.literal(1), z.literal(0)], {
      errorMap: () => ({
        message: 'Status must be 1 (Active) or 0 (Not Active)',
      }),
    })
    .transform((val) => val.toString()),
})

export type CoaStandarizationRequestType = z.infer<
  typeof coaStandarizationRequestSchema
>
