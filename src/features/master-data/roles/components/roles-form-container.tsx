import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LoadingContentSpin } from '@/components/common/loading'
import { useGetRoleDetail } from '../hooks'
import { useModalStore } from '@/app/store/ui.store'
import { RolesForm } from './roles-form'

interface RolesFormContainerProps {
  roleId?: string
  onSuccess?: () => void
}

export function RolesFormContainer({
  roleId,
  onSuccess
}: RolesFormContainerProps) {
  const { isOpen, data, title, closeModal } = useModalStore()
  // Use the roleId from props or modal data
  const targetId = roleId || (data as { id?: string })?.id
  const isEditMode = !!targetId

  // Fetch role details if editing
  const {
    data: roleResponse,
    isLoading,
    error
  } = useGetRoleDetail(Number(targetId), {
    enabled: isEditMode && !!targetId
  })

  const role = roleResponse?.data

  // Handle successful form submission
  const handleSuccess = () => {
    closeModal()
    onSuccess?.()
  }

  // Handle cancel/close
  const handleCancel = () => {
    closeModal()
  }

  const modalTitle = title || (isEditMode ? 'Edit Role' : 'Create Role')

  // Show loading state while fetching role data for edit mode
  if (isEditMode && isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Loading role details...
            </DialogDescription>
          </DialogHeader>
          <LoadingContentSpin className="h-32" />
        </DialogContent>
      </Dialog>
    )
  }

  // Show error state if failed to fetch role data
  if (isEditMode && error) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Failed to load role details
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <p className="text-muted-foreground">
              Unable to load the role details. Please try again.
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
              ? 'Update the role details below.'
              : 'Create a new role by filling out the form below.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <RolesForm
            initialData={role}
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
interface RolesEditFormProps {
  roleId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function RolesEditForm({
  roleId,
  onSuccess,
  onCancel
}: RolesEditFormProps) {
  // Fetch role details
  const {
    data: roleResponse,
    isLoading,
    error,
    refetch
  } = useGetRoleDetail(Number(roleId))

  const role = roleResponse?.data

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit Role</h2>
          <p className="text-muted-foreground">Loading role details...</p>
        </div>
        <LoadingContentSpin className="h-32" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit Role</h2>
          <p className="text-muted-foreground">Failed to load role details</p>
        </div>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <p className="text-muted-foreground">
            Unable to load the role details.
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

  if (!role) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit Role</h2>
          <p className="text-muted-foreground">Role not found</p>
        </div>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <p className="text-muted-foreground">
            The requested role could not be found.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Edit Role</h2>
        <p className="text-muted-foreground">
          Update the role "{role.name}" details below.
        </p>
      </div>
      
      <RolesForm
        initialData={role}
        onSuccess={onSuccess}
        onCancel={onCancel}
        isEditMode={true}
      />
    </div>
  )
}