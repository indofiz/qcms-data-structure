import z from "zod"

//PRODUCT INFO TYPE
export type ProductInfoType = {
  id: number
  product_name: string
  product_code: string
  company_name: string
}

//CREATED BY USER TYPE
export type CreatedByUserType = {
  id: number
  name: string
  role: string
}

//MEASUREMENT TYPE
export type MeasurementType = {
  parameter: string
  value: number
  unit: string
}

//PRODUCTION REACTOR RECORD TYPE
export type ProductionReactorRecordType = {
  time: string
  description: string
  measurements: MeasurementType[]
  note: string
  created_at: string
}

//LIST DATA DMT SAMPLING (GET ALL METHOD)
export type DmtSamplingType = {
  id: number
  line_number: string
  lot_number: string
  lot_number_raw_mat: string
  status: string
  product: ProductInfoType
  created_at: string
  created_by: CreatedByUserType
}

//TRANSFER PROCESS TYPE (FOR GET BY ID RESPONSE)
export type TransferProcessType = {
  time: string
  description: string
  measurements: MeasurementType[]
  note: string
  created_at: string
}

//TRANSFER PROCESS REQUEST TYPE (FOR POST REQUEST)
export type TransferProcessRequestType = {
  solvent_water_quantity: string
  solvent_water_initial_flow: string
  solvent_water_final_flow: string
  absorber_transfer_start_time: string
  absorber_transfer_start_temperature: string
  absorber_transfer_end_time: string
  absorber_transfer_end_temperature: string
  storage_transfer_initial_flow: string
  storage_transfer_final_flow: string
  storage_transfer_quantity: string
  cl_percentage: string
}

//ANALYSIS SAMPLING TYPE
export type AnalysisSamplingType = {
  id: number
  sampling_name: string
  sampling_point: number
  sampling_repetition: string
  sampling_retain: string
  analysis: Array<{
    parameter_name: string
    parameter_value: string
  }>
  status: string
  created_at: string
}

//DETAIL DATA DMT SAMPLING (GET BY ID METHOD)
export type DmtSamplingDetailType = {
  id: number
  line_number: string
  lot_number: string
  lot_number_raw_mat: string
  status: string
  product: ProductInfoType
  created_at: string
  created_by: CreatedByUserType
  production_on_reactor_one: ProductionReactorRecordType[]
  production_on_reactor_two: ProductionReactorRecordType[]
  transfer_process: TransferProcessType[]
  analysis_sampling: AnalysisSamplingType[]
  information: string | null
  updated_at: string
}

//MEASUREMENT SCHEMA FOR NESTED OBJECTS
export const MeasurementSchema = z.object({
  parameter: z.string().min(1, 'Parameter is required'),
  value: z.number(),
  unit: z.string().min(1, 'Unit is required'),
})

export type MeasurementFormData = z.infer<typeof MeasurementSchema>

//DATA CREATE PREPARATION SAMPLING (POST METHOD)
export const PreparationSamplingCreateSchema = z.object({
  line_number: z.string().min(1, 'Line number is required'),
  lot_number: z.string().min(1, 'Lot number is required'),
  lot_number_raw_mat: z.string().min(1, 'Raw material lot number is required'),
  product_id: z.number(),
  created_by: z.number().optional(),
})

export type PreparationSamplingFormData = z.infer<typeof PreparationSamplingCreateSchema>

//DATA CREATE PRODUCTION REACTOR ONE (POST METHOD)
export const ProductionReactorOneCreateSchema = z.object({
  preparation_sampling_id: z.number(),
  time: z.string().min(1, 'Time is required'),
  description: z.string().min(1, 'Description is required'),
  note: z.string().min(1, 'Note is required'),
  created_by: z.number().optional(),
  measurements: z.array(MeasurementSchema).min(1, 'At least one measurement is required'),
})

export type ProductionReactorOneFormData = z.infer<typeof ProductionReactorOneCreateSchema>

//DATA CREATE PRODUCTION REACTOR TWO (POST METHOD)
export const ProductionReactorTwoCreateSchema = z.object({
  preparation_sampling_id: z.number(),
  time: z.string().min(1, 'Time is required'),
  description: z.string().min(1, 'Description is required'),
  note: z.string().min(1, 'Note is required'),
  created_by: z.number().optional(),
  measurements: z.array(MeasurementSchema).min(1, 'At least one measurement is required'),
})

export type ProductionReactorTwoFormData = z.infer<typeof ProductionReactorTwoCreateSchema>

//DATA CREATE TRANSFER PROCESS (POST METHOD)
export const TransferProcessCreateSchema = z.object({
  preparation_sampling_id: z.number(),
  solvent_water_quantity: z.string().min(1, 'Solvent water quantity is required'),
  solvent_water_initial_flow: z.string().min(1, 'Solvent water initial flow is required'),
  solvent_water_final_flow: z.string().min(1, 'Solvent water final flow is required'),
  absorber_transfer_start_time: z.string().min(1, 'Absorber transfer start time is required'),
  absorber_transfer_start_temperature: z.string().min(1, 'Absorber start temperature is required'),
  absorber_transfer_end_time: z.string().min(1, 'Absorber transfer end time is required'),
  absorber_transfer_end_temperature: z.string().min(1, 'Absorber end temperature is required'),
  storage_transfer_initial_flow: z.string().min(1, 'Storage transfer initial flow is required'),
  storage_transfer_final_flow: z.string().min(1, 'Storage transfer final flow is required'),
  storage_transfer_quantity: z.string().min(1, 'Storage transfer quantity is required'),
  cl_percentage: z.string().min(1, 'Chlorine percentage is required'),
  created_by: z.number().optional(),
})

export type TransferProcessFormData = z.infer<typeof TransferProcessCreateSchema>

//DATA UPDATE TAKING SAMPLE (PATCH METHOD)
export const TakingSampleUpdateSchema = z.object({
  information: z.string().min(1, 'Information is required'),
})

export type TakingSampleUpdateFormData = z.infer<typeof TakingSampleUpdateSchema>

//ANALYSIS PARAMETER SCHEMA
export const AnalysisParameterSchema = z.object({
  parameter_name: z.string().min(1, 'Parameter name is required'),
  parameter_value: z.string().min(1, 'Parameter value is required'),
})

export type AnalysisParameterFormData = z.infer<typeof AnalysisParameterSchema>

//DATA CREATE ANALYSIS SAMPLING (POST METHOD)
export const AnalysisSamplingCreateSchema = z.object({
  sampling_name: z.string().min(1, 'Sampling name is required'),
  sampling_point: z.string().min(1, 'Sampling point is required'),
  sampling_repetition: z.string().min(1, 'Sampling repetition is required'),
  sampling_retain: z.string().min(1, 'Sampling retain is required'),
  analysis: z.array(AnalysisParameterSchema).min(1, 'At least one analysis parameter is required'),
})

export type AnalysisSamplingFormData = z.infer<typeof AnalysisSamplingCreateSchema>

//DATA CHANGE STATUS ANALYSIS SAMPLE (POST METHOD)
export const ChangeStatusAnalysisSampleSchema = z.object({
  status: z.string().min(1, 'Status is required'),
})

export type ChangeStatusAnalysisSampleFormData = z.infer<typeof ChangeStatusAnalysisSampleSchema>
