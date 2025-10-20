import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LoadingContentSpin } from '@/components/common/loading'
import { useGetUnitOfMeasurement } from '../hooks'
import { useModalStore } from '@/app/store/ui.store'
import { UnitOfMeasurementForm } from './unit-of-measurement-form'

interface UnitOfMeasurementFormContainerProps {
  onSuccess?: () => void
}

export function UnitOfMeasurementFormContainer({ onSuccess }: UnitOfMeasurementFormContainerProps) {
  const { isOpen, data, title, closeModal } = useModalStore()

  // Use the id from modal data
  const targetId = (data as { id?: string })?.id
  const isEditMode = !!targetId

  // Fetch unit of measurement details if editing
  const {
    data: unitOfMeasurementResponse,
    isLoading,
    error
  } = useGetUnitOfMeasurement(Number(targetId!), {
    enabled: isEditMode && !!targetId
  })

  const unitOfMeasurement = unitOfMeasurementResponse?.data

  // Handle successful form submission
  const handleSuccess = () => {
    closeModal()
    onSuccess?.()
  }

  // Handle form cancel
  const handleCancel = () => {
    closeModal()
  }

  const modalTitle = title || (isEditMode ? 'Edit Unit of Measurement' : 'Create Unit of Measurement')

  // Show loading state while fetching unit of measurement data for edit mode
  if (isEditMode && isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Loading unit of measurement details...
            </DialogDescription>
          </DialogHeader>
          <LoadingContentSpin className="h-32" />
        </DialogContent>
      </Dialog>
    )
  }

  // Show error state if failed to fetch unit of measurement data
  if (isEditMode && error) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Failed to load unit of measurement details
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>
            {isEditMode 
              ? `Update the unit of measurement "${unitOfMeasurement?.unit_of_measurement}" details below.`
              : 'Fill in the details below to create a new unit of measurement.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <UnitOfMeasurementForm
            initialData={unitOfMeasurement}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
            isEditMode={isEditMode}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}