import z from 'zod'
import { MasterDataBaseEntity } from '@/shared/types'

export interface AnalysisParameterType extends MasterDataBaseEntity {
  parameter_name: string
}

//for form create and update
export const analysisParameterSchema = z.object({
  parameter_name: z.string().min(1, 'Parameter name is required'),
})

export type AnalysisParameterCreateType = z.infer<
  typeof analysisParameterSchema
>
