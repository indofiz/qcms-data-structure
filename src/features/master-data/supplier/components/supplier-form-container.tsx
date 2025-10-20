import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LoadingContentSpin } from '@/components/common/loading'
import { useGetSupplierDetail } from '../hooks'
import { useModalStore } from '@/app/store/ui.store'
import { SupplierForm } from './supplier-form'

interface SupplierFormContainerProps {
  supplierId?: string
  onSuccess?: () => void
}

export function SupplierFormContainer({
  supplierId,
  onSuccess
}: SupplierFormContainerProps) {
  const { isOpen, data, title, closeModal } = useModalStore()
  // Use the supplierId from props or modal data
  const targetId = supplierId || (data as { id?: string })?.id
  const isEditMode = !!targetId

  // Fetch supplier details if editing
  const {
    data: supplierResponse,
    isLoading,
    error
  } = useGetSupplierDetail(Number(targetId))

  const supplier = supplierResponse?.data

  // Handle successful form submission
  const handleSuccess = () => {
    closeModal()
    onSuccess?.()
  }

  // Handle cancel/close
  const handleCancel = () => {
    closeModal()
  }

  const modalTitle = title || (isEditMode ? 'Edit Supplier' : 'Create Supplier')

  // Show loading state while fetching supplier data for edit mode
  if (isEditMode && isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Loading supplier details...
            </DialogDescription>
          </DialogHeader>
          <LoadingContentSpin className="h-32" />
        </DialogContent>
      </Dialog>
    )
  }

  // Show error state if failed to fetch supplier data
  if (isEditMode && error) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Failed to load supplier details
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <p className="text-muted-foreground">
              Unable to load the supplier details. Please try again.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Update the supplier details below.'
              : 'Create a new supplier by filling out the form below.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <SupplierForm
            initialData={supplier}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
            isEditMode={isEditMode}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Standalone edit form container (for use outside of modal)
interface SupplierEditFormProps {
  supplierId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function SupplierEditForm({
  supplierId,
  onSuccess,
  onCancel
}: SupplierEditFormProps) {
  const { data: supplierResponse, isLoading, error, refetch } = useGetSupplierDetail(Number(supplierId))


  const supplier = supplierResponse?.data

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit Supplier</h2>
          <p className="text-muted-foreground">Loading supplier details...</p>
        </div>
        <LoadingContentSpin className="h-32" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit Supplier</h2>
          <p className="text-muted-foreground">Failed to load supplier details</p>
        </div>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <p className="text-muted-foreground">
            Unable to load the supplier details.
          </p>
          <button
            onClick={() => refetch()}
            className="text-primary hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  if (!supplier) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit Supplier</h2>
          <p className="text-muted-foreground">Supplier not found</p>
        </div>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <p className="text-muted-foreground">
            The requested supplier could not be found.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Edit Supplier</h2>
        <p className="text-muted-foreground">
          Update the supplier "{supplier.supplier_name}" details below.
        </p>
      </div>
      
      <SupplierForm
        initialData={supplier}
        onSuccess={onSuccess}
        onCancel={onCancel}
        isEditMode={true}
      />
    </div>
  )
}