import z from "zod"

//LIST DATA ORDERING GOODS (GET ALL METHOD)
export type OrderingGoodType = {
  id: number
  description: string
  qty: string
  pkgs: number
  gw: number
  nw: number
  measurement: number
  lot_number: string
  hdpe_drum_info: string
  pl_number: string
  created_at: string
  updated_at: string
}

//DETAIL DATA ORDERING GOODS (GET BY ID METHOD)
export type OrderingGoodDetailType = {
  id: number
  description: string
  qty: string
  pkgs: number
  gw: number
  nw: number
  measurement: number
  lot_number: string
  hdpe_drum_info: string
  pl_number: string
  created_at: string
  updated_at: string
}

//DATA CREATE ORDERING GOODS (POST METHOD)
export const OrderingGoodCreateSchema = z.object({
  pl_number: z.string().min(1, 'Packing list number is required'),
  description: z.string().min(1, 'Description is required'),
  qty: z.string().min(1, 'Quantity is required'),
  pkgs: z.string().min(1, 'Packages is required'),
  gw: z.string().min(1, 'Gross weight is required'),
  nw: z.string().min(1, 'Net weight is required'),
  measurement: z.string().min(1, 'Measurement is required'),
  hdpe_drum_info: z.string().min(1, 'HDPE drum info is required'),
  lot_number: z.string().min(1, 'Lot number is required'),
})

export type OrderingGoodFormData = z.infer<typeof OrderingGoodCreateSchema>

//DATA UPDATE ORDERING GOODS (PATCH METHOD)
export const OrderingGoodUpdateSchema = z.object({
  pl_number: z.string().min(1, 'Packing list number is required'),
  description: z.string().min(1, 'Description is required'),
  qty: z.string().min(1, 'Quantity is required'),
  pkgs: z.string().min(1, 'Packages is required'),
  gw: z.string().min(1, 'Gross weight is required'),
  nw: z.string().min(1, 'Net weight is required'),
  measurement: z.string().min(1, 'Measurement is required'),
  hdpe_drum_info: z.string().min(1, 'HDPE drum info is required'),
  lot_number: z.string().min(1, 'Lot number is required'),
})

export type OrderingGoodUpdateFormData = z.infer<typeof OrderingGoodUpdateSchema>
