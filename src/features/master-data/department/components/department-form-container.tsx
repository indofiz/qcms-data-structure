import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LoadingContentSpin } from '@/components/common/loading'
import { useGetDepartmentDetail } from '../hooks'
import { useModalStore } from '@/app/store/ui.store'
import { DepartmentForm } from './department-form'

interface DepartmentFormContainerProps {
  departmentId?: string
  onSuccess?: () => void
}

export function DepartmentFormContainer({
  departmentId,
  onSuccess
}: DepartmentFormContainerProps) {
  const { isOpen, data, title, closeModal } = useModalStore()
  // Use the departmentId from props or modal data
  const targetId = departmentId || (data as { id?: string })?.id
  const isEditMode = !!targetId

  // Fetch department details if editing
  const {
    data: departmentResponse,
    isLoading,
    error
  } = useGetDepartmentDetail(Number(targetId), {
    enabled: isEditMode && !!targetId
  })

  const department = departmentResponse?.data

  // Handle successful form submission
  const handleSuccess = () => {
    closeModal()
    onSuccess?.()
  }

  // Handle cancel/close
  const handleCancel = () => {
    closeModal()
  }

  const modalTitle = title || (isEditMode ? 'Edit Department' : 'Create Department')

  // Show loading state while fetching department data for edit mode
  if (isEditMode && isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Loading department details...
            </DialogDescription>
          </DialogHeader>
          <LoadingContentSpin className="h-32" />
        </DialogContent>
      </Dialog>
    )
  }

  // Show error state if failed to fetch department data
  if (isEditMode && error) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Failed to load department details
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <p className="text-muted-foreground">
              Unable to load the department details. Please try again.
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
              ? 'Update the department details below.'
              : 'Create a new department by filling out the form below.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <DepartmentForm
            initialData={department}
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
interface DepartmentEditFormProps {
  departmentId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function DepartmentEditForm({
  departmentId,
  onSuccess,
  onCancel
}: DepartmentEditFormProps) {
  // Fetch department details
  const {
    data: departmentResponse,
    isLoading,
    error,
    refetch
  } = useGetDepartmentDetail(Number(departmentId))

  const department = departmentResponse?.data

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit Department</h2>
          <p className="text-muted-foreground">Loading department details...</p>
        </div>
        <LoadingContentSpin className="h-32" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit Department</h2>
          <p className="text-muted-foreground">Failed to load department details</p>
        </div>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <p className="text-muted-foreground">
            Unable to load the department details.
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

  if (!department) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit Department</h2>
          <p className="text-muted-foreground">Department not found</p>
        </div>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <p className="text-muted-foreground">
            The requested department could not be found.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Edit Department</h2>
        <p className="text-muted-foreground">
          Update the department "{department.department_name}" details below.
        </p>
      </div>
      
      <DepartmentForm
        initialData={department}
        onSuccess={onSuccess}
        onCancel={onCancel}
        isEditMode={true}
      />
    </div>
  )
}