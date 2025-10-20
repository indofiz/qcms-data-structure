import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LoadingContentSpin } from '@/components/common/loading'
import { useGetCategoryDetail } from '../hooks'
import { useModalStore } from '@/app/store/ui.store'
import { CategoryForm } from './category-form'

interface CategoryFormContainerProps {
  categoryId?: string
  onSuccess?: () => void
}

export function CategoryFormContainer({
  categoryId,
  onSuccess
}: CategoryFormContainerProps) {
  const { isOpen, data, title, closeModal } = useModalStore()
  // Use the categoryId from props or modal data
  const targetId = categoryId || (data as { id?: string })?.id
  const isEditMode = !!targetId

  // Fetch category details if editing
  const {
    data: categoryResponse,
    isLoading,
    error
  } = useGetCategoryDetail(Number(targetId), {
    enabled: isEditMode && !!targetId
  })

  const category = categoryResponse?.data

  // Handle successful form submission
  const handleSuccess = () => {
    closeModal()
    onSuccess?.()
  }

  // Handle cancel/close
  const handleCancel = () => {
    closeModal()
  }

  const modalTitle = title || (isEditMode ? 'Edit Category' : 'Create Category')

  // Show loading state while fetching category data for edit mode
  if (isEditMode && isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Loading category details...
            </DialogDescription>
          </DialogHeader>
          <LoadingContentSpin className="h-32" />
        </DialogContent>
      </Dialog>
    )
  }

  // Show error state if failed to fetch category data
  if (isEditMode && error) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Failed to load category details
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <p className="text-muted-foreground">
              Unable to load the category details. Please try again.
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
              ? 'Update the category details below.'
              : 'Create a new category by filling out the form below.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <CategoryForm
            initialData={category}
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
interface CategoryEditFormProps {
  categoryId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function CategoryEditForm({
  categoryId,
  onSuccess,
  onCancel
}: CategoryEditFormProps) {
  // Fetch category details
  const {
    data: categoryResponse,
    isLoading,
    error,
    refetch
  } = useGetCategoryDetail(Number(categoryId))

  const category = categoryResponse?.data

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit Category</h2>
          <p className="text-muted-foreground">Loading category details...</p>
        </div>
        <LoadingContentSpin className="h-32" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit Category</h2>
          <p className="text-muted-foreground">Failed to load category details</p>
        </div>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <p className="text-muted-foreground">
            Unable to load the category details.
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

  if (!category) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Edit Category</h2>
          <p className="text-muted-foreground">Category not found</p>
        </div>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <p className="text-muted-foreground">
            The requested category could not be found.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Edit Category</h2>
        <p className="text-muted-foreground">
          Update the category "{category.category_name}" details below.
        </p>
      </div>
      
      <CategoryForm
        initialData={category}
        onSuccess={onSuccess}
        onCancel={onCancel}
        isEditMode={true}
      />
    </div>
  )
}