import { MasterDataTable } from '@/components/common/master-data-table'
import { useGetCategories, useDeleteCategory } from '../hooks'
import { CategoryType } from '../types'

interface CategoryTableProps {
  onEdit?: (category: CategoryType) => void
}

export function CategoryTable({ onEdit }: CategoryTableProps) {
  // Get all categories (no pagination or filtering)
  const { data: response, isLoading, error, refetch } = useGetCategories()
  const deleteMutation = useDeleteCategory()

  // Table columns configuration
  const columns = [
    {
      key: 'category_name',
      header: 'Category Name',
    },
  ]

  // Handle delete
  const handleDelete = (category: CategoryType) => {
    deleteMutation.mutate(Number(category.id!))
  }

  return (
    <MasterDataTable
      data={response}
      isLoading={isLoading}
      error={error}
      columns={columns}
      entityName="Category"
      entityNamePlural="categories"
      onEdit={onEdit}
      onRefetch={refetch}
      getItemName={(category) => category.category_name}
      onDelete={handleDelete}
    />
  )
}