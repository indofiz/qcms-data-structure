import { MasterDataBaseEntity } from '@/shared/types/master-data'
import z from 'zod'

export interface DeliveryPartnerType extends MasterDataBaseEntity {
  company_name: string
  address: string
  phone: string
  fax: string
  email: string
  active: boolean
  created_at: string // ISO datetime string
  updated_at: string // ISO datetime string
}

export interface DeliveryPartnerDetailType extends DeliveryPartnerType {
  company_name: string
  address: string
  phone: string
  fax: string
  email: string
  active: boolean
  created_at: string // ISO datetime string
  updated_at: string // ISO datetime string
}

export const deliveryPartnerRequestSchema = z.object({
  company_name: z.string().min(1, 'Company name is required'),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().min(1, 'Phone number is required'),
  fax: z.string().optional().or(z.literal('')),
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  active: z.boolean().optional().default(true),
})

export type DeliveryPartnerRequestType = z.infer<
  typeof deliveryPartnerRequestSchema
>
