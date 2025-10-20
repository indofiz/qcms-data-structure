import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LoadingContentSpin } from '@/components/common/loading'
import { useGetMaterialDetail } from '../hooks/use-raw-materials'
import { useModalStore } from '@/app/store/ui.store'
import { RawMaterialForm } from './raw-material-form'

interface RawMaterialFormContainerProps {
  materialId?: string
  onSuccess?: () => void
}

export function RawMaterialFormContainer({
  materialId,
  onSuccess
}: RawMaterialFormContainerProps) {
  const { isOpen, data, title, closeModal } = useModalStore()
  // Use the materialId from props or modal data
  const targetId = materialId || (data as { id?: string })?.id
  const isEditMode = !!targetId

  // Fetch raw material details if editing
  const {
    data: materialResponse,
    isLoading,
    error
  } = useGetMaterialDetail(Number(targetId))

  const material = materialResponse?.data

  // Handle successful form submission
  const handleSuccess = () => {
    closeModal()
    onSuccess?.()
  }

  // Handle cancel/close
  const handleCancel = () => {
    closeModal()
  }

  const modalTitle = title || (isEditMode ? 'Edit Raw Material' : 'Create Raw Material')

  // Show loading state while fetching material data for edit mode
  if (isEditMode && isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Loading raw material details...
            </DialogDescription>
          </DialogHeader>
          <LoadingContentSpin className="h-32" />
        </DialogContent>
      </Dialog>
    )
  }

  // Show error state if failed to fetch material data
  if (isEditMode && error) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Failed to load raw material details
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <p className="text-muted-foreground">
              Unable to load the raw material details. Please try again.
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
              ? 'Update the raw material details below.'
              : 'Create a new raw material by filling out the form below.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <RawMaterialForm
            initialData={material}
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
interface RawMaterialEditFormProps {
  materialId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function RawMaterialEditForm({
  materialId,
  onSuccess,
  onCancel
}: RawMaterialEditFormProps) {
  const { data: materialResponse, isLoading, error, refetch } = useGetMaterialDetail(Number(materialId))

  const material = materialResponse?.data

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit Raw Material</h2>
          <p className="text-muted-foreground">Loading raw material details...</p>
        </div>
        <LoadingContentSpin className="h-32" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit Raw Material</h2>
          <p className="text-muted-foreground">Failed to load raw material details</p>
        </div>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <p className="text-muted-foreground">
            Unable to load the raw material details.
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

  if (!material) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit Raw Material</h2>
          <p className="text-muted-foreground">Raw material not found</p>
        </div>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <p className="text-muted-foreground">
            The requested raw material could not be found.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Edit Raw Material</h2>
        <p className="text-muted-foreground">
          Update the raw material "{material.material_name}" details below.
        </p>
      </div>
      
      <RawMaterialForm
        initialData={material}
        onSuccess={onSuccess}
        onCancel={onCancel}
        isEditMode={true}
      />
    </div>
  )
}