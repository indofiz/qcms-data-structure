import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LoadingContentSpin } from '@/components/common/loading'
import { useGetParameterDetail } from '../hooks'
import { useModalStore } from '@/app/store/ui.store'
import { ParameterForm } from './parameter-form'

interface ParameterFormContainerProps {
  parameterId?: string
  onSuccess?: () => void
}

export function ParameterFormContainer({
  parameterId,
  onSuccess
}: ParameterFormContainerProps) {
  const { isOpen, data, title, closeModal } = useModalStore()
  // Use the parameterId from props or modal data
  const targetId = parameterId || (data as { id?: string })?.id
  const isEditMode = !!targetId

  // Fetch parameter details if editing
  const {
    data: parameterResponse,
    isLoading,
    error
  } = useGetParameterDetail(Number(targetId!), {
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

  const modalTitle = title || (isEditMode ? 'Edit Parameter' : 'Create Parameter')

  // Show loading state while fetching parameter data for edit mode
  if (isEditMode && isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[600px]">
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Failed to load parameter details
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <p className="text-muted-foreground">
              Unable to load the parameter details. Please try again.
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
              ? `Update the parameter "${parameter?.parameter_name}" details below.`
              : 'Create a new parameter by filling out the form below.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <ParameterForm
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