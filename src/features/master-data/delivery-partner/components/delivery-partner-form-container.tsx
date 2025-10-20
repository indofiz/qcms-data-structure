import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LoadingContentSpin } from '@/components/common/loading'
import { useGetDeliveryPartnerDetail } from '../hooks'
import { useModalStore } from '@/app/store/ui.store'
import { DeliveryPartnerForm } from './delivery-partner-form'

interface DeliveryPartnerFormContainerProps {
  onSuccess?: () => void
}

export function DeliveryPartnerFormContainer({
  onSuccess
}: DeliveryPartnerFormContainerProps) {
  const { isOpen, data, title, closeModal } = useModalStore()
  const targetId = (data as { id?: string })?.id
  const isEditMode = !!targetId

  // Fetch delivery partner details if editing
  const {
    data: deliveryPartnerResponse,
    isLoading,
    error
  } = useGetDeliveryPartnerDetail(Number(targetId))

  const deliveryPartner = deliveryPartnerResponse?.data

  // Handle successful form submission
  const handleSuccess = () => {
    closeModal()
    onSuccess?.()
  }

  // Handle cancel/close
  const handleCancel = () => {
    closeModal()
  }

  const modalTitle = title || (isEditMode ? 'Edit Delivery Partner' : 'Create Delivery Partner')

  // Show loading state while fetching delivery partner data for edit mode
  if (isEditMode && isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Loading delivery partner details...
            </DialogDescription>
          </DialogHeader>
          <LoadingContentSpin className="h-32" />
        </DialogContent>
      </Dialog>
    )
  }

  // Show error state if failed to fetch delivery partner data
  if (isEditMode && error) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Failed to load delivery partner details
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <p className="text-muted-foreground">
              Unable to load the delivery partner details. Please try again.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Update the delivery partner details below.'
              : 'Create a new delivery partner by filling out the form below.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <DeliveryPartnerForm
            record={deliveryPartner}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}