import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { PageHeader } from '@/components/common/section'
import { CategoryDataTable } from '../components/category-data-table'
import { CategoryFormContainer } from '../components/category-form-container'
import { CategoryDeleteDialog } from '../components/category-delete-dialog'
import { useGetCategories, useDeleteCategory } from '../hooks'
import { useModalStore } from '@/app/store/ui.store'
import { CategoryType } from '../types'

export function CategoryPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteRecord, setDeleteRecord] = useState<CategoryType | null>(null)

  const { data: response, isLoading } = useGetCategories()
  const deleteMutation = useDeleteCategory()
  const { openModal } = useModalStore()

  // Handle edit category
  const handleEditCategory = (category: CategoryType) => {
    openModal({ id: category.id }, `Edit Category - ${category.category_name}`)
  }

  // Handle delete category
  const handleDeleteCategory = (category: CategoryType) => {
    setDeleteRecord(category)
    setDeleteDialogOpen(true)
  }

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!deleteRecord) return

    try {
      await deleteMutation.mutateAsync(Number(deleteRecord.id))
      toast.success(
        `Category ${deleteRecord.category_name} deleted successfully`
      )
      setDeleteDialogOpen(false)
      setDeleteRecord(null)
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete category')
    }
  }

  // Handle create new category
  const handleCreateNew = () => {
    openModal(null, 'Create New Category')
  }

  // Handle successful form actions (refresh data)
  const handleFormSuccess = () => {
    // The form container will close the modal automatically
    // Queries will be invalidated by the mutation hooks
  }

  const headerActions = (
    <>
      <button
        onClick={handleCreateNew}
        className="inline-flex w-full mb-4 md:w-fit md:mb-0 justify-center md:justify-start items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Create Category
      </button>
    </>
  )

  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-8">
      <Card className="shadow-none border-none">
        <PageHeader
          title="Categories"
          description="Manage categories for organizing materials and products"
          actions={headerActions}
        />
        <CardContent className="pt-4 p-0 md:p-2">
          <CategoryDataTable
            records={response?.data || []}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <CategoryDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open)
          if (!open) setDeleteRecord(null)
        }}
        record={deleteRecord}
        onConfirm={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
      />

      {/* Create/Edit Modal */}
      <CategoryFormContainer onSuccess={handleFormSuccess} />
    </div>
  )
}
