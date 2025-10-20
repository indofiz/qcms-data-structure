import z from 'zod'
import { MasterDataBaseEntity } from '@/shared/types'

export interface CategoryType extends MasterDataBaseEntity {
  category_name: string
}

//for form create and update
export const categorySchema = z.object({
  category_name: z.string().min(1, 'Category name is required'),
})

export type CategoryCreateType = z.infer<typeof categorySchema>
