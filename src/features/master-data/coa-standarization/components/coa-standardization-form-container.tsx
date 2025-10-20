import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LoadingContentSpin } from '@/components/common/loading'
import { useGetCoaStandardizationDetail } from '../hooks/use-coa-standardizations'
import { useModalStore } from '@/app/store/ui.store'
import { CoaStandardizationForm } from './coa-standardization-form'

interface CoaStandardizationFormContainerProps {
  coaStandardizationId?: string
  onSuccess?: () => void
}

export function CoaStandardizationFormContainer({
  coaStandardizationId,
  onSuccess
}: CoaStandardizationFormContainerProps) {
  const { isOpen, data, title, closeModal } = useModalStore()
  // Use the coaStandardizationId from props or modal data
  const targetId = coaStandardizationId || (data as { id?: string })?.id
  const isEditMode = !!targetId

  // Fetch COA standardization details if editing
  const {
    data: coaStandardizationResponse,
    isLoading,
    error
  } = useGetCoaStandardizationDetail(Number(targetId))

  const coaStandardization = coaStandardizationResponse?.data

  // Handle successful form submission
  const handleSuccess = () => {
    closeModal()
    onSuccess?.()
  }

  // Handle cancel/close
  const handleCancel = () => {
    closeModal()
  }

  const modalTitle = title || (isEditMode ? 'Edit COA Standardization' : 'Create COA Standardization')

  // Show loading state while fetching COA standardization data for edit mode
  if (isEditMode && isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Loading COA standardization details...
            </DialogDescription>
          </DialogHeader>
          <LoadingContentSpin className="h-32" />
        </DialogContent>
      </Dialog>
    )
  }

  // Show error state if failed to fetch COA standardization data
  if (isEditMode && error) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Failed to load COA standardization details
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <p className="text-muted-foreground">
              Unable to load the COA standardization details. Please try again.
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
              ? 'Update the COA standardization details below.'
              : 'Create a new COA standardization by filling out the form below.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <CoaStandardizationForm
            initialData={coaStandardization}
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
interface CoaStandardizationEditFormProps {
  coaStandardizationId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function CoaStandardizationEditForm({
  coaStandardizationId,
  onSuccess,
  onCancel
}: CoaStandardizationEditFormProps) {
  const { data: coaStandardizationResponse, isLoading, error, refetch } = useGetCoaStandardizationDetail(Number(coaStandardizationId))

  const coaStandardization = coaStandardizationResponse?.data

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit COA Standardization</h2>
          <p className="text-muted-foreground">Loading COA standardization details...</p>
        </div>
        <LoadingContentSpin className="h-32" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit COA Standardization</h2>
          <p className="text-muted-foreground">Failed to load COA standardization details</p>
        </div>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <p className="text-muted-foreground">
            Unable to load the COA standardization details.
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

  if (!coaStandardization) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit COA Standardization</h2>
          <p className="text-muted-foreground">COA standardization not found</p>
        </div>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <p className="text-muted-foreground">
            The requested COA standardization could not be found.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Edit COA Standardization</h2>
        <p className="text-muted-foreground">
          Update the COA standardization for "{coaStandardization.material?.material_name} - {coaStandardization.parameter?.parameter_name}" details below.
        </p>
      </div>
      
      <CoaStandardizationForm
        initialData={coaStandardization}
        onSuccess={onSuccess}
        onCancel={onCancel}
        isEditMode={true}
      />
    </div>
  )
}