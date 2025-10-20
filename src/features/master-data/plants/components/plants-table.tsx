import { MasterDataTable } from '@/components/common/master-data-table'
import { useGetPlants, useDeletePlant } from '../hooks'
import { PlantType } from '../types'

interface PlantsTableProps {
  onEdit?: (plant: PlantType) => void
}

export function PlantsTable({ onEdit }: PlantsTableProps) {
  // Get all plants (no pagination or filtering)
  const { data: response, isLoading, error, refetch } = useGetPlants()
  const deleteMutation = useDeletePlant()

  // Table columns configuration
  const columns = [
    {
      key: 'plant_name',
      header: 'Plant Name',
    },
  ]

  // Handle delete
  const handleDelete = (plant: PlantType) => {
    deleteMutation.mutate(Number(plant.id!))
  }

  return (
    <MasterDataTable
      data={response}
      isLoading={isLoading}
      error={error}
      columns={columns}
      entityName="Plant"
      entityNamePlural="plants"
      onEdit={onEdit}
      onRefetch={refetch}
      getItemName={(plant) => plant.plant_name}
      onDelete={handleDelete}
    />
  )
}
