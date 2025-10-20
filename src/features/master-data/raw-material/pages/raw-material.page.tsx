import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { PageHeader } from '@/components/common/section'
import { Pagination } from '@/components/common/pagination'
import {
  RawMaterialDataTable,
  RawMaterialFilterBar,
  RawMaterialFormContainer,
  RawMaterialDeleteDialog,
  RawMaterialDetailDialog,
} from '../components'
import { useRawMaterialFilterStore } from '../store'
import { useGetMaterials, useDeleteMaterial } from '../hooks'
import { useModalStore } from '@/app/store/ui.store'
import { MaterialType } from '../types'

export function RawMaterialPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteRecord, setDeleteRecord] = useState<MaterialType | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [detailRecord, setDetailRecord] = useState<MaterialType | null>(null)

  const filter = useRawMaterialFilterStore()
  const { data, isLoading } = useGetMaterials({ filter })
  const deleteMutation = useDeleteMaterial()
  const { openModal } = useModalStore()

  // Handle edit raw material
  const handleEditMaterial = (material: MaterialType) => {
    openModal(
      { id: material.id },
      `Edit Raw Material - ${material.material_name}`
    )
  }

  // Handle view raw material details
  const handleViewMaterial = (material: MaterialType) => {
    setDetailRecord(material)
    setDetailDialogOpen(true)
  }

  // Handle delete raw material
  const handleDeleteMaterial = (material: MaterialType) => {
    setDeleteRecord(material)
    setDeleteDialogOpen(true)
  }

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!deleteRecord) return

    try {
      await deleteMutation.mutateAsync(Number(deleteRecord.id))
      toast.success(
        `Raw material ${deleteRecord.material_name} deleted successfully`
      )
      setDeleteDialogOpen(false)
      setDeleteRecord(null)
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete raw material')
    }
  }

  // Handle create new raw material
  const handleCreateNew = () => {
    openModal(null, 'Create New Raw Material')
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
        Create Raw Material
      </button>
    </>
  )

  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-8">
      <Card className="shadow-none border-none">
        <PageHeader
          title="Raw Materials"
          description="Manage and view all raw material inventory and information"
          actions={headerActions}
        />
        <div className="p-0 pb-6 md:pb-2 pt-0 md:pt-2 md:px-2">
          <RawMaterialFilterBar showFiltersButton={true} />
        </div>
        <CardContent className="pt-4 p-0 md:p-2">
          <RawMaterialDataTable
            records={data?.data?.data ?? []}
            onView={handleViewMaterial}
            onEdit={handleEditMaterial}
            onDelete={handleDeleteMaterial}
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
      <RawMaterialDeleteDialog
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
      <RawMaterialFormContainer onSuccess={handleFormSuccess} />

      {/* Detail Dialog */}
      <RawMaterialDetailDialog
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
