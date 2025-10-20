import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LoadingContentSpin } from '@/components/common/loading'
import { useGetPlant } from '../hooks'
import { useModalStore } from '@/app/store/ui.store'
import { PlantsForm } from './plants-form'

interface PlantsFormContainerProps {
  onSuccess?: () => void
}

export function PlantsFormContainer({ onSuccess }: PlantsFormContainerProps) {
  const { isOpen, data, title, closeModal } = useModalStore()

  // Use the id from modal data
  const targetId = (data as { id?: string })?.id
  const isEditMode = !!targetId

  // Fetch plant details if editing
  const {
    data: plantResponse,
    isLoading,
    error
  } = useGetPlant(Number(targetId!), {
    enabled: isEditMode && !!targetId
  })

  const plant = plantResponse?.data

  // Handle successful form submission
  const handleSuccess = () => {
    closeModal()
    onSuccess?.()
  }

  // Handle form cancel
  const handleCancel = () => {
    closeModal()
  }

  const modalTitle = title || (isEditMode ? 'Edit Plant' : 'Create Plant')

  // Show loading state while fetching plant data for edit mode
  if (isEditMode && isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Loading plant details...
            </DialogDescription>
          </DialogHeader>
          <LoadingContentSpin className="h-32" />
        </DialogContent>
      </Dialog>
    )
  }

  // Show error state if failed to fetch plant data
  if (isEditMode && error) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Failed to load plant details
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
              ? `Update the plant "${plant?.plant_name}" details below.`
              : 'Fill in the details below to create a new plant.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <PlantsForm
            initialData={plant}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
            isEditMode={isEditMode}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
