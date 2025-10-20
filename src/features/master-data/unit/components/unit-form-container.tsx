import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LoadingContentSpin } from '@/components/common/loading'
import { useGetUnitDetail } from '../hooks'
import { useModalStore } from '@/app/store/ui.store'
import { UnitForm } from './unit-form'

interface UnitFormContainerProps {
  onSuccess?: () => void
}

export function UnitFormContainer({ onSuccess }: UnitFormContainerProps) {
  const { isOpen, data, title, closeModal } = useModalStore()

  // Use the id from modal data
  const targetId = (data as { id?: string })?.id
  const isEditMode = !!targetId

  // Fetch unit details if editing
  const {
    data: unitResponse,
    isLoading,
    error
  } = useGetUnitDetail(Number(targetId!), {
    enabled: isEditMode && !!targetId
  })

  const unit = unitResponse?.data

  // Handle successful form submission
  const handleSuccess = () => {
    closeModal()
    onSuccess?.()
  }

  // Handle form cancel
  const handleCancel = () => {
    closeModal()
  }

  const modalTitle = title || (isEditMode ? 'Edit Unit' : 'Create Unit')

  // Show loading state while fetching unit data for edit mode
  if (isEditMode && isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Loading unit details...
            </DialogDescription>
          </DialogHeader>
          <LoadingContentSpin className="h-32" />
        </DialogContent>
      </Dialog>
    )
  }

  // Show error state if failed to fetch unit data
  if (isEditMode && error) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Failed to load unit details
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
              ? `Update the unit "${unit?.unit_name}" details below.`
              : 'Fill in the details below to create a new unit.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <UnitForm
            initialData={unit}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
            isEditMode={isEditMode}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}