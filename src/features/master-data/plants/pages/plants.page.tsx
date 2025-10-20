import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { PageHeader } from '@/components/common/section'
import { PlantsDataTable } from '../components/plants-data-table'
import { PlantsFormContainer } from '../components/plants-form-container'
import { PlantsDeleteDialog } from '../components/plants-delete-dialog'
import { useGetPlants, useDeletePlant } from '../hooks'
import { useModalStore } from '@/app/store/ui.store'
import { PlantType } from '../types'

export function PlantsPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteRecord, setDeleteRecord] = useState<PlantType | null>(null)

  const { data: response, isLoading } = useGetPlants()
  const deleteMutation = useDeletePlant()
  const { openModal } = useModalStore()

  // Handle edit plant
  const handleEditPlant = (plant: PlantType) => {
    openModal({ id: plant.id }, `Edit Plant - ${plant.plant_name}`)
  }

  // Handle delete plant
  const handleDeletePlant = (plant: PlantType) => {
    setDeleteRecord(plant)
    setDeleteDialogOpen(true)
  }

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!deleteRecord) return

    try {
      await deleteMutation.mutateAsync(Number(deleteRecord.id))
      toast.success(`Plant ${deleteRecord.plant_name} deleted successfully`)
      setDeleteDialogOpen(false)
      setDeleteRecord(null)
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete plant')
    }
  }

  // Handle create new plant
  const handleCreateNew = () => {
    openModal(null, 'Create New Plant')
  }

  // Handle successful form actions (refresh data)
  const handleFormSuccess = () => {
    // The form container will close the modal automatically
    // Queries will be invalidated by the mutation hooks
  }

  const headerActions = (
    <>
      <button
        onClick={handleCreateNew}
        className="inline-flex w-full mb-4 md:w-fit md:mb-0 justify-center md:justify-start items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Create Plant
      </button>
    </>
  )

  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-8">
      <Card className="shadow-none border-none">
        <PageHeader
          title="Plants"
          description="Manage production plants in the system"
          actions={headerActions}
        />
        <CardContent className="pt-4 p-0 md:p-2">
          <PlantsDataTable
            records={response?.data || []}
            onEdit={handleEditPlant}
            onDelete={handleDeletePlant}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <PlantsDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open)
          if (!open) setDeleteRecord(null)
        }}
        record={deleteRecord}
        onConfirm={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
      />

      {/* Create/Edit Modal */}
      <PlantsFormContainer onSuccess={handleFormSuccess} />
    </div>
  )
}
