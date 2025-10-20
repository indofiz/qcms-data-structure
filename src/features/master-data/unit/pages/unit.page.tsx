import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { PageHeader } from '@/components/common/section'
import { Pagination } from '@/components/common/pagination'
import { useModalStore } from '@/app/store/ui.store'
import { UnitDataTable } from '../components/unit-data-table'
import { UnitFilterBar } from '../components/unit-filter-bar'
import { UnitFormContainer } from '../components/unit-form-container'
import { UnitDeleteDialog } from '../components/unit-delete-dialog'
import { useUnitFilterStore } from '../store'
import { useGetUnits, useDeleteUnit } from '../hooks'
import { UnitType } from '../types'

export function UnitPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteRecord, setDeleteRecord] = useState<UnitType | null>(null)
  const { openModal } = useModalStore()

  const filter = useUnitFilterStore()
  const { data, isLoading } = useGetUnits({ filter })
  const deleteMutation = useDeleteUnit()

  // Handle edit unit
  const handleEditUnit = (unit: UnitType) => {
    openModal({ id: unit.id }, `Edit Unit: ${unit.unit_name}`)
  }

  // Handle delete unit
  const handleDeleteUnit = (unit: UnitType) => {
    setDeleteRecord(unit)
    setDeleteDialogOpen(true)
  }

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!deleteRecord) return

    try {
      await deleteMutation.mutateAsync(Number(deleteRecord.id))
      toast.success(`Unit ${deleteRecord.unit_name} deleted successfully`)
      setDeleteDialogOpen(false)
      setDeleteRecord(null)
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete unit')
    }
  }

  // Handle create new unit
  const handleCreateNew = () => {
    openModal(null, 'Create New Unit')
  }

  // Handle successful form actions (refresh data)
  const handleFormSuccess = () => {
    // The form container will close the modal automatically
    // Queries will be invalidated by the mutation hooks
  }

  // Handle pagination
  const handlePageChange = (page: number) => {
    filter.setPage(page)
  }

  // Calculate total pages
  const totalPages = data?.data?.pagination?.total
    ? Math.ceil(data.data.pagination.total / filter.per_page)
    : 1

  const headerActions = (
    <>
      <button
        onClick={handleCreateNew}
        className="w-full mb-4 md:mb-0 md:w-auto inline-flex justify-center md:justify-start items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Create Unit
      </button>
    </>
  )

  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-8">
      <Card className="shadow-none border-none">
        <PageHeader
          title="Units"
          description="Manage and view all measurement units for the system"
          actions={headerActions}
        />
        <div className="p-0 pb-6 md:pb-2 pt-0 md:pt-2 md:px-2">
          <UnitFilterBar showFiltersButton={false} />
        </div>
        <CardContent className="pt-4 p-0 md:p-2 w-full">
          <UnitDataTable
            records={data?.data?.data ?? []}
            onEdit={handleEditUnit}
            onDelete={handleDeleteUnit}
            isLoading={isLoading}
          />

          {isLoading ? null : (
            <Pagination
              currentPage={data?.data?.pagination?.current_page || 1}
              totalPages={totalPages}
              totalItems={data?.data?.pagination?.total || 0}
              itemsPerPage={filter.per_page}
              onPageChange={handlePageChange}
            />
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <UnitDeleteDialog
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
      <UnitFormContainer onSuccess={handleFormSuccess} />
    </div>
  )
}
