import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { PageHeader } from '@/components/common/section'
import { UnitOfMeasurementDataTable } from '../components/unit-of-measurement-data-table'
import { UnitOfMeasurementFormContainer } from '../components/unit-of-measurement-form-container'
import { UnitOfMeasurementDeleteDialog } from '../components/unit-of-measurement-delete-dialog'
import { useGetUnitOfMeasurements, useDeleteUnitOfMeasurement } from '../hooks'
import { useModalStore } from '@/app/store/ui.store'
import { UnitOfMeasurementType } from '../types'

export function UnitOfMeasurementPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteRecord, setDeleteRecord] =
    useState<UnitOfMeasurementType | null>(null)

  const { data: response, isLoading } = useGetUnitOfMeasurements()
  const deleteMutation = useDeleteUnitOfMeasurement()
  const { openModal } = useModalStore()

  // Handle edit unit of measurement
  const handleEditUnitOfMeasurement = (
    unitOfMeasurement: UnitOfMeasurementType
  ) => {
    openModal(
      { id: unitOfMeasurement.id },
      `Edit Unit of Measurement - ${unitOfMeasurement.unit_of_measurement}`
    )
  }

  // Handle delete unit of measurement
  const handleDeleteUnitOfMeasurement = (
    unitOfMeasurement: UnitOfMeasurementType
  ) => {
    setDeleteRecord(unitOfMeasurement)
    setDeleteDialogOpen(true)
  }

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!deleteRecord) return

    try {
      await deleteMutation.mutateAsync(Number(deleteRecord.id))
      toast.success(
        `Unit of measurement ${deleteRecord.unit_of_measurement} deleted successfully`
      )
      setDeleteDialogOpen(false)
      setDeleteRecord(null)
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete unit of measurement')
    }
  }

  // Handle create new unit of measurement
  const handleCreateNew = () => {
    openModal(null, 'Create New Unit of Measurement')
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
        Create Unit of Measurement
      </button>
    </>
  )

  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-8">
      <Card className="shadow-none border-none">
        <PageHeader
          title="Units of Measurement"
          description="Manage measurement units for quality control testing"
          actions={headerActions}
        />
        <CardContent className="pt-4 p-0 md:p-2">
          <UnitOfMeasurementDataTable
            records={response?.data || []}
            onEdit={handleEditUnitOfMeasurement}
            onDelete={handleDeleteUnitOfMeasurement}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <UnitOfMeasurementDeleteDialog
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
      <UnitOfMeasurementFormContainer onSuccess={handleFormSuccess} />
    </div>
  )
}
