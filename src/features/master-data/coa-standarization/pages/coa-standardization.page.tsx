import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { PageHeader } from '@/components/common/section'
import { Pagination } from '@/components/common/pagination'
import {
  CoaStandardizationDataTable,
  CoaStandardizationFilterBar,
  CoaStandardizationFormContainer,
  CoaStandardizationDeleteDialog,
  CoaStandardizationDetailDialog,
} from '../components'
import {
  useGetCoaStandardizations,
  useDeleteCoaStandardization,
} from '../hooks'
import { useCoaStandardizationFilterStore } from '../store'
import { useModalStore } from '@/app/store/ui.store'
import { CoaStandarizationType } from '../types/coa-standarization.type'

export function CoaStandardizationPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteRecord, setDeleteRecord] =
    useState<CoaStandarizationType | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [detailRecord, setDetailRecord] =
    useState<CoaStandarizationType | null>(null)

  const filter = useCoaStandardizationFilterStore()
  const { data, isLoading } = useGetCoaStandardizations({ filter })
  const deleteMutation = useDeleteCoaStandardization()
  const { openModal } = useModalStore()

  // Handle edit COA standardization
  const handleEditCoaStandardization = (record: CoaStandarizationType) => {
    openModal(
      { id: record.id },
      `Edit COA Standardization - ${record.material_name} - ${record.parameter_name}`
    )
  }

  // Handle view COA standardization details
  const handleViewCoaStandardization = (record: CoaStandarizationType) => {
    setDetailRecord(record)
    setDetailDialogOpen(true)
  }

  // Handle delete COA standardization
  const handleDeleteCoaStandardization = (record: CoaStandarizationType) => {
    setDeleteRecord(record)
    setDeleteDialogOpen(true)
  }

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!deleteRecord) return

    try {
      await deleteMutation.mutateAsync(Number(deleteRecord.id))
      toast.success(
        `COA standardization for ${deleteRecord.material_name} - ${deleteRecord.parameter_name} deleted successfully`
      )
      setDeleteDialogOpen(false)
      setDeleteRecord(null)
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete COA standardization')
    }
  }

  // Handle create new COA standardization
  const handleCreateNew = () => {
    openModal(null, 'Create New COA Standardization')
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
        Create COA Standardization
      </button>
    </>
  )

  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-8">
      <Card className="shadow-none border-none">
        <PageHeader
          title="COA Standardizations"
          description="Manage COA standardization parameters for raw materials"
          actions={headerActions}
        />
        <div className="p-0 pb-6 md:pb-2 pt-0 md:pt-2 md:px-2">
          <CoaStandardizationFilterBar showFiltersButton={true} />
        </div>
        <CardContent className="pt-4 p-0 md:p-2">
          <CoaStandardizationDataTable
            records={data?.data?.data ?? []}
            onView={handleViewCoaStandardization}
            onEdit={handleEditCoaStandardization}
            onDelete={handleDeleteCoaStandardization}
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
      <CoaStandardizationDeleteDialog
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
      <CoaStandardizationFormContainer onSuccess={handleFormSuccess} />

      {/* Detail Dialog */}
      <CoaStandardizationDetailDialog
        record={detailRecord}
        open={detailDialogOpen}
        onOpenChange={(open) => {
          setDetailDialogOpen(open)
          if (!open) setDetailRecord(null)
        }}
      />
    </div>
  )
}
