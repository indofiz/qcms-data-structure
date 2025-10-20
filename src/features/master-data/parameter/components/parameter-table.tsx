import { MasterDataTable } from '@/components/common/master-data-table'
import { useGetParameters, useDeleteParameter } from '../hooks'
import { useParameterFilterStore } from '../store'
import { ParameterType } from '../types'

interface ParameterTableProps {
  onEdit?: (parameter: ParameterType) => void
}

export function ParameterTable({ onEdit }: ParameterTableProps) {
  const filterStore = useParameterFilterStore()
  const { search, page, per_page, setSearch, setPage, setPerPage } = filterStore

  // Use the parameter hooks
  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useGetParameters({
    filter: filterStore,
  })
  const deleteMutation = useDeleteParameter()

  // Table columns configuration
  const columns = [
    {
      key: 'parameter_name',
      header: 'Parameter Name',
    },
    {
      key: 'unit',
      header: 'Unit',
    },
  ]

  // Handle delete
  const handleDelete = (parameter: ParameterType) => {
    deleteMutation.mutate(Number(parameter.id!))
  }

  // Handle query params change from the table component
  const handleQueryParamsChange = (params: {
    search?: string
    page?: number
    per_page?: number
  }) => {
    // Handle search
    if (params.search !== undefined) {
      setSearch(String(params.search))
    }

    // Handle pagination
    if (params.page !== undefined) {
      setPage(Number(params.page))
    }

    if (params.per_page !== undefined) {
      setPerPage(Number(params.per_page))
    }
  }

  return (
    <MasterDataTable
      data={response}
      isLoading={isLoading}
      error={error}
      columns={columns}
      entityName="Parameter"
      entityNamePlural="parameters"
      onEdit={onEdit}
      onRefetch={refetch}
      queryParams={{
        search: search || undefined,
        page,
        per_page,
      }}
      onQueryParamsChange={handleQueryParamsChange}
      getItemName={(parameter) => parameter.parameter_name}
      onDelete={handleDelete}
    />
  )
}
