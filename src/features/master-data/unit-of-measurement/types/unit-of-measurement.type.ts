import z from 'zod'
import { MasterDataBaseEntity } from '@/shared/types'

export interface UnitOfMeasurementType extends MasterDataBaseEntity {
  unit_of_measurement: string
}

//for form create and update
export const unitOfMeasurementSchema = z.object({
  unit_of_measurement: z
    .string()
    .min(1, 'Unit of measurement name is required'),
})

export type UnitOfMeasurementCreateType = z.infer<
  typeof unitOfMeasurementSchema
>
