import z from 'zod'
import { MasterDataBaseEntity } from '@/shared/types'

export interface DepartmentType extends MasterDataBaseEntity {
  department_name: string
}

//for form create and update
export const departmentSchema = z.object({
  department_name: z.string().min(1, 'Department name is required'),
})

export type DepartmentCreateType = z.infer<typeof departmentSchema>
