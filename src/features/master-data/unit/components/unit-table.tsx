import { MasterDataTable } from '@/components/common/master-data-table'
import { useGetUnits, useDeleteUnit } from '../hooks'
import { useUnitFilterStore } from '../store'
import { UnitType } from '../types'

interface UnitTableProps {
  onEdit?: (unit: UnitType) => void
}

export function UnitTable({ onEdit }: UnitTableProps) {
  const filterStore = useUnitFilterStore()
  const { search, page, per_page, setSearch, setPage, setPerPage } = filterStore

  // Use the unit hooks
  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useGetUnits({
    filter: filterStore,
  })
  const deleteMutation = useDeleteUnit()

  // Table columns configuration
  const columns = [
    {
      key: 'unit_name',
      header: 'Unit Name',
    },
  ]

  // Handle delete
  const handleDelete = (unit: UnitType) => {
    deleteMutation.mutate(Number(unit.id!))
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
      entityName="Unit"
      entityNamePlural="units"
      onEdit={onEdit}
      onRefetch={refetch}
      queryParams={{
        search: search || undefined,
        page,
        per_page,
      }}
      onQueryParamsChange={handleQueryParamsChange}
      getItemName={(unit) => unit.unit_name}
      onDelete={handleDelete}
    />
  )
}