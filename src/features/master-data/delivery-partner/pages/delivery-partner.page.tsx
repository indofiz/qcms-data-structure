import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { PageHeader } from '@/components/common/section'
import { Pagination } from '@/components/common/pagination'
import {
  DeliveryPartnerDataTable,
  DeliveryPartnerFilterBar,
  DeliveryPartnerFormContainer,
  DeliveryPartnerDeleteDialog,
  DeliveryPartnerDetailDialog,
} from '../components'
import { useDeliveryPartnerFilterStore } from '../store'
import { useGetDeliveryPartners, useDeleteDeliveryPartner } from '../hooks'
import { useModalStore } from '@/app/store/ui.store'
import { DeliveryPartnerType } from '../types'

export function DeliveryPartnerPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteRecord, setDeleteRecord] = useState<DeliveryPartnerType | null>(
    null
  )
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [detailRecord, setDetailRecord] = useState<DeliveryPartnerType | null>(
    null
  )

  const filter = useDeliveryPartnerFilterStore()
  const { data, isLoading } = useGetDeliveryPartners({ filter })
  const deleteMutation = useDeleteDeliveryPartner()
  const { openModal } = useModalStore()

  // Handle edit delivery partner
  const handleEditDeliveryPartner = (deliveryPartner: DeliveryPartnerType) => {
    openModal(
      { id: deliveryPartner.id },
      `Edit Delivery Partner - ${deliveryPartner.company_name}`
    )
  }

  // Handle view delivery partner details
  const handleViewDeliveryPartner = (deliveryPartner: DeliveryPartnerType) => {
    setDetailRecord(deliveryPartner)
    setDetailDialogOpen(true)
  }

  // Handle delete delivery partner
  const handleDeleteDeliveryPartner = (
    deliveryPartner: DeliveryPartnerType
  ) => {
    setDeleteRecord(deliveryPartner)
    setDeleteDialogOpen(true)
  }

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!deleteRecord) return

    try {
      await deleteMutation.mutateAsync(Number(deleteRecord.id))
      toast.success(
        `Delivery partner ${deleteRecord.company_name} deleted successfully`
      )
      setDeleteDialogOpen(false)
      setDeleteRecord(null)
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete delivery partner')
    }
  }

  // Handle create new delivery partner
  const handleCreateNew = () => {
    openModal(null, 'Create New Delivery Partner')
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
        Create Delivery Partner
      </button>
    </>
  )

  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-8">
      <Card className="shadow-none border-none">
        <PageHeader
          title="Delivery Partners"
          description="Manage and view all delivery partner information and contact details"
          actions={headerActions}
        />
        <div className="p-0 pb-6 md:pb-2 pt-0 md:pt-2 md:px-2">
          <DeliveryPartnerFilterBar showFiltersButton={false} />
        </div>
        <CardContent className="pt-4 p-0 md:p-2">
          <DeliveryPartnerDataTable
            records={data?.data?.data ?? []}
            onView={handleViewDeliveryPartner}
            onEdit={handleEditDeliveryPartner}
            onDelete={handleDeleteDeliveryPartner}
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
      <DeliveryPartnerDeleteDialog
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
      <DeliveryPartnerFormContainer onSuccess={handleFormSuccess} />

      {/* Detail Dialog */}
      <DeliveryPartnerDetailDialog
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
