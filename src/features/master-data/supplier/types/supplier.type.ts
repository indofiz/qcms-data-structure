/**
 * Supplier Types
 */

import { MasterDataBaseEntity } from '@/shared/types/master-data/base.types'
import z from 'zod'

// Location entity interfaces
export interface SubDistrictType {
  id: number
  sub_district_name: string
}

export interface DistrictType {
  id: number
  district_name: string
}

export interface CityType {
  id: number
  city_name: string
}

export interface ProvinceType {
  id: number
  province_name: string
}

// Supplier entity (for list view - simple strings for location)
export interface SupplierType extends MasterDataBaseEntity {
  supplier_name: string
  phone: string
  email: string
  address: string
  sub_district: string
  district: string
  city: string
  province: string
}

// Detailed supplier entity (for detail view - nested location objects)
export interface DetailSupplierType extends MasterDataBaseEntity {
  supplier_name: string
  phone: string
  email: string
  address: string
  sub_district: SubDistrictType
  district: DistrictType
  city: CityType
  province: ProvinceType
  created_at: string
  updated_at: string
}

export const supplierRequestSchema = z.object({
  supplier_name: z.string().min(1, 'Supplier name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  sub_district_id: z.string().min(1, 'Sub district is required'),
  address: z.string().min(1, 'Address is required'),
})

export type SupplierRequestType = z.infer<typeof supplierRequestSchema>
