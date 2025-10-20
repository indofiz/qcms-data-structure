import { MasterDataTable } from '@/components/common/master-data-table'
import { useGetAnalysisParameters, useDeleteAnalysisParameter } from '../hooks'
import { AnalysisParameterType } from '../types'
import { extractResponseData } from '@/shared/utils/response.utils'

interface AnalysisParameterTableProps {
  onEdit?: (parameter: AnalysisParameterType) => void
}

export function AnalysisParameterTable({ onEdit }: AnalysisParameterTableProps) {
  // Get all analysis parameters (no pagination or filtering)
  const { data: response, isLoading, error, refetch } = useGetAnalysisParameters()
  const deleteMutation = useDeleteAnalysisParameter()
  
  // Extract data using utility function to handle response structure correctly
  const allData = extractResponseData(response) || []

  // Table columns configuration
  const columns = [
    {
      key: 'parameter_name',
      header: 'Parameter Name',
    },
  ]

  // Handle delete
  const handleDelete = (parameter: AnalysisParameterType) => {
    deleteMutation.mutate(Number(parameter.id!))
  }

  // Create response with extracted data
  const dataResponse = response ? {
    ...response,
    data: allData
  } : undefined

  return (
    <MasterDataTable
      data={dataResponse}
      isLoading={isLoading}
      error={error}
      columns={columns}
      entityName="Analysis Parameter"
      entityNamePlural="analysis parameters"
      onEdit={onEdit}
      onRefetch={refetch}
      getItemName={(parameter) => parameter.parameter_name}
      onDelete={handleDelete}
    />
  )
}