import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LoadingContentSpin } from '@/components/common/loading'
import { useGetAnalysisParameterDetail } from '../hooks'
import { useModalStore } from '@/app/store/ui.store'
import { AnalysisParameterForm } from './analysis-parameter-form'

interface AnalysisParameterFormContainerProps {
  parameterId?: string
  onSuccess?: () => void
}

export function AnalysisParameterFormContainer({
  parameterId,
  onSuccess
}: AnalysisParameterFormContainerProps) {
  const { isOpen, data, title, closeModal } = useModalStore()
  // Use the parameterId from props or modal data
  const targetId = parameterId || (data as { id?: string })?.id
  const isEditMode = !!targetId

  // Fetch parameter details if editing
  const {
    data: parameterResponse,
    isLoading,
    error
  } = useGetAnalysisParameterDetail(Number(targetId), {
    enabled: isEditMode && !!targetId
  })

  const parameter = parameterResponse?.data

  // Handle successful form submission
  const handleSuccess = () => {
    closeModal()
    onSuccess?.()
  }

  // Handle cancel/close
  const handleCancel = () => {
    closeModal()
  }

  const modalTitle = title || (isEditMode ? 'Edit Analysis Parameter' : 'Create Analysis Parameter')

  // Show loading state while fetching parameter data for edit mode
  if (isEditMode && isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Loading parameter details...
            </DialogDescription>
          </DialogHeader>
          <LoadingContentSpin className="h-32" />
        </DialogContent>
      </Dialog>
    )
  }

  // Show error state if failed to fetch parameter data
  if (isEditMode && error) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Failed to load parameter details
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <p className="text-muted-foreground">
              Unable to load the analysis parameter details. Please try again.
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
              ? 'Update the analysis parameter details below.'
              : 'Create a new analysis parameter by filling out the form below.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <AnalysisParameterForm
            initialData={parameter}
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
interface AnalysisParameterEditFormProps {
  parameterId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function AnalysisParameterEditForm({
  parameterId,
  onSuccess,
  onCancel
}: AnalysisParameterEditFormProps) {
  // Fetch parameter details
  const {
    data: parameterResponse,
    isLoading,
    error,
    refetch
  } = useGetAnalysisParameterDetail(Number(parameterId))

  const parameter = parameterResponse?.data

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit Analysis Parameter</h2>
          <p className="text-muted-foreground">Loading parameter details...</p>
        </div>
        <LoadingContentSpin className="h-32" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit Analysis Parameter</h2>
          <p className="text-muted-foreground">Failed to load parameter details</p>
        </div>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <p className="text-muted-foreground">
            Unable to load the analysis parameter details.
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

  if (!parameter) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit Analysis Parameter</h2>
          <p className="text-muted-foreground">Parameter not found</p>
        </div>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <p className="text-muted-foreground">
            The requested analysis parameter could not be found.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Edit Analysis Parameter</h2>
        <p className="text-muted-foreground">
          Update the analysis parameter "{parameter.parameter_name}" details below.
        </p>
      </div>
      
      <AnalysisParameterForm
        initialData={parameter}
        onSuccess={onSuccess}
        onCancel={onCancel}
        isEditMode={true}
      />
    </div>
  )
}