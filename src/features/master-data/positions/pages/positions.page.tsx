import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { PageHeader } from '@/components/common/section'
import { PositionsDataTable } from '../components/positions-data-table'
import { PositionsFormContainer } from '../components/positions-form-container'
import { PositionsDeleteDialog } from '../components/positions-delete-dialog'
import { useGetPositions, useDeletePosition } from '../hooks'
import { useModalStore } from '@/app/store/ui.store'
import { PositionsType } from '../types'

export function PositionsPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteRecord, setDeleteRecord] = useState<PositionsType | null>(null)

  const { data: response, isLoading } = useGetPositions()
  const deleteMutation = useDeletePosition()
  const { openModal } = useModalStore()

  // Handle edit position
  const handleEditPosition = (position: PositionsType) => {
    openModal({ id: position.id }, `Edit Position - ${position.position_name}`)
  }

  // Handle delete position
  const handleDeletePosition = (position: PositionsType) => {
    setDeleteRecord(position)
    setDeleteDialogOpen(true)
  }

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!deleteRecord) return

    try {
      await deleteMutation.mutateAsync(Number(deleteRecord.id))
      toast.success(
        `Position ${deleteRecord.position_name} deleted successfully`
      )
      setDeleteDialogOpen(false)
      setDeleteRecord(null)
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete position')
    }
  }

  // Handle create new position
  const handleCreateNew = () => {
    openModal(null, 'Create New Position')
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
        Create Position
      </button>
    </>
  )

  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-8">
      <Card className="shadow-none border-none">
        <PageHeader
          title="Positions"
          description="Manage organizational positions and job titles"
          actions={headerActions}
        />
        <CardContent className="pt-4 p-0 md:p-2">
          <PositionsDataTable
            records={response?.data || []}
            onEdit={handleEditPosition}
            onDelete={handleDeletePosition}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <PositionsDeleteDialog
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
      <PositionsFormContainer onSuccess={handleFormSuccess} />
    </div>
  )
}
