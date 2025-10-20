import { MasterDataTable } from '@/components/common/master-data-table'
import { useGetUnitOfMeasurements, useDeleteUnitOfMeasurement } from '../hooks'
import { UnitOfMeasurementType } from '../types'

interface UnitOfMeasurementTableProps {
  onEdit?: (unitOfMeasurement: UnitOfMeasurementType) => void
}

export function UnitOfMeasurementTable({ onEdit }: UnitOfMeasurementTableProps) {
  // Get all unit of measurements (no pagination, no filtering)
  const { data: response, isLoading, error, refetch } = useGetUnitOfMeasurements()
  const deleteMutation = useDeleteUnitOfMeasurement()

  // Table columns configuration
  const columns = [
    {
      key: 'unit_of_measurement',
      header: 'Unit of Measurement',
    },
  ]

  // Handle delete
  const handleDelete = (unitOfMeasurement: UnitOfMeasurementType) => {
    deleteMutation.mutate(Number(unitOfMeasurement.id!))
  }

  return (
    <MasterDataTable
      data={response}
      isLoading={isLoading}
      error={error}
      columns={columns}
      entityName="Unit of Measurement"
      entityNamePlural="units of measurement"
      onEdit={onEdit}
      onRefetch={refetch}
      getItemName={(unitOfMeasurement) => unitOfMeasurement.unit_of_measurement}
      onDelete={handleDelete}
    />
  )
}