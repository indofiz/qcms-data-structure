import { MasterDataTable } from '@/components/common/master-data-table'
import { useGetDepartments, useDeleteDepartment } from '../hooks'
import { DepartmentType } from '../types'

interface DepartmentTableProps {
  onEdit?: (department: DepartmentType) => void
}

export function DepartmentTable({ onEdit }: DepartmentTableProps) {
  // Get all departments (no pagination)
  const { data: response, isLoading, error, refetch } = useGetDepartments()
  const deleteMutation = useDeleteDepartment()

  // Table columns configuration
  const columns = [
    {
      key: 'department_name',
      header: 'Department Name',
    },
  ]

  // Handle delete
  const handleDelete = (department: DepartmentType) => {
    deleteMutation.mutate(Number(department.id!))
  }

  return (
    <MasterDataTable
      data={response}
      isLoading={isLoading}
      error={error}
      columns={columns}
      entityName="Department"
      entityNamePlural="departments"
      onEdit={onEdit}
      onRefetch={refetch}
      getItemName={(department) => department.department_name}
      onDelete={handleDelete}
    />
  )
}