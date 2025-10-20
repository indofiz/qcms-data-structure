import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LoadingContentSpin } from '@/components/common/loading'
import { useGetPositionDetail } from '../hooks'
import { useModalStore } from '@/app/store/ui.store'
import { PositionsForm } from './positions-form'

interface PositionsFormContainerProps {
  positionId?: string
  onSuccess?: () => void
}

export function PositionsFormContainer({
  positionId,
  onSuccess
}: PositionsFormContainerProps) {
  const { isOpen, data, title, closeModal } = useModalStore()
  // Use the positionId from props or modal data
  const targetId = positionId || (data as { id?: string })?.id
  const isEditMode = !!targetId

  // Fetch position details if editing
  const {
    data: positionResponse,
    isLoading,
    error
  } = useGetPositionDetail(Number(targetId), {
    enabled: isEditMode && !!targetId
  })

  const position = positionResponse?.data

  // Handle successful form submission
  const handleSuccess = () => {
    closeModal()
    onSuccess?.()
  }

  // Handle cancel/close
  const handleCancel = () => {
    closeModal()
  }

  const modalTitle = title || (isEditMode ? 'Edit Position' : 'Create Position')

  // Show loading state while fetching position data for edit mode
  if (isEditMode && isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Loading position details...
            </DialogDescription>
          </DialogHeader>
          <LoadingContentSpin className="h-32" />
        </DialogContent>
      </Dialog>
    )
  }

  // Show error state if failed to fetch position data
  if (isEditMode && error) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Failed to load position details
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <p className="text-muted-foreground">
              Unable to load the position details. Please try again.
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
              ? 'Update the position details below.'
              : 'Create a new position by filling out the form below.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <PositionsForm
            initialData={position}
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
interface PositionsEditFormProps {
  positionId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function PositionsEditForm({
  positionId,
  onSuccess,
  onCancel
}: PositionsEditFormProps) {
  // Fetch position details
  const {
    data: positionResponse,
    isLoading,
    error,
    refetch
  } = useGetPositionDetail(Number(positionId))

  const position = positionResponse?.data

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit Position</h2>
          <p className="text-muted-foreground">Loading position details...</p>
        </div>
        <LoadingContentSpin className="h-32" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit Position</h2>
          <p className="text-muted-foreground">Failed to load position details</p>
        </div>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <p className="text-muted-foreground">
            Unable to load the position details.
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

  if (!position) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit Position</h2>
          <p className="text-muted-foreground">Position not found</p>
        </div>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <p className="text-muted-foreground">
            The requested position could not be found.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Edit Position</h2>
        <p className="text-muted-foreground">
          Update the position "{position.position_name}" details below.
        </p>
      </div>
      
      <PositionsForm
        initialData={position}
        onSuccess={onSuccess}
        onCancel={onCancel}
        isEditMode={true}
      />
    </div>
  )
}