import { MasterDataTable } from '@/components/common/master-data-table'
import { useGetSuppliers, useDeleteSupplier, SupplierType } from '../'
import { useSupplierFilterStore } from '../store'

interface SupplierTableProps {
  onEdit?: (supplier: SupplierType) => void
}

export function SupplierTable({ onEdit }: SupplierTableProps) {
  const filterStore = useSupplierFilterStore()
  const { 
    search, 
    page, 
    per_page,
    setSearch,
    setPage, 
    setPerPage
  } = filterStore
  
  // Use the new specific hooks
  const { data: response, isLoading, error, refetch } = useGetSuppliers({ 
    filter: filterStore 
  })
  const deleteMutation = useDeleteSupplier()


  // Table columns configuration
  const columns = [
    {
      key: 'supplier_name',
      header: 'Supplier Name',
    },
    {
      key: 'phone',
      header: 'Phone',
    },
    {
      key: 'email',
      header: 'Email',
    },
    {
      key: 'city',
      header: 'City',
    },
    {
      key: 'province',
      header: 'Province',
    },
  ]

  // Handle delete
  const handleDelete = (supplier: SupplierType) => {
    deleteMutation.mutate(Number(supplier.id!))
  }

  // Handle query params change from the table component
  const handleQueryParamsChange = (params: { search?: string; page?: number; per_page?: number }) => {
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
      entityName="Supplier"
      entityNamePlural="suppliers"
      onEdit={onEdit}
      onRefetch={refetch}
      queryParams={{
        search: search || undefined,
        page,
        per_page
      }}
      onQueryParamsChange={handleQueryParamsChange}
      getItemName={(supplier) => supplier.supplier_name}
      onDelete={handleDelete}
    />
  )
}