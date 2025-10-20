import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { PageHeader } from '@/components/common/section'
import { Pagination } from '@/components/common/pagination'
import {
  SupplierDataTable,
  SupplierFilterBar,
  SupplierFormContainer,
  SupplierDeleteDialog,
  SupplierDetailDialog,
} from '../components'
import { useSupplierFilterStore } from '../store'
import { useGetSuppliers, useDeleteSupplier } from '../hooks'
import { useModalStore } from '@/app/store/ui.store'
import { SupplierType } from '../types'

export function SupplierPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteRecord, setDeleteRecord] = useState<SupplierType | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [detailRecord, setDetailRecord] = useState<SupplierType | null>(null)

  const filter = useSupplierFilterStore()
  const { data, isLoading } = useGetSuppliers({ filter })
  const deleteMutation = useDeleteSupplier()
  const { openModal } = useModalStore()

  // Handle edit supplier
  const handleEditSupplier = (supplier: SupplierType) => {
    openModal({ id: supplier.id }, `Edit Supplier - ${supplier.supplier_name}`)
  }

  // Handle view supplier details
  const handleViewSupplier = (supplier: SupplierType) => {
    setDetailRecord(supplier)
    setDetailDialogOpen(true)
  }

  // Handle delete supplier
  const handleDeleteSupplier = (supplier: SupplierType) => {
    setDeleteRecord(supplier)
    setDeleteDialogOpen(true)
  }

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!deleteRecord) return

    try {
      await deleteMutation.mutateAsync(Number(deleteRecord.id))
      toast.success(
        `Supplier ${deleteRecord.supplier_name} deleted successfully`
      )
      setDeleteDialogOpen(false)
      setDeleteRecord(null)
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete supplier')
    }
  }

  // Handle create new supplier
  const handleCreateNew = () => {
    openModal(null, 'Create New Supplier')
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
        Create Supplier
      </button>
    </>
  )

  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-8">
      <Card className="shadow-none border-none">
        <PageHeader
          title="Suppliers"
          description="Manage and view all supplier information and contact details"
          actions={headerActions}
        />
        <div className="p-0 pb-6 md:pb-2 pt-0 md:pt-2 md:px-2">
          <SupplierFilterBar showFiltersButton={false} />
        </div>
        <CardContent className="pt-4 p-0 md:p-2 w-full">
          <SupplierDataTable
            records={data?.data?.data ?? []}
            onView={handleViewSupplier}
            onEdit={handleEditSupplier}
            onDelete={handleDeleteSupplier}
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
      <SupplierDeleteDialog
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
      <SupplierFormContainer onSuccess={handleFormSuccess} />

      {/* Detail Dialog */}
      <SupplierDetailDialog
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
